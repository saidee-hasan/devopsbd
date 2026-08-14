"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, FolderKanban, Cpu, Newspaper, Users, MessageSquareQuote, DollarSign, HelpCircle, Info, Briefcase, BarChart3, LogOut, Menu, X, ChevronRight, FileText, Search, UserCheck, ShieldCheck, Activity, Share2, FileCode, User, Image, Home
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Command Overview", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Software Assets", icon: FolderKanban },
  { href: "/admin/services", label: "Service Catalog", icon: Cpu },
  { href: "/admin/team", label: "Engineering Team", icon: Users },
  { href: "/admin/jobs", label: "Career Openings", icon: Briefcase },
  { href: "/admin/applications", label: "Candidate Pipeline", icon: FileText },
    { href: "/admin/user-management", label: "User Management", icon: Users },

  { href: "/admin/users", label: "System Admins", icon: UserCheck },
{ href: "/admin/directors", label: "Engineering Directors", icon: Users },
  { href: "/admin/blogs", label: "Tech Blog & News", icon: Newspaper },
  { href: "/admin/testimonials", label: "Client Feedback", icon: MessageSquareQuote },
  { href: "/admin/pricing", label: "Enterprise Pricing", icon: DollarSign },
  { href: "/admin/faqs", label: "Knowledge Base", icon: HelpCircle },
  { href: "/admin/contact", label: "Social Links", icon: Share2 },
  { href: "/admin/about", label: "About", icon: Info },
  { href: "/admin/experience", label: "Leadership Exp", icon: Briefcase },
  { href: "/admin/stats", label: "Metrics & Data", icon: BarChart3 },
  { href: "/admin/seo", label: "SEO & Hero Content", icon: Search },
  { href: "/admin/resume", label: "Resume", icon: FileCode },
  { href: "/admin/profile", label: "Profile", icon: User },
  { href: "/admin/footer", label: "Footer", icon: Home },
  { href: "/admin/media", label: "Media Library", icon: Image },
  { href: "/admin/executive-leadership", label: "Exec Leadership", icon: ShieldCheck },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
 const [user] = useState<{ name: string; email: string } | null>(() => {
    try {
      const stored = localStorage.getItem("admin_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (pathname === "/admin/login" || pathname === "/admin/forgot-password" || pathname === "/admin/reset-password") return;
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  if (pathname === "/admin/login" || pathname === "/admin/forgot-password" || pathname === "/admin/reset-password") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    router.push("/admin/login");
  };

  return (
    <div className="flex h-screen bg-[#030712] text-slate-300 font-sans selection:bg-[#D4F12A] selection:text-black overflow-hidden relative">
      
      {/* Global Background ambient glow (matching login page) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#D4F12A]/10 blur-[120px] mix-blend-screen"
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, 100, 0], scale: [1, 1.5, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-emerald-500/10 blur-[150px] mix-blend-screen"
        />
        
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.03]" />
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ---------------- SIDEBAR ---------------- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[260px] transform border-r border-white/5 bg-white/[0.02] backdrop-blur-3xl shadow-[10px_0_30px_rgba(0,0,0,0.5)] transition-transform duration-300 lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col relative overflow-hidden">
          {/* Subtle grid pattern in sidebar */}
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />

          {/* Sidebar Header */}
          <div className="flex items-center justify-between border-b border-white/5 px-6 py-5 relative z-10 bg-black/20">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#D4F12A] to-emerald-500 shadow-[0_0_15px_rgba(212,241,42,0.2)]">
                <ShieldCheck className="w-5 h-5 text-black" />
              </div>
              <div>
                <span className="text-base font-black text-white tracking-tight block leading-tight">DevOpsBD</span>
                <span className="text-[9px] font-mono font-bold text-[#D4F12A] uppercase tracking-widest block leading-none mt-0.5">Core v2.0</span>
              </div>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="rounded-lg p-1.5 hover:bg-white/5 lg:hidden text-slate-400">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1.5 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-white/10 relative z-10">
            {navItems.map((item) => {
              const itemPath = item.href.split("?")[0];
              const isActive = pathname === itemPath;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-all duration-300 relative overflow-hidden group ${
                    isActive
                      ? "text-[#D4F12A]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-[#D4F12A]/10 border border-[#D4F12A]/20 rounded-xl" />
                  )}
                  {!isActive && (
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
                  )}
                  
                  <item.icon className={`h-4 w-4 shrink-0 relative z-10 transition-colors ${isActive ? "text-[#D4F12A]" : "text-slate-500 group-hover:text-[#D4F12A]"}`} />
                  <span className="relative z-10">{item.label}</span>
                  {isActive && <ChevronRight className="ml-auto h-3.5 w-3.5 relative z-10 opacity-70" />}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="border-t border-white/5 p-5 relative z-10 bg-[#030712]/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#D4F12A] animate-pulse" />
              <div className="truncate text-xs font-mono font-bold uppercase tracking-wider text-slate-400">{user?.email || "SYSADMIN"}</div>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-3 py-2.5 text-sm font-bold text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              TERMINATE SESSION
            </button>
          </div>
        </div>
      </aside>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <div className="flex flex-1 flex-col min-h-0 relative z-10">
        
        {/* Topbar */}
        <header className="flex items-center justify-between border-b border-white/5 bg-white/[0.01] backdrop-blur-3xl px-4 lg:px-8 py-4 shrink-0 z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-1.5 border border-white/10 hover:bg-white/5 lg:hidden text-slate-300"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#D4F12A]" />
              <h2 className="text-base font-black text-white tracking-wide uppercase">
                {navItems.find((i) => i.href.split("?")[0] === pathname)?.label || "DASHBOARD CORE"}
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4F12A] animate-pulse" />
              <span className="text-xs font-mono text-[#D4F12A] font-bold tracking-widest uppercase">Network Secure</span>
            </div>
          </div>
        </header>

        {/* Page Content area */}
        <main data-lenis-prevent className="flex-1 overflow-y-auto min-h-0 p-4 lg:p-8 scrollbar-thin scrollbar-thumb-white/10">
          {children}
        </main>
      </div>
    </div>
  );
}
