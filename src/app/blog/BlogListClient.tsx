"use client";
import Image from "next/image";
import { API_URL } from "@/lib/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  readTime: number;
  createdAt: string;
}

const SAMPLE_BLOG_POSTS: BlogPost[] = [
  {
    _id: "post-1",
    title: "Scaling Kubernetes Clusters for High-Traffic Enterprise SaaS",
    slug: "scaling-kubernetes-clusters-enterprise-saas",
    excerpt: "Discover how DevOpsBD engineers optimize auto-scaling, ingress traffic, and resource quotas to maintain 99.99% uptime during surge traffic.",
    coverImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80",
    tags: ["DevOps", "Kubernetes", "Cloud"],
    readTime: 6,
    createdAt: "2026-07-20T00:00:00.000Z",
  },
  {
    _id: "post-2",
    title: "Building Micro-Frontend Architecture with Next.js & Module Federation",
    slug: "micro-frontend-architecture-nextjs",
    excerpt: "Learn how we decoupled monolithic frontends for global clients, accelerating deployment velocity by 4x without sacrificing SEO performance.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    tags: ["Frontend", "Next.js", "Architecture"],
    readTime: 8,
    createdAt: "2026-07-16T00:00:00.000Z",
  },
  {
    _id: "post-3",
    title: "Securing Financial Transactions in Distributed FinTech Gateways",
    slug: "securing-financial-transactions-fintech-gateways",
    excerpt: "An in-depth look at PCI-DSS compliance, tokenization algorithms, and resilient retry mechanisms engineered by our software leads.",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    tags: ["FinTech", "Security", "Backend"],
    readTime: 7,
    createdAt: "2026-07-12T00:00:00.000Z",
  },
  {
    _id: "post-4",
    title: "Integrating Large Language Models into Enterprise Workflows Safely",
    slug: "integrating-llms-enterprise-workflows",
    excerpt: "How DevOpsBD Technologies implements RAG architecture, vector databases, and privacy guardrails for enterprise AI automation.",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
    tags: ["AI & GenAI", "Python", "Enterprise"],
    readTime: 10,
    createdAt: "2026-07-08T00:00:00.000Z",
  },
  {
    _id: "post-5",
    title: "Cross-Platform Mobile Performance Optimization with React Native & Expo",
    slug: "mobile-app-performance-react-native",
    excerpt: "How our mobile engineering team achieves 60fps smooth animations and fast cold startup times in iOS & Android enterprise applications.",
    coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
    tags: ["Mobile", "React Native", "iOS/Android"],
    readTime: 5,
    createdAt: "2026-07-04T00:00:00.000Z",
  },
  {
    _id: "post-6",
    title: "Designing Enterprise Glassmorphism UI/UX for Analytics Dashboards",
    slug: "designing-enterprise-glassmorphism-ui-ux",
    excerpt: "Key principles for building dark mode glassmorphism interfaces that balance data density with high visual elegance.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    tags: ["UI/UX", "Design", "Frontend"],
    readTime: 6,
    createdAt: "2026-06-28T00:00:00.000Z",
  },
  {
    _id: "post-7",
    title: "Zero-Downtime Database Migrations in High-Throughput PostgreSQL",
    slug: "zero-downtime-database-migrations-postgresql",
    excerpt: "Step-by-step methodology for executing dual-write schema migrations without locking production tables during high transaction load.",
    coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80",
    tags: ["Database", "PostgreSQL", "Backend"],
    readTime: 9,
    createdAt: "2026-06-20T00:00:00.000Z",
  },
  {
    _id: "post-8",
    title: "Automating CI/CD Pipelines with GitHub Actions, Docker, and AWS ECS",
    slug: "automating-cicd-github-actions-aws-ecs",
    excerpt: "Build automated testing, container scanning, and zero-downtime deployment pipelines for modern containerized cloud microservices.",
    coverImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=80",
    tags: ["DevOps", "AWS", "CI/CD"],
    readTime: 7,
    createdAt: "2026-06-15T00:00:00.000Z",
  },
];

export default function BlogListClient() {
  const [posts, setPosts] = useState<BlogPost[]>(SAMPLE_BLOG_POSTS);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState("All");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    fetch(`${API_URL}/api/blogs?published=true`)
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d.blogs) && d.blogs.length > 0) {
          setPosts(d.blogs);
        }
      })
      .catch(() => {
        // Retain 8 corporate sample posts
      })
      .finally(() => setLoading(false));
  }, []);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));
  const filtered = activeTag === "All" ? posts : posts.filter((p) => p.tags.includes(activeTag));

  return (
    <>
      <Navbar />
      <main id="main-content" className="section-padding relative z-10 min-h-screen pt-32">
        <div className="container-narrow">
          {/* Header */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
            className="mb-14 text-center"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-subtle border border-primary/30 text-sm font-mono text-primary mb-4 shadow-[0_0_12px_rgba(41,214,185,0.12)]">
              <BookOpen className="w-3.5 h-3.5" /> DevOpsBD Technologies Insights
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-4">
              Articles & <span className="text-gradient">Insights</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-base leading-relaxed font-medium">
              Engineering articles, DevOps best practices, cloud architecture guides, and enterprise software insights published by DevOpsBD Technologies Ltd.
            </p>
          </motion.div>

          {/* Tags Filter */}
          {allTags.length > 0 && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: shouldReduceMotion ? 0.2 : 0.4 }}
              className="flex flex-wrap justify-center gap-2 mb-12"
            >
              {["All", ...allTags].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ${
                    activeTag === tag
                      ? "bg-primary text-primary-foreground shadow-[0_0_14px_rgba(41,214,185,0.2)]"
                      : "glass-subtle text-muted-foreground hover:text-foreground border border-white/5 hover:border-primary/20"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          )}

          {/* Posts Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-medium">No articles matching &ldquo;{activeTag}&rdquo; found.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
              {filtered.map((post, i) => (
                <motion.article
                  key={post._id}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: shouldReduceMotion ? 0 : i * 0.05, duration: shouldReduceMotion ? 0.2 : 0.4 }}
                  className="h-full flex"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col justify-between w-full rounded-3xl border border-white/10 glass-subtle overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(41,214,185,0.08)]"
                  >
                    <div>
                      {post.coverImage && (
                        <div className="aspect-[16/9] overflow-hidden bg-zinc-900 relative">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3 font-mono">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-primary" />
                            {new Date(post.createdAt).toLocaleDateString("en-US", {
                              month: "short", day: "numeric", year: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-primary" />
                            {post.readTime} min read
                          </span>
                        </div>
                        <h2 className="text-base font-bold mb-3 group-hover:text-primary transition-colors leading-snug tracking-tight text-foreground">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3 font-medium">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 flex flex-col gap-4">
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 3).map((t) => (
                            <span key={t} className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-xs font-mono text-primary font-bold">
                              <Tag className="h-2.5 w-2.5" />
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">
                        Read full article <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
