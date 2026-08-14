import { Metadata } from "next";
import { pageOg, pageTwitter } from "@/lib/seo/og";
import TechnologiesPageClient from "./TechnologiesPageClient";

export const metadata: Metadata = {
  title: "Tech Stack & Frameworks — DevOpsBD Technologies",
  description:
    "Explore our production technology stack: React, Next.js, TypeScript, Node.js, Express, PostgreSQL, MongoDB, Redis, Docker, Kubernetes, AWS, and Cloudflare.",
  openGraph: pageOg(
    "Tech Stack & Frameworks — DevOpsBD Technologies",
    "Explore our production technology stack: React, Next.js, TypeScript, Node.js, Express, PostgreSQL, MongoDB, Redis, Docker, Kubernetes, AWS, and Cloudflare.",
    "/technologies",
  ),
  twitter: pageTwitter(
    "Tech Stack & Frameworks — DevOpsBD Technologies",
    "Explore our production technology stack: React, Next.js, TypeScript, Node.js, Express, PostgreSQL, MongoDB, Redis, Docker, Kubernetes, AWS, and Cloudflare.",
  ),
  alternates: { canonical: "/technologies" },
};

export default function TechnologiesPage() {
  return <TechnologiesPageClient />;
}
