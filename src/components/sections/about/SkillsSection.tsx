"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
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
import { skillCategoryConfig, getSkillsByCategory, masteredTechnologies } from "@/data/skills";
import type { MasteredTechnology, SkillCategory } from "@/types";
import { cn, getShuffledArray } from "@/lib/utils";
import Skeleton from "@mui/material/Skeleton";
import { GlassCardStack } from "@/components/ui/GlassCardStack";
import { marqueeLeft, marqueeRight } from "@/lib/animations";

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

// Featured categories for the card stack
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

// Helper to calculate average proficiency
function getAverageProficiency(skills: { level: string }[]): number {
    const levelMap = { expert: 5, advanced: 4, intermediate: 3, beginner: 2 };
    const total = skills.reduce((sum, skill) => sum + (levelMap[skill.level as keyof typeof levelMap] || 3), 0);
    return Math.round(total / skills.length);
}

// Skill card content (rendered inside the glass shell)
interface SkillCardContentProps {
    category: SkillCategory;
    isDark: boolean;
    t: (key: string) => string;
    isTop: boolean;
}

function SkillCardContent({ category, isDark, t, isTop }: SkillCardContentProps) {
    const config = skillCategoryConfig[category];
    const categorySkills = getSkillsByCategory(category);
    const displaySkills = categorySkills.slice(0, 5);
    const remainingCount = categorySkills.length - 5;
    const colors = cardGradientColors[category];
    const IconComponent = categoryIcons[config.iconName];

    return (
        <div className="relative w-full h-full flex flex-col">
            {/* Bottom gradient overlay */}
            <div
                className={cn(
                    "absolute inset-0 pointer-events-none transition-opacity duration-500",
                    isTop ? "opacity-100" : "opacity-40"
                )}
                style={{
                    background: `
                        radial-gradient(ellipse 80% 50% at 50% 100%, ${colors.primary}40 0%, transparent 60%),
                        radial-gradient(ellipse 60% 40% at 70% 90%, ${colors.secondary}25 0%, transparent 50%),
                        radial-gradient(ellipse 40% 30% at 30% 95%, ${colors.primary}20 0%, transparent 40%)
                    `
                }}
            />

            {/* Subtle top glow */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 blur-3xl pointer-events-none transition-opacity duration-500"
                style={{
                    background: `linear-gradient(to bottom, ${colors.primary}30, transparent)`,
                    opacity: isTop ? 0.6 : 0.2,
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center flex-1 p-6 md:p-8 lg:p-10">
                {/* Category icon and label */}
                <motion.div
                    className="flex items-center gap-3 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {IconComponent && (
                        <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{
                                background: `${colors.primary}15`,
                                border: `1px solid ${colors.primary}30`,
                            }}
                        >
                            <IconComponent
                                className="w-5 h-5"
                                style={{ color: colors.primary }}
                            />
                        </div>
                    )}
                    <span
                        className="text-sm font-medium tracking-wide uppercase"
                        style={{ color: colors.primary }}
                    >
                        {config.label}
                    </span>
                </motion.div>

                {/* Tagline */}
                <h3
                    style={{ fontFamily: "var(--font-besley)" }}
                    className={cn(
                        "text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-3",
                        isDark ? "text-white" : "text-gray-900"
                    )}
                >
                    {t(`categories.${category}.tagline`)}
                </h3>

                {/* Description */}
                <p className={cn(
                    "text-sm md:text-base leading-relaxed mb-6 line-clamp-3",
                    isDark ? "text-white/60" : "text-gray-600"
                )}>
                    {t(`categories.${category}.description`)}
                </p>

                {/* Skills list */}
                <div className="flex flex-wrap gap-2 mb-auto">
                    {displaySkills.map((skill) => (
                        <span
                            key={skill.name}
                            className={cn(
                                "px-2.5 py-1 rounded-full text-xs font-medium transition-colors",
                                isDark
                                    ? "bg-white/[0.08] text-white/80 border border-white/[0.06] hover:bg-white/[0.12]"
                                    : "bg-gray-900/[0.06] text-gray-700 border border-gray-900/[0.06] hover:bg-gray-900/[0.10]"
                            )}
                        >
                            {skill.name}
                        </span>
                    ))}
                    {remainingCount > 0 && (
                        <span
                            className="px-2.5 py-1 rounded-full text-xs font-medium"
                            style={{
                                backgroundColor: `${colors.primary}15`,
                                color: colors.primary,
                                border: `1px solid ${colors.primary}20`,
                            }}
                        >
                            +{remainingCount} more
                        </span>
                    )}
                </div>

                {/* Proficiency bar */}
                <div className="mt-auto pt-4 flex items-center gap-3">
                    <span className={cn(
                        "text-xs uppercase tracking-wider",
                        isDark ? "text-white/40" : "text-gray-500"
                    )}>
                        {t("proficiency")}
                    </span>
                    <div className={cn(
                        "flex-grow h-1.5 rounded-full overflow-hidden",
                        isDark ? "bg-white/[0.08]" : "bg-gray-200"
                    )}>
                        <motion.div
                            className="h-full rounded-full"
                            style={{
                                background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(getAverageProficiency(categorySkills) / 5) * 100}%` }}
                            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                        />
                    </div>
                    <span
                        className="text-xs font-bold tabular-nums"
                        style={{ color: colors.primary }}
                    >
                        {getAverageProficiency(categorySkills)}/5
                    </span>
                </div>
            </div>
        </div>
    );
}

// Tech marquee row
const TechRow = ({ items, variant }: { items: MasteredTechnology[], variant: any }) => (
    <div className="flex overflow-hidden w-full">
        <motion.div
            className="flex gap-10 md:gap-16 items-center"
            variants={variant}
            animate="animate"
        >
            {[...items, ...items, ...items].map((tech, index) => (
                <div
                    key={`${tech.title}-${index}`}
                    className="flex flex-col items-center justify-center gap-2 flex-shrink-0"
                >
                    <span className="text-sm md:text-lg font-normal whitespace-nowrap">
                        {tech.title}
                    </span>
                    <img
                        src={tech.logoImageUrl}
                        alt={tech.title}
                        className="w-8 h-8 md:w-12 md:h-12 object-contain"
                        data-cursor-text=""
                    />
                </div>
            ))}
        </motion.div>
    </div>
);

// Main component
export function SkillsSection() {
    const [mounted, setMounted] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const { resolvedTheme } = useTheme();
    const t = useTranslations("skills");

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === "dark";

    const handleActiveChange = useCallback((index: number) => {
        setActiveIndex(index);
    }, []);

    const { firstHalf, secondHalf } = useMemo(() => {
        const shuffled = getShuffledArray<MasteredTechnology>([...masteredTechnologies]);
        const mid = Math.floor(shuffled.length / 2);
        return {
            firstHalf: shuffled.slice(0, mid),
            secondHalf: shuffled.slice(mid)
        };
    }, []);

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

    // Active category gradient for background effect
    const activeCategory = featuredCategories[activeIndex] || "ml";
    const activeColors = cardGradientColors[activeCategory];

    return (
        <section id="skills" className="relative py-20 md:py-32 overflow-hidden">
            {/* Ambient background glow that follows the active card */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                    background: `radial-gradient(ellipse 60% 50% at 65% 50%, ${activeColors.primary}08 0%, transparent 70%)`,
                }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            />

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

                        {/* Active category indicator */}
                        <motion.div
                            className="hidden md:flex items-center gap-3"
                            key={activeCategory}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{
                                    background: `linear-gradient(135deg, ${activeColors.primary}, ${activeColors.secondary})`,
                                    boxShadow: `0 0 12px ${activeColors.primary}60`,
                                }}
                            />
                            <span
                                className="text-sm font-medium tracking-wide"
                                style={{ color: activeColors.primary }}
                            >
                                {skillCategoryConfig[activeCategory].label}
                            </span>
                            <span className={cn(
                                "text-xs",
                                isDark ? "text-white/40" : "text-gray-400"
                            )}>
                                — {activeIndex + 1}/{featuredCategories.length}
                            </span>
                        </motion.div>

                        {/* Hint text */}
                        <p className={cn(
                            "text-xs mt-6",
                            isDark ? "text-white/30" : "text-gray-400"
                        )}>
                            Click or swipe to shuffle →
                        </p>
                    </motion.div>

                    {/* Right side: Glass Card Stack */}
                    <motion.div variants={itemVariants} className="lg:col-span-2 relative z-10 min-h-[500px] md:min-h-[600px] flex items-center justify-center">
                        <GlassCardStack
                            items={featuredCategories}
                            autoPlayInterval={5000}
                            onActiveChange={handleActiveChange}
                            isDark={isDark}
                            className="w-full"
                            renderCard={(category, _index, isTop) => (
                                <SkillCardContent
                                    category={category}
                                    isDark={isDark}
                                    t={t}
                                    isTop={isTop}
                                />
                            )}
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* Tech marquee */}
            <div className="min-h-[300px] md:min-h-[500px] flex flex-col items-center justify-center gap-6 w-full overflow-hidden">
                <div className="flex flex-col rotate-6 w-[150%] gap-6">
                    <TechRow items={firstHalf} variant={marqueeLeft} />
                    <div className="h-0.5 w-full bg-border" />
                    <TechRow items={secondHalf} variant={marqueeRight} />
                </div>
            </div>
        </section>
    );
}
