"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Radio,
  Activity,
  CheckCircle2,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import Card3D from "./Card3D";

// Authentic Brand SVG Icons
const K8sIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2" />
    <line x1="12" y1="22" x2="12" y2="12" />
    <line x1="12" y1="12" x2="21" y2="7" />
    <line x1="12" y1="12" x2="3" y2="7" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const AWSIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6.5 17.5c-2.5 0-4.5-2-4.5-4.5 0-2.2 1.6-4 3.7-4.4C6.3 5.6 8.9 3.5 12 3.5c3.5 0 6.4 2.6 6.9 6 2.3.4 4.1 2.4 4.1 4.8 0 2.7-2.2 4.9-4.9 4.9H6.5z" />
    <path d="M9 13l3-3 3 3" />
    <path d="M12 10v7" />
  </svg>
);

const DockerIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="9" width="4" height="4" rx="1" />
    <rect x="10" y="9" width="4" height="4" rx="1" />
    <rect x="16" y="9" width="4" height="4" rx="1" />
    <rect x="7" y="4" width="4" height="4" rx="1" />
    <rect x="13" y="4" width="4" height="4" rx="1" />
    <path d="M3 15c1 3 4.5 5 9 5s8-2 9-5c0-1.5-1-3-3-3H6c-2 0-3 1.5-3 3z" />
  </svg>
);

const TerraformIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="3 4 10 8 10 16 3 12 3 4" />
    <polygon points="11 8 18 4 18 12 11 16 11 8" />
    <polygon points="11 17 18 13 18 21 11 25 11 17" />
  </svg>
);

const NextJsIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9 16V8l7 9" />
    <path d="M15 8v3" />
  </svg>
);

const ReactIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(0 12 12)" />
    <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const TypeScriptIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M7 9h4m-2 0v8" />
    <path d="M14 15c.5.7 1.3 1 2.2 1 1.2 0 1.8-.6 1.8-1.3 0-1.8-4-1.2-4-3.2 0-.9.8-1.5 2-1.5 1.1 0 1.8.4 2.3 1.1" />
  </svg>
);

const NodeJsIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2" />
    <path d="M12 6v12" />
    <path d="M8 9l4 2.5 4-2.5" />
  </svg>
);

const PythonIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3c-4 0-4.5 1.7-4.5 3.5V8h6V9H6c-2 0-3.5 1.5-3.5 4s1.5 4 3.5 4h1.5v-2.5c0-1.8 1.4-3.5 3.5-3.5h5V9c0-3.5-2.5-6-6-6z" />
    <path d="M12 21c4 0 4.5-1.7 4.5-3.5V16h-6v-1h7.5c2 0 3.5-1.5 3.5-4s-1.5-4-3.5-4H18v2.5c0 1.8-1.4 3.5-3.5 3.5h-5V15c0 3.5 2.5 6 6 6z" />
  </svg>
);

const PostgresIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <ellipse cx="12" cy="6" rx="8" ry="3" />
    <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
    <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
  </svg>
);

const RedisIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polygon points="2 12 12 17 22 12" />
    <polygon points="2 17 12 22 22 17" />
  </svg>
);

const CloudflareIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 16.5A4.5 4.5 0 0 1 7.2 8C8.5 5.6 11.1 4 14 4a7 7 0 0 1 6.8 5.4A4.5 4.5 0 0 1 20 18H5.5" />
    <line x1="4" y1="20" x2="20" y2="20" />
  </svg>
);

const GraphQLIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 20.66 7 20.66 17 12 22 3.34 17 3.34 7 12 2" />
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="3.34" y1="7" x2="20.66" y2="17" />
    <line x1="3.34" y1="17" x2="20.66" y2="7" />
  </svg>
);

interface TechNode {
  id: string;
  name: string;
  category: string;
  icon: any;
  color: string;
  borderColor: string;
  bgColor: string;
  glowColor: string;
  orbit: "outer" | "middle" | "inner";
  angle: number;
}

