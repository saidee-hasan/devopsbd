"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HelpCircle } from "lucide-react";
import { faqs as fallbackFaqs } from "@/data/portfolio";
import { API_URL } from "@/lib/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const FaqSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();
  const [faqs, setFaqs] = useState(fallbackFaqs);

  useEffect(() => {
    fetch(`${API_URL}/api/faqs`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setFaqs(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="faq" className="section-padding relative z-10">
      <div className="container-narrow max-w-4xl" ref={ref}>
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-subtle border border-primary/30 text-sm font-mono text-primary mb-4 shadow-[0_0_12px_rgba(41,214,185,0.12)]">
            Got Questions?
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-base leading-relaxed font-medium">
            Everything you need to know about working with DevOpsBD Technologies.
          </p>
        </motion.div>

        {/* Accordion List */}
        <SpotlightCard className="p-6 sm:p-8">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b border-white/10 last:border-none pb-2">
                <AccordionTrigger className="text-base sm:text-base font-bold text-left hover:text-primary transition-colors py-4">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed pl-8 pb-4 font-normal">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SpotlightCard>
      </div>
    </section>
  );
};

export default FaqSection;
