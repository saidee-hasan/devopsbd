"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { MessageSquareQuote, Plus, Edit, Trash2, Save, Star, CheckCircle2 } from "lucide-react";
import { testimonials as initialTestimonials, type Testimonial } from "@/data/portfolio";
import { API_URL } from "@/lib/api";

export default function AdminTestimonialsPage() {
  const [list, setList] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [form, setForm] = useState<Testimonial>({
    id: "",
    clientName: "",
    clientRole: "",
    company: "",
    location: "Global",
    content: "",
    rating: 5,
    avatar: "",
  });

  const API = API_URL;
  const getToken = () => localStorage.getItem("admin_token");
  const [uploading, setUploading] = useState(false);

  const loadTestimonials = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/testimonials`);
      const data = await res.json();
      if (data && data.length > 0) {
        setList(data);
      } else {
        setList(initialTestimonials);
      }
    } catch (e) {
      console.error(e);
      setList(initialTestimonials);
    } finally {
      setLoading(false);
    }
  }, [API]);

  useEffect(() => {
    loadTestimonials();
  }, [loadTestimonials]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientName || !form.content) {
      toast.error("Client Name and Review Content are required!");
      return;
    }

    const initials = form.clientName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const newTestimonial = {
      ...form,
      avatar: form.avatar || initials,
    };

    const token = getToken();

    try {
      if (editingIndex !== null) {
        const idToUpdate = (list[editingIndex] as any)._id;
        if (idToUpdate) {
          await fetch(`${API}/api/testimonials/${idToUpdate}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(newTestimonial)
          });
        }
        toast.success("Testimonial updated!");
      } else {
        await fetch(`${API}/api/testimonials`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(newTestimonial)
        });
        toast.success("New Testimonial added!");
      }
      loadTestimonials();
    } catch (e) {
      toast.error("Failed to save testimonial");
    }

    setShowForm(false);
    resetForm();
  };

  const handleEdit = (idx: number) => {
    setEditingIndex(idx);
    setForm(list[idx]);
    setShowForm(true);
  };

  const handleDelete = async (idx: number) => {
    const item = list[idx];
    if (!confirm(`Delete testimonial from "${item.clientName}"?`)) return;
    
    const idToDelete = (item as any)._id;
    if (idToDelete) {
      try {
        await fetch(`${API}/api/testimonials/${idToDelete}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        toast.success("Testimonial deleted.");
        loadTestimonials();
      } catch (e) {
        toast.error("Failed to delete testimonial.");
      }
    } else {
      const updated = list.filter((_, i) => i !== idx);
      setList(updated);
      toast.success("Testimonial deleted (local only).");
    }
  };

  const resetForm = () => {
    setEditingIndex(null);
    setForm({
      id: "",
      clientName: "",
      clientRole: "",
      company: "",
      location: "Global",
      content: "",
      rating: 5,
      avatar: "",
    });
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <Toaster position="top-right" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <MessageSquareQuote className="h-6 w-6 text-emerald-400" />
            Client Reviews & Testimonials Manager
          </h1>
          <p className="mt-1 text-base text-zinc-400">
            Add and publish enterprise client reviews, ratings, and testimonials.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base transition-all shadow-lg active:scale-95 shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>{showForm ? "Close Form" : "Add Testimonial"}</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 sm:p-8 space-y-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md animate-fade-in">
          <h2 className="text-base font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            {editingIndex !== null ? "Edit Testimonial" : "Add New Client Testimonial"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Client Full Name *</label>
              <input
                required
                type="text"
                value={form.clientName}
                onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                placeholder="e.g. David Sterling"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Client Designation / Role</label>
              <input
                type="text"
                value={form.clientRole}
                onChange={(e) => setForm({ ...form, clientRole: e.target.value })}
                placeholder="e.g. VP of Engineering"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Company / Organization</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="e.g. CloudScale Inc."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Client Location</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. London, UK"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Review Content *</label>
              <textarea
                required
                rows={3}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Full testimonial text submitted by client..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Rating (1 to 5 Stars)</label>
              <select
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              >
                <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
                <option value={4}>4 Stars ⭐⭐⭐⭐</option>
                <option value={3}>3 Stars ⭐⭐⭐</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Client Avatar Image</label>
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
                      const res = await fetch(`${API}/api/upload/cloudinary?folder=testimonials`, {
                        method: "POST",
                        headers: { Authorization: `Bearer ${token}` },
                        body: fd,
                      });
                      if (!res.ok) { toast.error("Upload failed"); return; }
                      const data = await res.json();
                      if (data.url) {
                        toast.success("Avatar uploaded!");
                        setForm({ ...form, avatar: data.url });
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
              {form.avatar && (
                <div className="mt-3 relative inline-block h-16 w-16 rounded-full overflow-hidden border border-zinc-700">
                  <Image src={form.avatar} alt="Avatar Preview" fill className="object-cover" />
                  <button type="button" onClick={() => setForm({ ...form, avatar: "" })}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center text-xs font-bold text-red-400 opacity-0 hover:opacity-100 transition-opacity">Remove</button>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-zinc-800">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base transition-all shadow-md flex items-center gap-1.5"
            >
              <Save className="h-4 w-4" />
              <span>{editingIndex !== null ? "Save Changes" : "Publish Testimonial"}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-base transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {list.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-3 flex flex-col justify-between hover:border-zinc-700 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-mono text-zinc-500">{item.location}</span>
              </div>
              <p className="text-sm text-zinc-300 italic leading-relaxed">&quot;{item.content}&quot;</p>
              <div className="pt-2">
                <div className="font-bold text-white text-base">{item.clientName}</div>
                <div className="text-sm text-emerald-400 font-mono">
                  {item.clientRole} — {item.company}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => handleEdit(idx)}
                className="p-2 rounded-xl bg-zinc-800 hover:bg-emerald-600/20 text-zinc-300 hover:text-emerald-400 transition-colors"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(idx)}
                className="p-2 rounded-xl bg-zinc-800 hover:bg-red-600/20 text-zinc-300 hover:text-red-400 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
