"use client";
import { API_URL } from "@/lib/api";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const brandLogos = [
  {
    name: "zerotype",
    svg: (
      <svg className="h-7 w-auto fill-current text-zinc-300 hover:text-white transition-colors" viewBox="0 0 160 40">
        <text x="0" y="27" fontSize="24" fontWeight="bold" fontFamily="sans-serif" letterSpacing="-1">zerotype</text>
      </svg>
    ),
  },
  {
    name: "deepay",
    svg: (
      <svg className="h-7 w-auto fill-current text-zinc-300 hover:text-white transition-colors" viewBox="0 0 160 40">
        <text x="0" y="27" fontSize="24" fontWeight="extrabold" fontFamily="sans-serif">deepay</text>
        <circle cx="95" cy="18" r="4" fill="#D4F12A" />
      </svg>
    ),
  },
  {
    name: "TOTB+",
    svg: (
      <svg className="h-7 w-auto fill-current text-zinc-300 hover:text-white transition-colors" viewBox="0 0 120 40">
        <text x="0" y="27" fontSize="24" fontWeight="black" fontFamily="monospace" letterSpacing="1">TOTB</text>
        <text x="65" y="25" fontSize="24" fontWeight="black" fill="#D4F12A">+</text>
      </svg>
    ),
  },
  {
    name: "PICCASO",
    svg: (
      <svg className="h-7 w-auto fill-current text-zinc-300 hover:text-white transition-colors" viewBox="0 0 160 40">
        <text x="0" y="27" fontSize="22" fontWeight="bold" letterSpacing="4" fontFamily="sans-serif">PICCASO</text>
      </svg>
    ),
  },
  {
    name: "ZEVANA",
    svg: (
      <svg className="h-7 w-auto fill-current text-zinc-300 hover:text-white transition-colors" viewBox="0 0 160 40">
        <text x="0" y="27" fontSize="26" fontWeight="bold" letterSpacing="2" fontFamily="serif">ZEVANA</text>
      </svg>
    ),
  },
];

export default function AboutSection() {
  const [images, setImages] = useState<string[]>([
    "/images/unsplash/about_1.jpg",
    "/images/unsplash/about_2.jpg",
    "/images/unsplash/about_3.jpg",
    "/images/unsplash/about_4.jpg"
  ]);

  useEffect(() => {
    fetch(`${API_URL}/api/media`)
      .then(res => {
        if (!res.ok) throw new Error("API not found");
        return res.json();
      })
      .then(data => {
        if (data && data.aboutImages && data.aboutImages.length >= 4) {
          setImages(data.aboutImages);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="about" className="bg-[#0A111C] text-white relative z-10 font-sans border-b border-white/[0.08]">

      {/* Top Banner Row */}
      <div className="bg-white/[0.02] py-10 border-b border-white/[0.08]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
          <p className="text-center text-sm font-mono font-bold tracking-widest text-[#D4F12A] uppercase mb-8">
            TRUSTED BY 1.200+ POPULAR COMPANY
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-8 sm:gap-4 opacity-85 hover:opacity-100 transition-opacity">
            {brandLogos.map((logo) => (
              <div key={logo.name} className="flex items-center justify-center px-4">
                {logo.svg}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main ABOUT US Section */}
      <div className="section-padding max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: 4-Photo Grid with Centered Yellow Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="grid grid-cols-2 gap-3 relative">
              <div className="relative h-44 sm:h-52 w-full overflow-hidden border border-white/[0.08]">
                <Image
                  src={images[0]}
                  alt="Corporate consulting meeting"
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="relative h-44 sm:h-52 w-full overflow-hidden border border-white/[0.08]">
                <Image
                  src={images[1]}
                  alt="Business executive discussion"
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="relative h-44 sm:h-52 w-full overflow-hidden border border-white/[0.08]">
                <Image
                  src={images[2]}
                  alt="Data analysis team"
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="relative h-44 sm:h-52 w-full overflow-hidden border border-white/[0.08]">
                <Image
                  src={images[3]}
                  alt="Strategy planning workshop"
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              {/* Centered Neon Lime-Yellow Badge */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-[#D4F12A] w-36 h-36 sm:w-44 sm:h-44 p-4 text-center text-black flex flex-col items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md z-20 pointer-events-auto hover:scale-105 transition-transform duration-300">
                  <span className="text-4xl sm:text-5xl font-black tracking-tighter leading-none text-black">
                    4+
                  </span>
                  <span className="text-xs sm:text-sm font-black tracking-widest uppercase text-black mt-1">
                    YEARS EXP
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-center space-y-4"
          >
            <span className="text-sm font-mono font-bold tracking-widest text-[#D4F12A] uppercase">
              ABOUT DEVOPSBD TECHNOLOGIES
            </span>
            <h2 className="text-4xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Delivering Enterprise Cloud, Software Engineering &amp; AI Solutions.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              DevOpsBD Technologies empowers startups and enterprise companies with scalable cloud infrastructure, high-performance web applications, modern mobile software, and AI integrations.
            </p>

            {/* Quote Block with Yellow Border */}
            <div className="border-l-2 border-[#D4F12A] pl-4 py-2 bg-white/[0.02]/50 my-2">
              <p className="text-sm text-zinc-300 italic leading-relaxed">
                &quot;Our commitment is to deliver clean architecture, robust security, and seamless digital transformation that empowers our clients to scale globally with confidence.&quot;
              </p>
              <span className="text-xs text-[#D4F12A] font-mono mt-2 uppercase tracking-wider block font-bold">
                - DEVOPSBD LEADERSHIP
              </span>
            </div>

            {/* Author Profile Footer */}
            <div className="flex items-center gap-3 pt-2">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4F12A] shrink-0 shadow-md">
                <Image
                  src="/images/ceo-saidee-hasan.jpg"
                  alt="Saidee Hasan - Founder & Managing Director"
                  fill
                  sizes="48px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Saidee Hasan</h4>
                <p className="text-sm font-bold text-[#D4F12A] uppercase tracking-wider">
                  FOUNDER &amp; MANAGING DIRECTOR
                </p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
