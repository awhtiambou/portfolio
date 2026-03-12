"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { getFeaturedProjects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { GoArrowUpRight } from "react-icons/go";
import { MdArrowForward } from "react-icons/md";
import { FillButton, SectionTitle } from "@/components/ui";
import { SplitText, RevealText } from "@/components/scroll";
import { useIsMobile } from "@/hooks";

const categoryColors: Record<string, { gradient: string; accent: string }> = {
  ml: { gradient: "from-blue-600/20 to-violet-600/20", accent: "#3b82f6" },
  ai: { gradient: "from-pink-600/20 to-purple-600/20", accent: "#ec4899" },
  devops: { gradient: "from-emerald-600/20 to-teal-600/20", accent: "#10b981" },
  mlops: { gradient: "from-amber-600/20 to-orange-600/20", accent: "#f59e0b" },
  web: { gradient: "from-blue-600/20 to-cyan-600/20", accent: "#0ea5e9" },
  mobile: { gradient: "from-pink-600/20 to-rose-600/20", accent: "#f43f5e" },
  backend: { gradient: "from-indigo-600/20 to-blue-600/20", accent: "#6366f1" },
  design: { gradient: "from-green-600/20 to-emerald-600/20", accent: "#22c55e" },
  other: { gradient: "from-gray-600/20 to-slate-600/20", accent: "#6b7280" },
};

const categoryLabels: Record<string, string> = {
  ml: "Machine Learning",
  ai: "Artificial Intelligence",
  devops: "DevOps",
  mlops: "MLOps",
  web: "Web Development",
  mobile: "Mobile",
  backend: "Backend",
  design: "Design",
  other: "Other",
};

interface ProjectCardProps {
  project: ReturnType<typeof getFeaturedProjects>[number];
  index: number;
  total: number;
  progress: number;
}

