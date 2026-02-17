"use client";

import { useEffect, useState } from "react";
import { projects, getAllCategories } from "@/data/projects";
import { ProjectsFilterSection, ProjectsGridSection } from "@/components/sections/projects";
import { Project, ProjectCategory } from "@/types";

export function ProjectsListing() {
    const categories = getAllCategories(); // Get all unique categories from all projects
    const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | undefined>(undefined);
    const [selectedProjects, setSelectedProjects] = useState<Project[]>(projects);

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

    return (
        <>
            <ProjectsFilterSection categories={categories} selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
            <ProjectsGridSection projects={selectedProjects} />
        </>
    );
}