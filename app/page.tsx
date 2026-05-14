import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, PhoneCall } from "lucide-react";
import { AreaCard } from "@/components/sections/area-card";
import { ArticleCard } from "@/components/sections/article-card";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PortfolioCard } from "@/components/sections/portfolio-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceCard } from "@/components/sections/service-card";
import { TestimonialCard } from "@/components/sections/testimonial-card";
import { Button } from "@/components/ui/button";
import {
  getFeaturedLocations,
  getFeaturedServices,
  portfolioItems,
  siteFaqs,
  testimonials,
} from "@/lib/data";
import { getAllArticles } from "@/lib/blog";

export const revalidate = 3600;

const reasons = [
  "Respons cepat dan mudah konsultasi melalui WhatsApp.",
  "Teknisi dan tukang berpengalaman dengan pengerjaan rapi, profesional, dan komunikatif.",
  "Bisa melayani rumah, villa, hotel, kantor, ruko, hingga properti komersial di seluruh Lombok.",
  "Sistem kerja fleksibel, bisa harian, mingguan, borongan, atau menyesuaikan kebutuhan proyek.",
  "Survey dan konsultasi lebih mudah untuk membantu pelanggan memahami estimasi pekerjaan sejak awal.",
];

const steps = [
  "Hubungi kami melalui WhatsApp dan jelaskan kebutuhan Anda.",
  "Tim kami membantu konsultasi awal dan menentukan kebutuhan survey bila diperlukan.",
  "Pekerjaan dijadwalkan sesuai jenis layanan, lokasi, dan target pengerjaan.",
];

const decisionLinks = [
  {
    href: "/harga",
    eyebrow: "Harga dan Estimasi",
    title: "Ingin tahu gambaran biaya dan sistem kerja?",
    description: "Halaman harga membantu pengunjung memahami faktor biaya, pilihan sistem kerja, dan cara meminta estimasi awal dengan lebih terarah.",
  },
  {
    href: "/testimoni",
    eyebrow: "Bukti Sosial",
    title: "Ingin melihat pengalaman pelanggan lain?",
    description: "Halaman testimoni menampilkan kesan pelanggan tentang respons, komunikasi, dan hasil kerja untuk berbagai jenis properti di Lombok.",
  },
  {
    href: "/tentang-kami",
    eyebrow: "Tentang Kami",
    title: "Ingin memahami cara kerja dan positioning brand?",
    description: "Halaman ini menjelaskan siapa yang kami bantu, nilai utama layanan, dan bagaimana TukangDiLombok memudahkan proses konsultasi awal.",
  },
];

