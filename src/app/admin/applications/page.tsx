"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FileText, Search, ExternalLink, CheckCircle, Clock, XCircle, UserCheck } from "lucide-react";
import { API_URL } from "@/lib/api";

export interface JobApplication {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  position: string;
  experienceYears: string;
  resumeUrl: string;
  portfolioUrl?: string;
  coverNote?: string;
  status: "Pending" | "Shortlisted" | "Interviewing" | "Rejected" | "Hired";
  appliedAt: string;
}

const defaultApplications: JobApplication[] = [
  {
    id: "app-101",
    applicantName: "Mahmud Hasan",
    email: "mahmud.dev@gmail.com",
    phone: "+880 1712 345678",
    position: "Senior Frontend Developer (Next.js / TypeScript)",
    experienceYears: "5+ Years",
    resumeUrl: "https://drive.google.com",
    portfolioUrl: "https://github.com/mahmud",
    coverNote: "Passionate Senior Next.js engineer with 5+ years building scalable React apps.",
    status: "Shortlisted",
    appliedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "app-102",
    applicantName: "Sumiya Akter",
    email: "sumiya.uiux@design.io",
    phone: "+880 1819 876543",
    position: "UI/UX Product Designer",
    experienceYears: "4 Years",
    resumeUrl: "https://drive.google.com",
    portfolioUrl: "https://dribbble.com",
    coverNote: "Experienced SaaS product designer with expertise in Figma design systems.",
    status: "Pending",
    appliedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
];

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const API = API_URL;
  const getToken = () => localStorage.getItem("admin_token");

  const loadApplications = useCallback(async () => {
    try {
      const token = getToken();
      const res = await fetch(`${API}/api/applications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data && data.length > 0) {
        setApplications(data);
      } else {
        setApplications(defaultApplications);
      }
    } catch (e) {
      console.error(e);
      setApplications(defaultApplications);
    } finally {
      setLoading(false);
    }
  }, [API]);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const handleStatusChange = async (id: string, newStatus: JobApplication["status"]) => {
    try {
      const token = getToken();
      await fetch(`${API}/api/applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus })
      });
      toast.success(`Application status updated to ${newStatus}`);
      loadApplications();
    } catch (e) {
      toast.error("Failed to update status");
      // Fallback to local state update if DB fetch fails
      const updated = applications.map((app) => (app.id === id ? { ...app, status: newStatus } : app));
      setApplications(updated);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application record?")) return;
    try {
      const token = getToken();
      await fetch(`${API}/api/applications/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Application deleted.");
      loadApplications();
    } catch (e) {
      toast.error("Failed to delete application");
      const updated = applications.filter((app) => app.id !== id);
      setApplications(updated);
    }
  };

  const filteredApps = applications.filter((app) => {
    const matchesStatus = filterStatus === "All" || app.status === filterStatus;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      app.applicantName.toLowerCase().includes(query) ||
      app.email.toLowerCase().includes(query) ||
      app.position.toLowerCase().includes(query);
    return matchesStatus && matchesQuery;
  });

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <Toaster position="top-right" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <FileText className="h-6 w-6 text-emerald-400" />
            Job Applications & Resume Submissions
          </h1>
          <p className="mt-1 text-base text-zinc-400">
            Review candidate job applications, inspect resumes, and update recruitment pipeline statuses.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidates or position..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-sm text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {["All", "Pending", "Shortlisted", "Interviewing", "Hired", "Rejected"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-sm font-mono font-bold transition-all shrink-0 border ${
                filterStatus === status
                  ? "bg-emerald-600 text-white border-emerald-500"
                  : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/50">
        <table className="w-full text-base text-left">
          <thead className="border-b border-zinc-800 bg-zinc-900 text-sm font-mono uppercase text-zinc-400">
            <tr>
              <th className="px-5 py-4">Candidate</th>
              <th className="px-5 py-4">Position</th>
              <th className="px-5 py-4">Experience</th>
              <th className="px-5 py-4">Resume / Portfolio</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {filteredApps.map((app) => (
              <tr key={app.id} className="hover:bg-zinc-900/80 transition-colors">
                <td className="px-5 py-4">
                  <div className="font-bold text-white">{app.applicantName}</div>
                  <div className="text-sm text-zinc-400 font-mono">{app.email}</div>
                  <div className="text-sm text-zinc-500 font-mono">{app.phone}</div>
                </td>
                <td className="px-5 py-4">
                  <div className="font-semibold text-emerald-400 text-sm">{app.position}</div>
                  <div className="text-sm text-zinc-500 font-mono">
                    Applied: {new Date(app.appliedAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-5 py-4 font-mono text-sm text-zinc-300">
                  {app.experienceYears}
                </td>
                <td className="px-5 py-4 space-y-1">
                  {app.resumeUrl && (
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-emerald-400 hover:underline font-mono"
                    >
                      <ExternalLink className="h-3 w-3" /> Resume PDF
                    </a>
                  )}
                  {app.portfolioUrl && (
                    <div className="text-sm">
                      <a
                        href={app.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline font-mono"
                      >
                        GitHub / Portfolio →
                      </a>
                    </div>
                  )}
                </td>
                <td className="px-5 py-4">
                  <select
                    value={app.status}
                    onChange={(e) => {
                      const id = (app as any)._id || app.id;
                      handleStatusChange(id, e.target.value as JobApplication["status"]);
                    }}
                    className="px-2.5 py-1.5 rounded-xl bg-zinc-950 border border-zinc-700 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Pending">⏳ Pending</option>
                    <option value="Shortlisted">⭐ Shortlisted</option>
                    <option value="Interviewing">💬 Interviewing</option>
                    <option value="Hired">🎉 Hired</option>
                    <option value="Rejected">✕ Rejected</option>
                  </select>
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => handleDelete((app as any)._id || app.id)}
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-red-600/20 text-zinc-400 hover:text-red-400 transition-colors text-sm"
                    title="Delete record"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredApps.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-zinc-500 font-mono text-sm">
                  No job applications matching the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
