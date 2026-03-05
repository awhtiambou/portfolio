"use client";

import { useEffect, useState } from "react";
import { projects, getAllCategories } from "@/data/projects";
import { ProjectsFilterSection, ProjectsGridSection } from "@/components/sections/projects";
import { Project, ProjectCategory } from "@/types";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ProjectsListing() {
    const categories = getAllCategories(); // Get all unique categories from all projects
    const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | undefined>(undefined);
    const [selectedProjects, setSelectedProjects] = useState<Project[]>(projects);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === "dark";

    useEffect(() => {
        if (selectedCategory) {
            // Filter projects that have the selected category
            setSelectedProjects(projects.filter((p) => p.categories.includes(selectedCategory)));
        } else {
            setSelectedProjects(projects);
        }
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
                    {t("title")}
                </h1>
                <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
                    {t("description")}
                </p>
            </div>
            <ProjectsFilterSection categories={categories} selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
            <ProjectsGridSection projects={selectedProjects} />
        </div>
    );
}