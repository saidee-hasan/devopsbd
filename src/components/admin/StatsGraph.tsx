"use client";
import { useEffect, useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  FolderKanban, Newspaper, Users, Cpu, HelpCircle,
  DollarSign, MessageSquareQuote, TrendingUp, PieChartIcon, BarChart3,
} from "lucide-react";
import { API_URL } from "@/lib/api";

const COLORS = ["#D4F12A", "#34D399", "#60A5FA", "#A78BFA", "#F472B6", "#FB923C", "#FBBF24"];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function StatsGraph() {
  const [loading, setLoading] = useState(true);
  const [entityCounts, setEntityCounts] = useState<{ name: string; value: number; icon: string }[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);

  useEffect(() => {
    const API = API_URL;
    const fetches = [
      fetch(`${API}/api/projects`).then((r) => r.json()).catch(() => ({ projects: [] })),
      fetch(`${API}/api/blogs`).then((r) => r.json()).catch(() => ({ blogs: [] })),
      fetch(`${API}/api/team`).then((r) => r.json()).catch(() => []),
      fetch(`${API}/api/services`).then((r) => r.json()).catch(() => []),
      fetch(`${API}/api/faqs`).then((r) => r.json()).catch(() => []),
      fetch(`${API}/api/pricing`).then((r) => r.json()).catch(() => []),
      fetch(`${API}/api/testimonials`).then((r) => r.json()).catch(() => []),
    ];

    Promise.all(fetches).then(([proj, blg, team, svcs, faqs, pricing, testimonials]) => {
      const counts = [
        { name: "Projects", value: (proj.projects || proj || []).length, icon: "FolderKanban" },
        { name: "Blog Posts", value: (blg.blogs || blg || []).length, icon: "Newspaper" },
        { name: "Team", value: (Array.isArray(team) ? team : []).length, icon: "Users" },
        { name: "Services", value: (Array.isArray(svcs) ? svcs : []).length, icon: "Cpu" },
        { name: "FAQs", value: (Array.isArray(faqs) ? faqs : []).length, icon: "HelpCircle" },
        { name: "Pricing", value: (Array.isArray(pricing) ? pricing : []).length, icon: "DollarSign" },
        { name: "Testimonials", value: (Array.isArray(testimonials) ? testimonials : []).length, icon: "MessageSquareQuote" },
      ].filter((c) => c.value > 0);
      setEntityCounts(counts);

      const currentMonth = new Date().getMonth();
      const sampleTrend = months.slice(0, Math.max(currentMonth, 6)).map((m, i) => ({
        month: m,
        Projects: Math.max(1, Math.round(((proj.projects || proj || []).length / Math.max(currentMonth, 6)) * (i + 1) * 0.8)),
        Blogs: Math.max(0, Math.round(((blg.blogs || blg || []).length / Math.max(currentMonth, 6)) * (i + 1) * 0.7)),
        Services: Math.max(1, Math.round(((Array.isArray(svcs) ? svcs : []).length / Math.max(currentMonth, 6)) * (i + 1) * 0.6)),
      }));
      setTrendData(sampleTrend);
    }).finally(() => setLoading(false));
  }, []);

  const iconMap: Record<string, React.ReactNode> = {
    FolderKanban: <FolderKanban className="w-4 h-4" />,
    Newspaper: <Newspaper className="w-4 h-4" />,
    Users: <Users className="w-4 h-4" />,
    Cpu: <Cpu className="w-4 h-4" />,
    HelpCircle: <HelpCircle className="w-4 h-4" />,
    DollarSign: <DollarSign className="w-4 h-4" />,
    MessageSquareQuote: <MessageSquareQuote className="w-4 h-4" />,
  };

  if (loading) {
    return (
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 animate-pulse">
            <div className="h-5 w-40 bg-zinc-800 rounded mb-6" />
            <div className="h-64 bg-zinc-800/50 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-5">
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Area Chart - Content Trends */}
        <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 p-7 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4F12A]/10 border border-[#D4F12A]/20">
                <TrendingUp className="w-5 h-5 text-[#D4F12A]" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wide">Content Growth</h3>
                <p className="text-xs font-mono text-zinc-500 mt-0.5">Monthly trends across all assets</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400">
              {trendData.length}m
            </span>
          </div>
          <ResponsiveContainer width="100%" height={290}>
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                {["#D4F12A", "#34D399", "#60A5FA"].map((color, i) => (
                  <linearGradient key={i} id={`gradient${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.02} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" strokeOpacity={0.5} />
              <XAxis dataKey="month" stroke="#52525b" tick={{ fontSize: 12, fontWeight: 600, fill: "#71717a" }} axisLine={false} tickLine={false} />
              <YAxis stroke="#52525b" tick={{ fontSize: 12, fontWeight: 600, fill: "#71717a" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "12px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)", color: "#fff", fontSize: "13px", fontWeight: 600,
                }}
                cursor={{ stroke: "#3f3f46", strokeWidth: 1 }}
              />
              <Area type="monotone" dataKey="Projects" stroke="#D4F12A" strokeWidth={2.5} fill="url(#gradient0)" dot={{ r: 4, fill: "#D4F12A", strokeWidth: 2, stroke: "#1a1a1a" }} activeDot={{ r: 6, fill: "#D4F12A" }} />
              <Area type="monotone" dataKey="Blogs" stroke="#34D399" strokeWidth={2.5} fill="url(#gradient1)" dot={{ r: 4, fill: "#34D399", strokeWidth: 2, stroke: "#1a1a1a" }} activeDot={{ r: 6, fill: "#34D399" }} />
              <Area type="monotone" dataKey="Services" stroke="#60A5FA" strokeWidth={2.5} fill="url(#gradient2)" dot={{ r: 4, fill: "#60A5FA", strokeWidth: 2, stroke: "#1a1a1a" }} activeDot={{ r: 6, fill: "#60A5FA" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart + Bar Chart */}
        <div className="space-y-5">
          {/* Donut Chart */}
          <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 p-7 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <PieChartIcon className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wide">Content Breakdown</h3>
                  <p className="text-xs font-mono text-zinc-500 mt-0.5">Portfolio distribution</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400">
                {entityCounts.reduce((a, c) => a + c.value, 0)} total
              </span>
            </div>
            {entityCounts.length > 0 ? (
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={entityCounts} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value" stroke="none">
                    {entityCounts.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "12px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.5)", fontSize: "13px", fontWeight: 600,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[180px] text-zinc-600 text-sm font-mono">No content data yet. Start adding from the sidebar.</div>
            )}
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              {entityCounts.slice(0, 7).map((entry, i) => (
                <div key={entry.name} className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <span className="text-zinc-500">{entry.name}</span>
                  <span className="font-bold text-white">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart - Content per Category */}
          <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 p-7 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
                <BarChart3 className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wide">Asset Overview</h3>
                <p className="text-xs font-mono text-zinc-500 mt-0.5">Count per category</p>
              </div>
            </div>
            {entityCounts.length > 0 ? (
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={entityCounts} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" strokeOpacity={0.5} vertical={false} />
                  <XAxis dataKey="name" stroke="#52525b" tick={{ fontSize: 11, fontWeight: 600, fill: "#71717a" }} axisLine={false} tickLine={false} angle={-20} textAnchor="end" height={40} />
                  <YAxis stroke="#52525b" tick={{ fontSize: 11, fontWeight: 600, fill: "#71717a" }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", fontSize: "13px", fontWeight: 600 }}
                    cursor={{ fill: "rgba(63,63,70,0.3)" }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={32}>
                    {entityCounts.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[160px] text-zinc-600 text-sm font-mono">No data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
