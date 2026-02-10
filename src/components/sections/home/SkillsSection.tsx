"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCards, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import {
    FiArrowLeft,
    FiArrowRight,
    FiArrowUpRight
} from "react-icons/fi";
import {
    FaBrain,
    FaChartBar,
    FaCogs,
    FaCloud,
    FaReact,
    FaServer,
    FaTools,
    FaDatabase,
    FaLightbulb,
    FaBox,
    FaDocker
} from "react-icons/fa";
import { SiPython } from "react-icons/si";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { skillCategoryConfig, getSkillsByCategory } from "@/data/skills";
import type { SkillCategory } from "@/types";
import { cn } from "@/lib/utils";
import Skeleton from "@mui/material/Skeleton";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cards";

// Icon mapping
const categoryIcons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
    SiPython,
    FaBrain,
    FaChartBar,
    FaCogs,
    FaDocker,
    FaCloud,
    FaReact,
    FaServer,
    FaTools,
    FaDatabase,
    FaLightbulb,
    FaBox,
};

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut" as const,
        },
    },
};

// Featured categories for homepage (half of all categories)
const featuredCategories: SkillCategory[] = [
    "ml", "ai", "frontend", "backend", "devops", "cloud"
];

// Card gradient configurations
const cardGradientColors: Record<SkillCategory, { primary: string; secondary: string }> = {
    ml: { primary: "#8b5cf6", secondary: "#3b82f6" },
    ai: { primary: "#06b6d4", secondary: "#8b5cf6" },
    frontend: { primary: "#ec4899", secondary: "#8b5cf6" },
    backend: { primary: "#3b82f6", secondary: "#06b6d4" },
    devops: { primary: "#10b981", secondary: "#3b82f6" },
    cloud: { primary: "#8b5cf6", secondary: "#ec4899" },
    data: { primary: "#22c55e", secondary: "#06b6d4" },
    mlops: { primary: "#f59e0b", secondary: "#ec4899" },
    tools: { primary: "#f43f5e", secondary: "#8b5cf6" },
    databases: { primary: "#06b6d4", secondary: "#3b82f6" },
    "soft-skills": { primary: "#ec4899", secondary: "#f59e0b" },
    other: { primary: "#6b7280", secondary: "#374151" }
};

// Skill card component
interface SkillCardProps {
    category: SkillCategory;
    isDark: boolean;
    t: (key: string) => string;
    isActive: boolean;
}

