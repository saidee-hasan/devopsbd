import { Metadata } from "next";
import { pageOg, pageTwitter } from "@/lib/seo/og";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Engineering Services — DevOpsBD Technologies",
  description:
    "Explore our software development services including website development, web applications, mobile apps, DevOps cloud automation, UI/UX design, and SaaS platforms.",
  openGraph: pageOg(
    "Engineering Services — DevOpsBD Technologies",
    "Explore our software development services including website development, web applications, mobile apps, DevOps cloud automation, UI/UX design, and SaaS platforms.",
    "/services",
  ),
  twitter: pageTwitter(
    "Engineering Services — DevOpsBD Technologies",
    "Explore our software development services including website development, web applications, mobile apps, DevOps cloud automation, UI/UX design, and SaaS platforms.",
  ),
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
