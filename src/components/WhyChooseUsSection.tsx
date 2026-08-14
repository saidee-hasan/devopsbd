"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Users, Cpu, Layers, Zap, Clock, DollarSign, 
  CheckCircle2, TrendingUp, ShieldAlert, Activity 
} from "lucide-react";
import { whyChooseUs, WhyChooseUsItem } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="w-5 h-5 text-primary" />,
  Cpu: <Cpu className="w-5 h-5 text-primary" />,
  Layers: <Layers className="w-5 h-5 text-primary" />,
  Zap: <Zap className="w-5 h-5 text-primary" />,
  Clock: <Clock className="w-5 h-5 text-primary" />,
  DollarSign: <DollarSign className="w-5 h-5 text-primary" />,
  CheckCircle2: <CheckCircle2 className="w-5 h-5 text-primary" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-primary" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-primary" />,
  Activity: <Activity className="w-5 h-5 text-primary" />,
};

const WhyChooseUsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="why-us" className="section-padding relative z-10">
      <div className="container-narrow" ref={ref}>
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
          className="mb-14 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-subtle border border-primary/30 text-sm font-mono text-primary mb-4 shadow-[0_0_12px_rgba(41,214,185,0.12)]">
            Company Pillars
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Why Choose <span className="text-gradient">DevOpsBD Technologies</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-base leading-relaxed font-medium">
            We combine Silicon Valley engineering rigor with transparent global delivery to craft software that scales seamlessly.
          </p>
        </motion.div>

        {/* 10 Cards Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {whyChooseUs.map((item, i) => (
            <SpotlightCard key={item.id} delay={i * 0.05} className="h-full group">
              <div className="p-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 mb-4 group-hover:scale-110 transition-transform">
                    {iconMap[item.icon]}
                  </div>

                  <h3 className="text-base font-bold tracking-tight mb-2 text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
