"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, ArrowRight, Layers, Cpu, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollBackground from "@/components/ScrollBackground";
import AITwinChat from "@/components/AITwinChat";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { workProcess } from "@/data/portfolio";

export default function ProcessPageClient() {
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
              <span>Predictable Agile Delivery</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
              Our 7-Step Software <br />
              <span className="text-gradient">Engineering Workflow</span>
            </h1>

            <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium mb-10">
              A disciplined, transparent, and battle-tested development framework delivering enterprise quality on predictable sprint schedules.
            </p>
          </motion.div>
        </section>

        {/* Process Steps */}
        <section className="container-narrow mb-24">
          <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            {workProcess.map((step, idx) => (
              <SpotlightCard key={step.step} delay={idx * 0.08} className="w-full">
                <div className="p-8 flex flex-col md:flex-row items-start gap-6">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 border border-primary/30 text-xl font-black font-mono text-primary shadow-lg">
                    {step.step}
                  </div>

                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-foreground mb-2">{step.title}</h2>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium mb-5">
                      {step.description}
                    </p>

                    <div className="pt-4 border-t border-border">
                      <p className="text-sm font-mono font-bold uppercase tracking-wider text-primary mb-3">
                        Key Deliverables:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {step.deliverables.map((deliv) => (
                          <span
                            key={deliv}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/40 dark:bg-white/5 border border-border text-sm font-medium text-foreground/90"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                            {deliv}
                          </span>
                        ))}
                      </div>
                    </div>
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
              Start Your First <span className="text-gradient">Discovery Sprint</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base font-medium mb-8 max-w-xl mx-auto">
              Kick off Step 01 today with our project leads.
            </p>
            <div className="flex justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                <span>Schedule Discovery Call</span>
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
