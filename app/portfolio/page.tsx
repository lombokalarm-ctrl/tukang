import type { Metadata } from "next";
import { CTASection } from "@/components/sections/cta-section";
import { PortfolioCard } from "@/components/sections/portfolio-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { getLocationBySlug, getServiceBySlug, portfolioItems } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio Proyek Tukang Lombok | TukangDiLombok.com",
  description: "Contoh portfolio before-after proyek renovasi, instalasi teknisi, dan improvement properti di Lombok.",
  path: "/portfolio",
});

export const revalidate = 3600;

export default function PortfolioPage() {
  const serviceNames = [...new Set(portfolioItems.map((item) => getServiceBySlug(item.serviceSlug)?.shortName).filter(Boolean))].slice(0, 6);
  const propertyTypes = [...new Set(portfolioItems.map((item) => item.propertyType).filter(Boolean))].slice(0, 6);
  const locationNames = [...new Set(portfolioItems.map((item) => getLocationBySlug(item.locationSlug)?.name).filter(Boolean))].slice(0, 6);

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description="Portfolio TukangDiLombok menampilkan contoh jenis pekerjaan yang kami tangani untuk rumah tinggal, villa, homestay, hotel, ruko, kantor, dan berbagai properti lainnya di Lombok. Tujuannya agar calon pelanggan bisa melihat gambaran jenis proyek, ruang lingkup kerja, dan hasil yang diharapkan."
          eyebrow="Portfolio"
          title="Contoh proyek dan hasil kerja TukangDiLombok"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Proyek Tampil</div>
            <div className="mt-3 text-4xl font-black text-slate-900">{portfolioItems.length}</div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Contoh proyek yang mewakili kebutuhan renovasi, bangunan, AC, listrik, dan CCTV di berbagai area Lombok.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Jenis Properti</div>
            <div className="mt-3 text-2xl font-black text-slate-900">Hunian hingga hospitality</div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Portofolio mencakup rumah tinggal, villa, homestay, ruko, hingga properti usaha yang membutuhkan hasil rapi dan koordinasi jelas.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Fokus Hasil</div>
            <div className="mt-3 text-2xl font-black text-slate-900">Rapi, fungsional, relevan</div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Setiap contoh proyek menonjolkan perubahan kondisi awal, pekerjaan yang dilakukan, dan manfaat setelah pengerjaan selesai.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            description="Bagian ini membantu pengunjung memahami jenis pekerjaan yang paling sering dikerjakan dan area properti yang paling relevan dengan kebutuhan mereka."
            eyebrow="Cakupan Proyek"
            title="Portfolio mewakili berbagai jenis layanan dan properti"
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">Layanan</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {serviceNames.map((item) => (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">Properti</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {propertyTypes.map((item) => (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">Area</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {locationNames.map((item) => (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description="Setiap kartu portfolio merangkum kondisi awal, lingkup pekerjaan, dan hasil akhir agar calon pelanggan mendapat gambaran yang lebih realistis sebelum konsultasi."
          eyebrow="Contoh Pekerjaan"
          title="Lihat gambaran proyek yang pernah ditangani"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {portfolioItems.map((item) => (
            <PortfolioCard item={item} key={item.slug} />
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            description="Calon pelanggan biasanya ingin tahu apa manfaat setelah pekerjaan selesai. Karena itu, setiap contoh proyek disusun untuk menonjolkan hasil akhir yang terasa bagi pemilik properti."
            eyebrow="Nilai Hasil"
            title="Perubahan yang paling sering dicari pelanggan"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm leading-7 text-slate-600">Bangunan atau ruang terasa lebih rapi, lebih nyaman, dan lebih layak digunakan sehari-hari.</p>
            </article>
            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm leading-7 text-slate-600">Properti hospitality dan usaha menjadi lebih siap dipakai tamu, pelanggan, atau operasional harian.</p>
            </article>
            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm leading-7 text-slate-600">Pemilik properti mendapat gambaran kerja yang lebih jelas sebelum masuk ke tahap survey dan penjadwalan.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <CTASection
          description="Ingin proyek rumah, villa, homestay, toko, kantor, atau properti Anda ditangani dengan pengerjaan rapi dan komunikasi yang jelas? Ceritakan kebutuhan Anda lewat WhatsApp."
          message="Halo TukangDiLombok.com, saya ingin konsultasi proyek dan melihat estimasi penanganannya."
          title="Siap mulai proyek Anda di Lombok? Hubungi tim sekarang"
        />
      </section>
    </div>
  );
}
