import type { Metadata } from "next";
import Link from "next/link";
import { BlogForm } from "@/components/admin/blog-form";
import { Button } from "@/components/ui/button";
import { createBlogPost } from "@/lib/blog-admin/actions";
import { isBlogAdminConfigured, requireAdminSession } from "@/lib/auth/session";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Artikel Baru | Admin Blog TukangDiLombok.com",
  description: "Placeholder halaman buat artikel baru untuk admin blog TukangDiLombok.com.",
  path: "/admin/blog/new",
});

export default async function NewAdminBlogPostPage() {
  await requireAdminSession();
  const isConfigured = isBlogAdminConfigured();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-sm font-black uppercase tracking-[0.24em] text-orange-600">Artikel Baru</div>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900">Tulis artikel baru lewat form admin</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          Form ini sudah siap untuk alur `draft` dan `publish`. Selama database dan environment admin sudah diisi, artikel baru bisa langsung disimpan ke tabel blog admin.
        </p>

        {!isConfigured ? (
          <div className="mt-6 rounded-[1.5rem] border border-orange-200 bg-orange-50 p-5 text-sm leading-7 text-orange-700">
            Database admin belum dikonfigurasi penuh. Isi `DATABASE_URL`, jalankan `npm run prisma:generate`, lalu `npm run prisma:push` agar form ini bisa menyimpan artikel.
          </div>
        ) : null}

        <div className="mt-8">
          <BlogForm
            action={createBlogPost}
            initialValues={{
              authorName: "Admin TukangDiLombok",
              category: "Blog",
            }}
            mode="create"
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
