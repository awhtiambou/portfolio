"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ProjectCategory, ProjectSection, ProjectElement } from "@/types";
import { useTranslations } from "next-intl";

// ─── Width helpers ────────────────────────────────────────────────────────────
// Matches the app's header/nav width convention.
const CONTENT_WIDTH = "w-[calc(100%-2rem)] lg:w-[calc(90%)] xl:w-[calc(80%)] mx-auto";

// ─── Props ────────────────────────────────────────────────────────────────────

interface RelatedProject {
    id: string;
    slug: string;
    title: string;
    description: string;
    image?: string;
    categories: ProjectCategory[];
}

export interface ProjectDetailProps {
    slug: string;
    title: string;
    description: string;
    sections?: ProjectSection[];
    image?: string;
    technologies: string[];
    categories: ProjectCategory[];
    status?: "completed" | "in-progress" | "planned";
    featured?: boolean;
    startDate: string;
    endDate?: string;
    liveUrl?: string;
    githubUrl?: string;
    relatedProjects: RelatedProject[];
}

// ─── Inline markdown ──────────────────────────────────────────────────────────
// Only handles inline formatting (**bold**, *italic*, `code`) — no block parsing.

function InlineText({ text }: { text: string }) {
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
    return (
        <>
            {parts.map((part, i) => {
                if (/^\*\*[^*]+\*\*$/.test(part))
                    return <strong key={i} className="font-semibold text-text-primary">{part.slice(2, -2)}</strong>;
                if (/^\*[^*]+\*$/.test(part))
                    return <em key={i} className="italic">{part.slice(1, -1)}</em>;
                if (/^`[^`]+`$/.test(part))
                    return <code key={i} className="bg-background-secondary px-1.5 py-0.5 rounded text-sm font-mono text-text-primary">{part.slice(1, -1)}</code>;
                return <span key={i}>{part}</span>;
            })}
        </>
    );
}

// ─── Scroll-reveal wrapper ────────────────────────────────────────────────────

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return (
        <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}>
            {children}
        </div>
    );
}

// ─── Element renderers ────────────────────────────────────────────────────────

function TextElement({ el }: { el: Extract<ProjectElement, { type: "text" }> }) {
    return (
        <p className="text-text-secondary leading-relaxed text-base lg:text-lg">
            <InlineText text={el.content} />
        </p>
    );
}

function ImageElement({ el }: { el: Extract<ProjectElement, { type: "image" }> }) {
    const sizeClass = {
        small: "max-w-sm mx-auto",
        normal: "max-w-2xl mx-auto",
        large: "w-full",
    }[el.size ?? "normal"];

    return (
        <figure className={sizeClass}>
            <div className="rounded-2xl overflow-hidden bg-background-secondary">
                <img src={el.src} alt={el.alt ?? ""} className="w-full h-auto object-cover" />
            </div>
            {el.caption && (
                <figcaption className="text-center text-xs text-text-muted mt-2 font-mono uppercase tracking-widest">
                    {el.caption}
                </figcaption>
            )}
        </figure>
    );
}

function ImageFullwidthElement({ el }: { el: Extract<ProjectElement, { type: "image-fullwidth" }> }) {
    const h = el.height ?? "h-[70vh]";
    return (
        <figure className="w-full">
            <div className={`${h} w-full overflow-hidden bg-background-secondary`}>
                <img src={el.src} alt={el.alt ?? ""} className="w-full h-full object-cover" />
            </div>
            {el.caption && (
                <figcaption className={`${CONTENT_WIDTH} text-xs text-text-muted mt-3 font-mono uppercase tracking-widest`}>
                    {el.caption}
                </figcaption>
            )}
        </figure>
    );
}

function ImageGridElement({ el }: { el: Extract<ProjectElement, { type: "image-grid" }> }) {
    const colClass = {
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-2 lg:grid-cols-4",
    }[el.cols ?? 2];

    return (
        <div className={`grid ${colClass} gap-4`}>
            {el.images.map((img, i) => (
                <figure key={i}>
                    <div className="rounded-2xl overflow-hidden bg-background-secondary aspect-[4/3]">
                        <img src={img.src} alt={img.alt ?? ""} className="w-full h-full object-cover" />
                    </div>
                    {img.caption && (
                        <figcaption className="text-xs text-text-muted mt-2 font-mono uppercase tracking-widest">
                            {img.caption}
                        </figcaption>
                    )}
                </figure>
            ))}
        </div>
    );
}

function StatGridElement({ el }: { el: Extract<ProjectElement, { type: "stat-grid" }> }) {
    const colClass =
        el.stats.length <= 2 ? "grid-cols-2" :
            el.stats.length === 3 ? "grid-cols-2 sm:grid-cols-3" :
                "grid-cols-2 sm:grid-cols-4";

    return (
        <div className={`grid ${colClass} gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5`}>
            {el.stats.map((s, i) => (
                <div key={i} className="bg-background-primary px-6 py-5">
                    <p className="font-heading text-3xl font-bold text-text-primary leading-none mb-1">{s.value}</p>
                    <p className="text-xs font-mono uppercase tracking-widest text-text-muted mb-0.5">{s.label}</p>
                    {s.note && <p className="text-xs text-text-secondary">{s.note}</p>}
                </div>
            ))}
        </div>
    );
}

function ListElement({ el }: { el: Extract<ProjectElement, { type: "list" }> }) {
    const icons = {
        bullet: "•",
        numbered: null,
        check: "✓",
    };
    const icon = icons[el.variant ?? "bullet"];

    if (el.variant === "numbered") {
        return (
            <ol className="space-y-3 list-none">
                {el.items.map((item, i) => (
                    <li key={i} className="flex gap-4">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-background-secondary text-text-muted text-xs flex items-center justify-center font-mono mt-0.5">
                            {i + 1}
                        </span>
                        <span className="text-text-secondary leading-relaxed"><InlineText text={item} /></span>
                    </li>
                ))}
            </ol>
        );
    }

    return (
        <ul className="space-y-2">
            {el.items.map((item, i) => (
                <li key={i} className="flex gap-3">
                    <span className={`flex-shrink-0 mt-1.5 text-xs ${el.variant === "check" ? "text-emerald-400" : "text-text-muted"}`}>
                        {icon}
                    </span>
                    <span className="text-text-secondary leading-relaxed"><InlineText text={item} /></span>
                </li>
            ))}
        </ul>
    );
}

function LinkListElement({ el }: { el: Extract<ProjectElement, { type: "link-list" }> }) {
    return (
        <ul className="space-y-2">
            {el.links.map((link, i) => (
                <li key={i}>
                    <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-background-secondary hover:border-white/20 transition-all"
                    >
                        <span className="text-text-primary font-medium group-hover:underline">{link.label} ↗</span>
                        {link.description && (
                            <span className="text-text-muted text-sm">{link.description}</span>
                        )}
                    </a>
                </li>
            ))}
        </ul>
    );
}

function CodeElement({ el }: { el: Extract<ProjectElement, { type: "code" }> }) {
    return (
        <div className="rounded-xl overflow-hidden border border-white/10">
            {el.language && (
                <div className="bg-background-secondary px-4 py-2 text-xs font-mono text-text-muted border-b border-white/5">
                    {el.language}
                </div>
            )}
            <pre className="bg-background-primary p-4 overflow-x-auto text-sm text-text-secondary font-mono leading-relaxed">
                <code>{el.content}</code>
            </pre>
        </div>
    );
}

function CalloutElement({ el }: { el: Extract<ProjectElement, { type: "callout" }> }) {
    const styles = {
        info: { bar: "bg-blue-500", bg: "bg-blue-500/5", text: "text-blue-400" },
        warning: { bar: "bg-amber-400", bg: "bg-amber-400/5", text: "text-amber-400" },
        success: { bar: "bg-emerald-500", bg: "bg-emerald-500/5", text: "text-emerald-400" },
        tip: { bar: "bg-purple-500", bg: "bg-purple-500/5", text: "text-purple-400" },
    }[el.variant ?? "info"];

    return (
        <div className={`flex gap-4 rounded-xl ${styles.bg} border border-white/5 p-5`}>
            <div className={`w-1 flex-shrink-0 rounded-full ${styles.bar}`} />
            <div>
                {el.title && <p className={`font-semibold text-sm mb-1 ${styles.text}`}>{el.title}</p>}
                <p className="text-text-secondary text-sm leading-relaxed"><InlineText text={el.content} /></p>
            </div>
        </div>
    );
}

function DividerElement() {
    return <hr className="border-white/10" />;
}

// ─── Dispatch element type ────────────────────────────────────────────────────

function Element({ el, isFullwidthSection }: { el: ProjectElement; isFullwidthSection?: boolean }) {
    switch (el.type) {
        case "text": return <TextElement el={el} />;
        case "image": return <ImageElement el={el} />;
        case "image-fullwidth": return <ImageFullwidthElement el={el} />;
        case "image-grid": return <ImageGridElement el={el} />;
        case "stat-grid": return <StatGridElement el={el} />;
        case "list": return <ListElement el={el} />;
        case "link-list": return <LinkListElement el={el} />;
        case "code": return <CodeElement el={el} />;
        case "callout": return <CalloutElement el={el} />;
        case "divider": return <DividerElement />;
        default: return null;
    }
}

// ─── Section renderer ─────────────────────────────────────────────────────────

function Section({ section }: { section: ProjectSection }) {
    // Fullwidth sections: no padding/max-width wrapper, elements span the screen
    if (section.fullwidth) {
        return (
            <Reveal>
                <div className="space-y-0">
                    {section.elements.map((el, i) => (
                        <Element key={i} el={el} isFullwidthSection />
                    ))}
                </div>
            </Reveal>
        );
    }

    return (
        <Reveal>
            <div className={`${CONTENT_WIDTH} py-12 lg:py-16`}>
                {/* Section label + heading */}
                {(section.label || section.heading) && (
                    <div className="mb-8">
                        {section.label && (
                            <p className="text-xs font-mono uppercase tracking-[0.25em] text-text-muted mb-2">
                                {section.label}
                            </p>
                        )}
                        {section.heading && (
                            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary">
                                {section.heading}
                            </h2>
                        )}
                    </div>
                )}

                {/* Elements */}
                <div className="space-y-8">
                    {section.elements.map((el, i) => (
                        <Element key={i} el={el} />
                    ))}
                </div>
            </div>
        </Reveal>
    );
}

// ─── Cover theme detection ────────────────────────────────────────────────────

function useCoverTheme(imageSrc?: string): "light" | "dark" {
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
        if (!imageSrc || typeof window === "undefined") return;
        const img = document.createElement("img");
        img.crossOrigin = "anonymous";
        img.src = imageSrc;
        img.onload = () => {
            try {
                const canvas = document.createElement("canvas");
                const SIZE = 50;
                canvas.width = SIZE;
                canvas.height = SIZE;
                const ctx = canvas.getContext("2d");
                if (!ctx) return;
                ctx.drawImage(img, 0, img.height * 0.6, img.width, img.height * 0.4, 0, 0, SIZE, SIZE);
                const data = ctx.getImageData(0, 0, SIZE, SIZE).data;
                let lum = 0;
                for (let j = 0; j < data.length; j += 4) {
                    lum += 0.299 * data[j] + 0.587 * data[j + 1] + 0.114 * data[j + 2];
                }
                setTheme(lum / (data.length / 4) > 128 ? "light" : "dark");
            } catch { setTheme("dark"); }
        };
    }, [imageSrc]);

    return theme;
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ProjectDetail({
    title,
    description,
    sections = [],
    image,
    technologies,
    categories,
    status,
    featured,
    startDate,
    endDate,
    liveUrl,
    githubUrl,
    relatedProjects,
}: ProjectDetailProps) {
    const coverTheme = useCoverTheme(image);
    const isDark = coverTheme === "dark";
    const textCls = isDark ? "text-white" : "text-gray-900";
    const mutedCls = isDark ? "text-white/70" : "text-gray-600";

    const t = useTranslations();
    return (
        <div className="w-full">

            {/* ── Hero ──────────────────────────────────────────────────────────── */}
            <div className="relative w-full min-h-screen flex flex-col">
                {image && (
                    <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
                )}
                {/* Bottom fade — must be strong enough to always read text */}
                <div className="absolute inset-0 bg-gradient-to-t from-background-primary from-10% via-background-primary/60 to-transparent" />
                {/* Top fade for nav */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

                <div className="relative z-10 mt-auto pb-12">
                    <div className={CONTENT_WIDTH}>
                        {/* Breadcrumb */}
                        <nav className={`flex items-center gap-2 text-sm mb-8 ${mutedCls}`}>
                            <Link href="/" className="opacity-70 hover:opacity-100 transition-opacity">{t("common.home")}</Link>
                            <span className="opacity-40">/</span>
                            <Link href="/projects" className="opacity-70 hover:opacity-100 transition-opacity">{t("common.projects")}</Link>
                            <span className="opacity-40">/</span>
                            <span>{title}</span>
                        </nav>

                        <div className="grid lg:grid-cols-3 gap-10 items-end">
                            {/* Left */}
                            <div className="lg:col-span-2 ">
                                {/* Badges */}
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {categories.map((cat) => (
                                        <span key={cat} className={`text-xs font-mono uppercase tracking-[0.15em] px-3 py-1 rounded-full border backdrop-blur ${isDark ? "border-white/30 text-white bg-white/10" : "border-black/20 text-gray-800 bg-black/10"}`}>
                                            {cat}
                                        </span>
                                    ))}
                                    {status === "in-progress" && (
                                        <span className="text-xs font-mono uppercase tracking-[0.15em] px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300">In Progress</span>
                                    )}
                                    {featured && (
                                        <span className="text-xs font-mono uppercase tracking-[0.15em] px-3 py-1 rounded-full bg-pink-400/20 border border-pink-400/50 text-pink-300">Featured</span>
                                    )}
                                </div>

                                <h1 className={`font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-5 ${textCls}`}>
                                    {title}
                                </h1>
                                <p className={`text-lg max-w-xl leading-relaxed mb-8 ${mutedCls}`}>{description}</p>

                                <div className="flex flex-wrap gap-3">
                                    {liveUrl && (
                                        <a href={liveUrl} target="_blank" rel="noopener noreferrer"
                                            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all ${isDark ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-black/90"}`}>
                                            View Live Demo ↗
                                        </a>
                                    )}
                                    {githubUrl && (
                                        <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                                            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm border transition-all ${isDark ? "border-white/40 text-white hover:bg-white/10" : "border-black/30 text-black hover:bg-black/5"}`}>
                                            GitHub ↗
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Right: sidebar card */}
                            <div className="lg:col-span-1">
                                <div className="bg-background-primary/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-5">
                                    <div>
                                        <p className="text-xs font-mono uppercase tracking-widest text-text-muted mb-1.5">Timeline</p>
                                        <p className="text-text-primary font-medium">{startDate} — {endDate ?? "Present"}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-mono uppercase tracking-widest text-text-muted mb-2.5">Technologies</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {technologies.map((tech) => (
                                                <span key={tech} className="text-xs px-2.5 py-1 rounded-md bg-background-secondary text-text-secondary border border-white/5">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Sections ──────────────────────────────────────────────────────── */}
            {sections.map((section, i) => (
                <Section key={i} section={section} />
            ))}

            {/* ── Divider ───────────────────────────────────────────────────────── */}
            <div className={`${CONTENT_WIDTH} py-4`}>
                <hr className="border-white/10" />
            </div>

            {/* ── Related projects ──────────────────────────────────────────────── */}
            {relatedProjects.length > 0 && (
                <Reveal>
                    <div className={`${CONTENT_WIDTH} py-16`}>
                        <p className="text-xs font-mono uppercase tracking-[0.25em] text-text-muted mb-2">{t("projects.moreProjects")}</p>
                        <h2 className="font-heading text-3xl font-bold text-text-primary mb-10">{t("projects.relatedWork")}</h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {relatedProjects.map((rel) => (
                                <Link key={rel.id} href={`/projects/${rel.slug}`} className="group block">
                                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-background-secondary">
                                        {rel.image && (
                                            <img src={rel.image} alt={rel.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        )}
                                    </div>
                                    <p className="text-xs font-mono uppercase tracking-widest text-text-muted mb-1">{rel.categories[0]}</p>
                                    <h3 className="font-heading font-semibold text-lg text-text-primary group-hover:opacity-70 transition-opacity">{rel.title}</h3>
                                    <p className="text-text-secondary text-sm mt-1 line-clamp-2">{rel.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Reveal>
            )}

            {/* ── Back button ───────────────────────────────────────────────────── */}
            <div className={`${CONTENT_WIDTH} pb-24 text-left`}>
                <Link href="/projects"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-text-secondary hover:text-text-primary hover:border-white/40 transition-all text-sm font-medium">
                    ← {t("projects.viewAllProjects")}
                </Link>
            </div>

        </div>
    );
}