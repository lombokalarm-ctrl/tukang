import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/types";

export function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-1 text-orange-500">
        {Array.from({ length: item.rating }).map((_, index) => (
          <Star className="h-4 w-4 fill-current" key={index} />
        ))}
      </div>
      <p className="mt-5 text-base leading-8 text-slate-700">“{item.quote}”</p>
      <div className="mt-6">
        <div className="font-semibold text-slate-900">{item.name}</div>
        <div className="text-sm text-slate-500">{item.role} • {item.location}</div>
      </div>
    </article>
  );
}
