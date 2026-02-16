import type { Metadata } from "next";
import { ProjectsListing } from "@/components/sections/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore my portfolio of AI/ML, web development, and software engineering projects.",
};

export default function ProjectsPage() {
  return (
    <main className="pt-28 md:pt-32">
      <ProjectsListing />
    </main>
  );
}
