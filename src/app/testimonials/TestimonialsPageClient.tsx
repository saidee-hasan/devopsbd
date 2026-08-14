"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Star, Quote, ArrowRight, Building } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollBackground from "@/components/ScrollBackground";
import AITwinChat from "@/components/AITwinChat";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { testimonials } from "@/data/portfolio";

export default function TestimonialsPageClient() {
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
              <span>Client Success Stories</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
              Trusted By Global <br />
              <span className="text-gradient">Leaders & Founders</span>
            </h1>

            <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium mb-10">
              Read feedback from startup founders, VPs of Product, and enterprise executives across the UK, USA, UAE, and Bangladesh.
            </p>
          </motion.div>
        </section>

        {/* Testimonials Cards Grid */}
        <section className="container-narrow mb-24">
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((t, idx) => (
              <SpotlightCard key={t.id} delay={idx * 0.1} className="h-full">
                <div className="p-8 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-sm font-mono text-muted-foreground">{t.location}</span>
                    </div>

                    <p className="text-base sm:text-base text-foreground/90 italic leading-relaxed font-medium mb-8">
                      &quot;{t.content}&quot;
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 border border-primary/30 text-primary font-mono font-black text-base">
                      {t.avatar}
                    </div>

                    <div>
                      <h2 className="text-base font-bold text-foreground">{t.clientName}</h2>
                      <p className="text-sm text-muted-foreground font-medium">{t.clientRole}, <span className="text-primary">{t.company}</span></p>
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
              Ready to Build Your <span className="text-gradient">Success Story?</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base font-medium mb-8 max-w-xl mx-auto">
              Partner with DevOpsBD Technologies for your next software launch.
            </p>
            <div className="flex justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                <span>Start Your Project</span>
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
