"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Cpu, Plus, Edit, Trash2, Save, CheckCircle2 } from "lucide-react";
import { services as initialServices, type ServiceItem } from "@/data/portfolio";
import { API_URL } from "@/lib/api";

export default function AdminServicesPage() {
  const [servicesList, setServicesList] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [form, setForm] = useState<ServiceItem>({
    id: "",
    icon: "Globe",
    title: "",
    description: "",
    features: [""],
    cta: "Learn More",
  });

  const [featuresInput, setFeaturesInput] = useState("");

  const API = API_URL;
  const getToken = () => localStorage.getItem("admin_token");

  const loadServices = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/services`);
      const data = await res.json();
      if (data && data.length > 0) {
        setServicesList(data);
      } else {
        setServicesList(initialServices);
      }
    } catch (e) {
      console.error(e);
      setServicesList(initialServices);
    } finally {
      setLoading(false);
    }
  }, [API]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      toast.error("Service Title and Description are required!");
      return;
    }

    const cleanFeatures = featuresInput
      ? featuresInput.split("\n").map((f) => f.trim()).filter(Boolean)
      : form.features;

    const serviceId = form.id || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const newService = {
      ...form,
      id: serviceId,
      features: cleanFeatures.length > 0 ? cleanFeatures : ["High Performance Engineering", "24/7 SLA Support"],
    };

    const token = getToken();

    try {
      if (editingIndex !== null) {
        const idToUpdate = (servicesList[editingIndex] as any)._id;
        if (idToUpdate) {
          await fetch(`${API}/api/services/${idToUpdate}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(newService)
          });
        }
        toast.success("Service updated!");
      } else {
        await fetch(`${API}/api/services`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(newService)
        });
        toast.success("New Service created!");
      }
      loadServices();
    } catch (e) {
      toast.error("Failed to save service");
    }

    setShowForm(false);
    resetForm();
  };

  const handleEdit = (idx: number) => {
    const s = servicesList[idx];
    setEditingIndex(idx);
    setForm(s);
    setFeaturesInput(s.features.join("\n"));
    setShowForm(true);
  };

  const handleDelete = async (idx: number) => {
    const s = servicesList[idx];
    if (!confirm(`Delete service "${s.title}"?`)) return;
    
    const idToDelete = (s as any)._id;
    if (idToDelete) {
      try {
        await fetch(`${API}/api/services/${idToDelete}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        toast.success("Service deleted.");
        loadServices();
      } catch (e) {
        toast.error("Failed to delete service.");
      }
    } else {
      const updated = servicesList.filter((_, i) => i !== idx);
      setServicesList(updated);
      toast.success("Service deleted (local only).");
    }
  };

  const resetForm = () => {
    setEditingIndex(null);
    setForm({
      id: "",
      icon: "Globe",
      title: "",
      description: "",
      features: [""],
      cta: "Get Consultation",
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
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <Toaster position="top-right" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Cpu className="h-6 w-6 text-emerald-400" />
            Engineering Services Manager
          </h1>
          <p className="mt-1 text-base text-zinc-400">
            Control all services, features, descriptions, and CTAs displayed across the site.
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
          <span>{showForm ? "Close Form" : "Add Service"}</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 sm:p-8 space-y-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md animate-fade-in">
          <h2 className="text-base font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            {editingIndex !== null ? "Edit Service" : "Add New Service"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Service Title *</label>
              <input
                required
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. AI-Powered Enterprise Automation"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">CTA Button Text</label>
              <input
                type="text"
                value={form.cta}
                onChange={(e) => setForm({ ...form, cta: e.target.value })}
                placeholder="e.g. Get Free Architecture Review"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Service Description *</label>
              <textarea
                required
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Detailed summary of value delivered to enterprise clients..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Key Features (One feature per line)</label>
              <textarea
                rows={4}
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                placeholder="Microservices Architecture&#10;Custom Next.js / React Frontend&#10;24/7 SLA Monitoring"
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
              <span>{editingIndex !== null ? "Save Service" : "Publish Service"}</span>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {servicesList.map((service, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-3 flex flex-col justify-between hover:border-zinc-700 transition-all"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                ID: {service.id}
              </span>
              <h3 className="text-base font-bold text-white">{service.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{service.description}</p>
              <ul className="pt-2 space-y-1 text-sm text-zinc-400 list-disc list-inside">
                {service.features.slice(0, 3).map((f, fIdx) => (
                  <li key={fIdx} className="truncate">{f}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
              <span className="text-sm font-mono text-zinc-400">CTA: {service.cta}</span>
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
