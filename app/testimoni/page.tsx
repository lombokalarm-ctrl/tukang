import type { Metadata } from "next";
import { CTASection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { TestimonialCard } from "@/components/sections/testimonial-card";
import { getServiceBySlug, testimonials } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Testimoni Pelanggan Tukang Lombok | TukangDiLombok.com",
  description: "Testimoni pelanggan TukangDiLombok dari pemilik rumah, owner villa, homestay, dan properti usaha di berbagai area Lombok.",
  path: "/testimoni",
});

export const revalidate = 3600;

export default function TestimonialsPage() {
  const averageRating = (testimonials.reduce((total, item) => total + item.rating, 0) / testimonials.length).toFixed(1);
  const serviceNames = [...new Set(testimonials.map((item) => getServiceBySlug(item.serviceSlug)?.shortName).filter(Boolean))].slice(0, 6);
  const locations = [...new Set(testimonials.map((item) => item.location))].slice(0, 8);
  const trustPoints = [
    "Respons WhatsApp cepat dan komunikasi lebih mudah diikuti.",
    "Pengerjaan terasa rapi dan sesuai kebutuhan lapangan.",
    "Cocok untuk rumah tinggal, villa, homestay, dan properti usaha.",
  ];

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description="Halaman ini merangkum kesan pelanggan terhadap proses komunikasi, kerapian pengerjaan, dan kecocokan layanan TukangDiLombok untuk berbagai jenis properti di Lombok."
          eyebrow="Testimoni"
          title="Apa kata pelanggan tentang TukangDiLombok"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Total Testimoni</div>
            <div className="mt-3 text-4xl font-black text-slate-900">{testimonials.length}</div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Masukan pelanggan dari kebutuhan renovasi, bangunan, AC, listrik, dan CCTV di berbagai area Lombok.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Rata-rata Rating</div>
            <div className="mt-3 text-4xl font-black text-slate-900">{averageRating}/5</div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Gambaran kualitas pengalaman pelanggan terhadap koordinasi, kecepatan respons, dan hasil kerja yang diterima.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Layanan Tercakup</div>
            <div className="mt-3 text-2xl font-black text-slate-900">Bangunan hingga teknisi</div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Testimoni datang dari kebutuhan hunian dan properti hospitality yang membutuhkan layanan cepat, rapi, dan mudah dikoordinasikan.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            description="Pelanggan biasanya menilai layanan dari pengalaman yang paling terasa. Tiga poin berikut adalah hal yang paling sering muncul dalam testimoni."
            eyebrow="Nilai Utama"
            title="Alasan pelanggan merasa nyaman bekerja sama"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {trustPoints.map((item) => (
              <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm" key={item}>
                <p className="text-sm leading-7 text-slate-600">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description="Testimoni berikut berasal dari beberapa layanan utama dan area aktif di Lombok. Ini membantu calon pelanggan melihat bahwa kebutuhan mereka kemungkinan besar sudah pernah kami tangani sebelumnya."
          eyebrow="Cakupan Testimoni"
          title="Layanan dan area yang paling sering disebut pelanggan"
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
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
            <div className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">Area</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {locations.map((item) => (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description="Semua testimoni berikut ditampilkan agar calon pelanggan bisa membaca langsung jenis pengalaman yang dirasakan pelanggan lain ketika menggunakan layanan TukangDiLombok."
          eyebrow="Suara Pelanggan"
          title="Kumpulan testimoni pelanggan"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <TestimonialCard item={item} key={item.id} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <CTASection
          description="Jika kebutuhan Anda mirip dengan pelanggan lain di halaman ini, kirim lokasi, jenis properti, dan pekerjaan yang dibutuhkan melalui WhatsApp agar tim kami bantu arahkan langkah berikutnya."
          message="Halo TukangDiLombok.com, saya sudah melihat halaman testimoni dan ingin konsultasi kebutuhan jasa tukang saya."
          title="Ingin mendapatkan pengalaman kerja yang serupa? Konsultasikan sekarang"
        />
      </section>
    </div>
  );
}
