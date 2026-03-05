"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { MagneticButton, TiltCard, SectionTitle, FillButton } from "@/components/ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CiFileOn } from "react-icons/ci";
import { GoFileCode } from "react-icons/go";
import { MdArrowForward } from "react-icons/md";


export function AboutHeroSection() {
    const t = useTranslations();
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const isDark = !mounted || resolvedTheme !== "light";
    return (
        <div className="min-h-screen w-full flex justify-center items-center pt-28">
            <div className="app-container grid grid-cols-6 gap-8 place-items-center">

                <h1 className="hidden text-5xl font-bold text-center col-span-6 w-full">
                    {t("about.title")}
                </h1>

                <div className="w-full text-center col-span-6 md:col-span-3 lg:col-span-2">
                    <TiltCard glowOpacity={0} className="aspect-[5/5] md:aspect-[4/5] overflow-hidden rounded-b-4xl md:rounded-b-xl rounded-t-4xl md:rounded-t-full">
                        <Image
                            src="/assets/images/me-coding.jpg"
                            alt="Abdoul"
                            fill
                            className="object-cover rounded-b-4xl md:rounded-b-xl"
                            priority
                        />
                    </TiltCard>
                </div>
                <div className="w-full text-justify col-span-6 md:col-span-3 lg:col-span-4 lg:pl-20">
                    <SectionTitle className="mb-6 !text-left" subtitle={t("about.subtitle")} title={t("about.title")} />
                    <div className="space-y-4 font-base text-lg md:text-md max-w-2xl">
                        <p>
                            {t("about.bio1")}
                        </p>
                        <p>
                            {t("about.bio2")}
                        </p>
                        <p>
                            {t("about.bio3")}
                        </p>
                    </div>
                    <div className="mt-10 lg:mt-5 flex flex-wrap gap-5">
                        <MagneticButton href="/contact" backgroundColor={isDark ? "var(--color-yellow)" : "var(--color-blue)"} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600, backgroundColor: isDark ? 'var(--color-yellow)' : 'var(--color-blue)', color: isDark ? 'var(--color-black)' : 'var(--color-foreground)' }} className="font-mono font-medium">
                            <GoFileCode className="text-lg" />
                            <span>{t("common.downloadMyResume")}</span>
                        </MagneticButton>
                        <FillButton href="/projects" fillColor="var(--color-foreground)" className="group font-mono font-medium">
                            {t("common.viewWork")}
                            <MdArrowForward className="ml-2 inline-block transition-transform duration-400 group-hover:translate-x-2" />
                        </FillButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
