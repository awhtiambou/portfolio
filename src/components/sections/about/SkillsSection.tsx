"use client";

import { Section } from "@/components/layout";
import { Badge, SectionTitle, Card } from "@/components/ui";
import { skills, skillCategoryConfig } from "@/data/skills";
import type { SkillCategory } from "@/types";

// Group skills by category
const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
        acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
}, {} as Record<SkillCategory, typeof skills>);

export function SkillsSection() {
    return (
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
                                <span className="text-2xl"></span>
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
    );
}
