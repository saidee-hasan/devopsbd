"use client";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { API_URL } from "@/lib/api";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export default function AdminStats() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const API = API_URL;
  const getToken = () => localStorage.getItem("admin_token");

  useEffect(() => {
    fetch(`${API}/api/profile`).then(r => r.json()).then(d => setStats(d.stats || [])).catch(() => toast.error("Failed to load")).finally(() => setLoading(false));
  }, [API]);

  const handleSave = async () => {
    const token = getToken();
    if (!token) return;
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ stats }),
      });
      if (!res.ok) { toast.error("Failed to save"); return; }
      toast.success("Stats updated!");
    } catch { toast.error("Network error"); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="p-6 text-base text-zinc-500">Loading...</div>;

  return (
    <div className="p-6">
      <Toaster position="top-right" toastOptions={{ style: { background: "#18181b", color: "#e4e4e7", border: "1px solid #27272a", fontSize: "14px" }, success: { iconTheme: { primary: "#10b981", secondary: "#18181b" } }, error: { iconTheme: { primary: "#ef4444", secondary: "#18181b" } } }} />
      <div className="mb-6">
        <h1 className="text-xl font-bold">Stats</h1>
        <p className="mt-0.5 text-base text-zinc-500">Edit your portfolio stats</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {stats.map((s, i) => (
          <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">Item {i + 1}</span>
              <button onClick={() => setStats(stats.filter((_, j) => j !== i))} className="rounded bg-red-900/40 px-2 py-0.5 text-xs text-red-400 hover:bg-red-900/60">Remove</button>
            </div>
            <div>
              <label className="block text-xs text-zinc-600 mb-0.5">Value</label>
              <input type="number" value={s.value} onChange={e => { const next = [...stats]; next[i] = { ...next[i], value: Number(e.target.value) }; setStats(next); }} className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
            </div>
            <div>
              <label className="block text-xs text-zinc-600 mb-0.5">Suffix</label>
              <input value={s.suffix} onChange={e => { const next = [...stats]; next[i] = { ...next[i], suffix: e.target.value }; setStats(next); }} className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
            </div>
            <div>
              <label className="block text-xs text-zinc-600 mb-0.5">Label</label>
              <input value={s.label} onChange={e => { const next = [...stats]; next[i] = { ...next[i], label: e.target.value }; setStats(next); }} className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
            </div>
          </div>
        ))}
        <button onClick={() => setStats([...stats, { value: 0, suffix: "+", label: "" }])} className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900/30 p-5 text-base text-zinc-500 hover:border-zinc-500 hover:text-zinc-300 flex items-center justify-center">+ Add Stat</button>
      </div>

      <button onClick={handleSave} disabled={saving} className="mt-6 rounded-lg bg-emerald-600 px-6 py-2.5 text-base font-semibold hover:bg-emerald-500 disabled:opacity-50">
        {saving ? "Saving..." : "Save Stats"}
      </button>
    </div>
  );
}
