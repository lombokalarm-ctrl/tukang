import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { CTASection } from "@/components/sections/cta-section";
import { ServiceCard } from "@/components/sections/service-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { getAllLandingPages, getLocationBySlug, getRelatedLocations, locations, services } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return buildMetadata({ title: "Area Tidak Ditemukan", description: "Area tidak ditemukan.", path: "/area-layanan" });
  }

  return buildMetadata({
    title: `Jasa Tukang ${location.name} | TukangDiLombok.com`,
    description: location.description,
    path: `/area-layanan/${location.slug}`,
    keywords: location.keywords,
  });
}

export default async function AreaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const landingLinks = getAllLandingPages().filter((item) => item.location.slug === location.slug).slice(0, 8);
  const relatedAreas = getRelatedLocations(location.slug, 4);
  const breadcrumbs = [
    { name: "Beranda", path: "/" },
    { name: "Area Layanan", path: "/area-layanan" },
    { name: location.name, path: `/area-layanan/${location.slug}` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />

      <section className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <div className="text-sm font-black uppercase tracking-[0.24em] text-orange-600">Area Layanan</div>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Jasa Tukang di {location.name}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{location.description}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {location.neighborhoods.map((item) => (
              <span className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600" key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Layanan yang sering dipesan di area ini</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">Mulai dari tukang bangunan, renovasi rumah, AC, listrik, CCTV, plumbing, interior, internet WiFi, hingga maintenance properti.</p>
          <div className="mt-6"><Button asChild><Link href="/kontak">Konsultasi Area Ini</Link></Button></div>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading description="Kategori jasa yang paling relevan untuk rumah, villa, hotel, ruko, dan properti komersial di area ini." eyebrow="Layanan Populer" title={`Layanan yang tersedia di ${location.name}`} />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.slice(0, 8).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <SectionHeading description="Contoh landing page programmatic SEO yang menggabungkan layanan dan area untuk keyword lokal berintensi tinggi." eyebrow="Landing Page SEO" title={`Contoh kombinasi layanan + area untuk ${location.name}`} />
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {landingLinks.map((landing) => (
            <Link className="rounded-2xl border border-slate-200 px-4 py-4 text-sm font-medium text-slate-700 transition hover:border-orange-300 hover:text-orange-600" href={landing.path} key={landing.slug}>
              {landing.service.name} {landing.location.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading description="Area terdekat dan kawasan lain yang juga menjadi target SEO lokal website ini." eyebrow="Area Terkait" title="Jelajahi area layanan lainnya" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {relatedAreas.map((area) => (
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6" key={area.slug}>
              <h3 className="text-lg font-bold text-slate-900">{area.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{area.excerpt}</p>
              <Link className="mt-4 inline-flex text-sm font-semibold text-sky-700 hover:text-orange-600" href={`/area-layanan/${area.slug}`}>Lihat area</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <CTASection description={`Kirim lokasi detail di ${location.name} dan ceritakan kebutuhan pekerjaan Anda agar tim kami bantu arahkan layanan yang paling tepat.`} message={`Halo TukangDiLombok.com, saya ingin konsultasi jasa tukang di area ${location.name}.`} title={`Butuh tukang di ${location.name}? Hubungi lewat WhatsApp`} />
      </section>
    </div>
  );
}
