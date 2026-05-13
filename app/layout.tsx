import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { JsonLd } from "@/components/json-ld";
import { StickyMobileCta } from "@/components/sections/sticky-mobile-cta";
import { WhatsAppButton } from "@/components/sections/whatsapp-button";
import { buildMetadata } from "@/lib/seo";
import { localBusinessSchema, organizationSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} | Jasa Tukang dan Teknisi Profesional di Lombok`,
  description: siteConfig.description,
  path: "/",
  keywords: Array.from(siteConfig.keywords),
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${geistSans.variable} ${geistMono.variable}`} lang="id">
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={localBusinessSchema()} />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pb-20 sm:pb-0">{children}</main>
          <Footer />
        </div>
        <WhatsAppButton />
        <StickyMobileCta />
      </body>
    </html>
  );
}
