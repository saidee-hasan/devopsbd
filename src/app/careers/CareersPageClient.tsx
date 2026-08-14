"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollBackground from "@/components/ScrollBackground";
import AITwinChat from "@/components/AITwinChat";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { companyInfo } from "@/data/portfolio";

const openPositions = [
  {
    title: "Senior Full Stack Engineer (Next.js / Node.js)",
    department: "Engineering",
    location: "Dhaka / Remote",
    type: "Full-Time",
    experience: "5+ Years",
    skills: ["Next.js 15", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    title: "Principal DevOps & Cloud Architect",
    department: "Cloud & Infrastructure",
    location: "Dhaka / Hybrid",
    type: "Full-Time",
    experience: "6+ Years",
    skills: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD"],
  },
  {
    title: "Senior UI/UX Product Designer",
    department: "Design",
    location: "Remote / Hybrid",
    type: "Full-Time",
    experience: "4+ Years",
    skills: ["Figma", "Design Systems", "User Research", "Wireframing"],
  },
  {
    title: "Lead QA & Security Automation Engineer",
    department: "Quality Assurance",
    location: "Dhaka / Remote",
    type: "Full-Time",
    experience: "4+ Years",
    skills: ["Cypress", "Jest", "Security Auditing", "Load Testing"],
  },
];

export default function CareersPageClient() {
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
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Shape The Future of Software</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
              Careers at <br />
              <span className="text-gradient">DevOpsBD Technologies</span>
            </h1>

            <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium mb-10">
              Work with senior software architects, build mission-critical enterprise applications, and master cloud-native technologies.
            </p>
          </motion.div>
        </section>

        {/* Positions Grid */}
        <section className="container-narrow mb-24 max-w-4xl mx-auto">
          <div className="space-y-6">
            {openPositions.map((pos, idx) => (
              <SpotlightCard key={pos.title} delay={idx * 0.08} className="w-full">
                <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-sm font-mono text-primary font-bold">
                        {pos.department}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-mono text-muted-foreground">
                        <MapPin className="w-3 h-3" /> {pos.location}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-mono text-muted-foreground">
                        <Clock className="w-3 h-3" /> {pos.type}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-foreground mb-3">{pos.title}</h2>

                    <div className="flex flex-wrap gap-1.5">
                      {pos.skills.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded text-sm font-mono bg-muted/40 dark:bg-white/5 border border-border text-muted-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={`mailto:${companyInfo.email}?subject=Application for ${encodeURIComponent(pos.title)}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider shadow-md hover:bg-primary/90 transition-all shrink-0"
                  >
                    <Send className="w-4 h-4" />
                    <span>Apply Now</span>
                  </a>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="container-narrow">
          <div className="relative rounded-3xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/30 p-8 sm:p-12 text-center overflow-hidden">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              Don&apos;t See Your <span className="text-gradient">Role Listed?</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base font-medium mb-8 max-w-xl mx-auto">
              We are always looking for exceptional engineering talent. Send your CV to {companyInfo.email}.
            </p>
            <div className="flex justify-center">
              <a
                href={`mailto:${companyInfo.email}?subject=General Engineering Application`}
                className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                <span>Send Open Application</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AITwinChat />
    </div>
  );
}
