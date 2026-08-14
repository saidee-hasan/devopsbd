import { Metadata } from "next";
import { pageOg, pageTwitter } from "@/lib/seo/og";
import SolutionsPageClient from "./SolutionsPageClient";

export const metadata: Metadata = {
  title: "Enterprise Solutions & Industries — DevOpsBD Technologies",
  description:
    "Discover enterprise software solutions for Fintech, Healthcare, E-Commerce, Logistics, Real Estate, and SaaS platforms built by DevOpsBD Technologies.",
  openGraph: pageOg(
    "Enterprise Solutions & Industries — DevOpsBD Technologies",
    "Discover enterprise software solutions for Fintech, Healthcare, E-Commerce, Logistics, Real Estate, and SaaS platforms built by DevOpsBD Technologies.",
    "/solutions",
  ),
  twitter: pageTwitter(
    "Enterprise Solutions & Industries — DevOpsBD Technologies",
    "Discover enterprise software solutions for Fintech, Healthcare, E-Commerce, Logistics, Real Estate, and SaaS platforms built by DevOpsBD Technologies.",
  ),
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return <SolutionsPageClient />;
}
