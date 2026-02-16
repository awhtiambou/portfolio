"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { Project } from "@/types";
import { useTheme } from "next-themes";
import { GoArrowUpRight } from "react-icons/go";

// Colors for the spotlight effect based on category
const categoryColors: Record<Project["category"], string> = {
    ml: "rgba(59, 130, 246, 0.15)", // blue
    ai: "rgba(236, 72, 153, 0.15)", // pink
    devops: "rgba(16, 185, 129, 0.15)", // mint/green
    mlops: "rgba(245, 166, 35, 0.15)", // yellow
    web: "rgba(59, 130, 246, 0.15)", // blue
    mobile: "rgba(236, 72, 153, 0.15)", // pink
    design: "rgba(46, 204, 113, 0.15)", // mint
    other: "rgba(107, 114, 128, 0.15)", // gray
};

const categoryLabels: Record<Project["category"], string> = {
    ml: "Machine Learning",
    ai: "Artificial Intelligence",
    devops: "DevOps",
    mlops: "MLOps",
    web: "Web App",
    mobile: "Mobile App",
    design: "Design",
    other: "Other",
};

function ProjectRow({ project, index }: { project: Project; index: number }) {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    // Mouse tracking for spotlight
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    // Dynamic gradient background
    const bg = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, ${categoryColors[project.category]}, transparent 40%)`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className={cn("group relative border-t", isDark ? "border-white/10" : "border-gray-400", index === projects.length - 1 ? "border-b" : "")}
            onMouseMove={onMouseMove}
        >
            {/* Spotlight Effect Background */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{ background: bg }}
            />

            <Link href={`/projects/${project.slug}`} className="relative block">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 py-12 md:py-10 px-4 md:px-8">

                    {/* Image Section */}
                    <div className="w-full md:w-5/12 lg:w-4/12 xl:w-3/12 flex-shrink-0">
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-white/5 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                            {/* If image exists, use it. Otherwise placeholder gradient */}
                            {project.image ? (
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 40vw"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-6xl">
                                    {project.category === "ml" && "🤖"}
                                    {project.category === "ai" && "🧠"}
                                    {project.category === "web" && "🌐"}
                                </div>
                            )}

                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10 dark:group-hover:bg-white/5" />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 flex flex-col items-center md:items-start w-full">
                        {/* Title */}
                        <div className="flex items-center md:items-start justify-between w-full group/title gap-5">
                            <div
                                style={{ fontWeight: 800 }}
                                className={cn(
                                    "text-center md:text-left text-2xl md:text-3xl xl:text-4xl font-black font-heading uppercase tracking-wider mb-4 transition-colors duration-300",
                                    isDark ? "text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/90" : "text-gray-900",
                                    "transition-transform duration-500 group-hover:scale-[1.02]"
                                )}>
                                {project.title}
                            </div>

                            {/* Arrow Icon for Desktop */}
                            <motion.div
                                className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 text-gray-400 dark:text-white/40 transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-transparent group-hover:scale-110 group-hover:-translate-y-1 group-hover:translate-x-1"
                            >
                                <GoArrowUpRight className="w-8 h-8" />
                            </motion.div>
                        </div>

                        <div className="w-full flex flex-wrap flex-col md:flex-row items-center md:items-start gap-x-4 gap-y-2 mb-6 text-base md:text-lg font-accent ">
                            <span className="text-color-foreground" style={{ fontWeight: 500 }}>{categoryLabels[project.category]}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-white/20" />
                            <span className="text-color-foreground" style={{ fontWeight: 400 }}>{project.technologies.slice(0, 4).join(", ")}</span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-auto">
                            {/* Custom Badge Style for this layout */}
                            {[{ name: categoryLabels[project.category], type: 'main' }, ...project.technologies.slice(0, 4).map(t => ({ name: t, type: 'tech' }))].map((tag, i) => (
                                <span
                                    key={i}
                                    className={cn(
                                        "px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
                                        isDark
                                            ? "bg-white/5 text-white/70 border border-white/10 group-hover:border-white/20 group-hover:bg-white/10"
                                            : "bg-gray-100 text-gray-700 border border-gray-200 group-hover:bg-gray-200"
                                    )}
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

type ProjectsGridSectionProps = {
    projects: Project[];
}

export function ProjectsGridSection({ projects }: ProjectsGridSectionProps) {
    return (
        <div className="flex flex-col">
            {projects.map((project, index) => (
                <ProjectRow key={project.id} project={project} index={index} />
            ))}
        </div>
    );
}

