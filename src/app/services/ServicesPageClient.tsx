"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe,
  Code2,
  Palette,
  Smartphone,
  Cloud,
  Cpu,
  Network,
  Layers,
  ShoppingCart,
  Zap,
  Terminal,
  ShieldCheck,
  Check,
  Sparkles,
  ArrowRight,
  MessageSquareQuote,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollBackground from "@/components/ScrollBackground";
import AITwinChat from "@/components/AITwinChat";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { services } from "@/data/portfolio";

const iconMap: Record<string, any> = {
  Globe,
  Code2,
  Palette,
  Smartphone,
  Cloud,
  Cpu,
  Network,
  Layers,
  ShoppingCart,
  Zap,
  Terminal,
  ShieldCheck,
};

export default function ServicesPageClient() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <ScrollBackground />
      <Navbar />

      <main className="flex-1 pt-28 pb-20 relative z-10" id="main-content">
        {/* Hero Section */}
        <section className="container-narrow text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-subtle border border-primary/30 text-sm font-mono text-primary mb-6 shadow-[0_0_15px_rgba(41,214,185,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Full-Stack Engineering Capabilities</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
              Software Services & <br />
              <span className="text-gradient">Digital Solutions</span>
            </h1>

            <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium mb-10">
              End-to-end digital engineering from website development to microservices, mobile apps, and 24/7 cloud DevOps operations.
            </p>
          </motion.div>
        </section>

        {/* Services Grid */}
        <section className="container-narrow mb-24">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((svc, idx) => {
              const Icon = iconMap[svc.icon] || Code2;
              return (
                <SpotlightCard key={svc.id} delay={idx * 0.05} className="h-full">
                  <div className="p-7 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/30 text-primary mb-6">
                        <Icon className="w-6 h-6" />
                      </div>

                      <h2 className="text-xl font-bold text-foreground mb-3">{svc.title}</h2>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium mb-6">
                        {svc.description}
                      </p>

                      <ul className="space-y-2.5 mb-8 pt-4 border-t border-border">
                        {svc.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2.5 text-sm text-foreground/85 font-medium">
                            <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary mt-0.5">
                              <Check className="w-3 h-3" />
                            </div>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl bg-muted/50 hover:bg-muted dark:bg-white/5 dark:hover:bg-white/10 border border-border text-sm font-bold text-foreground hover:text-primary transition-all"
                    >
                      <span>{svc.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="container-narrow">
          <div className="relative rounded-3xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/30 p-8 sm:p-12 text-center overflow-hidden">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              Need a Custom <span className="text-gradient">Engineering Scope?</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base font-medium mb-8 max-w-xl mx-auto">
              Our leads will review your tech stack and present a comprehensive proposal.
            </p>
            <div className="flex justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                <MessageSquareQuote className="w-4 h-4" />
                <span>Request Custom Service Scope</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AITwinChat />
    </div>
  );
}
