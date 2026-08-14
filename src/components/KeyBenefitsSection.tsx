"use client";
import { API_URL } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const keyBenefits = [
  "Enterprise Cloud Architecture",
  "DevOps & CI/CD Pipeline Automation",
  "Scalable Web & Mobile Engineering",
  "24/7 Security Monitoring & 99.99% SLA",
];

export default function KeyBenefitsSection() {
  const [images, setImages] = useState<string[]>([
    "/images/unsplash/benefits_1.jpg",
    "/images/unsplash/benefits_2.jpg"
  ]);

  useEffect(() => {
    fetch(`${API_URL}/api/media`)
      .then(res => {
        if (!res.ok) throw new Error("API not found");
        return res.json();
      })
      .then(data => {
        if (data && data.benefitsImages && data.benefitsImages.length >= 2) {
          setImages(data.benefitsImages);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="bg-[#0A111C] text-white section-padding relative z-10 font-sans border-b border-white/[0.08]">

      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#D4F12A_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Text & Benefits List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-sm font-mono font-bold tracking-widest text-[#D4F12A] uppercase block">
              KEY BENEFITS
            </span>

            <h2 className="text-4xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Unlock Your Business Growth with Modern Tech Architecture
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
              We partner with fast-growing startups and enterprise companies to optimize cloud infrastructure, accelerate software deployment cycles, and build high-performance digital products.
            </p>

            {/* Checkmark List */}
            <div className="space-y-3 pt-2">
              {keyBenefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D4F12A]/10 border border-[#D4F12A] flex items-center justify-center shrink-0">
                    <span className="text-[#D4F12A] font-bold text-sm">✓</span>
                  </div>
                  <span className="text-sm sm:text-base font-extrabold text-white tracking-wide">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                href="#contact"
                className="inline-flex items-center gap-1.5 px-6 py-3.5 bg-[#D4F12A] hover:bg-lime-400 text-zinc-950 font-extrabold text-sm tracking-wider uppercase transition-all duration-300 shadow-md group"
              >
                <span>Read More</span>
                <span className="text-xs group-hover:translate-x-1 transition-transform">▶</span>
              </Link>
            </div>

          </motion.div>

          {/* Right Column: 2-Photo Grid with Overlapping Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="grid grid-cols-12 gap-4 items-center">

              {/* Photo 1 (Main Left) */}
              <div className="col-span-7 relative h-72 sm:h-96 border border-white/[0.08] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md">
                <Image
                  src={images[0]}
                  alt="Corporate Executive Presentation"
                  fill
                  sizes="(max-width: 640px) 100vw, 60vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              {/* Photo 2 (Smaller Overlapping Right) */}
              <div className="col-span-5 relative h-56 sm:h-72 border border-white/[0.08] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md">
                <Image
                  src={images[1]}
                  alt="Team Collaboration Workstation"
                  fill
                  sizes="(max-width: 640px) 100vw, 40vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
