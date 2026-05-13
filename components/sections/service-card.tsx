import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { iconMap } from "@/lib/icon-map";
import type { Service } from "@/lib/types";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon] ?? iconMap.Hammer;

  return (
    <article className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-xl font-bold text-slate-900">{service.name}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{service.excerpt}</p>
      <ul className="mt-5 space-y-2 text-sm text-slate-500">
        {service.benefits.slice(0, 3).map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
      <Link className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition group-hover:text-orange-600" href={`/layanan/${service.slug}`}>
        Lihat detail layanan
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
