import { IconBaseProps } from "react-icons/lib";

// ─── Project Section & Element System ─────────────────────────────────────────

/**
 * A single content element inside a project section.
 * Each element knows what it is and how it wants to be displayed.
 */
export type ProjectElement =
  | {
    type: "text";
    /** Supports **bold**, *italic*, `code` inline. Use \n for line breaks. */
    content: string;
  }
  | {
    type: "image";
    src: string;
    alt?: string;
    /** @default "normal" */
    size?: "small" | "normal" | "large";
    caption?: string;
  }
  | {
    type: "image-fullwidth";
    src: string;
    alt?: string;
    /** Tailwind height class e.g. "h-[60vh]". @default "h-[70vh]" */
    height?: string;
    caption?: string;
  }
  | {
    type: "image-grid";
    images: { src: string; alt?: string; caption?: string }[];
    /** Desktop column count. @default 2 */
    cols?: 2 | 3 | 4;
  }
  | {
    type: "stat-grid";
    stats: { label: string; value: string; note?: string }[];
  }
  | {
    type: "list";
    items: string[];
    /** @default "bullet" */
    variant?: "bullet" | "numbered" | "check";
  }
  | {
    type: "link-list";
    links: { label: string; href: string; description?: string }[];
  }
  | {
    type: "code";
    language?: string;
    content: string;
  }
  | {
    type: "callout";
    /** @default "info" */
    variant?: "info" | "warning" | "success" | "tip";
    title?: string;
    content: string;
  }
  | {
    type: "divider";
  };

/**
 * A titled section grouping related elements.
 * Uses the app's standard content width by default.
 * Set fullwidth: true only for sections whose sole element is image-fullwidth.
 */
export interface ProjectSection {
  /** Small-caps label above the heading, e.g. "System Architecture" */
  label?: string;
  heading?: string;
  elements: ProjectElement[];
  /** Break out of content width — use for fullwidth image-only sections */
  fullwidth?: boolean;
}

// ─── Project ──────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  slug: string;
  /** English fallback — canonical lives in locale files */
  title: string;
  /** English fallback — canonical lives in locale files */
  description: string;
  image?: string;
  /** Replaces longDescription. Sections & elements drive the detail page layout. */
  sections?: ProjectSection[];
  technologies: string[];
  categories: ProjectCategory[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  startDate: string;
  endDate?: string;
  status?: "completed" | "in-progress" | "planned";
}

export type ProjectCategory =
  | "ml"
  | "ai"
  | "devops"
  | "mlops"
  | "web"
  | "mobile"
  | "design"
  | "backend"
  | "other";

// ─── Other types (unchanged) ──────────────────────────────────────────────────

export interface Experience {
  id: string;
  company: string;
  companyUrl?: string;
  companyLogo?: string;
  position: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  startDate: string;
  endDate?: string;
  current?: boolean;
  location: string;
  logo?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  description?: string;
  achievements?: string[];
  startDate: string;
  endDate?: string;
  current?: boolean;
  location: string;
  logo?: string;
  gpa?: string;
  courses?: string[];
}

export interface Skill {
  name: string;
  level: SkillLevel;
  category: SkillCategory;
  icon?: string;
}

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";
export type SkillCategory =
  | "ml"
  | "ai"
  | "data"
  | "mlops"
  | "devops"
  | "cloud"
  | "frontend"
  | "backend"
  | "tools"
  | "databases"
  | "soft-skills"
  | "other";

export interface MasteredTechnology {
  name: string;
  title: string;
  icon?: IconBaseProps;
  iconColor: string;
  logoImageUrl?: string;
  bgColor?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
}

export type WithClassName<T = object> = T & { className?: string };
export type WithChildren<T = object> = T & { children?: React.ReactNode };

// Re-export blog types
export type { Blog, BlogElement, BlogSection, BlogCategory, BlogReadingLevel } from "./blog";