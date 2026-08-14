import { companyInfo } from "@/data/portfolio";

const siteUrl = "https://devopsbd.com";
export const ogLocale = "en_US";

export const siteConfig = {
  siteUrl,
  homeUrl: `${siteUrl}/`,
  updatedAt: "2026-07-26T00:00:00.000Z",
  siteName: companyInfo.fullName,
  title: `${companyInfo.fullName} — Enterprise Software Development & Cloud Solutions`,
  description: companyInfo.heroSubhead,
  author: companyInfo.fullName,
  creator: companyInfo.fullName,
  email: companyInfo.email,
  github: companyInfo.social.github,
  linkedin: companyInfo.social.linkedin,
  locale: "en-US",
  ogLocale,
  ogImage: "/og-image.svg",
  keywords: [
    "DevOpsBD",
    "DevOpsBD Technologies",
    "DevOpsBD Technologies Ltd",
    "Software Development Company",
    "Website Development Agency",
    "Web Application Engineering",
    "Mobile App Development",
    "Cloud Solutions",
    "DevOps Automation",
    "UI/UX Design Firm",
    "Enterprise Software Development",
    "Custom SaaS Development",
    "Bangladesh Software Company",
    "Global IT Firm",
  ],
  geo: {
    region: "BD-13",
    placename: "Gulshan-2, Dhaka 1212, Bangladesh",
    latitude: 23.7815,
    longitude: 90.4133,
    position: "23.7815;90.4133",
    icbm: "23.7815, 90.4133",
  },
  sameAs: [
    companyInfo.social.github,
    companyInfo.social.linkedin,
    companyInfo.social.twitter,
    companyInfo.social.facebook,
    companyInfo.social.youtube,
  ],
  aboutSummary: companyInfo.heroSubhead,
} as const;

export const canonicalPages = [siteConfig.homeUrl] as const;
