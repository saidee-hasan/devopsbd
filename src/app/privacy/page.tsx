import type { Metadata } from "next";
import { pageOg, pageTwitter } from "@/lib/seo/og";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollBackground from "@/components/ScrollBackground";

export const metadata: Metadata = {
  title: "Privacy Policy — DevOpsBD Technologies Ltd",
  description: "Learn how DevOpsBD Technologies Ltd collects, uses, and protects your personal data. Our privacy policy ensures GDPR-compliant data handling for all clients.",
  robots: { index: true, follow: true },
  openGraph: pageOg(
    "Privacy Policy — DevOpsBD Technologies Ltd",
    "Learn how DevOpsBD Technologies Ltd collects, uses, and protects your personal data. Our privacy policy ensures GDPR-compliant data handling for all clients.",
    "/privacy",
  ),
  twitter: pageTwitter(
    "Privacy Policy — DevOpsBD Technologies Ltd",
    "Learn how DevOpsBD Technologies Ltd collects, uses, and protects your personal data. Our privacy policy ensures GDPR-compliant data handling for all clients.",
  ),
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <ScrollBackground />
      <Navbar />

      <main className="flex-1 pt-32 pb-20 relative z-10 container-narrow max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-8">
          Privacy <span className="text-gradient">Policy</span>
        </h1>
        <p className="text-base text-muted-foreground mb-12">
          Effective Date: August 4, 2026
        </p>

        <div className="prose prose-invert prose-slate max-w-none">
          <p className="text-base text-zinc-300 leading-relaxed mb-6">
            At DevOpsBD Technologies Ltd, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          <h3 className="text-xl font-bold text-white mt-10 mb-4">1. Information We Collect</h3>
          <p className="text-base text-zinc-300 leading-relaxed mb-6">
            We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services. The personal information we collect may include names, email addresses, phone numbers, and job titles.
          </p>

          <h3 className="text-xl font-bold text-white mt-10 mb-4">2. How We Use Your Information</h3>
          <p className="text-base text-zinc-300 leading-relaxed mb-6">
            We use the information we collect or receive to facilitate account creation, send administrative information to you, fulfill and manage your orders or service requests, and for other business purposes such as data analysis and improving our services.
          </p>

          <h3 className="text-xl font-bold text-white mt-10 mb-4">3. Data Security</h3>
          <p className="text-base text-zinc-300 leading-relaxed mb-6">
            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
          </p>

          <h3 className="text-xl font-bold text-white mt-10 mb-4">4. Contact Us</h3>
          <p className="text-base text-zinc-300 leading-relaxed mb-6">
            If you have questions or comments about this notice, you may email us at privacy@devopsbd.com or by post to: Level 8, Tech Tower, Gulshan-2, Dhaka 1212, Bangladesh.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
