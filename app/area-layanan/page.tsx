import type { Metadata } from "next";
import { AreaCard } from "@/components/sections/area-card";
import { CTASection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { buildMetadata } from "@/lib/seo";
import { locations } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Area Layanan Tukang Lombok | TukangDiLombok.com",
  description: "Daftar area layanan jasa tukang dan teknisi profesional di Mataram, Lombok Barat, Lombok Timur, Lombok Tengah, Lombok Utara, Senggigi, Praya, Selong, dan seluruh Lombok.",
  path: "/area-layanan",
});

export const revalidate = 3600;

export default function AreasPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description="Area layanan kami mencakup kota, kabupaten, dan kawasan populer di Lombok untuk kebutuhan rumah tangga maupun komersial."
          eyebrow="Area Layanan"
          title="Semua area layanan TukangDiLombok.com"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {locations.map((area) => (
            <AreaCard area={area} key={area.slug} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <CTASection
          description="Ingin cek apakah area Anda masuk prioritas jadwal? Kirim lokasi lengkap melalui WhatsApp agar tim kami bantu konfirmasi lebih cepat."
          message="Halo TukangDiLombok.com, saya ingin cek area layanan untuk lokasi saya di Lombok."
          title="Cek coverage area dan jadwal tim sekarang"
        />
      </section>
    </div>
  );
}
