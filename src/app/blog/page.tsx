import { Metadata } from "next";
import { pageOg, pageTwitter } from "@/lib/seo/og";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Engineering Blog & Tech Insights — DevOpsBD Technologies",
  description: "Explore articles and guides on DevOps automation, cloud architecture, website engineering, full-stack development, and AI integration from DevOpsBD Technologies.",
  openGraph: pageOg(
    "Engineering Blog & Tech Insights — DevOpsBD Technologies",
    "Explore articles and guides on DevOps automation, cloud architecture, website engineering, full-stack development, and AI integration from DevOpsBD Technologies.",
    "/blog",
  ),
  twitter: pageTwitter(
    "Engineering Blog & Tech Insights — DevOpsBD Technologies",
    "Explore articles and guides on DevOps automation, cloud architecture, website engineering, full-stack development, and AI integration from DevOpsBD Technologies.",
  ),
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return <BlogListClient />;
}
