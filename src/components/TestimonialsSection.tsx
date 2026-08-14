"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote, MapPin } from "lucide-react";
import { testimonials as fallbackTestimonials } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { API_URL } from "@/lib/api";

const TestimonialsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);

  useEffect(() => {
    fetch(`${API_URL}/api/testimonials`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setTestimonials(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="testimonials" className="section-padding relative z-10">
      <div className="container-narrow" ref={ref}>
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
          className="mb-14 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-subtle border border-primary/30 text-sm font-mono text-primary mb-4 shadow-[0_0_12px_rgba(41,214,185,0.12)]">
            Client Success Stories
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            What Global Leaders Say <span className="text-gradient">About Us</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-base leading-relaxed font-medium">
            Hear directly from technology leaders, startup founders, and enterprise executives who trust DevOpsBD Technologies.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((item, i) => (
            <SpotlightCard key={item.id} delay={i * 0.1} className="h-full">
              <div className="p-7 sm:p-8 flex flex-col justify-between h-full relative">
                <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10 pointer-events-none" />

                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-5">
                    {[...Array(item.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-base text-foreground/90 leading-relaxed font-medium mb-6 italic" style={{ textWrap: "pretty" }}>
                    &ldquo;{item.content}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-white/10 mt-auto">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary font-bold text-base shadow-[0_0_15px_rgba(41,214,185,0.15)]">
                    {item.avatar}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">{item.clientName}</h3>
                    <p className="text-sm text-muted-foreground font-medium">{item.clientRole} — <span className="text-primary">{item.company}</span></p>
                    <p className="text-xs font-mono text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-primary/70" /> {item.location}
                    </p>
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

export default TestimonialsSection;
