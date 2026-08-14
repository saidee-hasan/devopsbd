"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, Globe, Building2, CheckCircle2 } from "lucide-react";

const clients = [
  { name: "CodeNex AI", region: "Silicon Valley, USA" },
  { name: "OmniPay Fintech", region: "London, UK" },
  { name: "HealthFlow Telehealth", region: "Frankfurt, Germany" },
  { name: "CloudScale SaaS", region: "Dubai, UAE" },
  { name: "EduPulse Global", region: "Toronto, Canada" },
  { name: "LogiTrack Enterprise", region: "Dhaka, Bangladesh" },
];

const certifications = [
  "ISO 27001 Certified",
  "SOC 2 Type II Compliant",
  "AWS Select Tier Partner",
  "Google Cloud Partner",
  "Kubernetes Certified",
];

export default function TrustedBySection() {
  return (
    <section className="py-12 bg-slate-50/80 border-y border-slate-200/80 relative z-10">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left Title */}
          <div className="shrink-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-mono font-bold text-slate-500 uppercase tracking-widest mb-1">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Trusted Globally</span>
            </div>
            <h3 className="text-base sm:text-xl font-extrabold text-slate-900">
              Powering Innovators & Enterprises
            </h3>
          </div>

          {/* Client Logos & Partner Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 w-full">
            {clients.map((client) => (
              <div
                key={client.name}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-primary/40 transition-colors"
              >
                <span className="font-extrabold text-sm text-slate-800 tracking-tight">{client.name}</span>
                <span className="text-xs font-mono text-slate-500">{client.region}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Certifications & Badges */}
        <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm font-mono">
          {certifications.map((cert) => (
            <div key={cert} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 font-bold shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{cert}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
