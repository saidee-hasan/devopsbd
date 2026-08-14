"use client";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

interface Resume {
  _id: string;
  title: string;
  driveLink: string;
  fileUrl: string;
  version: number;
  active: boolean;
  updatedAt: string;
}

export default function AdminResume() {
  const [resume, setResume] = useState<Resume | null>(null);
  const [allResumes, setAllResumes] = useState<Resume[]>([]);
  const [link, setLink] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const API = API_URL;
  const getToken = () => localStorage.getItem("admin_token");

  useEffect(() => {
    fetch(`${API}/api/resume/active`)
      .then((r) => r.json())
      .then((d) => {
        if (d.resume) { setResume(d.resume); setLink(d.resume.driveLink || ""); }
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    const token = getToken();
    if (token) {
      fetch(`${API}/api/resume`, { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((d) => setAllResumes(d.resumes || []))
        .catch(console.error);
    }
  }, [API]);

  const handleSave = async () => {
    const token = getToken();
    if (!token || !link.trim()) return;
    setSaving(true);
    try {
      if (resume) {
        await fetch(`${API}/api/resume/${resume._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ driveLink: link.trim() }),
        });
      } else {
        await fetch(`${API}/api/resume`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ driveLink: link.trim(), title: "Saidee Hasan Resume" }),
        });
      }
      window.location.reload();
    } catch (err) { console.error(err); alert("Failed to save"); }
    finally { setSaving(false); }
  };

  const handleSetActive = async (id: string) => {
    const token = getToken();
    if (!token) return;
    await fetch(`${API}/api/resume/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ active: true }),
    });
    window.location.reload();
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" /></div>;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Resume</h1>
        <p className="mt-0.5 text-base text-zinc-500">Manage your resume via Google Drive link</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-4">
          <h2 className="text-base font-semibold text-zinc-300">
            {resume ? "Update Resume Link" : "Add Resume Link"}
          </h2>
          <div>
            <label className="block text-base font-medium text-zinc-400 mb-1">Google Drive Link</label>
            <input value={link} onChange={(e) => setLink(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-base"
              placeholder="https://drive.google.com/file/d/..." />
            <p className="mt-1.5 text-sm text-zinc-500">Share your PDF via Google Drive and paste the shareable link.</p>
          </div>
          <button onClick={handleSave} disabled={saving || !link.trim()}
            className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-base font-semibold hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50">
            {saving ? "Saving..." : resume ? "Update Resume" : "Save Resume"}
          </button>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-4">
          <h2 className="text-base font-semibold text-zinc-300">Current Active Resume</h2>
          {resume ? (
            <div className="space-y-3">
              <div className="rounded-lg bg-zinc-950/50 p-4 space-y-2">
                <p className="text-base"><span className="text-zinc-500">Version:</span> <span className="font-medium">v{resume.version}</span></p>
                <p className="text-base"><span className="text-zinc-500">Status:</span> <span className="text-emerald-400 font-medium">Active</span></p>
                <p className="text-base"><span className="text-zinc-500">Updated:</span> <span className="text-zinc-300">{new Date(resume.updatedAt).toLocaleDateString()}</span></p>
                {resume.driveLink && (
                  <a href={resume.driveLink} target="_blank" rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-base text-emerald-400 hover:text-emerald-300 underline">
                    Open Resume Drive Link →
                  </a>
                )}
              </div>
            </div>
          ) : (
            <p className="text-base text-zinc-500">No resume uploaded yet.</p>
          )}

          {allResumes.length > 1 && (
            <>
              <h3 className="text-base font-semibold text-zinc-400 pt-2">Previous Versions</h3>
              <div className="space-y-2">
                {allResumes.filter((r) => !r.active).map((r) => (
                  <div key={r._id} className="flex items-center justify-between rounded-lg bg-zinc-950/30 px-4 py-2.5">
                    <div>
                      <p className="text-base text-zinc-400">v{r.version}</p>
                      <p className="text-sm text-zinc-600">{new Date(r.updatedAt).toLocaleDateString()}</p>
                    </div>
                    <button onClick={() => handleSetActive(r._id)}
                      className="rounded-md bg-zinc-800 px-3 py-1.5 text-sm font-medium hover:bg-zinc-700">Set Active</button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
