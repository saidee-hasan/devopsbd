"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { KeyRound, ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { API_URL } from "@/lib/api";

function ResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailParam);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to reset password");
      router.push("/admin/login?reset=success");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl p-8">
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">{error}</div>
      )}

      <div className="mb-5">
        <label className="block text-sm font-mono font-bold text-zinc-400 mb-2">Admin Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="admin@devopsbd.com"
          className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-base focus:outline-none focus:border-[#D4F12A] transition-colors"
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-mono font-bold text-zinc-400 mb-2">6-Digit OTP</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          required
          maxLength={6}
          placeholder="000000"
          className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-base text-center tracking-[0.5em] font-mono font-bold focus:outline-none focus:border-[#D4F12A] transition-colors"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-mono font-bold text-zinc-400 mb-2">New Password</label>
        <div className="relative">
          <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
            placeholder="Min 6 characters"
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-base focus:outline-none focus:border-[#D4F12A] transition-colors"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !email || !otp || !newPassword}
        className="w-full py-3 rounded-xl bg-[#D4F12A] text-slate-950 font-extrabold text-base hover:bg-lime-400 disabled:opacity-40 transition-all flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        {loading ? "Resetting..." : "Reset Password"}
      </button>

      <div className="flex items-center justify-between mt-5 text-sm">
        <Link href="/admin/forgot-password" className="text-zinc-400 hover:text-white font-medium">
          <ArrowLeft className="w-3.5 h-3.5 inline mr-1" /> Resend OTP
        </Link>
        <Link href="/admin/login" className="text-zinc-400 hover:text-white font-medium">
          Back to Login
        </Link>
      </div>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <ShieldCheck className="w-12 h-12 text-[#D4F12A] mx-auto mb-4" />
          <h1 className="text-2xl font-black text-white">Reset Password</h1>
          <p className="text-zinc-400 text-sm mt-2">Enter the 6-digit OTP sent to your email</p>
        </div>

        <Suspense fallback={<div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center text-zinc-400">Loading...</div>}>
          <ResetForm />
        </Suspense>
      </motion.div>
    </div>
  );
}
