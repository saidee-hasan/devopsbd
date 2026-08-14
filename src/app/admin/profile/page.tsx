"use client";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { API_URL } from "@/lib/api";

const fields = [
  { key: "name", label: "Name", type: "text" },
  { key: "role", label: "Role", type: "text" },
  { key: "tagline", label: "Tagline", type: "textarea" },
  { key: "focus", label: "Focus", type: "textarea" },
  { key: "email", label: "Email", type: "email" },
  { key: "linkedin", label: "LinkedIn URL", type: "url" },
  { key: "github", label: "GitHub URL", type: "url" },
  { key: "resumeUrl", label: "Resume URL", type: "upload" },
] as const;

export default function AdminProfile() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const API = API_URL;
  const getToken = () => localStorage.getItem("admin_token");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/api/profile`);
        const data = await res.json();
        const init: Record<string, string> = {};
        for (const f of fields) init[f.key] = data[f.key] || "";
        setForm(init);
      } catch {
        toast.error("Failed to load profile");
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
        body: JSON.stringify(form),
      });
      if (!res.ok) { toast.error("Failed to save"); return; }
      toast.success("Profile updated!");
    } catch { toast.error("Network error"); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="p-6 text-base text-zinc-500">Loading...</div>;

  return (
    <div className="p-6">
      <Toaster position="top-right" toastOptions={{ style: { background: "#18181b", color: "#e4e4e7", border: "1px solid #27272a", fontSize: "14px" }, success: { iconTheme: { primary: "#10b981", secondary: "#18181b" } }, error: { iconTheme: { primary: "#ef4444", secondary: "#18181b" } } }} />
      <div className="mb-6">
        <h1 className="text-xl font-bold">Profile</h1>
        <p className="mt-0.5 text-base text-zinc-500">Edit your personal information</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fields.map(({ key, label, type }) => (
            <div key={key} className={type === "textarea" || type === "upload" ? "sm:col-span-2 lg:col-span-3" : ""}>
              <label className="block text-base font-medium text-zinc-400">{label}</label>
              {type === "textarea" ? (
                <textarea value={form[key] || ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })} rows={3} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
              ) : type === "upload" ? (
                <div className="mt-1 space-y-2">
                  <input type="text" value={form[key] || ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder="Paste URL or upload PDF" className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
                  <input type="file" accept=".pdf,application/pdf"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setUploading(true);
                      const token = getToken();
                      if (!token) { setUploading(false); return; }
                      const fd = new FormData();
                      fd.append("image", file);
                      try {
                        const res = await fetch(`${API}/api/upload/cloudinary?folder=resume`, {
                          method: "POST",
                          headers: { Authorization: `Bearer ${token}` },
                          body: fd,
                        });
                        if (!res.ok) { toast.error("Upload failed"); return; }
                        const data = await res.json();
                        if (data.url) {
                          toast.success("Resume uploaded!");
                          setForm((prev) => ({ ...prev, [key]: data.url }));
                        }
                      } catch { toast.error("Upload failed"); }
                      setUploading(false);
                      e.target.value = "";
                    }}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base file:mr-3 file:rounded file:border-0 file:bg-emerald-600 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-500 disabled:opacity-50" disabled={uploading} />
                  {uploading && <p className="text-sm text-zinc-500">Uploading PDF to Cloudinary...</p>}
                  {form[key] && (
                    <a href={form[key]} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300 underline">Preview Resume →</a>
                  )}
                </div>
              ) : (
                <input type={type} value={form[key] || ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2 text-base font-semibold hover:bg-emerald-500 disabled:opacity-50">
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
