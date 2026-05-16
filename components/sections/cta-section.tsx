import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createWhatsAppLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export function CTASection({
  title,
  description,
  message,
}: {
  title: string;
  description: string;
  message: string;
}) {
  return (
    <section className="rounded-[2rem] bg-gradient-to-r from-sky-700 via-sky-600 to-orange-500 px-6 py-10 text-white shadow-2xl shadow-sky-900/10 sm:px-10 sm:py-14">
      <div className="max-w-3xl">
        <div className="text-sm font-black uppercase tracking-[0.24em] text-orange-100">Konsultasi Cepat</div>
        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{title}</h2>
        <p className="mt-4 text-base leading-8 text-sky-50">{description}</p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          className={cn(
            "inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white bg-white px-5 text-sm font-semibold text-black transition-all",
            "hover:border-slate-100 hover:bg-slate-100 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          )}
          href={createWhatsAppLink(message)}
          rel="noreferrer"
          style={{ color: "#020617" }}
          target="_blank"
        >
          <MessageCircle className="h-4 w-4" style={{ color: "#020617" }} />
          <span style={{ color: "#020617" }}>Chat WhatsApp Sekarang</span>
        </a>
        <Button asChild className="border-white/30 bg-white/10 text-white hover:bg-white/15 hover:text-white" variant="outline">
          <Link href="/kontak">
            Lihat Halaman Kontak
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
