import type { Metadata } from "next";
import { pageOg, pageTwitter } from "@/lib/seo/og";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollBackground from "@/components/ScrollBackground";

export const metadata: Metadata = {
  title: "Terms of Service — DevOpsBD Technologies Ltd",
  description: "Review the terms and conditions for using DevOpsBD Technologies Ltd services, including intellectual property rights, user obligations, and service agreements.",
  robots: { index: true, follow: true },
  openGraph: pageOg(
    "Terms of Service — DevOpsBD Technologies Ltd",
    "Review the terms and conditions for using DevOpsBD Technologies Ltd services, including intellectual property rights, user obligations, and service agreements.",
    "/terms",
  ),
  twitter: pageTwitter(
    "Terms of Service — DevOpsBD Technologies Ltd",
    "Review the terms and conditions for using DevOpsBD Technologies Ltd services, including intellectual property rights, user obligations, and service agreements.",
  ),
  alternates: { canonical: "/terms" },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <ScrollBackground />
      <Navbar />

      <main className="flex-1 pt-32 pb-20 relative z-10 container-narrow max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-8">
          Terms of <span className="text-gradient">Service</span>
        </h1>
        <p className="text-base text-muted-foreground mb-12">
          Effective Date: August 4, 2026
        </p>

        <div className="prose prose-invert prose-slate max-w-none">
          <p className="text-base text-zinc-300 leading-relaxed mb-6">
            These Terms of Service constitute a legally binding agreement made between you and DevOpsBD Technologies Ltd concerning your access to and use of our website and services.
          </p>

          <h3 className="text-xl font-bold text-white mt-10 mb-4">1. Intellectual Property Rights</h3>
          <p className="text-base text-zinc-300 leading-relaxed mb-6">
            Unless otherwise indicated, the website is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the website are owned or controlled by us. Upon completion of a service contract, IP rights are transferred as explicitly stated in the specific project SLA.
          </p>

          <h3 className="text-xl font-bold text-white mt-10 mb-4">2. User Representations</h3>
          <p className="text-base text-zinc-300 leading-relaxed mb-6">
            By using the website or our services, you represent and warrant that all registration information you submit will be true, accurate, current, and complete.
          </p>

          <h3 className="text-xl font-bold text-white mt-10 mb-4">3. Prohibited Activities</h3>
          <p className="text-base text-zinc-300 leading-relaxed mb-6">
            You may not access or use the website for any purpose other than that for which we make the website available. The website may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
          </p>

          <h3 className="text-xl font-bold text-white mt-10 mb-4">4. Modifications and Interruptions</h3>
          <p className="text-base text-zinc-300 leading-relaxed mb-6">
            We reserve the right to change, modify, or remove the contents of the website at any time or for any reason at our sole discretion without notice.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
