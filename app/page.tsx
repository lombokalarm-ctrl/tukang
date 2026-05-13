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
  "Respons cepat dan mudah konsultasi via WhatsApp",
  "Layanan lengkap untuk rumah, villa, hotel, kantor, dan proyek",
  "Arsitektur data-driven siap ditambah ribuan halaman SEO lokal",
  "Desain mobile-first dengan CTA kuat untuk konversi tinggi",
];

const steps = [
  "Klik WhatsApp dan jelaskan kebutuhan Anda",
  "Kirim lokasi serta foto area kerja bila ada",
  "Tim screening kebutuhan dan rekomendasi teknisi",
  "Jadwalkan pengerjaan sesuai area dan prioritas proyek",
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
          description="Kategori jasa paling sering dicari oleh pemilik rumah, villa, hotel, perkantoran, kontraktor, dan property owner di Lombok."
          eyebrow="Layanan Utama"
          title="Layanan tukang dan teknisi paling dibutuhkan di Lombok"
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
              description="Kami memadukan kualitas teknis, UX konversi, dan strategi SEO lokal agar website terasa premium sekaligus efektif menghasilkan inquiry WhatsApp."
              eyebrow="Kenapa Memilih Kami"
              title="Dibangun untuk konversi cepat dan scaling SEO lokal"
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
            <h3 className="mt-5 text-3xl font-black">Strategi konten dan internal linking untuk dominasi keyword lokal</h3>
            <p className="mt-4 text-base leading-8 text-slate-300">
              Struktur website ini dibuat untuk menangkap keyword seperti tukang lombok, jasa tukang lombok, tukang bangunan lombok, tukang AC lombok, tukang listrik lombok, dan kombinasi layanan plus area seperti Mataram, Lombok Barat, Lombok Timur, Lombok Tengah, Senggigi, hingga Kuta Mandalika.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/8 p-5">
                <div className="text-sm uppercase tracking-[0.2em] text-slate-400">Search Intent</div>
                <div className="mt-2 text-lg font-bold">Transactional + Local SEO</div>
              </div>
              <div className="rounded-3xl bg-white/8 p-5">
                <div className="text-sm uppercase tracking-[0.2em] text-slate-400">Primary CTA</div>
                <div className="mt-2 text-lg font-bold">WhatsApp Consultation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          description="Area prioritas di seluruh Pulau Lombok dengan pendekatan lokal SEO yang kuat dan mudah dikembangkan ke landing page otomatis."
          eyebrow="Area Layanan Lombok"
          title="Melayani kota, kabupaten, dan kawasan populer di Lombok"
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
            description="Contoh project before-after untuk menunjukkan hasil kerja, value yang didapat owner, dan meningkatkan trust calon pelanggan."
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
          description="Testimoni dummy ini memperlihatkan positioning trust dan gaya copy yang cocok untuk conversion-focused landing page."
          eyebrow="Testimoni Pelanggan"
          title="Dipercaya oleh pemilik rumah, owner villa, dan pengelola properti"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <TestimonialCard item={item} key={item.id} />
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            description="Alur sederhana ini dibuat untuk mempercepat conversion rate dari mobile maupun desktop."
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
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            description="Artikel SEO untuk menangkap keyword informasional, membangun topical authority, dan memperkuat internal linking ke halaman layanan dan area."
            eyebrow="Artikel Terbaru"
            title="Konten blog untuk memperkuat ranking lokal"
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
          description="Pertanyaan paling sering ditanyakan oleh calon pelanggan sebelum booking tukang atau teknisi di Lombok."
          items={siteFaqs.slice(0, 6)}
          title="Pertanyaan yang sering ditanyakan"
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <CTASection
          description="Konsultasikan kebutuhan rumah, villa, hotel, kantor, atau properti Anda. Tim kami membantu mengarahkan ke layanan dan area yang paling relevan."
          message="Halo TukangDiLombok.com, saya ingin konsultasi jasa tukang untuk properti saya di Lombok."
          title="Butuh tukang atau teknisi di Lombok? Mulai dari WhatsApp sekarang"
        />
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <div className="text-sm font-black uppercase tracking-[0.24em] text-orange-300">Footer SEO</div>
            <h2 className="mt-4 text-3xl font-black">Website landing page profesional untuk jasa tukang di Lombok</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
              TukangDiLombok.com dirancang untuk menangkap kebutuhan pencarian lokal seperti tukang bangunan Lombok, tukang AC Lombok, tukang listrik Lombok, jasa renovasi rumah Lombok, tukang harian Lombok, tukang borongan Lombok, dan kombinasi area layanan di seluruh Pulau Lombok.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[2rem] bg-white/6 p-6">
              <MapPin className="h-5 w-5 text-orange-300" />
              <h3 className="mt-4 text-lg font-bold">Coverage Area</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">Mataram, Senggigi, Praya, Gerung, Batulayar, Ampenan, Cakranegara, Gunungsari, Narmada, dan seluruh Lombok.</p>
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
