"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe, Code2, Palette, Smartphone, Cloud, Cpu, Network, Layers,
  ShoppingCart, Zap, Terminal, ShieldCheck, ArrowRight, Check, Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollBackground from "@/components/ScrollBackground";
import AITwinChat from "@/components/AITwinChat";
import { services as fallbackServices, ServiceItem } from "@/data/portfolio";
import { API_URL } from "@/lib/api";

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6" />,
  Code2: <Code2 className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
  Cloud: <Cloud className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  Network: <Network className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  ShoppingCart: <ShoppingCart className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  Terminal: <Terminal className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
};

export default function ServiceDetailClient() {
  const params = useParams();
  const slug = params.slug as string;
  const [service, setService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/services`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const svc = data.find(
            (s: { serviceId?: string; id?: string; _id?: string }) =>
              (s.serviceId || s.id || s._id) === slug
          );
          if (svc) {
            setService({ id: slug, icon: svc.icon, title: svc.title, description: svc.description, features: svc.features || [], cta: svc.cta || "Get Started" });
          }
        }
      })
      .catch(() => {
        const fallback = fallbackServices.find((s) => s.id === slug);
        if (fallback) setService(fallback);
      });
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#0A111C] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Service Not Found</h1>
          <Link href="/services" className="text-[#D4F12A] hover:underline font-bold">View All Services</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A111C] text-white">
      <ScrollBackground />
      <Navbar />
      <main className="pt-32 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <Link href="/services" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-[#D4F12A] mb-8 font-mono">
          <ArrowRight className="w-3 h-3 rotate-180" /> Back to All Services
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D4F12A]/30 bg-[#D4F12A]/10 text-[#D4F12A] shadow-[0_0_20px_rgba(212,241,42,0.15)]">
              {iconMap[service.icon] || <Code2 className="w-8 h-8" />}
            </div>
            <div>
              <span className="text-xs font-mono text-[#D4F12A] font-bold uppercase tracking-widest">Our Service</span>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{service.title}</h1>
            </div>
          </div>

          <p className="text-lg text-zinc-300 leading-relaxed mb-10">{service.description}</p>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 mb-10">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D4F12A]" /> What We Deliver
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {service.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-base text-zinc-300">
                  <Check className="w-5 h-5 text-[#D4F12A] shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#D4F12A]/20 bg-gradient-to-br from-[#D4F12A]/10 to-transparent p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-zinc-400 mb-6">Let&apos;s discuss how we can help you with {service.title.toLowerCase()}.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#D4F12A] text-slate-950 font-extrabold text-base hover:bg-lime-400 transition-colors"
            >
              {service.cta} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
      <AITwinChat />
    </div>
  );
}
