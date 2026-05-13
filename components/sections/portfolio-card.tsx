import Image from "next/image";
import type { PortfolioItem } from "@/lib/types";

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image alt={item.title} className="h-full w-full object-cover" fill sizes="(max-width: 768px) 100vw, 50vw" src={item.image} />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{item.summary}</p>
        <div className="mt-5 grid gap-4 rounded-3xl bg-slate-50 p-4 text-sm">
          <div>
            <div className="font-semibold text-slate-900">Before</div>
            <p className="mt-1 leading-7 text-slate-600">{item.before}</p>
          </div>
          <div>
            <div className="font-semibold text-slate-900">After</div>
            <p className="mt-1 leading-7 text-slate-600">{item.after}</p>
          </div>
        </div>
        <div className="mt-4 text-sm font-medium text-sky-700">{item.value}</div>
      </div>
    </article>
  );
}
