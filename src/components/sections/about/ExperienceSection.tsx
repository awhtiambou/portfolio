"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import { experiences } from "@/data/experience";
import { SectionTitle } from "@/components/ui";
import { ScrollText } from "@/components/scroll";
import { cn } from "@/lib/utils";

const W = "app-container";

function formatDate(dateStr: string, locale: string): string {
  const [year, month] = dateStr.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString(locale === "fr" ? "fr-CA" : "en-CA", {
    month: "short", year: "numeric",
  });
}

interface RowProps {
  exp: typeof experiences[number];
  index: number;
  isLast: boolean;
}

function ExperienceRow({ exp, index, isLast }: RowProps) {
  const t = useTranslations("experience");
  const locale = useLocale();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [open, setOpen] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 160, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 160, damping: 22 });
  const bg = useTransform(
    [springX, springY],
    ([x, y]: number[]) =>
      `radial-gradient(420px circle at ${x}px ${y}px, ${isDark ? "rgba(255,15,123,0.05)" : "rgba(8,32,62,0.04)"
      }, transparent 70%)`
  );

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - r.left);
    mouseY.set(e.clientY - r.top);
  }

  const item = t.raw(`items.${exp.key}`) as Record<string, string>;
  const startFmt = formatDate(exp.startDate, locale);
  const endFmt = exp.current ? t("present") : exp.endDate ? formatDate(exp.endDate, locale) : "";
  const divider = isDark ? "border-white/10" : "border-gray-200";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay: index * 0.07 }}
      viewport={{ once: true, margin: "-40px" }}
      className={`group relative border-t ${divider} ${isLast ? `border-b ${divider}` : ""} overflow-hidden`}
      onMouseMove={onMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: bg }}
      />

      <div className={`${W} py-6 md:py-8 px-2 relative`}>

        <button
          className="w-full text-left"
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
        >
          <div className="flex items-start gap-4">

            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden
              border border-white/10 bg-background-secondary">
              <Image
                src={exp.logo}
                alt={item.company}
                width={56} height={56}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className={cn("font-heading font-bold text-text-primary text-base md:text-lg leading-tight transition-colors duration-200", isDark ? "group-hover:text-accent-yellow" : "group-hover:text-accent-blue")}>
                  <ScrollText skewIntensity={0.15} scaleIntensity={0.01}>
                    {item.position}
                  </ScrollText>
                </span>
                {exp.current && (
                  <span className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border",
                    isDark ? "bg-accent-yellow/10 text-accent-yellow border-accent-yellow/20" : "bg-accent-blue/10 text-accent-blue border-accent-blue/20"
                  )}>
                    <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", isDark ? "bg-accent-yellow" : "bg-accent-blue")} />
                    {t("current")}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className={cn("font-semibold text-text-secondary transition-colors", isDark ? "hover:text-accent-yellow" : "hover:text-accent-blue")}
                >
                  {item.company}
                </a>
                <span className="text-text-muted opacity-30">·</span>
                <span className="text-text-muted text-sm">{item.location}</span>
                <span className="text-text-muted opacity-30">·</span>
                <span className="text-text-muted text-xs font-mono">{item.type}</span>
              </div>

              <p className="text-xs text-text-muted font-mono mt-1.5">
                {startFmt} — {endFmt}
              </p>
            </div>

            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="flex-shrink-0 mt-1 text-text-muted group-hover:text-text-secondary
                transition-colors self-start"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </motion.div>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="pl-0 md:pl-[72px] pt-5 pb-2 space-y-5">

                <p className="text-sm text-text-secondary leading-relaxed max-w-3xl">
                  {item.description}
                </p>

                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-text-muted mb-3">
                    {t("responsibilities")}
                  </p>
                  <ul className="space-y-2.5 max-w-3xl">
                    {exp.responsibilityKeys.map((rk) => {
                      const fieldKey = rk.split(".")[1]; // "r0", "r1", …
                      return (
                        <li key={rk} className="flex items-start gap-3 text-sm text-text-secondary">
                          <span className={cn("flex-shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full opacity-60", isDark ? "bg-accent-yellow" : "bg-accent-blue")} />
                          {item[fieldKey]}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {exp.technologies.map(tech => (
                    <span key={tech}
                      className="px-2.5 py-1 rounded-full text-xs border border-white/10
                        bg-background-primary text-text-muted
                        group-hover:border-white/20 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

const INITIAL_COUNT = 3;

export function ExperienceSection() {
  const t = useTranslations("experience");
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? [...experiences] : [...experiences].slice(0, INITIAL_COUNT);
  const hasMore = experiences.length > INITIAL_COUNT;

  return (
    <div className="py-20 w-full">

      <SectionTitle className="app-container" subtitle={t("subtitle")} title={t("title")} />

      <div className="w-full">
        {visible.map((exp, i) => (
          <ExperienceRow
            key={exp.key}
            exp={exp}
            index={i}
            isLast={i === visible.length - 1}
          />
        ))}
      </div>

      {hasMore && (
        <div className={`${W} mt-8 flex justify-center`}>
          <motion.button
            onClick={() => setShowAll(v => !v)}
            className={`
              flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium
              border transition-all duration-200
              ${isDark
                ? "border-white/10 text-text-secondary hover:border-white/25 hover:text-text-primary"
                : "border-gray-200 text-text-secondary hover:border-gray-400 hover:text-text-primary"
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.svg
              className="w-4 h-4"
              viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2} strokeLinecap="round"
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <path d="M6 9l6 6 6-6" />
            </motion.svg>
            {showAll ? t("showLess") : t("showMore")}
          </motion.button>
        </div>
      )}
    </div>
  );
}