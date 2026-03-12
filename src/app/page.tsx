import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  SkillsSection,
  ExperienceSection,
  FeaturedProjectsHorizontal,
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
        <FeaturedProjectsHorizontal />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

