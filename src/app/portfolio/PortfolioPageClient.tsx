"use client";
import { API_URL } from "@/lib/api";
import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Sparkles,
  TrendingUp,
  Building,
  Maximize2,
  Layers,
  ShieldCheck,
  Cpu,
  ArrowRight,
  MessageSquareQuote,
  CheckCircle2,
  X,
  Filter,
  ExternalLink,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollBackground from "@/components/ScrollBackground";
import AITwinChat from "@/components/AITwinChat";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import ProjectImageViewer from "@/components/ProjectImageViewer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { companyPortfolio, portfolioCategories, type CompanyProject, stats } from "@/data/portfolio";

const PROJECT_IMAGE_SIZES = "(min-width: 1536px) 42rem, (min-width: 1024px) 40vw, 100vw";

function ProjectPreviewImage({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="aspect-[16/10] w-full bg-zinc-950 p-1">
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={PROJECT_IMAGE_SIZES}
          className="rounded-lg object-contain object-center opacity-90 transition-all duration-500 group-hover/img:opacity-100 pointer-events-none"
          draggable={false}
        />
      </div>
    </div>
  );
}

export default function PortfolioPageClient() {
  const [projectsList, setProjectsList] = useState<CompanyProject[]>(companyPortfolio);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const [viewerState, setViewerState] = useState<{ open: boolean; project: CompanyProject | null; index: number }>({
    open: false,
    project: null,
    index: 0,
  });

  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        if (data.projects && data.projects.length > 0) {
          setProjectsList(data.projects);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch custom projects from server:", err);
      });
  }, []);

  const allTechStack = useMemo(() => {
    const techSet = new Set<string>();
    projectsList.forEach((p) => p.tech.forEach((t) => techSet.add(t)));
    return Array.from(techSet);
  }, [projectsList]);

  const filteredProjects = useMemo(() => {
    return projectsList.filter((project) => {
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
      const matchesTech = !selectedTech || project.tech.includes(selectedTech);
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.summary.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.tech.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesTech && matchesSearch;
    });
  }, [projectsList, searchQuery, selectedCategory, selectedTech]);

  const handleOpenViewer = useCallback((project: CompanyProject, index: number) => {
    setViewerState({ open: true, project, index });
  }, []);

  const activeViewerProject = viewerState.project;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <ScrollBackground />
      <Navbar />

      <main className="flex-1 pt-28 pb-20 relative z-10" id="main-content">
        {/* Header Hero */}
        <section className="container-narrow text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-subtle border border-primary/30 text-sm font-mono text-primary mb-6 shadow-[0_0_15px_rgba(41,214,185,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Case Studies & Software Assets</span>
            </div>

            <h1 className="text-5xl sm:text-5xl font-black tracking-tight mb-6 leading-tight">
              Enterprise Software &
              <span className="text-gradient">Engineering Portfolio</span>
            </h1>

            <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium mb-10">
              Explore production software platforms, multi-tenant SaaS architectures, fintech payment engines, telehealth ERPs, and cloud solutions built by DevOpsBD Technologies.
            </p>

            {/* Stats Counter Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl glass-strong border border-border">
              {stats.slice(0, 4).map((st) => (
                <div key={st.label} className="text-center">
                  <div className="text-xl sm:text-4xl font-black text-primary">
                    {st.value}
                    {st.suffix}
                  </div>
                  <div className="text-sm font-mono text-muted-foreground uppercase tracking-wider mt-1">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Search & Filter Controls */}
        <section className="container-narrow mb-14">
          <div className="flex flex-col gap-6">
            {/* Top Row: Search Bar & Tech Filter */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 w-full group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center w-full glass-strong rounded-2xl border border-white/10 overflow-hidden shadow-lg focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(41,214,185,0.2)] transition-all">
                  <div className="pl-5">
                    <Search className="w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by project name, tech stack, or industry..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-12 py-4 bg-transparent border-none text-base font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 text-muted-foreground hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Tech Stack Select */}
              <div className="w-full sm:w-64 shrink-0 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glass-strong rounded-2xl border border-white/10 flex items-center px-2 shadow-lg focus-within:border-primary/50 transition-all">
                  <Filter className="w-4 h-4 text-muted-foreground ml-3 group-focus-within:text-primary transition-colors" />
                  <select
                    value={selectedTech || "All"}
                    onChange={(e) => setSelectedTech(e.target.value === "All" ? null : e.target.value)}
                    className="w-full px-3 py-4 bg-transparent border-none text-sm font-mono font-bold text-foreground focus:outline-none cursor-pointer appearance-none"
                  >
                    <option value="All" className="bg-zinc-950 text-white">All Technologies</option>
                    {allTechStack.map((tech) => (
                      <option key={tech} value={tech} className="bg-zinc-950 text-white">
                        {tech}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 pointer-events-none text-muted-foreground text-xs">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            {/* Category Pill Tabs */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-2 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`snap-start shrink-0 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                  selectedCategory === "All"
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(41,214,185,0.3)]"
                    : "bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                All Projects
              </button>
              {portfolioCategories.filter(c => c !== "All").map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`snap-start shrink-0 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(41,214,185,0.3)]"
                      : "bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Projects Cards */}
        <section className="container-narrow mb-24">
          <div className="flex items-center justify-between mb-8">
            <span className="text-sm font-mono text-muted-foreground font-semibold">
              Showing <span className="text-primary font-bold">{filteredProjects.length}</span> projects
            </span>
            {(selectedCategory !== "All" || selectedTech !== null || searchQuery !== "") && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedTech(null);
                  setSearchQuery("");
                }}
                className="text-sm font-mono text-primary hover:underline font-bold"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 p-8 rounded-3xl glass-strong border border-border max-w-lg mx-auto">
              <Layers className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-base font-bold text-foreground mb-2">No projects found</h3>
              <p className="text-sm text-muted-foreground mb-6">
                No case studies match your current search query or technology filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedTech(null);
                  setSearchQuery("");
                }}
                className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              {filteredProjects.map((project, i) => {
                const isEven = i % 2 === 0;
                return (
                  <SpotlightCard
                    key={project.slug}
                    className="w-full relative bg-background border border-border"
                  >
                    <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} min-h-[480px]`}>
                      {/* Content Section */}
                      <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between flex-1 lg:w-1/2 static z-10">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="text-sm font-mono uppercase tracking-widest text-primary font-bold">
                              {project.category}
                            </span>
                            <span className="text-sm font-mono text-muted-foreground px-2.5 py-0.5 rounded bg-muted/40 dark:bg-white/5 border border-border">
                              {project.timeline}
                            </span>
                          </div>

                          <h2 className="text-xl sm:text-4xl font-extrabold mb-3 tracking-tight leading-snug">
                            {project.title}
                          </h2>

                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5 text-pretty font-medium">
                            {project.description}
                          </p>

                          <div className="p-4 rounded-xl bg-muted/40 dark:bg-white/5 border border-border mb-5">
                            <p className="text-sm font-bold text-foreground mb-1 flex items-center gap-1.5">
                              <TrendingUp className="w-3.5 h-3.5 text-primary" /> Impact & Outcome:
                            </p>
                            <p className="text-sm text-muted-foreground leading-normal font-medium">
                              {project.impact}
                            </p>
                          </div>

                          {/* Performance Metrics */}
                          {project.metrics && (
                            <div className="grid grid-cols-3 gap-2 mb-6 p-3 rounded-xl bg-primary/5 border border-primary/10">
                              {project.metrics.map((m) => (
                                <div key={m.label} className="text-center">
                                  <div className="text-base font-black text-primary">{m.value}</div>
                                  <div className="text-xs font-mono text-muted-foreground uppercase">
                                    {m.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {project.tech.map((t) => (
                              <span
                                key={t}
                                className="px-2.5 py-1 rounded-2xl text-sm font-mono bg-primary/10 text-primary border border-primary/20"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          <div className="flex flex-wrap items-center gap-4 mt-6">
                            {/* Live Preview Button */}
                            {project.live ? (
                              <Link
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-bold text-primary-foreground bg-primary px-5 py-2.5 rounded-xl shadow-[0_0_15px_rgba(41,214,185,0.2)] hover:bg-primary/90 transition-all duration-300 active:scale-95"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Live Preview
                              </Link>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleOpenViewer(project, 0)}
                                className="inline-flex items-center gap-2 text-sm font-bold text-primary-foreground bg-primary px-5 py-2.5 rounded-xl shadow-[0_0_15px_rgba(41,214,185,0.2)] hover:bg-primary/90 transition-all duration-300 active:scale-95"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Live Preview
                              </button>
                            )}

                            {/* Request Similar Product */}
                            <Link
                              href="/#contact"
                              className="inline-flex items-center gap-2 text-sm font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 px-5 py-2.5 rounded-xl transition-all duration-300"
                            >
                              <Building className="w-4 h-4 text-primary" />
                              Request Product
                            </Link>

                            {/* Pricing Link */}
                            <Link
                              href="/pricing"
                              className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors ml-auto sm:ml-0"
                            >
                              <span>Pricing</span>
                              <ArrowRight className="w-3.5 h-3.5 text-primary" />
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Image / Carousel Showcase Section */}
                      <div className="lg:w-1/2 bg-muted/30 dark:bg-black/40 border-t lg:border-t-0 lg:border-l border-border p-6 sm:p-10 flex items-center justify-center overflow-hidden group/img relative">
                        {(() => {
                          const allImages = Array.from(new Set([...(project.images || []), ...(project.imageLinks || [])]));
                          return allImages.length > 0 ? (
                          <Carousel className="w-full relative z-10 rounded-xl overflow-hidden shadow-accent-card ring-1 ring-border bg-black">
                            <CarouselContent>
                              {allImages.map((img, idx) => (
                                <CarouselItem key={`${project.title}-${img}`}>
                                  <button
                                    type="button"
                                    onClick={() => handleOpenViewer(project, idx)}
                                    className="group/viewer relative block w-full rounded-xl focus-visible:outline-none"
                                    aria-label={`Open ${project.title} screenshot ${idx + 1}`}
                                  >
                                    <ProjectPreviewImage
                                      src={img}
                                      alt={`${project.title} screenshot ${idx + 1}`}
                                      priority={i === 0 && idx === 0}
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover/viewer:opacity-100 transition-opacity duration-300" />
                                    <div className="pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-2 text-sm font-mono text-white/90 backdrop-blur-md">
                                      <Maximize2 className="h-3.5 w-3.5" />
                                      {allImages.length > 1 ? "View gallery" : "View image"}
                                    </div>
                                    {allImages.length > 1 && (
                                      <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/10 bg-black/45 px-2.5 py-1 text-sm font-mono text-white/80 backdrop-blur-md">
                                        {idx + 1}/{allImages.length}
                                      </div>
                                    )}
                                  </button>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            {allImages.length > 1 && (
                              <div className="opacity-100 lg:opacity-0 lg:group-hover/img:opacity-100 transition-opacity duration-300">
                                <CarouselPrevious className="left-4 bg-background/80 hover:bg-background border-none w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors z-20" />
                                <CarouselNext className="right-4 bg-background/80 hover:bg-background border-none w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors z-20" />
                              </div>
                            )}
                          </Carousel>
                        ) : (
                          <div className="aspect-[16/10] w-full flex items-center justify-center rounded-xl ring-1 ring-border bg-zinc-950/50 text-muted-foreground text-base font-mono z-10">
                            Enterprise Preview
                          </div>
                        );
                        })()}
                      </div>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          )}

          {activeViewerProject && (
            <ProjectImageViewer
              projectTitle={activeViewerProject.title}
              images={activeViewerProject.images}
              open={viewerState.open}
              currentIndex={viewerState.index}
              onIndexChange={(index) => setViewerState((current) => ({ ...current, index }))}
              onOpenChange={(open) => setViewerState((current) => ({ ...current, open }))}
            />
          )}
        </section>

        {/* Bottom Consultation Banner */}
        <section className="container-narrow">
          <div className="relative rounded-3xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/30 p-8 sm:p-14 text-center overflow-hidden shadow-[0_0_40px_rgba(41,214,185,0.15)]">
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-mono font-bold mb-4">
                Ready To Launch Your App?
              </div>

              <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
                Have a Project in <span className="text-gradient">Mind?</span>
              </h2>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-medium mb-8">
                Tell us about your requirements. Our software leads will analyze your technical scope and deliver a custom architecture roadmap.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/#contact"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(41,214,185,0.3)] hover:bg-primary/90 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <MessageSquareQuote className="w-4 h-4" />
                  Schedule Free Technical Scope Review
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AITwinChat />
    </div>
  );
}
