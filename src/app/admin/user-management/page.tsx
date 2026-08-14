"use client";
import React from "react";
import { ShieldCheck, Users } from "lucide-react";

export default function UserManagementPage() {
  return (
    <div className="p-8 bg-[#030712] min-h-screen text-slate-300">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Users className="w-6 h-6 text-[#D4F12A]" />
        User Management
      </h1>
      <p className="text-lg">Here you can view, create, edit, and delete system users.</p>
      {/* Placeholder content – you can replace with a table or cards later */}
      <div className="mt-8 p-6 rounded-xl border border-zinc-800 bg-zinc-900/30">
        <p className="text-slate-400">No users yet. Use the API or future UI to manage users.</p>
      </div>
    </div>
  );
}
