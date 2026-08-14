"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Search, Compass, Layout, Code2, ShieldAlert, Rocket, Headphones } from "lucide-react";
import { workProcess } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const stepIcons: Record<string, React.ReactNode> = {
  "01": <Search className="w-5 h-5 text-primary" />,
  "02": <Compass className="w-5 h-5 text-primary" />,
  "03": <Layout className="w-5 h-5 text-primary" />,
  "04": <Code2 className="w-5 h-5 text-primary" />,
  "05": <ShieldAlert className="w-5 h-5 text-primary" />,
  "06": <Rocket className="w-5 h-5 text-primary" />,
  "07": <Headphones className="w-5 h-5 text-primary" />,
};

const ProcessSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="process" className="section-padding relative z-10">
      <div className="container-narrow" ref={ref}>
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
          className="mb-14 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-subtle border border-primary/30 text-sm font-mono text-primary mb-4 shadow-[0_0_12px_rgba(41,214,185,0.12)]">
            How We Work
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Our Software Development <span className="text-gradient">Process</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-base leading-relaxed font-medium">
            From initial business discovery to 24/7 post-launch cloud support, we follow a transparent 7-step engineering framework.
          </p>
        </motion.div>

        {/* Process Timeline Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {workProcess.map((proc, i) => (
            <SpotlightCard key={proc.step} delay={i * 0.07} className="h-full group">
              <div className="p-6 sm:p-7 flex flex-col justify-between h-full relative">
                {/* Step Badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 shadow-[0_0_15px_rgba(41,214,185,0.15)] group-hover:scale-110 transition-transform">
                    {stepIcons[proc.step]}
                  </span>
                  <span className="text-xl font-mono font-black text-primary/60 group-hover:text-primary transition-colors">
                    {proc.step}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold tracking-tight mb-2 text-foreground group-hover:text-primary transition-colors">
                    {proc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-normal mb-5">
                    {proc.description}
                  </p>
                </div>

                {/* Deliverables */}
                <div className="pt-4 border-t border-white/5 mt-auto">
                  <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Key Deliverables:</p>
                  <ul className="space-y-1">
                    {proc.deliverables.map((del) => (
                      <li key={del} className="text-sm font-medium text-foreground/80 flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-primary" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
