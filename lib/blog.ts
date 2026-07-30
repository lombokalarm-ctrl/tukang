import fs from "node:fs";
import path from "node:path";
import readingTime from "reading-time";

import BangunRumahGuide from "@/content/blog/biaya-bangun-rumah-di-lombok.mdx";
import TukangHarianGuide from "@/content/blog/harga-tukang-harian-di-lombok.mdx";
import RenovasiGuide from "@/content/blog/jasa-renovasi-rumah-di-lombok-mulai-dari-mana.mdx";
import { createMarkdownArticleComponent } from "@/lib/blog-content";
import { articleMeta } from "@/lib/data";
import { toHeadingId } from "@/lib/utils";
import type { BlogArticle, TOCItem } from "@/lib/types";

const articleComponentMap = {
  "biaya-bangun-rumah-di-lombok": BangunRumahGuide,
  "harga-tukang-harian-di-lombok": TukangHarianGuide,
  "jasa-renovasi-rumah-di-lombok-mulai-dari-mana": RenovasiGuide,
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

function getStaticArticles(): BlogArticle[] {
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

function logDatabaseArticleError(error: unknown) {
  console.error("[blog] Failed to read published database articles. Falling back to static articles only.", error);
}

async function getDatabaseArticles(): Promise<BlogArticle[]> {
  if (!process.env.DATABASE_URL) {
    return [];
  }

  try {
    const [{ BlogStatus }, { prisma }] = await Promise.all([
      import("@prisma/client"),
      import("./db/prisma"),
    ]);

    const posts = await prisma.blogPost.findMany({
      where: {
        status: BlogStatus.PUBLISHED,
      },
      include: {
        keywords: {
          orderBy: { keyword: "asc" },
        },
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    return posts.map((post) => {
      const source = post.content;

      return {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        coverImage: post.coverImage ?? "/blog/blog-1.svg",
        publishedAt: (post.publishedAt ?? post.createdAt).toISOString(),
        updatedAt: post.updatedAt.toISOString(),
        author: post.authorName,
        keywords: post.keywords.map((item) => item.keyword),
        metaTitle: post.metaTitle ?? undefined,
        metaDescription: post.metaDescription ?? undefined,
        readingTime: readingTime(source).text,
        toc: extractToc(source),
        Content: createMarkdownArticleComponent(source),
      } satisfies BlogArticle;
    });
  } catch (error) {
    logDatabaseArticleError(error);
    return [];
  }
}

function mergeArticles(staticArticles: BlogArticle[], databaseArticles: BlogArticle[]) {
  const articleMap = new Map<string, BlogArticle>();

  for (const article of staticArticles) {
    articleMap.set(article.slug, article);
  }

  for (const article of databaseArticles) {
    articleMap.set(article.slug, article);
  }

  return Array.from(articleMap.values()).sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export async function getAllArticles(): Promise<BlogArticle[]> {
  const [staticArticles, databaseArticles] = await Promise.all([Promise.resolve(getStaticArticles()), getDatabaseArticles()]);
  return mergeArticles(staticArticles, databaseArticles);
}

export async function getArticleBySlug(slug: string) {
  const articles = await getAllArticles();
  return articles.find((article) => article.slug === slug);
}

export async function getRelatedArticles(slug: string, limit = 3) {
  const current = await getArticleBySlug(slug);
  const articles = (await getAllArticles()).filter((article) => article.slug !== slug);

  if (!current) {
    return articles.slice(0, limit);
  }

  return articles
    .sort((a, b) => Number(b.category === current.category) - Number(a.category === current.category))
    .slice(0, limit);
}
