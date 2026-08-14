import type { Metadata } from "next";
import BlogDetailClient from "./BlogDetailClient";

type Props = {
  params: Promise<{ slug: string }>;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(`${API_BASE}/api/blogs/slug/${encodeURIComponent(slug)}`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();

    if (data && data.title) {
      return {
        title: `${data.title} — DevOpsBD Technologies Blog`,
        description: data.excerpt || data.content?.substring(0, 160) || "Read our latest technology insights.",
        openGraph: {
          title: data.title,
          description: data.excerpt || "",
          type: "article",
          url: `https://devopsbd.com/blog/${slug}`,
          publishedTime: data.createdAt,
          images: data.coverImage ? [{ url: data.coverImage }] : [],
        },
        twitter: {
          card: "summary_large_image",
          title: data.title,
          description: data.excerpt || "",
          images: data.coverImage ? [data.coverImage] : [],
        },
      };
    }
  } catch {
    // fallback
  }

  return {
    title: "Tech Insight — DevOpsBD Technologies",
    description: "Read technical articles, engineering tutorials, and cloud architecture deep dives from DevOpsBD Technologies.",
  };
}

export default function BlogPostPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Article", "BlogPosting"],
            headline: "Tech Insight — DevOpsBD Technologies",
            author: {
              "@type": "Organization",
              name: "DevOpsBD Technologies Ltd",
              url: "https://devopsbd.com",
            },
            publisher: {
              "@type": "Organization",
              name: "DevOpsBD Technologies Ltd",
            },
          }),
        }}
      />
      <BlogDetailClient />
    </>
  );
}
