"use client";

import Link from "next/link";
import { Menu, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { createWhatsAppLink, navigationItems } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-3" href="/">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-sky-600 text-lg font-black text-white">TD</span>
          <div>
            <div className="text-sm font-black uppercase tracking-[0.24em] text-orange-600">Lombok</div>
            <div className="text-lg font-bold text-slate-900">TukangDiLombok.com</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navigationItems.map((item) => (
            <Link className="text-sm font-medium text-slate-700 transition hover:text-orange-600" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild>
            <a href={createWhatsAppLink()} rel="noreferrer" target="_blank">
              <MessageCircle className="h-4 w-4" />
              Konsultasi WhatsApp
            </a>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-700 lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="sr-only">Menu navigasi mobile</SheetTitle>
            <SheetDescription className="sr-only">Buka navigasi utama dan akses cepat ke WhatsApp.</SheetDescription>
            <div className="space-y-6 pt-8">
              <div>
                <div className="text-lg font-bold text-slate-900">TukangDiLombok.com</div>
                <p className="mt-2 text-sm leading-7 text-slate-600">Jasa tukang dan teknisi profesional untuk seluruh Pulau Lombok.</p>
              </div>
              <nav className="flex flex-col gap-3">
                {navigationItems.map((item) => (
                  <Link className="rounded-2xl px-3 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-50 hover:text-orange-600" href={item.href} key={item.href}>
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Button asChild className="w-full">
                <a href={createWhatsAppLink()} rel="noreferrer" target="_blank">
                  <MessageCircle className="h-4 w-4" />
                  Chat via WhatsApp
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
