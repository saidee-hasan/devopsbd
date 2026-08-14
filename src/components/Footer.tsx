"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Dribbble, Linkedin, Youtube, Phone, Mail, MapPin, Github } from "lucide-react";
import { companyInfo } from "@/data/portfolio";

const loadFooterFromStorage = (() => {
  let cached: any = undefined;
  return () => {
    if (cached !== undefined) return cached;
    try {
      const stored = localStorage.getItem("devopsbd_footer_data");
      cached = stored ? JSON.parse(stored) : null;
    } catch {
      cached = null;
    }
    return cached;
  };
})();

export default function Footer() {
  const [quickLinks, setQuickLinks] = useState(() =>
    loadFooterFromStorage()?.quickLinks ?? [
      { id: "1", name: "About Us", href: "/about" },
      { id: "2", name: "Our Services", href: "/services" },
      { id: "3", name: "Case Studies", href: "/portfolio" },
      { id: "4", name: "Careers", href: "/careers" },
      { id: "5", name: "Contact Us", href: "/contact" },
    ]
  );

  const [serviceLinks, setServiceLinks] = useState(() =>
    loadFooterFromStorage()?.serviceLinks ?? [
      { id: "1", name: "Website Development", href: "#services" },
      { id: "2", name: "Web Application Development", href: "#services" },
      { id: "3", name: "Mobile App Development", href: "#services" },
      { id: "4", name: "DevOps & Cloud Solutions", href: "#services" },
      { id: "5", name: "Custom Software Engineering", href: "#services" },
    ]
  );

  const [socialMap, setSocialMap] = useState<Record<string, string>>(() => {
    const storedSocialLinks = loadFooterFromStorage()?.socialLinks;
    if (storedSocialLinks) {
      const map: Record<string, string> = {};
      storedSocialLinks.forEach((s: { platform: string; url: string }) => {
        map[s.platform] = s.url;
      });
      return map;
    }
    return {
      facebook: companyInfo.social.facebook,
      twitter: companyInfo.social.twitter,
      linkedin: companyInfo.social.linkedin,
      youtube: companyInfo.social.youtube,
      github: companyInfo.social.github,
    };
  });

  const [contactData, setContactData] = useState(() =>
    loadFooterFromStorage()?.contactDetails ?? {
      email: companyInfo.email,
      phone: companyInfo.phone,
      address: companyInfo.address,
      copyright: "DevOpsBD Technologies Ltd © 2026. All rights reserved.",
      footerDesc: "DevOpsBD Technologies Ltd helps startups and enterprise businesses build scalable cloud infrastructure, custom software, modern UI/UX designs, and AI solutions.",
    }
  );

  const socialIcons = [
    { platform: "facebook", icon: Facebook, href: socialMap.facebook || "#" },
    { platform: "twitter", icon: Twitter, href: socialMap.twitter || "#" },
    { platform: "linkedin", icon: Linkedin, href: socialMap.linkedin || "#" },
    { platform: "youtube", icon: Youtube, href: socialMap.youtube || "#" },
    { platform: "github", icon: Github, href: socialMap.github || "#" },
  ];

  return (
    <footer className="bg-white/[0.02] text-white relative z-10 font-sans border-t border-white/[0.08] overflow-hidden">
      
      {/* Background Decorative Wave SVG Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 400" fill="none" preserveAspectRatio="none">
          <path
            d="M0 100 C300 300 600 -100 900 200 C1200 50 1440 250 1440 250 V400 H0 Z"
            fill="url(#footer-wave-gradient)"
          />
          <defs>
            <linearGradient id="footer-wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4F12A" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#0B121E" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D4F12A" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Top Header Row */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8 border-b border-white/10 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Logo */}
          <Link href="/" aria-label="DevOpsBD Technologies Home" className="flex items-center gap-3">
            <div className="relative h-10 w-56 flex items-center">
              <Image
                src="/devopsbd-logo-v3.png"
                alt="DevOpsBD Logo"
                fill
                sizes="224px"
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Social Media Icons */}
          <div className="flex items-center gap-2.5">
            {socialIcons.map((soc, idx) => (
              <a
                key={idx}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900/90 hover:bg-[#D4F12A] text-zinc-300 hover:text-zinc-950 flex items-center justify-center transition-all duration-300 border border-white/10/80 shadow-sm"
              >
                <soc.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* 4-Column Grid Section */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Column 1: About Description */}
          <div className="lg:col-span-4 space-y-3">
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm font-normal">
              {contactData.footerDesc}
            </p>
          </div>

          {/* Column 2: QUICK LINKS */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-mono font-bold tracking-widest text-white uppercase border-b border-white/[0.08] pb-2">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              {quickLinks.map((link: { id: string; name: string; href: string }, idx: number) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-[#D4F12A] transition-colors flex items-center gap-1.5">
                    <span className="text-[#D4F12A] text-xs">›</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: OUR SERVICE LIST */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-mono font-bold tracking-widest text-white uppercase border-b border-white/[0.08] pb-2">
              OUR SERVICE LIST
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              {serviceLinks.map((service: { id: string; name: string; href: string }, idx: number) => (
                <li key={idx}>
                  <Link href={service.href} className="hover:text-[#D4F12A] transition-colors flex items-center gap-1.5">
                    <span className="text-[#D4F12A] text-xs">›</span>
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: CONTACT */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-mono font-bold tracking-widest text-white uppercase border-b border-white/[0.08] pb-2">
              CONTACT
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4F12A] shrink-0 mt-0.5" />
                <span>{contactData.address}<br />Remote Hubs: UK, USA, UAE</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4F12A] shrink-0" />
                <span>{contactData.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4F12A] shrink-0" />
                <a href={`mailto:${contactData.email}`} className="hover:text-[#D4F12A] transition-colors">
                  {contactData.email}
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Row in Neon Yellow font */}
      <div className="bg-[#0A111C] py-4 border-t border-white/[0.08] relative z-10 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-12 gap-3">
        <p className="text-sm font-mono font-bold text-[#D4F12A] tracking-wider">
          {contactData.copyright}
        </p>
        <div className="flex gap-6 text-xs text-zinc-400 font-mono tracking-wider">
          <Link href="/privacy" className="hover:text-[#D4F12A] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#D4F12A] transition-colors">Terms of Service</Link>
        </div>
      </div>

    </footer>
  );
}
