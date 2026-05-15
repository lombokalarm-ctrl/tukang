"use server";

import { BlogStatus } from "@prisma/client";
import { compare } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getAdminSession, isAdminAuthConfigured, isBlogAdminConfigured } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { blogPostSchema } from "@/lib/blog-admin/validation";

const loginSchema = z.object({
  email: z.string().email("Masukkan email admin yang valid."),
  password: z.string().min(8, "Password minimal 8 karakter."),
});

export type LoginFormState = {
  message?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
};

export type BlogPostFormState = {
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

function parseKeywords(rawKeywords: FormDataEntryValue | null) {
  return String(rawKeywords ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseBlogPostFormData(formData: FormData) {
  const intent = formData.get("intent");

  const rawData = {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    excerpt: String(formData.get("excerpt") ?? ""),
    category: String(formData.get("category") ?? ""),
    coverImage: String(formData.get("coverImage") ?? ""),
    authorName: String(formData.get("authorName") ?? ""),
    content: String(formData.get("content") ?? ""),
    metaTitle: String(formData.get("metaTitle") ?? ""),
    metaDescription: String(formData.get("metaDescription") ?? ""),
    keywords: parseKeywords(formData.get("keywords")),
    status: intent === "publish" ? "published" : "draft",
    publishedAt: String(formData.get("publishedAt") ?? ""),
  };

  return blogPostSchema.safeParse(rawData);
}

async function requireAdminActionSession() {
  const session = await getAdminSession();

  if (!session.isLoggedIn) {
    throw new Error("Unauthorized");
  }

  return session;
}

export async function loginAdmin(_: LoginFormState, formData: FormData): Promise<LoginFormState> {
  if (!isAdminAuthConfigured()) {
    return {
      message: "Konfigurasi admin belum lengkap. Isi ADMIN_EMAIL, ADMIN_PASSWORD_HASH, dan SESSION_SECRET terlebih dahulu.",
    };
  }

  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Periksa kembali email dan password admin.",
    };
  }

  const { email, password } = validatedFields.data;
  const isEmailMatch = email === process.env.ADMIN_EMAIL;
  const isPasswordMatch = await compare(password, process.env.ADMIN_PASSWORD_HASH ?? "");

  if (!isEmailMatch || !isPasswordMatch) {
    return {
      message: "Email atau password admin tidak cocok.",
    };
  }

  const session = await getAdminSession();
  session.isLoggedIn = true;
  session.email = email;
  await session.save();

  redirect("/admin/blog");
}

export async function logoutAdmin() {
  const session = await getAdminSession();
  await session.destroy();
  redirect("/admin/login");
}

function revalidateAdminAndBlogPaths(slugs: string[] = []) {
  revalidatePath("/admin/blog");
  revalidatePath("/admin/blog/new");
  revalidatePath("/blog");

  for (const slug of slugs) {
    revalidatePath(`/blog/${slug}`);
  }
}

export async function createBlogPost(_: BlogPostFormState, formData: FormData): Promise<BlogPostFormState> {
  await requireAdminActionSession();

  if (!isBlogAdminConfigured()) {
    return {
      message: "Konfigurasi database/admin belum lengkap. Isi DATABASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD_HASH, dan SESSION_SECRET.",
    };
  }

  const validatedFields = parseBlogPostFormData(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Form artikel belum lengkap. Periksa kembali field yang ditandai.",
    };
  }

  const data = validatedFields.data;
  const existingPost = await prisma.blogPost.findUnique({
    where: { slug: data.slug },
    select: { id: true },
  });

  if (existingPost) {
    return {
      errors: {
        slug: ["Slug ini sudah dipakai artikel lain."],
      },
      message: "Slug harus unik agar URL artikel tidak bentrok.",
    };
  }

  const post = await prisma.blogPost.create({
    data: {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      category: data.category,
      coverImage: data.coverImage || null,
      authorName: data.authorName,
      content: data.content,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      status: data.status === "published" ? BlogStatus.PUBLISHED : BlogStatus.DRAFT,
      publishedAt:
        data.status === "published" ? (data.publishedAt ? new Date(data.publishedAt) : new Date()) : null,
      keywords: {
        create: data.keywords.map((keyword) => ({
          keyword,
        })),
      },
    },
    select: { id: true, slug: true },
  });

  revalidateAdminAndBlogPaths([post.slug]);

  redirect(`/admin/blog/${post.id}/edit?saved=1`);
}

