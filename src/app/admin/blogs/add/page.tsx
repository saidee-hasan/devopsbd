"use client";
import { useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";

export default function AddBlog() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "", content: "", excerpt: "", coverImage: "",
    tags: "", published: false, featured: false,
  });
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
      tags: form.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
    };
    try {
      const res = await fetch(`${API}/api/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Failed to save" }));
        toast.error(err.error || "Failed to save");
        return;
      }
      toast.success("Blog created!");
      router.push("/admin/blogs");
    } catch { toast.error("Network error - is the server running?"); }
    finally { setSaving(false); }
  };

  return (
    <div className="p-6">
      <Toaster position="top-right" toastOptions={{ style: { background: "#18181b", color: "#e4e4e7", border: "1px solid #27272a", fontSize: "14px" }, success: { iconTheme: { primary: "#10b981", secondary: "#18181b" } }, error: { iconTheme: { primary: "#ef4444", secondary: "#18181b" } } }} />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Add Blog</h1>
          <p className="mt-0.5 text-base text-zinc-500">Write a new blog post</p>
        </div>
        <button onClick={() => router.push("/admin/blogs")} className="rounded-lg border border-zinc-700 px-4 py-2 text-base font-medium text-zinc-400 hover:bg-zinc-800">Back to Blogs</button>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="block text-base font-medium text-zinc-400">Title *</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="block text-base font-medium text-zinc-400">Excerpt</label>
            <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="block text-base font-medium text-zinc-400">Content (Markdown)</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={12} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base font-mono" />
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="block text-base font-medium text-zinc-400">Cover Image</label>
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
                    const res = await fetch(`${API}/api/upload/cloudinary?folder=blogs`, {
                      method: "POST",
                      headers: { Authorization: `Bearer ${token}` },
                      body: fd,
                    });
                    if (!res.ok) { toast.error("Upload failed"); return; }
                    const data = await res.json();
                    if (data.url) {
                      toast.success("Image uploaded!");
                      setForm((prev) => ({ ...prev, coverImage: data.url }));
                    }
                  } catch { toast.error("Upload failed"); }
                  setUploading(false);
                  e.target.value = "";
                }}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base file:mr-3 file:rounded file:border-0 file:bg-emerald-600 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-500 disabled:opacity-50" disabled={uploading} />
              {uploading && <p className="mt-1 text-sm text-zinc-500">Uploading...</p>}
            </div>
            {form.coverImage && (
              <div className="mt-3">
                <div className="group relative inline-block h-32 w-56 rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
                  <Image src={form.coverImage} alt="" fill className="object-cover" />
                  <button type="button" onClick={() => setForm({ ...form, coverImage: "" })}
                    className="absolute top-1 right-1 rounded bg-black/70 px-1.5 py-0.5 text-sm text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
                </div>
              </div>
            )}
          </div>
          <div>
            <label className="block text-base font-medium text-zinc-400">Tags (comma-separated)</label>
            <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
          </div>
          <div className="flex items-center gap-6 pt-6">
            <label className="flex items-center gap-2 text-base font-medium text-zinc-400">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="rounded border-zinc-700 bg-zinc-950" />
              Published
            </label>
            <label className="flex items-center gap-2 text-base font-medium text-zinc-400">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="rounded border-zinc-700 bg-zinc-950" />
              Featured
            </label>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2 text-base font-semibold hover:bg-emerald-500 disabled:opacity-50">
            {saving ? "Saving..." : "Create Blog"}
          </button>
          <button type="button" onClick={() => router.push("/admin/blogs")} className="rounded-lg bg-zinc-800 px-6 py-2 text-base font-medium hover:bg-zinc-700">Cancel</button>
        </div>
      </form>
    </div>
  );
}
