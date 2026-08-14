"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Globe, Code2, Palette, Smartphone, Cloud, Cpu, 
  Network, Layers, ShoppingCart, Zap, Terminal, ShieldCheck, ArrowRight 
} from "lucide-react";
import { services as fallbackServices, ServiceItem } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { API_URL } from "@/lib/api";

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6 text-primary" />,
  Code2: <Code2 className="w-6 h-6 text-primary" />,
  Palette: <Palette className="w-6 h-6 text-primary" />,
  Smartphone: <Smartphone className="w-6 h-6 text-primary" />,
  Cloud: <Cloud className="w-6 h-6 text-primary" />,
  Cpu: <Cpu className="w-6 h-6 text-primary" />,
  Network: <Network className="w-6 h-6 text-primary" />,
  Layers: <Layers className="w-6 h-6 text-primary" />,
  ShoppingCart: <ShoppingCart className="w-6 h-6 text-primary" />,
  Zap: <Zap className="w-6 h-6 text-primary" />,
  Terminal: <Terminal className="w-6 h-6 text-primary" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-primary" />,
};

interface ServicesSectionProps {
  limit?: number;
}

interface ApiService {
  _id?: string;
  serviceId?: string;
  id?: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
}

const ServicesSection = ({ limit }: ServicesSectionProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();
  const [services, setServices] = useState<ServiceItem[]>(fallbackServices);

  useEffect(() => {
    fetch(`${API_URL}/api/services`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped: ServiceItem[] = data.map((s: ApiService) => ({
            id: s.serviceId || s._id || s.id || "",
            icon: s.icon,
            title: s.title,
            description: s.description,
            features: s.features || [],
            cta: s.cta,
          }));
          setServices(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const displayedServices = limit ? services.slice(0, limit) : services;

  return (
    <section id="services" className="section-padding relative z-10 bg-[#0B121E] border-t border-white/[0.08]">
      <div className="container-narrow" ref={ref}>
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
          className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4F12A]/10 border border-[#D4F12A]/30 text-sm font-mono text-[#D4F12A] font-bold mb-4 shadow-xs">
            What We Deliver
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            Our Core <span className="text-gradient">Services & Solutions</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-base leading-relaxed font-medium">
            DevOpsBD Technologies delivers end-to-end digital engineering across web, mobile, cloud infrastructure, enterprise software, and automated workflows.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedServices.map((service, i) => (
            <SpotlightCard key={service.id} delay={i * 0.05} className="h-full group bg-[#111A29] border border-slate-800 shadow-2xl">
              <div className="p-6 sm:p-7 flex flex-col h-full justify-between">
                <div>
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 transition-transform duration-300 group-hover:scale-110 shadow-[0_0_15px_rgba(41,214,185,0.15)]">
                      {iconMap[service.icon] || <Code2 className="w-6 h-6 text-primary" />}
                    </div>
                    <span className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase px-2.5 py-1 rounded bg-white/5 border border-white/10">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold tracking-tight mb-2.5 text-white group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-base text-slate-400 leading-relaxed font-normal mb-5">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6 pt-4 border-t border-white/5">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm font-medium text-slate-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#D4F12A] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white/5 hover:bg-[#D4F12A] border border-white/10 hover:border-[#D4F12A] text-sm font-bold text-slate-300 hover:text-slate-950 transition-all duration-300 active:scale-[0.98] group/btn"
                >
                  <span>{service.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {limit && limit < services.length && (
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#D4F12A] hover:bg-lime-400 text-slate-950 font-extrabold text-base shadow-md transition-all duration-300 active:scale-95 uppercase tracking-wider"
            >
              <span>Explore All {services.length} Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
