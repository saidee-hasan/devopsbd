"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Send, MessageSquareQuote, Globe, ArrowUpRight } from "lucide-react";
import { companyInfo } from "@/data/portfolio";
import { toast } from "@/components/ui/sonner";
import {
  CONTACT_CLIENT_TIMEOUT_MS,
  CONTACT_HONEYPOT_FIELD,
  CONTACT_REASONS,
  contactSchema,
  type ContactFormData,
} from "@/lib/contact";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const COMPANY_CONTACT_CARDS = [
  {
    icon: Mail,
    label: "Business Email",
    value: companyInfo.email,
    subValue: companyInfo.salesEmail,
    href: `mailto:${companyInfo.email}`,
  },
  {
    icon: Phone,
    label: "Phone & WhatsApp",
    value: companyInfo.phone,
    subValue: companyInfo.phoneUS,
    href: `tel:${companyInfo.phone}`,
  },
  {
    icon: MapPin,
    label: "Global Headquarters",
    value: companyInfo.address,
    subValue: "Remote Hubs: UK, USA, UAE",
    href: "#map",
  },
];

const INITIAL_FORM: ContactFormData = {
  name: "",
  email: "",
  reason: CONTACT_REASONS[0],
  message: "",
};

type ContactField = keyof ContactFormData;
type ContactErrors = Partial<Record<ContactField, string>>;

const ContactSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
  const [honeypot, setHoneypot] = useState("");
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const nextErrors = parsed.error.issues.reduce<ContactErrors>((acc, issue) => {
        const field = issue.path[0];
        if (typeof field === "string" && !(field in acc)) {
          acc[field as ContactField] = issue.message;
        }
        return acc;
      }, {});

      setErrors(nextErrors);
      toast.error("Please review form entries", {
        description: parsed.error.issues[0]?.message || "Check the highlighted fields and try again.",
      });
      return;
    }

    setErrors({});

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), CONTACT_CLIENT_TIMEOUT_MS);

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...parsed.data,
          startedAt,
          [CONTACT_HONEYPOT_FIELD]: honeypot,
        }),
        signal: controller.signal,
      });

      const data = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(data?.error || "Unable to send message right now.");
      }

      setForm(INITIAL_FORM);
      setHoneypot("");
      setStartedAt(Date.now());
      setErrors({});
      toast.success("Consultation Request Received!", {
        description: "Our engineering leads will review your inquiry and respond within 12 hours.",
      });
    } catch (error) {
      toast.error("Unable to submit inquiry", {
        description:
          error instanceof DOMException && error.name === "AbortError"
            ? "The request timed out. Please try again."
            : error instanceof Error
              ? error.message
              : "Unable to send message right now.",
      });
    } finally {
      window.clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative z-10">
      <div className="container-narrow" ref={ref}>

        {/* Heading */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-subtle border border-primary/30 text-sm font-mono text-primary mb-4 shadow-[0_0_12px_rgba(41,214,185,0.12)]">
            Consultation & Business Inquiry
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Get a <span className="text-gradient">Free Consultation</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-base leading-relaxed font-medium">
            Let&apos;s discuss your project scope, timeline, budget, and engineering requirements with our senior software leads.
          </p>
        </motion.div>

        {/* Contact Cards & Form */}
        <div className="grid lg:grid-cols-2 gap-6 items-stretch max-w-5xl 2xl:max-w-7xl mx-auto mb-12">

          {/* Left panel — Corporate Contact Info */}
          <SpotlightCard delay={0.1} className="h-full">
            <div className="p-6 sm:p-8 md:p-10 flex flex-col gap-6 h-full justify-between">
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-xl sm:text-4xl font-extrabold mb-3 tracking-tight">Contact DevOpsBD</h3>
                  <p className="text-base text-muted-foreground leading-relaxed font-medium">
                    Whether you are a startup launching your MVP or an enterprise scaling cloud infrastructure, our engineering leads are ready to consult on your roadmap.
                  </p>
                </div>

                {/* Company details */}
                <div className="flex flex-col gap-3">
                  {COMPANY_CONTACT_CARDS.map(({ icon: Icon, label, value, subValue, href }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_self"}
                      className="group flex items-start gap-4 px-5 py-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 border border-black/5 dark:border-white/5 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors mt-0.5">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-0.5">{label}</p>
                        <p className="text-base font-bold text-foreground/90 leading-snug">{value}</p>
                        {subValue && <p className="text-sm text-muted-foreground font-mono mt-0.5">{subValue}</p>}
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Status pill */}
              <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                <span>DevOpsBD Engineering Leads Online — Average response time under 2 hours</span>
              </div>
            </div>
          </SpotlightCard>

          {/* Right panel — Inquiry Form */}
          <SpotlightCard delay={0.2} className="h-full">
            <form onSubmit={handleSubmit} className="relative p-6 sm:p-8 md:p-10 flex flex-col gap-6 h-full justify-between" aria-busy={isSubmitting} noValidate>
              <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  name={CONTACT_HONEYPOT_FIELD}
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                />
              </div>

              <div className="flex flex-col gap-5 flex-1">
                <div>
                  <h3 className="text-xl sm:text-4xl font-extrabold mb-2 tracking-tight">Project Inquiry Form</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
                    Submit your project parameters and target goals. We will prepare an estimated timeline and proposal.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="text-sm font-mono font-bold text-foreground/80 mb-1.5 block uppercase tracking-wider">Your Name / Company</label>
                    <input
                      id="contact-name"
                      required
                      minLength={2}
                      maxLength={80}
                      autoComplete="name"
                      disabled={isSubmitting}
                      value={form.name}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value });
                        if (errors.name) {
                          setErrors((current) => ({ ...current, name: undefined }));
                        }
                      }}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm sm:text-base outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/40 font-medium"
                      placeholder="e.g. Acma Corp / John Doe"
                    />
                    {errors.name && (
                      <p id="contact-name-error" className="mt-1.5 text-sm text-destructive">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="text-sm font-mono font-bold text-foreground/80 mb-1.5 block uppercase tracking-wider">Business Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      maxLength={120}
                      autoComplete="email"
                      disabled={isSubmitting}
                      value={form.email}
                      onChange={(e) => {
                        setForm({ ...form, email: e.target.value });
                        if (errors.email) {
                          setErrors((current) => ({ ...current, email: undefined }));
                        }
                      }}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm sm:text-base outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/40 font-medium"
                      placeholder="john@company.com"
                    />
                    {errors.email && (
                      <p id="contact-email-error" className="mt-1.5 text-sm text-destructive">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-reason" className="text-sm font-mono font-bold text-foreground/80 mb-1.5 block uppercase tracking-wider">Project Type / Reason</label>
                  <div className="relative">
                    <select
                      id="contact-reason"
                      disabled={isSubmitting}
                      value={form.reason}
                      onChange={(e) => {
                        setForm({ ...form, reason: e.target.value as ContactFormData["reason"] });
                        if (errors.reason) {
                          setErrors((current) => ({ ...current, reason: undefined }));
                        }
                      }}
                      aria-invalid={Boolean(errors.reason)}
                      aria-describedby={errors.reason ? "contact-reason-error" : undefined}
                      className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm sm:text-base outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all appearance-none font-medium"
                    >
                      {CONTACT_REASONS.map((r) => (
                        <option key={r} value={r} className="bg-background text-foreground">{r}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  {errors.reason && (
                    <p id="contact-reason-error" className="mt-1.5 text-sm text-destructive">
                      {errors.reason}
                    </p>
                  )}
                </div>

                <div className="flex-1 flex flex-col min-h-[120px]">
                  <label htmlFor="contact-message" className="text-sm font-mono font-bold text-foreground/80 mb-1.5 block uppercase tracking-wider">Project Scope & Details</label>
                  <textarea
                    id="contact-message"
                    required
                    minLength={10}
                    maxLength={2000}
                    disabled={isSubmitting}
                    value={form.message}
                    onChange={(e) => {
                      setForm({ ...form, message: e.target.value });
                      if (errors.message) {
                        setErrors((current) => ({ ...current, message: undefined }));
                      }
                    }}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    className="flex-1 w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm sm:text-base outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none placeholder:text-muted-foreground/40 font-medium"
                    placeholder="Describe your tech requirements, target timeline, and features..."
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="mt-1.5 text-sm text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm sm:text-base tracking-wide shadow-[0_0_20px_rgba(41,214,185,0.22)] hover:bg-primary/90 transition-all duration-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Submitting Inquiry..." : "Submit Consultation Request"}
                </button>
              </div>
            </form>
          </SpotlightCard>
        </div>

        {/* Embedded Google Map */}
        <div id="map" className="w-full max-w-5xl 2xl:max-w-7xl mx-auto rounded-3xl border border-white/10 overflow-hidden shadow-accent-card">
          <div className="p-4 bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-mono text-foreground font-bold">
              <Globe className="w-4 h-4 text-primary" /> DevOpsBD Technologies Global Office — Gulshan-2, Dhaka
            </div>
            <span className="text-xs font-mono text-muted-foreground uppercase px-2 py-0.5 rounded bg-white/5">Interactive Map</span>
          </div>
          <iframe
            title="DevOpsBD Technologies Office Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.042571217032!2d90.4132890760777!3d23.781515988226027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f7572797%3A0x6b19a71a5c6f370!2sGulshan-2%2C%20Dhaka%201212!5e0!3m2!1sen!2sbd!4v1718000000000!5m2!1sen!2sbd"
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full rounded-b-3xl opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
