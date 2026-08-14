"use client";
import { API_URL } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe2, Building2, CheckCircle2, ArrowRight, Sparkles, ShieldCheck, Zap, Users, Award, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollBackground from "@/components/ScrollBackground";
import AITwinChat from "@/components/AITwinChat";
import { companyInfo, stats } from "@/data/portfolio";
import { useState, useEffect } from "react";

const brandLogos = [
  {
    name: "zerotype",
    svg: (
      <svg className="h-7 w-auto fill-current text-slate-400 hover:text-white transition-colors" viewBox="0 0 160 40">
        <path d="M10 20 L25 10 L40 20 L25 30 Z" fill="#D4F12A" />
        <circle cx="25" cy="20" r="4" fill="#0B121E" />
        <text x="50" y="27" fontSize="22" fontWeight="bold" fontFamily="sans-serif">zerotype</text>
      </svg>
    ),
  },
  {
    name: "deepay",
    svg: (
      <svg className="h-7 w-auto fill-current text-slate-400 hover:text-white transition-colors" viewBox="0 0 160 40">
        <circle cx="15" cy="20" r="7" fill="#D4F12A" />
        <circle cx="27" cy="20" r="5" fill="#94A3B8" />
        <text x="42" y="27" fontSize="22" fontWeight="extrabold" fontFamily="sans-serif">deepay</text>
      </svg>
    ),
  },
  {
    name: "TOTB+",
    svg: (
      <svg className="h-7 w-auto fill-current text-slate-400 hover:text-white transition-colors" viewBox="0 0 160 40">
        <polygon points="10,30 25,10 40,30" fill="none" stroke="#D4F12A" strokeWidth="4" />
        <text x="50" y="27" fontSize="22" fontWeight="extrabold" fontFamily="sans-serif">TOTB+</text>
      </svg>
    ),
  },
  {
    name: "PICCASO",
    svg: (
      <svg className="h-7 w-auto fill-current text-slate-400 hover:text-white transition-colors" viewBox="0 0 160 40">
        <circle cx="15" cy="20" r="8" fill="#94A3B8" />
        <circle cx="25" cy="20" r="8" fill="#D4F12A" opacity="0.8" />
        <text x="45" y="27" fontSize="22" fontWeight="bold" letterSpacing="1" fontFamily="sans-serif">PICCASO</text>
      </svg>
    ),
  },
  {
    name: "ZEVANA",
    svg: (
      <svg className="h-7 w-auto fill-current text-slate-400 hover:text-white transition-colors" viewBox="0 0 160 40">
        <path d="M10 10 L40 10 L10 30 L40 30" fill="none" stroke="#D4F12A" strokeWidth="4" />
        <text x="50" y="27" fontSize="22" fontWeight="black" letterSpacing="2" fontFamily="sans-serif">ZEVANA</text>
      </svg>
    ),
  },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    title: "Engineering Collaboration Lab",
    subtitle: "Software Engineers & Cloud Architects in Dhaka HQ",
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
    title: "Executive Strategy Board",
    subtitle: "Consulting with Global Enterprise Clients",
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
    title: "Product Design & UX Workshop",
    subtitle: "Creating Modern Web & Mobile UI Systems",
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    title: "Global Tech Tower",
    subtitle: "Gulshan-2 Financial District Headquarters",
  },
];

const leadershipTeam = [
  {
    name: "Hendrik Morella",
    role: "Founder & Chief Executive Officer",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
    bio: "15+ years experience in enterprise cloud transformation, Kubernetes, and global tech firm expansion.",
  },
  {
    name: "Sarah Jenkins",
    role: "VP of Cloud Architecture & DevOps",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    bio: "Former AWS Principal Architect specializing in microservices, SLA 99.99% fault tolerance, and CI/CD.",
  },
  {
    name: "Michael Chen",
    role: "Head of Software Engineering",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
    bio: "Expert in Next.js, distributed backend systems, fintech APIs, and high-concurrency database optimization.",
  },
];

const milestones = [
  {
    year: "2018",
    title: "Firm Incorporation",
    description: "Established DevOpsBD Technologies in Gulshan-2, Dhaka with core focus on DevOps & web application engineering.",
  },
  {
    year: "2020",
    title: "Global Expansion",
    description: "Expanded remote consulting hubs across UK, USA, and UAE, delivering cloud solutions to 300+ clients.",
  },
  {
    year: "2022",
    title: "Enterprise Practice Launch",
    description: "Introduced SLA 99.99% high-availability cluster architecture and enterprise digital transformation advisory.",
  },
  {
    year: "2025",
    title: "1,200+ Corporate Clients",
    description: "Recognized as a leading IT & Software firm in South Asia, serving startups, scale-ups, and multinationals.",
  },
];