export async function updateBlogPost(
  postId: number,
  _: BlogPostFormState,
  formData: FormData,
): Promise<BlogPostFormState> {
  await requireAdminActionSession();

  if (!isBlogAdminConfigured()) {
    return {
      message: "Konfigurasi database/admin belum lengkap. Isi environment admin terlebih dahulu.",
    };
  }

  const validatedFields = parseBlogPostFormData(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Form artikel belum lengkap. Periksa kembali field yang ditandai.",
    };
  }

  const data = validatedFields.data;
  const existingPost = await prisma.blogPost.findUnique({
    where: { id: postId },
    select: {
      id: true,
      slug: true,
      publishedAt: true,
    },
  });

  if (!existingPost) {
    return {
      message: "Artikel yang ingin diedit tidak ditemukan.",
    };
  }

  const slugOwner = await prisma.blogPost.findUnique({
    where: { slug: data.slug },
    select: { id: true },
  });

  if (slugOwner && slugOwner.id !== postId) {
    return {
      errors: {
        slug: ["Slug ini sudah dipakai artikel lain."],
      },
      message: "Slug harus unik agar URL artikel tidak bentrok.",
    };
  }

  await prisma.blogPost.update({
    where: { id: postId },
    data: {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      category: data.category,
      coverImage: data.coverImage || null,
      authorName: data.authorName,
      content: data.content,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      status: data.status === "published" ? BlogStatus.PUBLISHED : BlogStatus.DRAFT,
      publishedAt:
        data.status === "published"
          ? existingPost.publishedAt ?? (data.publishedAt ? new Date(data.publishedAt) : new Date())
          : null,
      keywords: {
        deleteMany: {},
        create: data.keywords.map((keyword) => ({
          keyword,
        })),
      },
    },
    select: { slug: true },
  });

  revalidateAdminAndBlogPaths([existingPost.slug, data.slug]);
  revalidatePath(`/admin/blog/${postId}/edit`);

  redirect(`/admin/blog/${postId}/edit?saved=1`);
}

export async function publishBlogPost(postId: number) {
  await requireAdminActionSession();

  if (!isBlogAdminConfigured()) {
    throw new Error("Blog admin belum dikonfigurasi.");
  }

  const existingPost = await prisma.blogPost.findUnique({
    where: { id: postId },
    select: {
      id: true,
      slug: true,
      publishedAt: true,
    },
  });

  if (!existingPost) {
    throw new Error("Artikel tidak ditemukan.");
  }

  await prisma.blogPost.update({
    where: { id: postId },
    data: {
      status: BlogStatus.PUBLISHED,
      publishedAt: existingPost.publishedAt ?? new Date(),
    },
  });

  revalidateAdminAndBlogPaths([existingPost.slug]);
}

export async function unpublishBlogPost(postId: number) {
  await requireAdminActionSession();

  if (!isBlogAdminConfigured()) {
    throw new Error("Blog admin belum dikonfigurasi.");
  }

  const existingPost = await prisma.blogPost.findUnique({
    where: { id: postId },
    select: {
      id: true,
      slug: true,
    },
  });

  if (!existingPost) {
    throw new Error("Artikel tidak ditemukan.");
  }

  await prisma.blogPost.update({
    where: { id: postId },
    data: {
      status: BlogStatus.DRAFT,
      publishedAt: null,
    },
  });

  revalidateAdminAndBlogPaths([existingPost.slug]);
}

export async function deleteBlogPost(postId: number) {
  await requireAdminActionSession();

  if (!isBlogAdminConfigured()) {
    throw new Error("Blog admin belum dikonfigurasi.");
  }

  const existingPost = await prisma.blogPost.findUnique({
    where: { id: postId },
    select: {
      id: true,
      slug: true,
    },
  });

  if (!existingPost) {
    throw new Error("Artikel tidak ditemukan.");
  }

  await prisma.blogPost.delete({
    where: { id: postId },
  });

  revalidateAdminAndBlogPaths([existingPost.slug]);
}
