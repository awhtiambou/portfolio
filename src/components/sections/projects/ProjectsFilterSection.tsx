"use client";

import { Section } from "@/components/layout";
import { Badge } from "@/components/ui";
import { projects } from "@/data/projects";
import { Project } from "@/types";

const categoryLabels: Record<Project["category"], string> = {
    ml: "Machine Learning",
    ai: "Artificial Intelligence",
    devops: "DevOps",
    mlops: "MLOps",
    web: "Web Development",
    mobile: "Mobile",
    design: "Design",
    other: "Other",
};

export function ProjectsFilterSection() {
    // Get unique categories
    const categories = Array.from(new Set(projects.map((p) => p.category)));

    return (
        <Section spacing="sm">
            <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="primary" size="md" className="cursor-pointer">
                    All Projects
                </Badge>
                {categories.map((category) => (
                    <Badge key={category} variant="outline" size="md" className="cursor-pointer hover:bg-background-secondary">
                        {categoryLabels[category]}
                    </Badge>
                ))}
            </div>
        </Section>
    );
}
