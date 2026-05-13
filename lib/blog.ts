import fs from "node:fs";
import path from "node:path";
import readingTime from "reading-time";

import RenovasiGuide from "@/content/blog/biaya-renovasi-rumah-di-lombok.mdx";
import TeknisiGuide from "@/content/blog/kapan-rumah-butuh-teknisi-listrik-dan-ac.mdx";
import TukangGuide from "@/content/blog/tips-memilih-jasa-tukang-lombok.mdx";
import { articleMeta } from "@/lib/data";
import { toHeadingId } from "@/lib/utils";
import type { BlogArticle, TOCItem } from "@/lib/types";

const articleComponentMap = {
  "tips-memilih-jasa-tukang-lombok": TukangGuide,
  "biaya-renovasi-rumah-di-lombok": RenovasiGuide,
  "kapan-rumah-butuh-teknisi-listrik-dan-ac": TeknisiGuide,
} as const;

function getArticleSource(slug: string) {
  const filePath = path.join(process.cwd(), "content", "blog", `${slug}.mdx`);
  return fs.readFileSync(filePath, "utf8");
}

function extractToc(source: string): TOCItem[] {
  return source
    .split("\n")
    .filter((line) => line.startsWith("## ") || line.startsWith("### "))
    .map((line) => {
      const level = line.startsWith("### ") ? 3 : 2;
      const text = line.replace(/^###?\s+/, "").trim();

      return {
        level,
        text,
        id: toHeadingId(text),
      } as TOCItem;
    });
}

export function getAllArticles(): BlogArticle[] {
  return articleMeta
    .map((meta) => {
      const source = getArticleSource(meta.slug);
      return {
        ...meta,
        readingTime: readingTime(source).text,
        toc: extractToc(source),
        Content: articleComponentMap[meta.slug as keyof typeof articleComponentMap],
      };
    })
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export function getArticleBySlug(slug: string) {
  return getAllArticles().find((article) => article.slug === slug);
}

export function getRelatedArticles(slug: string, limit = 3) {
  const current = getArticleBySlug(slug);
  const articles = getAllArticles().filter((article) => article.slug !== slug);

  if (!current) {
    return articles.slice(0, limit);
  }

  return articles
    .sort((a, b) => Number(b.category === current.category) - Number(a.category === current.category))
    .slice(0, limit);
}
