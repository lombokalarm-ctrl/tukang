import type { Metadata } from "next";
import { CTASection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceCard } from "@/components/sections/service-card";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Layanan Tukang dan Teknisi Lombok | TukangDiLombok.com",
  description: "Daftar lengkap layanan tukang bangunan, renovasi rumah, AC, listrik, CCTV, ledeng, las, interior, kanopi, pagar, smart home, dan layanan teknisi lain di Lombok.",
  path: "/layanan",
});

export const revalidate = 3600;

export default function ServicesPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description="Eksplor layanan paling dicari untuk rumah, villa, hotel, kantor, developer, kontraktor, dan property owner di seluruh Lombok."
          eyebrow="Halaman Layanan"
          title="Semua jasa tukang dan teknisi profesional di Lombok"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <CTASection
          description="Butuh bantuan memilih layanan yang paling tepat? Cukup kirim jenis masalah, lokasi, dan target hasil via WhatsApp."
          message="Halo TukangDiLombok.com, saya ingin konsultasi memilih layanan tukang yang paling sesuai."
          title="Masih bingung pilih layanan yang cocok? Konsultasikan dulu"
        />
      </section>
    </div>
  );
}
