"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { profile } from "@/data/profile";

// ─── App width (matches rest of site) ────────────────────────────────────────
const W = "w-[calc(100%-2rem)] lg:w-[calc(90%)] xl:w-[calc(80%)] mx-auto";

// ─── Social icons ─────────────────────────────────────────────────────────────

const icons = {
  github: {
    label: "GitHub",
    href: profile.social.github,
    color: "#ffffff",
    hoverBg: "hover:bg-white/10",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    animation: {
      hover: { rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } },
    },
  },
  linkedin: {
    label: "LinkedIn",
    href: profile.social.linkedin,
    color: "#0A66C2",
    hoverBg: "hover:bg-[#0A66C2]/10",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    animation: {
      hover: { y: [0, -4, 0], transition: { duration: 0.4 } },
    },
  },
  twitter: {
    label: "X / Twitter",
    href: profile.social.twitter,
    color: "#ffffff",
    hoverBg: "hover:bg-white/10",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    animation: {
      hover: { scale: [1, 1.2, 1], transition: { duration: 0.3 } },
    },
  },
  email: {
    label: "Email",
    href: `mailto:${profile.email}`,
    color: "#a855f7",
    hoverBg: "hover:bg-purple-500/10",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    animation: {
      hover: { x: [0, 3, -3, 3, 0], transition: { duration: 0.5 } },
    },
  },
};

// ─── Animated social icon ─────────────────────────────────────────────────────

function SocialIcon({ id }: { id: keyof typeof icons }) {
  const icon = icons[id];
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={icon.href}
      target={id === "email" ? "_self" : "_blank"}
      rel="noopener noreferrer"
      aria-label={icon.label}
      className={`relative w-11 h-11 rounded-full flex items-center justify-center
        border border-white/10 text-text-secondary transition-colors duration-200
        ${icon.hoverBg}`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.9 }}
      animate={hovered ? icon.animation.hover : {}}
      style={{ color: hovered ? icon.color : undefined }}
    >
      {/* Glow on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            key="glow"
            className="absolute inset-0 rounded-full"
            style={{ background: `${icon.color}18` }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
      <span className="relative z-10">{icon.svg}</span>
    </motion.a>
  );
}

// ─── Newsletter form ──────────────────────────────────────────────────────────

function NewsletterForm({ t }: { t: ReturnType<typeof useTranslations> }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    // Simulate — wire up to your mailing list API
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
    setEmail("");
  };

  return (
    <div className="max-w-xl mx-auto rounded-2xl border border-white/10 bg-background-secondary/60 backdrop-blur-sm p-6 lg:p-8">
      <p className="font-heading font-medium text-text-primary text-lg leading-snug mb-5">
        {t("newsletter.tagline")}
      </p>

      <p className="text-xs font-mono uppercase tracking-[0.2em] text-text-muted mb-2">
        {t("newsletter.emailLabel")}
        <span className="text-accent-blue ml-1">•</span>
      </p>

      <div className="flex gap-3 items-center">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder={t("newsletter.placeholder")}
          className="flex-1 bg-transparent border border-white/15 rounded-full px-5 py-3
            text-sm text-text-primary placeholder:text-text-muted
            focus:outline-none focus:border-accent-blue/60 transition-colors duration-200"
        />
        <motion.button
          onClick={handleSubmit}
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          disabled={status === "loading" || status === "success"}
          className="w-11 h-11 rounded-full bg-accent-blue flex items-center justify-center
            text-white flex-shrink-0 disabled:opacity-60 transition-opacity"
          aria-label={t("newsletter.submit")}
        >
          <AnimatePresence mode="wait">
            {status === "loading" ? (
              <motion.span key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </motion.span>
            ) : status === "success" ? (
              <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ opacity: 0 }}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </motion.span>
            ) : (
              <motion.span key="arrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-red-400 mt-2 ml-1"
          >
            {t("newsletter.errorMsg")}
          </motion.p>
        )}
        {status === "success" && (
          <motion.p
            key="ok"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-emerald-400 mt-2 ml-1"
          >
            {t("newsletter.successMsg")}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Gradient background (matches hero aesthetic) ─────────────────────────────

function FooterGradient() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top separator fade */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {/* Ambient color blobs */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-accent-blue/5 blur-3xl" />
      <div className="absolute -top-16 right-1/4 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl" />
    </div>
  );
}

// ─── Arrow that animates on CTA hover ─────────────────────────────────────────

function AnimatedArrow() {
  return (
    <motion.span
      className="inline-block ml-3"
      animate={{ x: [0, 4, 0] }}
      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
    >
      →
    </motion.span>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-20 pb-8 overflow-hidden">
      <FooterGradient />
      <div className={`${W} relative z-10`}>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
          <div className="flex flex-col items-center lg:items-start order-2 lg:order-1">
            <Link
              href="/contact"
              className="group inline-flex items-center font-heading font-black
                text-3xl md:text-4xl xl:text-5xl text-text-primary
                hover:text-accent-blue transition-colors duration-300 leading-none mb-10"
            >
              {t("cta")}
              <AnimatedArrow />
            </Link>

            <div className="flex items-center gap-3 flex-wrap mb-10">
              {(Object.keys(icons) as (keyof typeof icons)[]).map((id) => (
                <SocialIcon key={id} id={id} />
              ))}
            </div>

            {/* Copyright */}
            <p className="text-sm font-accent text-text-muted text-center lg:text-left">
              © {currentYear} {profile.nickname}. {t("rights")}
            </p>
            <p className="text-sm font-accent text-text-muted text-center lg:text-left">
              Built with ❤️ and ☕ by {profile.name}
            </p>
          </div>

          {/* Right — Newsletter */}
          <div className="order-1 lg:order-2">
            <NewsletterForm t={t} />
          </div>
        </div>
      </div>
    </footer>
  );
}