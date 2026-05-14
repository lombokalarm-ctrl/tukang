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
  const values = [
    "Respons cepat melalui WhatsApp untuk konsultasi awal dan penjadwalan.",
    "Komunikasi yang jelas agar pelanggan memahami arah pekerjaan sejak awal.",
    "Pengerjaan rapi dengan pendekatan yang menyesuaikan kebutuhan properti.",
    "Cocok untuk rumah tinggal, villa, homestay, hotel, ruko, dan bangunan usaha.",
  ];
  const differentiators = [
    "Tidak hanya fokus mencari tukang, tetapi membantu pelanggan memahami layanan yang paling relevan untuk kebutuhan mereka.",
    "Bisa menangani berbagai kebutuhan properti dalam satu ekosistem layanan, mulai dari bangunan, renovasi, AC, listrik, hingga CCTV.",
    "Lebih cocok untuk pelanggan yang ingin koordinasi cepat, alur kerja lebih jelas, dan hasil yang rapi tanpa harus menghubungi banyak pihak terpisah.",
  ];
  const whoWeHelp = [
    "Pemilik rumah yang ingin renovasi, perbaikan, atau pembangunan baru.",
    "Owner villa, homestay, dan hotel yang membutuhkan maintenance atau peningkatan kualitas properti.",
    "Pemilik ruko, toko, kantor, dan usaha yang memerlukan tukang atau teknisi yang mudah dikoordinasikan.",
    "Pengelola properti yang butuh partner kerja untuk berbagai kebutuhan bangunan dan teknis di Lombok.",
  ];
  const steps = [
    "Pelanggan menghubungi kami lewat WhatsApp dan menjelaskan kebutuhan dasar, lokasi, serta target hasil.",
    "Tim membantu mengarahkan jenis layanan yang paling sesuai dan menjelaskan apakah perlu survey atau tidak.",
    "Setelah kebutuhan lebih jelas, kami membantu menyiapkan alur kerja awal, estimasi pendekatan, dan penjadwalan.",
  ];

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <SectionHeading
              description="TukangDiLombok adalah platform jasa tukang dan teknisi profesional di Lombok yang membantu kebutuhan rumah, villa, hotel, homestay, kantor, ruko, dan berbagai properti lainnya."
              eyebrow="Tentang Kami"
              title="TukangDiLombok hadir untuk memudahkan pelanggan mencari partner kerja yang lebih jelas dan lebih mudah dihubungi"
            />
            <div className="mt-8 space-y-5 text-base leading-8 text-slate-600">
              <p>
                Kami hadir untuk memudahkan pelanggan menemukan layanan tukang bangunan, renovasi rumah, AC, listrik, CCTV, dan kebutuhan teknis lain dengan proses yang lebih cepat, jelas, dan praktis melalui WhatsApp.
              </p>
              <p>
                Fokus utama kami bukan hanya menyediakan layanan, tetapi membantu pelanggan memahami langkah awal yang perlu dilakukan agar pekerjaan lebih terarah. Banyak orang sebenarnya tahu masalah yang ingin diselesaikan, tetapi belum tentu tahu layanan mana yang paling tepat atau bagaimana memulai prosesnya.
              </p>
              <p>
                Karena itu, TukangDiLombok dibangun untuk menjembatani kebutuhan tersebut dengan pendekatan yang lebih sederhana: respons cepat, komunikasi yang jelas, dan layanan yang bisa disesuaikan dengan jenis properti serta skala pekerjaan.
              </p>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Nilai utama</h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
              {values.map((item) => (
                <div className="rounded-2xl bg-slate-50 px-4 py-4" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            description="TukangDiLombok dibuat untuk pelanggan yang ingin proses lebih ringkas, layanan lebih mudah dikoordinasikan, dan hasil kerja yang sesuai dengan kebutuhan properti mereka."
            eyebrow="Posisi Kami"
            title="Apa yang membuat TukangDiLombok relevan untuk pelanggan di Lombok"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {differentiators.map((item) => (
              <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm" key={item}>
                <p className="text-sm leading-7 text-slate-600">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description="Layanan kami dirancang untuk berbagai tipe pelanggan dan properti, mulai dari kebutuhan rumah tangga sampai kebutuhan hospitality dan properti usaha."
          eyebrow="Siapa Yang Kami Bantu"
          title="Cocok untuk pemilik rumah, owner villa, hingga pengelola properti"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {whoWeHelp.map((item) => (
            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm" key={item}>
              <p className="text-sm leading-7 text-slate-600">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            description="Pelanggan biasanya membutuhkan proses yang sederhana dan tidak membingungkan. Karena itu, alur awal dibuat sesingkat mungkin agar konsultasi bisa berjalan cepat."
            eyebrow="Cara Kerja"
            title="Bagaimana kami membantu pelanggan memulai"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {steps.map((item, index) => (
              <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm" key={item}>
                <div className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">Langkah {index + 1}</div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <CTASection
          description="Ingin bekerja sama dengan jasa tukang dan teknisi yang lebih mudah dihubungi, rapi, dan profesional di Lombok? Konsultasi dapat dimulai langsung dari WhatsApp."
          message="Halo TukangDiLombok.com, saya ingin konsultasi kebutuhan jasa tukang dan teknisi di Lombok."
          title="Mari mulai konsultasi kebutuhan properti Anda"
        />
      </section>
    </div>
  );
}
