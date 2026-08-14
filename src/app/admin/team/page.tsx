"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { Users, Plus, Edit, Trash2, Save, UserCheck, ShieldCheck, CheckCircle2 } from "lucide-react";
import { teamMembers as initialTeamMembers, teamDepartments, type TeamMember } from "@/data/portfolio";
import { API_URL } from "@/lib/api";

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [form, setForm] = useState<TeamMember>({
    name: "",
    role: "",
    department: "Software Engineers",
    experience: "5+ Years",
    skills: [],
    avatar: "/images/team/member.png",
  });

  const [skillsInput, setSkillsInput] = useState("");
  const [uploading, setUploading] = useState(false);

  const API = API_URL;
  const getToken = () => localStorage.getItem("admin_token");

  const loadTeam = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/team`);
      const data = await res.json();
      if (data && data.length > 0) {
        setTeam(data);
      } else {
        setTeam(initialTeamMembers);
      }
    } catch (e) {
      console.error(e);
      setTeam(initialTeamMembers);
    } finally {
      setLoading(false);
    }
  }, [API]);

  useEffect(() => {
    loadTeam();
  }, [loadTeam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.role) {
      toast.error("Name and Role are required!");
      return;
    }

    const skillsArray = skillsInput
      ? skillsInput.split(",").map((s) => s.trim()).filter(Boolean)
      : form.skills;

    const newMember = {
      ...form,
      skills: skillsArray.length > 0 ? skillsArray : ["Engineering Leadership", "Product Strategy"],
      avatar: form.avatar || "/images/team/member.png",
    };

    const token = getToken();

    try {
      if (editingIndex !== null) {
        const idToUpdate = (team[editingIndex] as any)._id;
        if (idToUpdate) {
          await fetch(`${API}/api/team/${idToUpdate}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(newMember)
          });
        }
        toast.success(`Updated ${form.name}'s profile!`);
      } else {
        await fetch(`${API}/api/team`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(newMember)
        });
        toast.success(`Added ${form.name} to the team!`);
      }
      loadTeam();
    } catch (e) {
      toast.error("Failed to save team member");
    }

    setShowForm(false);
    resetForm();
  };

  const handleEdit = (idx: number) => {
    const member = team[idx];
    setEditingIndex(idx);
    setForm(member);
    setSkillsInput(member.skills.join(", "));
    setShowForm(true);
  };

  const handleDelete = async (idx: number) => {
    const member = team[idx];
    if (!confirm(`Are you sure you want to remove ${member.name} from the team?`)) return;
    
    const idToDelete = (member as any)._id;
    if (idToDelete) {
      try {
        await fetch(`${API}/api/team/${idToDelete}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        toast.success("Team member removed.");
        loadTeam();
      } catch (e) {
        toast.error("Failed to remove member.");
      }
    } else {
      const updated = team.filter((_, i) => i !== idx);
      setTeam(updated);
      toast.success("Team member removed (local only).");
    }
  };

  const resetForm = () => {
    setEditingIndex(null);
    setForm({
      name: "",
      role: "",
      department: "Software Engineers",
      experience: "5+ Years",
      skills: [],
      avatar: "/images/team/member.png",
    });
    setSkillsInput("");
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

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Users className="h-6 w-6 text-emerald-400" />
            Company Team & Executives Manager
          </h1>
          <p className="mt-1 text-base text-zinc-400">
            Add, edit, or remove executive leads, software engineers, DevOps architects, and team profiles.
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
          <span>{showForm ? "Close Form" : "Add Team Member"}</span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 sm:p-8 space-y-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md animate-fade-in">
          <h2 className="text-base font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            {editingIndex !== null ? "Edit Team Member Profile" : "Add New Team Member"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Full Name *</label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Saidee Hasan"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Role Title *</label>
              <input
                required
                type="text"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="e.g. Founder & Chief Executive Officer (CEO)"
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
                {teamDepartments.filter((d) => d !== "All").map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Years of Experience</label>
              <input
                type="text"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                placeholder="e.g. 10+ Years"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Core Skills (comma-separated)</label>
              <input
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="Cloud Architecture, Kubernetes, Distributed Systems, Node.js"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Avatar Image Upload</label>
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
                      const res = await fetch(`${API}/api/upload/cloudinary?folder=team`, {
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
                  <button type="button" onClick={() => setForm({ ...form, avatar: "/images/team/member.png" })}
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
              <span>{editingIndex !== null ? "Save Changes" : "Save Team Member"}</span>
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

      {/* Grid of Team Members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {team.map((member, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-4 hover:border-zinc-700 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-zinc-800 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 font-mono text-base overflow-hidden shrink-0">
                  {member.avatar && member.avatar.startsWith("http") ? (
                    <Image src={member.avatar} alt={member.name} width={48} height={48} className="object-cover" />
                  ) : (
                    member.name.slice(0, 2).toUpperCase()
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold text-white truncate">{member.name}</h3>
                  <p className="text-sm text-emerald-400 font-mono font-semibold truncate">{member.role}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm font-mono text-zinc-400 pt-1 border-t border-zinc-800/80">
                <span>{member.department}</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">{member.experience}</span>
              </div>

              <div className="flex flex-wrap gap-1 pt-1">
                {member.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-800/80">
              <button
                type="button"
                onClick={() => handleEdit(idx)}
                className="p-2 rounded-xl bg-zinc-800 hover:bg-emerald-600/20 text-zinc-300 hover:text-emerald-400 transition-colors"
                title="Edit member"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(idx)}
                className="p-2 rounded-xl bg-zinc-800 hover:bg-red-600/20 text-zinc-300 hover:text-red-400 transition-colors"
                title="Delete member"
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