function HorizontalProjectCard({ project, index, total, progress }: ProjectCardProps) {
  const t = useTranslations();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const cardRef = useRef<HTMLDivElement>(null);
  
  const primaryCategory = project.categories[0];
  const colors = categoryColors[primaryCategory] || categoryColors.other;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const glowBg = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${colors.accent}15, transparent 60%)`;

  return (
    <motion.div
      ref={cardRef}
      className="flex-shrink-0 w-screen h-[85vh] p-6 md:p-10"
      onMouseMove={onMouseMove}
    >
      <Link href={`/projects/${project.slug}`} className="group block h-full">
        <div
          className={cn(
            "relative h-full rounded-3xl overflow-hidden border transition-all duration-500",
            isDark
              ? "bg-background-secondary/80 border-white/10 hover:border-white/20"
              : "bg-white/80 border-gray-200 hover:border-gray-300",
            "backdrop-blur-xl"
          )}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: glowBg }}
          />

          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-50",
              colors.gradient
            )}
          />

          <div className="relative h-full grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 z-10">
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="text-6xl md:text-7xl lg:text-8xl font-heading font-bold opacity-20"
                  style={{ color: colors.accent }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-current to-transparent opacity-30" />
              </div>

              <h3
                className={cn(
                  "font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight uppercase tracking-tight"
                )}
              >
                <SplitText type="words" animation="slideUp" staggerDelay={0.05}>
                  {t(`projects.items.${project.slug}.title`)}
                </SplitText>
              </h3>

              <p
                className={cn(
                  "text-base md:text-lg leading-relaxed mb-6 max-w-lg line-clamp-3",
                  isDark ? "text-white/70" : "text-gray-600"
                )}
              >
                {t(`projects.items.${project.slug}.description`)}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.categories.slice(0, 4).map((cat, i) => (
                  <span
                    key={`${cat}-${i}`}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                      isDark
                        ? "bg-white/5 border-white/10 text-white/80"
                        : "bg-gray-100 border-gray-200 text-gray-700"
                    )}
                  >
                    {categoryLabels[cat]}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <motion.div
                  className={cn(
                    "flex items-center gap-3 px-6 py-3 rounded-full border font-medium transition-all duration-300",
                    isDark
                      ? "border-white/20 text-white group-hover:bg-white group-hover:text-black"
                      : "border-gray-300 text-gray-900 group-hover:bg-gray-900 group-hover:text-white"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t("projects.viewProject")}
                  <GoArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <motion.div
                className="absolute inset-0 rounded-r-2xl overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {project.image ? (
                  <>
                    <Image
                      src={project.image}
                      alt={t(`projects.items.${project.slug}.title`)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </>
                ) : (
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center bg-gradient-to-br text-8xl",
                      colors.gradient
                    )}
                  >
                    {primaryCategory === "ml" && "🤖"}
                    {primaryCategory === "ai" && "🧠"}
                    {primaryCategory === "web" && "🌐"}
                    {primaryCategory === "mobile" && "📱"}
                    {primaryCategory === "backend" && "⚙️"}
                    {primaryCategory === "design" && "🎨"}
                  </div>
                )}
              </motion.div>

              <div
                className="absolute top-4 right-4 w-32 h-32 rounded-full blur-3xl opacity-30"
                style={{ background: colors.accent }}
              />
              <div
                className="absolute bottom-4 left-4 w-24 h-24 rounded-full blur-2xl opacity-20"
                style={{ background: colors.accent }}
              />
            </div>
          </div>

          <div className="lg:hidden absolute inset-0 pointer-events-none">
            {project.image && (
              <div className="absolute inset-0 opacity-10">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ScrollProgressIndicator({
  progress,
  total,
  current,
  isVisible,
}: {
  progress: number;
  total: number;
  current: number;
  isVisible: boolean;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <motion.div 
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md border"
      style={{
        backgroundColor: isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.8)",
        borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "rounded-full transition-all duration-300",
              i === current
                ? "w-8 h-2"
                : "w-2 h-2",
              isDark
                ? i === current ? "bg-accent-yellow" : "bg-white/30"
                : i === current ? "bg-accent-blue" : "bg-gray-300"
            )}
          />
        ))}
      </div>

      <div
        className={cn(
          "w-24 h-1 rounded-full overflow-hidden",
          isDark ? "bg-white/20" : "bg-gray-200"
        )}
      >
        <motion.div
          className={cn(
            "h-full rounded-full",
            isDark ? "bg-accent-yellow" : "bg-accent-blue"
          )}
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <span
        className={cn(
          "text-sm font-mono tabular-nums",
          isDark ? "text-white/60" : "text-gray-500"
        )}
      >
        {String(current + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
      </span>
    </motion.div>
  );
}

function MobileProjectCard({ project, index }: { project: ReturnType<typeof getFeaturedProjects>[number]; index: number }) {
  const t = useTranslations();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const primaryCategory = project.categories[0];
  const colors = categoryColors[primaryCategory] || categoryColors.other;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group relative border-t",
        isDark ? "border-white/10" : "border-gray-400"
      )}
    >
      <Link href={`/projects/${project.slug}`} className="relative block">
        <div className="flex flex-col sm:flex-row items-center gap-6 py-8 px-4">
          <div className="w-full sm:w-5/12 flex-shrink-0">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-white/5 shadow-lg transition-transform duration-500 group-hover:scale-[1.02]">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={t(`projects.items.${project.slug}.title`)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              ) : (
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center text-6xl bg-gradient-to-br",
                    colors.gradient
                  )}
                >
                  {primaryCategory === "ml" && "🤖"}
                  {primaryCategory === "ai" && "🧠"}
                  {primaryCategory === "web" && "🌐"}
                  {primaryCategory === "mobile" && "📱"}
                  {primaryCategory === "backend" && "⚙️"}
                  {primaryCategory === "design" && "🎨"}
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10 dark:group-hover:bg-white/5" />
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center sm:items-start w-full">
            <h3
              className={cn(
                "text-center sm:text-left text-xl sm:text-2xl font-black font-heading uppercase tracking-wider mb-2 transition-colors duration-300",
                isDark
                  ? "text-white group-hover:text-accent-yellow"
                  : "text-gray-900 group-hover:text-accent-blue"
              )}
            >
              {t(`projects.items.${project.slug}.title`)}
            </h3>

            <span
              className={cn(
                "text-center sm:text-left text-sm font-accent font-semibold mb-2",
                isDark ? "text-white/70" : "text-gray-600"
              )}
            >
              {project.categories.map((cat) => categoryLabels[cat]).join(" • ")}
            </span>

            <span
              className={cn(
                "text-xs font-accent mb-3",
                isDark ? "text-white/50" : "text-gray-500"
              )}
            >
              {project.technologies.slice(0, 4).join(", ")}
            </span>

            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              {project.categories.slice(0, 3).map((cat) => (
                <span
                  key={cat}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300",
                    isDark
                      ? "bg-white/5 text-white/70 border-white/10 group-hover:border-white/20"
                      : "bg-gray-100 text-gray-700 border-gray-200 group-hover:bg-gray-200"
                  )}
                >
                  {categoryLabels[cat]}
                </span>
              ))}
            </div>
          </div>

          <div
            className={cn(
              "hidden sm:flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300",
              isDark
                ? "border-white/10 text-white/40 group-hover:bg-white group-hover:text-black group-hover:border-transparent"
                : "border-gray-300 text-gray-400 group-hover:bg-gray-900 group-hover:text-white group-hover:border-transparent"
            )}
          >
            <GoArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedProjectsHorizontal() {
  const t = useTranslations();
  const featuredProjects = getFeaturedProjects();
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const isMobile = useIsMobile();
  const [isHydrated, setIsHydrated] = useState(false);
  const [refAttached, setRefAttached] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && containerRef.current) {
      setRefAttached(true);
    }
  }, [isHydrated]);

  const { scrollYProgress } = useScroll(
    refAttached
      ? { target: containerRef, offset: ["start start", "end end"] as const }
      : {}
  );

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const totalProjects = featuredProjects.length;
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(totalProjects - 1) * 100]  // in vw units
  );
  const smoothX = useSpring(x, { stiffness: 80, damping: 25 });
  const xWithUnits = useMotionTemplate`${smoothX}vw`;

  const [currentProject, setCurrentProject] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [isInSection, setIsInSection] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const projectIndex = Math.round(latest * (totalProjects - 1));
    setCurrentProject(Math.min(projectIndex, totalProjects - 1));
    setProgressValue(latest);
    setIsInSection(latest > 0.01 && latest < 0.99);
  });

  if (isMobile) {
    return (
      <section className="py-16">
        <div className="app-container">
          <SectionTitle
            subtitle={t("projects.subtitle")}
            title={t("projects.title")}

          />
          <div className={cn(
            "mt-8 border-b",
            isDark ? "border-white/10" : "border-gray-400"
          )}>
            {featuredProjects.map((project, index) => (
              <MobileProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <FillButton
              href="/projects"
              fillColor="var(--color-foreground)"
              className="group font-mono font-medium"
            >
              {t("projects.viewAllProjects")}
              <MdArrowForward className="ml-2 inline-block transition-transform group-hover:translate-x-2" />
            </FillButton>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative">
      <div className="app-container pt-20">
        <SectionTitle
          subtitle={t("projects.subtitle")}
          title={t("projects.title")}
          className="!mb-0"
        />
        <p
          className={cn(
            "text-left text-lg max-w-2xl mt-4",
            isDark ? "text-white/60" : "text-gray-600"
          )}
        >
          {t("projects.description")}
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${totalProjects * 90}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <motion.div
            className="flex will-change-transform"
            style={{ x: xWithUnits }}
          >
            {featuredProjects.map((project, index) => (
              <HorizontalProjectCard
                key={project.id}
                project={project}
                index={index}
                total={totalProjects}
                progress={progressValue}
              />
            ))}
          </motion.div>
        </div>

        <ScrollProgressIndicator
          progress={progressValue}
          total={totalProjects}
          current={currentProject}
          isVisible={isInSection}
        />
      </div>

      <motion.div
        className="app-container pt-0 py-20 flex justify-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <FillButton
          href="/projects"
          fillColor="var(--color-foreground)"
          className="group font-mono font-medium"
        >
          {t("projects.viewAllProjects")}
          <MdArrowForward className="ml-2 inline-block transition-transform duration-400 group-hover:translate-x-2" />
        </FillButton>
      </motion.div>
    </section>
  );
}
