"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles, Globe, ShoppingCart, BarChart3, Store, Grid3X3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollBackground from "@/components/ScrollBackground";
import AITwinChat from "@/components/AITwinChat";

const solutionData: Record<string, { title: string; icon: React.ReactNode; description: string; features: string[]; benefits: string[] }> = {
  ecommerce: {
    title: "E-Commerce Solutions",
    icon: <ShoppingCart className="w-8 h-8" />,
    description: "Build scalable, secure e-commerce platforms that drive revenue. Our solutions cover everything from single-vendor stores to complex multi-vendor marketplaces with payment gateways, inventory management, and analytics dashboards.",
    features: ["Custom storefront design", "Payment gateway integration (Stripe, PayPal, local)", "Inventory & order management", "SEO-optimized product pages", "Mobile-first shopping experience"],
    benefits: ["30% average conversion increase", "PCI-compliant payment processing", "Real-time inventory sync", "Multi-currency support"],
  },
  "erp-software": {
    title: "ERP Software Development",
    icon: <BarChart3 className="w-8 h-8" />,
    description: "Enterprise Resource Planning software designed to unify your business operations. From manufacturing workflows to financial reporting, our ERP solutions give you complete visibility and control.",
    features: ["Financial & accounting modules", "Supply chain & inventory management", "HR & payroll integration", "Real-time dashboards & reports", "Role-based access control"],
    benefits: ["40% reduction in manual processes", "Centralized data management", "Compliance-ready reporting", "Scalable architecture"],
  },
  "business-management": {
    title: "Business Management Software",
    icon: <Grid3X3 className="w-8 h-8" />,
    description: "All-in-one business management platforms combining CRM, HRM, project management, accounting, and analytics. Built for growing enterprises that need integrated tools.",
    features: ["CRM & lead management", "Project & task tracking", "Team collaboration tools", "Automated invoicing & billing", "Analytics & KPI dashboards"],
    benefits: ["Unified business operations", "50% faster reporting", "Reduced tool fragmentation", "Mobile & desktop access"],
  },
  marketplace: {
    title: "Marketplace Development",
    icon: <Store className="w-8 h-8" />,
    description: "Multi-vendor marketplace platforms that connect buyers and sellers. Complete with seller onboarding, payment splitting, commission management, and advanced search.",
    features: ["Multi-vendor seller dashboards", "Payment splitting & commissions", "Advanced product search & filters", "Review & rating systems", "Admin panel with analytics"],
    benefits: ["Automated commission handling", "Vendor performance analytics", "Scalable to millions of products", "Real-time messaging system"],
  },
  "custom-software": {
    title: "Custom Software Solutions",
    icon: <Globe className="w-8 h-8" />,
    description: "Bespoke software built specifically for your business challenges. Whether you need a SaaS product, internal automation tool, or complex data processing system, we engineer from concept to deployment.",
    features: ["Requirements analysis & scoping", "Custom architecture design", "Agile development sprints", "Automated testing & QA", "Post-launch support & maintenance"],
    benefits: ["100% tailored to your workflow", "Source code ownership", "Faster time-to-market", "Ongoing enhancement & support"],
  },
};

export default function SolutionDetailClient() {
  const params = useParams();
  const slug = params.slug as string;
  const solution = solutionData[slug];

  if (!solution) {
    return (
      <div className="min-h-screen bg-[#0A111C] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Solution Not Found</h1>
          <Link href="/solutions" className="text-[#D4F12A] hover:underline font-bold">View All Solutions</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A111C] text-white">
      <ScrollBackground />
      <Navbar />
      <main className="pt-32 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <Link href="/solutions" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-[#D4F12A] mb-8 font-mono">
          <ArrowRight className="w-3 h-3 rotate-180" /> Back to All Solutions
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D4F12A]/30 bg-[#D4F12A]/10 text-[#D4F12A] shadow-[0_0_20px_rgba(212,241,42,0.15)]">
              {solution.icon}
            </div>
            <div>
              <span className="text-xs font-mono text-[#D4F12A] font-bold uppercase tracking-widest">Industry Solution</span>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{solution.title}</h1>
            </div>
          </div>

          <p className="text-lg text-zinc-300 leading-relaxed mb-10">{solution.description}</p>

          <div className="grid gap-6 md:grid-cols-2 mb-10">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8">
              <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D4F12A]" /> Core Capabilities
              </h2>
              <ul className="space-y-3">
                {solution.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-zinc-300">
                    <Check className="w-5 h-5 text-[#D4F12A] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#D4F12A]/10 bg-gradient-to-br from-[#D4F12A]/5 to-transparent p-8">
              <h2 className="text-xl font-bold text-white mb-5">Business Impact</h2>
              <ul className="space-y-3">
                {solution.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-zinc-300">
                    <span className="w-5 h-5 rounded-full bg-[#D4F12A] text-black flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-[#D4F12A]/20 bg-gradient-to-br from-[#D4F12A]/10 to-transparent p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-4">Need {solution.title}?</h2>
            <p className="text-zinc-400 mb-6">Let&apos;s discuss your requirements and build a custom solution for your business.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#D4F12A] text-slate-950 font-extrabold text-base hover:bg-lime-400 transition-colors">
              Get Free Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
      <AITwinChat />
    </div>
  );
}
