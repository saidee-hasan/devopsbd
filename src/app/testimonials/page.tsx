import { Metadata } from "next";
import { pageOg, pageTwitter } from "@/lib/seo/og";
import TestimonialsPageClient from "./TestimonialsPageClient";
import { testimonials } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Client Testimonials & Reviews — DevOpsBD Technologies",
  description: "Read what clients say about DevOpsBD Technologies. Real feedback from startups, enterprises, and global businesses on our software engineering services.",
  openGraph: pageOg(
    "Client Testimonials & Reviews — DevOpsBD Technologies",
    "Read what clients say about DevOpsBD Technologies. Real feedback from startups, enterprises, and global businesses on our software engineering services.",
    "/testimonials",
  ),
  twitter: pageTwitter(
    "Client Testimonials & Reviews — DevOpsBD Technologies",
    "Read what clients say about DevOpsBD Technologies. Real feedback from startups, enterprises, and global businesses on our software engineering services.",
  ),
  alternates: { canonical: "/testimonials" },
};

const avgRating = testimonials.reduce((a, t) => a + t.rating, 0) / testimonials.length;

const reviewJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DevOpsBD Technologies Ltd",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: avgRating.toFixed(1),
    reviewCount: testimonials.length,
    bestRating: 5,
  },
  review: testimonials.map((t) => ({
    "@type": "Review",
    author: { "@type": "Person", name: t.clientName },
    reviewBody: t.content,
    reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5 },
  })),
};

export default function TestimonialsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }} />
      <TestimonialsPageClient />
    </>
  );
}
