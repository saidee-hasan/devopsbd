"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { careerPositions, CareerPosition } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const CareerSection = () => {
  const [selectedJob, setSelectedJob] = useState<CareerPosition | null>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="career" className="section-padding relative z-10">
      <div className="container-narrow" ref={ref}>
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
          className="mb-14 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-subtle border border-primary/30 text-sm font-mono text-primary mb-4 shadow-[0_0_12px_rgba(41,214,185,0.12)]">
            Careers at DevOpsBD
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Join <span className="text-gradient">DevOpsBD Technologies</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-base leading-relaxed font-medium">
            We are always looking for talented software engineers, designers, cloud architects, and ambitious interns to build modern software for global clients.
          </p>
        </motion.div>

        {/* Jobs Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {careerPositions.map((job, i) => (
            <SpotlightCard key={job.id} delay={i * 0.08} className="h-full group">
              <div className="p-7 sm:p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-sm font-mono font-bold text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                      {job.department}
                    </span>
                    <span className="text-sm font-mono text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-primary" /> {job.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors mb-3">
                    {job.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed font-normal mb-5">
                    {job.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground mb-6">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>{job.location}</span>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-white/10 mb-6">
                    {job.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={`mailto:careers@devopsbd.com?subject=Application for ${encodeURIComponent(job.title)}`}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary/30 text-sm font-bold text-foreground hover:text-primary transition-all duration-300 active:scale-95"
                >
                  <Briefcase className="w-4 h-4" />
                  Apply for this Position
                </a>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerSection;
