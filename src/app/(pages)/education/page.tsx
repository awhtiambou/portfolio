import type { Metadata } from "next";
import { Section } from "@/components/layout";
import { Card, Badge, SectionTitle, Text } from "@/components/ui";
import { education, certifications } from "@/data/education";

export const metadata: Metadata = {
  title: "Education",
  description: "My academic background and certifications in Computer Science and AI/ML.",
};

export default function EducationPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <Section variant="alternate" spacing="lg">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Education & Certifications
          </h1>
          <Text size="lg" variant="muted">
            My academic journey and professional certifications in Computer Science and AI/ML.
          </Text>
        </div>
      </Section>

      {/* Academic Education */}
      <Section>
        <SectionTitle
          title="Academic Background"
          subtitle="Formal education and academic achievements"
        />

        <div className="max-w-4xl mx-auto space-y-8">
          {education.map((edu) => (
            <Card key={edu.id} variant="elevated" padding="lg">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Icon */}
                <div className="w-20 h-20 rounded-2xl bg-accent-blue/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-4xl">🎓</span>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="font-heading font-semibold text-2xl text-text-primary">
                        {edu.degree} in {edu.field}
                      </h2>
                      <p className="text-text-secondary text-lg">{edu.institution}</p>
                    </div>
                    {edu.current && (
                      <Badge variant="accent-mint" size="md">Currently Enrolled</Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-text-muted text-sm mb-4">
                    <span>📅 {edu.startDate} - {edu.current ? "Present" : edu.endDate}</span>
                    <span>📍 {edu.location}</span>
                    {edu.gpa && <span>📊 GPA: {edu.gpa}</span>}
                  </div>

                  {edu.description && (
                    <Text variant="muted" className="mb-6">{edu.description}</Text>
                  )}

                  {/* Achievements */}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-medium text-text-primary mb-3">Achievements & Activities</h3>
                      <div className="flex flex-wrap gap-2">
                        {edu.achievements.map((achievement) => (
                          <Badge key={achievement} variant="accent-yellow" size="sm">
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Courses */}
                  {edu.courses && edu.courses.length > 0 && (
                    <div>
                      <h3 className="font-medium text-text-primary mb-3">Relevant Coursework</h3>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course) => (
                          <Badge key={course} variant="outline" size="sm">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Certifications */}
      <Section variant="alternate">
        <SectionTitle
          title="Professional Certifications"
          subtitle="Industry-recognized credentials and certifications"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert) => (
            <Card key={cert.id} variant="elevated" className="h-full">
              <div className="flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-accent-pink/10 flex items-center justify-center mb-4">
                  <span className="text-2xl">📜</span>
                </div>

                <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
                  {cert.name}
                </h3>

                <p className="text-text-secondary mb-2">{cert.issuer}</p>

                <p className="text-text-muted text-sm mb-4">Issued: {cert.date}</p>

                <div className="mt-auto">
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-blue hover:underline text-sm"
                    >
                      View Credential →
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
