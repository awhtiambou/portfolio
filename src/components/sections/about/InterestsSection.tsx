"use client";

import { Section } from "@/components/layout";
import { SectionTitle, Badge } from "@/components/ui";
import { profile } from "@/data/profile";

export function InterestsSection() {
    return (
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
    );
}
