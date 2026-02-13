"use client";
import { profile } from "@/data/profile";
import { useTranslations } from "next-intl";

export function StatsSection() {
    const t = useTranslations();
    
    return (
        <div className="py-20 flex justify-center">
            <div className="container grid grid-cols-2 md:grid-cols-4 gap-10">
                {/* Years of Experience */}
                <div className="border-l pl-5 py-0 flex flex-col justify-between">
                    <div className="text-4xl font-semibold" style={{fontFamily: "Besley"}}>{profile.stats.yearsExperience}+</div>
                    <div className="font-medium mt-1">{t("about.stats.yearsOfExperienceLabel")}</div>
                </div>

                {/* Technologies Mastered */}
                <div className="border-l pl-5 py-0 flex flex-col justify-between">
                    <div className="text-4xl font-semibold" style={{fontFamily: "Besley"}}>{profile.stats.technologiesMastered}+</div>
                    <div className="font-medium mt-1">{t("about.stats.technologiesMasteredLabel")}</div>
                </div>

                {/* Projects Completed */}
                <div className="border-l pl-5 py-0 flex flex-col justify-between">
                    <div className="text-4xl font-semibold" style={{fontFamily: "Besley"}}>{profile.stats.projectsCompleted}+</div>
                    <div className="font-medium mt-1">{t("about.stats.projectsCompletedLabel")}</div>
                </div>

                {/* Coffee Cups */}
                <div className="border-l pl-5 py-0 flex flex-col justify-between">
                    <div className="text-4xl font-semibold" style={{fontFamily: "Besley"}}>{profile.stats.coffeeCups}+</div>
                    <div className="font-medium mt-1">{t("about.stats.coffeeCupsLabel")}</div>
                </div>
            </div>
        </div>
    );
}
