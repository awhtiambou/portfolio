"use client";

import { Section } from "@/components/layout";
import { Text } from "@/components/ui";

export function ProjectsHeroSection() {
    return (
        <Section variant="alternate" spacing="lg">
            <div className="text-center max-w-3xl mx-auto">
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4">
                    Projects
                </h1>
                <Text size="lg" variant="muted">
                    A collection of my work in AI/ML, web development, and software engineering.
                    Each project represents a unique challenge and learning opportunity.
                </Text>
            </div>
        </Section>
    );
}
