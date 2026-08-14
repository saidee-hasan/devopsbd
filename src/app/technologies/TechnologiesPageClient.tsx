"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Cpu, Code2, Server, Database, Cloud, Terminal, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollBackground from "@/components/ScrollBackground";
import AITwinChat from "@/components/AITwinChat";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { techStack } from "@/data/portfolio";

export default function TechnologiesPageClient() {
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
              <span>Modern Engineering Stack</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
              Technologies & <br />
              <span className="text-gradient">Frameworks</span>
            </h1>

            <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium mb-10">
              We build production systems using modern frontend tools, high-throughput backend runtimes, bulletproof databases, and elastic cloud infrastructure.
            </p>
          </motion.div>
        </section>

        {/* Tech Stack Categories Grid */}
        <section className="container-narrow mb-24">
          <div className="space-y-12">
            {techStack.map((cat, idx) => (
              <SpotlightCard key={cat.category} delay={idx * 0.1} className="w-full">
                <div className="p-8">
                  <div className="mb-6">
                    <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-sm font-mono font-bold text-primary">
                      {cat.category} Stack
                    </span>
                    <h2 className="text-xl font-bold text-foreground mt-2">{cat.category} Architecture</h2>
                    <p className="text-sm sm:text-base text-muted-foreground font-medium mt-1">{cat.description}</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-4 border-t border-border">
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className="p-4 rounded-2xl bg-muted/40 dark:bg-white/5 border border-border flex flex-col justify-between gap-2 hover:border-primary/50 transition-colors"
                      >
                        <div className="text-base font-extrabold text-foreground">{item.name}</div>
                        <span className="text-xs font-mono text-primary uppercase font-bold">{item.tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="container-narrow">
          <div className="relative rounded-3xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/30 p-8 sm:p-12 text-center overflow-hidden">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              Need a Custom <span className="text-gradient">Tech Stack Audit?</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base font-medium mb-8 max-w-xl mx-auto">
              Our architects will evaluate your existing technology or advise on a new build.
            </p>
            <div className="flex justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                <span>Request Technology Audit</span>
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
