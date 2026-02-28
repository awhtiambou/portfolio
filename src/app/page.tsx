import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  SkillsSection,
  ExperienceSection,
  FeaturedProjectsSection,
  TestimonialsSection,
  ContactSection,
} from "@/components/sections/home";

export default function Home() {
  return (
    <>
      <Header />
      <main className="">
        <HeroSection />
        <SkillsSection />
        <FeaturedProjectsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

