"use client";
import { usePathname } from "next/navigation";

const siteUrl = "https://devopsbd.com";

const breadcrumbMap: Record<string, string> = {
  about: "About",
  services: "Services",
  "web-development": "Web Development",
  "mobile-app-development": "Mobile App Development",
  "ui-ux-design": "UI/UX Design",
  "cloud-devops": "Cloud & DevOps",
  "ai-solutions": "AI Solutions",
  solutions: "Solutions",
  ecommerce: "E-Commerce Solutions",
  "erp-software": "ERP Software",
  "business-management": "Business Management",
  marketplace: "Marketplace Development",
  "custom-software": "Custom Software",
  portfolio: "Portfolio",
  pricing: "Pricing",
  blog: "Blog",
  team: "Team",
  careers: "Careers",
  contact: "Contact",
  faq: "FAQ",
  testimonials: "Testimonials",
  process: "Process",
  technologies: "Technologies",
  "why-us": "Why Choose Us",
  privacy: "Privacy Policy",
  terms: "Terms of Service",
};

export default function BreadcrumbSchema() {
  const pathname = usePathname();
  if (pathname === "/" || pathname.startsWith("/admin")) return null;

  const segments = pathname.split("/").filter(Boolean);
  const items = segments.map((seg, i) => ({
    "@type": "ListItem" as const,
    position: i + 1,
    name: breadcrumbMap[seg] || seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    item: `${siteUrl}/${segments.slice(0, i + 1).join("/")}`,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      ...items,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
