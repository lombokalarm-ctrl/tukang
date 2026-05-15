import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter."),
  slug: z
    .string()
    .min(3, "Slug minimal 3 karakter.")
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung."),
  excerpt: z.string().min(20, "Ringkasan minimal 20 karakter."),
  category: z.string().min(2, "Kategori minimal 2 karakter."),
  coverImage: z.string().trim().optional(),
  authorName: z.string().min(2, "Nama penulis minimal 2 karakter."),
  content: z.string().min(50, "Isi artikel minimal 50 karakter."),
  metaTitle: z.string().min(10, "Meta title minimal 10 karakter.").max(70, "Meta title maksimal 70 karakter."),
  metaDescription: z
    .string()
    .min(30, "Meta description minimal 30 karakter.")
    .max(170, "Meta description maksimal 170 karakter."),
  keywords: z.array(z.string().min(2, "Keyword minimal 2 karakter.")).min(1, "Minimal satu keyword."),
  status: z.enum(["draft", "published"]),
  publishedAt: z.string().optional(),
});

export type BlogPostFormValues = z.infer<typeof blogPostSchema>;
