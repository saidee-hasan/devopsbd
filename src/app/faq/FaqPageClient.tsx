"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, HelpCircle, ChevronDown, MessageSquareQuote, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollBackground from "@/components/ScrollBackground";
import AITwinChat from "@/components/AITwinChat";
import { faqs } from "@/data/portfolio";

export default function FaqPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
              <HelpCircle className="w-3.5 h-3.5 text-primary" />
              <span>Got Questions? We Have Answers</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
              Frequently Asked <br />
              <span className="text-gradient">Questions</span>
            </h1>

            <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium mb-10">
              Clear answers to your questions about our development process, pricing, code ownership, timelines, and 24/7 SLA maintenance.
            </p>
          </motion.div>
        </section>

        {/* Accordion List */}
        <section className="container-narrow mb-24 max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-border bg-card/60 backdrop-blur-md overflow-hidden transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-base text-foreground hover:text-primary transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-sm sm:text-base text-muted-foreground leading-relaxed font-medium border-t border-border/40">
                      <p className="pt-4">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="container-narrow">
          <div className="relative rounded-3xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/30 p-8 sm:p-12 text-center overflow-hidden">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              Have Another <span className="text-gradient">Question?</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base font-medium mb-8 max-w-xl mx-auto">
              Our team is ready to answer any technical or business inquiry.
            </p>
            <div className="flex justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                <MessageSquareQuote className="w-4 h-4" />
                <span>Ask Our Technical Leads</span>
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
