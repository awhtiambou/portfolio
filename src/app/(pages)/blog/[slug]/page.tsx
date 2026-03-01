// Server Component — no "use client".
// Resolves all translatable fields from locale before passing to BlogDetail (Client Component).
// Strategy mirrors the project detail page: locale sections are merged by position onto TS sections.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { getBlogBySlug, getAllBlogSlugs, blogs } from "@/data/blogs";
import type { BlogSection, BlogElement } from "@/types/blog";
import { BlogDetail } from "./BlogDetail";

type Props = { params: Promise<{ slug: string }> };

// ─── Type-aware locale element merger ────────────────────────────────────────
// Non-translatable element types have no locale counterpart.
// We walk TS elements and only advance the locale cursor for translatable types,
// so positions never shift when code/image/divider elements are skipped in locale.

const NON_TRANSLATABLE_TYPES = new Set([
    "code",
    "image",
    "image-fullwidth",
    "image-grid",
    "image-comparison",
    "formula",
    "divider",
    "video",
]);

type LocaleEl = Record<string, unknown>;

function mergeElements(
    tsElements: BlogElement[],
    localeElements: LocaleEl[] | undefined
): BlogElement[] {
    if (!localeElements?.length) return tsElements;
    let cursor = 0;
    return tsElements.map((el) => {
        if (NON_TRANSLATABLE_TYPES.has(el.type)) {
            // Keep the TS element unchanged; do NOT advance locale cursor
            return el;
        }
        const locEl = localeElements[cursor];
        cursor++;
        if (!locEl) return el;
        // Shallow-merge: locale translatable fields override TS fields,
        // structural fields (type, size, lightbox, language, lineNumbers…) stay from TS
        return { ...el, ...locEl } as BlogElement;
    });
}

function resolveSection(
    tsSection: BlogSection,
    localeSection: Record<string, unknown> | undefined
): BlogSection {
    if (!localeSection) return tsSection;
    return {
        ...tsSection,
        label: (localeSection.label as string | undefined) ?? tsSection.label,
        heading: (localeSection.heading as string | undefined) ?? tsSection.heading,
        intro: (localeSection.intro as string | undefined) ?? tsSection.intro,
        elements: mergeElements(
            tsSection.elements,
            localeSection.elements as LocaleEl[] | undefined
        ),
    };
}

function resolveSections(
    tsSections: BlogSection[],
    localeSections: Record<string, unknown> | undefined
): BlogSection[] {
    if (!localeSections) return tsSections;
    return tsSections.map((sec) =>
        resolveSection(sec, localeSections[sec.id] as Record<string, unknown> | undefined)
    );
}

// ─── Static params & metadata ─────────────────────────────────────────────────

export async function generateStaticParams() {
    return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const blog = getBlogBySlug(slug);
    if (!blog) return { title: "Blog Post Not Found" };

    const locale = await getLocale();
    const t = await getTranslations({ locale, namespace: "blog.items" });
    const key = slug;

    const title = t.has(`${key}.title`) ? t(`${key}.title`) : blog.title;
    const excerpt = t.has(`${key}.excerpt`) ? t(`${key}.excerpt`) : blog.excerpt;

    return {
        title,
        description: excerpt,
        openGraph: {
            type: "article",
            title,
            description: excerpt,
            images: [blog.coverImage],
            publishedTime: blog.publishedAt,
            modifiedTime: blog.updatedAt,
            authors: [blog.author.name],
            tags: blog.tags,
        },
    };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const blog = getBlogBySlug(slug);
    if (!blog) notFound();

    const locale = await getLocale();
    // Namespace: "blog.items" — keys are relative (e.g. t("instance-segmentation-yolo-maskrcnn-sam.title"))
    const t = await getTranslations({ locale, namespace: "blog.items" });

    // Resolve top-level text fields
    const localizedTitle = t.has(`${slug}.title`) ? t(`${slug}.title`) : blog.title;
    const localizedSubtitle = t.has(`${slug}.subtitle`) ? t(`${slug}.subtitle`) : blog.subtitle;
    const localizedExcerpt = t.has(`${slug}.excerpt`) ? t(`${slug}.excerpt`) : blog.excerpt;

    // Resolve sections — get the raw locale sections object for this slug
    const localeSections = t.has(`${slug}.sections`)
        ? (t.raw(`${slug}.sections`) as Record<string, unknown>)
        : undefined;

    const resolvedSections = resolveSections(blog.sections, localeSections);

    // Related blogs with resolved titles
    const relatedBlogs = (blog.relatedSlugs ?? [])
        .map((s) => blogs.find((b) => b.slug === s))
        .filter(Boolean)
        .map((rel) => {
            if (!rel) return rel;
            const relTitle = t.has(`${rel.slug}.title`) ? t(`${rel.slug}.title`) : rel.title;
            const relExcerpt = t.has(`${rel.slug}.excerpt`) ? t(`${rel.slug}.excerpt`) : rel.excerpt;
            return { ...rel, title: relTitle, excerpt: relExcerpt };
        })
        .filter(Boolean)
        .slice(0, 3) as typeof blogs;

    return (
        <BlogDetail
            blog={{
                ...blog,
                title: localizedTitle,
                subtitle: localizedSubtitle,
                excerpt: localizedExcerpt,
                sections: resolvedSections,
            }}
            relatedBlogs={relatedBlogs}
        />
    );
}