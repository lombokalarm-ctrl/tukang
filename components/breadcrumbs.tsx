import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { BreadcrumbItem } from "@/lib/types";

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
      {items.map((item, index) => (
        <div className="flex items-center gap-2" key={item.path}>
          {index > 0 ? <ChevronRight className="h-4 w-4 text-slate-300" /> : null}
          <Link className="transition hover:text-orange-600" href={item.path}>
            {item.name}
          </Link>
        </div>
      ))}
    </nav>
  );
}
