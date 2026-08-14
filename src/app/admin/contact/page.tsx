"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Upload, Save, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function AdminContactPage() {
  const [address, setAddress] = useState("Level 8, Tech Tower, Gulshan-2, Dhaka 1212, Bangladesh");
  const [hubs, setHubs] = useState("Remote Hubs: UK, USA, UAE");
  const [phone, setPhone] = useState("+880 1700-000000");
  const [email, setEmail] = useState("contact@devopsbd.com");
  const [social, setSocial] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Placeholder: In a real app you would upload the file and save data via API.
    toast.success("Contact information saved!");
    setSaving(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#030712] via-[#0f172a] to-[#1e293b] p-6">
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10 pointer-events-none" />
      <div className="relative max-w-3xl mx-auto bg-black/30 backdrop-blur-md rounded-2xl p-8">
        <Toaster position="top-right" />
        <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <MapPin className="h-6 w-6 text-emerald-400" /> Contact Management
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1"><MapPin className="inline h-4 w-4 mr-1" />Address</label>
            <textarea
              rows={2}
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full rounded-lg bg-zinc-950 border border-zinc-700 text-white p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1"><MapPin className="inline h-4 w-4 mr-1" />Remote Hubs</label>
            <input
              type="text"
              value={hubs}
              onChange={e => setHubs(e.target.value)}
              className="w-full rounded-lg bg-zinc-950 border border-zinc-700 text-white p-2"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-zinc-400 mb-1"><Phone className="inline h-4 w-4 mr-1" />Phone</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full rounded-lg bg-zinc-950 border border-zinc-700 text-white p-2"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-zinc-400 mb-1"><Mail className="inline h-4 w-4 mr-1" />Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-lg bg-zinc-950 border border-zinc-700 text-white p-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Social Links (comma separated)</label>
            <input
              type="text"
              placeholder="https://twitter.com/..., https://linkedin.com/..."
              value={social}
              onChange={e => setSocial(e.target.value)}
              className="w-full rounded-lg bg-zinc-950 border border-zinc-700 text-white p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1"><Upload className="inline h-4 w-4 mr-1" />Upload Image (optional)</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="text-zinc-400" />
            {file && <p className="mt-1 text-sm text-emerald-300">Selected: {file.name}</p>}
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white font-semibold hover:bg-emerald-500 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Contact"}
            </button>
            <button
              type="button"
              onClick={() => {
                setAddress("Level 8, Tech Tower, Gulshan-2, Dhaka 1212, Bangladesh");
                setHubs("Remote Hubs: UK, USA, UAE");
                setPhone("+880 1700-000000");
                setEmail("contact@devopsbd.com");
                setSocial("");
                setFile(null);
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-slate-300 hover:bg-zinc-700"
            >
              <X className="h-4 w-4" /> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