export default function AboutPageClient() {
  const [leaders, setLeaders] = useState(leadershipTeam);

  useEffect(() => {
    fetch(`${API_URL}/api/team`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const dbLeaders = data.slice(0, 4);
          if (dbLeaders.length > 0) {
            setLeaders(dbLeaders.map((m: any) => ({
              name: m.name,
              role: m.role,
              image: m.avatar || "/images/team/member.png",
              bio: m.bio || m.experience,
            })));
          }
        }
      })
      .catch(err => console.error("Failed to load leadership team:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#0B121E] text-white flex flex-col font-sans selection:bg-[#D4F12A] selection:text-slate-950">
      <ScrollBackground />
      <Navbar />

      <main className="flex-1 pt-28 pb-20 relative z-10" id="main-content">
        
        {/* 1. Header Hero Banner */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#D4F12A]/10 border border-[#D4F12A]/30 text-sm font-mono font-bold text-[#D4F12A] mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#D4F12A]" />
              <span>CORPORATE OVERVIEW &amp; MISSION</span>
            </div>

            <h1 className="text-5xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-white">
              Engineering Digital Excellence
              <span className="text-[#D4F12A]">For Global Growth</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-base leading-relaxed font-normal mb-10">
              DevOpsBD Technologies is a full-service software development and cloud engineering firm helping startups, scale-ups, and global enterprises build scalable digital products.
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-[#111A29] border border-slate-800 shadow-2xl">
              {stats.slice(0, 4).map((st) => (
                <div key={st.label} className="text-center">
                  <div className="text-4xl sm:text-5xl font-black text-[#D4F12A] mb-2">
                    {st.value}
                    {st.suffix}
                  </div>
                  <div className="text-sm font-mono text-slate-400 uppercase tracking-wider mt-1">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 2. Trusted By Logos Bar */}
        <section className="bg-[#111A29] py-8 border-y border-slate-800 mb-20">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
            <p className="text-center text-sm font-mono font-bold tracking-widest text-[#D4F12A] uppercase mb-6">
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
        </section>

        {/* 3. Main Cloned About Us Section */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 relative"
            >
              <div className="grid grid-cols-2 gap-3 relative">
                <div className="relative h-44 sm:h-52 w-full overflow-hidden border border-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop"
                    alt="Corporate consulting meeting"
                    fill
                    sizes="(max-width: 768px) 50vw, 300px"
                    className="object-cover"
                  />
                </div>
                <div className="relative h-44 sm:h-52 w-full overflow-hidden border border-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
                    alt="Business executive discussion"
                    fill
                    sizes="(max-width: 768px) 50vw, 300px"
                    className="object-cover"
                  />
                </div>
                <div className="relative h-44 sm:h-52 w-full overflow-hidden border border-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop"
                    alt="Data analysis team"
                    fill
                    sizes="(max-width: 768px) 50vw, 300px"
                    className="object-cover"
                  />
                </div>
                <div className="relative h-44 sm:h-52 w-full overflow-hidden border border-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop"
                    alt="Strategy planning workshop"
                    fill
                    sizes="(max-width: 768px) 50vw, 300px"
                    className="object-cover"
                  />
                </div>

                {/* Centered Yellow Badge */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-[#D4F12A] w-36 h-36 sm:w-44 sm:h-44 p-4 text-center text-black flex flex-col items-center justify-center shadow-2xl z-20 pointer-events-auto hover:scale-105 transition-transform duration-300">
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
              <span className="text-sm font-mono font-bold tracking-widest text-slate-400 uppercase">
                ABOUT US
              </span>
              <h2 className="text-4xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                The primary goal of business consulting is to help organizations achieve sustainable performance.
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
                DevOpsBD Technologies Ltd helps startups and enterprises build scalable websites, mobile apps, cloud infrastructure, modern UI/UX designs, and enterprise software solutions with 99.99% cluster SLA.
              </p>

              {/* Quote Block */}
              <div className="border-l-2 border-[#D4F12A] pl-4 py-2 bg-[#111A29]/80 my-2">
                <p className="text-sm text-slate-300 italic leading-relaxed">
                  &quot;Our engineering philosophy centers around zero-downtime deployments, enterprise-grade cloud security, and ultra-responsive user interfaces.&quot;
                </p>
                <span className="text-xs text-slate-400 font-mono mt-2 uppercase tracking-wider block">
                  - ZEROXE FOUNDER &amp; CEO
                </span>
              </div>

              {/* Author Profile Footer */}
              {leaders.length > 0 && (
                <div className="flex items-center gap-3 pt-2">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-700 shrink-0">
                    <Image
                      src={leaders[0].image}
                      alt={leaders[0].name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{leaders[0].name}</h4>
                    <p className="text-sm font-bold text-[#D4F12A] uppercase tracking-wider">
                      {leaders[0].role}
                    </p>
                  </div>
                </div>
              )}

            </motion.div>

          </div>
        </section>

        {/* 4. Company Milestones / Evolution Timeline */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 mb-24">
          <div className="text-center mb-12">
            <span className="text-sm font-mono font-bold text-[#D4F12A] tracking-widest uppercase block mb-2">
              OUR EVOLUTION
            </span>
            <h2 className="text-4xl sm:text-4xl font-extrabold text-white">
              Key Company Milestones
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((ms, idx) => (
              <div key={idx} className="bg-[#111A29] border border-slate-800 p-6 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4F12A] text-slate-950 font-mono font-black text-sm uppercase mb-4">
                    <Calendar className="w-3.5 h-3.5 text-slate-950" />
                    <span>{ms.year}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-white mb-2">{ms.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-normal">{ms.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Corporate Office & Team Photo Gallery */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 mb-24">
          <div className="text-center mb-12">
            <span className="text-sm font-mono font-bold text-[#D4F12A] tracking-widest uppercase block mb-2">
              OUR WORK ENVIRONMENT
            </span>
            <h2 className="text-4xl sm:text-4xl font-extrabold text-white">
              Inside DevOpsBD Headquarters
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-64 sm:h-72 overflow-hidden border border-slate-800 shadow-2xl bg-[#111A29]"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-500 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B121E] via-[#0B121E]/40 to-transparent opacity-90 p-5 flex flex-col justify-end">
                  <span className="text-sm font-bold text-[#D4F12A] block">{img.title}</span>
                  <span className="text-sm text-slate-300 font-mono mt-0.5">{img.subtitle}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6. Executive Leadership Team Section */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 mb-24">
          <div className="text-center mb-12 max-w-xl mx-auto">
            <span className="text-sm font-mono font-bold text-[#D4F12A] tracking-widest uppercase block mb-2">
              EXECUTIVE LEADERSHIP
            </span>
            <h2 className="text-4xl sm:text-4xl font-extrabold text-white">
              Meet Our Engineering Directors
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaders.slice(0, 4).map((member, idx) => (
              <div key={idx} className="bg-[#111A29] border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
                <div className="relative h-96 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111A29] via-transparent to-transparent opacity-80" />
                </div>
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-white">{member.name}</h3>
                    <p className="text-sm font-mono text-[#D4F12A] font-bold mt-0.5 mb-3">{member.role}</p>
                    <p className="text-sm text-slate-400 leading-relaxed font-normal">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Global Hubs Section */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 mb-20">
          <div className="p-8 sm:p-12 bg-[#111A29] border border-slate-800 text-center shadow-2xl">
            <h2 className="text-xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">
              Our Global Operating <span className="text-[#D4F12A]">Hubs</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-normal mb-8 max-w-xl mx-auto">
              Serving clients across North America, Europe, the Middle East, and Asia with 24/7 engineering coverage.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {companyInfo.globalHubs.map((hub) => (
                <div key={hub} className="p-4 bg-[#0B121E] border border-slate-800 font-mono text-sm font-bold text-white">
                  🌍 {hub}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Bottom CTA */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6">
          <div className="bg-[#111A29] border border-slate-800 p-8 sm:p-12 text-center overflow-hidden shadow-2xl">
            <h2 className="text-4xl sm:text-4xl font-black mb-4 text-white">
              Ready to Work With <span className="text-[#D4F12A]">DevOpsBD?</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-normal mb-8 max-w-xl mx-auto">
              Schedule a technical consultation with our engineering directors today.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="#contact"
                className="px-8 py-3.5 bg-[#D4F12A] hover:bg-lime-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-lg transition-colors flex items-center gap-2"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <AITwinChat />
    </div>
  );
}
