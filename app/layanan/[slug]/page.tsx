import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { ArticleCard } from "@/components/sections/article-card";
import { AreaCard } from "@/components/sections/area-card";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceCard } from "@/components/sections/service-card";
import { Button } from "@/components/ui/button";
import { getAllArticles } from "@/lib/blog";
import { getFeaturedLocations, getRelatedServices, getServiceBySlug, siteFaqs, services } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return buildMetadata({ title: "Layanan Tidak Ditemukan", description: "Layanan tidak ditemukan.", path: "/layanan" });
  }

  return buildMetadata({
    title: `${service.name} Lombok | ${service.shortName} Profesional`,
    description: service.description,
    path: `/layanan/${service.slug}`,
    keywords: service.keywords,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(service.slug, 4);
  const areas = getFeaturedLocations().slice(0, 4);
  const articles = getAllArticles().filter((article) => article.keywords.some((keyword) => service.keywords.includes(keyword))).slice(0, 3);
  const breadcrumbs = [
    { name: "Beranda", path: "/" },
    { name: "Layanan", path: "/layanan" },
    { name: service.name, path: `/layanan/${service.slug}` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={serviceSchema(service, `/layanan/${service.slug}`)} />
      <JsonLd data={faqSchema(siteFaqs.slice(0, 4))} />
      <Breadcrumbs items={breadcrumbs} />

      <section className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <div className="text-sm font-black uppercase tracking-[0.24em] text-orange-600">Layanan Profesional</div>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">{service.name} di Lombok</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{service.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/kontak">Konsultasi Sekarang</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/area-layanan">
                Lihat Area Layanan
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Keunggulan layanan</h2>
          <div className="mt-5 space-y-4">
            {service.benefits.map((benefit) => (
              <div className="rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700" key={benefit}>
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Kapan layanan ini paling dibutuhkan?</h2>
          <ul className="mt-5 space-y-3 text-slate-600">
            {service.useCases.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
          <h2 className="text-2xl font-bold">Cocok untuk rumah dan properti komersial</h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            Layanan ini relevan untuk rumah tinggal, villa, hotel, kantor, ruko, properti sewa, dan proyek skala kecil sampai menengah di seluruh Pulau Lombok.
          </p>
          <div className="mt-6 text-sm leading-8 text-slate-300">Keyword utama: {service.keywords.join(", ")}.</div>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading description="Area prioritas untuk layanan ini dengan internal linking ke halaman lokal." eyebrow="Area Terkait" title={`Area layanan populer untuk ${service.shortName}`} />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {areas.map((area) => (
            <AreaCard area={area} key={area.slug} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading description="Layanan terkait untuk membantu calon pelanggan menemukan solusi paling relevan." eyebrow="Layanan Terkait" title="Jelajahi layanan lain yang sering dipesan bersamaan" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {relatedServices.map((item) => (
            <ServiceCard key={item.slug} service={item} />
          ))}
        </div>
      </section>

      {articles.length > 0 ? (
        <section className="mt-16">
          <SectionHeading description="Artikel pendukung untuk memperkuat topical authority halaman layanan." eyebrow="Artikel Terkait" title="Baca juga panduan yang relevan" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard article={article} key={article.slug} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-16">
        <FAQSection description="Pertanyaan umum sebelum memesan layanan ini di Lombok." items={siteFaqs.slice(0, 4)} title={`FAQ ${service.name}`} />
      </section>

      <section className="mt-16">
        <CTASection description={`Konsultasikan kebutuhan ${service.name.toLowerCase()} Anda bersama tim TukangDiLombok.com.`} message={`Halo TukangDiLombok.com, saya ingin konsultasi ${service.name.toLowerCase()} di Lombok.`} title={`Butuh ${service.name.toLowerCase()} di Lombok? Hubungi sekarang`} />
      </section>
    </div>
  );
}
