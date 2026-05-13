import type { Metadata } from "next";
import { CTASection } from "@/components/sections/cta-section";
import { PortfolioCard } from "@/components/sections/portfolio-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { portfolioItems } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio Proyek Tukang Lombok | TukangDiLombok.com",
  description: "Contoh portfolio before-after proyek renovasi, instalasi teknisi, dan improvement properti di Lombok.",
  path: "/portfolio",
});

export const revalidate = 3600;

export default function PortfolioPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description="Portfolio dummy ini dibuat untuk memperlihatkan struktur presentasi hasil kerja yang siap diisi project nyata dan before-after visual."
          eyebrow="Portfolio"
          title="Contoh proyek tukang dan teknisi di Lombok"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {portfolioItems.map((item) => (
            <PortfolioCard item={item} key={item.slug} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <CTASection
          description="Punya proyek yang ingin ditangani lebih rapi dan profesional? Ceritakan lokasi, jenis bangunan, dan target hasil lewat WhatsApp."
          message="Halo TukangDiLombok.com, saya ingin konsultasi proyek dan melihat estimasi penanganannya."
          title="Siap mulai proyek Anda di Lombok? Hubungi tim sekarang"
        />
      </section>
    </div>
  );
}
