import type { Metadata } from "next";
import { services } from "@/data/portfolio";
import ServiceDetailClient from "./ServiceDetailClient";

type Props = { params: Promise<{ slug: string }> };

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const validSlugs = services.map((s) => s.id);

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(`${API_BASE}/api/services`, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (Array.isArray(data)) {
      const svc = data.find((s: { serviceId?: string; id?: string; _id?: string }) =>
        (s.serviceId || s.id || s._id) === slug
      );
      if (svc?.title) {
        return {
          title: `${svc.title} — DevOpsBD Technologies`,
          description: svc.description?.substring(0, 160) || `Professional ${svc.title} services by DevOpsBD Technologies.`,
          openGraph: {
            title: `${svc.title} | DevOpsBD Technologies`,
            description: svc.description,
            url: `https://devopsbd.com/services/${slug}`,
            type: "website",
            images: svc.image ? [{ url: svc.image, width: 1200, height: 630, alt: svc.title }] : [],
          },
          twitter: {
            card: "summary_large_image",
            title: svc.title,
            description: svc.description?.substring(0, 200) || "",
            images: svc.image ? [svc.image] : [],
          },
          alternates: { canonical: `/services/${slug}` },
        };
      }
    }
  } catch {}

  const fallback = services.find((s) => s.id === slug);
  if (fallback) {
    return {
      title: `${fallback.title} — DevOpsBD Technologies`,
      description: fallback.description,
      openGraph: {
        title: fallback.title,
        description: fallback.description,
        url: `https://devopsbd.com/services/${slug}`,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: fallback.title,
        description: fallback.description?.substring(0, 200) || "",
      },
      alternates: { canonical: `/services/${slug}` },
    };
  }

  return {
    title: "Services — DevOpsBD Technologies",
    description: "Enterprise-grade digital engineering services by DevOpsBD Technologies Ltd.",
  };
}

export default function ServiceDetailPage() {
  return <ServiceDetailClient />;
}
