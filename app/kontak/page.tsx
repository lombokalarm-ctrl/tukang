import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, Mail, MessageCircle, PhoneCall } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { createWhatsAppLink, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Kontak | TukangDiLombok.com",
  description: "Hubungi TukangDiLombok.com untuk konsultasi jasa tukang dan teknisi profesional di seluruh Lombok.",
  path: "/kontak",
});

export default function ContactPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              description="TukangDiLombok siap membantu kebutuhan tukang dan teknisi profesional di Lombok untuk rumah, villa, hotel, homestay, kantor, ruko, dan berbagai properti lainnya."
              eyebrow="Kontak"
              title="Hubungi TukangDiLombok"
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
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600"><Mail className="h-5 w-5" /></span>
                <div>
                  <div className="font-semibold text-slate-900">Email</div>
                  <div className="text-sm text-slate-500">{siteConfig.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600"><PhoneCall className="h-5 w-5" /></span>
                <div>
                  <div className="font-semibold text-slate-900">Area Layanan</div>
                  <div className="text-sm text-slate-500">Seluruh Pulau Lombok</div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700"><Clock3 className="h-5 w-5" /></span>
                <div>
                  <div className="font-semibold text-slate-900">Jam Operasional</div>
                  <div className="text-sm text-slate-500">{siteConfig.operatingHours}</div>
                </div>
              </div>
              <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5">
                <div className="text-sm font-semibold text-slate-900">Informasi yang sebaiknya dikirim saat menghubungi kami</div>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
                  <li>- Nama dan lokasi area</li>
                  <li>- Jenis layanan yang dibutuhkan</li>
                  <li>- Gambaran singkat masalah atau pekerjaan</li>
                  <li>- Foto lokasi atau bagian yang ingin dikerjakan jika ada</li>
                  <li>- Target waktu pengerjaan dan apakah butuh survey</li>
                </ul>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            description="Tidak semua pengunjung siap langsung kirim detail pekerjaan. Sebagian ingin melihat gambaran estimasi atau bukti sosial lebih dulu sebelum menghubungi tim."
            eyebrow="Jalur Lanjutan"
            title="Butuh pembanding sebelum menghubungi kami?"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">Harga</div>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900">Lihat panduan harga dan estimasi</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Halaman harga membantu Anda memahami faktor biaya, pilihan sistem kerja, dan informasi apa saja yang sebaiknya disiapkan sebelum meminta estimasi awal.
              </p>
              <Button asChild className="mt-6" variant="outline">
                <Link href="/harga">Buka Halaman Harga</Link>
              </Button>
            </article>
            <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">Testimoni</div>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900">Lihat pengalaman pelanggan lain</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Halaman testimoni memperlihatkan bagaimana pelanggan menilai respons, komunikasi, dan hasil kerja TukangDiLombok untuk berbagai jenis layanan di Lombok.
              </p>
              <Button asChild className="mt-6" variant="outline">
                <Link href="/testimoni">Buka Halaman Testimoni</Link>
              </Button>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
