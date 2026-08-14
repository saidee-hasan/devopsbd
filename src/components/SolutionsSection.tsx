"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CloudRain, Layers3, ShoppingBag, Bot, ArrowUpRight, Check } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const enterpriseSolutions = [
  {
    icon: <CloudRain className="w-7 h-7 text-primary" />,
    badge: "Cloud & Microservices",
    title: "Cloud-Native Infrastructure Transformation",
    description: "Migrate monolithic legacy systems to automated Docker & Kubernetes clusters on AWS, DigitalOcean, or hybrid clouds with 99.99% uptime.",
    benefits: ["Zero-downtime deployment pipelines", "Auto-scaling infrastructure", "Prometheus & Grafana 24/7 telemetry"],
  },
  {
    icon: <Layers3 className="w-7 h-7 text-primary" />,
    badge: "SaaS Architecture",
    title: "Multi-Tenant SaaS Product Engineering",
    description: "End-to-end SaaS development featuring tenant isolation, role-based access control, automated billing with Stripe/SSLCommerz, and usage analytics.",
    benefits: ["Sub-2s tenant onboarding", "Granular usage quota controls", "Enterprise SSO & OAuth2 security"],
  },
  {
    icon: <ShoppingBag className="w-7 h-7 text-primary" />,
    badge: "High-Scale Commerce",
    title: "Headless E-Commerce & Fintech Platforms",
    description: "High-conversion digital commerce and payment gateways designed for extreme peak loads and sub-second checkout speeds.",
    benefits: ["PCI-DSS compliant architecture", "Multi-currency wallet integration", "Instant search & inventory sync"],
  },
  {
    icon: <Bot className="w-7 h-7 text-primary" />,
    badge: "AI & Automation",
    title: "Enterprise AI & Business Automation Engine",
    description: "Integrate LLM models (OpenAI, Gemini), vector databases (pgvector), and automated workflow scripts directly into your business stack.",
    benefits: ["Custom AI knowledge assistants", "RAG & Vector database pipelines", "Automated document processing"],
  },
];

const SolutionsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="solutions" className="section-padding relative z-10">
      <div className="container-narrow" ref={ref}>
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
          className="mb-12 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-subtle border border-primary/30 text-sm font-mono text-primary mb-4 shadow-[0_0_12px_rgba(41,214,185,0.12)]">
            Tailored For Growth
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Enterprise Digital <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-base leading-relaxed font-medium">
            Architected to solve complex business bottlenecks for startups, growth-stage enterprises, and international organizations.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {enterpriseSolutions.map((sol, i) => (
            <SpotlightCard key={sol.title} delay={i * 0.1} className="h-full group">
              <div className="p-7 sm:p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 shadow-[0_0_24px_rgba(41,214,185,0.14)]">
                      {sol.icon}
                    </div>
                    <span className="text-sm font-mono font-bold text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                      {sol.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors mb-3">
                    {sol.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed font-medium mb-6">
                    {sol.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-white/10 mb-6">
                    {sol.benefits.map((ben) => (
                      <div key={ben} className="flex items-center gap-2.5 text-sm font-semibold text-foreground/90">
                        <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  <span>Request Solution Proposal</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
