import { formatWhatsAppNumber } from "@/lib/utils";

export const siteConfig = {
  name: "TukangDiLombok.com",
  shortName: "TukangDiLombok",
  domain: "www.tukangdilombok.com",
  url: "https://www.tukangdilombok.com",
  description:
    "Platform jasa tukang dan teknisi profesional di Lombok untuk rumah, villa, hotel, kantor, dan properti komersial. Fokus cepat, rapi, transparan, dan mudah konsultasi via WhatsApp.",
  ogImage: "/og-default.svg",
  email: "halo@tukangdilombok.com",
  phoneDisplay: "087766116599",
  phone: "+62 877-6611-6599",
  whatsappNumber: "6287766116599",
  whatsappMessage: "Halo TukangDiLombok.com, saya ingin konsultasi jasa tukang.",
  address: "Pulau Lombok, Nusa Tenggara Barat, Indonesia",
  serviceAreas: "Mataram, Lombok Barat, Lombok Timur, Lombok Tengah, Lombok Utara, Senggigi, Praya, Selong, Gerung, Kuta Mandalika, Ampenan, Cakranegara, Gunungsari, Narmada, Batulayar, dan seluruh Lombok",
  keywords: [
    "tukang lombok",
    "jasa tukang lombok",
    "tukang bangunan lombok",
    "tukang ac lombok",
    "tukang listrik lombok",
    "tukang cctv lombok",
    "jasa renovasi rumah lombok",
    "tukang harian lombok",
    "tukang borongan lombok",
    "tukang mataram",
    "tukang lombok barat",
    "tukang lombok timur",
    "tukang lombok tengah"
  ],
} as const;

export const navigationItems = [
  { href: "/", label: "Beranda" },
  { href: "/layanan", label: "Layanan" },
  { href: "/area-layanan", label: "Area" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/tentang-kami", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
  { href: "/faq", label: "FAQ" },
] as const;

export function createWhatsAppLink(message: string = siteConfig.whatsappMessage) {
  const number = formatWhatsAppNumber(siteConfig.whatsappNumber);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
