"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import { API_URL } from "@/lib/api";

const defaultTypingWords = [
  "Grow Smarter.",
  "Innovate Faster.",
  "Deploy Globally.",
  "Scale Seamlessly.",
];

const highlights = [
  { icon: CheckCircle2, label: "99.99% SLA Uptime" },
  { icon: ShieldCheck, label: "Enterprise Security" },
];

export default function HeroSection() {
  const [words, setWords] = useState<string[]>(defaultTypingWords);
  const [badgeText, setBadgeText] = useState("ENTERPRISE SOLUTIONS");
  const [headline, setHeadline] = useState("Build Better. Scale Faster.");
  const [subhead, setSubhead] = useState(
    "DevOpsBD Technologies Ltd builds scalable websites, mobile apps, cloud infrastructure, UI/UX designs, and enterprise software for growing businesses."
  );
  const [ctaPrimary, setCtaPrimary] = useState("Get Free Consultation");
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVideoSrc("/bg.mp4"), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/seo`)
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          if (data.heroBadge) setBadgeText(data.heroBadge);
          if (data.heroHeadline) setHeadline(data.heroHeadline);
          if (data.heroSubhead) setSubhead(data.heroSubhead);
          if (data.heroCtaPrimary) setCtaPrimary(data.heroCtaPrimary);
          if (data.typingWords && data.typingWords.length > 0) setWords(data.typingWords);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length] || "custom web applications.";
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text === currentWord) {
          setTimeout(() => setIsDeleting(true), 1600);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  return (
    <section className="relative bg-[#0A111C] text-white overflow-hidden font-sans border-b border-slate-800/80">

      {/* Background Cinematic Video Layer - deferred until page is interactive */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-gradient-to-b from-[#0B121E] via-[#0B121E]/95 to-[#0B121E]">
        {videoSrc && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover object-center opacity-40 filter contrast-125 brightness-90"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B121E]/95 via-[#0B121E]/80 to-[#0B121E]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D4F12A]/10 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full pt-[120px] sm:pt-[140px] lg:pt-[160px] pb-12 sm:pb-16 lg:pb-20 text-center flex flex-col items-center">

        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="bg-[#D4F12A] text-slate-950 font-black text-sm sm:text-base tracking-widest uppercase px-5 py-2 inline-flex items-center gap-2 rounded-sm shadow-lg">
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>{badgeText}</span>
          </span>
        </motion.div>

        {/* Headline with Typewriter */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.2] w-full mb-6 min-h-[48px] sm:min-h-[60px] text-center"
        >
          {headline}{" "}
          <span className="text-[#D4F12A] underline decoration-[#D4F12A]/40 underline-offset-8 inline">
            {text}
          </span>
          <span className="animate-pulse text-[#D4F12A] font-light ml-1">|</span>
        </motion.h1>

        {/* Paragraph Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-200 text-base sm:text-xl lg:text-xl leading-relaxed max-w-4xl font-normal mb-8 sm:mb-10 text-center px-2 sm:px-0"
        >
          {subhead}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 mb-10 sm:mb-12 w-full px-4 sm:px-0"
        >
          {/* Primary Yellow Button */}
          <Link
            href="#contact"
            className="bg-[#D4F12A] hover:bg-lime-400 text-slate-950 font-black text-sm sm:text-base uppercase tracking-wider w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 transition-all shadow-2xl hover:scale-105 inline-flex justify-center items-center gap-3 rounded-sm"
          >
            <span>{ctaPrimary}</span>
            <span className="text-base">▶</span>
          </Link>

          {/* Secondary Button Box */}
          <Link
            href="#services"
            className="flex items-center justify-center gap-4 group cursor-pointer w-full sm:w-auto px-4 py-3 sm:p-0 bg-white/5 sm:bg-transparent rounded-lg sm:rounded-none border border-white/10 sm:border-none"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 border-2 border-white/60 group-hover:border-[#D4F12A] flex items-center justify-center transition-colors rounded-sm">
              <Play className="w-5 h-5 text-white fill-white group-hover:text-[#D4F12A] group-hover:fill-[#D4F12A] transition-colors ml-0.5" />
            </div>
            <div className="text-left">
              <span className="text-sm sm:text-base font-bold text-white block group-hover:text-[#D4F12A] transition-colors leading-tight">
                Explore Our Services
              </span>
              <span className="text-xs sm:text-sm font-mono text-slate-400 uppercase tracking-widest block mt-0.5">
                ENTERPRISE SOLUTIONS
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Highlight Feature Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-12 pt-6 border-t border-slate-800/90 w-full"
        >
          {highlights.map((h, i) => (
            <div key={i} className="flex items-center justify-center gap-2.5 text-sm sm:text-base font-mono font-medium text-slate-200 bg-[#111A29]/70 w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-xl sm:rounded-full border border-slate-800 shadow-md">
              <h.icon className="w-5 h-5 text-[#D4F12A] shrink-0" />
              <span>{h.label}</span>
            </div>
          ))}
        </motion.div>

      </div>

    </section>
  );
}
