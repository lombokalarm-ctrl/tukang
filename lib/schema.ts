import { absoluteUrl } from "@/lib/seo";
import { createWhatsAppLink, siteConfig } from "@/lib/site";
import type { ArticleMeta, BreadcrumbItem, FAQItem, LandingPage, Service } from "@/lib/types";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/logo-mark.svg"),
    sameAs: [createWhatsAppLink()],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "customer service",
        areaServed: "ID-NB",
        availableLanguage: ["id"],
      },
    ],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    image: absoluteUrl(siteConfig.ogImage),
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "RpRp",
    openingHours: siteConfig.operatingHours,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: "Lombok",
      addressRegion: "Nusa Tenggara Barat",
      addressCountry: "ID",
    },
    areaServed: siteConfig.serviceAreas.split(", "),
    sameAs: [createWhatsAppLink()],
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function serviceSchema(service: Service, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: `${service.name} Lombok`,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      areaServed: "Pulau Lombok",
    },
    areaServed: "Pulau Lombok",
    url: absoluteUrl(path),
  };
}

export function landingServiceSchema(landing: LandingPage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${landing.service.name} ${landing.location.name}`,
    serviceType: landing.service.name,
    description: landing.description,
    areaServed: landing.location.name,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      telephone: siteConfig.phone,
      url: siteConfig.url,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(landing.path),
    },
  };
}

export function articleSchema(article: ArticleMeta, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: absoluteUrl(article.coverImage),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo-mark.svg"),
      },
    },
    mainEntityOfPage: absoluteUrl(path),
  };
}
