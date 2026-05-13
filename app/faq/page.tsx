import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
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
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd data={faqSchema(siteFaqs)} />
      <FAQSection description="Jawaban untuk pertanyaan yang paling sering ditanyakan sebelum memesan jasa tukang dan teknisi di Lombok." items={siteFaqs} title="Frequently Asked Questions" />
      <div className="mt-16"><CTASection description="Jika pertanyaan Anda belum terjawab di sini, langsung kirim kebutuhan melalui WhatsApp agar tim kami bantu jelaskan lebih detail." message="Halo TukangDiLombok.com, saya punya beberapa pertanyaan sebelum booking jasa tukang." title="Masih ada pertanyaan? Hubungi kami sekarang" /></div>
    </div>
  );
}
