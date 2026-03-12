"use client";

import { useState, useEffect } from "react";
import { TransitionLink } from "@/components/ui";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { siteConfig, headerNavItems } from "@/config/navigation";
import { MenuToggle, CircleArrowLink, FlagIcon } from "@/components/ui";
import { MenuDrawer } from "./MenuDrawer";
import { ThemeToggleIcon } from "@/components/ui/icons/ThemeToggleIcon";
import { useLocaleSwitch } from "@/hooks";
const navItemsConfig = headerNavItems.map(item => ({
  key: item.translationKey || item.label.toLowerCase(),
  href: item.href,
}));

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const t = useTranslations("common");
  const { currentLocale, toggleLocale } = useLocaleSwitch();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isDark = mounted && resolvedTheme === "dark";
  const logoSrc = isDark
    ? "/assets/images/logo-for-dark-theme-transparent-cropped.png"
    : "/assets/images/logo-for-light-theme-transparent-cropped.png";

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 app-container"
      >
        <motion.nav
          className={cn(
            "relative flex items-center justify-end lg:justify-between gap-4 md:gap-8 mx-auto w-full rounded-2xl transition-all duration-300",
            isScrolled || isMenuOpen
              ? isDark
                ? "bg-[#1a1a1a]/60 backdrop-blur-xl shadow-xl border-white/10"
                : "bg-white/60 backdrop-blur-xl shadow-xl border-white/40"
              : isDark
                ? "bg-[#1a1a1a]/40 backdrop-blur-md border-white/5"
                : "bg-white/40 backdrop-blur-md shadow-sm border-white/30"
          )}
          style={{
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
          }}
          layout
        >
          <div className="rounded-2xl absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
            <svg className="w-full h-full">
              <filter id="headerNoise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#headerNoise)" />
            </svg>
          </div>

          <div className={`rounded-2xl absolute inset-0 z-0 bg-gradient-to-b ${isDark ? 'from-white/5 to-transparent' : 'from-white/40 to-transparent'} pointer-events-none`} />
          <TransitionLink
            href="/"
            className="fixed -top-2 lg:-top-3 left-0 lg:left-1/2 lg:-translate-x-1/2 -rotate-15 flex items-center gap-2 group"
            data-cursor-text="Home"
          >
            <motion.div
              className="relative w-24 h-18 lg:w-32 lg:h-20 overflow-hidden rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {mounted && (
                <Image
                  src={logoSrc}
                  alt={siteConfig.name}
                  fill
                  className="object-contain"
                  priority
                />
              )}
            </motion.div>
          </TransitionLink>

          <div className="hidden lg:flex items-center gap-2">
            {navItemsConfig.map((item) => {
              return (
                <CircleArrowLink
                  key={item.href}
                  href={item.href}
                  isActive={pathname === item.href}
                  className="text-sm font-heading"
                  circleClassName="hidden lg:flex w-6 h-6 border-[1.5px]"
                  activeColor={isDark ? "var(--color-yellow)" : "var(--color-blue)"}
                >
                  <motion.span className="font-heading tracking-wider" style={pathname === item.href ? { fontWeight: 700 } : { fontWeight: 400 }}>
                    {t(item.key)}
                  </motion.span>
                </CircleArrowLink>
              );
            })}
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <motion.button
              onClick={toggleLocale}
              className={cn(
                "hidden md:flex items-center gap-2 px-3 py-2 rounded-full transition-colors text-sm font-accent font-medium",
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "0.25rem"
              }}
              data-cursor-text="Language"
            >
              <FlagIcon locale={currentLocale} size={18} />
              <span className="font-mono">{currentLocale.toUpperCase()}</span>
            </motion.button>

            <motion.button
              onClick={toggleTheme}
              className={cn(
                "p-2.5 rounded-full transition-colors",
                isDark
                  ? "text-white"
                  : "text-gray-700"
              )}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
              data-cursor-text={isDark ? "Light" : "Dark"}
            >
              {mounted && <ThemeToggleIcon isDark={isDark} />}
            </motion.button>

            <MenuToggle
              isOpen={isMenuOpen}
              onClick={toggleMenu}
              isDark={isDark}
            />
          </div>
        </motion.nav>
      </motion.header>

      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        currentLocale={currentLocale}
        onLocaleChange={toggleLocale}
      />
    </>
  );
}
