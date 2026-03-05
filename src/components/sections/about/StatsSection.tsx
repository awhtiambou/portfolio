"use client";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const STATS = ["yearsOfExperience", "technologiesMastered", "projectsCompleted", "coffeeCups"]

export function StatsSection() {
    const t = useTranslations();
    return (
        <div className="w-full flex justify-center mt-10 md:mt-5">
            <div className={
                cn(
                    "app-container",
                    "grid grid-cols-2 sm:grid-cols-4 gap-0.5",
                    "rounded-2xl"
                )
            }>
                {STATS.map((stat) => (
                    <div key={stat} className={
                        cn(
                            "bg-background-primary",
                            "px-6 py-5",
                            STATS.indexOf(stat) === STATS.length - 1 ? "rounded-r-2xl" : "",
                            STATS.indexOf(stat) === 0 ? "rounded-l-2xl" : ""
                        )
                    }>
                        <p className="font-heading text-3xl font-bold text-text-primary leading-none mb-1">{t(`about.stats.${stat}.value`)}</p>
                        <p className="text-xs font-mono uppercase tracking-widest text-text-muted mb-0.5">{t(`about.stats.${stat}.label`)}</p>
                        {stat && <p className="text-xs text-text-secondary">{t(`about.stats.${stat}.note`)}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}
