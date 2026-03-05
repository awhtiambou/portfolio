"use client";

import { Section } from "@/components/layout";
import { SectionTitle, Card } from "@/components/ui";
import { profile } from "@/data/profile";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function CurrentlySection() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted ? resolvedTheme === "dark" : true;

    return (
        <Section>
            <SectionTitle
                title="What I'm Up To"
                subtitle="Current focus and interests"
            />

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Card variant="elevated">
                    <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
                        📚 Learning
                    </h3>
                    <ul className="space-y-2">
                        {profile.current.learning.map((item) => (
                            <li key={item} className="text-text-secondary flex items-center gap-2">
                                <span className={cn("w-1.5 h-1.5 rounded-full", isDark ? "bg-accent-yellow" : "bg-accent-blue")} />
                                {item}
                            </li>
                        ))}
                    </ul>
                </Card>

                <Card variant="elevated">
                    <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
                        💻 Working On
                    </h3>
                    <ul className="space-y-2">
                        {profile.current.working.map((item) => (
                            <li key={item} className="text-text-secondary flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-accent-pink rounded-full" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </Card>

                <Card variant="elevated">
                    <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
                        📖 Reading
                    </h3>
                    <p className="text-text-secondary">{profile.current.reading}</p>
                </Card>
            </div>
        </Section>
    );
}
