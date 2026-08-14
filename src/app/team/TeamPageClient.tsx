"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Users, Award, Code2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollBackground from "@/components/ScrollBackground";
import AITwinChat from "@/components/AITwinChat";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { teamMembers, teamDepartments } from "@/data/portfolio";

export default function TeamPageClient() {
  const [selectedDept, setSelectedDept] = useState("All");

  const filteredTeam =
    selectedDept === "All" ? teamMembers : teamMembers.filter((m) => m.department === selectedDept);

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
              <span>World-Class Engineers</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
              Our Engineering <br />
              <span className="text-gradient">Leadership & Team</span>
            </h1>

            <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium mb-10">
              Meet our team of senior software engineers, certified cloud leads, UI/UX designers, and project managers averaging 6+ years of production experience.
            </p>

            {/* Department Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {teamDepartments.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 active:scale-95 border ${
                    selectedDept === dept
                      ? "bg-primary text-primary-foreground border-primary shadow-md font-bold"
                      : "bg-muted/40 dark:bg-white/5 text-muted-foreground border-border hover:text-foreground"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Team Grid */}
        <section className="container-narrow mb-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredTeam.map((member, idx) => (
              <SpotlightCard key={member.name} delay={idx * 0.05} className="h-full">
                <div className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/30 text-xl font-black font-mono text-primary mb-5">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </div>

                    <h2 className="text-base font-bold text-foreground mb-1">{member.name}</h2>
                    <p className="text-sm text-primary font-mono font-semibold mb-3">{member.role}</p>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-muted/40 dark:bg-white/5 border border-border text-xs font-mono text-muted-foreground mb-4">
                      {member.experience}
                    </span>

                    <div className="pt-3 border-t border-border flex flex-wrap gap-1">
                      {member.skills.map((skill) => (
                        <span key={skill} className="px-2 py-0.5 rounded text-xs font-mono bg-primary/10 text-primary">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="container-narrow">
          <div className="relative rounded-3xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/30 p-8 sm:p-12 text-center overflow-hidden">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              Want to Join Our <span className="text-gradient">Engineering Team?</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base font-medium mb-8 max-w-xl mx-auto">
              Explore open career positions at DevOpsBD Technologies.
            </p>
            <div className="flex justify-center">
              <Link
                href="/careers"
                className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                <span>View Open Careers</span>
                <ArrowRight className="w-4 h-4" />
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
