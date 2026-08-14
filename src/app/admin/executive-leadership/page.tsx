"use client";
import React, { useState } from "react";
import { Users, Plus, Save, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface Leader {
  name: string;
  title: string;
  bio: string;
}

const initialLeaders: Leader[] = [
  {
    name: "Michael Chen",
    title: "Head of Software Engineering",
    bio: "Expert in Next.js, distributed backend systems, fintech APIs, and high‑concurrency database optimization.",
  },
  {
    name: "Sarah Jenkins",
    title: "VP of Cloud Architecture & DevOps",
    bio: "Former AWS Principal Architect specializing in microservices, SLA 99.99% fault tolerance, and CI/CD.",
  },
  {
    name: "Hendrik Morella",
    title: "Founder & Chief Executive Officer",
    bio: "15+ years experience in enterprise cloud transformation, Kubernetes, and global tech firm expansion. Fast, decisive CEO with a proven track record.",
  },
  {
    name: "Zubair Al‑Mamun",
    title: "Senior Engineering Project Manager",
    bio: "7+ Years",
  },
];

export default function AdminExecutiveLeadershipPage() {
  const [leaders, setLeaders] = useState<Leader[]>(initialLeaders);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Leader>({ name: "", title: "", bio: "" });
  const [saving, setSaving] = useState(false);

  const resetForm = () => {
    setForm({ name: "", title: "", bio: "" });
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.title) {
      toast.error("Name and Title are required");
      return;
    }
    setSaving(true);
    setLeaders([...leaders, form]);
    toast.success("Leader added!");
    resetForm();
    setSaving(false);
  };

  return (
    <div className="p-6">
      <Toaster position="top-right" />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-200">Executive Leadership</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-base font-medium text-white hover:bg-emerald-500"
        >
          <Plus className="h-4 w-4" />
          {showForm ? "Cancel" : "Add Leader"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Name *</label>
            <input
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Title *</label>
            <input
              required
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Bio</label>
            <textarea
              rows={4}
              value={form.bio}
              onChange={e => setForm({ ...form, bio: e.target.value })}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base text-white"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-base font-semibold text-white hover:bg-emerald-500 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Leader"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-base font-medium text-slate-300 hover:bg-zinc-700"
            >
              <X className="h-4 w-4" /> Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {leaders.map((l, idx) => (
          <div key={idx} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-6 w-6 text-emerald-400" />
              <h2 className="text-lg font-semibold text-slate-200">{l.name}</h2>
            </div>
            <p className="text-sm font-medium text-emerald-300 mb-1">{l.title}</p>
            <p className="text-sm text-slate-400">{l.bio}</p>
          </div>
        ))}
        {leaders.length === 0 && (
          <p className="text-base text-slate-500">No leaders added yet.</p>
        )}
      </div>
    </div>
  );
}
