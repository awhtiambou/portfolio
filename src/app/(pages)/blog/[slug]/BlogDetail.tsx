"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Blog, BlogElement, BlogSection } from "@/types/blog";
import { cn } from "@/lib/utils";
import { FiClock, FiCalendar, FiArrowUpRight, FiChevronRight } from "react-icons/fi";
import { useTranslations, useLocale } from "next-intl";

const CONTENT_WIDTH = "app-container";

// ─── Inline markdown ──────────────────────────────────────────────────────────
// Bold before italic so ** is never consumed as two separate * tokens.
function InlineText({ text }: { text: string }) {
    // Tokenise with a single pass: bold → italic → backtick-code → plain
    const TOKEN_RE = /(\*\*(?:[^*]|\*(?!\*))+\*\*|(?<!\*)\*(?!\*)[^*]+(?<!\*)\*(?!\*)|`[^`]+`)/g;
    const parts: string[] = [];
    let last = 0;
    let m: RegExpExecArray | null;
    // eslint-disable-next-line no-cond-assign
    while ((m = TOKEN_RE.exec(text)) !== null) {
        if (m.index > last) parts.push(text.slice(last, m.index));
        parts.push(m[0]);
        last = m.index + m[0].length;
    }
    if (last < text.length) parts.push(text.slice(last));

    return (
        <>
            {parts.map((part, i) => {
                if (part.startsWith("**") && part.endsWith("**") && part.length > 4)
                    return <strong key={i} className="font-semibold text-text-primary">{part.slice(2, -2)}</strong>;
                if (part.startsWith("`") && part.endsWith("`") && part.length > 2)
                    return <code key={i} className="bg-background-secondary px-1.5 py-0.5 rounded text-[0.85em] font-mono text-accent-blue border border-white/10">{part.slice(1, -1)}</code>;
                if (part.startsWith("*") && part.endsWith("*") && part.length > 2)
                    return <em key={i} className="italic">{part.slice(1, -1)}</em>;
                return <span key={i}>{part}</span>;
            })}
        </>
    );
}

// ─── Scroll-reveal ────────────────────────────────────────────────────────────
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

// ─── Date formatter ───────────────────────────────────────────────────────────
function formatDate(iso: string, locale: string) {
    return new Date(iso).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", { month: "long", day: "numeric", year: "numeric" });
}

// ═══════════════════════════════════════════════════════════════════════════════
// ELEMENT RENDERERS
// ═══════════════════════════════════════════════════════════════════════════════

function TextElement({ el }: { el: Extract<BlogElement, { type: "text" }> }) {
    // font-body explicitly prevents the global h1-h6 Besley rule from bleeding in.
    const variantCls = {
        body: "font-body text-text-secondary leading-relaxed text-base lg:text-lg",
        lead: "font-body text-text-primary text-lg lg:text-xl leading-relaxed font-medium",
        caption: "font-body text-text-muted text-sm italic",
        quote: "font-body text-text-secondary text-base italic border-l-4 border-accent-blue pl-6",
        footnote: "font-body text-text-muted text-xs leading-relaxed",
    }[el.variant ?? "body"];

    return <p className={variantCls}><InlineText text={el.content} /></p>;
}

function HeadingElement({ el }: { el: Extract<BlogElement, { type: "heading" }> }) {
    const cls = {
        2: "font-heading text-xl md:text-2xl lg:text-3xl font-bold text-text-primary mt-6 mb-2",
        3: "font-heading text-lg md:text-xl font-bold text-text-primary mt-4 mb-1",
        4: "font-heading text-base md:text-lg font-semibold text-text-primary mt-3 mb-1",
    }[el.level];
    if (el.level === 2) return <h2 className={cls}><InlineText text={el.content} /></h2>;
    if (el.level === 3) return <h3 className={cls}><InlineText text={el.content} /></h3>;
    return <h4 className={cls}><InlineText text={el.content} /></h4>;
}

function ImageElement({ el }: { el: Extract<BlogElement, { type: "image" }> }) {
    const sizeClass = { small: "max-w-sm mx-auto", normal: "max-w-2xl mx-auto", large: "w-full" }[el.size ?? "normal"];
    return (
        <figure className={sizeClass}>
            <div className="rounded-2xl overflow-hidden bg-background-secondary">
                <Image src={el.src} alt={el.alt ?? ""} width={1600} height={900} className="w-full h-auto object-cover" />
            </div>
            {el.caption && <figcaption className="text-center text-xs text-text-muted mt-2 font-mono uppercase tracking-widest">{el.caption}</figcaption>}
        </figure>
    );
}

function ImageFullwidthElement({ el }: { el: Extract<BlogElement, { type: "image-fullwidth" }> }) {
    const h = el.height ?? "h-[70vh]";
    return (
        <figure className="w-full">
            <div className={`${h} w-full overflow-hidden bg-background-secondary relative`}>
                <Image src={el.src} alt={el.alt ?? ""} fill className="object-cover" sizes="100vw" />
            </div>
            {el.caption && <figcaption className={`${CONTENT_WIDTH} text-xs text-text-muted mt-3 font-mono uppercase tracking-widest`}>{el.caption}</figcaption>}
        </figure>
    );
}

function ImageGridElement({ el }: { el: Extract<BlogElement, { type: "image-grid" }> }) {
    const colClass = { 2: "grid-cols-1 sm:grid-cols-2", 3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", 4: "grid-cols-2 lg:grid-cols-4" }[el.cols ?? 2];
    const aspect = el.aspect ?? "4/3";
    return (
        <div className={`grid ${colClass} gap-4`}>
            {el.images.map((img, i) => (
                <figure key={i}>
                    <div className="relative rounded-2xl overflow-hidden bg-background-secondary" style={{ aspectRatio: aspect }}>
                        <Image src={img.src} alt={img.alt ?? ""} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                    {img.caption && <figcaption className="text-xs text-text-muted mt-2 font-mono uppercase tracking-widest">{img.caption}</figcaption>}
                </figure>
            ))}
        </div>
    );
}

function StatGridElement({ el }: { el: Extract<BlogElement, { type: "stat-grid" }> }) {
    const colClass = el.stats.length <= 2 ? "grid-cols-2" : el.stats.length === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-4";
    const trendIcon = { up: "↑", down: "↓", neutral: "—" };
    return (
        <div className={`grid ${colClass} gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5`}>
            {el.stats.map((s, i) => (
                <div key={i} className="bg-background-primary px-6 py-5">
                    <div className="flex items-baseline gap-2">
                        <p className="font-heading text-3xl font-bold text-text-primary leading-none mb-1">{s.value}</p>
                        {s.trend && <span className={cn("text-xs", s.trend === "up" ? "text-emerald-400" : s.trend === "down" ? "text-red-400" : "text-text-muted")}>{trendIcon[s.trend]}</span>}
                    </div>
                    <p className="text-xs font-mono uppercase tracking-widest text-text-muted mb-0.5">{s.label}</p>
                    {s.note && <p className="text-xs text-text-secondary">{s.note}</p>}
                </div>
            ))}
        </div>
    );
}

function ListElement({ el }: { el: Extract<BlogElement, { type: "list" }> }) {
    const icons: Record<string, string | null> = { bullet: "•", numbered: null, check: "✓", arrow: "→" };
    const icon = icons[el.variant ?? "bullet"];
    if (el.variant === "numbered") {
        return (
            <ol className="space-y-3 list-none">
                {el.items.map((item, i) => (
                    <li key={i} className="flex gap-4">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-background-secondary text-text-muted text-xs flex items-center justify-center font-mono mt-0.5">{i + 1}</span>
                        <span className="font-body text-text-secondary leading-relaxed text-base"><InlineText text={item} /></span>
                    </li>
                ))}
            </ol>
        );
    }
    const iconCls = el.variant === "check" ? "text-emerald-400" : el.variant === "arrow" ? "text-accent-blue" : "text-text-muted";
    return (
        <ul className="space-y-2.5">
            {el.items.map((item, i) => (
                <li key={i} className="flex gap-3">
                    <span className={`flex-shrink-0 mt-1.5 text-xs leading-none ${iconCls}`}>{icon}</span>
                    <span className="font-body text-text-secondary leading-relaxed text-base"><InlineText text={item} /></span>
                </li>
            ))}
        </ul>
    );
}

function CodeElement({ el }: { el: Extract<BlogElement, { type: "code" }> }) {
    const lines = el.content.split("\n");
    // Lightweight token colourer for common patterns
    function colourLine(line: string) {
        // Apply in sequence: strings → keywords → comments → numbers → operators
        const segments: { text: string; cls: string }[] = [];
        const COMMENT = /^(\s*)(#.*)$/;
        const cm = COMMENT.exec(line);
        if (cm) {
            if (cm[1]) segments.push({ text: cm[1], cls: "" });
            segments.push({ text: cm[2], cls: "text-white/40 italic" });
            return segments;
        }
        // Tokenise the line simply — colour strings, keywords, numbers
        const TOKEN = /("""[\s\S]*?"""|"[^"]*"|'[^']*'|#[^\n]*|\b(?:import|from|def|class|return|for|in|if|else|elif|with|as|async|await|yield|pass|raise|True|False|None|self|super|lambda|and|or|not|is|try|except|finally|async def|const|let|var|function|export|default|interface|type|extends|implements|new|await|async)\b|\b\d+\.?\d*\b)/g;
        let last = 0;
        let m: RegExpExecArray | null;
        // eslint-disable-next-line no-cond-assign
        while ((m = TOKEN.exec(line)) !== null) {
            if (m.index > last) segments.push({ text: line.slice(last, m.index), cls: "text-white/80" });
            const tok = m[0];
            let cls = "text-white/80";
            if (tok.startsWith('"') || tok.startsWith("'") || tok.startsWith('"""')) cls = "text-emerald-400";
            else if (tok.startsWith('#')) cls = "text-white/40 italic";
            else if (/^\d/.test(tok)) cls = "text-amber-300";
            else cls = "text-purple-300 font-semibold";
            segments.push({ text: tok, cls });
            last = m.index + tok.length;
        }
        if (last < line.length) segments.push({ text: line.slice(last), cls: "text-white/80" });
        return segments;
    }

    return (
        <div className="rounded-xl overflow-hidden border border-white/10 my-2">
            {/* Header */}
            {(el.filename || el.language) && (
                <div className="bg-[#1e1e2e] px-4 py-2.5 text-xs font-mono border-b border-white/10 flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-400/70" />
                        <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                        <span className="w-3 h-3 rounded-full bg-green-400/70" />
                    </div>
                    {el.filename && <span className="text-white/80 ml-1">{el.filename}</span>}
                    {el.filename && el.language && <span className="text-white/20">·</span>}
                    {el.language && <span className="text-white/40">{el.language}</span>}
                </div>
            )}
            {/* Code body */}
            <pre className="bg-[#13131a] overflow-x-auto text-sm font-mono leading-relaxed p-0">
                <code className="block p-4">
                    {lines.map((line, i) => (
                        <div key={i} className="flex min-h-[1.5em]">
                            {el.lineNumbers !== false && (
                                <span className="inline-block w-8 text-right mr-5 text-white/20 select-none flex-shrink-0 text-xs leading-relaxed">
                                    {i + 1}
                                </span>
                            )}
                            <span className="flex-1">
                                {colourLine(line).map((seg, j) => (
                                    <span key={j} className={seg.cls}>{seg.text}</span>
                                ))}
                            </span>
                        </div>
                    ))}
                </code>
            </pre>
        </div>
    );
}

function CalloutElement({ el }: { el: Extract<BlogElement, { type: "callout" }> }) {
    const styles = {
        info: { bar: "bg-blue-500", bg: "bg-blue-500/8", text: "text-blue-400", icon: "ℹ️" },
        warning: { bar: "bg-amber-400", bg: "bg-amber-400/8", text: "text-amber-400", icon: "⚠️" },
        success: { bar: "bg-emerald-500", bg: "bg-emerald-500/8", text: "text-emerald-400", icon: "✅" },
        tip: { bar: "bg-purple-500", bg: "bg-purple-500/8", text: "text-purple-400", icon: "💡" },
        danger: { bar: "bg-red-500", bg: "bg-red-500/8", text: "text-red-400", icon: "🚨" },
        insight: { bar: "bg-cyan-500", bg: "bg-cyan-500/8", text: "text-cyan-400", icon: "🔬" },
    }[el.variant ?? "info"];

    return (
        <div className={`flex gap-4 rounded-xl ${styles.bg} border border-white/5 p-5`}>
            <div className={`w-1 flex-shrink-0 rounded-full ${styles.bar}`} />
            <div className="min-w-0">
                {el.title && (
                    <p className={`font-body font-semibold text-sm mb-1.5 ${styles.text}`}>
                        {styles.icon} {el.title}
                    </p>
                )}
                <p className="font-body text-text-secondary text-sm leading-relaxed">
                    <InlineText text={el.content} />
                </p>
            </div>
        </div>
    );
}

function TableElement({ el }: { el: Extract<BlogElement, { type: "table" }> }) {
    return (
        <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-background-secondary text-text-muted">
                        {el.headers.map((h, i) => (
                            <th key={i} className="px-4 py-3 text-left font-mono text-xs uppercase tracking-widest whitespace-nowrap">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {el.rows.map((row, ri) => (
                        <tr key={ri} className={cn("border-t border-white/5", el.striped && ri % 2 === 1 && "bg-white/[0.02]")}>
                            {row.map((cell, ci) => (
                                <td key={ci} className="px-4 py-3 text-text-secondary whitespace-nowrap">{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {el.caption && <p className="text-xs text-text-muted px-4 py-3 border-t border-white/5 font-mono">{el.caption}</p>}
        </div>
    );
}

function BlockquoteElement({ el }: { el: Extract<BlogElement, { type: "blockquote" }> }) {
    return (
        <blockquote className="relative border-l-4 border-accent-blue/60 pl-6 py-2 my-2">
            <p className="font-body text-text-primary text-lg lg:text-xl italic leading-relaxed mb-3">
                &ldquo;<InlineText text={el.content} />&rdquo;
            </p>
            {(el.author || el.source) && (
                <footer className="font-body text-sm text-text-muted">
                    {el.author && <span className="font-medium text-text-secondary">{el.author}</span>}
                    {el.author && el.source && <span className="mx-2">·</span>}
                    {el.source && <span className="italic">{el.source}</span>}
                </footer>
            )}
        </blockquote>
    );
}

function StepsElement({ el }: { el: Extract<BlogElement, { type: "steps" }> }) {
    return (
        <div className="space-y-0">
            {el.steps.map((step, i) => (
                <div key={i} className="flex gap-5 relative">
                    {i < el.steps.length - 1 && (
                        <div className="absolute left-5 top-12 bottom-0 w-px bg-white/10" />
                    )}
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-background-secondary border border-white/10 flex items-center justify-center text-lg z-10">
                        {step.icon ?? (i + 1)}
                    </div>
                    <div className="pb-8">
                        <p className="font-heading font-bold text-text-primary mb-1 text-base">{step.title}</p>
                        <p className="font-body text-text-secondary text-sm leading-relaxed">
                            <InlineText text={step.description} />
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

function LinkListElement({ el }: { el: Extract<BlogElement, { type: "link-list" }> }) {
    if (el.variant === "cards") {
        return (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {el.links.map((link, i) => (
                    <a key={i} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined}
                        className="group flex flex-col p-5 rounded-xl border border-white/5 bg-background-secondary hover:border-white/20 transition-all">
                        <span className="font-medium text-text-primary group-hover:text-accent-blue transition-colors flex items-center gap-1 mb-2">
                            {link.label} {link.external && <FiArrowUpRight className="w-3.5 h-3.5" />}
                        </span>
                        {link.description && <span className="text-text-muted text-sm leading-relaxed">{link.description}</span>}
                    </a>
                ))}
            </div>
        );
    }
    return (
        <ul className="space-y-2">
            {el.links.map((link, i) => (
                <li key={i}>
                    <a href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined}
                        className="group flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-background-secondary hover:border-white/20 transition-all">
                        <span className="text-text-primary font-medium group-hover:underline">{link.label} ↗</span>
                        {link.description && <span className="text-text-muted text-sm">{link.description}</span>}
                    </a>
                </li>
            ))}
        </ul>
    );
}

function FormulaElement({ el }: { el: Extract<BlogElement, { type: "formula" }> }) {
    return (
        <div className={cn("overflow-x-auto", el.display === "inline" ? "inline" : "py-4 text-center")}>
            <code className="font-mono text-text-primary text-lg">{el.content}</code>
            {el.caption && <p className="text-xs text-text-muted mt-2">{el.caption}</p>}
        </div>
    );
}

function DividerElement({ el }: { el: Extract<BlogElement, { type: "divider" }> }) {
    if (el.style === "dots") return <div className="text-center text-text-muted tracking-[1em] py-4">···</div>;
    if (el.style === "gradient") return <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4" />;
    return <hr className="border-white/10" />;
}

// ─── Dispatch ─────────────────────────────────────────────────────────────────

function Element({ el }: { el: BlogElement }) {
    switch (el.type) {
        case "text": return <TextElement el={el} />;
        case "heading": return <HeadingElement el={el} />;
        case "image": return <ImageElement el={el} />;
        case "image-fullwidth": return <ImageFullwidthElement el={el} />;
        case "image-grid": return <ImageGridElement el={el} />;
        case "stat-grid": return <StatGridElement el={el} />;
        case "list": return <ListElement el={el} />;
        case "code": return <CodeElement el={el} />;
        case "callout": return <CalloutElement el={el} />;
        case "table": return <TableElement el={el} />;
        case "blockquote": return <BlockquoteElement el={el} />;
        case "steps": return <StepsElement el={el} />;
        case "link-list": return <LinkListElement el={el} />;
        case "formula": return <FormulaElement el={el} />;
        case "divider": return <DividerElement el={el} />;
        default: return null;
    }
}

// ─── Section ──────────────────────────────────────────────────────────────────

function Section({ section }: { section: BlogSection }) {
    const bgCls = {
        none: "",
        subtle: "bg-white/[0.02]",
        accent: "bg-accent-blue/5",
    }[section.background ?? "none"];

    if (section.fullwidth) {
        return (
            <Reveal>
                <div className={cn("space-y-0", bgCls)}>
                    {section.elements.map((el, i) => <Element key={i} el={el} />)}
                </div>
            </Reveal>
        );
    }

    return (
        <Reveal>
            <div className={cn(bgCls)} id={section.id}>
                <div className={`${CONTENT_WIDTH} py-12 lg:py-16`}>
                    {/* Section label + heading */}
                    {(section.label || section.heading) && (
                        <div className="mb-8">
                            {section.label && <p className="text-xs font-mono uppercase tracking-[0.25em] text-text-muted mb-2">{section.label}</p>}
                            {section.heading && <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary">{section.heading}</h2>}
                        </div>
                    )}
                    {section.intro && <p className="text-text-secondary leading-relaxed text-lg mb-8"><InlineText text={section.intro} /></p>}

                    {/* Elements */}
                    <div className="space-y-8">
                        {section.elements.map((el, i) => <Element key={i} el={el} />)}
                    </div>
                </div>
            </div>
        </Reveal>
    );
}

// ─── Cover luminance detection ────────────────────────────────────────────────
// Samples the bottom 40% of the image (where hero text lives).
// Returns 0–255. Starts at 0 so the default state is safe (white text on dark scrim).

function useCoverLuminance(imageSrc?: string): number {
    const [luminance, setLuminance] = useState(0);

    useEffect(() => {
        if (!imageSrc || typeof window === "undefined") return;
        const img = document.createElement("img");
        img.crossOrigin = "anonymous";
        img.src = imageSrc;
        img.onload = () => {
            try {
                const canvas = document.createElement("canvas");
                canvas.width = 80; canvas.height = 50;
                const ctx = canvas.getContext("2d");
                if (!ctx) return;
                ctx.drawImage(img, 0, img.height * 0.6, img.width, img.height * 0.4, 0, 0, 80, 50);
                const data = ctx.getImageData(0, 0, 80, 50).data;
                let total = 0;
                const pixels = data.length / 4;
                for (let j = 0; j < data.length; j += 4) {
                    total += 0.2126 * data[j] + 0.7152 * data[j + 1] + 0.0722 * data[j + 2];
                }
                setLuminance(total / pixels);
            } catch { setLuminance(0); }
        };
        img.onerror = () => setLuminance(0);
    }, [imageSrc]);

    return luminance;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

interface BlogDetailProps {
    blog: Blog;
    relatedBlogs: Blog[];
}

export function BlogDetail({ blog, relatedBlogs }: BlogDetailProps) {
    const t = useTranslations("blog");
    const tCommon = useTranslations("common");
    const locale = useLocale();

    const luminance = useCoverLuminance(blog.coverImage);
    // Scrim scales with image brightness — theme-agnostic, always dark.
    const scrimStrength = (0.55 + (luminance / 255) * 0.33).toFixed(2);

    // Track active section for TOC
    const [activeSection, setActiveSection] = useState(blog.sections[0]?.id ?? "");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.find((e) => e.isIntersecting);
                if (visible?.target.id) setActiveSection(visible.target.id);
            },
            { rootMargin: "-20% 0px -60% 0px" }
        );
        blog.sections.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [blog.sections]);

    return (
        <div className="w-full">
            {/* ── Hero ──────────────────────────────────────────────────────────── */}
            <div className="relative w-full min-h-[60vh] md:min-h-[100vh] flex flex-col pt-28">
                <Image src={blog.coverImage} alt={blog.title} fill priority className="absolute inset-0 object-cover" sizes="100vw" />

                {/*
                 * THREE-LAYER SCRIM — theme-agnostic, uses only fixed black values.
                 * Never references background-primary (which flips to white in light mode).
                 *
                 * Layer 1 — adaptive: opacity scales with measured image luminance.
                 * Layer 2 — hard bottom anchor: ~30% of height always near-black.
                 * Layer 3 — soft top vignette: nav links stay readable against any sky.
                 */}
                <div
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-700"
                    style={{ opacity: scrimStrength }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

                <div className="relative z-10 mt-auto pb-12">
                    <div className={CONTENT_WIDTH}>
                        {/* Breadcrumb — always white on dark scrim */}
                        <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
                            <Link href="/" className="hover:text-white transition-colors">{tCommon("home")}</Link>
                            <FiChevronRight className="w-3 h-3 opacity-40" />
                            <Link href="/blog" className="hover:text-white transition-colors">{tCommon("blog")}</Link>
                            <FiChevronRight className="w-3 h-3 opacity-40" />
                            <span className="text-white/80 truncate max-w-[200px]">{blog.title}</span>
                        </nav>

                        <div className="grid lg:grid-cols-3 gap-10 items-end">
                            {/* Left */}
                            <div className="lg:col-span-2">
                                {/* Categories */}
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {blog.categories.map((cat) => (
                                        <span key={cat} className="text-xs font-mono uppercase tracking-[0.15em] px-3 py-1 rounded-full border border-white/30 text-white bg-white/10 backdrop-blur-sm">
                                            {t(`categories.${cat}`)}
                                        </span>
                                    ))}
                                </div>

                                {/* Always white — three-layer scrim below guarantees WCAG AA contrast */}
                                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-white mb-5 [text-shadow:0_2px_20px_rgba(0,0,0,0.4)]">
                                    {blog.title}
                                </h1>
                                <p className="text-white/80 text-lg max-w-xl leading-relaxed mb-8 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
                                    {blog.subtitle}
                                </p>

                                {/* Author & meta */}
                                <div className="flex flex-wrap items-center gap-6">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white/30">
                                            <Image src={blog.author.avatar} alt={blog.author.name} fill className="object-cover" sizes="44px" />
                                        </div>
                                        <div className="">
                                            <p className="text-sm font-medium text-white">{blog.author.name} <br /><span className="text-xs text-white/60">{blog.author.role}</span></p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-white/60">
                                        <span className="flex items-center gap-1.5"><FiCalendar className="w-3.5 h-3.5" /> {formatDate(blog.publishedAt, locale)}</span>
                                        {blog.updatedAt && <span className="flex items-center gap-1.5">{t("updatedOn")} {formatDate(blog.updatedAt, locale)}</span>}
                                        <span className="flex items-center gap-1.5"><FiClock className="w-3.5 h-3.5" /> {blog.readingTime} {t("minRead")}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: sidebar card
                             * Always black-based — not background-primary — so it renders
                             * correctly regardless of site theme (dark or light).
                             */}
                            <div className="lg:col-span-1">
                                <div className="bg-black/60 backdrop-blur-xl border border-white/15 rounded-2xl p-6 space-y-5">
                                    <div>
                                        <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">{t("contents")}</p>
                                        <nav className="space-y-1.5">
                                            {blog.sections.map((s) => (
                                                <a
                                                    key={s.id}
                                                    href={`#${s.id}`}
                                                    className={cn(
                                                        "block text-sm py-0.5 transition-colors",
                                                        activeSection === s.id
                                                            ? "text-white font-medium"
                                                            : "text-white/50 hover:text-white/90"
                                                    )}
                                                >
                                                    {s.label ?? s.heading}
                                                </a>
                                            ))}
                                        </nav>
                                    </div>
                                    <div>
                                        <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2.5">{t("tags")}</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {blog.tags.slice(0, 6).map((tag) => (
                                                <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-white/10 text-white/80 border border-white/10">
                                                    {tag}
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

            {/* ── Content Sections ─────────────────────────────────────────────── */}
            {blog.sections.map((section, i) => (
                <Section key={i} section={section} />
            ))}

            {/* ── Divider ─────────────────────────────────────────────────────── */}
            <div className={`${CONTENT_WIDTH} py-4`}>
                <hr className="border-white/10" />
            </div>

            {/* ── Tags ─────────────────────────────────────────────────────────── */}
            <div className={`${CONTENT_WIDTH} py-10`}>
                <p className="text-xs font-mono uppercase tracking-widest text-text-muted mb-3">{t("tags")}</p>
                <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-background-secondary text-text-secondary border border-white/5">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* ── Related ──────────────────────────────────────────────────────── */}
            {relatedBlogs.length > 0 && (
                <Reveal>
                    <div className={`${CONTENT_WIDTH} py-16`}>
                        <p className="text-xs font-mono uppercase tracking-[0.25em] text-text-muted mb-2">{t("continueReading")}</p>
                        <h2 className="font-heading text-3xl font-bold text-text-primary mb-10">{t("relatedArticles")}</h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {relatedBlogs.map((rel) => (
                                <Link key={rel.id} href={`/blog/${rel.slug}`} className="group block">
                                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-background-secondary">
                                        <Image src={rel.coverImage} alt={rel.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                    </div>
                                    <p className="text-xs font-mono uppercase tracking-widest text-text-muted mb-1">{t(`categories.${rel.categories[0]}`)}</p>
                                    <h3 className="font-heading font-semibold text-lg text-text-primary group-hover:opacity-70 transition-opacity line-clamp-2">{rel.title}</h3>
                                    <p className="text-text-secondary text-sm mt-1 line-clamp-2">{rel.excerpt}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Reveal>
            )}

            {/* ── Back button ──────────────────────────────────────────────────── */}
            <div className={`${CONTENT_WIDTH} pb-24 text-left`}>
                <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-text-secondary hover:text-text-primary hover:border-white/40 transition-all text-sm font-medium">
                    ← {t("allArticles")}
                </Link>
            </div>
        </div>
    );
}