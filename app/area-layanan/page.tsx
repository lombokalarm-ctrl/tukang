import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AreaCard } from "@/components/sections/area-card";
import { CTASection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { getFeaturedLocations, locations } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Area Layanan Tukang Lombok | TukangDiLombok.com",
  description: "Daftar area layanan jasa tukang dan teknisi profesional di Mataram, Lombok Barat, Lombok Timur, Lombok Tengah, Lombok Utara, Senggigi, Praya, Selong, dan seluruh Lombok.",
  path: "/area-layanan",
});

export const revalidate = 3600;

export default function AreasPage() {
  const featuredLocations = getFeaturedLocations();
  const propertyTypes = [...new Set(featuredLocations.flatMap((location) => location.propertyTypes ?? []))].slice(0, 8);
  const commonNeeds = featuredLocations.flatMap((location) => location.commonProblems?.slice(0, 1) ?? []).slice(0, 6);

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description="TukangDiLombok melayani berbagai kota, kabupaten, dan kawasan prioritas di Pulau Lombok untuk kebutuhan rumah tinggal, villa, hotel, homestay, ruko, kantor, dan properti komersial."
          eyebrow="Area Layanan"
          title="Cek area layanan prioritas TukangDiLombok.com"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Area Tersedia</div>
            <div className="mt-3 text-4xl font-black text-slate-900">{locations.length}</div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Mencakup kota, kabupaten, dan kawasan yang sering membutuhkan tukang bangunan, renovasi, AC, listrik, dan CCTV.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Wilayah Prioritas</div>
            <div className="mt-3 text-4xl font-black text-slate-900">{featuredLocations.length}</div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Area dengan permintaan tertinggi dan konteks kebutuhan yang sudah kami siapkan lebih detail pada halaman masing-masing.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Coverage Fleksibel</div>
            <div className="mt-3 text-2xl font-black text-slate-900">Rumah hingga properti usaha</div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Penjadwalan disesuaikan dengan lokasi, akses lapangan, dan jenis pekerjaan agar survey dan pengerjaan lebih terarah.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description="Area berikut adalah lokasi yang paling sering dicari pelanggan dan sudah memiliki konteks kebutuhan yang lebih kaya untuk membantu calon pelanggan memahami cakupan layanan."
          eyebrow="Area Prioritas"
          title="Wilayah utama dengan permintaan paling aktif"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {featuredLocations.map((location) => (
            <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm" key={location.slug}>
              <div className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">{location.type}</div>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900">{location.name}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{location.heroIntro ?? location.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {(location.popularServices?.slice(0, 4) ?? location.neighborhoods.slice(0, 4)).map((item) => (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700" key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <Link
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition hover:text-orange-600"
                href={`/area-layanan/${location.slug}`}
              >
                Lihat detail area
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            description="Jenis properti ini paling sering membutuhkan jasa tukang dan teknisi di Lombok. Jika properti Anda termasuk salah satunya, tim kami bisa bantu arahkan layanan yang paling relevan."
            eyebrow="Jenis Properti"
            title="Coverage untuk hunian, hospitality, dan bangunan usaha"
          />
          <div className="mt-10 flex flex-wrap gap-3">
            {propertyTypes.map((item) => (
              <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description="Setiap area punya kebutuhan khas yang berbeda. Bagian ini membantu pengunjung merasa halaman coverage benar-benar relevan dengan kondisi lapangan mereka."
          eyebrow="Kebutuhan Area"
          title="Contoh kebutuhan yang sering muncul di lapangan"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {commonNeeds.map((item) => (
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 text-sm font-medium leading-7 text-slate-700 shadow-sm" key={item}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description="Daftar lengkap area tetap tersedia agar pengunjung bisa langsung menuju halaman wilayah yang paling dekat dengan lokasi proyek atau properti mereka."
          eyebrow="Daftar Lengkap"
          title="Semua area layanan yang saat ini tersedia"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {locations.map((area) => (
            <AreaCard area={area} key={area.slug} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <CTASection
          description="Jika ingin memastikan lokasi Anda masuk coverage aktif atau prioritas jadwal, kirim titik area, jenis properti, dan kebutuhan pekerjaan melalui WhatsApp agar tim kami bantu cek lebih cepat."
          message="Halo TukangDiLombok.com, saya ingin cek area layanan dan jadwal tim untuk lokasi saya di Lombok."
          title="Cek coverage area dan jadwal tim sekarang"
        />
      </section>
    </div>
  );
}
