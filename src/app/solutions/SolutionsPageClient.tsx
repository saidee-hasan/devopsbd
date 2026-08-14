"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Building, ArrowRight, ShieldCheck, Zap, Layers, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollBackground from "@/components/ScrollBackground";
import AITwinChat from "@/components/AITwinChat";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { companyPortfolio } from "@/data/portfolio";

export default function SolutionsPageClient() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <ScrollBackground />
      <Navbar />

      <main className="flex-1 pt-28 pb-20 relative z-10" id="main-content">
        <section className="container-narrow text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-subtle border border-primary/30 text-sm font-mono text-primary mb-6 shadow-[0_0_15px_rgba(41,214,185,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Tailored Industry Architecture</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
              Enterprise Industry <br />
              <span className="text-gradient">Solutions</span>
            </h1>

            <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium mb-10">
              Purpose-built software platforms engineered to solve complex operational challenges across Fintech, Telehealth, E-Commerce, Logistics, and SaaS ecosystems.
            </p>
          </motion.div>
        </section>

        {/* Industry Solutions Grid */}
        <section className="container-narrow mb-24">
          <div className="grid gap-8 md:grid-cols-2">
            {companyPortfolio.map((proj, idx) => (
              <SpotlightCard key={proj.slug} delay={idx * 0.1} className="h-full">
                <div className="p-8 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-sm font-mono font-bold text-primary">
                        {proj.category} Solution
                      </span>
                      <span className="text-sm font-mono text-muted-foreground">{proj.timeline}</span>
                    </div>

                    <h2 className="text-xl font-bold text-foreground mb-3">{proj.title}</h2>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium mb-6">
                      {proj.summary}
                    </p>

                    <div className="p-4 rounded-xl bg-muted/40 dark:bg-white/5 border border-border mb-6">
                      <p className="text-sm font-bold text-foreground mb-1">Impact & Results:</p>
                      <p className="text-sm text-muted-foreground leading-normal">{proj.impact}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {proj.tech.map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-md text-sm font-mono bg-primary/10 text-primary border border-primary/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider shadow-md hover:bg-primary/90 transition-all"
                  >
                    <Building className="w-4 h-4" />
                    <span>Request Industry Solution</span>
                  </Link>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="container-narrow">
          <div className="relative rounded-3xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/30 p-8 sm:p-12 text-center overflow-hidden">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              Need an Enterprise <span className="text-gradient">Solution Built?</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base font-medium mb-8 max-w-xl mx-auto">
              Our architects will design a scalable blueprint tailored for your sector.
            </p>
            <div className="flex justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                <span>Consult Our Architects</span>
                <ArrowRight className="w-4 h-4" />
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
