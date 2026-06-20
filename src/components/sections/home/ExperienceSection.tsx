"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, SectionTitle, Button } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { Experience } from "@/types";

const featuredExperiences: Experience[] = [
  {
    id: "1",
    company: "Tech Company",
    position: "AI/ML Engineer",
    location: "Remote",
    startDate: "2024-01",
    current: true,
    description: "Working on cutting-edge machine learning solutions.",
    responsibilities: [
      "Developing and deploying ML models",
      "Building data pipelines",
      "Collaborating with cross-functional teams",
    ],
    technologies: ["Python", "TensorFlow", "AWS", "Docker"],
  },
  {
    id: "2",
    company: "Startup Inc",
    position: "Full-Stack Developer",
    location: "Hybrid",
    startDate: "2023-06",
    endDate: "2023-12",
    description: "Built scalable web applications.",
    responsibilities: [
      "Frontend development with React",
      "Backend API development",
      "Database design and optimization",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "TypeScript"],
  },
];

export function ExperienceSection() {
  return (
    <Section id="experience" variant="default">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SectionTitle
          title="Experience"
          subtitle="My professional journey"
        />

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2" />

          <div className="space-y-8">
            {featuredExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={fadeInUp}
                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
              >
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-accent-blue rounded-full transform -translate-x-1/2 mt-6 z-10" />

                <div className="md:w-1/2 pl-8 md:pl-0">
                  <Card variant="elevated">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <CardTitle>{exp.position}</CardTitle>
                          <CardDescription>{exp.company}</CardDescription>
                        </div>
                        {exp.current && (
                          <Badge variant="accent-mint" size="sm">Current</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-text-secondary text-sm mb-3">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}<span className="mx-1.5 opacity-40" aria-hidden>/</span>{exp.location}
                      </p>
                      <p className="text-text-secondary mb-4">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" size="sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
