import type { Metadata } from "next";
import {
  AboutHeroSection,
  StatsSection,
  ExperienceSection,
  SkillsSection,
  EducationSection,
  CurrentlySection,
  TestimonialsSection,
  RandomFactsSection
} from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about my background, skills, and experience in AI/ML and software development.",
};

export default function AboutPage() {
  return (
    <main className="pt-0 w-full">
      <AboutHeroSection />
      <StatsSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <TestimonialsSection />
      <RandomFactsSection />
    </main>
  );
}
