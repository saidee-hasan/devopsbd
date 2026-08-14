"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  X,
  Zap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Layers,
  DollarSign,
  HelpCircle,
  ChevronDown,
  MessageSquareQuote,
  CheckCircle2,
  Lock,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollBackground from "@/components/ScrollBackground";
import AITwinChat from "@/components/AITwinChat";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { pricingPlans, companyInfo } from "@/data/portfolio";

const featureComparison = [
  {
    category: "Development & Engineering",
    features: [
      { name: "Frontend Framework (Next.js / React)", starter: "Included", business: "Included", enterprise: "Custom Architecture" },
      { name: "Backend API & Database Design", starter: "Basic", business: "Advanced REST/GraphQL", enterprise: "Microservices & Distributed" },
      { name: "Responsive Mobile UI/UX Design", starter: true, business: true, enterprise: true },
      { name: "Mobile App Development (iOS/Android)", starter: false, business: "Cross-Platform", enterprise: "Native & Cross-Platform" },
      { name: "Full Source Code Ownership & IP", starter: true, business: true, enterprise: true },
      { name: "Dedicated Senior Project Manager", starter: false, business: true, enterprise: true },
    ],
  },
  {
    category: "DevOps, Cloud & Infrastructure",
    features: [
      { name: "Cloud Infrastructure Setup", starter: "Single Server / VPS", business: "Docker & Cloud Setup", enterprise: "Kubernetes & Multi-Cloud" },
      { name: "Automated CI/CD Deployment Pipeline", starter: "Basic", business: "Full GitHub Actions", enterprise: "GitOps / Custom Pipeline" },
      { name: "Domain & SSL Certificate Setup", starter: true, business: true, enterprise: true },
      { name: "Database Backups & Failover", starter: "Manual Weekly", business: "Automated Daily", enterprise: "Real-Time Multi-Region" },
      { name: "24/7 Server SLA Monitoring", starter: false, business: "Included (3 Mo)", enterprise: "Dedicated 24/7 Team" },
    ],
  },
  {
    category: "Security, Speed & QA",
    features: [
      { name: "100/100 Core Web Vitals Optimization", starter: true, business: true, enterprise: true },
      { name: "Technical SEO & Schema Markup", starter: "Basic", business: "Comprehensive", enterprise: "Enterprise Level" },
      { name: "OWASP Top 10 Security Hardening", starter: true, business: true, enterprise: true },
      { name: "Compliance (HIPAA / PCI-DSS / ISO)", starter: false, business: "Optional", enterprise: "Fully Certified" },
      { name: "Quality Assurance & Penetration Testing", starter: "Standard QA", business: "Automated E2E QA", enterprise: "Continuous Security Audits" },
    ],
  },
  {
    category: "Support & Guarantees",
    features: [
      { name: "Free SLA Post-Launch Support", starter: "1 Month", business: "3 Months", enterprise: "12 Months / Custom" },
      { name: "Guaranteed SLA Response Time", starter: "48 Hours", business: "8 Hours", enterprise: "< 1 Hour SLA" },
      { name: "Sprint Progress Demos & Staging Links", starter: "Bi-Weekly", business: "Weekly", enterprise: "Real-Time Staging" },
      { name: "100% Satisfaction Guarantee", starter: true, business: true, enterprise: true },
    ],
  },
];

const pricingFaqs = [
  {
    question: "How do your project milestone payments work?",
    answer:
      "For fixed-scope projects, payments are split into clear milestones: 30% upfront deposit upon contract signing, 40% after design sign-off and mid-way development demo, and 30% upon final testing, handover, and cloud deployment.",
  },
  {
    question: "Are there any hidden costs or recurring fees?",
    answer:
      "No. All our quotes are 100% transparent. Third-party cloud hosting costs (AWS, DigitalOcean, Cloudflare) and domain registrations are billed directly to your own infrastructure accounts with zero markup from us.",
  },
  {
    question: "Can we request custom features not listed in standard plans?",
    answer:
      "Absolutely! Over 60% of our clients require tailored engineering. Contact our team to receive a custom technical proposal and milestone estimate designed specifically for your business requirements.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept international Wire Transfer (SWIFT), Stripe, Credit/Debit cards, PayPal, and regional payment gateways in Bangladesh (SSLCommerz, bKash).",
  },
  {
    question: "Do I get full ownership of the source code and IP?",
    answer:
      "Yes, 100%. Upon project completion and final payment, complete source code repositories, design files, and cloud credentials are transferred to your organization with full legal IP ownership.",
  },
  {
    question: "What happens after the project is launched?",
    answer:
      "Every plan includes free post-launch SLA support (from 1 to 12 months). After that, you can choose our optional monthly maintenance packages for server monitoring, security patching, and continuous feature additions.",
  },
];

