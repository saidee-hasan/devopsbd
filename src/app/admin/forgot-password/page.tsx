"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { API_URL } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setSent(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-3xl border border-emerald-500/20 bg-white/[0.02] backdrop-blur-3xl p-10 text-center shadow-[0_0_40px_rgba(52,211,153,0.1)]"
        >
          <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-5" />
          <h1 className="text-2xl font-black text-white mb-3">Check Your Email</h1>
          <p className="text-zinc-400 text-base leading-relaxed mb-2">
            We&apos;ve sent a 6-digit OTP to <strong className="text-white">{email}</strong>
          </p>
          <p className="text-sm text-zinc-500 mb-8">OTP valid for 10 minutes</p>
          <Link
            href={`/admin/reset-password?email=${encodeURIComponent(email)}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D4F12A] text-slate-950 font-extrabold text-base hover:bg-lime-400 transition-colors"
          >
            Enter OTP
          </Link>
          <p className="mt-4 text-sm text-zinc-500">
            Did not receive?{" "}
            <button onClick={() => { setSent(false); setEmail(""); }} className="text-[#D4F12A] font-bold hover:underline">
              Try again
            </button>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-[#D4F12A]/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <ShieldCheck className="w-12 h-12 text-[#D4F12A] mx-auto mb-4" />
          <h1 className="text-2xl font-black text-white">Forgot Password</h1>
          <p className="text-zinc-400 text-sm mt-2">Enter your admin email to receive a reset OTP</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl p-8">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-mono font-bold text-zinc-400 mb-2">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@devopsbd.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-base focus:outline-none focus:border-[#D4F12A] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full py-3 rounded-xl bg-[#D4F12A] text-slate-950 font-extrabold text-base hover:bg-lime-400 disabled:opacity-40 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {loading ? "Sending..." : "Send Reset OTP"}
          </button>

          <Link href="/admin/login" className="flex items-center justify-center gap-2 mt-5 text-sm text-zinc-400 hover:text-white transition-colors font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
          </Link>
        </form>
      </motion.div>
    </div>
  );
}
