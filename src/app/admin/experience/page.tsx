"use client";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { API_URL } from "@/lib/api";

interface Experience {
  _id: string;
  company: string;
  role: string;
  period: string;
  type: "work" | "education";
  summary: string;
  bullets: string[];
  order: number;
}

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ company: "", role: "", period: "", type: "work" as "work" | "education", summary: "", bullets: [""] });
  const [saving, setSaving] = useState(false);
  const API = API_URL;
  const getToken = () => localStorage.getItem("admin_token");

  useEffect(() => {
    fetch(`${API}/api/experience`).then(r => r.json()).then(d => {
      const list = d.experiences || [];
      setExperiences(list);
      if (list.length > 0 && !editing) {
        setEditing(list[0]._id);
        setForm({ company: list[0].company, role: list[0].role, period: list[0].period, type: list[0].type, summary: list[0].summary, bullets: [...list[0].bullets] });
      }
    }).catch(() => toast.error("Failed to load")).finally(() => setLoading(false));
  }, [API, editing]);

  const handleEdit = (e: Experience) => {
    setEditing(e._id);
    setForm({ company: e.company, role: e.role, period: e.period, type: e.type, summary: e.summary, bullets: e.bullets.length > 0 ? [...e.bullets] : [""] });
  };

  const handleSave = async () => {
    const token = getToken();
    if (!token || !form.company || !form.role || !form.period) { toast.error("Company, Role, Period required"); return; }
    setSaving(true);
    const body = { ...form, bullets: form.bullets.filter(Boolean) };
    try {
      if (!editing) return;
      await fetch(`${API}/api/experience/${editing}`, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(body) });
      const res = await fetch(`${API}/api/experience`);
      const d = await res.json();
      setExperiences(d.experiences || []);
      toast.success("Updated!");
    } catch { toast.error("Network error"); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="p-6 text-base text-zinc-500">Loading...</div>;

  return (
    <div className="p-6">
      <Toaster position="top-right" toastOptions={{ style: { background: "#18181b", color: "#e4e4e7", border: "1px solid #27272a", fontSize: "14px" }, success: { iconTheme: { primary: "#10b981", secondary: "#18181b" } }, error: { iconTheme: { primary: "#ef4444", secondary: "#18181b" } } }} />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Experience</h1>
          <p className="mt-0.5 text-base text-zinc-500">Edit experience entries</p>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
          <h2 className="text-base font-semibold text-zinc-300">Edit Experience</h2>
          <div>
            <label className="block text-sm text-zinc-500 mb-1">Company *</label>
            <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
          </div>
          <div>
            <label className="block text-sm text-zinc-500 mb-1">Role *</label>
            <input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-zinc-500 mb-1">Period *</label>
              <input value={form.period} onChange={e => setForm({ ...form, period: e.target.value })} className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" placeholder="2024 - Present" />
            </div>
            <div>
              <label className="block text-sm text-zinc-500 mb-1">Type</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as "work" | "education" })} className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base">
                <option value="work">Work</option>
                <option value="education">Education</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-500 mb-1">Summary</label>
            <textarea value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })} rows={2} className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
          </div>
          <div>
            <label className="block text-sm text-zinc-500 mb-1">Bullets</label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {form.bullets.map((b, i) => (
                <div key={i} className="flex gap-1.5">
                  <input value={b} onChange={e => { const next = [...form.bullets]; next[i] = e.target.value; setForm({ ...form, bullets: next }); }} className="flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
                  <button type="button" onClick={() => setForm({ ...form, bullets: form.bullets.filter((_, j) => j !== i) })} className="rounded-lg bg-red-900/40 px-2.5 text-sm text-red-400 hover:bg-red-900/60">x</button>
                </div>
              ))}
              <button type="button" onClick={() => setForm({ ...form, bullets: [...form.bullets, ""] })} className="rounded-lg border border-dashed border-zinc-700 px-4 py-2 text-sm text-zinc-500 hover:border-zinc-500 hover:text-zinc-300">+ Bullet</button>
            </div>
          </div>

          <button onClick={handleSave} disabled={saving} className="rounded-lg bg-emerald-600 px-6 py-2.5 text-base font-semibold hover:bg-emerald-500 disabled:opacity-50">
            {saving ? "Saving..." : "Update"}
          </button>
        </div>

        <h2 className="mt-8 text-base font-semibold text-zinc-400">All Entries</h2>
        <div className="space-y-3">
          {experiences.map(e => (
            <div key={e._id} onClick={() => handleEdit(e)} className={`rounded-xl border p-4 cursor-pointer transition-all hover:border-zinc-600 ${editing === e._id ? "border-emerald-700 bg-emerald-900/15" : "border-zinc-800 bg-zinc-900/50"}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${e.type === "work" ? "bg-blue-900/40 text-blue-400" : "bg-purple-900/40 text-purple-400"}`}>{e.type}</span>
                    <span className="text-sm text-zinc-500">{e.period}</span>
                  </div>
                  <h3 className="mt-1 text-base font-semibold text-zinc-200">{e.role}</h3>
                  <p className="text-sm text-zinc-400">{e.company}</p>
                </div>
              </div>
            </div>
          ))}
          {experiences.length === 0 && <p className="text-base text-zinc-500">No experiences yet.</p>}
        </div>
    </div>
  );
}
