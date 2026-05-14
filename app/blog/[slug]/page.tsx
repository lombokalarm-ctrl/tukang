import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Clock3, Share2 } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { ArticleCard } from "@/components/sections/article-card";
import { CTASection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/blog";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { formatDate } from "@/lib/utils";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return buildMetadata({ title: "Artikel Tidak Ditemukan", description: "Artikel tidak ditemukan.", path: "/blog" });
  }

  return buildMetadata({
    title: `${article.title} | Blog TukangDiLombok.com`,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    keywords: article.keywords,
    image: article.coverImage,
    type: "article",
  });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(article.slug, 3);
  const articleUrl = absoluteUrl(`/blog/${article.slug}`);
  const breadcrumbs = [
    { name: "Beranda", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: article.title, path: `/blog/${article.slug}` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={articleSchema(article, `/blog/${article.slug}`)} />
      <Breadcrumbs items={breadcrumbs} />

      <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="min-w-0 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="text-sm font-black uppercase tracking-[0.24em] text-orange-600">{article.category}</div>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">{article.title}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{article.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span>{formatDate(article.publishedAt)}</span>
            <span>Update {formatDate(article.updatedAt)}</span>
            <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" />{article.readingTime}</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-orange-300 hover:text-orange-600" href={`https://wa.me/?text=${encodeURIComponent(articleUrl)}`} rel="noreferrer" target="_blank"><Share2 className="h-4 w-4" />Bagikan via WhatsApp</a>
            <a className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-orange-300 hover:text-orange-600" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title)}`} rel="noreferrer" target="_blank"><Share2 className="h-4 w-4" />Share ke X</a>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline">
              <Link href="/harga">
                Lihat Harga dan Estimasi
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/testimoni">
                Baca Testimoni
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="prose-content mt-10 max-w-none"><article.Content /></div>
        </article>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <div className="text-sm font-black uppercase tracking-[0.24em] text-orange-600">Daftar Isi</div>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              {article.toc.map((item) => (
                <a className="leading-6 text-slate-600 transition hover:text-orange-600" href={`#${item.id}`} key={item.id}>{item.level === 3 ? "- " : ""}{item.text}</a>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-16 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <SectionHeading
          description="Artikel blog membantu Anda memahami konteks kebutuhan. Jika Anda sudah masuk fase mempertimbangkan biaya, ingin melihat bukti sosial, atau siap menjelaskan kebutuhan, tiga jalur ini biasanya paling relevan."
          eyebrow="Setelah Membaca"
          title="Lanjut ke langkah berikutnya"
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">Harga</div>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900">Pelajari estimasi lebih dulu</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Halaman harga menjelaskan faktor biaya dan pilihan sistem kerja yang paling umum untuk kebutuhan jasa tukang di Lombok.
            </p>
            <Button asChild className="mt-6" variant="outline">
              <Link href="/harga">Buka Halaman Harga</Link>
            </Button>
          </article>
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">Testimoni</div>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900">Lihat pengalaman pelanggan lain</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Halaman testimoni membantu memberi gambaran bagaimana pelanggan lain menilai respons, komunikasi, dan hasil kerja tim kami.
            </p>
            <Button asChild className="mt-6" variant="outline">
              <Link href="/testimoni">Buka Halaman Testimoni</Link>
            </Button>
          </article>
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">Kontak</div>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900">Siap jelaskan kebutuhan Anda</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Halaman kontak membantu Anda menyiapkan detail layanan, lokasi, dan target hasil agar konsultasi lewat WhatsApp bisa lebih cepat ditindaklanjuti.
            </p>
            <Button asChild className="mt-6" variant="outline">
              <Link href="/kontak">Buka Halaman Kontak</Link>
            </Button>
          </article>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-black uppercase tracking-[0.24em] text-orange-600">Artikel Terkait</div>
            <h2 className="mt-3 text-3xl font-black text-slate-900">Lanjutkan membaca topik serupa</h2>
          </div>
          <Link className="text-sm font-semibold text-sky-700 hover:text-orange-600" href="/blog">Lihat semua artikel</Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {related.map((item) => (
            <ArticleCard article={item} key={item.slug} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <CTASection description="Setelah membaca artikel ini, Anda bisa lanjut konsultasi untuk kebutuhan tukang, renovasi, listrik, AC, atau teknisi properti di Lombok." message={`Halo TukangDiLombok.com, saya ingin konsultasi setelah membaca artikel ${article.title}.`} title="Butuh bantuan langsung? Konsultasi lewat WhatsApp" />
      </section>
    </div>
  );
}
