"use client";
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { API_URL } from "@/lib/api";

interface Project {
  _id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  tech: string[];
  github: string;
  live: string;
  imageLinks: string[];
  featured: boolean;
  createdAt: string;
}

export default function AdminProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "", category: "", summary: "", description: "",
    impact: "", role: "Full-Stack Developer", timeline: "", complexity: "",
    tech: "", github: "", live: "", imageLinks: "", featured: false,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const API = API_URL;
  const getToken = () => localStorage.getItem("admin_token");

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/projects`);
      const data = await res.json();
      setProjects(data.projects || []);
    } catch { toast.error("Failed to fetch projects"); }
    finally { setLoading(false); }
  }, [API]);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();
    if (!token) return;

    const body = {
      ...form,
      tech: form.tech.split("\n").filter(Boolean),
      imageLinks: form.imageLinks.split("\n").map((l: string) => l.trim()).filter(Boolean),
    };

    try {
      const url = editingId ? `${API}/api/projects/${editingId}` : `${API}/api/projects`;
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Failed to save" }));
        toast.error(err.error || "Failed to save");
        return;
      }
      toast.success(editingId ? "Project updated!" : "Project created!");
      setShowForm(false); setEditingId(null);
      setForm(resetForm());
      fetchProjects();
    } catch { toast.error("Network error - is the server running?"); }
  };

  const handleEdit = async (id: string) => {
    try {
      const token = getToken();
      const res = await fetch(`${API}/api/projects/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      const p = data.project;
      if (!p) return;
      setEditingId(p._id);
      setForm({
        title: p.title, category: p.category, summary: p.summary,
        description: p.description || "", impact: p.impact || "",
        role: p.role || "", timeline: p.timeline || "", complexity: p.complexity || "",
        tech: (p.tech || []).join("\n"), github: p.github || "", live: p.live || "",
        imageLinks: (p.imageLinks || []).join("\n"), featured: p.featured || false,
      });
      setShowForm(true);
    } catch { toast.error("Failed to fetch project"); }
  };

  const resetForm = () => ({
    title: "", category: "", summary: "", description: "",
    impact: "Full-stack AI SaaS with scalable architecture and modern UI/UX",
    role: "Full-Stack Developer",
    timeline: "Full product build",
    complexity: "Full-stack development, AI integration, and cloud deployment",
    tech: "", github: "", live: "", imageLinks: "", featured: false,
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch(`${API}/api/projects/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) { toast.error("Failed to delete"); return; }
      toast.success("Project deleted!");
      fetchProjects();
    } catch { toast.error("Network error - is the server running?"); }
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" /></div>;

  return (
    <div className="p-6">
      <Toaster position="top-right" toastOptions={{ style: { background: "#18181b", color: "#e4e4e7", border: "1px solid #27272a", fontSize: "14px" }, success: { iconTheme: { primary: "#10b981", secondary: "#18181b" } }, error: { iconTheme: { primary: "#ef4444", secondary: "#18181b" } } }} />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Projects</h1>
          <p className="mt-0.5 text-base text-zinc-500">{projects.length} total</p>
        </div>
        <button onClick={() => router.push("/admin/projects/add")}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-base font-semibold hover:bg-emerald-500">+ Add Project</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-base font-medium text-zinc-400">Title *</label>
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
            </div>
            <div>
              <label className="block text-base font-medium text-zinc-400">Category *</label>
              <input required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" placeholder="e.g. Full-Stack AI SaaS" />
            </div>
            <div>
              <label className="block text-base font-medium text-zinc-400">Timeline</label>
              <input value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" placeholder="e.g. Flagship platform build, 3-month sprint" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-base font-medium text-zinc-400">Summary *</label>
              <textarea required value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} rows={2} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" placeholder="An AI-powered platform for building full-stack applications..." />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-base font-medium text-zinc-400">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" placeholder="Built a full-stack AI SaaS platform with React, Node.js, and MongoDB..." />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-base font-medium text-zinc-400">Impact</label>
              <textarea value={form.impact} onChange={(e) => setForm({ ...form, impact: e.target.value })} rows={3} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" placeholder="e.g. Designed for 10K+ concurrent users, reduced latency by 40%" />
            </div>
            <div>
              <label className="block text-base font-medium text-zinc-400">Role</label>
              <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" placeholder="e.g. Full-stack developer" />
            </div>
            <div>
              <label className="block text-base font-medium text-zinc-400">Complexity</label>
              <input value={form.complexity} onChange={(e) => setForm({ ...form, complexity: e.target.value })} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" placeholder="e.g. Full-stack development, AI integration, cloud deployment" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-base font-medium text-zinc-400">Tech Stack</label>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Redux", "Framer Motion", "shadcn/ui", "Node.js", "Express", "REST APIs", "GraphQL", "JWT", "OAuth2", "MongoDB", "PostgreSQL", "Prisma", "Mongoose", "Redis", "Docker", "Nginx", "GitHub Actions", "CI/CD", "Vercel", "Gemini AI", "OpenAI API", "LangChain", "Prompt Engineering"].map((t) => {
                  const active = form.tech.split("\n").includes(t);
                  return (
                    <button key={t} type="button" onClick={() => {
                      const list = form.tech.split("\n").filter(Boolean);
                      if (active) {
                        list.splice(list.indexOf(t), 1);
                      } else {
                        list.push(t);
                      }
                      setForm({ ...form, tech: list.join("\n") });
                    }}
                      className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${active ? "bg-emerald-600 text-white" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700 hover:text-zinc-300"}`}>
                      {active ? "\u2713 " : "+ "}{t}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-base font-medium text-zinc-400">Images</label>
              <div className="mt-1 flex gap-2">
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
                      if (!res.ok) {
                        const err = await res.json().catch(() => ({ error: "Upload failed (" + res.status + ")" }));
                        toast.error(err.error || "Upload failed");
                        return;
                      }
                      const data = await res.json();
                      if (data.url) {
                        toast.success("Image uploaded!");
                        setForm((prev) => ({ ...prev, imageLinks: prev.imageLinks ? prev.imageLinks + "\n" + data.url : data.url }));
                      }
                    } catch {
                      toast.error("Network error - is the server running on port 5000?");
                    }
                    setUploading(false);
                    e.target.value = "";
                  }}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base file:mr-3 file:rounded file:border-0 file:bg-emerald-600 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-500 disabled:opacity-50" disabled={uploading} />
                {uploading && <span className="self-center text-sm text-zinc-500">Uploading...</span>}
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
            <div>
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
            <button type="submit" className="rounded-lg bg-emerald-600 px-6 py-2 text-base font-semibold hover:bg-emerald-500">{editingId ? "Update" : "Create"}</button>
            <button type="button" onClick={() => { setShowForm(false); setForm(resetForm()); }} className="rounded-lg bg-zinc-800 px-6 py-2 text-base font-medium hover:bg-zinc-700">Cancel</button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full text-base">
          <thead className="border-b border-zinc-800 bg-zinc-900">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-zinc-400">Title</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-400">Category</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-400">Tech</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-400">Images</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-400">Featured</th>
              <th className="px-4 py-3 text-right font-medium text-zinc-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {projects.map((p) => (
              <tr key={p._id} className="hover:bg-zinc-900/50">
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-zinc-400">{p.category}</td>
                <td className="px-4 py-3 text-zinc-400">{p.tech.slice(0, 3).join(", ")}{p.tech.length > 3 ? "..." : ""}</td>
                <td className="px-4 py-3 text-zinc-400">{(p.imageLinks || []).length ? `${p.imageLinks.length}` : "—"}</td>
                <td className="px-4 py-3">{p.featured ? "Yes" : "—"}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleEdit(p._id)} className="mr-2 text-emerald-400 hover:text-emerald-300">Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="text-red-400 hover:text-red-300">Delete</button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-zinc-500">No projects yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
