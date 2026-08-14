"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, Zap, Sparkles } from "lucide-react";
import { pricingPlans as fallbackPlans } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { API_URL } from "@/lib/api";

const PricingSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();
  const [pricingPlans, setPricingPlans] = useState(fallbackPlans);

  useEffect(() => {
    fetch(`${API_URL}/api/pricing`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setPricingPlans(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="pricing" className="section-padding relative z-10">
      <div className="container-narrow" ref={ref}>
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
          className="mb-14 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-subtle border border-primary/30 text-sm font-mono text-primary mb-4 shadow-[0_0_12px_rgba(41,214,185,0.12)]">
            Transparent Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Predictable & Affordable <span className="text-gradient">Pricing Plans</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-base leading-relaxed font-medium">
            Clear project milestones and transparent pricing tiers with zero hidden costs.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid gap-6 lg:grid-cols-3 items-stretch">
          {pricingPlans.map((plan, i) => (
            <SpotlightCard
              key={plan.name}
              delay={i * 0.1}
              className={`h-full relative flex flex-col justify-between ${
                plan.popular ? "border-primary/50 shadow-[0_0_30px_rgba(41,214,185,0.15)] scale-[1.02]" : ""
              }`}
            >
              <div className="p-7 sm:p-8 flex flex-col justify-between h-full">
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-mono font-bold tracking-wider shadow-[0_0_12px_rgba(41,214,185,0.4)] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> MOST POPULAR
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium min-h-[36px]">
                      {plan.tagline}
                    </p>
                  </div>

                  <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black text-foreground">{plan.price}</span>
                    </div>
                    <span className="text-sm font-mono text-muted-foreground uppercase">{plan.period}</span>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3 mb-8 pt-4 border-t border-white/10">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-sm font-medium text-foreground/85 leading-tight">
                        <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contact"
                  className={`inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 active:scale-95 ${
                    plan.popular
                      ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(41,214,185,0.25)] hover:bg-primary/90"
                      : "bg-white/5 hover:bg-white/10 border border-white/10 text-foreground"
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  {plan.cta}
                </a>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
