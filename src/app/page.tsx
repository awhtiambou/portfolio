import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  SkillsSection,
  ExperienceSection,
  ProjectsSection,
  TestimonialsSection,
  ContactSection,
} from "@/components/sections/home";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

