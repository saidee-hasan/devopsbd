"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Cpu,
  Layers,
  Zap,
  Clock,
  DollarSign,
  CheckCircle2,
  TrendingUp,
  ShieldAlert,
  Activity,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollBackground from "@/components/ScrollBackground";
import AITwinChat from "@/components/AITwinChat";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { whyChooseUs } from "@/data/portfolio";

const iconMap: Record<string, any> = {
  Users,
  Cpu,
  Layers,
  Zap,
  Clock,
  DollarSign,
  CheckCircle2,
  TrendingUp,
  ShieldAlert,
  Activity,
};

export default function WhyUsPageClient() {
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
              <span>Competitive Advantages</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
              Why Partner With <br />
              <span className="text-gradient">DevOpsBD Technologies?</span>
            </h1>

            <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium mb-10">
              We deliver Silicon Valley engineering quality, bulletproof cloud infrastructure, and 24/7 client support at competitive global rates.
            </p>
          </motion.div>
        </section>

        {/* Why Choose Us Grid */}
        <section className="container-narrow mb-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, idx) => {
              const Icon = iconMap[item.icon] || CheckCircle2;
              return (
                <SpotlightCard key={item.id} delay={idx * 0.05} className="h-full">
                  <div className="p-7 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/30 text-primary mb-5">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h2 className="text-xl font-bold text-foreground mb-3">{item.title}</h2>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>
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
              Experience the <span className="text-gradient">DevOpsBD Difference</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base font-medium mb-8 max-w-xl mx-auto">
              Start your next software initiative with guaranteed engineering excellence.
            </p>
            <div className="flex justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                <span>Partner With Us</span>
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
