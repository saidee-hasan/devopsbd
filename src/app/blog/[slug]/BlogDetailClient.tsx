"use client";
import Image from "next/image";
import { API_URL } from "@/lib/api";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Calendar, Clock, Tag, Share2, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  readTime: number;
  createdAt: string;
}

const FALLBACK_ARTICLES_MAP: Record<string, BlogPost> = {
  "scaling-kubernetes-clusters-enterprise-saas": {
    _id: "post-1",
    title: "Scaling Kubernetes Clusters for High-Traffic Enterprise SaaS",
    slug: "scaling-kubernetes-clusters-enterprise-saas",
    excerpt: "Discover how DevOpsBD engineers optimize auto-scaling, ingress traffic, and resource quotas to maintain 99.99% uptime during surge traffic.",
    coverImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80",
    tags: ["DevOps", "Kubernetes", "Cloud"],
    readTime: 6,
    createdAt: "2026-07-20T00:00:00.000Z",
    content: `
## Introduction

As digital enterprises scale, maintaining low latency and high availability across cloud infrastructure requires robust orchestration. At **DevOpsBD Technologies Ltd.**, we manage distributed Kubernetes (EKS/GKE) environments serving millions of daily API transactions.

### Key Strategies for Kubernetes Auto-Scaling

1. **Horizontal Pod Autoscaler (HPA):** Custom metric scaling based on RPS (Requests Per Second) and memory pressure rather than raw CPU utilization alone.
2. **Cluster Autoscaler & Karpenter:** Dynamic node provisioning with spot instances to optimize cloud cost by up to **42%**.
3. **Ingress NGINX & Rate-Limiting:** Protecting backend microservices against DDoS surges and unexpected traffic spikes.

\`\`\`yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: devopsbd-api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: devopsbd-api
  minReplicas: 3
  maxReplicas: 50
  metrics:
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 75
\`\`\`

## Architecture & Chaos Testing

We run simulated failure scenarios using Chaos Mesh to ensure zero-downtime rolling upgrades and seamless regional failovers.

> *"Zero-downtime engineering isn't an accident — it's the result of automated health probes, graceful terminations, and proactive observability."*

---

*Need cloud infrastructure optimization or a DevOps audit for your business? [Get a free consultation with DevOpsBD Technologies](#contact).*
    `,
  },
  "micro-frontend-architecture-nextjs": {
    _id: "post-2",
    title: "Building Micro-Frontend Architecture with Next.js & Module Federation",
    slug: "micro-frontend-architecture-nextjs",
    excerpt: "Learn how we decoupled monolithic frontends for global clients, accelerating deployment velocity by 4x without sacrificing SEO performance.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    tags: ["Frontend", "Next.js", "Architecture"],
    readTime: 8,
    createdAt: "2026-07-16T00:00:00.000Z",
    content: `
## The Need for Micro-Frontends in Scale-Stage Companies

When engineering teams grow beyond 20 developers, working in a single monolithic React codebase introduces merge conflicts, bloated bundle sizes, and slow CI/CD release cycles.

### Core Benefits Delivered by DevOpsBD Technologies Ltd.

- **Independent Deployment:** Product teams release feature modules without rebuilding the entire web application.
- **Shared Design Tokens:** Standardized Glassmorphism UI tokens across independent Next.js micro-apps.
- **Optimized Core Web Vitals:** Lazy loading micro-apps on demand keeps First Contentful Paint (FCP) under 0.8 seconds.

### Implementation Pattern

We leverage Next.js App Router along with Module Federation to dynamically load remote components at edge servers:

\`\`\`typescript
import dynamic from "next/dynamic";

const RemoteCheckoutWidget = dynamic(() => import("checkoutApp/Widget"), {
  ssr: true,
  loading: () => <div className="h-40 rounded-xl bg-white/5 animate-pulse" />,
});
\`\`\`

---

*Looking to modernize your legacy frontend monolith? [Consult our senior React/Next.js engineers](#contact).*
    `,
  },
  "securing-financial-transactions-fintech-gateways": {
    _id: "post-3",
    title: "Securing Financial Transactions in Distributed FinTech Gateways",
    slug: "securing-financial-transactions-fintech-gateways",
    excerpt: "An in-depth look at PCI-DSS compliance, tokenization algorithms, and resilient retry mechanisms engineered by our software leads.",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    tags: ["FinTech", "Security", "Backend"],
    readTime: 7,
    createdAt: "2026-07-12T00:00:00.000Z",
    content: `
## FinTech Security Best Practices

Processing online payments demands enterprise-grade cryptographic security, zero single points of failure, and strict regulatory compliance.

### DevOpsBD FinTech Engineering Protocol

- **End-to-End Encryption:** AES-256-GCM encryption for payload storage and TLS 1.3 for transit.
- **Idempotency Keys:** Ensuring duplicate requests never double-charge customer accounts.
- **Automated Fraud Audits:** Real-time anomaly detection flags suspicious IP patterns before transaction execution.

\`\`\`typescript
export async function processPayment(payload: PaymentPayload, idempotencyKey: string) {
  const existing = await cache.get(\`idempotency:\${idempotencyKey}\`);
  if (existing) return JSON.parse(existing);

  const result = await paymentGateway.charge(payload);
  await cache.set(\`idempotency:\${idempotencyKey}\`, JSON.stringify(result), "EX", 86400);
  return result;
}
\`\`\`
    `,
  },
  "integrating-llms-enterprise-workflows": {
    _id: "post-4",
    title: "Integrating Large Language Models into Enterprise Workflows Safely",
    slug: "integrating-llms-enterprise-workflows",
    excerpt: "How DevOpsBD Technologies implements RAG architecture, vector databases, and privacy guardrails for enterprise AI automation.",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
    tags: ["AI & GenAI", "Python", "Enterprise"],
    readTime: 10,
    createdAt: "2026-07-08T00:00:00.000Z",
    content: `
## Enterprise GenAI & Retrieval-Augmented Generation (RAG)

Generative AI is revolutionizing internal company tools, client support, and data intelligence. However, data privacy and hallucination prevention are non-negotiable.

### DevOpsBD GenAI Architecture Stack

1. **Private Vector DBs:** Pinecone and Qdrant deployed inside VPC boundaries.
2. **PII Masking Filter:** Stripping customer phone numbers, emails, and SSNs before sending context to LLMs.
3. **Structured Response Schemas:** Utilizing strict JSON mode and Zod validation for zero-error AI pipeline integration.
    `,
  },
  "mobile-app-performance-react-native": {
    _id: "post-5",
    title: "Cross-Platform Mobile Performance Optimization with React Native & Expo",
    slug: "mobile-app-performance-react-native",
    excerpt: "How our mobile engineering team achieves 60fps smooth animations and fast cold startup times in iOS & Android enterprise applications.",
    coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
    tags: ["Mobile", "React Native", "iOS/Android"],
    readTime: 5,
    createdAt: "2026-07-04T00:00:00.000Z",
    content: `
## Building Smooth 60FPS Native Apps

Mobile users demand instant response times and fluid gestures. Using React Native and Hermes engine, DevOpsBD delivers near-native performance.

### Optimization Techniques

- **Hermes Bytecode Pre-compilation:** Reduces initial JavaScript bundle parsing time by **65%**.
- **Reanimated 3 & Gesture Handler:** Offloading UI animations directly to the native thread.
- **FlashList for Large Datasets:** Replacing standard FlatList to prevent memory spikes on low-end devices.
    `,
  },
  "designing-enterprise-glassmorphism-ui-ux": {
    _id: "post-6",
    title: "Designing Enterprise Glassmorphism UI/UX for Analytics Dashboards",
    slug: "designing-enterprise-glassmorphism-ui-ux",
    excerpt: "Key principles for building dark mode glassmorphism interfaces that balance data density with high visual elegance.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    tags: ["UI/UX", "Design", "Frontend"],
    readTime: 6,
    createdAt: "2026-06-28T00:00:00.000Z",
    content: `
## Crafting Premium Dark Interfaces

Modern enterprise SaaS applications require interfaces that feel futuristic yet remain highly accessible.

### Design System Rules

1. **Backdrop Blur & Sublayer Glows:** Using backdrop-filter: blur(16px) with HSL teal glowing gradients.
2. **Subtle 1px Borders:** Highlighting card boundaries with 10% white borders to maintain depth without clutter.
3. **Contrast Hierarchy:** Ensuring text contrast meets WCAG AA standard (at least 4.5:1 ratio) across all state changes.
    `,
  },
  "zero-downtime-database-migrations-postgresql": {
    _id: "post-7",
    title: "Zero-Downtime Database Migrations in High-Throughput PostgreSQL",
    slug: "zero-downtime-database-migrations-postgresql",
    excerpt: "Step-by-step methodology for executing dual-write schema migrations without locking production tables during high transaction load.",
    coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80",
    tags: ["Database", "PostgreSQL", "Backend"],
    readTime: 9,
    createdAt: "2026-06-20T00:00:00.000Z",
    content: `
## Database Migration Strategies

Altering PostgreSQL schemas on tables with tens of millions of rows can cause table locks that trigger application downtime if executed naively.

### The Expand-Contract Migration Pattern

1. **Expand:** Add new nullable columns or tables without removing existing columns.
2. **Dual-Write:** Update backend application code to write to both old and new schema columns simultaneously.
3. **Backfill:** Asynchronously backfill historic records in small batch chunks.
4. **Contract:** Deprecate the old column and remove legacy code paths.
    `,
  },
  "automating-cicd-github-actions-aws-ecs": {
    _id: "post-8",
    title: "Automating CI/CD Pipelines with GitHub Actions, Docker, and AWS ECS",
    slug: "automating-cicd-github-actions-aws-ecs",
    excerpt: "Build automated testing, container scanning, and zero-downtime deployment pipelines for modern containerized cloud microservices.",
    coverImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=80",
    tags: ["DevOps", "AWS", "CI/CD"],
    readTime: 7,
    createdAt: "2026-06-15T00:00:00.000Z",
    content: `
## Automating Enterprise Deployment Pipelines

Continuous integration and delivery pipelines enable software teams to push features to production multiple times a day with high confidence.

### GitHub Actions Pipeline Stages

- **Stage 1: Lint & TypeCheck:** Running ESLint, Prettier, and TypeScript compiler checks.
- **Stage 2: Security & Vulnerability Scan:** Scanning Docker images using Trivy before pushing to AWS ECR.
- **Stage 3: Blue/Green Deployment:** Triggering AWS ECS task definition updates with automated health check rollbacks.
    `,
  },
};