const techNodes: TechNode[] = [
  // Outer Orbit - Cloud & Infra
  { id: "k8s", name: "Kubernetes", category: "Container Orchestration", icon: K8sIcon, color: "text-sky-400", borderColor: "border-sky-500/40", bgColor: "bg-sky-500/10", glowColor: "rgba(56,189,248,0.4)", orbit: "outer", angle: 0 },
  { id: "aws", name: "AWS Cloud", category: "Multi-Cloud Infrastructure", icon: AWSIcon, color: "text-amber-400", borderColor: "border-amber-500/40", bgColor: "bg-amber-500/10", glowColor: "rgba(251,191,36,0.4)", orbit: "outer", angle: 60 },
  { id: "docker", name: "Docker", category: "App Containerization", icon: DockerIcon, color: "text-blue-400", borderColor: "border-blue-500/40", bgColor: "bg-blue-500/10", glowColor: "rgba(96,165,250,0.4)", orbit: "outer", angle: 120 },
  { id: "terraform", name: "Terraform", category: "Infrastructure as Code", icon: TerraformIcon, color: "text-purple-400", borderColor: "border-purple-500/40", bgColor: "bg-purple-500/10", glowColor: "rgba(192,132,252,0.4)", orbit: "outer", angle: 180 },
  { id: "cloudflare", name: "Cloudflare", category: "Global Edge & CDN Mesh", icon: CloudflareIcon, color: "text-orange-400", borderColor: "border-orange-500/40", bgColor: "bg-orange-500/10", glowColor: "rgba(251,146,60,0.4)", orbit: "outer", angle: 240 },
  { id: "python", name: "Python", category: "Data & AI Pipeline Engine", icon: PythonIcon, color: "text-amber-300", borderColor: "border-amber-400/40", bgColor: "bg-amber-400/10", glowColor: "rgba(252,211,77,0.4)", orbit: "outer", angle: 300 },

  // Middle Orbit - App Stack & Frontend
  { id: "nextjs", name: "Next.js 15", category: "SSR & React 19 Engine", icon: NextJsIcon, color: "text-white", borderColor: "border-white/40", bgColor: "bg-white/10", glowColor: "rgba(255,255,255,0.4)", orbit: "middle", angle: 30 },
  { id: "react", name: "React 19", category: "UI & Component Framework", icon: ReactIcon, color: "text-cyan-400", borderColor: "border-cyan-400/40", bgColor: "bg-cyan-400/10", glowColor: "rgba(34,211,238,0.4)", orbit: "middle", angle: 105 },
  { id: "typescript", name: "TypeScript", category: "End-to-End Type Safety", icon: TypeScriptIcon, color: "text-blue-400", borderColor: "border-blue-400/40", bgColor: "bg-blue-400/10", glowColor: "rgba(96,165,250,0.4)", orbit: "middle", angle: 180 },
  { id: "nodejs", name: "Node.js", category: "Async Backend Runtime", icon: NodeJsIcon, color: "text-emerald-400", borderColor: "border-emerald-500/40", bgColor: "bg-emerald-500/10", glowColor: "rgba(52,211,153,0.4)", orbit: "middle", angle: 255 },
  { id: "postgres", name: "PostgreSQL", category: "Enterprise HA Database", icon: PostgresIcon, color: "text-indigo-400", borderColor: "border-indigo-400/40", bgColor: "bg-indigo-400/10", glowColor: "rgba(129,140,248,0.4)", orbit: "middle", angle: 330 },

  // Inner Orbit - Security & Pipeline Engine
  { id: "security", name: "Zero-Trust", category: "ISO 27001 & SOC2 Shield", icon: ShieldCheck, color: "text-teal-300", borderColor: "border-teal-400/40", bgColor: "bg-teal-400/10", glowColor: "rgba(45,212,191,0.4)", orbit: "inner", angle: 45 },
  { id: "redis", name: "Redis", category: "In-Memory Cache & Streams", icon: RedisIcon, color: "text-rose-400", borderColor: "border-rose-500/40", bgColor: "bg-rose-500/10", glowColor: "rgba(251,113,133,0.4)", orbit: "inner", angle: 165 },
  { id: "graphql", name: "GraphQL", category: "High-Throughput API Gateway", icon: GraphQLIcon, color: "text-fuchsia-400", borderColor: "border-fuchsia-400/40", bgColor: "bg-fuchsia-400/10", glowColor: "rgba(232,121,249,0.4)", orbit: "inner", angle: 285 },
];

