"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Section } from "@/components/layout";
import { SectionTitle } from "@/components/ui";
import { getFeaturedProjects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { fadeInUp } from "@/lib/animations";

// Colors for the spotlight effect based on primary category
const categoryColors: Record<string, string> = {
  ml: "rgba(59, 130, 246, 0.15)", // blue
  ai: "rgba(236, 72, 153, 0.15)", // pink
  devops: "rgba(16, 185, 129, 0.15)", // mint/green
  mlops: "rgba(245, 166, 35, 0.15)", // yellow
  web: "rgba(59, 130, 246, 0.15)", // blue
  mobile: "rgba(236, 72, 153, 0.15)", // pink
  backend: "rgba(99, 102, 241, 0.15)", // indigo
  design: "rgba(46, 204, 113, 0.15)", // mint
  other: "rgba(107, 114, 128, 0.15)", // gray
};

const categoryLabels: Record<string, string> = {
  ml: "Machine Learning",
  ai: "Artificial Intelligence",
  devops: "DevOps",
  mlops: "MLOps",
  web: "Web",
  mobile: "Mobile",
  backend: "Backend",
  design: "Design",
  other: "Other",
};

function FeaturedProjectRow({ project, index }: { project: any; index: number }) {
  const t = useTranslations();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Use first category for spotlight color
  const primaryCategory = project.categories[0];
  const bg = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, ${categoryColors[primaryCategory]}, transparent 40%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "group relative border-b transition-all duration-300 hover:z-10",
        isDark ? "border-white/60" : "border-gray-600"
      )}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background: bg }}
      />

      <Link href={`/projects/${project.slug}`} className="relative block">
        <div className="relative flex items-center gap-4 md:gap-8 py-6 md:py-6 px-4 md:px-6">
          <div className="flex-1 flex flex-col relative z-20">
            <div className="block md:hidden w-full aspect-video relative rounded-lg overflow-hidden mb-6 shadow-md">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={t(`projects.items.${project.slug}.title`)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 0vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-4xl">
                  {primaryCategory === "ml" && "🤖"}
                  {primaryCategory === "ai" && "🧠"}
                  {primaryCategory === "web" && "🌐"}
                  {primaryCategory === "mobile" && "📱"}
                  {primaryCategory === "backend" && "⚙️"}
                  {primaryCategory === "design" && "🎨"}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <span
                className={cn(
                  "text-sm md:text-base font-accent font-medium tabular-nums",
                  isDark ? "text-white/40" : "text-gray-400"
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-gray-300 dark:from-white/20 to-transparent" />
            </div>

            <h3
              className={cn(
                "font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 transition-all duration-300 uppercase tracking-tight",
                isDark
                  ? "text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70"
                  : "text-gray-900 group-hover:text-gray-600"
              )}
            >
              {t(`projects.items.${project.slug}.title`)}
            </h3>

            <p
              className={cn(
                "text-base md:text-lg font-accent mb-6 transition-opacity duration-300",
                isDark ? "text-white/60" : "text-gray-600"
              )}
            >
              {project.categories.map((cat: string) => categoryLabels[cat]).join(" • ")}
            </p>

            <div className="flex flex-wrap items-center gap-2 mb-6">
              {project.categories.slice(0, 4).map((cat: string, i: number) => (
                <span
                  key={`cat-${i}`}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs md:text-sm font-medium font-accent transition-all duration-300",
                    isDark
                      ? "bg-white/5 text-white/70 border border-white/10 group-hover:border-white/20 group-hover:bg-white/10"
                      : "bg-gray-100 text-gray-700 border border-gray-200 group-hover:bg-gray-200"
                  )}
                >
                  {categoryLabels[cat]}
                </span>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3 mt-4">
              <span
                className={cn(
                  "text-sm md:text-base font-accent font-medium transition-all duration-300",
                  "opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
                )}
              >
                {t("projects.viewProject")}
              </span>
              <motion.div
                className={cn(
                  "flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border transition-all duration-300",
                  isDark
                    ? "border-white/10 text-white/40 group-hover:bg-white group-hover:text-black group-hover:border-transparent"
                    : "border-gray-200 text-gray-400 group-hover:bg-gray-900 group-hover:text-white group-hover:border-transparent",
                  "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                )}
                animate={
                  isHovered
                    ? { x: [0, 4, 0], y: [0, -4, 0] }
                    : {}
                }
                transition={{ duration: 0.3 }}
              >
                <GoArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
              </motion.div>
            </div>
            <div className="flex md:hidden items-center gap-2 mt-2 text-sm font-medium text-blue-500 dark:text-blue-400">
              {t("projects.viewProject")} <GoArrowUpRight />
            </div>
          </div>

          <motion.div
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 hidden md:block z-5",
              "w-[30%] lg:w-[40%] xl:w-[50%] max-w-[700px]",
              "transition-all duration-500 ease-out origin-center"
            )}
            style={{
              opacity: isHovered ? 1 : 0,
              rotate: isHovered ? -5 : 0,
              scale: isHovered ? 1.1 : 0.8,
              x: isHovered ? 0 : 50,
            }}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl shadow-2xl border border-white/10 bg-gray-900">
              {project.image ? (
                <>
                  <Image
                    src={project.image}
                    alt={t(`projects.items.${project.slug}.title`)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-6xl">
                  {primaryCategory === "ml" && "🤖"}
                  {primaryCategory === "ai" && "🧠"}
                  {primaryCategory === "web" && "🌐"}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedProjectsSection() {
  const t = useTranslations();
  const featuredProjects = getFeaturedProjects();

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  return (
    <div className="w-full flex items-center justify-center mt-20">
      <div className="app-container">
        <div className={`mb-12`}>
          <motion.p
            className="text-xs font-mono uppercase tracking-[0.25em] text-text-muted mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t("projects.subtitle")}
          </motion.p>
          <motion.h2
            className="font-heading text-4xl md:text-5xl font-bold text-text-primary"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t("projects.title")}
          </motion.h2>
        </div>


        <div className={cn(
          "flex flex-col border-t",
          isDark ? "border-white/60" : "border-gray-600"
        )}>
          {featuredProjects.map((project, index) => (
            <FeaturedProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="flex">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 md:mt-16 text-center"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 transition-all duration-300 hover:gap-4"
            >
              <span className="text-base md:text-lg font-accent font-medium">
                {t("projects.viewAllProjects")}
              </span>
              <GoArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}