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
  const articleTopics = [
    "Estimasi biaya bangun rumah di Lombok",
    "Kisaran harga tukang harian dan sistem kerja",
    "Panduan memulai renovasi rumah agar tidak salah langkah",
  ];
  const readingBenefits = [
    "Membantu calon pelanggan memahami konteks biaya sebelum konsultasi.",
    "Menjawab pertanyaan awal yang paling sering muncul di WhatsApp.",
    "Mendukung topical authority SEO untuk layanan prioritas di Lombok.",
  ];

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description="Blog TukangDiLombok berisi artikel edukatif seputar biaya, renovasi, tukang harian, dan kebutuhan properti lain di Lombok agar calon pelanggan punya gambaran awal sebelum konsultasi."
          eyebrow="Blog"
          title="Pusat artikel edukasi seputar tukang, renovasi, dan teknisi di Lombok"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Artikel Aktif</div>
            <div className="mt-3 text-4xl font-black text-slate-900">{articles.length}</div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Artikel prioritas disusun untuk topik dengan intent pencarian tinggi dan relevan langsung ke layanan utama.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Fokus Topik</div>
            <div className="mt-3 text-2xl font-black text-slate-900">Biaya, renovasi, tukang harian</div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Tiga cluster awal ini membantu mengarahkan pengunjung dari fase riset menuju kebutuhan konsultasi yang lebih konkret.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Arah Konten</div>
            <div className="mt-3 text-2xl font-black text-slate-900">Informasi yang mudah ditindaklanjuti</div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Setiap artikel dirancang untuk membantu pembaca memahami langkah awal sebelum menghubungi tim melalui WhatsApp.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            description="Topik ini menjadi fondasi awal topical authority blog dan bisa terus dikembangkan ke area, layanan, dan kebutuhan properti yang lebih spesifik."
            eyebrow="Topik Prioritas"
            title="Artikel yang paling penting untuk fase awal pengembangan SEO"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {articleTopics.map((item) => (
              <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm" key={item}>
                <p className="text-sm font-semibold leading-7 text-slate-700">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description="Bagian ini tetap menjadi daftar artikel utama yang bisa dibaca pengunjung untuk memahami konteks layanan sebelum menghubungi tim."
          eyebrow="Artikel Terbaru"
          title="Baca artikel yang paling relevan dengan kebutuhan Anda"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard article={article} key={article.slug} />
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            description="Blog bukan hanya untuk traffic. Kontennya juga harus membantu pembaca mengambil keputusan lebih cepat setelah memahami konteks kebutuhan mereka."
            eyebrow="Nilai Blog"
            title="Apa manfaat membaca artikel di TukangDiLombok"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {readingBenefits.map((item) => (
              <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm" key={item}>
                <p className="text-sm leading-7 text-slate-600">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <CTASection
          description="Jika Anda sudah menemukan gambaran awal dari artikel blog, lanjutkan konsultasi melalui WhatsApp agar tim kami membantu menyesuaikan kebutuhan, lokasi, dan skala pekerjaan Anda."
          message="Halo TukangDiLombok.com, saya ingin konsultasi kebutuhan jasa tukang setelah membaca artikel blog."
          title="Sudah menemukan insight yang Anda butuhkan? Lanjut konsultasi"
        />
      </section>
    </div>
  );
}
