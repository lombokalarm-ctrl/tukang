import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Location } from "@/lib/types";

export function AreaCard({ area }: { area: Location }) {
  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
      <div className="flex items-center gap-3 text-orange-600">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50">
          <MapPin className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-slate-900">{area.name}</h3>
          <p className="text-sm text-slate-500">{area.type}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-600">{area.excerpt}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {area.neighborhoods.slice(0, 3).map((item) => (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600" key={item}>
            {item}
          </span>
        ))}
      </div>
      <Link className="mt-6 inline-flex text-sm font-semibold text-sky-700 transition hover:text-orange-600" href={`/area-layanan/${area.slug}`}>
        Eksplor area layanan
      </Link>
    </article>
  );
}
