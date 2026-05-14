import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { ArticleCard } from "@/components/sections/article-card";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { PortfolioCard } from "@/components/sections/portfolio-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { TestimonialCard } from "@/components/sections/testimonial-card";
import { Button } from "@/components/ui/button";
import { getAllArticles } from "@/lib/blog";
import { getAllLandingPages, getLandingBySlug, getRelatedServices, getServicePortfolio, getServiceTestimonials, siteFaqs } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, landingServiceSchema } from "@/lib/schema";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllLandingPages().map((landing) => ({ slug: landing.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const landing = getLandingBySlug(slug);

  if (!landing) {
    return buildMetadata({ title: "Landing Page Tidak Ditemukan", description: "Landing page tidak ditemukan.", path: "/" });
  }

  return buildMetadata({
    title: `${landing.service.name} ${landing.location.name} | TukangDiLombok.com`,
    description: landing.description,
    path: landing.path,
    keywords: [...landing.service.keywords, ...landing.location.keywords],
  });
}

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const landing = getLandingBySlug(slug);

  if (!landing) {
    notFound();
  }

  const relatedLandings = getAllLandingPages().filter((item) => item.location.slug === landing.location.slug && item.slug !== landing.slug).slice(0, 6);
  const portfolio = getServicePortfolio(landing.service.slug).slice(0, 2);
  const testimonials = getServiceTestimonials(landing.service.slug).slice(0, 3);
  const relatedArticles = getAllArticles().filter((article) => article.keywords.some((keyword) => landing.service.keywords.includes(keyword))).slice(0, 3);
  const faqItems = landing.faq?.length ? landing.faq : siteFaqs.slice(0, 4);
  const breadcrumbs = [
    { name: "Beranda", path: "/" },
    { name: landing.service.name, path: `/layanan/${landing.service.slug}` },
    { name: landing.location.name, path: `/area-layanan/${landing.location.slug}` },
    { name: `${landing.service.name} ${landing.location.name}`, path: landing.path },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={landingServiceSchema(landing)} />
      <JsonLd data={faqSchema(faqItems)} />
      <Breadcrumbs items={breadcrumbs} />

      <section className="grid gap-10 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <div className="text-sm font-black uppercase tracking-[0.24em] text-orange-600">Landing Page SEO</div>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">{landing.service.name} di {landing.location.name}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{landing.intro ?? landing.description}</p>
          <div className="mt-8 space-y-3 text-sm leading-7 text-slate-600">
            <p>
              Jika Anda mencari {landing.service.name.toLowerCase()} untuk rumah, villa, hotel, kantor, ruko, atau properti sewa di {landing.location.name},
              halaman ini disusun untuk memberi informasi ringkas dan langsung mengarahkan ke konsultasi WhatsApp.
            </p>
            {landing.localNeed ? <p>{landing.localNeed}</p> : <p>Struktur copywriting pada halaman ini dibuat untuk keyword lokal berintensi tinggi dan siap digandakan ke ribuan kombinasi layanan + area di Lombok.</p>}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/kontak">Konsultasi Sekarang</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/harga">
                Lihat Harga dan Estimasi
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/testimoni">Baca Testimoni</Link>
            </Button>
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Kenapa cocok untuk {landing.location.name}?</h2>
          <div className="mt-5 space-y-4">
            {(landing.reasons?.length ? landing.reasons : landing.location.neighborhoods.slice(0, 4)).map((item) => (
              <div className="rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700" key={item}>
                {landing.reasons?.length ? item : `Jangkauan area termasuk ${item} dan sekitarnya dengan koordinasi cepat via WhatsApp.`}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Masalah yang sering dicari pelanggan</h2>
          <ul className="mt-5 space-y-3 text-slate-600">
            {(landing.localProblems?.length ? landing.localProblems : landing.service.useCases).map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
          <h2 className="text-2xl font-bold">Pekerjaan yang bisa kami tangani</h2>
          <ul className="mt-5 space-y-3 text-slate-300">
            {(landing.handledWork?.length ? landing.handledWork : landing.service.workItems ?? landing.service.useCases).map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
      </section>

      {landing.idealForText ? (
        <section className="mt-16 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <SectionHeading
            description="Halaman lokal seperti ini dibuat untuk menjawab kebutuhan pelanggan yang sudah dekat dengan keputusan konsultasi atau booking."
            eyebrow="Cocok Untuk"
            title={`Siapa yang paling cocok menggunakan layanan ini di ${landing.location.name}?`}
          />
          <p className="mt-8 max-w-4xl text-base leading-8 text-slate-600">{landing.idealForText}</p>
        </section>
      ) : null}

      {landing.systemAndPricing?.length ? (
        <section className="mt-16 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <SectionHeading
            description="Penjelasan singkat tentang cara kerja, estimasi, dan kapan survey dibutuhkan untuk halaman lokal ini."
            eyebrow="Sistem Kerja"
            title="Catatan sistem kerja dan estimasi"
          />
          <div className="mt-8 space-y-4">
            {landing.systemAndPricing.map((item) => (
              <div className="rounded-2xl bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700" key={item}>
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline">
              <Link href="/harga">
                Buka Panduan Harga Lengkap
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/kontak">Minta Estimasi Awal</Link>
            </Button>
          </div>
        </section>
      ) : null}

      {landing.caseStudies?.length ? (
        <section className="mt-16 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <SectionHeading
            description="Contoh kebutuhan proyek lokal membantu halaman ini terasa lebih relevan dan tidak generik."
            eyebrow="Contoh Proyek"
            title={`Contoh kebutuhan pelanggan di ${landing.location.name}`}
          />
          <div className="mt-8 space-y-4">
            {landing.caseStudies.map((item) => (
              <div className="rounded-2xl bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700" key={item}>
                {item}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {portfolio.length > 0 ? (
        <section className="mt-16">
          <SectionHeading description="Contoh project terkait agar halaman landing memiliki bukti sosial dan konteks pekerjaan yang lebih kuat." eyebrow="Portfolio Terkait" title={`Contoh proyek ${landing.service.shortName.toLowerCase()} di Lombok`} />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {portfolio.map((item) => <PortfolioCard item={item} key={item.slug} />)}
          </div>
        </section>
      ) : null}

      {testimonials.length > 0 ? (
        <section className="mt-16">
          <SectionHeading description="Testimoni membantu meningkatkan trust pada landing page lokal seperti ini." eyebrow="Testimoni" title="Apa kata pelanggan" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => <TestimonialCard item={item} key={item.id} />)}
          </div>
        </section>
      ) : null}

      <section className="mt-16 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <SectionHeading description="Internal linking ke kombinasi layanan lain di area yang sama untuk memperkuat clustering SEO lokal." eyebrow="Layanan Terkait" title={`Layanan lain di ${landing.location.name}`} />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {relatedLandings.map((item) => (
            <Link className="rounded-2xl border border-slate-200 px-4 py-4 text-sm font-medium text-slate-700 transition hover:border-orange-300 hover:text-orange-600" href={item.path} key={item.slug}>{item.service.name} {item.location.name}</Link>
          ))}
        </div>
      </section>

      {relatedArticles.length > 0 ? (
        <section className="mt-16">
          <SectionHeading description="Artikel SEO terkait untuk mendukung ranking halaman layanan lokal." eyebrow="Artikel Terkait" title="Baca artikel pendukung" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {relatedArticles.map((article) => <ArticleCard article={article} key={article.slug} />)}
          </div>
        </section>
      ) : null}

      <section className="mt-16 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <SectionHeading
          description="Pengunjung dari pencarian lokal biasanya ingin dua hal sebelum chat: gambaran estimasi dan bukti sosial. Bagian ini mempermudah keduanya tanpa harus kembali ke halaman lain."
          eyebrow="Jalur Lanjutan"
          title={`Butuh pembanding sebelum booking di ${landing.location.name}?`}
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">Harga</div>
            <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-900">Pelajari cara estimasi disusun</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Halaman harga menjelaskan faktor biaya, sistem kerja, dan informasi yang sebaiknya Anda siapkan sebelum meminta estimasi awal.
            </p>
            <Button asChild className="mt-6" variant="outline">
              <Link href="/harga">
                Buka Halaman Harga
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </article>
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">Testimoni</div>
            <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-900">Lihat pengalaman pelanggan lain</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Halaman testimoni membantu Anda melihat bagaimana pelanggan lain menilai respons, komunikasi, dan hasil kerja TukangDiLombok.
            </p>
            <Button asChild className="mt-6" variant="outline">
              <Link href="/testimoni">
                Buka Halaman Testimoni
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </article>
        </div>
      </section>

      <section className="mt-16"><FAQSection description="Pertanyaan umum sebelum memesan layanan ini di area Anda." items={faqItems} title={`FAQ ${landing.service.name} ${landing.location.name}`} /></section>
      <section className="mt-16"><CTASection description={`Konsultasikan kebutuhan ${landing.service.name.toLowerCase()} Anda di ${landing.location.name}. Kirim lokasi, foto area kerja, dan target hasil agar tim kami bantu lebih cepat.`} message={`Halo TukangDiLombok.com, saya ingin konsultasi ${landing.service.name.toLowerCase()} di area ${landing.location.name}.`} title={landing.primaryCta ?? `Butuh ${landing.service.name.toLowerCase()} di ${landing.location.name}? Chat sekarang`} /></section>
    </div>
  );
}
