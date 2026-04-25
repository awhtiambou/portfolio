"use client";

import { TransitionLink, OutlinedInput } from "@/components/ui";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { profile } from "@/data/profile";
import { SocialIcon, socialIconsList } from "@/components/ui/icons/SocialIcons";
import { CiCoffeeCup, CiHeart } from "react-icons/ci";
import { PiHandHeartLight, PiHeartLight } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useHydrated } from "@/hooks";

const W = "app-container";


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

  const { resolvedTheme } = useTheme();
  const hydrated = useHydrated();
  const isDark = !hydrated || resolvedTheme !== "light";

  return (
    <div className="max-w-xl mx-auto rounded-2xl border border-white/10 bg-background-secondary/60 backdrop-blur-sm p-6 lg:p-8">
      <p className="font-body text-text-primary leading-snug mb-5">
        {t("newsletter.tagline")}
      </p>

      <div className="flex gap-3 items-center">
        <OutlinedInput
          label={t("newsletter.placeholder")}
          name="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
          className="flex-1"
        />
        <motion.button
          onClick={handleSubmit}
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          disabled={status === "loading" || status === "success"}
          className={cn(
            "relative inline-flex items-center p-4 font-medium transition-colors duration-300 rounded-full",
            isDark             ? "bg-accent-yellow text-black hover:bg-accent-yellow/90 disabled:bg-accent-yellow/70"
              : "bg-accent-blue text-white hover:bg-accent-blue/90 disabled:bg-accent-blue/70",
            (status === "loading" || status === "success") && "cursor-not-allowed"
          )}

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


export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-20 pb-8 overflow-hidden">
      <div className={`${W} relative z-10`}>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
          <div className="flex flex-col items-center lg:items-start order-2 lg:order-1">
            <TransitionLink
              href="/contact"
              className="group inline-flex items-center font-heading font-black
                text-3xl md:text-4xl xl:text-5xl text-text-primary
                hover:text-accent-blue transition-colors duration-300 leading-none mb-10"
            >
              {t("cta")}
              <AnimatedArrow />
            </TransitionLink>

            <div className="flex items-center gap-3 flex-wrap mb-10">
              {(Object.keys(socialIconsList) as (keyof typeof socialIconsList)[]).map((id) => (
                <SocialIcon key={id} id={id} />
              ))}
            </div>

            {/* Copyright */}
            <p className="text-xs font-mono text-text-muted text-center lg:text-left">
              © {currentYear} {profile.nickname}. {t("rights")}
            </p>
            <p className="text-xs font-mono text-text-muted text-center lg:text-left">
              Built with <PiHandHeartLight className="inline text-red-600 text-2xl" /> and <CiCoffeeCup className="inline text-2xl text-brown-900" /> by {profile.name}
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
