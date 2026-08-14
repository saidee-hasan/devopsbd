"use client";
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

// Utility to parse comma‑separated tags: trim, lower‑case, dedupe, and remove empties
const parseTags = (input: string): string[] =>
  Array.from(new Set(input.split(",").map((t) => t.trim().toLowerCase()))).filter(Boolean);
import { Sparkles, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { API_URL } from "@/lib/api";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  readTime: number;
  createdAt: string;
  updatedAt: string;
}

interface AIData {
  title: string;
  slug: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  tags: string[];
  readingTime: string;
  imagePrompt: string;
  content: string;
  faq: { question: string; answer: string }[];
  conclusion: string;
  schema: Record<string, unknown>;
}

export default function AdminBlogs() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "", content: "", excerpt: "", coverImage: "",
    tags: "", published: false, featured: false,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterTag, setFilterTag] = useState("All");
  const [aiModal, setAiModal] = useState(false);
  const [aiTitle, setAiTitle] = useState("");
  const [aiCategory, setAiCategory] = useState("Technology");
  const [aiTags, setAiTags] = useState("");
  const [aiLanguage, setAiLanguage] = useState("English");
  const [aiMinWords, setAiMinWords] = useState(1500);
  const [aiMaxWords, setAiMaxWords] = useState(2500);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiPreview, setAiPreview] = useState<AIData | null>(null);
  const API = API_URL;
  const getToken = () => localStorage.getItem("admin_token");

  const fetchBlogs = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/blogs`);
      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch { toast.error("Failed to fetch blogs"); }
    finally { setLoading(false); }
  }, [API]);

  const fetchTags = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/blogs/tags`);
      const data = await res.json();
      setTags(data.tags || []);
    } catch { toast.error("Failed to fetch tags"); }
  }, [API]);

  useEffect(() => { fetchBlogs(); fetchTags(); }, [fetchBlogs, fetchTags]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();
    if (!token) return;

    const body = {
      ...form,
      tags: parseTags(form.tags),
    };

    try {
      const url = editingId ? `${API}/api/blogs/${editingId}` : `${API}/api/blogs`;
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
      toast.success(editingId ? "Blog updated!" : "Blog created!");
      setShowForm(false); setEditingId(null);
      setForm({ title: "", content: "", excerpt: "", coverImage: "", tags: "", published: false, featured: false });
      fetchBlogs(); fetchTags();
    } catch { toast.error("Network error - is the server running?"); }
  };

  const handleEdit = (blog: Blog) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title, content: blog.content, excerpt: blog.excerpt,
      coverImage: blog.coverImage, tags: blog.tags.join(", "),
      published: blog.published, featured: blog.featured,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch(`${API}/api/blogs/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) { toast.error("Failed to delete"); return; }
      toast.success("Blog deleted!");
      fetchBlogs(); fetchTags();
    } catch { toast.error("Network error"); }
  };

  const togglePublish = async (blog: Blog) => {
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch(`${API}/api/blogs/${blog._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ published: !blog.published }),
      });
      if (!res.ok) { toast.error("Failed to toggle publish"); return; }
      toast.success(blog.published ? "Unpublished!" : "Published!");
      fetchBlogs();
    } catch { toast.error("Network error"); }
  };

  const handleAIGenerate = async () => {
    if (!aiTitle.trim()) return;
    const token = getToken();
    if (!token) return;
    setAiGenerating(true);
    setAiPreview(null);
    try {
      const res = await fetch(`${API}/api/blogs/ai-generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          title: aiTitle,
          category: aiCategory,
          tags: parseTags(aiTags),
          language: aiLanguage,
          minWords: aiMinWords,
          maxWords: aiMaxWords,
        }),
      });
      if (!res.ok) { toast.error("AI generation failed"); return; }
      const data = await res.json();
      if (data.generated) setAiPreview(data.generated);
    } catch { toast.error("Network error"); }
    finally { setAiGenerating(false); }
  };

  const applyAIContent = () => {
    if (!aiPreview) return;
    setForm({
      title: aiPreview.title,
      content: aiPreview.content,
      excerpt: aiPreview.excerpt,
      coverImage: form.coverImage,
      tags: (aiPreview.tags || []).join(", "),
      published: false,
      featured: false,
    });
    setAiModal(false);
    setAiPreview(null);
    setAiTitle("");
    setShowForm(true);
  };

  const openAIModal = () => {
    setAiTitle("");
    setAiCategory("Technology");
    setAiTags("");
    setAiLanguage("English");
    setAiMinWords(1500);
    setAiMaxWords(2500);
    setAiPreview(null);
    setAiModal(true);
  };

  const filtered = filterTag === "All" ? blogs : blogs.filter((b) => b.tags.includes(filterTag));

  if (loading) return <div className="flex h-64 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" /></div>;

  return (
    <div className="p-6">
      <Toaster position="top-right" toastOptions={{ style: { background: "#18181b", color: "#e4e4e7", border: "1px solid #27272a", fontSize: "14px" }, success: { iconTheme: { primary: "#10b981", secondary: "#18181b" } }, error: { iconTheme: { primary: "#ef4444", secondary: "#18181b" } } }} />
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold">Blog Posts</h1>
          <p className="mt-0.5 text-base text-zinc-500">{blogs.length} posts ({blogs.filter((b) => b.published).length} published)</p>
        </div>
        <div className="flex gap-2">
          <button onClick={openAIModal}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-base font-medium hover:bg-zinc-800">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            AI Generate
          </button>
          <button onClick={() => router.push("/admin/blogs/add")}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-base font-semibold hover:bg-emerald-500">+ New Post</button>
        </div>
      </div>

      {/* AI Generate Modal */}
      {aiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => { if (!aiGenerating) { setAiModal(false); setAiPreview(null); } }}>
          <div className="w-full max-w-2xl rounded-xl border border-zinc-700 bg-zinc-900 p-6 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-400" />
                AI Blog Generator
              </h2>
              <button onClick={() => { setAiModal(false); setAiPreview(null); }}
                className="rounded-lg bg-zinc-800 px-3 py-1 text-sm hover:bg-zinc-700">Close</button>
            </div>

            {!aiPreview ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Blog Title *</label>
                  <input value={aiTitle} onChange={(e) => setAiTitle(e.target.value)}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base"
                    placeholder="Enter your blog title..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Category</label>
                    <input value={aiCategory} onChange={(e) => setAiCategory(e.target.value)}
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Language</label>
                    <select value={aiLanguage} onChange={(e) => setAiLanguage(e.target.value)}
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base">
                      <option>English</option>
                      <option>Bengali</option>
                      <option>Hindi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Min Words</label>
                    <input type="number" min={500} max={5000} value={aiMinWords}
                      onChange={(e) => setAiMinWords(Number(e.target.value))}
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Max Words</label>
                    <input type="number" min={500} max={5000} value={aiMaxWords}
                      onChange={(e) => setAiMaxWords(Number(e.target.value))}
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Tags (comma-separated, optional)</label>
                  <input value={aiTags} onChange={(e) => setAiTags(e.target.value)}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base"
                    placeholder="react, nextjs, typescript" />
                </div>
                <button onClick={handleAIGenerate} disabled={aiGenerating || !aiTitle.trim()}
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-base font-semibold hover:bg-emerald-500 disabled:opacity-50">
                  {aiGenerating ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Generating...</>
                  ) : (
                    <><Sparkles className="h-4 w-4" /> Generate Full Content</>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-lg border border-emerald-600/30 bg-emerald-600/10 px-4 py-3 text-sm text-emerald-400">
                  Content generated successfully! Review and click &quot;Apply to Editor&quot; below.
                </div>
                <div className="space-y-3 text-base">
                  <div>
                    <span className="text-sm text-zinc-500">Title:</span>
                    <p className="font-semibold">{aiPreview.title}</p>
                  </div>
                  <div>
                    <span className="text-sm text-zinc-500">Slug:</span>
                    <p className="text-zinc-300 text-sm">{aiPreview.slug}</p>
                  </div>
                  <div>
                    <span className="text-sm text-zinc-500">Meta Title:</span>
                    <p className="text-zinc-300 text-sm">{aiPreview.metaTitle}</p>
                  </div>
                  <div>
                    <span className="text-sm text-zinc-500">Meta Description:</span>
                    <p className="text-zinc-400 text-sm">{aiPreview.metaDescription}</p>
                  </div>
                  <div>
                    <span className="text-sm text-zinc-500">Focus Keyword:</span>
                    <p className="text-emerald-400 text-sm">{aiPreview.focusKeyword}</p>
                  </div>
                  <div>
                    <span className="text-sm text-zinc-500">Tags:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {(aiPreview.tags || []).map((t, i) => (
                        <span key={i} className="rounded-full bg-emerald-600/15 px-2 py-0.5 text-sm text-emerald-400">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-zinc-500">Reading Time:</span>
                    <p className="text-zinc-300 text-sm">{aiPreview.readingTime}</p>
                  </div>
                  <div>
                    <span className="text-sm text-zinc-500">Excerpt:</span>
                    <p className="text-zinc-400 text-sm">{aiPreview.excerpt}</p>
                  </div>
                  <div>
                    <span className="text-sm text-zinc-500">Content Preview:</span>
                    <div className="mt-1 rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-zinc-400 whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
                      {aiPreview.content?.slice(0, 1500)}
                      {(aiPreview.content?.length || 0) > 1500 ? "..." : ""}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-zinc-500">FAQ ({aiPreview.faq?.length || 0} questions):</span>
                    <div className="mt-1 space-y-1">
                      {(aiPreview.faq || []).slice(0, 3).map((f, i) => (
                        <div key={i} className="rounded bg-zinc-800/50 px-3 py-1.5 text-sm">
                          <p className="font-medium text-zinc-300">Q: {f.question}</p>
                          <p className="text-zinc-500 mt-0.5">A: {f.answer?.slice(0, 100)}...</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-zinc-500">Conclusion:</span>
                    <p className="text-zinc-400 text-sm">{aiPreview.conclusion}</p>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={applyAIContent}
                    className="rounded-lg bg-emerald-600 px-6 py-2.5 text-base font-semibold hover:bg-emerald-500">
                    Apply to Editor
                  </button>
                  <button onClick={() => setAiPreview(null)}
                    className="rounded-lg bg-zinc-800 px-6 py-2.5 text-base font-medium hover:bg-zinc-700">
                    Regenerate
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Blog Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-base font-medium text-zinc-400">Title *</label>
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-base font-medium text-zinc-400">Excerpt / Short summary</label>
              <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" placeholder="Brief summary shown in blog cards" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-base font-medium text-zinc-400">Content (Markdown supported)</label>
              <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={12} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base font-mono"
                placeholder="# Title&#10;&#10;Write your blog content here with **markdown**..." />
              <p className="mt-1 text-sm text-zinc-500">Supports full Markdown — headings, bold, lists, code blocks, links, images.</p>
            </div>
            <div>
              <label className="block text-base font-medium text-zinc-400">Cover Image</label>
              <input type="file" accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const token = getToken();
                  if (!token) return;
                  const fd = new FormData();
                  fd.append("image", file);
                  try {
                    const res = await fetch(`${API}/api/upload/cloudinary?folder=blogs`, {
                      method: "POST",
                      headers: { Authorization: `Bearer ${token}` },
                      body: fd,
                    });
                    const data = await res.json();
                    if (data.url) { toast.success("Image uploaded!"); setForm((prev) => ({ ...prev, coverImage: data.url })); }
                  } catch { toast.error("Upload failed"); }
                  e.target.value = "";
                }}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base file:mr-3 file:rounded file:border-0 file:bg-emerald-600 file:px-3 file:py-1 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-500"
              />
              {form.coverImage && (
                <div className="mt-2 flex items-center gap-2">
                  <Image src={form.coverImage} alt="cover" width={64} height={40} className="rounded object-cover" />
                  <span className="truncate text-sm text-zinc-500">{form.coverImage}</span>
                  <button type="button" onClick={() => setForm((prev) => ({ ...prev, coverImage: "" }))} className="text-sm text-red-400 hover:text-red-300 shrink-0">Remove</button>
                </div>
              )}
            </div>
            <div>
              <label className="block text-base font-medium text-zinc-400">Tags (comma-separated)</label>
              <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base" placeholder="react, nextjs, javascript" list="tag-list" />
              <datalist id="tag-list">{tags.map((t) => <option key={t} value={t} />)}</datalist>
            </div>
            <div className="flex items-center gap-6">
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
            <button type="submit" className="rounded-lg bg-emerald-600 px-6 py-2 text-base font-semibold hover:bg-emerald-500">{editingId ? "Update" : "Create"}</button>
            <button type="button" onClick={() => setShowForm(false)} className="rounded-lg bg-zinc-800 px-6 py-2 text-base font-medium hover:bg-zinc-700">Cancel</button>
          </div>
        </form>
      )}

      {/* Tag Filter */}
      {tags.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {["All", ...tags].map((t) => (
            <button key={t} onClick={() => setFilterTag(t)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                filterTag === t ? "bg-emerald-600 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
              }`}>{t}</button>
          ))}
        </div>
      )}

      {/* Blog List */}
      <div className="space-y-3">
        {filtered.map((b) => (
          <div key={b._id} className="flex items-start justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 px-5 py-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-semibold truncate">{b.title}</h3>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                  b.published ? "bg-emerald-600/20 text-emerald-400" : "bg-zinc-800 text-zinc-500"
                }`}>{b.published ? "Published" : "Draft"}</span>
                {b.featured && <span className="shrink-0 text-sm">⭐</span>}
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-500">
                <span>{b.readTime || "?"} min read</span>
                <span>{new Date(b.createdAt).toLocaleDateString()}</span>
                {b.tags.length > 0 && <span>{b.tags.slice(0, 3).join(", ")}</span>}
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4 shrink-0">
              <button onClick={() => togglePublish(b)}
                className={`text-sm font-medium ${b.published ? "text-amber-400 hover:text-amber-300" : "text-emerald-400 hover:text-emerald-300"}`}>
                {b.published ? "Unpublish" : "Publish"}
              </button>
              <button onClick={() => handleEdit(b)} className="text-sm text-emerald-400 hover:text-emerald-300">Edit</button>
              <button onClick={() => handleDelete(b._id)} className="text-sm text-red-400 hover:text-red-300">Delete</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-zinc-700 p-10 text-center text-base text-zinc-500">
            {blogs.length === 0 ? "No blog posts yet. Write your first post!" : "No posts match this tag."}
          </div>
        )}
      </div>
    </div>
  );
}
