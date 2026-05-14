"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createWhatsAppLink } from "@/lib/site";
import { SearchPanel } from "@/components/sections/search-panel";

const highlights = [
  "Respons cepat dan mudah konsultasi via WhatsApp",
  "Tukang dan teknisi berpengalaman dengan pengerjaan rapi",
  "Melayani rumah, villa, hotel, dan properti komersial di seluruh Lombok",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.2),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(2,132,199,0.16),_transparent_32%)] py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 16 }} transition={{ duration: 0.4 }}>
            <div className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700">
              Jasa tukang dan teknisi profesional untuk rumah, villa, hotel, dan properti di seluruh Lombok
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Jasa Tukang Profesional dan Teknisi Terpercaya di Lombok
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Melayani tukang bangunan, listrik, AC, CCTV, renovasi rumah, dan berbagai kebutuhan properti untuk rumah, villa, hotel, dan bisnis di seluruh Lombok dengan pengerjaan rapi dan respons cepat.
            </p>
          </motion.div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={createWhatsAppLink()} rel="noreferrer" target="_blank">
                <MessageCircle className="h-5 w-5" />
                Konsultasi Gratis via WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/layanan">
                Lihat Semua Layanan
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 shadow-sm" key={item}>
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                <span className="text-sm font-medium text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-900/10">
            <div className="text-sm font-black uppercase tracking-[0.24em] text-orange-300">Layanan Andal</div>
            <h2 className="mt-3 text-2xl font-black">Solusi cepat untuk kebutuhan rumah dan properti di Lombok</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Mulai dari bangunan, renovasi, listrik, AC, hingga CCTV, tim TukangDiLombok siap membantu Anda menemukan layanan yang paling sesuai dengan kebutuhan dan lokasi properti Anda.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/8 p-4">
                <div className="text-3xl font-black text-white">10+</div>
                <div className="mt-1 text-sm text-slate-300">Area layanan prioritas</div>
              </div>
              <div className="rounded-3xl bg-white/8 p-4">
                <div className="text-3xl font-black text-white">5</div>
                <div className="mt-1 text-sm text-slate-300">Layanan utama yang paling sering dipesan</div>
              </div>
            </div>
          </div>
          <SearchPanel />
        </div>
      </div>
    </section>
  );
}
