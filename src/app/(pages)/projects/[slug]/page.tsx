
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { getProjectBySlug, getAllProjectSlugs, projects } from "@/data/projects";
import type { ProjectSection } from "@/types";
import { ProjectDetail } from "./ProjectDetail";

type Props = { params: Promise<{ slug: string }> };


type Translator = Awaited<ReturnType<typeof getTranslations>>;

/**
 * Recursively walks any value and replaces every string that starts with "$t:"
 * with the resolved translation.  Non-string values (numbers, booleans, arrays,
 * objects) are walked recursively; everything else is returned as-is.
 *
 * The translation key is the part after "$t:", e.g.
 *   "$t:kalfou-transportation-ecosystem.sections.vision.heading"
 *   → t("kalfou-transportation-ecosystem.sections.vision.heading")
 */
function resolveKeys<T>(value: T, t: Translator): T {
  if (typeof value === "string") {
    if (value.startsWith("$t:")) {
      const key = value.slice(3); // strip "$t:"
      return (t.has(key) ? t(key) : value) as T;
    }
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => resolveKeys(item, t)) as unknown as T;
  }
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, resolveKeys(v, t)])
    ) as T;
  }
  return value;
}


export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "projects.items" });

  const titleKey = `${slug}.title`;
  const descKey = `${slug}.description`;

  return {
    title: t.has(titleKey) ? t(titleKey) : project.title,
    description: t.has(descKey) ? t(descKey) : project.description,
  };
}


export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const locale = await getLocale();
  // Namespace is "projects.items" — keys in the locale file are relative to this.
  // e.g. t("kalfou-transportation-ecosystem.sections.vision.heading")
  const t = await getTranslations({ locale, namespace: "projects.items" });

  const titleKey = `${slug}.title`;
  const descKey = `${slug}.description`;

  const localizedTitle = t.has(titleKey) ? t(titleKey) : project.title;
  const localizedDescription = t.has(descKey) ? t(descKey) : project.description;

  // Deep-resolve all "$t:" keys inside the sections tree
  const resolvedSections = resolveKeys<ProjectSection[] | undefined>(project.sections, t);

  // Related projects with resolved title/description
  const relatedProjects = projects
    .filter((p) => p.categories.includes(project.categories[0]) && p.id !== project.id)
    .slice(0, 3)
    .map((p) => {
      const pTitleKey = `${p.slug}.title`;
      const pDescKey = `${p.slug}.description`;
      return {
        id: p.id,
        slug: p.slug,
        title: t.has(pTitleKey) ? t(pTitleKey) : p.title,
        description: t.has(pDescKey) ? t(pDescKey) : p.description,
        image: p.image,
        categories: p.categories,
      };
    });

  return (
    <ProjectDetail
      slug={slug}
      title={localizedTitle}
      description={localizedDescription}
      sections={resolvedSections}
      image={project.image}
      technologies={project.technologies}
      categories={project.categories}
      status={project.status}
      featured={project.featured}
      startDate={project.startDate}
      endDate={project.endDate}
      liveUrl={project.liveUrl}
      githubUrl={project.githubUrl}
      relatedProjects={relatedProjects}
    />
  );
}