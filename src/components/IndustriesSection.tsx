"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ShoppingCart,
  HeartPulse,
  GraduationCap,
  Building,
  Truck,
  Landmark,
  Utensils,
  Factory,
  Cloud,
  Shield,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const industries = [
  { name: "FinTech & Banking", desc: "PCI-DSS compliant payment gateways, wallet apps & core banking engines.", icon: Landmark },
  { name: "Healthcare & MedTech", desc: "HIPAA-compliant EHR platforms, telemedicine & AI diagnostics.", icon: HeartPulse },
  { name: "E-Commerce & Retail", desc: "High-concurrency online storefronts, headless commerce & multi-vendor marketplaces.", icon: ShoppingCart },
  { name: "Logistics & Supply Chain", desc: "Real-time fleet tracking, ERP automation & warehouse management.", icon: Truck },
  { name: "EdTech & E-Learning", desc: "Interactive LMS portals, virtual classrooms & automated grading.", icon: GraduationCap },
  { name: "SaaS & Cloud Platforms", desc: "Multi-tenant SaaS architectures, subscription billing & microservices.", icon: Cloud },
  { name: "Real Estate & PropTech", desc: "Property management, 3D virtual tours & broker CRM systems.", icon: Building },
  { name: "Manufacturing & ERP", desc: "IoT device telemetry, inventory control & automated supply pipelines.", icon: Factory },
];

export default function IndustriesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section-padding relative z-10 bg-slate-50/70 border-t border-slate-200/80">
      <div className="container-narrow" ref={ref}>
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
          className="mb-12 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-sm font-mono text-teal-800 font-bold mb-4 shadow-2xs">
            Domain Expertise
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-slate-900">
            Industries We <span className="text-gradient">Serve</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-base leading-relaxed font-medium">
            We deliver tailored digital transformation solutions for high-growth sectors with strict compliance and security standards.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <SpotlightCard key={ind.name} delay={i * 0.04} className="h-full bg-white border-slate-200">
                <div className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-teal-200 bg-teal-50 text-primary mb-4 shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{ind.name}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{ind.desc}</p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1 text-sm font-mono font-bold text-primary">
                    <span>Explore Solutions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
