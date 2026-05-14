import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { siteFaqs } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "FAQ | TukangDiLombok.com",
  description: "Pertanyaan umum seputar jasa tukang dan teknisi profesional di Lombok.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <div>
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <JsonLd data={faqSchema(siteFaqs)} />
        <FAQSection description="Halaman FAQ ini membantu Anda memahami cara kerja layanan, proses konsultasi, area cakupan, jenis pekerjaan, hingga hal-hal umum yang sering ditanyakan pelanggan sebelum memesan jasa kami." items={siteFaqs} title="Pertanyaan yang Sering Diajukan" />
      </div>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            description="Jika Anda sudah membaca FAQ tetapi masih ingin membandingkan sebelum menghubungi tim, tiga halaman ini biasanya yang paling membantu."
            eyebrow="Jalur Lanjutan"
            title="Informasi pendukung setelah membaca FAQ"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">Harga</div>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900">Pelajari cara estimasi disusun</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Halaman harga membantu menjelaskan faktor biaya, pilihan sistem kerja, dan kapan estimasi awal bisa diberikan langsung.
              </p>
              <Button asChild className="mt-6" variant="outline">
                <Link href="/harga">Buka Halaman Harga</Link>
              </Button>
            </article>
            <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">Testimoni</div>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900">Lihat pengalaman pelanggan lain</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Halaman testimoni membantu Anda melihat bagaimana pelanggan lain menilai kualitas komunikasi, respons, dan hasil kerja.
              </p>
              <Button asChild className="mt-6" variant="outline">
                <Link href="/testimoni">Buka Halaman Testimoni</Link>
              </Button>
            </article>
            <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">Kontak</div>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900">Siapkan pertanyaan dan langsung konsultasi</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Halaman kontak membantu Anda melihat format informasi yang sebaiknya dikirim agar tim kami bisa merespons lebih cepat dan lebih tepat.
              </p>
              <Button asChild className="mt-6" variant="outline">
                <Link href="/kontak">Buka Halaman Kontak</Link>
              </Button>
            </article>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <CTASection description="Jika pertanyaan Anda belum terjawab di sini, langsung kirim kebutuhan melalui WhatsApp agar tim kami bantu jelaskan lebih detail." message="Halo TukangDiLombok.com, saya punya beberapa pertanyaan sebelum booking jasa tukang." title="Masih punya pertanyaan? Hubungi kami sekarang" />
      </div>
    </div>
  );
}
