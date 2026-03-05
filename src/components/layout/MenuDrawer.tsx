"use client";

import { useRef, useState, useEffect } from "react";
import { TransitionLink } from "@/components/ui";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { socialLinks, drawerNavItems, aboutSectionLinks, newsletterLink } from "@/config/navigation";
import { localeFlags, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";
import { CircleArrowLink, LiveSignature } from "@/components/ui";

const navItemsConfig = drawerNavItems.map(item => ({
    key: item.translationKey || item.label.toLowerCase(),
    href: item.href,
}));

interface MenuDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    currentLocale: Locale;
    onLocaleChange: () => void;
}

// Icons
const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const LinkedinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const socialIconMap: Record<string, React.FC> = {
    github: GithubIcon,
    linkedin: LinkedinIcon,
    twitter: TwitterIcon,
};

// Animation variants
const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.3 }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.3, delay: 0.2 }
    }
};

const drawerVariants: Variants = {
    hidden: {
        clipPath: "circle(0% at calc(100% - 60px) 40px)",
        opacity: 0,
    },
    visible: {
        clipPath: "circle(150% at calc(100% - 60px) 40px)",
        opacity: 1,
        transition: {
            type: "spring" as const,
            stiffness: 50,
            damping: 15,
            duration: 0.8,
        }
    },
    exit: {
        clipPath: "circle(0% at calc(100% - 60px) 40px)",
        opacity: 0,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 20,
            duration: 0.5,
        }
    }
};

const menuItemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.3 + i * 0.1,
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
        },
    }),
    exit: {
        opacity: 0,
        x: -30,
        transition: { duration: 0.2 }
    }
};

const contactItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.5 + i * 0.1,
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
        },
    }),
};

