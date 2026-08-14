"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UserCheck, Plus, Shield, Trash2, Save, CheckCircle2 } from "lucide-react";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Engineering Lead" | "Hiring Manager" | "Content Editor";
  status: "Active" | "Inactive";
  createdAt: string;
}

const defaultUsers: AdminUser[] = [
  {
    id: "usr-1",
    name: "Saidee Hasan",
    email: "admin@devopsbd.com",
    role: "Super Admin",
    status: "Active",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "usr-2",
    name: "Tanvir Rahman",
    email: "tanvir@devopsbd.com",
    role: "Engineering Lead",
    status: "Active",
    createdAt: "2024-02-15T00:00:00.000Z",
  },
  {
    id: "usr-3",
    name: "Zubair Al-Mamun",
    email: "hr@devopsbd.com",
    role: "Hiring Manager",
    status: "Active",
    createdAt: "2024-03-10T00:00:00.000Z",
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const nowRef = useRef(new Date().toISOString());

  const [form, setForm] = useState<AdminUser>({
    id: "",
    name: "",
    email: "",
    role: "Content Editor",
    status: "Active",
    createdAt: new Date().toISOString(),
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("devopsbd_admin_users");
      if (stored) {
        setUsers(JSON.parse(stored));
      } else {
        setUsers(defaultUsers);
        localStorage.setItem("devopsbd_admin_users", JSON.stringify(defaultUsers));
      }
    } catch (e) {
      console.error(e);
      setUsers(defaultUsers);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveUsers = (updated: AdminUser[]) => {
    setUsers(updated);
    localStorage.setItem("devopsbd_admin_users", JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Name and Email are required!");
      return;
    }

    const newUser: AdminUser = {
      ...form,
      id: form.id || `usr-${crypto.randomUUID()}`,
      createdAt: form.createdAt || nowRef.current,
    };

    if (editingIndex !== null) {
      const updated = [...users];
      updated[editingIndex] = newUser;
      saveUsers(updated);
      toast.success("User account updated!");
    } else {
      const updated = [...users, newUser];
      saveUsers(updated);
      toast.success("New admin user created!");
    }

    setShowForm(false);
    resetForm();
  };

  const handleEdit = (idx: number) => {
    setEditingIndex(idx);
    setForm(users[idx]);
    setShowForm(true);
  };

  const handleDelete = (idx: number) => {
    const user = users[idx];
    if (user.role === "Super Admin" && users.filter((u) => u.role === "Super Admin").length <= 1) {
      toast.error("Cannot delete the primary Super Admin account!");
      return;
    }
    if (!confirm(`Delete user "${user.name}"?`)) return;
    const updated = users.filter((_, i) => i !== idx);
    saveUsers(updated);
    toast.success("User removed.");
  };

  const resetForm = () => {
    setEditingIndex(null);
    setForm({
      id: "",
      name: "",
      email: "",
      role: "Content Editor",
      status: "Active",
      createdAt: new Date().toISOString(),
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
            <UserCheck className="h-6 w-6 text-emerald-400" />
            User Management & Administrative Access
          </h1>
          <p className="mt-1 text-base text-zinc-400">
            Control dashboard user accounts, assign roles, and manage system permissions.
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
          <span>{showForm ? "Close Form" : "Add Admin User"}</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 sm:p-8 space-y-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md animate-fade-in">
          <h2 className="text-base font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            {editingIndex !== null ? "Edit User Account" : "Create New Admin User"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Full Name *</label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Tanvir Rahman"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Email Address *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="e.g. tanvir@devopsbd.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Administrative Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value as AdminUser["role"] })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Engineering Lead">Engineering Lead</option>
                <option value="Hiring Manager">Hiring Manager</option>
                <option value="Content Editor">Content Editor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-mono font-bold text-zinc-400 mb-1">Account Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as AdminUser["status"] })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-base text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-zinc-800">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base transition-all shadow-md flex items-center gap-1.5"
            >
              <Save className="h-4 w-4" />
              <span>{editingIndex !== null ? "Save Changes" : "Create User Account"}</span>
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

      {/* Users Grid / List */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {users.map((u, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-3 flex flex-col justify-between hover:border-zinc-700 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {u.role}
                </span>
                <span className={`text-xs font-mono font-bold ${u.status === "Active" ? "text-emerald-400" : "text-zinc-500"}`}>
                  {u.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-white">{u.name}</h3>
              <p className="text-sm text-zinc-400 font-mono">{u.email}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
              <span className="text-sm font-mono text-zinc-500">
                Created {new Date(u.createdAt).toLocaleDateString()}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(idx)}
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-emerald-600/20 text-zinc-300 hover:text-emerald-400 transition-colors text-sm"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(idx)}
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-red-600/20 text-zinc-300 hover:text-red-400 transition-colors text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
