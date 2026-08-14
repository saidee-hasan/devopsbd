import { Metadata } from "next";
import { pageOg, pageTwitter } from "@/lib/seo/og";
import PortfolioPageClient from "./PortfolioPageClient";

export const metadata: Metadata = {
  title: "Case Studies & Software Portfolio — DevOpsBD Technologies",
  description:
    "Explore enterprise software platforms, AI builders, telehealth ERPs, global fintech gateways, and cloud infrastructure engineered by DevOpsBD Technologies.",
  openGraph: pageOg(
    "Case Studies & Software Portfolio — DevOpsBD Technologies",
    "Explore enterprise software platforms, AI builders, telehealth ERPs, global fintech gateways, and cloud infrastructure engineered by DevOpsBD Technologies.",
    "/portfolio",
  ),
  twitter: pageTwitter(
    "Case Studies & Software Portfolio — DevOpsBD Technologies",
    "Explore enterprise software platforms, AI builders, telehealth ERPs, global fintech gateways, and cloud infrastructure engineered by DevOpsBD Technologies.",
  ),
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
