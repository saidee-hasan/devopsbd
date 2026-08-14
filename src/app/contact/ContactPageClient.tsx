"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageSquareQuote } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollBackground from "@/components/ScrollBackground";
import AITwinChat from "@/components/AITwinChat";
import ContactSection from "@/components/ContactSection";

export default function ContactPageClient() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <ScrollBackground />
      <Navbar />

      <main className="flex-1 pt-28 pb-20 relative z-10" id="main-content">
        <section className="container-narrow text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-subtle border border-primary/30 text-sm font-mono text-primary mb-6 shadow-[0_0_15px_rgba(41,214,185,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Dedicated Consultation Channel</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
              Schedule Your Free <br />
              <span className="text-gradient">Technical Review</span>
            </h1>
          </motion.div>
        </section>

        <ContactSection />
      </main>

      <Footer />
      <AITwinChat />
    </div>
  );
}
