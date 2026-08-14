"use client";
import { useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";

const resetForm = () => ({
  title: "", category: "", summary: "", description: "",
  impact: "Full-stack AI SaaS with scalable architecture and modern UI/UX",
  role: "Full-Stack Developer",
  timeline: "Full product build",
  complexity: "Full-stack development, AI integration, and cloud deployment",
  tech: "", github: "", live: "", imageLinks: "", featured: false,
});

export default function AddProject() {
  const router = useRouter();
  const [form, setForm] = useState(resetForm());
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const API = API_URL;
  const getToken = () => localStorage.getItem("admin_token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();
    if (!token) return;
    setSaving(true);
    const body = {
      ...form,
      tech: form.tech.split("\n").filter(Boolean),
      imageLinks: form.imageLinks.split("\n").map((l: string) => l.trim()).filter(Boolean),
    };
    try {
      const res = await fetch(`${API}/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Failed to save" }));
        toast.error(err.error || "Failed to save");
        return;
      }
      toast.success("Project created!");
      router.push("/admin/projects");
    } catch { toast.error("Network error - is the server running?"); }
    finally { setSaving(false); }
  };

  const addTech = (val: string) => {
    if (!val.trim()) return;
    const existing = form.tech.split("\n").filter(Boolean);
    if (existing.includes(val.trim())) return;
    setForm((prev) => ({ ...prev, tech: prev.tech ? prev.tech + "\n" + val.trim() : val.trim() }));
  };

  const removeTech = (i: number) => {
    const list = form.tech.split("\n").filter(Boolean);
    list.splice(i, 1);
    setForm({ ...form, tech: list.join("\n") });
  };

  return (
    <div className="p-6">
      <Toaster position="top-right" toastOptions={{ style: { background: "#18181b", color: "#e4e4e7", border: "1px solid #27272a", fontSize: "14px" }, success: { iconTheme: { primary: "#10b981", secondary: "#18181b" } }, error: { iconTheme: { primary: "#ef4444", secondary: "#18181b" } } }} />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Add Project</h1>
          <p className="mt-0.5 text-base text-zinc-500">Create a new portfolio project</p>
        </div>
        <button onClick={() => router.push("/admin/projects")} className="rounded-lg border border-zinc-700 px-4 py-2 text-base font-medium text-zinc-400 hover:bg-zinc-800">Back to Projects</button>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="block text-base font-medium text-zinc-400">Title *</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
          </div>
          <div>
            <label className="block text-base font-medium text-zinc-400">Category *</label>
            <input required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" placeholder="e.g. Full-Stack AI SaaS" />
          </div>
          <div>
            <label className="block text-base font-medium text-zinc-400">Timeline</label>
            <input value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="block text-base font-medium text-zinc-400">Summary *</label>
            <textarea required value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} rows={2} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="block text-base font-medium text-zinc-400">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="block text-base font-medium text-zinc-400">Impact</label>
            <textarea value={form.impact} onChange={(e) => setForm({ ...form, impact: e.target.value })} rows={3} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
          </div>
          <div>
            <label className="block text-base font-medium text-zinc-400">Role</label>
            <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
          </div>
          <div>
            <label className="block text-base font-medium text-zinc-400">Complexity</label>
            <input value={form.complexity} onChange={(e) => setForm({ ...form, complexity: e.target.value })} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="block text-base font-medium text-zinc-400">Tech Stack</label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Redux", "Framer Motion", "shadcn/ui", "Node.js", "Express", "REST APIs", "GraphQL", "JWT", "OAuth2", "MongoDB", "PostgreSQL", "Prisma", "Mongoose", "Redis", "Docker", "Nginx", "GitHub Actions", "CI/CD", "Vercel", "Gemini AI", "OpenAI API", "LangChain", "Prompt Engineering"].map((t) => {
                const active = form.tech.split("\n").includes(t);
                return (
                  <button key={t} type="button" onClick={() => {
                    const list = form.tech.split("\n").filter(Boolean);
                    if (active) { list.splice(list.indexOf(t), 1); } else { list.push(t); }
                    setForm({ ...form, tech: list.join("\n") });
                  }}
                    className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${active ? "bg-emerald-600 text-white" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700 hover:text-zinc-300"}`}>
                    {active ? "\u2713 " : "+ "}{t}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="block text-base font-medium text-zinc-400">Images</label>
            <div className="mt-1">
              <input type="file" accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setUploading(true);
                  const token = getToken();
                  if (!token) { setUploading(false); return; }
                  const fd = new FormData();
                  fd.append("image", file);
                  try {
                    const res = await fetch(`${API}/api/upload/cloudinary?folder=projects`, {
                      method: "POST",
                      headers: { Authorization: `Bearer ${token}` },
                      body: fd,
                    });
                    if (!res.ok) { toast.error("Upload failed"); return; }
                    const data = await res.json();
                    if (data.url) {
                      toast.success("Image uploaded!");
                      setForm((prev) => ({ ...prev, imageLinks: prev.imageLinks ? prev.imageLinks + "\n" + data.url : data.url }));
                    }
                  } catch { toast.error("Upload failed"); }
                  setUploading(false);
                  e.target.value = "";
                }}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base file:mr-3 file:rounded file:border-0 file:bg-emerald-600 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-500 disabled:opacity-50" disabled={uploading} />
              {uploading && <p className="mt-1 text-sm text-zinc-500">Uploading...</p>}
            </div>
            {form.imageLinks && (
              <div className="mt-3 flex flex-wrap gap-2">
                {form.imageLinks.split("\n").filter(Boolean).map((url, i) => (
                  <div key={i} className="group relative h-16 w-24 rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
                    <Image src={url} alt="" width={96} height={64} className="object-cover" />
                    <button type="button" onClick={() => {
                      const list = form.imageLinks.split("\n").filter(Boolean);
                      list.splice(i, 1);
                      setForm({ ...form, imageLinks: list.join("\n") });
                    }} className="absolute top-0.5 right-0.5 rounded bg-black/70 px-1 py-0.5 text-xs text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">x</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="block text-base font-medium text-zinc-400">GitHub URL</label>
            <input value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
          </div>
          <div>
            <label className="block text-base font-medium text-zinc-400">Live Demo URL</label>
            <input value={form.live} onChange={(e) => setForm({ ...form, live: e.target.value })} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
          </div>
          <div>
            <label className="flex items-center gap-2 pt-2 text-base font-medium text-zinc-400">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="rounded border-zinc-700 bg-zinc-950" />
              Featured
            </label>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2 text-base font-semibold hover:bg-emerald-500 disabled:opacity-50">
            {saving ? "Saving..." : "Create Project"}
          </button>
          <button type="button" onClick={() => router.push("/admin/projects")} className="rounded-lg bg-zinc-800 px-6 py-2 text-base font-medium hover:bg-zinc-700">Cancel</button>
        </div>
      </form>
    </div>
  );
}
