import type { Metadata } from "next";
import ProjectDetailClient from "./ProjectDetailClient";

type Props = { params: Promise<{ slug: string }> };

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(`${API_BASE}/api/projects`, { next: { revalidate: 3600 } });
    const data = await res.json();
    const projects = data.projects || data || [];
    if (Array.isArray(projects)) {
      const proj = projects.find((p: { slug?: string; _id?: string; id?: string }) =>
        (p.slug || p._id || p.id) === slug
      );
      if (proj?.title) {
        return {
          title: `${proj.title} — DevOpsBD Portfolio`,
          description: proj.summary || proj.description?.substring(0, 160) || `Portfolio project: ${proj.title} by DevOpsBD Technologies.`,
          openGraph: {
            title: `${proj.title} | DevOpsBD Portfolio`,
            description: proj.summary || proj.description,
            url: `https://devopsbd.com/portfolio/${slug}`,
            type: "website",
            images: proj.images?.[0] ? [{ url: proj.images[0] }] : [],
          },
          twitter: {
            card: "summary_large_image",
            title: proj.title,
            description: (proj.summary || proj.description)?.substring(0, 200) || "",
            images: proj.images?.[0] ? [proj.images[0]] : [],
          },
          alternates: { canonical: `/portfolio/${slug}` },
        };
      }
    }
  } catch {}

  return {
    title: "Portfolio Project — DevOpsBD Technologies",
    description: "Explore our portfolio of successful software engineering projects delivered worldwide.",
  };
}

export default function ProjectDetailPage() {
  return <ProjectDetailClient />;
}
