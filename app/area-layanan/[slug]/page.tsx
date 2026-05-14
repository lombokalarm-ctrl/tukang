import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { CTASection } from "@/components/sections/cta-section";
import { ServiceCard } from "@/components/sections/service-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { getAllLandingPages, getLocationBySlug, getRelatedLocations, locations, services } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

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
  const faqItems = location.faq?.length ? location.faq : [];
  const breadcrumbs = [
    { name: "Beranda", path: "/" },
    { name: "Area Layanan", path: "/area-layanan" },
    { name: location.name, path: `/area-layanan/${location.slug}` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      {faqItems.length ? <JsonLd data={faqSchema(faqItems)} /> : null}
      <Breadcrumbs items={breadcrumbs} />

      <section className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <div className="text-sm font-black uppercase tracking-[0.24em] text-orange-600">Area Layanan</div>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">{location.heroTitle ?? `Jasa Tukang di ${location.name}`}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{location.heroIntro ?? location.description}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {location.neighborhoods.map((item) => (
              <span className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600" key={item}>{item}</span>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/kontak">Konsultasi Area Ini</Link>
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
          <h2 className="text-2xl font-bold text-slate-900">Jenis properti dominan di area ini</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {(location.propertyTypes?.length ? location.propertyTypes : [location.type]).map((item) => (
              <span className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700" key={item}>
                {item}
              </span>
            ))}
          </div>
          <div className="mt-6"><Button asChild variant="outline"><Link href="/area-layanan">Lihat Semua Area</Link></Button></div>
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

      {location.popularServices?.length ? (
        <section className="mt-16 grid gap-10 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Layanan yang paling sering diminta</h2>
            <ul className="mt-5 space-y-3 text-slate-600">
              {location.popularServices.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
            <h2 className="text-2xl font-bold">Masalah umum di area ini</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              {(location.commonProblems ?? []).map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {location.idealForText ? (
        <section className="mt-16 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <SectionHeading
            description="Area ini memiliki kebutuhan tukang dan teknisi yang beragam, mulai dari hunian pribadi hingga properti usaha dan hospitality."
            eyebrow="Cocok Untuk"
            title={`Siapa yang paling cocok menggunakan layanan di ${location.name}?`}
          />
          <p className="mt-8 max-w-4xl text-base leading-8 text-slate-600">{location.idealForText}</p>
        </section>
      ) : null}

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

      {location.sampleProjects?.length ? (
        <section className="mt-16 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <SectionHeading
            description="Contoh kebutuhan proyek memberi gambaran jenis pekerjaan yang paling sering ditangani di area ini."
            eyebrow="Contoh Proyek"
            title={`Pekerjaan yang sering ditangani di ${location.name}`}
          />
          <div className="mt-8 space-y-4">
            {location.sampleProjects.map((item) => (
              <div className="rounded-2xl bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700" key={item}>
                {item}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-16 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <SectionHeading
          description="Pengunjung area biasanya ingin memastikan dua hal sebelum konsultasi: bagaimana estimasi awal dibentuk dan apakah layanan ini benar-benar dipercaya pelanggan lain."
          eyebrow="Jalur Lanjutan"
          title={`Informasi penting sebelum memesan layanan di ${location.name}`}
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">Harga</div>
            <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-900">Pelajari faktor estimasi lebih dulu</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Halaman harga menjelaskan cara estimasi awal disusun, faktor yang memengaruhi biaya, dan sistem kerja yang paling umum dipakai.
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
              Halaman testimoni membantu memperlihatkan bagaimana pelanggan menilai kecepatan respons, komunikasi, dan hasil kerja di berbagai area Lombok.
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

      {faqItems.length ? (
        <section className="mt-16">
          <SectionHeading
            align="center"
            description="Pertanyaan yang paling sering diajukan pelanggan sebelum memesan layanan di area ini."
            eyebrow="FAQ Area"
            title={`FAQ Jasa Tukang di ${location.name}`}
          />
          <div className="mt-8 space-y-4">
            {faqItems.map((item) => (
              <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-5 shadow-sm" key={item.question}>
                <h3 className="text-base font-bold text-slate-900">{item.question}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-16">
        <CTASection
          description={`Kirim lokasi detail di ${location.name} dan ceritakan kebutuhan pekerjaan Anda agar tim kami bantu arahkan layanan yang paling tepat.`}
          message={`Halo TukangDiLombok.com, saya ingin konsultasi jasa tukang di area ${location.name}.`}
          title={location.primaryCta ?? `Butuh tukang di ${location.name}? Hubungi lewat WhatsApp`}
        />
      </section>
    </div>
  );
}
