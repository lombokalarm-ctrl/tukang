import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function getSiteVerificationMetadata(): Pick<Metadata, "verification"> {
  const google = process.env.GOOGLE_SITE_VERIFICATION;
  const bing = process.env.BING_SITE_VERIFICATION;

  if (!google && !bing) {
    return {};
  }

  return {
    verification: {
      google,
      other: bing
        ? {
            "msvalidate.01": bing,
          }
        : undefined,
    },
  };
}

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  authors?: string[];
  publishedTime?: string;
  modifiedTime?: string;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image = siteConfig.ogImage,
  type = "website",
  authors = [],
  publishedTime,
  modifiedTime,
}: MetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const openGraph =
    type === "article"
      ? {
          title,
          description,
          url,
          siteName: siteConfig.name,
          locale: "id_ID",
          type: "article" as const,
          publishedTime,
          modifiedTime,
          authors,
          tags: keywords,
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }
      : {
          title,
          description,
          url,
          siteName: siteConfig.name,
          locale: "id_ID",
          type: "website" as const,
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        };
  const other =
    type === "article"
      ? {
          ...(publishedTime ? { "article:published_time": publishedTime } : {}),
          ...(modifiedTime ? { "article:modified_time": modifiedTime } : {}),
        }
      : undefined;

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    authors: authors.map((name) => ({ name })),
    alternates: {
      canonical: url,
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    other,
  };
}
