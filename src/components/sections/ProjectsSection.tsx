"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout";
import { Card, CardContent, Badge, SectionTitle, Button } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { Project } from "@/types";

// Placeholder projects - will be replaced with actual data
const featuredProjects: Project[] = [
  {
    id: "1",
    slug: "ml-sentiment-analysis",
    title: "ML Sentiment Analysis",
    description: "A deep learning model for sentiment analysis using transformers and BERT.",
    longDescription: "Full description here...",
    image: "/projects/sentiment.png",
    technologies: ["Python", "PyTorch", "Transformers", "FastAPI"],
    category: "ml",
    featured: true,
    startDate: "2024-01",
    status: "completed",
  },
  {
    id: "2",
    slug: "ai-chatbot",
    title: "AI Chatbot Platform",
    description: "An intelligent chatbot using LLMs with RAG architecture.",
    longDescription: "Full description here...",
    image: "/projects/chatbot.png",
    technologies: ["Python", "LangChain", "OpenAI", "Vector DB"],
    category: "ai",
    featured: true,
    startDate: "2024-06",
    status: "in-progress",
  },
  {
    id: "3",
    slug: "mlops-pipeline",
    title: "MLOps Pipeline",
    description: "End-to-end ML pipeline with automated training, testing, and deployment.",
    longDescription: "Full description here...",
    image: "/projects/mlops.png",
    technologies: ["Docker", "Kubernetes", "MLflow", "GitHub Actions"],
    category: "mlops",
    featured: true,
    startDate: "2024-03",
    status: "completed",
  },
];

const categoryColors = {
  ml: "accent-blue",
  ai: "accent-pink",
  devops: "accent-mint",
  mlops: "accent-yellow",
  web: "accent-blue",
  mobile: "accent-pink",
  design: "accent-mint",
  other: "default",
} as const;

export function ProjectsSection() {
  return (
    <Section id="projects">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SectionTitle
          title="Featured Projects"
          subtitle="Some of my recent work"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <motion.div key={project.id} variants={fadeInUp}>
              <Link href={`/projects/${project.slug}`}>
                <Card variant="elevated" className="h-full group overflow-hidden">
                  {/* Project Image */}
                  <div className="relative h-48 -mx-6 -mt-6 mb-4 bg-gradient-to-br from-accent-blue/20 to-accent-pink/20 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-4xl">
                      {project.category === "ml" && "🤖"}
                      {project.category === "ai" && "🧠"}
                      {project.category === "mlops" && "⚙️"}
                      {project.category === "web" && "🌐"}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background-secondary to-transparent" />
                  </div>

                  <CardContent>
                    {/* Category badge */}
                    <Badge
                      variant={categoryColors[project.category] as "accent-blue" | "accent-pink" | "accent-mint" | "accent-yellow" | "default"}
                      size="sm"
                      className="mb-3"
                    >
                      {project.category.toUpperCase()}
                    </Badge>

                    {/* Title */}
                    <h3 className="font-heading font-semibold text-lg text-text-primary mb-2 group-hover:text-accent-blue transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" size="sm">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" size="sm">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeInUp} className="text-center mt-12">
          <Button href="/projects" variant="outline">
            View All Projects
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  );
}
