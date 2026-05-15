import type { Metadata } from "next";
import Link from "next/link";
import { BlogStatus } from "@prisma/client";
import { buildMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { getAdminBlogOverview } from "@/lib/blog-admin/queries";
import { deleteBlogPost, logoutAdmin, publishBlogPost, unpublishBlogPost } from "@/lib/blog-admin/actions";
import { isBlogAdminConfigured, requireAdminSession } from "@/lib/auth/session";

export const metadata: Metadata = buildMetadata({
  title: "Dashboard Admin Blog | TukangDiLombok.com",
  description: "Dashboard awal admin blog untuk mengelola artikel TukangDiLombok.com.",
  path: "/admin/blog",
});

function getStatusClassName(status: BlogStatus) {
  return status === BlogStatus.PUBLISHED
    ? "bg-green-50 text-green-700 border-green-200"
    : "bg-orange-50 text-orange-700 border-orange-200";
}

export default async function AdminBlogPage() {
  const session = await requireAdminSession();
  const isConfigured = isBlogAdminConfigured();
  const overview = isConfigured ? await getAdminBlogOverview() : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm font-black uppercase tracking-[0.24em] text-orange-600">Dashboard Blog</div>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900">Fondasi admin blog sudah aktif</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            Area admin ini menjadi dasar untuk workflow artikel `draft` dan `publish`. Tahap berikutnya adalah form create/edit artikel dan migrasi pembacaan data blog dari file statis ke database.
          </p>
          <p className="mt-3 text-sm text-slate-500">Login sebagai: {session.email}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/admin/blog/new">Tulis Artikel Baru</Link>
          </Button>
          <form action={logoutAdmin}>
            <Button type="submit" variant="outline">
              Keluar
            </Button>
          </form>
        </div>
      </div>

      {!isConfigured ? (
        <section className="mt-8 rounded-[2rem] border border-orange-200 bg-orange-50 p-8 shadow-sm">
          <div className="text-sm font-black uppercase tracking-[0.24em] text-orange-700">Konfigurasi Dibutuhkan</div>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900">Lengkapi environment sebelum admin blog dipakai penuh</h2>
          <div className="mt-4 grid gap-3 text-sm leading-7 text-orange-800">
            <p>Isi `DATABASE_URL` untuk koneksi `MySQL/MariaDB`.</p>
            <p>Isi `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, dan `SESSION_SECRET` untuk login admin.</p>
            <p>Setelah itu jalankan `npx prisma generate` dan `npx prisma db push` atau migrasi Prisma yang dipilih.</p>
          </div>
        </section>
      ) : (
        <>
          <section className="mt-8 grid gap-4 md:grid-cols-3">
            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Total Artikel</div>
              <div className="mt-3 text-4xl font-black text-slate-900">{overview?.totalPosts ?? 0}</div>
              <p className="mt-3 text-sm leading-7 text-slate-600">Jumlah seluruh artikel yang sudah tersimpan di database blog admin.</p>
            </article>
            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Draft</div>
              <div className="mt-3 text-4xl font-black text-slate-900">{overview?.draftPosts ?? 0}</div>
              <p className="mt-3 text-sm leading-7 text-slate-600">Artikel draft belum tampil di halaman publik dan belum masuk sitemap.</p>
            </article>
            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Published</div>
              <div className="mt-3 text-4xl font-black text-slate-900">{overview?.publishedPosts ?? 0}</div>
              <p className="mt-3 text-sm leading-7 text-slate-600">Artikel publish akan menjadi sumber utama blog publik setelah migrasi frontend selesai.</p>
            </article>
          </section>

          <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-sm font-black uppercase tracking-[0.24em] text-orange-600">Daftar Artikel Admin</div>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900">Kelola status artikel langsung dari dashboard</h2>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                  Anda bisa langsung membuka editor, mempublish, menjadikan draft, atau menghapus artikel dari tabel ini tanpa memutus alur kerja harian.
                </p>
              </div>
              <Button asChild>
                <Link href="/admin/blog/new">Tambah Artikel</Link>
              </Button>
            </div>

            <div className="mt-8">
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Judul</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Kategori</th>
                      <th className="px-4 py-3 font-semibold">Publish</th>
                      <th className="px-4 py-3 font-semibold">Update</th>
                      <th className="px-4 py-3 font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {overview?.latestPosts.length ? (
                      overview.latestPosts.map((post) => (
                        <tr key={post.id}>
                          <td className="px-4 py-3 font-medium text-slate-900">
                            <Link className="transition hover:text-orange-600" href={`/admin/blog/${post.id}/edit`}>
                              {post.title}
                            </Link>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClassName(post.status)}`}>
                              {post.status === BlogStatus.PUBLISHED ? "Published" : "Draft"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-600">{post.category}</td>
                          <td className="px-4 py-3 text-slate-600">{post.publishedAt ? post.publishedAt.toLocaleString("id-ID") : "-"}</td>
                          <td className="px-4 py-3 text-slate-600">{post.updatedAt.toLocaleString("id-ID")}</td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-2">
                              <Button asChild size="sm" variant="outline">
                                <Link href={`/admin/blog/${post.id}/edit`}>Edit</Link>
                              </Button>
                              {post.status === BlogStatus.DRAFT ? (
                                <form action={publishBlogPost.bind(null, post.id)}>
                                  <Button size="sm" type="submit">
                                    Publish
                                  </Button>
                                </form>
                              ) : (
                                <form action={unpublishBlogPost.bind(null, post.id)}>
                                  <Button size="sm" type="submit" variant="outline">
                                    Jadikan Draft
                                  </Button>
                                </form>
                              )}
                              <form action={deleteBlogPost.bind(null, post.id)}>
                                <Button size="sm" type="submit" variant="ghost">
                                  Hapus
                                </Button>
                              </form>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="px-4 py-6 text-slate-500" colSpan={6}>
                          Belum ada artikel di database admin. Ini normal untuk fase fondasi awal.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
