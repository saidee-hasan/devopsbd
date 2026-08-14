"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { DollarSign, Plus, Edit, Trash2, Save, CheckCircle2 } from "lucide-react";
import { pricingPlans as initialPricing, type PricingPlan } from "@/data/portfolio";
import { API_URL } from "@/lib/api";

export default function AdminPricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [form, setForm] = useState<PricingPlan>({
    name: "",
    tagline: "",
    price: "$1,999",
    period: "project base",
    popular: false,
    features: [""],
    cta: "Select Plan",
  });

  const [featuresInput, setFeaturesInput] = useState("");

  const API = API_URL;
  const getToken = () => localStorage.getItem("admin_token");

  const loadPlans = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/pricing`);
      const data = await res.json();
      if (data && data.length > 0) {
        setPlans(data);
      } else {
        setPlans(initialPricing);
      }
    } catch (e) {
      console.error(e);
      setPlans(initialPricing);
    } finally {
      setLoading(false);
    }
  }, [API]);

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      toast.error("Plan Name and Price are required!");
      return;
    }

    const cleanFeatures = featuresInput
      ? featuresInput.split("\n").map((f) => f.trim()).filter(Boolean)
      : form.features;

    const newPlan = {
      ...form,
      features: cleanFeatures.length > 0 ? cleanFeatures : ["Full Enterprise Code Ownership", "24/7 SLA Support"],
    };

    const token = getToken();

    try {
      if (editingIndex !== null) {
        const idToUpdate = (plans[editingIndex] as any)._id;
        if (idToUpdate) {
          await fetch(`${API}/api/pricing/${idToUpdate}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(newPlan)
          });
        }
        toast.success("Pricing plan updated!");
      } else {
        await fetch(`${API}/api/pricing`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(newPlan)
        });
        toast.success("New pricing plan created!");
      }
      loadPlans();
    } catch (e) {
      toast.error("Failed to save pricing plan");
    }

    setShowForm(false);
    resetForm();
  };

  const handleEdit = (idx: number) => {
    const p = plans[idx];
    setEditingIndex(idx);
    setForm(p);
    setFeaturesInput(p.features.join("\n"));
    setShowForm(true);
  };

  const handleDelete = async (idx: number) => {
    const p = plans[idx];
    if (!confirm(`Delete pricing plan "${p.name}"?`)) return;
    
    const idToDelete = (p as any)._id;
    if (idToDelete) {
      try {
        await fetch(`${API}/api/pricing/${idToDelete}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        toast.success("Pricing plan removed.");
        loadPlans();
      } catch (e) {
        toast.error("Failed to delete pricing plan.");
      }
    } else {
      const updated = plans.filter((_, i) => i !== idx);
      setPlans(updated);
      toast.success("Pricing plan removed (local only).");
    }
  };

  const resetForm = () => {
    setEditingIndex(null);
    setForm({
      name: "",
      tagline: "",
      price: "",
      period: "project base",
      popular: false,
      features: [""],
      cta: "Select Plan",
    });
    setFeaturesInput("");
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#030712] via-[#0f172a] to-[#1e293b] p-6">
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto space-y-6 backdrop-blur-md bg-black/30 rounded-2xl p-6">
        <Toaster position="top-right" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-emerald-400" />
              Pricing Plans & Packages Manager
            </h1>
            <p className="mt-1 text-base text-zinc-300">
              Manage your service packages, pricing tiers, features, and highlight the most popular plans.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base transition-all shadow-lg active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>{showForm ? "Cancel" : "Add Pricing Plan"}</span>
          </button>
        </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-xl border border-zinc-700 bg-black/40 backdrop-blur-lg p-6 sm:p-8 space-y-5 shadow-lg animate-fade-in">
          <h2 className="text-lg font-semibold text-white border-b border-zinc-700 pb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            {editingIndex !== null ? "Edit Pricing Plan" : "Add New Pricing Plan"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Plan Name *</label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Enterprise Custom"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Billing Period</label>
              <input
                type="text"
                value={form.period}
                onChange={(e) => setForm({ ...form, period: e.target.value })}
                placeholder="e.g. project base / per month"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-mono text-zinc-300 font-bold">
                <input
                  type="checkbox"
                  checked={form.popular || false}
                  onChange={(e) => setForm({ ...form, popular: e.target.checked })}
                  className="h-4 w-4 rounded bg-zinc-950 border-zinc-700 text-emerald-500 focus:ring-emerald-500"
                />
                Mark as &quot;Most Popular / Recommended&quot;
              </label>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Tagline</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                placeholder="Target audience / package description..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Included Features (One feature per line)</label>
              <textarea
                rows={4}
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                placeholder="Custom Next.js Frontend&#10;Kubernetes Deployment&#10;24/7 SLA Support"
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
              <span>{editingIndex !== null ? "Save Changes" : "Publish Plan"}</span>
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`rounded-xl border p-5 space-y-3 flex flex-col justify-between transition-all hover:scale-[1.02] ${
              plan.popular
                ? "border-emerald-500 bg-emerald-950/30 shadow-[0_0_25px_rgba(16,185,129,0.2)]"
                : "border-zinc-800 bg-zinc-900/60 hover:border-emerald-600"
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">{plan.name}</h3>
                {plan.popular && (
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-emerald-500 text-zinc-950">
                    POPULAR
                  </span>
                )}
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">{plan.tagline}</p>
              <ul className="pt-2 space-y-1 text-sm text-zinc-400 list-disc list-inside">
                {plan.features.map((f, fIdx) => (
                  <li key={fIdx} className="truncate">{f}</li>
                ))}
              </ul>
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
        {plans.length === 0 && (
          <p className="text-center text-xl text-zinc-300 py-12">No pricing plans configured. Click &quot;Add Pricing Plan&quot; to create one.</p>
        )}
      </div>
    </div>
  );
}
