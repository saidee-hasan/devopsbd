import { Metadata } from "next";
import { pageOg, pageTwitter } from "@/lib/seo/og";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us & Free Consultation — DevOpsBD Technologies",
  description:
    "Get in touch with DevOpsBD Technologies for software development inquiries, cloud architecture audits, and technical scope consultation.",
  openGraph: pageOg(
    "Contact Us & Free Consultation — DevOpsBD Technologies",
    "Get in touch with DevOpsBD Technologies for software development inquiries, cloud architecture audits, and technical scope consultation.",
    "/contact",
  ),
  twitter: pageTwitter(
    "Contact Us & Free Consultation — DevOpsBD Technologies",
    "Get in touch with DevOpsBD Technologies for software development inquiries, cloud architecture audits, and technical scope consultation.",
  ),
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
