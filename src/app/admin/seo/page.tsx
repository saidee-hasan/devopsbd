"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Search, Save, Sparkles, CheckCircle2, Globe, FileText } from "lucide-react";
import { companyInfo } from "@/data/portfolio";
import { API_URL } from "@/lib/api";

export interface HomepageSeoData {
  heroBadge: string;
  heroHeadline: string;
  heroSubhead: string;
  heroCtaPrimary: string;
  typingWords: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string;
}

const defaultSeoData: HomepageSeoData = {
  heroBadge: "BUILD • DEPLOY • SCALE",
  heroHeadline: "Build, Scale & Grow Your Business with World-Class AI-powered solutions",
  heroSubhead: companyInfo.heroSubhead,
  heroCtaPrimary: "Get Free Consultation",
  typingWords: [
    "custom web applications.",
    "AI-powered solutions.",
    "cloud infrastructure.",
    "enterprise platforms.",
  ],
  metaTitle: `${companyInfo.fullName} — Enterprise Software Development & Cloud Solutions`,
  metaDescription: companyInfo.heroSubhead,
  keywords: "DevOpsBD, Software Development, Web Applications, Mobile Apps, Cloud Solutions, DevOps Automation",
};

export default function AdminSeoPage() {
  const [data, setData] = useState<HomepageSeoData>(defaultSeoData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [typingInput, setTypingInput] = useState("");

  const API = API_URL;
  const getToken = () => localStorage.getItem("admin_token");

  const loadSeo = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/seo`);
      const data = await res.json();
      if (data && Object.keys(data).length > 0) {
        setData(data);
        setTypingInput(data.typingWords ? data.typingWords.join("\n") : "");
      } else {
        setData(defaultSeoData);
        setTypingInput(defaultSeoData.typingWords.join("\n"));
      }
    } catch (e) {
      console.error(e);
      setData(defaultSeoData);
      setTypingInput(defaultSeoData.typingWords.join("\n"));
    } finally {
      setLoading(false);
    }
  }, [API]);

  useEffect(() => {
    loadSeo();
  }, [loadSeo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const cleanWords = typingInput
      ? typingInput.split("\n").map((w) => w.trim()).filter(Boolean)
      : data.typingWords;

    const updatedData = {
      ...data,
      typingWords: cleanWords.length > 0 ? cleanWords : defaultSeoData.typingWords,
    };

    try {
      const token = getToken();
      await fetch(`${API}/api/seo`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(updatedData)
      });
      toast.success("Homepage content & SEO settings updated successfully!");
    } catch (err) {
      toast.error("Failed to save SEO settings.");
    }

    setSaving(false);
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

      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Search className="h-6 w-6 text-emerald-400" />
            Homepage Content & SEO Metadata Controller
          </h1>
          <p className="mt-1 text-base text-zinc-400">
            Edit homepage hero text, headlines, animated typewriter words, and site-wide SEO metadata.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Homepage Hero Content */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 sm:p-8 space-y-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md">
          <h2 className="text-base font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-400" />
            Homepage Hero Section Content
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Top Badge Text</label>
              <input
                type="text"
                value={data.heroBadge}
                onChange={(e) => setData({ ...data, heroBadge: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Primary CTA Button Text</label>
              <input
                type="text"
                value={data.heroCtaPrimary}
                onChange={(e) => setData({ ...data, heroCtaPrimary: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Main Hero Headline *</label>
              <textarea
                rows={2}
                value={data.heroHeadline}
                onChange={(e) => setData({ ...data, heroHeadline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500 font-bold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Sub-headline Description *</label>
              <textarea
                rows={3}
                value={data.heroSubhead}
                onChange={(e) => setData({ ...data, heroSubhead: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">
                Animated Typewriter Phrases (One per line)
              </label>
              <textarea
                rows={4}
                value={typingInput}
                onChange={(e) => setTypingInput(e.target.value)}
                placeholder="custom web applications.&#10;AI-powered solutions.&#10;cloud infrastructure."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: SEO Meta Titles & Search Optimization */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 sm:p-8 space-y-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md">
          <h2 className="text-base font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-400" />
            SEO Meta Title & Search Engine Settings
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Meta Title Tag *</label>
              <input
                type="text"
                value={data.metaTitle}
                onChange={(e) => setData({ ...data, metaTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Meta Description *</label>
              <textarea
                rows={3}
                value={data.metaDescription}
                onChange={(e) => setData({ ...data, metaDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Keywords (Comma separated)</label>
              <input
                type="text"
                value={data.keywords}
                onChange={(e) => setData({ ...data, keywords: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base transition-all shadow-lg flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? "Saving..." : "Save Homepage & SEO Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
