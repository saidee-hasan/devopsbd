"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { HelpCircle, Plus, Edit, Trash2, Save, CheckCircle2 } from "lucide-react";
import { faqs as initialFaqs, type FAQItem } from "@/data/portfolio";
import { API_URL } from "@/lib/api";

export default function AdminFaqsPage() {
  const [list, setList] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [form, setForm] = useState<FAQItem>({
    question: "",
    answer: "",
  });

  const API = API_URL;
  const getToken = () => localStorage.getItem("admin_token");

  const loadFaqs = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/faqs`);
      const data = await res.json();
      if (data && data.length > 0) {
        setList(data);
      } else {
        setList(initialFaqs);
      }
    } catch (e) {
      console.error(e);
      setList(initialFaqs);
    } finally {
      setLoading(false);
    }
  }, [API]);

  useEffect(() => {
    loadFaqs();
  }, [loadFaqs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.question || !form.answer) {
      toast.error("Question and Answer are required!");
      return;
    }

    const token = getToken();

    try {
      if (editingIndex !== null) {
        const idToUpdate = (list[editingIndex] as any)._id;
        if (idToUpdate) {
          await fetch(`${API}/api/faqs/${idToUpdate}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(form)
          });
        }
        toast.success("FAQ updated!");
      } else {
        await fetch(`${API}/api/faqs`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(form)
        });
        toast.success("New FAQ published!");
      }
      loadFaqs();
    } catch (e) {
      toast.error("Failed to save FAQ");
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
    if (!confirm(`Delete FAQ: "${item.question}"?`)) return;
    
    const idToDelete = (item as any)._id;
    if (idToDelete) {
      try {
        await fetch(`${API}/api/faqs/${idToDelete}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        toast.success("FAQ deleted.");
        loadFaqs();
      } catch (e) {
        toast.error("Failed to delete FAQ.");
      }
    } else {
      const updated = list.filter((_, i) => i !== idx);
      setList(updated);
      toast.success("FAQ deleted (local only).");
    }
  };

  const resetForm = () => {
    setEditingIndex(null);
    setForm({
      question: "",
      answer: "",
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
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <Toaster position="top-right" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-emerald-400" />
            Frequently Asked Questions (FAQ) Manager
          </h1>
          <p className="mt-1 text-base text-zinc-400">
            Control questions, answers, and support explanations published on your site FAQ page.
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
          <span>{showForm ? "Close Form" : "Add New FAQ"}</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 sm:p-8 space-y-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md animate-fade-in">
          <h2 className="text-base font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            {editingIndex !== null ? "Edit FAQ" : "Add New FAQ"}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Question *</label>
              <input
                required
                type="text"
                value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
                placeholder="e.g. What services does DevOpsBD Technologies provide?"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Answer *</label>
              <textarea
                required
                rows={4}
                value={form.answer}
                onChange={(e) => setForm({ ...form, answer: e.target.value })}
                placeholder="Detailed answer explaining company policies, timelines, IP ownership..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-zinc-800">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base transition-all shadow-md flex items-center gap-1.5"
            >
              <Save className="h-4 w-4" />
              <span>{editingIndex !== null ? "Save FAQ" : "Publish FAQ"}</span>
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

      <div className="space-y-3">
        {list.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-2 hover:border-zinc-700 transition-all flex items-start justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono text-sm">Q{idx + 1}.</span>
                {item.question}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed pl-6">{item.answer}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
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
