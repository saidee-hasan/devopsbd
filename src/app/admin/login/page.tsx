"use client";
import { API_URL } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Loader2, Fingerprint, Terminal, Server, Shield, Cpu, Activity } from "lucide-react";
import Link from "next/link";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const resetMsg = typeof window !== "undefined" && window.location.search.includes("reset=success")
    ? "Password reset successfully! You can now login with your new password."
    : "";

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Access Denied");
        return;
      }

      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_user", JSON.stringify(data.user));
      router.push("/admin");
    } catch {
      setError("Server unreachable. Please check connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#030712] selection:bg-[#D4F12A]/30 selection:text-[#D4F12A] font-sans overflow-hidden relative">
      
      {/* ---------------- GLOBAL DYNAMIC BACKGROUND ---------------- */}
      {/* This background now spans the entire screen, covering both the left and right sides perfectly */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0], scale: [1, 1.2, 0.8, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[70%] rounded-full bg-[#D4F12A]/10 blur-[150px] mix-blend-screen"
        />
        <motion.div 
          animate={{ x: [0, -80, 80, 0], y: [0, 80, -80, 0], scale: [1, 1.5, 0.9, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-[60%] h-[80%] rounded-full bg-emerald-600/10 blur-[150px] mix-blend-screen"
        />
        <motion.div 
          animate={{ x: [0, 30, -30, 0], y: [0, 30, -30, 0], scale: [1, 1.3, 0.9, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[50%] rounded-full bg-cyan-600/10 blur-[150px] mix-blend-screen"
        />
        
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>


      {/* ---------------- LEFT SIDE: Branding & Graphics ---------------- */}
      <div className="hidden lg:flex relative z-10 w-1/2 flex-col justify-between p-12 border-r border-white/5">
        
        {/* Top: Logo & Link */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D4F12A] to-emerald-500 shadow-[0_0_20px_rgba(212,241,42,0.2)]">
              <ShieldCheck className="w-6 h-6 text-black" />
            </div>
            <div>
              <span className="text-xl font-black text-white tracking-tight block leading-tight">DevOpsBD</span>
              <span className="text-xs font-mono font-bold text-[#D4F12A] uppercase tracking-widest block leading-none mt-1">Enterprise Core</span>
            </div>
          </div>
          
          <Link 
            href="/" 
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md text-sm font-medium text-slate-400 hover:text-white hover:bg-white/[0.08] hover:border-white/10 transition-all duration-300"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Site</span>
          </Link>
        </div>

        {/* Middle: Big Title & Features */}
        <div className="max-w-lg mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-5xl font-black text-white leading-[1.1] tracking-tight mb-6">
              Command <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4F12A] to-emerald-500">
                Center Access
              </span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-12">
              Secure authentication gateway for the DevOpsBD Core network. Access infrastructure controls, manage software assets, and monitor active deployments.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Server, title: "Infrastructure", desc: "Cloud resource management" },
                { icon: Shield, title: "Security Protocols", desc: "End-to-end encryption" },
                { icon: Cpu, title: "Asset Control", desc: "Software & Service catalog" },
                { icon: Activity, title: "System Metrics", desc: "Real-time network data" },
              ].map((item, idx) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (idx * 0.1) }}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm"
                >
                  <item.icon className="w-6 h-6 text-[#D4F12A] mb-3" />
                  <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom: Status */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
              <span className="text-xs font-mono font-bold text-emerald-400 tracking-widest uppercase">
                All Systems Operational
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- RIGHT SIDE: Login Form ---------------- */}
      <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        
        {/* Mobile-only Return Link */}
        <Link 
          href="/" 
          className="lg:hidden absolute top-6 left-6 z-20 group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md text-sm font-medium text-slate-400"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          <span>Home</span>
        </Link>

        {/* Main Login Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[420px]"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
            
            {/* Top Edge Highlight */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4F12A]/50 to-transparent" />

            {/* Glowing Corner */}
            <motion.div 
              animate={{ opacity: isHovering ? 0.3 : 0.05 }}
              className="absolute -top-24 -right-24 w-48 h-48 bg-[#D4F12A] rounded-full blur-[80px] pointer-events-none transition-opacity duration-700" 
            />

            <div className="p-8 sm:p-10 relative z-10">
              
              {/* Header */}
              <div className="mb-10 text-center lg:hidden">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4F12A] to-emerald-600 p-[1px] mb-6">
                  <div className="w-full h-full bg-white/10 rounded-2xl flex items-center justify-center">
                    <Fingerprint className="w-8 h-8 text-[#D4F12A]" />
                  </div>
                </div>
                <h1 className="text-2xl font-black tracking-tight text-white mb-2">
                  Authorization
                </h1>
                <p className="text-sm font-mono text-slate-400 uppercase tracking-widest">
                  DevOpsBD Core
                </p>
              </div>

              <div className="hidden lg:block mb-10">
                <h2 className="text-3xl font-black tracking-tight text-white mb-2">
                  Sign In
                </h2>
                <p className="text-base text-slate-400">
                  Enter your credentials to access the terminal.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="space-y-1.5 group">
                  <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest ml-1 group-focus-within:text-[#D4F12A] transition-colors">
                    System Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-4 h-4 text-slate-500 group-focus-within:text-[#D4F12A] transition-colors" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-xl border border-white/5 bg-white/5 pl-11 pr-4 py-3.5 text-base text-white placeholder:text-slate-600 focus:border-[#D4F12A]/50 focus:bg-white/10 focus:ring-0 transition-all outline-none backdrop-blur-md"
                      placeholder="admin@devopsbd.com"
                    />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#D4F12A] group-focus-within:w-full transition-all duration-300 rounded-b-xl opacity-0 group-focus-within:opacity-100" />
                  </div>
                </div>

                <div className="space-y-1.5 group">
                  <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest ml-1 group-focus-within:text-[#D4F12A] transition-colors">
                    Security Token
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-4 h-4 text-slate-500 group-focus-within:text-[#D4F12A] transition-colors" />
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-xl border border-white/5 bg-white/5 pl-11 pr-4 py-3.5 text-base text-white placeholder:text-slate-600 focus:border-[#D4F12A]/50 focus:bg-white/10 focus:ring-0 transition-all outline-none backdrop-blur-md"
                      placeholder="••••••••••••"
                    />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#D4F12A] group-focus-within:w-full transition-all duration-300 rounded-b-xl opacity-0 group-focus-within:opacity-100" />
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, scale: 0.95 }}
                      animate={{ opacity: 1, height: "auto", scale: 1 }}
                      exit={{ opacity: 0, height: 0, scale: 0.95 }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 mt-2 backdrop-blur-sm">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium leading-tight">{error}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full rounded-xl bg-[#D4F12A] p-[1px] mt-4 group/btn overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98] transition-transform"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out" />
                  
                  <div className="relative flex items-center justify-center gap-2 bg-[#D4F12A] rounded-xl px-4 py-4 hover:bg-[#c6e326] transition-colors">
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-black" />
                        <span className="text-base font-black text-black">Authenticating...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-base font-black text-black">Initialize Session</span>
                        <ArrowRight className="w-4 h-4 text-black group-hover/btn:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </button>
              </form>

              {resetMsg && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium text-center">
                  {resetMsg}
                </div>
              )}

              <div className="mt-5 text-center">
                <Link
                  href="/admin/forgot-password"
                  className="text-sm text-zinc-500 hover:text-[#D4F12A] transition-colors font-medium"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
