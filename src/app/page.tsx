import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { pageOg, pageTwitter } from "@/lib/seo/og";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

export const metadata: Metadata = {
  title: "DevOpsBD Technologies — Enterprise Software Development & Cloud Solutions",
  description: "DevOpsBD Technologies Ltd builds scalable websites, mobile apps, cloud infrastructure, UI/UX designs, and enterprise software for growing businesses worldwide.",
  keywords: ["Software Development Company", "Web Development Bangladesh", "Mobile App Development", "Cloud Solutions", "DevOps Services", "Enterprise Software", "UI/UX Design Firm"],
  openGraph: {
    ...pageOg(
      "DevOpsBD Technologies — Enterprise Software Development & Cloud Solutions",
      "DevOpsBD Technologies Ltd builds scalable websites, mobile apps, cloud infrastructure, UI/UX designs, and enterprise software for growing businesses worldwide.",
      "/",
    ),
    type: "website",
    videos: [{ url: "https://devopsbd.com/bg.mp4", width: 1920, height: 1080, type: "video/mp4" }],
  },
  twitter: pageTwitter(
    "DevOpsBD Technologies — Enterprise Software Development & Cloud Solutions",
    "DevOpsBD Technologies Ltd builds scalable websites, mobile apps, cloud infrastructure, UI/UX designs, and enterprise software for growing businesses worldwide.",
  ),
  alternates: { canonical: "/" },
};

const AboutSection = dynamic(() => import("@/components/AboutSection"), {
  loading: () => <div className="h-96 bg-[#0A111C]" />,
});
const KeyBenefitsSection = dynamic(() => import("@/components/KeyBenefitsSection"), {
  loading: () => <div className="h-64 bg-[#0B121E]" />,
});
const ServicesSection = dynamic(() => import("@/components/ServicesSection"), {
  loading: () => <div className="h-96 bg-[#0B121E]" />,
});
const ProcessSection = dynamic(() => import("@/components/ProcessSection"), {
  loading: () => <div className="h-64 bg-[#0A111C]" />,
});
const WhyChooseUsSection = dynamic(() => import("@/components/WhyChooseUsSection"), {
  loading: () => <div className="h-64 bg-[#0A111C]" />,
});
const TechnologiesSection = dynamic(() => import("@/components/TechnologiesSection"), {
  loading: () => <div className="h-64 bg-[#0A111C]" />,
});
const FaqSection = dynamic(() => import("@/components/FaqSection"), {
  loading: () => <div className="h-64 bg-[#0A111C]" />,
});
const BlogSection = dynamic(() => import("@/components/BlogSection"), {
  loading: () => <div className="h-64 bg-[#0A111C]" />,
});
const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  loading: () => <div className="h-64 bg-[#0A111C]" />,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="h-32 bg-[#0A111C]" />,
});
const ScrollBackground = dynamic(() => import("@/components/ScrollBackground"));
const AITwinChat = dynamic(() => import("@/components/AITwinChat"));

export default function Home() {
  return (
    <>
      <ScrollBackground />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />

        <AboutSection />

        <KeyBenefitsSection />

        <ServicesSection limit={6} />

        <ProcessSection />

        <WhyChooseUsSection />

        <TechnologiesSection />

        <FaqSection />

        <BlogSection />

        <ContactSection />
      </main>

      <Footer />

      <AITwinChat />
    </>
  );
}
