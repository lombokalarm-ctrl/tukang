import type { Metadata } from "next";
import { CTASection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Tentang Kami | TukangDiLombok.com",
  description: "Tentang platform TukangDiLombok.com sebagai website jasa tukang dan teknisi profesional dengan fokus SEO lokal dan konversi WhatsApp.",
  path: "/tentang-kami",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <SectionHeading
            description="TukangDiLombok.com dirancang sebagai platform digital untuk membantu pemilik rumah, villa, hotel, kantor, dan properti komersial menemukan tukang serta teknisi profesional di Lombok dengan lebih cepat."
            eyebrow="Tentang Kami"
            title="Platform jasa tukang Lombok yang dibangun untuk trust dan konversi"
          />
          <div className="mt-8 space-y-5 text-base leading-8 text-slate-600">
            <p>
              Fokus utama kami adalah SEO lokal dan kemudahan konsultasi via WhatsApp. Karena itu, setiap halaman dirancang agar mudah ditemukan di Google sekaligus memudahkan calon pelanggan mengirim inquiry dengan cepat.
            </p>
            <p>
              Website ini juga disiapkan dengan arsitektur scalable untuk programmatic SEO, penambahan layanan baru, area baru, artikel baru, dan landing page baru tanpa mengorbankan performa.
            </p>
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Nilai utama</h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
            <div className="rounded-2xl bg-slate-50 px-4 py-4">Respons cepat untuk inquiry lokal Lombok.</div>
            <div className="rounded-2xl bg-slate-50 px-4 py-4">Struktur SEO siap untuk ribuan halaman layanan + area.</div>
            <div className="rounded-2xl bg-slate-50 px-4 py-4">Desain mobile-first untuk conversion rate yang lebih tinggi.</div>
            <div className="rounded-2xl bg-slate-50 px-4 py-4">Konten edukatif blog untuk memperkuat topical authority.</div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <CTASection
          description="Jika Anda ingin menggunakan platform ini untuk kebutuhan rumah, villa, hotel, kantor, atau proyek properti di Lombok, konsultasi dapat dimulai dari WhatsApp."
          message="Halo TukangDiLombok.com, saya ingin konsultasi kebutuhan jasa tukang di Lombok."
          title="Mari mulai konsultasi kebutuhan properti Anda"
        />
      </section>
    </div>
  );
}
