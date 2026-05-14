import type { Metadata } from "next";
import { CTASection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { getFeaturedServices, siteFaqs } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Harga dan Estimasi Jasa Tukang Lombok | TukangDiLombok.com",
  description: "Panduan harga dan estimasi awal jasa tukang di Lombok, termasuk faktor biaya, sistem kerja, dan cara meminta gambaran awal melalui WhatsApp.",
  path: "/harga",
});

export const revalidate = 3600;

export default function PricingPage() {
  const featuredServices = getFeaturedServices();
  const pricingFactors = [
    "Jenis pekerjaan yang dibutuhkan, apakah renovasi, instalasi, service, atau pembangunan baru.",
    "Volume pekerjaan, jumlah titik, luas area, atau jumlah unit yang dikerjakan.",
    "Kondisi lapangan, termasuk akses lokasi, kondisi bangunan lama, dan tingkat kesulitan pekerjaan.",
    "Material, perangkat, dan kebutuhan tambahan yang memengaruhi lingkup kerja.",
    "Lokasi properti di Lombok serta kebutuhan survey sebelum pekerjaan dimulai.",
  ];
  const workSystems = [
    "Harian: cocok untuk pekerjaan yang ruang lingkupnya masih fleksibel atau berubah bertahap.",
    "Borongan: cocok untuk pekerjaan dengan scope yang sudah cukup jelas dari awal.",
    "Bertahap: cocok untuk renovasi atau pembaruan properti yang ingin dikerjakan per bagian sesuai prioritas dan budget.",
  ];
  const estimateSteps = [
    "Kirim jenis layanan, lokasi, foto area, dan gambaran kebutuhan melalui WhatsApp.",
    "Tim membantu menilai apakah estimasi awal bisa diberikan lewat chat atau perlu survey.",
    "Jika detail sudah cukup, kami berikan arahan awal mengenai sistem kerja, faktor biaya, dan langkah berikutnya.",
  ];

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description="Halaman ini membantu calon pelanggan memahami bagaimana harga jasa tukang di Lombok biasanya ditentukan. Tujuannya bukan memberi angka mutlak untuk semua kebutuhan, tetapi memberi gambaran awal agar konsultasi lebih terarah."
          eyebrow="Harga"
          title="Panduan harga dan estimasi awal jasa tukang di Lombok"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Fokus Halaman</div>
            <div className="mt-3 text-2xl font-black text-slate-900">Estimasi awal yang lebih realistis</div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Cocok untuk pengunjung yang masih membandingkan opsi dan ingin memahami faktor biaya sebelum konsultasi lebih lanjut.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Sistem Kerja</div>
            <div className="mt-3 text-2xl font-black text-slate-900">Harian, borongan, bertahap</div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Pola kerja menyesuaikan jenis pekerjaan, kejelasan scope, dan cara pelanggan ingin mengatur budget.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Catatan Penting</div>
            <div className="mt-3 text-2xl font-black text-slate-900">Tidak semua pekerjaan bisa dipatok lewat chat</div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Untuk pekerjaan yang lebih kompleks, survey atau penjelasan yang lebih rinci biasanya diperlukan agar estimasi lebih akurat.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            description="Harga jasa tukang tidak berdiri sendiri. Estimasi yang baik selalu mengikuti kondisi pekerjaan, skala kebutuhan, dan target hasil yang ingin dicapai pelanggan."
            eyebrow="Faktor Biaya"
            title="Apa saja yang paling memengaruhi estimasi harga"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {pricingFactors.map((item) => (
              <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm" key={item}>
                <p className="text-sm leading-7 text-slate-600">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description="Sistem kerja yang dipilih akan sangat memengaruhi cara estimasi disusun. Karena itu, pelanggan sebaiknya memahami kapan sistem harian, borongan, atau bertahap lebih cocok digunakan."
          eyebrow="Sistem Kerja"
          title="Pilihan pendekatan kerja yang umum dipakai"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {workSystems.map((item) => (
            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm" key={item}>
              <p className="text-sm leading-7 text-slate-600">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            description="Beberapa layanan berikut paling sering ditanyakan soal harga. Setiap layanan punya karakter estimasi yang berbeda, sehingga informasi awal perlu disesuaikan dengan kebutuhannya."
            eyebrow="Estimasi Per Layanan"
            title="Catatan harga untuk layanan yang paling sering diminta"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {featuredServices.map((service) => (
              <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm" key={service.slug}>
                <div className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">{service.category}</div>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900">{service.name}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{service.excerpt}</p>
                <div className="mt-6 space-y-3">
                  {(service.systemAndPricing ?? []).slice(0, 3).map((item) => (
                    <p className="rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600" key={item}>
                      {item}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description="Semakin lengkap informasi yang Anda kirim, semakin mudah tim kami memberi arahan awal yang relevan sebelum masuk ke tahap survey atau penjadwalan."
          eyebrow="Cara Minta Estimasi"
          title="Langkah sederhana untuk mendapatkan gambaran awal"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {estimateSteps.map((item, index) => (
            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm" key={item}>
              <div className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">Langkah {index + 1}</div>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            description="Pertanyaan berikut paling sering muncul saat pelanggan ingin menanyakan harga atau estimasi awal."
            eyebrow="FAQ Harga"
            title="Pertanyaan umum tentang harga jasa tukang"
          />
          <div className="mt-10 space-y-4">
            {siteFaqs
              .filter((item) => /harga|estimasi|biaya/i.test(item.question))
              .map((item) => (
                <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm" key={item.question}>
                  <h3 className="text-lg font-bold text-slate-900">{item.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
                </article>
              ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <CTASection
          description="Ingin meminta estimasi awal yang lebih relevan? Kirim jenis layanan, lokasi, foto area, dan target hasil melalui WhatsApp agar tim kami bantu arahkan langkah berikutnya."
          message="Halo TukangDiLombok.com, saya ingin meminta estimasi awal untuk kebutuhan jasa tukang saya di Lombok."
          title="Minta gambaran awal harga dan sistem kerja sekarang"
        />
      </section>
    </div>
  );
}
