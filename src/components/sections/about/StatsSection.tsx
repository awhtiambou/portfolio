"use client";

import { Section } from "@/components/layout";
import { Text } from "@/components/ui";
import { profile } from "@/data/profile";

export function StatsSection() {
    return (
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
    );
}
