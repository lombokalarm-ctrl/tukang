import type { Metadata } from "next";
import { ArticleCard } from "@/components/sections/article-card";
import { CTASection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { getAllArticles } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog SEO Tukang Lombok | TukangDiLombok.com",
  description: "Artikel SEO seputar jasa tukang, renovasi rumah, teknisi listrik, tukang AC, dan tips properti di Lombok.",
  path: "/blog",
  type: "article",
});

export const revalidate = 3600;

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description="Kumpulan artikel SEO untuk menangkap traffic informasional dan membantu calon pelanggan memahami layanan tukang dan teknisi di Lombok."
          eyebrow="Blog"
          title="Artikel terbaru seputar tukang, renovasi, dan teknisi di Lombok"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard article={article} key={article.slug} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <CTASection
          description="Ingin artikel disesuaikan dengan area atau layanan yang Anda targetkan? Struktur blog ini siap dikembangkan untuk topical cluster SEO lokal Lombok."
          message="Halo TukangDiLombok.com, saya ingin konsultasi kebutuhan jasa tukang setelah membaca artikel blog."
          title="Sudah menemukan insight yang Anda butuhkan? Lanjut konsultasi"
        />
      </section>
    </div>
  );
}
