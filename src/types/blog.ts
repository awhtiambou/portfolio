// ─── Blog Element & Section System ───────────────────────────────────────────
// Each element knows its type and how it wants to be displayed.
// Mirrors the ProjectElement system but with blog-specific additions.

export type BlogElement =
    // ── Text ──────────────────────────────────────────────────────────────────
    | {
        type: "text";
        /** Supports **bold**, *italic*, `code` inline. \n = line break. */
        content: string;
        /** @default "body" */
        variant?: "body" | "lead" | "caption" | "quote" | "footnote";
    }

    // ── Heading (inside a section body, below the section heading) ────────────
    | {
        type: "heading";
        level: 2 | 3 | 4;
        content: string;
    }

    // ── Image variants ────────────────────────────────────────────────────────
    | {
        type: "image";
        src: string;
        alt?: string;
        /** @default "normal" */
        size?: "small" | "normal" | "large";
        caption?: string;
        /** Optional click-to-expand lightbox */
        lightbox?: boolean;
    }
    | {
        type: "image-fullwidth";
        src: string;
        alt?: string;
        /** Tailwind height class e.g. "h-[60vh]". @default "h-[70vh]" */
        height?: string;
        caption?: string;
        /** Parallax scroll effect */
        parallax?: boolean;
    }
    | {
        type: "image-grid";
        images: { src: string; alt?: string; caption?: string }[];
        /** @default 2 */
        cols?: 2 | 3 | 4;
        /** Uniform aspect ratio for grid cells. @default "4/3" */
        aspect?: "1/1" | "4/3" | "16/9" | "3/2";
    }
    | {
        type: "image-comparison";
        before: { src: string; label?: string };
        after: { src: string; label?: string };
        caption?: string;
    }

    // ── Data / metrics ────────────────────────────────────────────────────────
    | {
        type: "stat-grid";
        stats: { label: string; value: string; note?: string; trend?: "up" | "down" | "neutral" }[];
    }

    // ── Lists ─────────────────────────────────────────────────────────────────
    | {
        type: "list";
        items: string[];
        /** @default "bullet" */
        variant?: "bullet" | "numbered" | "check" | "arrow";
    }

    // ── Code ──────────────────────────────────────────────────────────────────
    | {
        type: "code";
        language?: string;
        /** File path or snippet label shown in the header */
        filename?: string;
        content: string;
        /** Show line numbers. @default true */
        lineNumbers?: boolean;
    }

    // ── Callout / alert boxes ─────────────────────────────────────────────────
    | {
        type: "callout";
        /** @default "info" */
        variant?: "info" | "warning" | "success" | "tip" | "danger" | "insight";
        title?: string;
        content: string;
    }

    // ── Math formula (KaTeX / display) ────────────────────────────────────────
    | {
        type: "formula";
        /** LaTeX string */
        content: string;
        /** @default "block" */
        display?: "block" | "inline";
        caption?: string;
    }

    // ── Table ─────────────────────────────────────────────────────────────────
    | {
        type: "table";
        headers: string[];
        rows: string[][];
        caption?: string;
        /** Alternating row colours. @default true */
        striped?: boolean;
    }

    // ── Links ─────────────────────────────────────────────────────────────────
    | {
        type: "link-list";
        links: { label: string; href: string; description?: string; external?: boolean }[];
        /** @default "list" */
        variant?: "list" | "cards" | "inline";
    }

    // ── Video embed ───────────────────────────────────────────────────────────
    | {
        type: "video";
        /** YouTube / Vimeo embed URL or local /path */
        src: string;
        title?: string;
        caption?: string;
        /** @default "16/9" */
        aspect?: "16/9" | "4/3" | "1/1";
    }

    // ── Pull quote / blockquote ───────────────────────────────────────────────
    | {
        type: "blockquote";
        content: string;
        author?: string;
        source?: string;
    }

    // ── Steps / process ───────────────────────────────────────────────────────
    | {
        type: "steps";
        steps: { title: string; description: string; icon?: string }[];
    }

    // ── Divider ───────────────────────────────────────────────────────────────
    | { type: "divider"; style?: "line" | "dots" | "gradient" };

// ─── Section ─────────────────────────────────────────────────────────────────
export interface BlogSection {
    id: string;
    /** Small-caps label above the heading */
    label?: string;
    heading?: string;
    /** Optional section intro paragraph */
    intro?: string;
    elements: BlogElement[];
    /** Break out of content width — use for fullwidth image sections */
    fullwidth?: boolean;
    /** Background treatment for the section */
    background?: "none" | "subtle" | "accent";
}

// ─── Blog post ───────────────────────────────────────────────────────────────
export type BlogCategory =
    | "computer-vision"
    | "machine-learning"
    | "deep-learning"
    | "mlops"
    | "research"
    | "tutorial"
    | "opinion"
    | "project-breakdown"
    | "3d-reconstruction"
    | "mixed-reality"
    | "nlp"
    | "other";

export type BlogReadingLevel = "beginner" | "intermediate" | "advanced" | "research";

export interface Blog {
    id: string;
    slug: string;
    /** Canonical title (fallback if no locale key) */
    title: string;
    subtitle: string;
    /** Short excerpt shown in listing cards */
    excerpt: string;
    coverImage: string;
    /** Estimated reading time in minutes */
    readingTime: number;
    publishedAt: string;    // ISO date
    updatedAt?: string;     // ISO date — shown as "Updated …"
    author: {
        name: string;
        role: string;
        avatar: string;
    };
    categories: BlogCategory[];
    tags: string[];
    readingLevel: BlogReadingLevel;
    featured?: boolean;
    /** Locale translation key prefix, e.g. "blog.items.yolo-segmentation" */
    localeKey?: string;
    sections: BlogSection[];
    /** Related blog slugs */
    relatedSlugs?: string[];
}
