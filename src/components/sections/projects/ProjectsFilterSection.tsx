"use client";

import { Badge } from "@/components/ui";
import { Locale, locales } from "@/i18n";
import { cn } from "@/lib/utils";
import { Project, ProjectCategory } from "@/types";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { useTranslations } from "use-intl";
import { FiChevronDown } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const categoryLabels: Record<ProjectCategory, string> = {
    ml: "ML",
    cv: "Computer Vision",
    ai: "AI",
    devops: "DevOps",
    mlops: "MLOps",
    web: "Web",
    mobile: "Mobile",
    backend: "Backend",
    design: "Design",
    other: "Other",
};

type ProjectsFilterSectionProps = {
    categories: ProjectCategory[];
    selectedCategory: ProjectCategory | undefined;
    onCategoryChange: (category: ProjectCategory | undefined) => void;
}

export function ProjectsFilterSection({ categories, selectedCategory, onCategoryChange }: ProjectsFilterSectionProps) {
    const [mounted, setMounted] = useState(false);
    const [currentLocale, setCurrentLocale] = useState<Locale>("en");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { resolvedTheme } = useTheme();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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

    const isDark = mounted && resolvedTheme === "dark";

    const handleCategorySelect = (category: ProjectCategory | undefined) => {
        onCategoryChange(category);
        setIsDropdownOpen(false);
    };

    const currentLabel = selectedCategory ? categoryLabels[selectedCategory] : "All Projects";

    return (
        <div className="w-full flex justify-center items-center mb-6 relative z-30">
            <div className="md:hidden w-[calc(100%-2rem)] relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={cn(
                        "w-full flex items-center justify-between px-5 py-4 rounded-xl border transition-all duration-300",
                        isDark
                            ? "bg-[#1a1a1a]/80 backdrop-blur-xl border-white/10 text-white"
                            : "bg-white/80 backdrop-blur-xl border-white/40 text-gray-900",
                        "shadow-lg"
                    )}
                >
                    <span className="font-heading font-medium text-sm opacity-70">Category</span>
                    <div className="flex items-center gap-2">
                        <span className="font-accent font-semibold text-sm">{currentLabel}</span>
                        <motion.div
                            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <FiChevronDown className="w-4 h-4" />
                        </motion.div>
                    </div>
                </button>

                <AnimatePresence>
                    {isDropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className={cn(
                                "absolute top-full text-right mt-2 w-full rounded-xl border overflow-hidden flex flex-col items-end py-2",
                                isDark
                                    ? "bg-[#0a0a0a]/95 backdrop-blur-2xl border-white/10 shadow-2xl shadow-black/50"
                                    : "bg-white/95 backdrop-blur-2xl border-gray-200 shadow-xl"
                            )}
                        >
                            <div className="px-4 py-2 w-full flex justify-between items-center text-xs font-bold uppercase tracking-wider opacity-50 border-b border-white/5 mb-1">
                                <span>Filter by</span>
                            </div>

                            <button
                                onClick={() => handleCategorySelect(undefined)}
                                className={cn(
                                    "w-full text-right px-5 py-3 text-sm font-accent transition-colors",
                                    selectedCategory === undefined
                                        ? "text-accent-blue font-bold bg-accent-blue/10"
                                        : isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                                )}
                            >
                                All Projects
                            </button>

                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleCategorySelect(category)}
                                    className={cn(
                                        "w-full text-right px-5 py-3 text-sm font-accent transition-colors",
                                        selectedCategory === category
                                            ? "text-accent-blue font-bold bg-accent-blue/10"
                                            : isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                                    )}
                                >
                                    {categoryLabels[category]}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div
                className={cn(
                    "hidden md:flex flex-wrap gap-2 md:gap-4 py-2 md:py-2 px-4 md:px-3 rounded-2xl app-container",
                    isDark
                        ? "bg-[#1a1a1a]/60 backdrop-blur-xl shadow-xl border-white/10"
                        : "bg-white/60 backdrop-blur-xl shadow-xl border-white/40"
                )}
            >
                <div
                    onClick={() => selectedCategory !== undefined && onCategoryChange(undefined)}
                    className={cn(
                        "text-sm cursor-pointer font-accent px-3 py-2 rounded-xl transition-all duration-300",
                        selectedCategory === undefined
                            ? "font-medium bg-foreground text-background shadow-md"
                            : "font-light hover:bg-black/5 dark:hover:bg-white/5"
                    )}
                >
                    All Projects
                </div>
                {categories.map((category) => (
                    <div
                        key={category}
                        onClick={() => selectedCategory !== category && onCategoryChange(category)}
                        className={cn(
                            "text-sm cursor-pointer font-accent px-3 py-2 rounded-xl transition-all duration-300",
                            selectedCategory === category
                                ? "font-medium bg-foreground text-background shadow-md"
                                : "font-light hover:bg-black/5 dark:hover:bg-white/5"
                        )}
                    >
                        {categoryLabels[category]}
                    </div>
                ))}
            </div>
        </div>
    );
}