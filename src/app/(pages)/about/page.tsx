import type { Metadata } from "next";
import { Section } from "@/components/layout";
import { Badge, SectionTitle, Text, Card } from "@/components/ui";
import { ExperienceSection, EducationSection, TestimonialsSection } from "@/components/sections";
import { profile } from "@/data/profile";
import { skills, skillCategoryConfig } from "@/data/skills";
import type { SkillCategory } from "@/types";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about my background, skills, and experience in AI/ML and software development.",
};

// Group skills by category
const groupedSkills = skills.reduce((acc, skill) => {
  if (!acc[skill.category]) {
    acc[skill.category] = [];
  }
  acc[skill.category].push(skill);
  return acc;
}, {} as Record<SkillCategory, typeof skills>);

export default function AboutPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <Section variant="alternate" spacing="xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-accent-blue via-accent-pink to-accent-yellow opacity-20" />
              <div className="absolute inset-4 rounded-xl bg-background-secondary flex items-center justify-center">
                <span className="text-8xl">👨‍💻</span>
              </div>
              {/* Decorative */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-accent-blue/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-accent-pink/20 rounded-full blur-3xl" />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary">
              About Me
            </h1>
            <div className="space-y-4">
              {profile.bio.paragraphs.map((paragraph, index) => (
                <Text key={index} size="lg" className="leading-relaxed">
                  {paragraph}
                </Text>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Stats Section */}
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-background-secondary rounded-xl">
            <div className="font-heading text-4xl font-bold text-accent-blue mb-2">
              {profile.stats.yearsExperience}+
            </div>
            <Text variant="muted">Years Experience</Text>
          </div>
          <div className="text-center p-6 bg-background-secondary rounded-xl">
            <div className="font-heading text-4xl font-bold text-accent-pink mb-2">
              {profile.stats.projectsCompleted}+
            </div>
            <Text variant="muted">Projects Completed</Text>
          </div>
          <div className="text-center p-6 bg-background-secondary rounded-xl">
            <div className="font-heading text-4xl font-bold text-accent-mint mb-2">
              {profile.stats.technologiesMastered}+
            </div>
            <Text variant="muted">Technologies</Text>
          </div>
          <div className="text-center p-6 bg-background-secondary rounded-xl">
            <div className="font-heading text-4xl font-bold text-accent-yellow mb-2">
              {profile.stats.coffeeCups}+
            </div>
            <Text variant="muted">Cups of Coffee</Text>
          </div>
        </div>
      </Section>

      {/* Experience Section - With anchor for navigation */}
      <ExperienceSection />

      {/* Skills Section */}
      <Section id="skills" variant="alternate">
        <SectionTitle
          title="Skills & Expertise"
          subtitle="Technologies and tools I work with"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => {
            const config = skillCategoryConfig[category as SkillCategory];
            return (
              <Card key={category} variant="outlined" className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{config?.icon}</span>
                  <h3 className="font-heading font-semibold text-lg text-text-primary">
                    {config?.label || category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <Badge
                      key={skill.name}
                      variant={
                        skill.level === "expert"
                          ? "accent-pink"
                          : skill.level === "advanced"
                            ? "accent-blue"
                            : skill.level === "intermediate"
                              ? "accent-mint"
                              : "accent-yellow"
                      }
                      size="sm"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Skill Level Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="accent-pink" size="sm">Expert</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="accent-blue" size="sm">Advanced</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="accent-mint" size="sm">Intermediate</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="accent-yellow" size="sm">Beginner</Badge>
          </div>
        </div>
      </Section>

      {/* Education Section - With anchor for navigation */}
      <EducationSection />

      {/* Currently Section */}
      <Section>
        <SectionTitle
          title="What I'm Up To"
          subtitle="Current focus and interests"
        />

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card variant="elevated">
            <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
              📚 Learning
            </h3>
            <ul className="space-y-2">
              {profile.current.learning.map((item) => (
                <li key={item} className="text-text-secondary flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent-blue rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card variant="elevated">
            <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
              💻 Working On
            </h3>
            <ul className="space-y-2">
              {profile.current.working.map((item) => (
                <li key={item} className="text-text-secondary flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent-pink rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card variant="elevated">
            <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
              📖 Reading
            </h3>
            <p className="text-text-secondary">{profile.current.reading}</p>
          </Card>
        </div>
      </Section>

      {/* Interests */}
      <Section variant="alternate">
        <SectionTitle
          title="Interests"
          subtitle="Things I'm passionate about"
        />

        <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
          {profile.interests.map((interest) => (
            <Badge key={interest} variant="outline" size="lg">
              {interest}
            </Badge>
          ))}
        </div>
      </Section>

      {/* Testimonials Section */}
      <TestimonialsSection />
    </main>
  );
}
