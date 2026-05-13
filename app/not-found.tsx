import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="text-sm font-black uppercase tracking-[0.24em] text-orange-600">404</div>
      <h1 className="mt-4 text-4xl font-black text-slate-900">Halaman tidak ditemukan</h1>
      <p className="mt-4 text-lg leading-8 text-slate-600">
        Halaman yang Anda cari belum tersedia atau slug landing page tidak ditemukan.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <Button asChild>
          <Link href="/">Kembali ke Beranda</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/layanan">Lihat Layanan</Link>
        </Button>
      </div>
    </section>
  );
}
