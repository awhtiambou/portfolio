"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { siteConfig, headerNavItems } from "@/config/navigation";
import { locales, type Locale } from "@/i18n";
import { MenuToggle, CircleArrowLink, FlagIcon } from "@/components/ui";
import { MenuDrawer } from "./MenuDrawer";
import { ThemeToggleIcon } from "@/components/ui/icons/ThemeToggleIcon";
// Navigation items from config (Home, About, Projects, Blog)
const navItemsConfig = headerNavItems.map(item => ({
  key: item.translationKey || item.label.toLowerCase(),
  href: item.href,
}));

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<Locale>("en");
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("common");

  useEffect(() => {
    setMounted(true);
    // Get locale from cookie
    const localeCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("NEXT_LOCALE="))
      ?.split("=")[1] as Locale | undefined;
    if (localeCookie && locales.includes(localeCookie)) {
      setCurrentLocale(localeCookie);
    }
  }, []);

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

  const toggleLocale = () => {
    const newLocale = currentLocale === "en" ? "fr" : "en";
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    setCurrentLocale(newLocale);
    router.refresh();
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
      {/* Floating Header */}
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
          {/* Noise Texture Overlay */}
          <div className="rounded-2xl absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
            <svg className="w-full h-full">
              <filter id="headerNoise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#headerNoise)" />
            </svg>
          </div>

          {/* Subtle Gradient Shine */}
          <div className={`rounded-2xl absolute inset-0 z-0 bg-gradient-to-b ${isDark ? 'from-white/5 to-transparent' : 'from-white/40 to-transparent'} pointer-events-none`} />
          {/* Logo */}
          <Link
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
          </Link>

          {/* Desktop Navigation - Hidden on Mobile */}
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

          {/* Right Section */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Language Toggle */}
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
              <span>{currentLocale.toUpperCase()}</span>
            </motion.button>

            {/* Theme Toggle */}
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

            {/* Menu Toggle - Animated Hamburger */}
            <MenuToggle
              isOpen={isMenuOpen}
              onClick={toggleMenu}
              isDark={isDark}
            />
          </div>
        </motion.nav>
      </motion.header>

      {/* Full-screen Menu Drawer */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        currentLocale={currentLocale}
        onLocaleChange={toggleLocale}
      />
    </>
  );
}
