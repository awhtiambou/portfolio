"use client";

import { useEffect, useState } from "react";
import { projects } from "@/data/projects";
import { ProjectsFilterSection, ProjectsGridSection } from "@/components/sections/projects";
import { Project, ProjectCategory } from "@/types";

export function ProjectsListing() {
    const categories = Array.from(new Set(projects.map((p) => p.category)));
    const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | undefined>(undefined);
    const [selectedProjects, setSelectedProjects] = useState<Project[]>(projects);

    useEffect(() => {
        if (selectedCategory) {
            setSelectedProjects(projects.filter((p) => p.category === selectedCategory));
        } else {
            setSelectedProjects(projects);
        }
    }, [selectedCategory]);

    const onCategoryChange = (category: ProjectCategory | undefined) => {
        setSelectedCategory(category);
    }

    return (
        <>
            <ProjectsFilterSection categories={categories} selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
            <ProjectsGridSection projects={selectedProjects} />
        </>
    );
}
