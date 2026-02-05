import type { Metadata } from "next";
import { Section } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, SectionTitle, Text } from "@/components/ui";
import { experiences, getTotalExperienceYears } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "My professional experience in AI/ML engineering and software development.",
};

export default function ExperiencePage() {
  const totalYears = getTotalExperienceYears();

  return (
    <main className="pt-20">
      {/* Hero */}
      <Section variant="alternate" spacing="lg">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Professional Experience
          </h1>
          <Text size="lg" variant="muted">
            {totalYears}+ years of experience in AI/ML engineering, full-stack development, 
            and building production-ready systems.
          </Text>
        </div>
      </Section>

      {/* Timeline */}
      <Section>
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-accent-blue rounded-full -translate-x-1/2 mt-8 z-10 ring-4 ring-background-primary" />

                {/* Content */}
                <div className={`md:w-1/2 pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <Card variant="elevated">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <CardTitle as="h2">{exp.position}</CardTitle>
                          <CardDescription className="text-base">{exp.company}</CardDescription>
                        </div>
                        {exp.current && (
                          <Badge variant="accent-mint" size="sm">Current</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-text-muted text-sm mb-4 flex flex-wrap gap-2">
                        <span>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                        <span>•</span>
                        <span>{exp.location}</span>
                      </div>

                      <Text variant="muted" className="mb-4">{exp.description}</Text>

                      {exp.responsibilities && (
                        <div className="mb-4">
                          <h4 className="font-medium text-text-primary mb-2">Key Responsibilities:</h4>
                          <ul className="space-y-1.5">
                            {exp.responsibilities.map((resp, i) => (
                              <li key={i} className="text-text-secondary text-sm flex gap-2">
                                <span className="text-accent-blue mt-1">•</span>
                                {resp}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

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

                {/* Spacer */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
