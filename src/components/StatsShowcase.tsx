"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AreaChart, Area, ResponsiveContainer, Tooltip as ReTooltip } from "recharts";
import { API_URL } from "@/lib/api";

interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
  sublabel: string;
  inView: boolean;
  delay: number;
}

function Counter({ end, suffix = "", label, sublabel, inView, delay }: CounterProps) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const duration = 1800;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(increment * step, end);
      setCount(Math.floor(current));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, end]);

  if (!inView) return <div className="text-center"><p className="text-5xl font-black text-white/10">0{suffix}</p></div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay }}
      className="text-center"
    >
      <p className="text-4xl sm:text-5xl font-black text-white tabular-nums tracking-tight">
        {count}{suffix}
      </p>
      <p className="text-xs sm:text-sm font-mono font-bold text-[#D4F12A] uppercase tracking-widest mt-2">
        {label}
      </p>
      <p className="text-xs text-zinc-500 mt-1 font-medium">{sublabel}</p>
    </motion.div>
  );
}

const sampleGrowth = [
  { month: "Q1", growth: 30 },
  { month: "Q2", growth: 55 },
  { month: "Q3", growth: 70 },
  { month: "Q4", growth: 95 },
];

export default function StatsShowcase() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [counters, setCounters] = useState([
    { end: 4, suffix: "+", label: "Years", sublabel: "Industry Experience" },
    { end: 15, suffix: "+", label: "Projects", sublabel: "Delivered Worldwide" },
    { end: 80, suffix: "+", label: "Clients", sublabel: "Trust Our Team" },
    { end: 99, suffix: "%", label: "Success Rate", sublabel: "Client Satisfaction" },
  ]);
  const [chartData, setChartData] = useState(sampleGrowth);
  const [totalProjects, setTotalProjects] = useState(15);

  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then((r) => r.json())
      .then((data) => {
        const projects = (data.projects || data || []);
        const count = Array.isArray(projects) ? projects.length : 15;
        setTotalProjects(count);
        if (count > 0) {
          setChartData([
            { month: "Q1", growth: Math.round(count * 0.3) },
            { month: "Q2", growth: Math.round(count * 0.55) },
            { month: "Q3", growth: Math.round(count * 0.7) },
            { month: "Q4", growth: count },
          ]);
          setCounters((prev) => prev.map((c) => c.label === "Projects" ? { ...c, end: count } : c));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative z-10 bg-[#0A111C] border-t border-white/[0.08] overflow-hidden" ref={ref}>
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#D4F12A]/5 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4F12A]/10 border border-[#D4F12A]/30 text-sm font-mono text-[#D4F12A] font-bold mb-4">
            Our Track Record
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Proven <span className="text-[#D4F12A]">Performance</span> Metrics
          </h2>
          <p className="mt-4 text-base text-zinc-400 max-w-2xl mx-auto font-medium">
            Real data from our growing portfolio of clients and projects across the globe.
          </p>
        </motion.div>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {counters.map((c, i) => (
            <Counter key={c.label} end={c.end} suffix={c.suffix} label={c.label} sublabel={c.sublabel} inView={inView} delay={i * 0.1} />
          ))}
        </div>

        {/* Chart + Info Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm overflow-hidden"
        >
          <div className="grid md:grid-cols-5">
            {/* Chart */}
            <div className="md:col-span-3 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-white/[0.08]">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D4F12A]/10 border border-[#D4F12A]/20">
                  <svg className="w-4 h-4 text-[#D4F12A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </span>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wide">Portfolio Growth</h3>
                  <p className="text-xs font-mono text-zinc-500 mt-0.5">Quarterly project delivery trend</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="homeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D4F12A" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#D4F12A" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <ReTooltip
                    contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: "10px", fontSize: "13px", fontWeight: 600, color: "#fff" }}
                  />
                  <Area type="monotone" dataKey="growth" stroke="#D4F12A" strokeWidth={3} fill="url(#homeGradient)" dot={{ r: 5, fill: "#D4F12A", strokeWidth: 2, stroke: "#0A111C" }} activeDot={{ r: 7, fill: "#D4F12A" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Info Panel */}
            <div className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-center">
              <div className="space-y-5">
                {[
                  { icon: "✓", text: "15+ enterprise projects delivered", sub: "Across fintech, health, e-commerce, and SaaS" },
                  { icon: "✓", text: "99% client retention rate", sub: "Repeat business from satisfied partners" },
                  { icon: "✓", text: "24/7 global support coverage", sub: "Multi-timezone engineering teams" },
                  { icon: "✓", text: "ISO-standard development" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                    className="flex gap-3"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D4F12A]/10 border border-[#D4F12A]/20 text-xs text-[#D4F12A] font-bold mt-0.5">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white leading-snug">{item.text}</p>
                      <p className="text-xs text-zinc-500 mt-0.5 font-medium">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
