"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Briefcase, Plus, Edit, Trash2, Save, CheckCircle2 } from "lucide-react";
import { careerPositions as initialJobs, type CareerPosition } from "@/data/portfolio";
import { API_URL } from "@/lib/api";

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<CareerPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [form, setForm] = useState<CareerPosition>({
    id: "",
    title: "",
    department: "Engineering",
    location: "Dhaka, Bangladesh / Remote",
    type: "Full-Time",
    description: "",
    requirements: [""],
  });

  const [reqsInput, setReqsInput] = useState("");

  const API = API_URL;
  const getToken = () => localStorage.getItem("admin_token");

  const loadJobs = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/jobs`);
      const data = await res.json();
      if (data && data.length > 0) {
        setJobs(data);
      } else {
        setJobs(initialJobs);
      }
    } catch (e) {
      console.error(e);
      setJobs(initialJobs);
    } finally {
      setLoading(false);
    }
  }, [API]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      toast.error("Job Title and Description are required!");
      return;
    }

    const cleanReqs = reqsInput
      ? reqsInput.split("\n").map((r) => r.trim()).filter(Boolean)
      : form.requirements;

    const jobId = form.id || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const newJob = {
      ...form,
      id: jobId,
      requirements: cleanReqs.length > 0 ? cleanReqs : ["Bachelor's degree in CS or relevant experience"],
    };

    const token = getToken();

    try {
      if (editingIndex !== null) {
        const idToUpdate = (jobs[editingIndex] as any)._id;
        if (idToUpdate) {
          await fetch(`${API}/api/jobs/${idToUpdate}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(newJob)
          });
        }
        toast.success("Job posting updated!");
      } else {
        await fetch(`${API}/api/jobs`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(newJob)
        });
        toast.success("New job circular published!");
      }
      loadJobs();
    } catch (e) {
      toast.error("Failed to save job posting");
    }

    setShowForm(false);
    resetForm();
  };

  const handleEdit = (idx: number) => {
    const j = jobs[idx];
    setEditingIndex(idx);
    setForm(j);
    setReqsInput(j.requirements.join("\n"));
    setShowForm(true);
  };

  const handleDelete = async (idx: number) => {
    const j = jobs[idx];
    if (!confirm(`Delete job posting "${j.title}"?`)) return;
    
    const idToDelete = (j as any)._id;
    if (idToDelete) {
      try {
        await fetch(`${API}/api/jobs/${idToDelete}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        toast.success("Job posting deleted.");
        loadJobs();
      } catch (e) {
        toast.error("Failed to delete job posting.");
      }
    } else {
      const updated = jobs.filter((_, i) => i !== idx);
      setJobs(updated);
      toast.success("Job posting deleted (local only).");
    }
  };

  const resetForm = () => {
    setEditingIndex(null);
    setForm({
      id: "",
      title: "",
      department: "Engineering",
      location: "Dhaka, Bangladesh / Remote",
      type: "Full-Time",
      description: "",
      requirements: [""],
    });
    setReqsInput("");
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
            <Briefcase className="h-6 w-6 text-emerald-400" />
            Job Circulars & Career Openings Manager
          </h1>
          <p className="mt-1 text-base text-zinc-400">
            Post new career opportunities, specify requirements, and manage company job listings.
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
          <span>{showForm ? "Close Form" : "Post New Job"}</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 sm:p-8 space-y-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md animate-fade-in">
          <h2 className="text-base font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            {editingIndex !== null ? "Edit Job Posting" : "Publish New Job Circular"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Job Position Title *</label>
              <input
                required
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Senior Full-Stack Engineer"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Department</label>
              <select
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Engineering">Engineering</option>
                <option value="DevOps & Cloud">DevOps & Cloud</option>
                <option value="Design">Design & UI/UX</option>
                <option value="Product">Product Management</option>
                <option value="Quality Assurance">Quality Assurance</option>
                <option value="Sales & Marketing">Sales & Marketing</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Dhaka, Bangladesh / Remote"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Job Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract / Project Based</option>
                <option value="Internship (6 Months)">Internship (6 Months)</option>
                <option value="Remote">100% Remote</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Job Overview / Description *</label>
              <textarea
                required
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="High-level description of responsibilities and team role..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Requirements & Qualifications (One per line)</label>
              <textarea
                rows={4}
                value={reqsInput}
                onChange={(e) => setReqsInput(e.target.value)}
                placeholder="3+ years experience with Next.js and TypeScript&#10;Hands-on Docker and CI/CD pipelines&#10;Strong communication skills"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-zinc-800">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base transition-all shadow-md flex items-center gap-1.5"
            >
              <Save className="h-4 w-4" />
              <span>{editingIndex !== null ? "Save Changes" : "Publish Job Opening"}</span>
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
        {jobs.map((j, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-3 flex flex-col justify-between hover:border-zinc-700 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {j.type}
                </span>
                <span className="text-sm font-mono text-zinc-400">{j.location}</span>
              </div>
              <h3 className="text-base font-bold text-white">{j.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{j.description}</p>
              <ul className="pt-2 space-y-1 text-sm text-zinc-400 list-disc list-inside">
                {j.requirements.slice(0, 3).map((r, rIdx) => (
                  <li key={rIdx} className="truncate">{r}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
              <span className="text-sm font-mono text-zinc-400">{j.department}</span>
              <div className="flex items-center gap-2">
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
          </div>
        ))}
      </div>
    </div>
  );
}
