import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogForm } from "@/components/admin/blog-form";
import { Button } from "@/components/ui/button";
import { updateBlogPost } from "@/lib/blog-admin/actions";
import { getAdminBlogPostById } from "@/lib/blog-admin/queries";
import { isBlogAdminConfigured, requireAdminSession } from "@/lib/auth/session";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Edit Artikel | Admin Blog TukangDiLombok.com",
  description: "Placeholder halaman edit artikel untuk admin blog TukangDiLombok.com.",
  path: "/admin/blog",
});

export default async function EditAdminBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminSession();
  const { id } = await params;
  const postId = Number(id);
  const isConfigured = isBlogAdminConfigured();

  if (!Number.isInteger(postId) || postId <= 0) {
    notFound();
  }

  if (!isConfigured) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-sm font-black uppercase tracking-[0.24em] text-orange-600">Edit Artikel</div>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900">Database admin belum aktif</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            Route edit sudah siap, tetapi data artikel belum bisa dimuat sebelum `DATABASE_URL` dan schema Prisma diaktifkan.
          </p>
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link href="/admin/blog">Kembali ke Dashboard Admin</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const post = await getAdminBlogPostById(postId);

  if (!post) {
    notFound();
  }

  const action = updateBlogPost.bind(null, postId);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-sm font-black uppercase tracking-[0.24em] text-orange-600">Edit Artikel</div>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900">Edit artikel: {post.title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          Perubahan di halaman ini akan memperbarui artikel admin berdasarkan `slug`, metadata SEO, dan isi artikel markdown yang Anda tulis.
        </p>
        <div className="mt-8">
          <BlogForm
            action={action}
            initialValues={{
              authorName: post.authorName,
              category: post.category,
              content: post.content,
              coverImage: post.coverImage ?? "",
              excerpt: post.excerpt,
              keywords: post.keywords.map((item) => item.keyword).join(", "),
              metaDescription: post.metaDescription ?? "",
              metaTitle: post.metaTitle ?? "",
              publishedAt: post.publishedAt?.toISOString(),
              slug: post.slug,
              title: post.title,
            }}
            mode="edit"
          />
        </div>
        <div className="mt-8">
          <Button asChild variant="outline">
            <Link href="/admin/blog">Kembali ke Dashboard Admin</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
