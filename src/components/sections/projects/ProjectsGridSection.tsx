"use client";

import Link from "next/link";
import { Section } from "@/components/layout";
import { Card, CardContent, Badge } from "@/components/ui";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

const categoryColors: Record<Project["category"], string> = {
    ml: "accent-blue",
    ai: "accent-pink",
    devops: "accent-mint",
    mlops: "accent-yellow",
    web: "accent-blue",
    mobile: "accent-pink",
    design: "accent-mint",
    other: "default",
};

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

export function ProjectsGridSection() {
    return (
        <Section>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <Link key={project.id} href={`/projects/${project.slug}`}>
                        <Card variant="elevated" className="h-full group overflow-hidden">
                            {/* Project Image */}
                            <div className="relative h-52 -mx-6 -mt-6 mb-4 bg-gradient-to-br from-accent-blue/20 via-accent-pink/10 to-accent-yellow/20 overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center text-5xl">
                                    {project.category === "ml" && "🤖"}
                                    {project.category === "ai" && "🧠"}
                                    {project.category === "mlops" && "⚙️"}
                                    {project.category === "web" && "🌐"}
                                    {project.category === "devops" && "🔧"}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-background-secondary via-transparent to-transparent" />

                                {/* Status badge */}
                                {project.status === "in-progress" && (
                                    <div className="absolute top-4 right-4">
                                        <Badge variant="accent-yellow" size="sm">In Progress</Badge>
                                    </div>
                                )}
                            </div>

                            <CardContent>
                                {/* Category */}
                                <Badge
                                    variant={categoryColors[project.category] as "accent-blue" | "accent-pink" | "accent-mint" | "accent-yellow" | "default"}
                                    size="sm"
                                    className="mb-3"
                                >
                                    {categoryLabels[project.category]}
                                </Badge>

                                {/* Title */}
                                <h2 className="font-heading font-semibold text-xl text-text-primary mb-2 group-hover:text-accent-blue transition-colors">
                                    {project.title}
                                </h2>

                                {/* Description */}
                                <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                                    {project.description}
                                </p>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {project.technologies.slice(0, 4).map((tech) => (
                                        <Badge key={tech} variant="outline" size="sm">
                                            {tech}
                                        </Badge>
                                    ))}
                                    {project.technologies.length > 4 && (
                                        <Badge variant="outline" size="sm">
                                            +{project.technologies.length - 4}
                                        </Badge>
                                    )}
                                </div>

                                {/* Links */}
                                <div className="flex gap-4 text-sm">
                                    {project.githubUrl && (
                                        <span className="text-accent-blue">GitHub →</span>
                                    )}
                                    {project.liveUrl && (
                                        <span className="text-accent-pink">Live Demo →</span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </Section>
    );
}
