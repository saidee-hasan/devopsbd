"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Globe,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Award,
  ArrowRight,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  Server,
  Layers,
  Cpu,
  Smartphone,
  Code2,
  Lock,
  Compass
} from "lucide-react";
import Card3D from "./Card3D";
import { companyInfo } from "@/data/portfolio";

export default function CompanyProfileCard() {
  const [activeTab, setActiveTab] = useState<"overview" | "capabilities" | "europe_global" | "trust">("overview");

  return (
    <Card3D className="w-full">
      <div className="relative w-full rounded-3xl border border-slate-200/90 p-5 sm:p-7 bg-white shadow-[0_25px_70px_rgba(15,118,110,0.09)] overflow-hidden flex flex-col justify-between select-none">
        
        {/* Background Ambient Glowing Orbs */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-teal-500/10 blur-[90px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none" />

        {/* Abstract Micro Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Top Status Bar: European & Global Operating Standards */}
        <div className="relative z-20 flex items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs sm:text-sm font-mono font-bold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-primary" />
              EUROPE & GLOBAL EXECUTIVE PROFILE
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-xs sm:text-sm font-mono text-primary font-bold shadow-xs">
            <Server className="w-3 h-3 text-primary animate-pulse" />
            <span>99.99% Enterprise SLA</span>
          </div>
        </div>

        {/* Corporate Header Card */}
        <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 backdrop-blur-xl">
          <div className="flex items-center gap-3.5">
            <div className="relative h-12 w-48 flex items-center shrink-0">
              <Image
                src="/devopsbd-logo-v3.png"
                alt="DevOpsBD Technologies Ltd Logo"
                fill
                sizes="192px"
                className="object-contain object-left"
                priority
              />
            </div>
          </div>
          <div className="flex items-center gap-2 text-right">
            <span className="px-2.5 py-1 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> ISO 27001 & SOC 2
            </span>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="relative z-20 flex items-center gap-1 mt-4 p-1 rounded-xl bg-slate-100/90 border border-slate-200/80">
          {[
            { id: "overview", label: "Overview", icon: Building2 },
            { id: "capabilities", label: "Capabilities", icon: Layers },
            { id: "europe_global", label: "EU & Global Reach", icon: Globe },
            { id: "trust", label: "Security & SLA", icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-sm font-mono font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-teal-700/20 scale-[1.02]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="relative z-20 min-h-[220px] my-4 p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 backdrop-blur-xl">
          <AnimatePresence mode="wait">
            
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-3.5 text-sm font-mono"
              >
                <div>
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-primary" />
                    DevOpsBD Technologies Ltd
                  </h4>
                  <p className="text-slate-600 font-sans text-sm leading-relaxed">
                    European-grade software engineering firm serving global enterprises, scale-ups, and startups with high-performance web applications, mobile engineering, cloud infrastructure, and AI solutions.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>HQ: Gulshan-2, Dhaka 1212</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Global Hubs: London, NY, Dubai, BD</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>contact@devopsbd.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>+880 1700-000000</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/80">
                  {["Full-Stack Engineering", "Kubernetes & DevOps", "Cloud Architecture", "Mobile Apps", "UI/UX Systems"].map((pill) => (
                    <span key={pill} className="px-2 py-0.5 rounded bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
                      {pill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CAPABILITIES TAB */}
            {activeTab === "capabilities" && (
              <motion.div
                key="capabilities"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm font-mono"
              >
                {[
                  { title: "Web Applications", desc: "Next.js 16, React 19, Micro-frontends", icon: Code2 },
                  { title: "Mobile Engineering", desc: "iOS & Android (React Native / Flutter)", icon: Smartphone },
                  { title: "Cloud & DevOps", desc: "Kubernetes, AWS, Docker, Terraform", icon: Server },
                  { title: "UI/UX Design Systems", desc: "Figma Tokens & High-Fidelity Prototypes", icon: Layers },
                  { title: "Enterprise Systems", desc: "Custom ERP, CRM, Microservices", icon: Cpu },
                  { title: "SaaS Platforms", desc: "Multi-Tenant Cloud & Stripe Billing", icon: Zap },
                ].map((cap) => {
                  const Icon = cap.icon;
                  return (
                    <div key={cap.title} className="p-2.5 rounded-xl bg-white border border-slate-200/80 hover:border-primary/50 transition-colors shadow-xs">
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-0.5">
                        <Icon className="w-3.5 h-3.5 text-primary" />
                        <span>{cap.title}</span>
                      </div>
                      <p className="text-xs text-slate-500 font-sans">{cap.desc}</p>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* EUROPE & GLOBAL REACH TAB */}
            {activeTab === "europe_global" && (
              <motion.div
                key="europe_global"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-3 text-sm font-mono"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-primary" />
                    European & International Client Reach
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { region: "Europe (EU & UK)", market: "Fintech, SaaS & London Hub" },
                      { region: "USA & Canada", market: "Silicon Valley & East Coast" },
                      { region: "Middle East", market: "UAE, Saudi & Gulf Corporates" },
                      { region: "Bangladesh", market: "Domestic Tech & Banking Leaders" },
                    ].map((m) => (
                      <div key={m.region} className="p-2 rounded-lg bg-white border border-slate-200/80 shadow-xs">
                        <div className="text-primary font-bold text-sm">{m.region}</div>
                        <div className="text-xs text-slate-500 font-sans">{m.market}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-sm">
                  <span className="text-slate-500">Global Coverage:</span>
                  <span className="font-bold text-slate-900">15+ Nations | 24/7 Support</span>
                </div>
              </motion.div>
            )}

            {/* SECURITY & TRUST TAB */}
            {activeTab === "trust" && (
              <motion.div
                key="trust"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-2.5 text-sm font-mono"
              >
                {[
                  { title: "99.99% Server Uptime SLA", desc: "Automated failover and round-the-clock infrastructure scaling." },
                  { title: "GDPR & SOC 2 Compliance", desc: "Strict European data privacy protection and encryption." },
                  { title: "Agile Two-Week Sprints", desc: "Bi-weekly client demos with 100% source code ownership." },
                  { title: "Dedicated Engineering Squad", desc: "Direct communication via Slack/Teams with senior engineers." },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-white border border-slate-200/80 shadow-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{item.title}</div>
                      <div className="text-xs text-slate-500 font-sans">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer Action & Direct Contact */}
        <div className="relative z-20 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm font-mono">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Award className="w-4 h-4 text-primary" />
            <span>European Tech & Engineering Standards</span>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-200 text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-300 active:scale-95"
          >
            <span>Book Free Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </Card3D>
  );
}
