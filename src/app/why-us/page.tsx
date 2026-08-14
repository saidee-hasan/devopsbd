import { Metadata } from "next";
import { pageOg, pageTwitter } from "@/lib/seo/og";
import WhyUsPageClient from "./WhyUsPageClient";

export const metadata: Metadata = {
  title: "Why Choose Us — DevOpsBD Technologies",
  description:
    "Discover 10 reasons why global companies choose DevOpsBD Technologies: senior engineers, modern technology, 24/7 SLA support, affordable Silicon Valley quality, and clean code.",
  openGraph: pageOg(
    "Why Choose Us — DevOpsBD Technologies",
    "Discover 10 reasons why global companies choose DevOpsBD Technologies: senior engineers, modern technology, 24/7 SLA support, affordable Silicon Valley quality, and clean code.",
    "/why-us",
  ),
  twitter: pageTwitter(
    "Why Choose Us — DevOpsBD Technologies",
    "Discover 10 reasons why global companies choose DevOpsBD Technologies: senior engineers, modern technology, 24/7 SLA support, affordable Silicon Valley quality, and clean code.",
  ),
  alternates: { canonical: "/why-us" },
};

export default function WhyUsPage() {
  return <WhyUsPageClient />;
}