function SkillCard({ category, isDark, t, isActive }: SkillCardProps) {
    const config = skillCategoryConfig[category];
    const categorySkills = getSkillsByCategory(category);
    const displaySkills = categorySkills.slice(0, 5);
    const remainingCount = categorySkills.length - 5;
    const colors = cardGradientColors[category];

    // Get the icon component
    const IconComponent = categoryIcons[config.iconName];

    return (
        <motion.div
            className={cn(
                "relative w-full sm:w-5/6 md:w-full lg:w-11/12 h-[420px] md:h-[480px] lg:h-[520px] xl:h-[560px] 2xl:h-[600px] rounded-3xl overflow-hidden",
                "border border-white/10",
                isActive ? '' : 'brightness-30'
            )}
            data-cursor-text="⟷"
            data-cursor-hover="true"
            style={{
                background: isDark
                    ? `linear-gradient(to bottom, #0f0f1a 0%, #0a0a15 40%, #0a0a15 100%)`
                    : `linear-gradient(to bottom, #ffffff 0%, #f8f8fc 40%, #f8f8fc 100%)`
            }}
        >
            {/* Bottom gradient overlay - vibrant gradient */}
            <div
                className={isActive ? 'absolute inset-0 pointer-events-none' : 'absolute inset-0 pointer-events-none opacity-0'}
                style={{
                    background: `
                        radial-gradient(ellipse 80% 50% at 50% 100%, ${colors.primary}50 0%, transparent 60%),
                        radial-gradient(ellipse 60% 40% at 70% 90%, ${colors.secondary}35 0%, transparent 50%),
                        radial-gradient(ellipse 40% 30% at 30% 95%, ${colors.primary}30 0%, transparent 40%)
                    `
                }}
            />

            {/* Subtle top glow */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 blur-3xl opacity-20 pointer-events-none"
                style={{ background: `linear-gradient(to bottom, ${colors.primary}, transparent)` }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center h-[380px] md:h-[420px] lg:h-[460px] xl:h-[500px] 2xl:h-[540px] p-6 md:p-10 lg:p-20 pb-8 md:pb-10">
                {/* Category icon and label */}
                <motion.div
                    className="flex items-center gap-3 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {IconComponent && (
                        <IconComponent
                            className="w-6 h-6"
                            style={{ color: colors.primary }}
                        />
                    )}
                    <span
                        className="text-sm font-medium italic tracking-wide"
                        style={{ color: colors.primary }}
                    >
                        {config.label}
                    </span>
                </motion.div>

                {/* Tagline - main message */}
                <motion.h3
                    style={{ fontFamily: "var(--font-besley)" }}
                    className={cn(
                        "text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4",
                        isDark ? "text-white" : "text-gray-900"
                    )}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {t(`categories.${category}.tagline`)}
                </motion.h3>

                {/* Description */}
                <motion.p
                    className={cn(
                        "text-sm md:text-base leading-relaxed mb-6",
                        isDark ? "text-white/60" : "text-gray-600"
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                >
                    {t(`categories.${category}.description`)}
                </motion.p>

                {/* Skills list */}
                <motion.div
                    className="flex flex-wrap gap-2 mt-10 md:mt-10 lg:mt-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {displaySkills.map((skill) => (
                        <span
                            key={skill.name}
                            className={cn(
                                "px-2.5 py-1 rounded-full text-xs font-medium transition-all",
                                isDark
                                    ? "bg-white/10 text-white/80 hover:bg-white/15"
                                    : "bg-gray-900/5 text-gray-700 hover:bg-gray-900/10"
                            )}
                        >
                            {skill.name}
                        </span>
                    ))}
                    {remainingCount > 0 && (
                        <span
                            className="px-2.5 py-1 rounded-full text-xs font-medium"
                            style={{
                                backgroundColor: isDark ? `${colors.primary}20` : `${colors.primary}15`,
                                color: colors.primary
                            }}
                        >
                            +{remainingCount} more
                        </span>
                    )}
                </motion.div>

                {/* Proficiency bar */}
                <motion.div
                    className="mt-6 flex items-center gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <span className={cn(
                        "text-xs uppercase tracking-wider",
                        isDark ? "text-white/50" : "text-gray-500"
                    )}>
                        {t("proficiency")}
                    </span>
                    <div className={cn(
                        "flex-grow h-1.5 rounded-full overflow-hidden",
                        isDark ? "bg-white/10" : "bg-gray-200"
                    )}>
                        <motion.div
                            className="h-full rounded-full"
                            style={{
                                background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                                width: `${(getAverageProficiency(categorySkills) / 5) * 100}%`
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(getAverageProficiency(categorySkills) / 5) * 100}%` }}
                            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                        />
                    </div>
                    <span
                        className="text-xs font-bold"
                        style={{ color: colors.primary }}
                    >
                        {getAverageProficiency(categorySkills)}/5
                    </span>
                </motion.div>
            </div>
        </motion.div>
    );
}

// Helper to calculate average proficiency
function getAverageProficiency(skills: { level: string }[]): number {
    const levelMap = { expert: 5, advanced: 4, intermediate: 3, beginner: 2 };
    const total = skills.reduce((sum, skill) => sum + (levelMap[skill.level as keyof typeof levelMap] || 3), 0);
    return Math.round(total / skills.length);
}

// Navigation button component
interface NavButtonProps {
    direction: "prev" | "next";
    onClick: () => void;
    disabled?: boolean;
    isDark: boolean;
}

function NavButton({ direction, onClick, disabled, isDark }: NavButtonProps) {
    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "w-12 h-12 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center transition-all",
                isDark
                    ? "border-white/30 hover:border-accent-yellow hover:bg-accent-yellow/10"
                    : "border-gray-300 hover:border-accent-blue hover:bg-accent-blue/10",
                "disabled:opacity-30 disabled:cursor-not-allowed"
            )}
            whileHover={{ scale: disabled ? 1 : 1.1 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
        >
            {direction === "prev" ? (
                <FiArrowLeft className={cn("w-5 h-5 md:w-6 md:h-6", isDark ? "text-white" : "text-gray-700")} />
            ) : (
                <FiArrowRight className={cn("w-5 h-5 md:w-6 md:h-6", isDark ? "text-white" : "text-gray-700")} />
            )}
        </motion.button>
    );
}

// Main component
export function SkillsSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [mounted, setMounted] = useState(false);
    const swiperRef = useRef<SwiperType | null>(null);
    const { resolvedTheme } = useTheme();
    const t = useTranslations("skills");

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === "dark";

    const handlePrev = () => {
        swiperRef.current?.slidePrev();
    };

    const handleNext = () => {
        swiperRef.current?.slideNext();
    };

    // Loading state
    if (!mounted) {
        return (
            <section id="skills" className="relative py-20 md:py-32 overflow-hidden bg-gray-50 dark:bg-[#0a0a1a]">
                <div className="container relative z-10">
                    <div className="grid lg:grid-cols-3 gap-12 items-center">
                        <div>
                            <Skeleton variant="text" width={300} height={48} className="mb-2 dark:!bg-white/10" />
                            <Skeleton variant="text" width={350} height={48} className="mb-6 dark:!bg-white/10" />
                            <Skeleton variant="text" width="100%" height={24} className="mb-2 dark:!bg-white/10" />
                            <Skeleton variant="text" width="80%" height={24} className="mb-8 dark:!bg-white/10" />
                            <Skeleton variant="rounded" width={160} height={48} className="dark:!bg-white/10" />
                        </div>
                        <div className="lg:col-span-2">
                            <Skeleton variant="rounded" width="100%" height={480} className="rounded-3xl dark:!bg-white/10" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="skills" className="relative py-20 md:py-32 overflow-hidden">
            {/* Complex gradient background */}
            <div className={cn(
                "absolute inset-0",
                isDark
                    ? "bg-gradient-to-br from-[#0a0a1a] via-[#0f0f2a] to-[#1a0a2a]"
                    : "bg-gradient-to-br from-[#f8f8ff] via-[#f0f0ff] to-[#fff8f8]"
            )} />

            {/* Radial gradient overlays */}
            <div className={cn(
                "absolute inset-0",
                isDark
                    ? "bg-[radial-gradient(ellipse_at_top_right,_rgba(138,43,226,0.15)_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(78,205,196,0.1)_0%,_transparent_50%)]"
                    : "bg-[radial-gradient(ellipse_at_top_right,_rgba(255,107,138,0.08)_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(78,205,196,0.06)_0%,_transparent_50%)]"
            )} />

            {/* Floating accent orbs */}
            <div className={cn(
                "absolute top-20 -right-32 w-96 h-96 rounded-full blur-3xl opacity-30",
                isDark ? "bg-purple-600/30" : "bg-pink-300/30"
            )} />
            <div className={cn(
                "absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-20",
                isDark ? "bg-cyan-600/30" : "bg-blue-300/30"
            )} />

            {/* Content */}
            <div className="container relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 items-center"
                >
                    {/* Left side: Header content */}
                    <motion.div variants={itemVariants} className="text-center md:text-left relative z-20">
                        {/* Title */}
                        <h2
                            style={{ fontFamily: "var(--font-besley)" }}
                            className={cn(
                                "text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-wide",
                                isDark ? "text-white" : "text-gray-900"
                            )}
                        >
                            {t("title")}
                        </h2>

                        {/* Description */}
                        <p className={cn(
                            "text-lg md:text-xl mb-8 leading-relaxed",
                            isDark ? "text-white/70" : "text-gray-600"
                        )}>
                            {t("subtitle")}
                        </p>

                        {/* See All Skills button */}
                        <Link href="/about#skills" className="flex justify-center md:justify-start">
                            <motion.button
                                className={cn(
                                    "group flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all",
                                    isDark
                                        ? "bg-white text-gray-900 hover:bg-accent-yellow hover:text-gray-900"
                                        : "bg-gray-900 text-white hover:bg-accent-blue hover:text-white"
                                )}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {t("viewAll")}
                                <FiArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Right side: Swiper cards */}
                    <motion.div variants={itemVariants} className="lg:col-span-2 relative z-10">
                        <Swiper
                            modules={[Navigation, EffectCards, Autoplay]}
                            effect="cards"
                            grabCursor
                            loop
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: true,
                                pauseOnMouseEnter: true,
                            }}
                            cardsEffect={{
                                slideShadows: false,
                                perSlideOffset: 20,
                                perSlideRotate: 4,
                            }}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            onSlideChange={(swiper) => {
                                setActiveIndex(swiper.realIndex);
                            }}
                            className="skills-swiper w-full max-w-xl mx-auto"
                        >
                            {featuredCategories.map((category) => (
                                <SwiperSlide key={category} className="rounded-3xl">
                                    <SkillCard category={category} isDark={isDark} t={t} isActive={activeIndex === featuredCategories.indexOf(category)} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>

                    {/* Navigation controls - mobile only */}
                    <div className="flex md:hidden justify-center items-center gap-4 mt-10">
                        <NavButton direction="prev" onClick={handlePrev} isDark={isDark} />
                        <NavButton direction="next" onClick={handleNext} isDark={isDark} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
