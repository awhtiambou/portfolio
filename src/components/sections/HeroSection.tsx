"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui";
import { Container } from "@/components/layout";
import { socialLinks } from "@/config/navigation";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { profile } from "@/data/profile";

// Social Icons
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const socialIconMap: Record<string, React.FC> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
};

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const t = useTranslations();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Beautiful gradient mesh background */}
      <div className="absolute inset-0">
        {/* Base gradient - stronger in light mode */}
        <div 
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: isDark 
              ? "linear-gradient(135deg, rgba(245, 166, 35, 0.15) 0%, rgba(255, 107, 138, 0.1) 25%, rgba(46, 204, 113, 0.08) 50%, rgba(78, 205, 196, 0.12) 75%, rgba(245, 166, 35, 0.1) 100%)"
              : "linear-gradient(135deg, rgba(245, 166, 35, 0.5) 0%, rgba(255, 107, 138, 0.35) 25%, rgba(46, 204, 113, 0.25) 50%, rgba(78, 205, 196, 0.4) 75%, rgba(245, 166, 35, 0.3) 100%)",
          }}
        />
        
        {/* Animated gradient orbs - stronger in light mode */}
        <motion.div
          className="absolute top-0 -left-1/4 w-1/2 h-1/2 rounded-full blur-3xl transition-opacity duration-500"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(255, 107, 138, 0.25) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(255, 107, 138, 0.6) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/4 -right-1/4 w-2/3 h-2/3 rounded-full blur-3xl transition-opacity duration-500"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(78, 205, 196, 0.2) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(78, 205, 196, 0.55) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 left-1/3 w-1/2 h-1/2 rounded-full blur-3xl transition-opacity duration-500"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(46, 204, 113, 0.2) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(46, 204, 113, 0.5) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-1/3 h-1/3 rounded-full blur-2xl transition-opacity duration-500"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(245, 166, 35, 0.25) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(245, 166, 35, 0.6) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, 80, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>
      
      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Greeting */}
          <motion.p
            variants={fadeInUp}
            className="text-accent-blue font-medium text-lg mb-4"
          >
            {t("hero.greeting")}
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={fadeInUp}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-4"
          >
            {profile.name}
          </motion.h1>

          {/* Title */}
          <motion.h2
            variants={fadeInUp}
            className="font-heading text-xl sm:text-2xl md:text-3xl text-text-secondary mb-6"
          >
            <span className="text-accent-pink">{t("hero.title")}</span>
            <span className="mx-2">•</span>
            <span className="text-accent-mint">{t("hero.subtitle")}</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {t("hero.description")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button href="/projects" size="lg">
              {t("common.viewWork")}
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              {t("common.getInTouch")}
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={fadeInUp}
            className="flex justify-center gap-6"
          >
            {socialLinks.map((link) => {
              const Icon = socialIconMap[link.icon] || GithubIcon;
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-background-secondary hover:bg-accent-blue/10 text-text-secondary hover:text-accent-blue transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.name}
                >
                  <Icon />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-text-muted"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
