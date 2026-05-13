import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { BlogArticle } from "@/lib/types";

export function ArticleCard({ article }: { article: BlogArticle }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image alt={article.title} className="h-full w-full object-cover" fill sizes="(max-width: 768px) 100vw, 33vw" src={article.coverImage} />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
          <span>{article.category}</span>
          <span className="text-slate-300">•</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
        <h3 className="mt-4 text-xl font-bold text-slate-900">{article.title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{article.excerpt}</p>
        <div className="mt-5 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-sm text-slate-500">
            <Clock3 className="h-4 w-4" />
            {article.readingTime}
          </div>
          <Link className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition hover:text-orange-600" href={`/blog/${article.slug}`}>
            Baca artikel
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
