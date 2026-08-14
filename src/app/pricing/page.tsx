import { Metadata } from "next";
import { pageOg, pageTwitter } from "@/lib/seo/og";
import PricingPageClient from "./PricingPageClient";

export const metadata: Metadata = {
  title: "Pricing Plans & Packages — DevOpsBD Technologies",
  description:
    "Explore transparent pricing plans for website development, full-stack web applications, mobile apps, DevOps cloud automation, and custom enterprise software engineering.",
  openGraph: pageOg(
    "Pricing Plans & Packages — DevOpsBD Technologies",
    "Explore transparent pricing plans for website development, full-stack web applications, mobile apps, DevOps cloud automation, and custom enterprise software engineering.",
    "/pricing",
  ),
  twitter: pageTwitter(
    "Pricing Plans & Packages — DevOpsBD Technologies",
    "Explore transparent pricing plans for website development, full-stack web applications, mobile apps, DevOps cloud automation, and custom enterprise software engineering.",
  ),
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return <PricingPageClient />;
}
