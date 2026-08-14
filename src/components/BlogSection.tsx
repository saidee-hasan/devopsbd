"use client";
import { API_URL } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/portfolio";

export default function BlogSection() {
  const [blogPostsList, setBlogPostsList] = useState<any[]>(blogPosts);

  useEffect(() => {
    fetch(`${API_URL}/api/blogs`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.blogs && data.blogs.length > 0) {
          // Filter only published blogs and take the top 3 latest
          const published = data.blogs.filter((b: any) => b.published);
          const formattedBlogs = published.slice(0, 3).map((b: any) => ({
            title: b.title,
            slug: b.slug,
            image: b.coverImage || "/images/unsplash/blog1.jpg",
            category: b.tags && b.tags.length > 0 ? b.tags[0] : "Technology",
            date: new Date(b.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }).toUpperCase(),
            author: "ADMIN",
            summary: b.excerpt || "Read more about our latest insights and technical updates.",
          }));
          setBlogPostsList(formattedBlogs);
        }
      })
      .catch((e) => {
        console.error("Failed to fetch blogs:", e);
      });
  }, []);

  return (
    <section id="blog" className="bg-[#0A111C] text-white section-padding relative z-10 font-sans border-b border-white/[0.08]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-mono font-bold tracking-widest text-[#D4F12A] uppercase block mb-2">
            OUR BLOG &amp; ARTICLES
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Latest News &amp; Insights
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed">
            Stay ahead with technical deep dives, cloud architecture guides, and strategic engineering insights from our lead directors.
          </p>
        </div>

        {/* 3-Column Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {blogPostsList.map((art, idx) => (
            <motion.div
              key={art.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/[0.02] border border-white/[0.08] overflow-hidden flex flex-col justify-between group hover:border-[#D4F12A]/50 transition-colors shadow-lg"
            >
              <div>
                {/* Article Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0A111C]/90 border border-white/[0.08] px-3 py-1 text-xs font-mono font-bold text-[#D4F12A] uppercase">
                    {art.category}
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
                    <span>{art.date}</span>
                    <span>•</span>
                    <span>BY {art.author.toUpperCase()}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-white tracking-tight leading-snug mb-2 line-clamp-2 group-hover:text-[#D4F12A] transition-colors">
                    {art.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
                    {art.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="px-6 pb-6 pt-0">
                <Link
                  href={`/blog/${art.slug}`}
                  className="inline-flex items-center gap-1 px-5 py-2.5 bg-[#D4F12A] hover:bg-lime-400 text-zinc-950 font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-sm"
                >
                  <span>Read Article</span>
                  <span className="text-xs">▶</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Indicator Row matching screenshot */}
        <div className="flex items-center justify-center gap-3 text-sm font-mono font-bold text-zinc-400">
          <span className="text-[#D4F12A] cursor-pointer hover:underline">01</span>
          <span>/</span>
          <span className="cursor-pointer hover:text-white transition-colors">02</span>
          <span>/</span>
          <span className="cursor-pointer hover:text-white transition-colors">03</span>
        </div>

      </div>
    </section>
  );
}
