import { Metadata } from "next";
import { pageOg, pageTwitter } from "@/lib/seo/og";
import ProcessPageClient from "./ProcessPageClient";
import { workProcess } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Our Engineering Process — DevOpsBD Technologies",
  description: "See how DevOpsBD delivers world-class software through our 8-step agile engineering process: Discovery, Design, Development, QA, Deployment, and ongoing support.",
  openGraph: pageOg(
    "Our Engineering Process — DevOpsBD Technologies",
    "See how DevOpsBD delivers world-class software through our 8-step agile engineering process: Discovery, Design, Development, QA, Deployment, and ongoing support.",
    "/process",
  ),
  twitter: pageTwitter(
    "Our Engineering Process — DevOpsBD Technologies",
    "See how DevOpsBD delivers world-class software through our 8-step agile engineering process: Discovery, Design, Development, QA, Deployment, and ongoing support.",
  ),
  alternates: { canonical: "/process" },
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "DevOpsBD Software Engineering Process",
  description: "Our 8-step agile methodology for delivering world-class software solutions.",
  step: workProcess.map((step, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: step.title,
    text: step.description,
  })),
};

export default function ProcessPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <ProcessPageClient />
    </>
  );
}
