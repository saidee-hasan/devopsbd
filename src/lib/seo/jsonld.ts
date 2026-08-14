import { companyInfo, companyPortfolio, services } from "@/data/portfolio";
import { siteConfig } from "./site";

const websiteId = `${siteConfig.siteUrl}#website`;
const webpageId = `${siteConfig.siteUrl}#webpage`;
const organizationId = `${siteConfig.siteUrl}#organization`;
const portfolioListId = `${siteConfig.siteUrl}#portfolio`;

type JsonLd = Record<string, unknown>;

export function toJsonLd(schema: JsonLd): string {
  return JSON.stringify(schema);
}

export function getWebsiteSchema(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteConfig.homeUrl,
    name: siteConfig.siteName,
    description: siteConfig.description,
    inLanguage: siteConfig.locale,
    publisher: {
      "@id": organizationId,
    },
  };
}

export function getWebPageSchema(): JsonLd {
  return {
    "@type": "WebPage",
    "@id": webpageId,
    url: siteConfig.homeUrl,
    name: siteConfig.title,
    description: siteConfig.description,
    isPartOf: {
      "@id": websiteId,
    },
    about: {
      "@id": organizationId,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${siteConfig.siteUrl}${siteConfig.ogImage}`,
    },
    inLanguage: siteConfig.locale,
    dateModified: siteConfig.updatedAt,
  };
}

export function getOrganizationSchema(): JsonLd {
  return {
    "@type": ["Organization", "LocalBusiness"],
    "@id": organizationId,
    name: companyInfo.name,
    legalName: companyInfo.fullName,
    url: siteConfig.homeUrl,
    logo: `${siteConfig.siteUrl}/og-image.svg`,
    description: companyInfo.heroSubhead,
    email: companyInfo.email,
    telephone: companyInfo.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Level 8, Tech Tower, Gulshan-2",
      addressLocality: "Dhaka",
      postalCode: "1212",
      addressCountry: "BD",
    },
    sameAs: siteConfig.sameAs,
    knowsAbout: siteConfig.keywords,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "DevOpsBD Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
        },
      })),
    },
  };
}

export function getPortfolioItemListSchema(): JsonLd {
  return {
    "@type": "ItemList",
    "@id": portfolioListId,
    name: `${companyInfo.fullName} Portfolio`,
    numberOfItems: companyPortfolio.length,
    itemListElement: companyPortfolio.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: project.title,
        description: `${project.description} ${project.impact}`,
        applicationCategory: project.category,
        operatingSystem: "Web, Cloud, Cross-Platform",
        author: {
          "@id": organizationId,
        },
        keywords: project.tech.join(", "),
      },
    })),
  };
}

export function getPortfolioGraph(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [getWebsiteSchema(), getWebPageSchema(), getOrganizationSchema(), getPortfolioItemListSchema()],
  };
}
