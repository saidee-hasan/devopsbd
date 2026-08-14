"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github, Calendar, Tag, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollBackground from "@/components/ScrollBackground";
import AITwinChat from "@/components/AITwinChat";
import { companyPortfolio, type CompanyProject } from "@/data/portfolio";
import { API_URL } from "@/lib/api";

export default function ProjectDetailClient() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<CompanyProject | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then((r) => r.json())
      .then((data) => {
        const projects = data.projects || data || [];
        if (Array.isArray(projects)) {
          const proj = projects.find(
            (p: { slug?: string; _id?: string; id?: string }) =>
              (p.slug || p._id || p.id) === slug
          );
          if (proj) {
            setProject({
              slug: proj.slug || slug,
              title: proj.title,
              category: proj.category || "",
              summary: proj.summary || proj.description || "",
              description: proj.description || "",
              impact: proj.impact || "",
              client: proj.client || "",
              timeline: proj.timeline || "",
              complexity: proj.complexity || "",
              tech: proj.tech || [],
              images: proj.images || [],
              imageLinks: proj.imageLinks || proj.images || [],
              github: proj.github || "",
              live: proj.live || "",
            });
          }
        }
      })
      .catch(() => {
        const fallback = companyPortfolio.find((p) => p.slug === slug);
        if (fallback) setProject(fallback);
      });
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0A111C] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Project Not Found</h1>
          <Link href="/portfolio" className="text-[#D4F12A] hover:underline font-bold">View All Projects</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A111C] text-white">
      <ScrollBackground />
      <Navbar />
      <main className="pt-32 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-[#D4F12A] mb-8 font-mono">
          <ArrowRight className="w-3 h-3 rotate-180" /> Back to Portfolio
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#D4F12A]/10 border border-[#D4F12A]/30 text-xs font-mono text-[#D4F12A] font-bold">{project.category}</span>
            {project.timeline && (
              <span className="flex items-center gap-1 text-xs font-mono text-zinc-500">
                <Calendar className="w-3 h-3" /> {project.timeline}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">{project.title}</h1>
          <p className="text-lg text-zinc-300 leading-relaxed mb-8">{project.summary || project.description}</p>

          {project.imageLinks && project.imageLinks.length > 0 && (
            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-white/[0.08] mb-10">
              <Image src={project.imageLinks[0]} alt={project.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-3 mb-10">
            {project.client && (
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <h3 className="text-sm font-mono text-[#D4F12A] uppercase tracking-wider mb-2">Client</h3>
                <p className="text-base text-zinc-300 font-medium">{project.client}</p>
              </div>
            )}
            {project.impact && (
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <h3 className="text-sm font-mono text-[#D4F12A] uppercase tracking-wider mb-2">Impact</h3>
                <p className="text-base text-zinc-300 font-medium">{project.impact}</p>
              </div>
            )}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <h3 className="text-sm font-mono text-[#D4F12A] uppercase tracking-wider mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech?.map((t: string) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-xs font-mono text-zinc-400 border border-white/5">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {(project.github || project.live) && (
            <div className="flex gap-4 mb-10">
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4F12A] text-slate-950 font-bold text-sm hover:bg-lime-400 transition-colors">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white font-bold text-sm hover:bg-white/10 transition-colors">
                  <Github className="w-4 h-4" /> Source Code
                </a>
              )}
            </div>
          )}
        </motion.div>
      </main>
      <Footer />
      <AITwinChat />
    </div>
  );
}