export default function Home() {
  const featuredServices = getFeaturedServices();
  const featuredAreas = getFeaturedLocations();
  const latestArticles = getAllArticles().slice(0, 3);

  return (
    <div>
      <HeroSection />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description="Layanan unggulan untuk pemilik rumah, villa, hotel, perkantoran, developer, kontraktor, dan property owner di seluruh Lombok."
          eyebrow="Layanan Utama"
          title="Layanan unggulan TukangDiLombok"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <SectionHeading
              description="TukangDiLombok hadir untuk membantu kebutuhan perbaikan, instalasi, renovasi, dan pekerjaan teknis dengan layanan yang cepat, jelas, dan profesional untuk rumah hingga properti komersial."
              eyebrow="Kenapa Memilih Kami"
              title="Kenapa Banyak Pelanggan Memilih TukangDiLombok"
            />
            <div className="mt-8 flex flex-col gap-4">
              {reasons.map((reason) => (
                <div className="flex items-start gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4" key={reason}>
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                  <p className="text-sm leading-7 text-slate-700">{reason}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-900/10">
            <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-orange-200">Fokus untuk market lokal Lombok</div>
            <h3 className="mt-5 text-3xl font-black">Solusi Tukang dan Teknisi untuk Rumah hingga Properti Komersial</h3>
            <p className="mt-4 text-base leading-8 text-slate-300">
              TukangDiLombok melayani rumah tinggal, villa, hotel, ruko, kantor, kos, homestay, hingga properti hospitality di berbagai wilayah Lombok. Dengan tim tukang dan teknisi berpengalaman, kami mengutamakan hasil kerja yang rapi, komunikasi yang mudah, serta fleksibilitas sistem pengerjaan sesuai kebutuhan pelanggan.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/8 p-5">
                <div className="text-sm uppercase tracking-[0.2em] text-slate-400">Fokus Layanan</div>
                <div className="mt-2 text-lg font-bold">Rumah, Villa, Hotel, dan Bisnis</div>
              </div>
              <div className="rounded-3xl bg-white/8 p-5">
                <div className="text-sm uppercase tracking-[0.2em] text-slate-400">Primary CTA</div>
                <div className="mt-2 text-lg font-bold">Konsultasi WhatsApp Cepat</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          description="Tidak semua pengunjung siap langsung chat. Sebagian ingin melihat harga, testimoni, atau memahami siapa yang akan mereka hubungi sebelum masuk ke tahap konsultasi."
          eyebrow="Jalur Keputusan"
          title="Pilih informasi yang paling Anda butuhkan sebelum konsultasi"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {decisionLinks.map((item) => (
            <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm" key={item.href}>
              <div className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">{item.eyebrow}</div>
              <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-900">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
              <Button asChild className="mt-6" variant="outline">
                <Link href={item.href}>
                  Lihat Halamannya
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          description="Melayani Kota Mataram, Senggigi, Praya, Lombok Barat, Kuta Lombok, dan area lain di seluruh Pulau Lombok dengan koordinasi cepat dan mudah."
          eyebrow="Area Layanan Lombok"
          title="Area layanan prioritas di Lombok"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredAreas.map((area) => (
            <AreaCard area={area} key={area.slug} />
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            description="Contoh jenis pekerjaan yang siap kami tangani untuk rumah, villa, hotel, homestay, ruko, kantor, dan berbagai properti lainnya di Lombok."
            eyebrow="Portfolio"
            title="Portfolio proyek rumah, villa, dan properti di Lombok"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {portfolioItems.slice(0, 4).map((item) => (
              <PortfolioCard item={item} key={item.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          description="Pelanggan biasanya paling menghargai respons yang cepat, komunikasi yang jelas, dan hasil pengerjaan yang rapi."
          eyebrow="Testimoni Pelanggan"
          title="Dipercaya oleh pemilik rumah, owner villa, dan pengelola properti"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <TestimonialCard item={item} key={item.id} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/testimoni">
              Lihat Semua Testimoni
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            description="Proses sederhana ini dibuat agar pelanggan bisa segera masuk ke tahap konsultasi dan penjadwalan tanpa proses yang rumit."
            eyebrow="Langkah Pemesanan"
            title="Proses pemesanan cepat dan mudah"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <article className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6" key={step}>
                <div className="text-sm font-black uppercase tracking-[0.24em] text-orange-600">Langkah {index + 1}</div>
                <p className="mt-4 text-base leading-8 text-slate-700">{step}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button asChild variant="outline">
              <Link href="/harga">
                Pelajari Harga dan Estimasi
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            description="Artikel blog membantu menjawab pertanyaan pelanggan sebelum konsultasi, memperkuat SEO lokal, dan mendukung internal linking ke halaman layanan dan area."
            eyebrow="Artikel Terbaru"
            title="Artikel terbaru untuk memperkuat SEO lokal"
          />
          <Button asChild variant="outline">
            <Link href="/blog">
              Lihat Semua Artikel
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {latestArticles.map((article) => (
            <ArticleCard article={article} key={article.slug} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <FAQSection
          description="Pertanyaan paling sering ditanyakan calon pelanggan sebelum memesan jasa tukang dan teknisi di Lombok."
          items={siteFaqs.slice(0, 6)}
          title="Pertanyaan yang sering diajukan"
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <CTASection
          description="Butuh tukang bangunan, renovasi rumah, teknisi AC, listrik, CCTV, atau pekerjaan properti lainnya di Lombok? Tim kami siap membantu mengarahkan ke layanan yang paling relevan."
          message="Halo TukangDiLombok.com, saya ingin konsultasi jasa tukang untuk rumah atau properti saya di Lombok."
          title="Konsultasikan kebutuhan tukang dan teknisi Anda sekarang"
        />
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <div className="text-sm font-black uppercase tracking-[0.24em] text-orange-300">Footer SEO</div>
            <h2 className="mt-4 text-3xl font-black">Website jasa tukang profesional untuk rumah, villa, hotel, dan properti di Lombok</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
              TukangDiLombok.com dirancang untuk menangkap kebutuhan pencarian lokal seperti tukang bangunan Lombok, tukang AC Lombok, tukang listrik Lombok, jasa renovasi rumah Lombok, tukang harian Lombok, tukang borongan Lombok, dan kombinasi area layanan di seluruh Pulau Lombok dengan CTA WhatsApp yang jelas dan respons cepat.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[2rem] bg-white/6 p-6">
              <MapPin className="h-5 w-5 text-orange-300" />
              <h3 className="mt-4 text-lg font-bold">Coverage Area</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">Mataram, Senggigi, Praya, Kuta Lombok, Gerung, Batulayar, Ampenan, Cakranegara, Gunungsari, Narmada, dan seluruh Lombok.</p>
            </div>
            <div className="rounded-[2rem] bg-white/6 p-6">
              <PhoneCall className="h-5 w-5 text-orange-300" />
              <h3 className="mt-4 text-lg font-bold">High Conversion CTA</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">Seluruh alur diarahkan ke konsultasi WhatsApp agar inquiry lebih cepat masuk dari mobile maupun desktop.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
