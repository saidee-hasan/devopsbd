"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, CheckCircle2 } from "lucide-react";
import { teamMembers as fallbackMembers, teamDepartments, TeamMember } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { API_URL } from "@/lib/api";

const TeamSection = () => {
  const [activeDept, setActiveDept] = useState("All");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();
  const [teamMembers, setTeamMembers] = useState(fallbackMembers);

  useEffect(() => {
    fetch(`${API_URL}/api/team`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setTeamMembers(data);
      })
      .catch(() => {});
  }, []);

  const allDepartments = Array.from(new Set(teamMembers.map((t: any) => t.department).filter(Boolean))) as string[];

  const filtered = activeDept === "All" ? teamMembers : teamMembers.filter((t) => t.department === activeDept);

  return (
    <section id="team" className="section-padding relative z-10">
      <div className="container-narrow" ref={ref}>
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
          className="mb-12 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-subtle border border-primary/30 text-sm font-mono text-primary mb-4 shadow-[0_0_12px_rgba(41,214,185,0.12)]">
            World-Class Talent
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Our Engineering & <span className="text-gradient">Leadership Team</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-base leading-relaxed font-medium">
            Meet the senior software engineers, cloud architects, UI/UX designers, and project leads driving innovation at DevOpsBD Technologies.
          </p>

          {/* Department Filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {["All", ...(allDepartments.length > 0 ? allDepartments : teamDepartments.filter(d => d !== "All"))].map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setActiveDept(dept)}
                aria-pressed={activeDept === dept}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 active:scale-95 border ${
                  activeDept === dept
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_14px_rgba(41,214,185,0.2)] font-bold"
                    : "glass-subtle text-muted-foreground border-white/5 hover:text-foreground hover:bg-white/10 hover:border-white/10"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Team Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filtered.map((member, i) => (
            <SpotlightCard key={member.name} delay={i * 0.06} className="h-full group">
              <div className="p-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary font-bold text-base shadow-[0_0_15px_rgba(41,214,185,0.15)]">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider block">
                        {member.department}
                      </span>
                      <h3 className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight">
                        {member.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm font-medium text-muted-foreground mb-4">
                    {member.role}
                  </p>

                  <div className="flex items-center gap-1.5 text-sm font-mono text-foreground/80 mb-4 px-2.5 py-1 rounded bg-white/5 border border-white/10 w-fit">
                    <Award className="w-3.5 h-3.5 text-primary" />
                    <span>{member.experience} Production Experience</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                    {member.skills.map((skill) => (
                      <span key={skill} className="px-2 py-0.5 rounded text-xs font-mono bg-white/5 text-muted-foreground border border-white/5">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
