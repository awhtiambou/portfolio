"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { blogs, getAllBlogCategories } from "@/data/blogs";
import type { Blog, BlogCategory } from "@/types/blog";
import { cn } from "@/lib/utils";
import { FiClock, FiCalendar, FiArrowUpRight } from "react-icons/fi";
import { useTranslations, useLocale } from "next-intl";

const CONTENT_WIDTH = "app-container";

const levelColors: Record<Blog["readingLevel"], string> = {
    beginner: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    intermediate: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    advanced: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    research: "bg-pink-500/15 text-pink-400 border-pink-500/30",
};

function formatDate(iso: string, locale: string) {
    return new Date(iso).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", { month: "long", day: "numeric", year: "numeric" });
}


function FeaturedCard({ blog, t, locale }: { blog: Blog; t: ReturnType<typeof useTranslations>; locale: string }) {
    // Resolve title/subtitle from locale items, falling back to TS fields
    const item = (() => { try { return t.raw(`items.${blog.slug}`) as Record<string, string>; } catch { return null; } })();
    const displayTitle = item?.title ?? blog.title;
    const displaySubtitle = item?.subtitle ?? blog.subtitle;

    return (
        <Link href={`/blog/${blog.slug}`} className="group block">
            <motion.article
                className="relative overflow-hidden rounded-3xl bg-background-secondary border border-white/5 hover:border-white/15 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="grid lg:grid-cols-2 gap-0">
                    {/* Cover */}
                    <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-background-primary">
                        <Image
                            src={blog.coverImage}
                            alt={displayTitle}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background-primary/60 via-transparent to-transparent lg:hidden" />
                    </div>

                    <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
                        <div className="flex flex-wrap items-center gap-3 mb-5">
                            <span className={cn("text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full border", levelColors[blog.readingLevel])}>
                                {t(`levels.${blog.readingLevel}`)}
                            </span>
                            <span className="text-xs text-text-muted flex items-center gap-1.5">
                                <FiCalendar className="w-3 h-3" /> {formatDate(blog.publishedAt, locale)}
                            </span>
                            <span className="text-xs text-text-muted flex items-center gap-1.5">
                                <FiClock className="w-3 h-3" /> {blog.readingTime} {t("minRead")}
                            </span>
                        </div>

                        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary leading-tight mb-4 group-hover:text-accent-blue transition-colors duration-300">
                            {displayTitle}
                        </h2>

                        <p className="text-text-secondary leading-relaxed mb-6 line-clamp-3">
                            {displaySubtitle}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {blog.tags.slice(0, 5).map((tag) => (
                                <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-background-primary text-text-muted border border-white/5">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-background-primary">
                                <Image src={blog.author.avatar} alt={blog.author.name} fill className="object-cover" sizes="40px" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-text-primary">{blog.author.name}</p>
                                <p className="text-xs text-text-muted">{blog.author.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.article>
        </Link>
    );
}


function BlogCard({ blog, index, t, locale }: { blog: Blog; index: number; t: ReturnType<typeof useTranslations>; locale: string }) {
    // Resolve title/excerpt from locale items, falling back to TS fields
    const item = (() => { try { return t.raw(`items.${blog.slug}`) as Record<string, string>; } catch { return null; } })();
    const displayTitle = item?.title ?? blog.title;
    const displayExcerpt = item?.excerpt ?? blog.excerpt;

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Link href={`/blog/${blog.slug}`} className="group block h-full">
                <div className="h-full flex flex-col rounded-2xl overflow-hidden bg-background-secondary border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1">
                    {/* Cover */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-background-primary">
                        <Image
                            src={blog.coverImage}
                            alt={displayTitle}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {blog.featured && (
                            <span className="absolute top-4 right-4 text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-pink-400/20 border border-pink-400/50 text-pink-300 backdrop-blur-sm">
                                {t("featured")}
                            </span>
                        )}
                    </div>

                    {/* Body */}
                    <div className="flex flex-col flex-grow p-6">
                        {/* Meta row */}
                        <div className="flex items-center gap-3 mb-3">
                            <span className={cn("text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border", levelColors[blog.readingLevel])}>
                                {t(`levels.${blog.readingLevel}`)}
                            </span>
                            <span className="text-xs text-text-muted">{blog.readingTime} {t("minRead")}</span>
                        </div>

                        <h3 className="font-heading text-lg font-bold text-text-primary leading-snug mb-2 group-hover:text-accent-blue transition-colors line-clamp-2">
                            {displayTitle}
                        </h3>

                        <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
                            {displayExcerpt}
                        </p>

                        {/* Bottom */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <span className="text-xs text-text-muted">{formatDate(blog.publishedAt, locale)}</span>
                            <span className="flex items-center gap-1 text-sm font-medium text-text-primary group-hover:text-accent-blue transition-colors">
                                {t("readMore")} <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}


export function BlogListing() {
    const t = useTranslations("blog");
    const locale = useLocale();
    const categories = getAllBlogCategories();
    const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">("all");

    const filtered = useMemo(() => {
        if (activeCategory === "all") return [];
        return blogs.filter((b) => b.categories.includes(activeCategory));
    }, [activeCategory]);

    const featured = filtered.find((b) => b.featured);
    const rest = filtered.filter((b) => b !== featured);

    return (
        <div className={cn(CONTENT_WIDTH, "pb-24")}>
            <div className="mb-12">
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-text-muted mb-3">{t("label")}</p>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4">
                    {t("title")}
                </h1>
                <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
                    {t("subtitle")}
                </p>
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-12">
                <button
                    onClick={() => setActiveCategory("all")}
                    className={cn(
                        "text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full border transition-all",
                        activeCategory === "all"
                            ? "bg-text-primary text-background-primary border-text-primary"
                            : "bg-transparent text-text-muted border-white/10 hover:border-white/30"
                    )}
                >
                    {t("allFilter")}
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                            "text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full border transition-all",
                            activeCategory === cat
                                ? "bg-text-primary text-background-primary border-text-primary"
                                : "bg-transparent text-text-muted border-white/10 hover:border-white/30"
                        )}
                    >
                        {t(`categories.${cat}`)}
                    </button>
                ))}
            </div>

            {/* Featured */}
            {featured && (
                <div className="mb-12">
                    <FeaturedCard blog={featured} t={t} locale={locale} />
                </div>
            )}

            {/* Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCategory}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {rest.map((blog, i) => (
                        <BlogCard key={blog.id} blog={blog} index={i} t={t} locale={locale} />
                    ))}
                </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
                <div className="bg-background-secondary rounded-2xl p-12 text-center">
                    <span className="text-5xl mb-4 block">🔍</span>
                    <p className="text-text-secondary">{t("noArticles")}</p>
                </div>
            )}
        </div>
    );
}