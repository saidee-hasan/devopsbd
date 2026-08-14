"use client";

import { useState } from "react";
import { companyInfo } from "@/data/portfolio";
import { Link as LinkIcon, Plus, Trash2, Save, CheckCircle2, Globe, Phone, Mail, MapPin, Share2 } from "lucide-react";

interface FooterLink {
  id: string;
  name: string;
  href: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

const loadFooterFromStorage = (() => {
  let cached: any = undefined;
  return () => {
    if (cached !== undefined) return cached;
    try {
      const stored = localStorage.getItem("devopsbd_footer_data");
      cached = stored ? JSON.parse(stored) : null;
    } catch {
      cached = null;
    }
    return cached;
  };
})();

export default function AdminFooterPage() {
  const [quickLinks, setQuickLinks] = useState<FooterLink[]>(() =>
    loadFooterFromStorage()?.quickLinks ?? [
      { id: "1", name: "Our History", href: "/about" },
      { id: "2", name: "About Us", href: "/about" },
      { id: "3", name: "Our Services", href: "/services" },
      { id: "4", name: "Professional Team", href: "/team" },
      { id: "5", name: "Contact Us", href: "/contact" },
    ]
  );

  const [serviceLinks, setServiceLinks] = useState<FooterLink[]>(() =>
    loadFooterFromStorage()?.serviceLinks ?? [
      { id: "1", name: "Website Development", href: "#services" },
      { id: "2", name: "Web Application Development", href: "#services" },
      { id: "3", name: "Mobile App Development", href: "#services" },
      { id: "4", name: "DevOps & Cloud Solutions", href: "#services" },
      { id: "5", name: "Custom Software Engineering", href: "#services" },
    ]
  );

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() =>
    loadFooterFromStorage()?.socialLinks ?? [
      { platform: "facebook", url: companyInfo.social.facebook },
      { platform: "twitter", url: companyInfo.social.twitter },
      { platform: "linkedin", url: companyInfo.social.linkedin },
      { platform: "youtube", url: companyInfo.social.youtube },
      { platform: "github", url: companyInfo.social.github },
    ]
  );

  const [contactDetails, setContactDetails] = useState(() =>
    loadFooterFromStorage()?.contactDetails ?? {
      email: companyInfo.email,
      phone: companyInfo.phone,
      address: companyInfo.address,
      copyright: "DevOpsBD Technologies Ltd © 2026. All rights reserved.",
      footerDesc: "DevOpsBD Technologies Ltd helps startups and enterprise businesses build scalable cloud infrastructure, custom software, modern UI/UX designs, and AI solutions.",
    }
  );

  const [newQuick, setNewQuick] = useState({ name: "", href: "" });
  const [newService, setNewService] = useState({ name: "", href: "" });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    const dataToSave = {
      quickLinks,
      serviceLinks,
      socialLinks,
      contactDetails,
    };
    localStorage.setItem("devopsbd_footer_data", JSON.stringify(dataToSave));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const addQuickLink = () => {
    if (!newQuick.name || !newQuick.href) return;
    setQuickLinks([...quickLinks, { id: Date.now().toString(), name: newQuick.name, href: newQuick.href }]);
    setNewQuick({ name: "", href: "" });
  };

  const removeQuickLink = (id: string) => {
    setQuickLinks(quickLinks.filter((l) => l.id !== id));
  };

  const addServiceLink = () => {
    if (!newService.name || !newService.href) return;
    setServiceLinks([...serviceLinks, { id: Date.now().toString(), name: newService.name, href: newService.href }]);
    setNewService({ name: "", href: "" });
  };

