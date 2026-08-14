"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Activity, Cpu, Server, CheckCircle2, Zap } from "lucide-react";

export default function EnterpriseDashboardShowcase() {
  return (
    <section className="py-12 bg-white relative z-10 overflow-hidden">
      <div className="container-narrow">
        
        {/* Card Wrapper with Subtle Border & Shadow */}
        <div className="relative rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50/80 to-white p-4 sm:p-8 shadow-[0_20px_50px_rgba(15,118,110,0.08)]">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-sm font-mono text-teal-800 font-bold mb-2">
                <Activity className="w-3.5 h-3.5 text-primary animate-pulse" />
                <span>DevOpsBD Cloud & Microservices Control Center</span>
              </div>
              <h3 className="text-xl sm:text-xl font-black text-slate-900 tracking-tight">
                Enterprise Platform Architecture Preview
              </h3>
            </div>

            <div className="flex items-center gap-3 text-sm font-mono">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Live 99.99% Cluster SLA
              </span>
            </div>
          </div>

          {/* Big High-Res Image Preview */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xl group">
            <Image
              src="/images/enterprise-hero-dashboard.png"
              alt="DevOpsBD Enterprise Cloud Infrastructure Dashboard"
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              priority
            />
            
            {/* Floating Visual Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200 text-sm font-mono text-slate-900 font-bold shadow-md backdrop-blur-md">
              <Server className="w-4 h-4 text-primary" />
              <span>Kubernetes Production Cluster</span>
            </div>

            <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-sm font-mono text-white font-bold shadow-lg backdrop-blur-md">
              <Zap className="w-4 h-4 text-teal-400 animate-pulse" />
              <span>4.2ms Global API Latency</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
