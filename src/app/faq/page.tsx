import { Metadata } from "next";
import { pageOg, pageTwitter } from "@/lib/seo/og";
import FaqPageClient from "./FaqPageClient";
import { faqs } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) — DevOpsBD Technologies",
  description:
    "Find answers to common questions regarding our software development process, delivery timelines, IP ownership, payment terms, and 24/7 SLA support.",
  openGraph: pageOg(
    "Frequently Asked Questions (FAQ) — DevOpsBD Technologies",
    "Find answers to common questions regarding our software development process, delivery timelines, IP ownership, payment terms, and 24/7 SLA support.",
    "/faq",
  ),
  twitter: pageTwitter(
    "Frequently Asked Questions (FAQ) — DevOpsBD Technologies",
    "Find answers to common questions regarding our software development process, delivery timelines, IP ownership, payment terms, and 24/7 SLA support.",
  ),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FaqPageClient />
    </>
  );
}
