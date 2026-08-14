"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FolderKanban, FileText, Newspaper, Users, Cpu,
  HelpCircle, DollarSign, MessageSquareQuote, TrendingUp, Zap,
} from "lucide-react";
import StatsGraph from "@/components/admin/StatsGraph";
import { API_URL } from "@/lib/api";

interface StatCard {
  label: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
  bgGradient: string;
  glowColor: string;
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (value <= 0) { setDisplay(0); return; }
    const duration = 1000;
    const step = Math.ceil(value / (duration / 16));
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(current);
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{display}</span>;
}

export default function AdminOverview() {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [loading, setLoading] = useState(true);
  const API = API_URL;

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/projects`).then((r) => r.json()).catch(() => ({ projects: [] })),
      fetch(`${API}/api/blogs`).then((r) => r.json()).catch(() => ({ blogs: [] })),
      fetch(`${API}/api/team`).then((r) => r.json()).catch(() => []),
      fetch(`${API}/api/services`).then((r) => r.json()).catch(() => []),
      fetch(`${API}/api/faqs`).then((r) => r.json()).catch(() => []),
      fetch(`${API}/api/pricing`).then((r) => r.json()).catch(() => []),
      fetch(`${API}/api/testimonials`).then((r) => r.json()).catch(() => []),
      fetch(`${API}/api/resume/active`).then((r) => r.json()).catch(() => ({ resume: null })),
    ])
      .then(([proj, blg, team, svcs, faqs, pricing, testimonials, resume]) => {
        setStats([
          {
            label: "Projects", value: (proj.projects || proj || []).length,
            subtitle: "Software Assets",
            icon: <FolderKanban className="w-5 h-5" />,
            bgGradient: "from-[#D4F12A]/20 to-emerald-500/10",
            glowColor: "shadow-[0_0_20px_rgba(212,241,42,0.15)]",
          },
          {
            label: "Blog Posts", value: (blg.blogs || blg || []).length,
            subtitle: "Tech Content",
            icon: <Newspaper className="w-5 h-5" />,
            bgGradient: "from-purple-500/20 to-pink-500/10",
            glowColor: "shadow-[0_0_20px_rgba(168,85,247,0.15)]",
          },
          {
            label: "Team", value: (Array.isArray(team) ? team : []).length,
            subtitle: "Engineers",
            icon: <Users className="w-5 h-5" />,
            bgGradient: "from-blue-500/20 to-cyan-500/10",
            glowColor: "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
          },
          {
            label: "Services", value: (Array.isArray(svcs) ? svcs : []).length,
            subtitle: "Offerings",
            icon: <Cpu className="w-5 h-5" />,
            bgGradient: "from-amber-500/20 to-orange-500/10",
            glowColor: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
          },
          {
            label: "FAQs", value: (Array.isArray(faqs) ? faqs : []).length,
            subtitle: "Knowledge Base",
            icon: <HelpCircle className="w-5 h-5" />,
            bgGradient: "from-rose-500/20 to-red-500/10",
            glowColor: "shadow-[0_0_20px_rgba(244,63,94,0.15)]",
          },
          {
            label: "Testimonials", value: (Array.isArray(testimonials) ? testimonials : []).length,
            subtitle: "Client Reviews",
            icon: <MessageSquareQuote className="w-5 h-5" />,
            bgGradient: "from-teal-500/20 to-green-500/10",
            glowColor: "shadow-[0_0_20px_rgba(20,184,166,0.15)]",
          },
          {
            label: "Pricing Plans", value: (Array.isArray(pricing) ? pricing : []).length,
            subtitle: "Revenue Tiers",
            icon: <DollarSign className="w-5 h-5" />,
            bgGradient: "from-indigo-500/20 to-violet-500/10",
            glowColor: "shadow-[0_0_20px_rgba(99,102,241,0.15)]",
          },
          {
            label: "Resume", value: resume.resume ? 1 : 0,
            subtitle: resume.resume ? "Active" : "Missing",
            icon: <FileText className="w-5 h-5" />,
            bgGradient: "from-lime-500/20 to-yellow-500/10",
            glowColor: "shadow-[0_0_20px_rgba(132,204,22,0.15)]",
          },
        ]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [API]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D4F12A] border-t-transparent" />
          <span className="text-sm font-mono text-zinc-500 uppercase tracking-wider">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  const totalAssets = stats.reduce((a, s) => a + s.value, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
            <Zap className="w-6 h-6 text-[#D4F12A]" />
            Command Overview
          </h1>
          <p className="mt-1 text-sm font-mono text-zinc-500 tracking-wide">
            {totalAssets} total assets across {stats.filter((s) => s.value > 0).length} categories
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4F12A]/5 border border-[#D4F12A]/20">
          <div className="w-2 h-2 rounded-full bg-[#D4F12A] animate-pulse" />
          <span className="text-xs font-mono text-[#D4F12A] font-bold uppercase tracking-widest">Live</span>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={`rounded-2xl border border-zinc-800 bg-gradient-to-br ${s.bgGradient} p-5 backdrop-blur-sm ${s.glowColor} hover:border-zinc-700 transition-all duration-300 group cursor-default`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900/80 border border-zinc-700 group-hover:border-zinc-600 transition-colors`}>
                {s.icon}
              </div>
              <div className="flex items-center gap-1 text-xs font-mono text-zinc-600">
                <TrendingUp className="w-3 h-3" />
              </div>
            </div>
            <p className="text-3xl font-black text-white tabular-nums tracking-tight">
              <AnimatedNumber value={s.value} />
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              <p className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">{s.label}</p>
              <span className="text-xs font-mono text-zinc-600">·</span>
              <p className="text-xs font-mono text-zinc-600">{s.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Graph Section */}
      <StatsGraph />

      {/* Quick Actions */}
      <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 p-7 backdrop-blur-sm">
        <h2 className="text-sm font-black text-white uppercase tracking-wide mb-4 flex items-center gap-2">
          <span className="w-1 h-4 bg-[#D4F12A] rounded-full" />
          Quick Actions
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/admin/projects", label: "New Project", icon: "🚀" },
            { href: "/admin/blogs", label: "Write Blog", icon: "✍️" },
            { href: "/admin/services", label: "Add Service", icon: "⚙️" },
            { href: "/admin/team", label: "Add Team Member", icon: "👤" },
            { href: "/admin/testimonials", label: "Add Testimonial", icon: "⭐" },
            { href: "/admin/faqs", label: "Add FAQ", icon: "❓" },
            { href: "/admin/pricing", label: "Add Pricing", icon: "💰" },
            { href: "/admin/seo", label: "Edit SEO", icon: "🔍" },
          ].map((action) => (
            <a
              key={action.href}
              href={action.href}
              className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3.5 text-sm font-bold text-zinc-300 hover:bg-zinc-800/80 hover:border-zinc-600 hover:text-white transition-all duration-300 group"
            >
              <span className="text-lg group-hover:scale-110 transition-transform">{action.icon}</span>
              <span>{action.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
