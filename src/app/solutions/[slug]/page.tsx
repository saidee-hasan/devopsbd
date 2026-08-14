import type { Metadata } from "next";
import SolutionDetailClient from "./SolutionDetailClient";

const solutionPages: Record<string, { title: string; description: string; keywords: string }> = {
  ecommerce: {
    title: "E-Commerce Solutions — DevOpsBD Technologies",
    description: "Custom e-commerce platforms, online store development, payment gateway integration, and marketplace solutions by DevOpsBD Technologies Ltd.",
    keywords: "ecommerce development, online store, Shopify, WooCommerce, custom e-commerce platform",
  },
  "erp-software": {
    title: "ERP Software Development — DevOpsBD Technologies",
    description: "Enterprise Resource Planning (ERP) software tailored for manufacturing, retail, and logistics businesses. Streamline operations with custom ERP solutions.",
    keywords: "ERP software, enterprise resource planning, business management software, custom ERP development",
  },
  "business-management": {
    title: "Business Management Software — DevOpsBD Technologies",
    description: "Custom business management platforms with CRM, HRM, inventory, accounting, and analytics modules for growing enterprises.",
    keywords: "business management software, CRM, HRM, inventory management, business automation",
  },
  marketplace: {
    title: "Marketplace Development — DevOpsBD Technologies",
    description: "Multi-vendor marketplace platforms with seller dashboards, payment splitting, order management, and real-time analytics for your business.",
    keywords: "marketplace development, multi-vendor platform, online marketplace, seller dashboard",
  },
  "custom-software": {
    title: "Custom Software Solutions — DevOpsBD Technologies",
    description: "Bespoke software development for unique business needs. From SaaS platforms to internal tools, we build what your business requires.",
    keywords: "custom software development, bespoke software, SaaS development, tailored business solutions",
  },
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(solutionPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = solutionPages[slug];
  if (page) {
    return {
      title: page.title,
      description: page.description,
      keywords: page.keywords,
      openGraph: {
        title: page.title,
        description: page.description,
        url: `https://devopsbd.com/solutions/${slug}`,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: page.title,
        description: page.description?.substring(0, 200) || "",
      },
      alternates: { canonical: `/solutions/${slug}` },
    };
  }
  return { title: "Solutions — DevOpsBD Technologies", description: "Industry-specific technology solutions for businesses worldwide." };
}

export default function SolutionDetailPage() {
  return <SolutionDetailClient />;
}
