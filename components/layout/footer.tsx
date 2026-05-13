import Link from "next/link";
import { articleMeta, getFeaturedLocations, getFeaturedServices } from "@/lib/data";
import { createWhatsAppLink, siteConfig } from "@/lib/site";

export function Footer() {
  const featuredServices = getFeaturedServices().slice(0, 6);
  const featuredLocations = getFeaturedLocations().slice(0, 6);

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="text-2xl font-black">TukangDiLombok.com</div>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
            Platform jasa tukang dan teknisi profesional di Lombok untuk rumah, villa, hotel, kantor, ruko, properti sewa, hingga proyek pengembang.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            Fokus kami adalah SEO lokal, respons cepat, dan konversi WhatsApp agar pemilik properti lebih mudah menemukan tenaga kerja yang tepat di Lombok.
          </p>
          <a className="mt-6 inline-flex rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600" href={createWhatsAppLink()} rel="noreferrer" target="_blank">
            Konsultasi Sekarang
          </a>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Layanan Populer</h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-slate-300">
            {featuredServices.map((item) => (
              <Link className="transition hover:text-orange-400" href={`/layanan/${item.slug}`} key={item.slug}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Area Populer</h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-slate-300">
            {featuredLocations.map((item) => (
              <Link className="transition hover:text-orange-400" href={`/area-layanan/${item.slug}`} key={item.slug}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Konten SEO</h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-slate-300">
            {articleMeta.map((item) => (
              <Link className="transition hover:text-orange-400" href={`/blog/${item.slug}`} key={item.slug}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-400 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>{siteConfig.address}</p>
          <p>© 2026 {siteConfig.name}. Siap deploy di Vercel dan scalable untuk ribuan halaman SEO.</p>
        </div>
      </div>
    </footer>
  );
}
