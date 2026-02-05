"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout";
import { Card, Badge, SectionTitle, Button } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { Skill, SkillCategory } from "@/types";

// Category display config
const categoryConfig: Record<SkillCategory, { label: string; color: string }> = {
  ml: { label: "Machine Learning", color: "accent-blue" },
  ai: { label: "Artificial Intelligence", color: "accent-pink" },
  data: { label: "Data Science", color: "accent-mint" },
  mlops: { label: "MLOps", color: "accent-yellow" },
  devops: { label: "DevOps", color: "accent-blue" },
  cloud: { label: "Cloud", color: "accent-mint" },
  frontend: { label: "Frontend", color: "accent-pink" },
  backend: { label: "Backend", color: "accent-blue" },
  tools: { label: "Tools", color: "accent-yellow" },
  databases: { label: "Databases", color: "accent-mint" },
  "soft-skills": { label: "Soft Skills", color: "accent-pink" },
  other: { label: "Other", color: "default" },
};

// Placeholder skills - will be replaced with data from resume
const featuredSkills: Skill[] = [
  { name: "Python", level: "expert", category: "ml" },
  { name: "TensorFlow", level: "advanced", category: "ml" },
  { name: "PyTorch", level: "advanced", category: "ml" },
  { name: "Scikit-learn", level: "expert", category: "ml" },
  { name: "Natural Language Processing", level: "advanced", category: "ai" },
  { name: "Computer Vision", level: "advanced", category: "ai" },
  { name: "Docker", level: "advanced", category: "devops" },
  { name: "Kubernetes", level: "intermediate", category: "devops" },
  { name: "AWS", level: "advanced", category: "cloud" },
  { name: "React", level: "advanced", category: "frontend" },
  { name: "Next.js", level: "advanced", category: "frontend" },
  { name: "TypeScript", level: "advanced", category: "frontend" },
];

// Group skills by category
const groupedSkills = featuredSkills.reduce((acc, skill) => {
  if (!acc[skill.category]) {
    acc[skill.category] = [];
  }
  acc[skill.category].push(skill);
  return acc;
}, {} as Record<SkillCategory, Skill[]>);

const levelColors = {
  beginner: "accent-yellow",
  intermediate: "accent-mint",
  advanced: "accent-blue",
  expert: "accent-pink",
} as const;

export function SkillsSection() {
  return (
    <Section id="skills">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SectionTitle
          title="Skills & Expertise"
          subtitle="Technologies and tools I work with"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <motion.div key={category} variants={fadeInUp}>
              <Card variant="outlined" className="h-full">
                <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
                  {categoryConfig[category as SkillCategory]?.label || category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill.name}
                      variant={levelColors[skill.level] as "accent-yellow" | "accent-mint" | "accent-blue" | "accent-pink"}
                      size="sm"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeInUp} className="text-center mt-12">
          <Button href="/about#skills" variant="outline">
            View All Skills
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  );
}
