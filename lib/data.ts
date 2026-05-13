import articleMetaData from "@/data/articles.json";
import faqsData from "@/data/faqs.json";
import locationsData from "@/data/locations.json";
import portfolioData from "@/data/portfolio.json";
import servicesData from "@/data/services.json";
import testimonialsData from "@/data/testimonials.json";
import type {
  ArticleMeta,
  FAQItem,
  LandingPage,
  Location,
  PortfolioItem,
  Service,
  Testimonial,
} from "@/lib/types";

export const services = servicesData as Service[];
export const locations = locationsData as Location[];
export const testimonials = testimonialsData as Testimonial[];
export const portfolioItems = portfolioData as PortfolioItem[];
export const articleMeta = articleMetaData as ArticleMeta[];
export const siteFaqs = faqsData as FAQItem[];

export function getServiceBySlug(slug: string) {
  return services.find((item) => item.slug === slug);
}

export function getLocationBySlug(slug: string) {
  return locations.find((item) => item.slug === slug);
}

export function getArticleMetaBySlug(slug: string) {
  return articleMeta.find((item) => item.slug === slug);
}

export function getLandingSlug(service: Service, location: Location) {
  return service.landingPattern === "jasa"
    ? `jasa-${service.slug}-${location.slug}`
    : `${service.slug}-${location.slug}`;
}

export function getLandingPath(service: Service, location: Location) {
  return `/${getLandingSlug(service, location)}`;
}

export function getAllLandingPages(): LandingPage[] {
  return services.flatMap((service) =>
    locations.map((location) => ({
      slug: getLandingSlug(service, location),
      service,
      location,
      path: getLandingPath(service, location),
      title: `${service.name} ${location.name} | ${service.shortName} Profesional Lombok`,
      description: `${service.name} di ${location.name} untuk rumah, villa, hotel, kantor, dan proyek komersial. Konsultasi cepat via WhatsApp dengan tim TukangDiLombok.com.`,
    })),
  );
}

export function getLandingBySlug(slug: string) {
  return getAllLandingPages().find((item) => item.slug === slug);
}

export function getFeaturedServices() {
  return services.filter((item) => item.featured);
}

export function getFeaturedLocations() {
  return locations.filter((item) => item.featured);
}

export function getRelatedServices(serviceSlug: string, limit = 3) {
  const current = getServiceBySlug(serviceSlug);

  if (!current) {
    return services.slice(0, limit);
  }

  return services
    .filter((item) => item.slug !== serviceSlug)
    .sort((a, b) => Number(b.category === current.category) - Number(a.category === current.category))
    .slice(0, limit);
}

export function getRelatedLocations(locationSlug: string, limit = 4) {
  return locations.filter((item) => item.slug !== locationSlug).slice(0, limit);
}

export function getServicePortfolio(serviceSlug?: string) {
  return serviceSlug
    ? portfolioItems.filter((item) => item.serviceSlug === serviceSlug)
    : portfolioItems;
}

export function getServiceTestimonials(serviceSlug?: string) {
  return serviceSlug
    ? testimonials.filter((item) => item.serviceSlug === serviceSlug)
    : testimonials;
}
