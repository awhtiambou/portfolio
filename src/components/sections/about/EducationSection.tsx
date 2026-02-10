"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout";
import { Card, Badge, SectionTitle, Button } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { Education } from "@/types";

// Placeholder education - will be replaced with data from resume
const educationData: Education[] = [
  {
    id: "1",
    institution: "University Name",
    degree: "Bachelor of Science",
    field: "Computer Science",
    location: "City, Country",
    startDate: "2021-09",
    current: true,
    description: "Focusing on AI/ML, data science, and software engineering.",
    achievements: [
      "Dean's List",
      "AI Research Assistant",
      "Hackathon Winner",
    ],
    gpa: "3.8",
  },
];

export function EducationSection() {
  return (
    <Section id="education" variant="alternate">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SectionTitle
          title="Education"
          subtitle="My academic background"
        />

        <div className="max-w-3xl mx-auto space-y-6">
          {educationData.map((edu) => (
            <motion.div key={edu.id} variants={fadeInUp}>
              <Card variant="elevated">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-accent-blue/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">🎓</span>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-heading font-semibold text-xl text-text-primary">
                          {edu.degree} in {edu.field}
                        </h3>
                        <p className="text-text-secondary">{edu.institution}</p>
                      </div>
                      {edu.current && (
                        <Badge variant="accent-mint" size="sm">Current</Badge>
                      )}
                    </div>

                    <p className="text-text-muted text-sm mb-3">
                      {edu.startDate} - {edu.current ? "Present" : edu.endDate} • {edu.location}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>

                    {edu.description && (
                      <p className="text-text-secondary mb-4">{edu.description}</p>
                    )}

                    {edu.achievements && edu.achievements.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {edu.achievements.map((achievement) => (
                          <Badge key={achievement} variant="outline" size="sm">
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