export default function EnterpriseHeroGraphic() {
  const [activeNode, setActiveNode] = useState<TechNode | null>(techNodes[0]);

  return (
    <Card3D className="w-full">
      <div className="relative w-full aspect-square max-w-[540px] mx-auto rounded-3xl border border-white/15 p-4 sm:p-6 bg-slate-950/85 backdrop-blur-2xl shadow-[0_0_60px_rgba(41,214,185,0.22)] overflow-hidden flex flex-col justify-between select-none">
        
        {/* Background Radial Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/20 blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-accent/20 blur-[90px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-cyan-500/20 blur-[90px] pointer-events-none" />

        {/* Abstract Cyber Grid */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* HUD Top Bar */}
        <div className="relative z-20 flex items-center justify-between gap-2 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs sm:text-sm font-mono font-bold text-foreground uppercase tracking-widest flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-primary" />
              AUTHENTIC TECH LOGO MESH
            </span>
          </div>

          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-mono text-primary font-bold shadow-[0_0_10px_rgba(41,214,185,0.15)]">
            <Activity className="w-3 h-3 text-primary animate-pulse" />
            <span>SLA 99.999%</span>
          </div>
        </div>

        {/* Interactive 3D Orbit Canvas Container */}
        <div className="relative flex-1 flex items-center justify-center my-2 min-h-[300px] sm:min-h-[340px]">

          {/* SVG Animated Laser Energy Vectors */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
            <circle cx="50%" cy="50%" r="42%" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 6" className="animate-[spin_45s_linear_infinite]" />
            <circle cx="50%" cy="50%" r="30%" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 5" className="animate-[spin_30s_linear_infinite_reverse]" />
            <circle cx="50%" cy="50%" r="18%" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeDasharray="2 4" className="animate-[spin_20s_linear_infinite]" />
          </svg>

          {/* Outer Orbit Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute w-[86%] aspect-square rounded-full border border-primary/20 pointer-events-none"
          />

          {/* Middle Orbit Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute w-[62%] aspect-square rounded-full border border-white/15 pointer-events-none"
          />

          {/* Inner Orbit Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-[38%] aspect-square rounded-full border border-accent/30 pointer-events-none"
          />

          {/* Render All Brand Tech Nodes around Orbits */}
          {techNodes.map((node) => {
            const isSelected = activeNode?.id === node.id;
            const IconComponent = node.icon;

            const radiusPercent = node.orbit === "outer" ? 42 : node.orbit === "middle" ? 30 : 18;
            const rad = (node.angle * Math.PI) / 180;
            const x = 50 + radiusPercent * Math.cos(rad);
            const y = 50 + radiusPercent * Math.sin(rad);

            return (
              <button
                key={node.id}
                onClick={() => setActiveNode(node)}
                onMouseEnter={() => setActiveNode(node)}
                style={{ left: `${x}%`, top: `${y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group transition-all duration-300 ${
                  isSelected ? "scale-125 z-30" : "hover:scale-110"
                }`}
              >
                <div
                  className={`p-2 sm:p-2.5 rounded-2xl border backdrop-blur-xl transition-all duration-300 ${node.bgColor} ${node.borderColor} ${
                    isSelected
                      ? `ring-2 ring-primary border-primary shadow-[0_0_22px_${node.glowColor}]`
                      : "hover:border-white/40 shadow-lg"
                  }`}
                >
                  <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${node.color}`} />
                </div>

                {isSelected && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
                )}
              </button>
            );
          })}

          {/* Central Core */}
          <div className="relative z-10 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-28 h-28 rounded-full bg-gradient-to-r from-primary/30 via-accent/30 to-cyan-500/30 blur-md"
            />

            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/20 p-1.5 flex items-center justify-center bg-slate-950/90 shadow-[0_0_35px_rgba(41,214,185,0.35)] backdrop-blur-2xl">
              <div className="w-full h-full rounded-full bg-slate-900/90 border border-primary/40 flex flex-col items-center justify-center text-center p-2">
                <div className="p-1.5 rounded-xl bg-primary/20 text-primary mb-1 border border-primary/40 shadow-[0_0_10px_rgba(41,214,185,0.3)]">
                  <Globe className="w-5 h-5 animate-pulse" />
                </div>
                <span className="text-[9px] font-mono font-bold tracking-widest text-foreground uppercase">
                  DEVOPSBD
                </span>
                <span className="text-[8px] font-mono text-primary font-semibold">
                  TECH HUB
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Brand Tech Details Box */}
        <div className="relative z-20 min-h-[64px] rounded-2xl bg-white/[0.04] border border-white/10 p-3 backdrop-blur-xl flex items-center justify-between gap-3">
          <AnimatePresence mode="wait">
            {activeNode ? (
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border ${activeNode.bgColor} ${activeNode.borderColor}`}>
                    <activeNode.icon className={`w-5 h-5 ${activeNode.color}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-base font-mono font-bold text-foreground">
                        {activeNode.name}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-primary/15 text-primary border border-primary/30">
                        {activeNode.orbit.toUpperCase()} MESH
                      </span>
                    </div>
                    <p className="text-xs font-mono text-muted-foreground mt-0.5">
                      {activeNode.category}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>VERIFIED</span>
                </div>
              </motion.div>
            ) : (
              <div className="text-sm font-mono text-muted-foreground">
                Hover or click any technology logo to inspect integration.
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Tech Logos Footer */}
        <div className="relative z-20 pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-1.5 text-[9px] font-mono text-muted-foreground">
          <span className="flex items-center gap-1 text-foreground">
            <Sparkles className="w-3 h-3 text-primary" /> Verified Brand Stack
          </span>
          <div className="flex items-center gap-2">
            <span>K8s</span>
            <span>•</span>
            <span>AWS</span>
            <span>•</span>
            <span>Docker</span>
            <span>•</span>
            <span>Next.js 15</span>
            <span>•</span>
            <span>React 19</span>
            <span>•</span>
            <span>PostgreSQL</span>
          </div>
        </div>

      </div>
    </Card3D>
  );
}
