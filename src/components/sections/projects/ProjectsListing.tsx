"use client";

import { useMemo, useState } from "react";
import { projects, getAllCategories } from "@/data/projects";
import { ProjectsFilterSection, ProjectsGridSection } from "@/components/sections/projects";
import { ProjectCategory } from "@/types";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { SplitText, RevealText } from "@/components/scroll";
import { useHydrated } from "@/hooks";

export function ProjectsListing() {
    const categories = getAllCategories(); // Get all unique categories from all projects
    const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | undefined>(undefined);
    const { resolvedTheme } = useTheme();
    const hydrated = useHydrated();
    const isDark = hydrated && resolvedTheme === "dark";
    const selectedProjects = useMemo(() => {
        if (!selectedCategory) {
            return projects;
        }

        return projects.filter((project) => project.categories.includes(selectedCategory));
    }, [selectedCategory]);

    const onCategoryChange = (category: ProjectCategory | undefined) => {
        setSelectedCategory(category);
    }

    const t = useTranslations("projects");

    return (
        <div className="pb-24">
            <div className="mb-12 app-container">
                <p className={cn("text-xs font-mono uppercase tracking-[0.25em] mb-3", isDark ? "text-accent-yellow" : "text-text-muted")}>
                    {t("subtitle")}
                </p>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4">
                    <SplitText type="words" animation="slideUp" staggerDelay={0.08}>
                        {t("title")}
                    </SplitText>
                </h1>
                <RevealText direction="up" delay={0.2}>
                    <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
                        {t("description")}
                    </p>
                </RevealText>
            </div>
            <ProjectsFilterSection categories={categories} selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
            <ProjectsGridSection projects={selectedProjects} />
        </div>
    );
}
