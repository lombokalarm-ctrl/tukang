import type { Metadata } from "next";
import { MessageCircle, PhoneCall } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { SectionHeading } from "@/components/sections/section-heading";
import { buildMetadata } from "@/lib/seo";
import { createWhatsAppLink, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Kontak | TukangDiLombok.com",
  description: "Hubungi TukangDiLombok.com untuk konsultasi jasa tukang dan teknisi profesional di seluruh Lombok.",
  path: "/kontak",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            description="Cara tercepat untuk booking tukang atau teknisi adalah melalui WhatsApp. Anda juga bisa isi form ini untuk membuat draft pesan otomatis."
            eyebrow="Kontak"
            title="Konsultasi cepat kebutuhan tukang dan teknisi di Lombok"
          />
          <div className="mt-8 space-y-4">
            <a className="flex items-center gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm" href={createWhatsAppLink()} rel="noreferrer" target="_blank">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600"><MessageCircle className="h-5 w-5" /></span>
              <div>
                <div className="font-semibold text-slate-900">WhatsApp</div>
                <div className="text-sm text-slate-500">{siteConfig.phoneDisplay}</div>
              </div>
            </a>
            <div className="flex items-center gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600"><PhoneCall className="h-5 w-5" /></span>
              <div>
                <div className="font-semibold text-slate-900">Area Layanan</div>
                <div className="text-sm text-slate-500">Seluruh Pulau Lombok</div>
              </div>
            </div>
          </div>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}
