import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, Container } from "@/components/layout";
import { Badge, Button, Text } from "@/components/ui";
import { getProjectBySlug, getAllProjectSlugs, projects } from "@/data/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Get related projects (same category, different project)
  const relatedProjects = projects
    .filter((p) => p.categories.includes(project.categories[0]) && p.id !== project.id)
    .slice(0, 3);

  return (
    <main className="pt-20">
      {/* Hero */}
      <Section variant="alternate" spacing="lg">
        <Container size="lg">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-text-muted">
              <li>
                <Link href="/" className="hover:text-text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/projects" className="hover:text-text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>/</li>
              <li className="text-text-primary">{project.title}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Category & Status */}
              <div className="flex flex-wrap gap-2 mb-4">
                {
                  project.categories.map((category) => (
                    <Badge key={category} variant="accent-blue" size="md">
                      {category.toUpperCase()}
                    </Badge>
                  ))
                }
                {project.status === "in-progress" && (
                  <Badge variant="accent-yellow" size="md">In Progress</Badge>
                )}
                {project.featured && (
                  <Badge variant="accent-pink" size="md">Featured</Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                {project.title}
              </h1>

              {/* Description */}
              <Text size="lg" className="mb-8">
                {project.description}
              </Text>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.liveUrl && (
                  <Button href={project.liveUrl} size="lg">
                    View Live Demo
                  </Button>
                )}
                {project.githubUrl && (
                  <Button href={project.githubUrl} variant="outline" size="lg">
                    View on GitHub
                  </Button>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-background-secondary rounded-xl p-6 space-y-6">
                {/* Date */}
                <div>
                  <h3 className="font-medium text-text-primary mb-2">Timeline</h3>
                  <p className="text-text-secondary text-sm">
                    {project.startDate} - {project.endDate || "Present"}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="font-medium text-text-primary mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Project Image/Demo */}
      <Section spacing="md">
        <Container size="lg">
          <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-accent-blue/20 via-accent-pink/10 to-accent-yellow/20 overflow-hidden flex items-center justify-center">
            <span className="text-8xl">
              {project.categories.includes("ml") && "🤖"}
              {project.categories.includes("ai") && "🧠"}
              {project.categories.includes("mlops") && "⚙️"}
              {project.categories.includes("web") && "🌐"}
              {project.categories.includes("devops") && "🔧"}
            </span>
          </div>
        </Container>
      </Section>

      {/* Long Description */}
      {project.longDescription && (
        <Section>
          <Container size="md">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* Simple markdown-like rendering */}
              {project.longDescription.split("\n").map((line, i) => {
                if (line.startsWith("# ")) {
                  return (
                    <h1 key={i} className="font-heading text-3xl font-bold text-text-primary mt-8 mb-4">
                      {line.replace("# ", "")}
                    </h1>
                  );
                }
                if (line.startsWith("## ")) {
                  return (
                    <h2 key={i} className="font-heading text-2xl font-semibold text-text-primary mt-6 mb-3">
                      {line.replace("## ", "")}
                    </h2>
                  );
                }
                if (line.startsWith("- ")) {
                  return (
                    <li key={i} className="text-text-secondary ml-4">
                      {line.replace("- ", "")}
                    </li>
                  );
                }
                if (line.trim() === "") {
                  return <br key={i} />;
                }
                return (
                  <p key={i} className="text-text-secondary mb-2">
                    {line}
                  </p>
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <Section variant="alternate">
          <Container>
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-8 text-center">
              Related Projects
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject) => (
                <Link key={relatedProject.id} href={`/projects/${relatedProject.slug}`}>
                  <div className="bg-background-primary rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <Badge variant="outline" size="sm" className="mb-3">
                      {relatedProject.categories[0].toUpperCase()}
                    </Badge>
                    <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
                      {relatedProject.title}
                    </h3>
                    <p className="text-text-secondary text-sm line-clamp-2">
                      {relatedProject.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Back to Projects */}
      <Section spacing="md">
        <div className="text-center">
          <Button href="/projects" variant="outline">
            ← Back to All Projects
          </Button>
        </div>
      </Section>
    </main>
  );
}
