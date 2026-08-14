"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Cpu, Code, Database, Cloud, GitBranch } from "lucide-react";
import { techStack } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <Code className="w-5 h-5 text-primary" />,
  Backend: <Cpu className="w-5 h-5 text-primary" />,
  Database: <Database className="w-5 h-5 text-primary" />,
  "Cloud & Container": <Cloud className="w-5 h-5 text-primary" />,
  "CI/CD & DevOps": <GitBranch className="w-5 h-5 text-primary" />,
};

const TechnologiesSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="technologies" className="section-padding relative z-10">
      <div className="container-narrow" ref={ref}>
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
          className="mb-14 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-subtle border border-primary/30 text-sm font-mono text-primary mb-4 shadow-[0_0_12px_rgba(41,214,185,0.12)]">
            Technology Stack
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Battle-Tested <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-base leading-relaxed font-medium">
            We use modern, battle-tested tools and frameworks to build scalable frontend UIs, resilient backends, secure databases, and automated cloud pipelines.
          </p>
        </motion.div>

        {/* Stack Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {techStack.map((cat, i) => (
            <SpotlightCard key={cat.category} delay={i * 0.08} className="h-full">
              <div className="p-7 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                      {categoryIcons[cat.category] || <Code className="w-5 h-5 text-primary" />}
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">{cat.category}</h3>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-medium">
                    {cat.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className="group flex flex-col p-2.5 rounded-xl bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary/30 transition-all duration-300 w-[calc(50%-0.25rem)]"
                      >
                        <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                          {item.name}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">
                          {item.tag}
                        </span>
                      </div>
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

export default TechnologiesSection;