const guaranteeCards = [
  {
    icon: DollarSign,
    title: "100% Transparent Pricing",
    description: "Detailed milestone estimates with zero surprise fees or hidden agency markups.",
  },
  {
    icon: Lock,
    title: "100% IP & Code Ownership",
    description: "You retain total legal ownership of all code, assets, and infrastructure credentials.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security SLA",
    description: "Built-in security audits, encrypted backups, and OWASP compliance standards.",
  },
  {
    icon: Clock,
    title: "On-Time Milestone Guarantee",
    description: "Rigorous Agile sprint execution ensuring predictable delivery schedules.",
  },
];

export default function PricingPageClient() {
  const [billingCycle, setBillingCycle] = useState<"fixed" | "retainer">("fixed");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <ScrollBackground />
      <Navbar />

      <main className="flex-1 pt-28 pb-20 relative z-10" id="main-content">
        {/* Header Hero Section */}
        <section className="container-narrow text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            {/* Breadcrumb / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-subtle border border-primary/30 text-sm font-mono text-primary mb-6 shadow-[0_0_15px_rgba(41,214,185,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Transparent & Predictable Pricing</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
              Invest in World-Class <br />
              <span className="text-gradient">Digital Engineering</span>
            </h1>

            <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium mb-10">
              Clear project milestones, transparent pricing tiers, and zero hidden fees. From early-stage startups to scaling enterprises, we build digital products that drive real revenue.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center p-1.5 rounded-full bg-muted/60 dark:bg-white/5 border border-border backdrop-blur-md">
              <button
                type="button"
                onClick={() => setBillingCycle("fixed")}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  billingCycle === "fixed"
                    ? "bg-primary text-primary-foreground shadow-[0_0_14px_rgba(41,214,185,0.3)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Fixed Project Basis
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("retainer")}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-1.5 ${
                  billingCycle === "retainer"
                    ? "bg-primary text-primary-foreground shadow-[0_0_14px_rgba(41,214,185,0.3)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>Dedicated Team Retainer</span>
              </button>
            </div>
          </motion.div>
        </section>

        {/* Pricing Cards Grid */}
        <section className="container-narrow mb-24">
          <div className="grid gap-8 lg:grid-cols-3 items-stretch">
            {pricingPlans.map((plan, i) => {
              const isRetainer = billingCycle === "retainer";
              const priceDisplay = "Custom Quote";
              const periodDisplay =
                isRetainer ? "Based on monthly retainer" : "Based on project scope";

              return (
                <SpotlightCard
                  key={plan.name}
                  delay={i * 0.1}
                  className={`h-full relative flex flex-col justify-between transition-all duration-300 ${
                    plan.popular
                      ? "border-primary/60 shadow-[0_0_35px_rgba(41,214,185,0.2)] scale-[1.02] bg-primary/[0.02]"
                      : "border-border"
                  }`}
                >
                  <div className="p-8 flex flex-col justify-between h-full">
                    {plan.popular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(41,214,185,0.5)] flex items-center gap-1.5 z-20">
                        <Sparkles className="w-3.5 h-3.5" /> MOST POPULAR
                      </div>
                    )}

                    <div className="flex-1 flex flex-col">
                      <div className="mb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                          <span className="text-xs font-mono font-bold text-primary tracking-widest uppercase">
                            {plan.name} Tier
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed font-medium min-h-[48px]">
                          {plan.tagline}
                        </p>
                      </div>

                      <div className="mb-8 py-5 border-y border-border/50 flex flex-col gap-1">
                        <span className="text-3xl font-black text-foreground tracking-tight">{priceDisplay}</span>
                        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider text-primary">
                          {periodDisplay}
                        </span>
                      </div>

                      {/* Feature List */}
                      <ul className="space-y-4 mb-8 flex-1">
                        {plan.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-3 text-sm font-medium text-foreground/80 leading-snug group">
                            <div className="flex-shrink-0 mt-0.5">
                              <CheckCircle2 className={`w-5 h-5 transition-colors ${plan.popular ? "text-primary drop-shadow-[0_0_8px_rgba(41,214,185,0.5)]" : "text-primary/70 group-hover:text-primary"}`} />
                            </div>
                            <span className="group-hover:text-foreground transition-colors">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href="#contact-form"
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById("contact-form");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                        else window.location.href = "/#contact";
                      }}
                      className={`group mt-auto inline-flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 active:scale-95 shadow-md ${
                        plan.popular
                          ? "bg-primary text-primary-foreground shadow-[0_0_24px_rgba(41,214,185,0.3)] hover:bg-primary/90 hover:scale-[1.02]"
                          : "bg-muted hover:bg-muted/80 dark:bg-white/5 dark:hover:bg-white/10 border border-border text-foreground hover:border-primary/50 hover:text-primary"
                      }`}
                    >
                      <span>{plan.cta}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </section>

        {/* Value Promises Section */}
        <section className="container-narrow mb-24">
          <div className="p-8 sm:p-12 rounded-3xl glass-strong border border-border relative overflow-hidden">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-xl sm:text-5xl font-bold tracking-tight mb-3">
                Our Guaranteed <span className="text-gradient">Service Commitments</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground font-medium">
                We build long-term relationships through engineering integrity, full compliance, and predictable delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {guaranteeCards.map((g) => {
                const Icon = g.icon;
                return (
                  <div
                    key={g.title}
                    className="p-6 rounded-2xl bg-muted/40 dark:bg-white/5 border border-border flex flex-col gap-3"
                  >
                    <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">{g.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">{g.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Detailed Feature Comparison Table */}
        <section className="container-narrow mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-subtle border border-primary/30 text-sm font-mono text-primary mb-3">
              Deep Dive
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
              Comprehensive <span className="text-gradient">Plan Comparison</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-base font-medium">
              Compare features, DevOps setup, support SLAs, and security standards across all pricing tiers.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-border bg-card/50 backdrop-blur-md shadow-xl">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-border bg-muted/50 dark:bg-white/5">
                  <th className="p-5 text-base font-bold text-foreground w-1/3">Feature Category</th>
                  <th className="p-5 text-base font-bold text-foreground text-center w-1/5">Starter</th>
                  <th className="p-5 text-base font-bold text-primary text-center w-1/5">Business</th>
                  <th className="p-5 text-base font-bold text-foreground text-center w-1/5">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((cat) => (
                  <Fragment key={cat.category}>
                    <tr>
                      <td colSpan={4} className="p-4 bg-muted/30 dark:bg-white/[0.02] border-b border-border font-mono text-sm font-bold text-primary uppercase tracking-widest">
                        {cat.category}
                      </td>
                    </tr>
                    {cat.features.map((feat) => (
                      <tr key={feat.name} className="border-b border-border/60 hover:bg-muted/20 transition-colors">
                        <td className="p-4 text-sm font-semibold text-foreground/90">{feat.name}</td>

                        {/* Starter Column */}
                        <td className="p-4 text-sm text-center font-medium">
                          {typeof feat.starter === "boolean" ? (
                            feat.starter ? (
                              <Check className="w-4 h-4 text-primary mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />
                            )
                          ) : (
                            <span className="text-muted-foreground">{feat.starter}</span>
                          )}
                        </td>

                        {/* Business Column */}
                        <td className="p-4 text-sm text-center font-bold bg-primary/[0.02]">
                          {typeof feat.business === "boolean" ? (
                            feat.business ? (
                              <Check className="w-4 h-4 text-primary mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />
                            )
                          ) : (
                            <span className="text-primary">{feat.business}</span>
                          )}
                        </td>

                        {/* Enterprise Column */}
                        <td className="p-4 text-sm text-center font-medium">
                          {typeof feat.enterprise === "boolean" ? (
                            feat.enterprise ? (
                              <Check className="w-4 h-4 text-primary mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />
                            )
                          ) : (
                            <span className="text-foreground">{feat.enterprise}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pricing FAQ Section */}
        <section className="container-narrow mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-subtle border border-primary/30 text-sm font-mono text-primary mb-3">
              <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
              Pricing <span className="text-gradient">FAQs</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground font-medium">
              Everything you need to know about our billing, milestones, and SLA terms.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {pricingFaqs.map((faq, index) => {
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

        {/* Bottom Consultation CTA Banner */}
        <section id="contact-form" className="container-narrow">
          <div className="relative rounded-3xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/30 p-8 sm:p-14 text-center overflow-hidden shadow-[0_0_40px_rgba(41,214,185,0.15)]">
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-mono font-bold mb-4">
                Need a Custom Proposal?
              </div>

              <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
                Let&apos;s Build Something <span className="text-gradient">Extraordinary</span>
              </h2>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-medium mb-8">
                Schedule a free 30-minute technical consultation with our lead architects to discuss your project scope, architecture, and custom quote.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:contact@devopsbd.com"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(41,214,185,0.3)] hover:bg-primary/90 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <MessageSquareQuote className="w-4 h-4" />
                  Request Free Technical Quote
                </a>

                <Link
                  href="/#contact"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-muted hover:bg-muted/80 dark:bg-white/5 dark:hover:bg-white/10 border border-border text-foreground font-bold text-sm tracking-wider uppercase transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Contact Our Team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AITwinChat />
    </div>
  );
}