export function MenuDrawer({ isOpen, onClose, currentLocale, onLocaleChange }: MenuDrawerProps) {
    const constraintsRef = useRef(null);
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();
    const t = useTranslations("common");

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === "dark";


    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop with gradient */}
                    <motion.div
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 z-40"
                        onClick={onClose}
                    />
                    {/* Watermark Signature - Integrated better */}
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] dark:opacity-[0.1] z-50 overflow-visible"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isDark ? 0.1 : 0.05 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Huge container to ensure no clipping, rotated slightly */}
                        <div className="w-[150vw] h-[150vh] flex items-center justify-center transform -rotate-15 translate-y-32">
                            <LiveSignature className="w-full h-full" />
                        </div>
                    </motion.div>

                    {/* Drawer with mesh gradient background */}
                    <motion.div
                        ref={constraintsRef}
                        variants={drawerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 z-40 overflow-hidden flex items-center justify-center"
                    >
                        {/* Rich Background Layer */}
                        <div className="absolute inset-0 z-0">
                            {/* Base Background Color */}
                            <div className={`absolute inset-0 transition-colors duration-500 ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`} />

                            {/* Mesh Gradients */}
                            <div className="absolute inset-0 opacity-40 dark:opacity-30">
                                <div
                                    className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full mix-blend-screen blur-[100px] animate-pulse"
                                    style={{ backgroundColor: isDark ? '#4ECDC4' : '#F5A623', animationDuration: '8s' }}
                                />
                                <div
                                    className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen blur-[120px] animate-pulse"
                                    style={{ backgroundColor: isDark ? '#FF6B8A' : '#4ECDC4', animationDuration: '10s', animationDelay: '1s' }}
                                />
                                <div
                                    className="absolute top-[40%] left-[30%] w-[50vw] h-[50vw] rounded-full mix-blend-screen blur-[90px] animate-pulse"
                                    style={{ backgroundColor: isDark ? '#F5A623' : '#FF6B8A', animationDuration: '12s', animationDelay: '2s' }}
                                />
                            </div>

                            {/* Noise Texture */}
                            <div
                                className="absolute inset-0 z-[1] pointer-events-none"
                                style={{
                                    opacity: isDark ? 0.35 : 0.3,
                                    mixBlendMode: isDark ? "overlay" : "soft-light",
                                }}
                            >
                                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                    <filter id="menuNoiseFilter">
                                        <feTurbulence
                                            type="fractalNoise"
                                            baseFrequency="0.8"
                                            numOctaves="3"
                                            stitchTiles="stitch"
                                        />
                                        <feColorMatrix type="saturate" values="0" />
                                        <feComponentTransfer>
                                            <feFuncR type="linear" slope="3" intercept="-1" />
                                            <feFuncG type="linear" slope="3" intercept="-1" />
                                            <feFuncB type="linear" slope="3" intercept="-1" />
                                        </feComponentTransfer>
                                    </filter>
                                    <rect width="100%" height="100%" filter="url(#menuNoiseFilter)" />
                                </svg>
                            </div>
                        </div>

                        <div className="relative z-10 min-h-full flex flex-col md:flex-row justify-center app-container">
                            {/* Left: Navigation Links */}
                            <div className="w-full md:w-auto md:flex-1 mt-20 lg:mt-0 flex flex-col justify-center items-center md:items-start">
                                <nav className="w-full md:w-auto space-y-6 md:space-y-4 lg:space-y-6 flex md:block flex-col items-center md:items-start">
                                    {navItemsConfig.map((item, i) => (
                                        <motion.div
                                            key={item.href}
                                            custom={i}
                                            variants={menuItemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            className="w-fit"
                                        >
                                            {/**Mobile */}
                                            <div className="w-fit flex md:hidden">
                                                <TransitionLink href={item.href} onClick={onClose} className="flex items-center">
                                                    <motion.span
                                                        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-black transition-colors ${isDark ? 'text-white/90 hover:text-white' : 'text-gray-900/90 hover:text-gray-900'}`}
                                                        whileHover={{ x: 20, color: isDark ? "#F5A623" : "#4ECDC4" }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        {t(item.key).toUpperCase()}
                                                    </motion.span>
                                                    {item.href === "/projects" && (
                                                        <span className="text-2xl md:text-4xl ml-4">🚀</span>
                                                    )}
                                                </TransitionLink>
                                            </div>
                                            {/**Desktop */}
                                            <div className="w-fit hidden md:block">
                                                <CircleArrowLink
                                                    href={item.href}
                                                    onClick={onClose}
                                                    data-cursor-text={t("menu.go").toUpperCase()}
                                                    circleClassName={cn(
                                                        "w-12 h-12 md:w-16 md:h-16 border-2",
                                                        isDark ? "border-white/20" : "border-gray-900/20"
                                                    )}

                                                >
                                                    <motion.span
                                                        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold transition-colors ${isDark ? 'text-white/90 hover:text-white' : 'text-gray-900/90 hover:text-gray-900'}`}
                                                        whileHover={{ x: 20, color: isDark ? "#F5A623" : "#4ECDC4" }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        {t(item.key).toUpperCase()}
                                                    </motion.span>
                                                    {item.href === "/projects" && (
                                                        <span className="text-2xl md:text-4xl ml-4">🚀</span>
                                                    )}
                                                </CircleArrowLink>
                                            </div>
                                        </motion.div>
                                    ))}
                                </nav>

                                {/* Bottom links */}
                                <motion.div
                                    className={`w-full mt-10 md:mt-12 w-full md:w-auto flex flex-wrap justify-center md:justify-start gap-6 text-sm font-medium ${isDark ? 'text-white/60' : 'text-gray-600'}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <TransitionLink href="/blog" onClick={onClose} className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>
                                        {t("blog").toUpperCase()}
                                    </TransitionLink>
                                    <TransitionLink href="/contact#newsletter" onClick={onClose} className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>
                                        {t("newsletter").toUpperCase()}
                                    </TransitionLink>
                                    {/* Section Links */}
                                    {aboutSectionLinks.map((section) => (
                                        <TransitionLink
                                            key={section.href}
                                            href={section.href}
                                            onClick={onClose}
                                            className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}
                                        >
                                            {t(section.translationKey || section.label.toLowerCase()).toUpperCase()}
                                        </TransitionLink>
                                    ))}
                                    <button
                                        onClick={onLocaleChange}
                                        className={`transition-colors flex items-center gap-2 ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}
                                    >
                                        {localeFlags[currentLocale]} {currentLocale === 'en' ? 'FRANÇAIS' : 'ENGLISH'}
                                    </button>
                                </motion.div>
                            </div>

                            {/* Right: Contact Info */}
                            <div className="flex lg:w-80 flex-col justify-center mt-6 lg:mt-0 lg:items-end text-center md:text-right">
                                {/* Decorative dot */}
                                <motion.div
                                    className={`hidden lg:block w-3 h-3 rounded-full mb-12 ${isDark ? 'bg-white/80' : 'bg-gray-800/80'}`}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.6, type: "spring" }}
                                />

                                <div className="space-y-0 md:space-y-8 lg:space-y-8 hidden flex md:block w-full md:w-auto justify-between">
                                    {/* Email */}
                                    <motion.div
                                        custom={0}
                                        variants={contactItemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className=""
                                    >
                                        <p className="text-xs tracking-widest text-accent-blue mb-1">EMAIL</p>
                                        <a
                                            href={`mailto:${profile.email}`}
                                            className={`transition-colors ${isDark ? 'text-white hover:text-accent-mint' : 'text-gray-900 hover:text-accent-blue'}`}
                                            data-cursor-text="Email"
                                        >
                                            {profile.email}
                                        </a>
                                    </motion.div>

                                    {/* Phone */}
                                    <motion.div
                                        custom={1}
                                        variants={contactItemVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <p className="text-xs tracking-widest text-accent-blue mb-1">CALL</p>
                                        <a
                                            href={`tel:${profile.phone}`}
                                            className={`transition-colors ${isDark ? 'text-white hover:text-accent-mint' : 'text-gray-900 hover:text-accent-blue'}`}
                                            data-cursor-text="Call"
                                        >
                                            {profile.phone}
                                        </a>
                                    </motion.div>

                                    {/* Location */}
                                    <motion.div
                                        custom={2}
                                        variants={contactItemVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <p className="text-xs tracking-widest text-accent-blue mb-1">LOCATION</p>
                                        <p className={isDark ? 'text-white' : 'text-gray-900'}>
                                            {profile.location}
                                        </p>
                                    </motion.div>
                                </div>

                                <motion.div
                                    className="mt-0 md:mt-10 flex gap-4 items-center justify-center md:justify-end"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.9 }}
                                >
                                    {socialLinks.map((link) => {
                                        const Icon = socialIconMap[link.icon] || GithubIcon;
                                        return (
                                            <motion.a
                                                key={link.name}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`p-3 rounded-full transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-900/10 hover:bg-gray-900/20 text-gray-900'}`}
                                                whileHover={{ scale: 1.1, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                data-cursor-text={link.name}
                                            >
                                                <Icon />
                                            </motion.a>
                                        );
                                    })}
                                </motion.div>
                            </div>
                        </div>

                        {/* Chat button */}
                        <motion.div
                            className="absolute bottom-2 right-2 md:bottom-8 md:right-8"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 1, type: "spring" }}
                        >
                            <TransitionLink
                                href="/contact"
                                onClick={onClose}
                                className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center rounded-full bg-yellow-400 hover:bg-yellow-300 transition-colors shadow-lg"
                                data-cursor-text="Chat"
                            >
                                <span className="text-2xl md:text-4xl">👋</span>
                                <svg
                                    className="absolute w-full h-full animate-spin-slow"
                                    viewBox="0 0 100 100"
                                >
                                    <defs>
                                        <path
                                            id="circlePath"
                                            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                        />
                                    </defs>
                                    <text className="text-[8px] fill-gray-800 font-medium tracking-wider">
                                        <textPath href="#circlePath">
                                            LET&apos;S CHAT • LET&apos;S CHAT • LET&apos;S CHAT •
                                        </textPath>
                                    </text>
                                </svg>
                            </TransitionLink>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
