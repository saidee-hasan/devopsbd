"use client";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { API_URL } from "@/lib/api";

export default function AdminAbout() {
  const [summary, setSummary] = useState("");
  const [highlights, setHighlights] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const API = API_URL;
  const getToken = () => localStorage.getItem("admin_token");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/api/profile`);
        const data = await res.json();
        setSummary(data.aboutSummary || "");
        setHighlights(data.aboutHighlights || []);
      } catch {
        toast.error("Failed to load about data");
      } finally {
        setLoading(false);
      }
    })();
  }, [API]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();
    if (!token) return;
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ aboutSummary: summary, aboutHighlights: highlights }),
      });
      if (!res.ok) { toast.error("Failed to save"); return; }
      toast.success("About updated!");
    } catch { toast.error("Network error"); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="p-6 text-base text-zinc-500">Loading...</div>;

  return (
    <div className="p-6">
      <Toaster position="top-right" toastOptions={{ style: { background: "#18181b", color: "#e4e4e7", border: "1px solid #27272a", fontSize: "14px" }, success: { iconTheme: { primary: "#10b981", secondary: "#18181b" } }, error: { iconTheme: { primary: "#ef4444", secondary: "#18181b" } } }} />
      <div className="mb-6">
        <h1 className="text-xl font-bold">About</h1>
        <p className="mt-0.5 text-base text-zinc-500">Edit your about section</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
        <div>
          <label className="block text-base font-medium text-zinc-400">Summary</label>
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={5}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
        </div>
        <div>
          <label className="block text-base font-medium text-zinc-400">Highlights</label>
          <div className="mt-2 space-y-2">
            {highlights.map((h, i) => (
              <div key={i} className="flex gap-2">
                <input value={h} onChange={(e) => {
                  const next = [...highlights];
                  next[i] = e.target.value;
                  setHighlights(next);
                }} className="flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
                <button type="button" onClick={() => setHighlights(highlights.filter((_, j) => j !== i))}
                  className="rounded-lg bg-red-900/40 px-3 py-2 text-sm text-red-400 hover:bg-red-900/60">x</button>
              </div>
            ))}
            <button type="button" onClick={() => setHighlights([...highlights, ""])}
              className="rounded-lg border border-dashed border-zinc-700 px-4 py-2 text-sm text-zinc-500 hover:border-zinc-500 hover:text-zinc-300">+ Add Highlight</button>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2 text-base font-semibold hover:bg-emerald-500 disabled:opacity-50">
            {saving ? "Saving..." : "Save About"}
          </button>
        </div>
      </form>
    </div>
  );
}
