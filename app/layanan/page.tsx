import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTASection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceCard } from "@/components/sections/service-card";
import { getFeaturedServices, services } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Layanan Tukang dan Teknisi Lombok | TukangDiLombok.com",
  description: "Daftar lengkap layanan tukang bangunan, renovasi rumah, AC, listrik, CCTV, ledeng, las, interior, kanopi, pagar, smart home, dan layanan teknisi lain di Lombok.",
  path: "/layanan",
});

export const revalidate = 3600;

export default function ServicesPage() {
  const featuredServices = getFeaturedServices();
  const categories = [...new Set(services.map((service) => service.category))];
  const quickNeeds = featuredServices.flatMap((service) => service.problems?.slice(0, 2) ?? service.useCases.slice(0, 2)).slice(0, 6);
  const steps = [
    "Pilih layanan yang paling mendekati kebutuhan Anda, misalnya bangunan, renovasi, AC, listrik, atau CCTV.",
    "Kirim lokasi, jenis masalah, foto area, dan target hasil melalui WhatsApp agar tim kami memahami kebutuhan lebih cepat.",
    "Tim membantu konsultasi awal, survey bila diperlukan, lalu menyusun saran pengerjaan dan penjadwalan.",
  ];

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description="TukangDiLombok melayani kebutuhan bangunan, renovasi, AC, listrik, CCTV, dan layanan teknisi lain untuk rumah, villa, hotel, kantor, ruko, kos, dan properti komersial di seluruh Lombok."
          eyebrow="Halaman Layanan"
          title="Pilih layanan tukang dan teknisi yang paling sesuai dengan kebutuhan Anda"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Layanan Aktif</div>
            <div className="mt-3 text-4xl font-black text-slate-900">{services.length}</div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Mencakup pekerjaan bangunan, perbaikan, instalasi, dan maintenance untuk kebutuhan hunian maupun properti usaha.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Kategori Inti</div>
            <div className="mt-3 text-4xl font-black text-slate-900">{categories.length}</div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Konstruksi, renovasi, teknisi, dan kebutuhan properti lain yang paling sering dicari pelanggan di Lombok.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Sistem Kerja</div>
            <div className="mt-3 text-2xl font-black text-slate-900">Harian, borongan, bertahap</div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Pola kerja fleksibel disesuaikan dengan skala proyek, kondisi lapangan, dan target pengerjaan pelanggan.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description="Ini adalah layanan yang paling sering diminta untuk rumah tinggal, villa, homestay, hotel, ruko, dan bangunan usaha di berbagai area Lombok."
          eyebrow="Layanan Unggulan"
          title="Fokus utama yang paling sering dikerjakan tim kami"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {featuredServices.map((service) => (
            <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm" key={service.slug}>
              <div className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">{service.category}</div>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900">{service.name}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{service.heroIntro ?? service.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {(service.workItems?.slice(0, 4) ?? service.benefits.slice(0, 4)).map((item) => (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700" key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <Link
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition hover:text-orange-600"
                href={`/layanan/${service.slug}`}
              >
                Lihat detail layanan
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            description="Kebutuhan pelanggan biasanya berawal dari masalah yang ingin segera diselesaikan. Jika salah satu poin ini mirip dengan kondisi Anda, langsung konsultasikan supaya kami bantu arahkan ke layanan yang paling tepat."
            eyebrow="Kebutuhan Umum"
            title="Masalah yang paling sering dikonsultasikan"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {quickNeeds.map((item) => (
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 text-sm font-medium leading-7 text-slate-700 shadow-sm" key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description="Seluruh layanan tetap tersedia dalam struktur yang rapi agar Anda bisa langsung menuju halaman detail yang paling relevan dengan kebutuhan pekerjaan dan area Anda."
          eyebrow="Daftar Lengkap"
          title="Semua layanan TukangDiLombok.com"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            description="Proses ini dibuat sesederhana mungkin agar pelanggan bisa cepat mendapat arahan tanpa harus bingung memilih sistem kerja dari awal."
            eyebrow="Cara Mulai"
            title="Alur konsultasi sebelum pekerjaan berjalan"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {steps.map((step, index) => (
              <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm" key={step}>
                <div className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">Langkah {index + 1}</div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <CTASection
          description="Jika belum yakin layanan mana yang paling pas, cukup kirim jenis masalah, lokasi, foto area, dan target hasil melalui WhatsApp. Tim kami bantu arahkan ke layanan yang paling relevan."
          message="Halo TukangDiLombok.com, saya ingin konsultasi memilih layanan tukang yang paling sesuai untuk kebutuhan saya."
          title="Masih bingung pilih layanan yang cocok? Konsultasikan sekarang"
        />
      </section>
    </div>
  );
}
