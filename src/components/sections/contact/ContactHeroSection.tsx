"use client";

import { Section } from "@/components/layout";
import { Text } from "@/components/ui";

export function ContactHeroSection() {
    return (
        <Section variant="alternate" spacing="lg">
            <div className="text-center max-w-3xl mx-auto">
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4">
                    Get In Touch
                </h1>
                <Text size="lg" variant="muted">
                    Have a question, proposal, or just want to say hello?
                    I&apos;d love to hear from you!
                </Text>
            </div>
        </Section>
    );
}
