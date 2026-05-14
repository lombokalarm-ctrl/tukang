import type { MetadataRoute } from "next";
import { getAllLandingPages, locations, services } from "@/lib/data";
import { getAllArticles } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/layanan",
    "/area-layanan",
    "/blog",
    "/harga",
    "/portfolio",
    "/testimoni",
    "/tentang-kami",
    "/kontak",
    "/faq",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path || "/"),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/layanan/${service.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...locations.map((location) => ({
      url: absoluteUrl(`/area-layanan/${location.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...getAllArticles().map((article) => ({
      url: absoluteUrl(`/blog/${article.slug}`),
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: [absoluteUrl(article.coverImage)],
    })),
    ...getAllLandingPages().map((landing) => ({
      url: absoluteUrl(landing.path),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.72,
    })),
  ];
}