  const removeServiceLink = (id: string) => {
    setServiceLinks(serviceLinks.filter((l) => l.id !== id));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <LinkIcon className="h-6 w-6 text-emerald-400" />
            Footer & Navigation Links Manager
          </h1>
          <p className="mt-1 text-base text-zinc-400">
            Control all footer quick links, service lists, social media URLs, and contact info displayed on your website.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base transition-all shadow-lg active:scale-95 shrink-0"
        >
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-base font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>Footer settings and links saved successfully! Live website reflects changes immediately.</span>
        </div>
      )}

      {/* Grid Layout for Footer Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Quick Links Column */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
            <LinkIcon className="h-4 w-4 text-emerald-400" />
            Footer Quick Links Column
          </h2>

          <div className="space-y-2">
            {quickLinks.map((link) => (
              <div key={link.id} className="flex items-center justify-between gap-2 p-3 rounded-lg bg-zinc-800/40 border border-zinc-700/50">
                <div>
                  <div className="text-base font-semibold text-white">{link.name}</div>
                  <div className="text-sm text-zinc-400 font-mono">{link.href}</div>
                </div>
                <button
                  type="button"
                  onClick={() => removeQuickLink(link.id)}
                  className="p-1.5 rounded-2xl hover:bg-red-500/20 text-red-400 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Quick Link Form */}
          <div className="pt-2 flex flex-col gap-2">
            <input
              type="text"
              placeholder="Link Title (e.g. About Us)"
              value={newQuick.name}
              onChange={(e) => setNewQuick({ ...newQuick, name: e.target.value })}
              className="px-3.5 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="URL / Path (e.g. /about)"
                value={newQuick.href}
                onChange={(e) => setNewQuick({ ...newQuick, href: e.target.value })}
                className="flex-1 px-3.5 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={addQuickLink}
                className="px-4 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 font-semibold text-sm border border-emerald-500/30 flex items-center gap-1 shrink-0"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Services Links Column */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Globe className="h-4 w-4 text-emerald-400" />
            Footer Service List Column
          </h2>

          <div className="space-y-2">
            {serviceLinks.map((link) => (
              <div key={link.id} className="flex items-center justify-between gap-2 p-3 rounded-lg bg-zinc-800/40 border border-zinc-700/50">
                <div>
                  <div className="text-base font-semibold text-white">{link.name}</div>
                  <div className="text-sm text-zinc-400 font-mono">{link.href}</div>
                </div>
                <button
                  type="button"
                  onClick={() => removeServiceLink(link.id)}
                  className="p-1.5 rounded-2xl hover:bg-red-500/20 text-red-400 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Service Link Form */}
          <div className="pt-2 flex flex-col gap-2">
            <input
              type="text"
              placeholder="Service Title (e.g. Website Development)"
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              className="px-3.5 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="URL / Anchor (e.g. #services)"
                value={newService.href}
                onChange={(e) => setNewService({ ...newService, href: e.target.value })}
                className="flex-1 px-3.5 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={addServiceLink}
                className="px-4 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 font-semibold text-sm border border-emerald-500/30 flex items-center gap-1 shrink-0"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Social Media & Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Social Links */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Share2 className="h-4 w-4 text-emerald-400" />
            Social Media Handles
          </h2>

          <div className="space-y-3">
            {socialLinks.map((soc, idx) => (
              <div key={soc.platform} className="flex items-center gap-3">
                <span className="text-sm font-mono font-bold capitalize text-zinc-400 w-24 shrink-0">
                  {soc.platform}:
                </span>
                <input
                  type="text"
                  value={soc.url}
                  onChange={(e) => {
                    const updated = [...socialLinks];
                    updated[idx].url = e.target.value;
                    setSocialLinks(updated);
                  }}
                  className="flex-1 px-3.5 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info & Footer Settings */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
            <MapPin className="h-4 w-4 text-emerald-400" />
            Footer Contact & Copyright Info
          </h2>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-mono font-semibold text-zinc-400 block mb-1">Company Description:</label>
              <textarea
                rows={2}
                value={contactDetails.footerDesc}
                onChange={(e) => setContactDetails({ ...contactDetails, footerDesc: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-mono font-semibold text-zinc-400 block mb-1">Email Address:</label>
                <input
                  type="text"
                  value={contactDetails.email}
                  onChange={(e) => setContactDetails({ ...contactDetails, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
              <div>
                <label className="text-sm font-mono font-semibold text-zinc-400 block mb-1">Phone Number:</label>
                <input
                  type="text"
                  value={contactDetails.phone}
                  onChange={(e) => setContactDetails({ ...contactDetails, phone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-mono font-semibold text-zinc-400 block mb-1">Address Location:</label>
              <input
                type="text"
                value={contactDetails.address}
                onChange={(e) => setContactDetails({ ...contactDetails, address: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-sm font-mono font-semibold text-zinc-400 block mb-1">Copyright Bar Text:</label>
              <input
                type="text"
                value={contactDetails.copyright}
                onChange={(e) => setContactDetails({ ...contactDetails, copyright: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
