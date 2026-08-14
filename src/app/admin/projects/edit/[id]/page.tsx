"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import { CheckCircle2, ChevronRight, ChevronLeft, Save } from "lucide-react";
import { API_URL } from "@/lib/api";

const resetForm = () => ({
  title: "", category: "", summary: "", description: "",
  impact: "",
  role: "", client: "",
  timeline: "",
  complexity: "",
  tech: "", github: "", live: "", imageLinks: "", featured: false,
});

export default function EditProject() {
  const router = useRouter();
  const params = useParams();
  const [form, setForm] = useState(resetForm());
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const API = API_URL;
  const getToken = () => localStorage.getItem("admin_token");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`${API}/api/projects/${params.id}`);
        const data = await res.json();
        if (res.ok && data && data.project) {
          const p = data.project;
          setForm({
            title: p.title || "",
            category: p.category || "",
            summary: p.summary || "",
            description: p.description || "",
            impact: p.impact || "",
            role: p.role || "",
            client: p.client || "",
            timeline: p.timeline || "",
            complexity: p.complexity || "",
            tech: p.tech ? p.tech.join("\n") : "",
            github: p.github || "",
            live: p.live || "",
            imageLinks: p.imageLinks ? p.imageLinks.join("\n") : "",
            featured: p.featured || false,
          });
        } else {
          toast.error("Failed to load project details");
        }
      } catch (err) {
        toast.error("Network error");
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchProject();
  }, [params.id, API]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    
    const token = getToken();
    if (!token) return;
    setSaving(true);
    const body = {
      ...form,
      tech: form.tech.split("\n").map(t => t.trim()).filter(Boolean),
      imageLinks: form.imageLinks.split("\n").map((l: string) => l.trim()).filter(Boolean),
    };
    try {
      const res = await fetch(`${API}/api/projects/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Failed to update" }));
        toast.error(err.error || "Failed to update");
        setSaving(false);
        return;
      }
      toast.success("Project updated!");
      router.push("/admin/projects");
    } catch { 
      toast.error("Network error - is the server running?");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Toaster position="top-right" toastOptions={{ style: { background: "#18181b", color: "#e4e4e7", border: "1px solid #27272a", fontSize: "14px" } }} />
      <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            Edit Case Study
          </h1>
          <p className="mt-1 text-base text-zinc-400">Step-by-step configuration for dynamic project editing</p>
        </div>
        <button onClick={() => router.push("/admin/projects")} className="rounded-lg border border-zinc-700 px-4 py-2 text-base font-medium text-zinc-400 hover:bg-zinc-800">Back to Projects</button>
      </div>

      <div className="flex items-center mb-8 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-base border-2 ${step >= num ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-zinc-800 border-zinc-700 text-zinc-400'}`}>
              {step > num ? <CheckCircle2 className="w-5 h-5" /> : num}
            </div>
            <span className={`ml-2 text-base font-semibold ${step >= num ? 'text-white' : 'text-zinc-500'}`}>
              {num === 1 ? 'Basic Info' : num === 2 ? 'Details' : 'Media & Tech'}
            </span>
            {num < 3 && <div className={`w-12 sm:w-24 h-0.5 mx-2 sm:mx-4 ${step > num ? 'bg-emerald-600' : 'bg-zinc-800'}`} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md">
        
        {step === 1 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 animate-fade-in">
            <div className="sm:col-span-2">
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Project Title *</label>
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-base text-white" />
            </div>
            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Category *</label>
              <input required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-base text-white" placeholder="e.g. Fintech Enterprise" />
            </div>
            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Client Name</label>
              <input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-base text-white" placeholder="e.g. Global Remittance Corp" />
            </div>
            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Timeline</label>
              <input value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-base text-white" />
            </div>
            <div>
              <label className="flex items-center gap-2 pt-8 text-base font-bold text-zinc-300">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="rounded border-zinc-700 bg-zinc-950 w-4 h-4 text-emerald-500" />
                Featured Project
              </label>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 animate-fade-in">
            <div className="sm:col-span-2">
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Short Summary *</label>
              <textarea required value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} rows={2} className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-base text-white" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Detailed Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-base text-white" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Impact & Results</label>
              <textarea value={form.impact} onChange={(e) => setForm({ ...form, impact: e.target.value })} rows={2} className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-base text-white" />
            </div>
            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Role / Contributions</label>
              <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-base text-white" />
            </div>
            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Complexity</label>
              <input value={form.complexity} onChange={(e) => setForm({ ...form, complexity: e.target.value })} className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-base text-white" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 animate-fade-in">
            <div className="sm:col-span-2">
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Tech Stack (Click to toggle)</label>
              <div className="mt-2 flex flex-wrap gap-2 p-3 border border-zinc-800 rounded-xl bg-zinc-950">
                {["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Redux", "Framer Motion", "Node.js", "NestJS", "Express", "Spring Boot", "GraphQL", "MongoDB", "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS", "Vercel"].map((t) => {
                  const active = form.tech.split("\n").includes(t);
                  return (
                    <button key={t} type="button" onClick={() => {
                      const list = form.tech.split("\n").filter(Boolean);
                      if (active) { list.splice(list.indexOf(t), 1); } else { list.push(t); }
                      setForm({ ...form, tech: list.join("\n") });
                    }}
                      className={`rounded-full px-3 py-1.5 text-sm font-bold transition-all ${active ? "bg-emerald-600 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"}`}>
                      {active ? "✓ " : "+ "}{t}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-2">Project Images</label>
              <div className="mt-1">
                <input
                  type="file"
                  accept="image/*"
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
                        const currentLinks = form.imageLinks ? form.imageLinks.split("\\n").filter(Boolean) : [];
                        currentLinks.push(data.url);
                        setForm({ ...form, imageLinks: currentLinks.join("\\n") });
                      }
                    } catch { toast.error("Upload failed"); }
                    setUploading(false);
                    e.target.value = "";
                  }}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm font-mono text-white file:mr-3 file:rounded file:border-0 file:bg-emerald-600 file:px-3 file:py-1.5 file:font-semibold file:text-white hover:file:bg-emerald-500 disabled:opacity-50"
                  disabled={uploading}
                />
                {uploading && <p className="mt-1 text-sm text-zinc-500">Uploading...</p>}
              </div>
              {form.imageLinks && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {form.imageLinks.split("\\n").filter(Boolean).map((link, idx) => (
                    <div key={idx} className="relative inline-block h-20 w-32 rounded-lg overflow-hidden border border-zinc-700">
                      <Image src={link} alt="" fill className="object-cover" />
                      <button type="button" onClick={() => {
                        const links = form.imageLinks.split("\\n").filter(Boolean);
                        links.splice(idx, 1);
                        setForm({ ...form, imageLinks: links.join("\\n") });
                      }} className="absolute inset-0 bg-black/60 flex items-center justify-center text-xs font-bold text-red-400 opacity-0 hover:opacity-100 transition-opacity">Remove</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">GitHub URL</label>
              <input value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-base text-white" />
            </div>
            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Live Demo URL</label>
              <input value={form.live} onChange={(e) => setForm({ ...form, live: e.target.value })} className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-base text-white" />
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-6 border-t border-zinc-800 justify-between">
          <button type="button" disabled={step === 1} onClick={() => setStep(step - 1)} className="inline-flex items-center gap-2 rounded-xl bg-zinc-800 px-6 py-2.5 text-base font-bold hover:bg-zinc-700 disabled:opacity-0 transition-all">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-base font-bold text-white hover:bg-emerald-500 disabled:opacity-50 shadow-lg active:scale-95 transition-all">
            {saving ? "Saving..." : step === 3 ? "Update Case Study" : "Continue"}
            {!saving && step < 3 && <ChevronRight className="w-4 h-4" />}
            {step === 3 && !saving && <Save className="w-4 h-4" />}
          </button>
        </div>
      </form>
    </div>
  );
}
