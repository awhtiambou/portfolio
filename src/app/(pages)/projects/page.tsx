import type { Metadata } from "next";
import { ProjectsHeroSection, ProjectsFilterSection, ProjectsGridSection } from "@/components/sections/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore my portfolio of AI/ML, web development, and software engineering projects.",
};

export default function ProjectsPage() {
  return (
    <main className="pt-20">
      <ProjectsHeroSection />
      <ProjectsFilterSection />
      <ProjectsGridSection />
    </main>
  );
}
