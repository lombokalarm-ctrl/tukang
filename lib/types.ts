import type { ComponentType } from "react";

export type LandingPattern = "jasa" | "direct";

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  icon: string;
  landingPattern: LandingPattern;
  featured: boolean;
  excerpt: string;
  description: string;
  benefits: string[];
  useCases: string[];
  keywords: string[];
};

export type Location = {
  slug: string;
  name: string;
  type: string;
  featured: boolean;
  excerpt: string;
  description: string;
  neighborhoods: string[];
  keywords: string[];
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  quote: string;
  serviceSlug: string;
};

export type PortfolioItem = {
  slug: string;
  title: string;
  serviceSlug: string;
  locationSlug: string;
  summary: string;
  before: string;
  after: string;
  image: string;
  value: string;
};

export type ArticleMeta = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  keywords: string[];
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type TOCItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type BlogArticle = ArticleMeta & {
  readingTime: string;
  toc: TOCItem[];
  Content: ComponentType;
};

export type LandingPage = {
  slug: string;
  service: Service;
  location: Location;
  title: string;
  description: string;
  path: string;
};