export default function BlogDetailClient() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const slugStr = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : "";
    if (!slugStr) return;

    fetch(`/api/blogs/slug/`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((d) => {
        if (d?.blog) {
          setPost(d.blog);
        } else if (FALLBACK_ARTICLES_MAP[slugStr]) {
          setPost(FALLBACK_ARTICLES_MAP[slugStr]);
        }
      })
      .catch(() => {
        if (FALLBACK_ARTICLES_MAP[slugStr]) {
          setPost(FALLBACK_ARTICLES_MAP[slugStr]);
        } else {
          router.push("/blog");
        }
      })
      .finally(() => setLoading(false));
  }, [params?.slug, router]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="section-padding relative z-10 min-h-screen pt-32">
          <div className="container-narrow flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) return null;

  return (
    <>
      <Navbar />
      <main id="main-content" className="section-padding relative z-10 min-h-screen pt-32">
        <article className="container-narrow max-w-3xl">
          {/* Back link */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.4 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-muted-foreground hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Corporate Articles
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: shouldReduceMotion ? 0.2 : 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center gap-4 text-sm font-mono text-muted-foreground mb-4 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "long", day: "numeric", year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" />
                {post.readTime} min read
              </span>
              <span className="px-2.5 py-0.5 rounded bg-primary/10 text-primary text-xs uppercase font-bold">
                DevOpsBD Tech Publication
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black tracking-tight leading-tight mb-4 text-foreground">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-muted-foreground text-base sm:text-base leading-relaxed font-medium mb-6">
                {post.excerpt}
              </p>
            )}

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-sm font-mono text-primary font-bold">
                    <Tag className="h-3 w-3" />
                    {t}
                  </span>
                ))}
              </div>
            )}
          </motion.header>

          {/* Cover Image */}
          {post.coverImage && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.1, duration: shouldReduceMotion ? 0.2 : 0.6 }}
              className="relative mb-12 overflow-hidden rounded-3xl border border-white/10 shadow-accent-card"
            >
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: shouldReduceMotion ? 0.2 : 0.5 }}
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-foreground prose-headings:font-extrabold prose-headings:tracking-tight
              prose-h2:text-xl sm:prose-h2:text-4xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-5 prose-p:text-base
              prose-a:text-primary prose-a:underline prose-a:decoration-primary/40 prose-a:underline-offset-4 prose-a:hover:decoration-primary/80
              prose-strong:text-foreground prose-strong:font-bold
              prose-code:text-primary prose-code:bg-primary/10 prose-code:rounded-md prose-code:px-2 prose-code:py-0.5 prose-code:text-base prose-code:font-mono
              prose-pre:bg-black/60 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-pre:text-sm sm:prose-pre:text-base
              prose-blockquote:border-l-primary prose-blockquote:text-foreground/90 prose-blockquote:pl-5 prose-blockquote:italic
              prose-ul:list-disc prose-ul:pl-6 prose-ul:text-muted-foreground
              prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-muted-foreground
              prose-li:mb-1.5
              prose-img:rounded-2xl prose-img:border prose-img:border-white/10
              prose-hr:border-white/10"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </motion.div>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between flex-wrap gap-4"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-base font-bold text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Explore All Articles
            </Link>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-[0_0_15px_rgba(41,214,185,0.2)] hover:bg-primary/90 transition-all"
            >
              Consult DevOpsBD Engineers
            </Link>
          </motion.div>
        </article>
      </main>
      <Footer />
    </>
  );
}
