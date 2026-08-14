"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, MessageSquareQuote } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { scrollToHash } from "@/lib/scroll";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const shouldRestoreFocusRef = useRef(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let frameId: number | null = null;

    const updateScrolled = () => {
      frameId = null;
      const nextScrolled = window.scrollY > 40;
      setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));

      const activationLine = window.innerHeight * 0.35;
      let nextActiveSection: string | null = null;

      for (const link of navLinks) {
        if (!link.href.startsWith("#")) continue;
        const section = document.querySelector(link.href);
        if (!(section instanceof HTMLElement)) continue;

        const rect = section.getBoundingClientRect();
        if (rect.top <= activationLine && rect.bottom >= activationLine) {
          nextActiveSection = link.href;
          break;
        }
      }

      setActiveSection((prev) => (prev === nextActiveSection ? prev : nextActiveSection));
    };

    const onScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateScrolled);
    };

    updateScrolled();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const closeMenu = useCallback((restoreFocus = true) => {
    shouldRestoreFocusRef.current = restoreFocus;
    setIsOpen(false);
  }, []);

  const scrollToSection = useCallback((href: string) => {
    scrollToHash(href);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isMobile: boolean) => {
    if (!href.startsWith("#")) {
      e.preventDefault();
      if (isMobile) closeMenu(false);
      router.push(href);
      return;
    }
    e.preventDefault();
    setActiveSection(href);

    if (isMobile) closeMenu(false);

    if (window.location.pathname !== "/") {
      router.push("/" + href);
      return;
    }

    scrollToSection(href);
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      firstMobileLinkRef.current?.focus();
    }, shouldReduceMotion ? 0 : 120);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !mobileMenuRef.current) return;

      const focusable = Array.from(
        mobileMenuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener("keydown", handleKeyDown);

      if (shouldRestoreFocusRef.current) {
        menuButton?.focus();
      }

      shouldRestoreFocusRef.current = true;
    };
  }, [closeMenu, isOpen, shouldReduceMotion]);

  const mobileMenuTransition = shouldReduceMotion
    ? { duration: 0.18 }
    : { type: "spring" as const, stiffness: 260, damping: 28, mass: 0.8 };

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 sm:px-6 pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-[max(1rem,env(safe-area-inset-top))] pointer-events-none">
        <nav
          className={`pointer-events-auto transition-all duration-500 rounded-full w-full max-w-[1600px] flex items-center justify-between px-4 sm:px-6 md:px-8 h-16 sm:h-18 md:h-20 border ${
            scrolled
              ? "bg-[#111A29]/95 border-slate-800 shadow-2xl backdrop-blur-xl"
              : "bg-[#0B121E]/80 border-slate-800/80 backdrop-blur-md"
          }`}
        >
          {/* Logo */}
          <Link href="/" onClick={(e) => handleNavClick(e, "/", false)} aria-label="Go to DevOpsBD Technologies Home" className="flex items-center gap-2 group shrink-0">
            <div className="relative h-9 sm:h-10 md:h-11 w-44 sm:w-52 md:w-60 flex items-center">
              <Image
                src="/devopsbd-logo-v3.png"
                alt="DevOpsBD Logo"
                fill
                priority
                sizes="(max-width: 640px) 176px, (max-width: 768px) 208px, 240px"
                className="object-contain object-left transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5 xl:gap-2.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, false)}
                aria-current={activeSection === link.href ? "location" : undefined}
                className={`px-4 py-2 text-base xl:text-base font-semibold transition-all duration-200 rounded-full whitespace-nowrap ${
                  activeSection === link.href
                    ? "bg-[#D4F12A] text-slate-950 font-extrabold shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact", false)}
              className="flex items-center gap-2 px-5 py-2.5 text-base xl:text-base font-extrabold rounded-full bg-[#D4F12A] hover:bg-lime-400 text-slate-950 transition-all duration-300 active:scale-[0.97]"
            >
              <MessageSquareQuote className="w-4.5 h-4.5 text-slate-950" />
              Get Consultation
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => (isOpen ? closeMenu() : setIsOpen(true))}
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors active:scale-95 text-white"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => closeMenu()}
              className="md:hidden fixed inset-0 z-[90] bg-slate-950/80 backdrop-blur-[4px]"
              aria-hidden="true"
            />
            <motion.div
              id="mobile-navigation"
              ref={mobileMenuRef}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: -10 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto", y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: -10 }}
              transition={mobileMenuTransition}
              className="md:hidden fixed top-[calc(max(0.75rem,env(safe-area-inset-top))+4.5rem)] inset-x-3 sm:inset-x-4 z-[100] bg-[#111A29] border border-slate-800 overflow-hidden rounded-2xl shadow-2xl max-h-[82vh] overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="py-4 flex flex-col gap-1 px-4">
                <div className="flex flex-col gap-1 mb-2">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      ref={link === navLinks[0] ? firstMobileLinkRef : undefined}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href, true)}
                      aria-current={activeSection === link.href ? "location" : undefined}
                      className={`block px-4 py-2.5 text-base font-semibold rounded-xl transition-colors ${
                        activeSection === link.href
                          ? "bg-[#D4F12A] text-slate-950 font-bold"
                          : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                      }`}
                    >
                      {link.label}
          </a>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, "#contact", true)}
                    className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-extrabold rounded-xl bg-[#D4F12A] text-slate-950 active:scale-[0.97]"
                  >
                    <MessageSquareQuote className="w-4 h-4" />
                    Get Consultation
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
