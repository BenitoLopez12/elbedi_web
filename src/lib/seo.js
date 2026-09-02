import siteConfig from "@/config/siteConfig.js";
import site from "@/content/site.js";

export const SEO_IDS = {
  organization: `${siteConfig.url}/#organization`,
  website: `${siteConfig.url}/#website`,
};

export const toAbsoluteUrl = (value = "/") =>
  new URL(value, `${siteConfig.url}/`).toString();

export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": SEO_IDS.organization,
    name: siteConfig.siteName,
    legalName: siteConfig.legalName,
    alternateName: siteConfig.alternateName,
    url: `${siteConfig.url}/`,
    logo: {
      "@type": "ImageObject",
      "@id": `${siteConfig.url}/#logo`,
      url: toAbsoluteUrl(siteConfig.logo),
      contentUrl: toAbsoluteUrl(siteConfig.logo),
      width: siteConfig.logoWidth,
      height: siteConfig.logoHeight,
      caption: siteConfig.siteName,
    },
    image: {
      "@type": "ImageObject",
      url: toAbsoluteUrl(siteConfig.mainImage),
      width: siteConfig.mainImageWidth,
      height: siteConfig.mainImageHeight,
      caption: siteConfig.mainImageAlt,
    },
    slogan: siteConfig.slogan,
    description: siteConfig.description,
    email: site.email,
    telephone: site.phone,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      telephone: site.phone,
      areaServed: ["MX", "LATAM", "US"],
      availableLanguage: ["es", "es-MX"],
    },
    areaServed: [
      { "@type": "Country", name: "México" },
      { "@type": "Place", name: "Latinoamérica" },
      { "@type": "Country", name: "Estados Unidos" },
    ],
    knowsAbout: [
      "Inteligencia artificial para empresas",
      "Agentes de inteligencia artificial",
      "Sistemas agénticos",
      "Automatización de procesos",
      "Agentes de IA para WhatsApp",
      "Analítica web con inteligencia artificial",
      "Diseño y desarrollo web",
    ],
    sameAs: siteConfig.socialProfiles,
  };
}

export function buildWebsiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SEO_IDS.website,
    url: `${siteConfig.url}/`,
    name: siteConfig.siteName,
    alternateName: siteConfig.alternateName,
    description: siteConfig.description,
    inLanguage: siteConfig.lang,
    publisher: { "@id": SEO_IDS.organization },
  };
}

export function buildWebPageSchema({
  url,
  name,
  description,
  pageType = "WebPage",
  dateModified = "2026-08-11",
  primaryImage = siteConfig.mainImage,
}) {
  const absoluteUrl = toAbsoluteUrl(url);

  return {
    "@type": pageType,
    "@id": `${absoluteUrl}#webpage`,
    url: absoluteUrl,
    name,
    description,
    inLanguage: siteConfig.lang,
    isPartOf: { "@id": SEO_IDS.website },
    about: { "@id": SEO_IDS.organization },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: toAbsoluteUrl(primaryImage),
      width: siteConfig.mainImageWidth,
      height: siteConfig.mainImageHeight,
    },
    dateModified,
  };
}

export function buildItemListSchema(items, { name, url } = {}) {
  const absoluteUrl = toAbsoluteUrl(url ?? "/servicios");

  return {
    "@type": "ItemList",
    "@id": `${absoluteUrl}#services`,
    name: name ?? "Servicios de inteligencia artificial de ELBEDI",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: toAbsoluteUrl(item.url),
      item: { "@id": `${toAbsoluteUrl(item.url)}#service` },
    })),
  };
}

export function buildBreadcrumbSchema(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.url),
    })),
  };
}

export function buildServiceSchema(service) {
  const absoluteUrl = toAbsoluteUrl(service.url);

  return {
    "@type": "Service",
    "@id": `${absoluteUrl}#service`,
    name: service.name,
    serviceType: service.serviceType ?? service.name,
    url: absoluteUrl,
    description: service.description,
    provider: { "@id": SEO_IDS.organization },
    areaServed: [
      { "@type": "Country", name: "México" },
      { "@type": "Place", name: "Latinoamérica" },
      { "@type": "Country", name: "Estados Unidos" },
    ],
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Empresas, equipos y organizaciones",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl,
      servicePhone: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: site.phone,
        availableLanguage: ["es", "es-MX"],
      },
    },
  };
}

export function buildFaqSchema(items, pageUrl) {
  return {
    "@type": "FAQPage",
    "@id": `${toAbsoluteUrl(pageUrl)}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question ?? item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer ?? item.a,
      },
    })),
  };
}

export function buildSchemaGraph(nodes) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}
