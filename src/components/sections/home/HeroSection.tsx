"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { MagneticButton, FillButton, ScrollMouse, TiltCard } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { profile } from "@/data/profile";


function HeroContent({ mode }: { mode: "desktop" | "mobile" }) {
    const t = useTranslations();
    const isDesktop = mode === "desktop";

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className={isDesktop ? "space-y-6" : "relative z-10 space-y-4 md:space-y-6 max-w-xl"}
        >
            <motion.div
                variants={fadeInUp}
                className={`inline-flex items-center gap-${isDesktop ? "3" : "2"} px-4 py-2 rounded-full border border-text-muted/20 bg-background-secondary/50`}
            >
                {isDesktop && (
                    <div className="w-4 h-4 rounded-full bg-green-200 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-700"></div>
                    </div>
                )}
                <span className="text-text-secondary text-sm">
                    {t("hero.available")}
                </span>
                <a
                    href="/contact"
                    className="text-accent-blue text-sm font-medium hover:underline inline-flex items-center gap-1"
                >
                    {t("hero.learnMoreAvailability")}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
            </motion.div>

            <motion.div variants={fadeInUp}>
                <h1 className={`font-heading ${isDesktop ? "text-4xl sm:text-5xl xl:text-6xl" : "text-3xl sm:text-4xl md:text-5xl"} font-bold text-text-primary leading-tight`}>
                    {t("hero.title")}
                </h1>
                <h2 className={`font-heading ${isDesktop ? "text-3xl sm:text-4xl xl:text-5xl -mt-5" : "text-2xl sm:text-3xl md:text-4xl"} font-bold text-accent-yellow leading-tight`}>
                    {t("hero.subtitle")}
                </h2>
            </motion.div>

            <motion.p
                variants={fadeInUp}
                className={`text-text-primary/85 text-base ${isDesktop ? "md:text-lg text-justify max-w-lg" : ""} leading-relaxed`}
            >
                {t("hero.description")}
            </motion.p>

            <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-4 pt-2"
            >
                <MagneticButton href="/contact" backgroundColor="var(--color-yellow)" style={{ fontWeight: 600, backgroundColor: 'var(--color-yellow)' }}>
                    {t("common.getInTouch")}
                </MagneticButton>
                <FillButton href={isDesktop ? "/about" : "/projects"} fillColor="var(--color-foreground)" className="group">
                    {isDesktop ? t("hero.getToKnowMe") : t("common.viewWork")}
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2 inline-block transition-transform group-hover:translate-x-1"
                    >
                        <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </FillButton>
            </motion.div>
        </motion.div>
    );
}


export function HeroSection() {
    return (
        <section className="relative min-h-screen">
            <div className="hidden md:flex min-h-screen">
                <div className="relative w-1/2 min-h-screen flex items-center">
                    <div className="relative w-full flex flex-col items-center justify-center">
                        <HeroContent mode="desktop" />
                    </div>
                </div>

                <motion.div
                    className="relative w-1/2 min-h-screen"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                >
                    <TiltCard
                        className="w-full h-full [clip-path:polygon(20%_0,100%_0,100%_100%,0%_100%)] backface-visible"
                        intensity={40}
                        glowOpacity={0.4}
                        glowColor="rgba(255,255,255,0.4)"
                    >
                        <div
                            className="absolute inset-0 w-full h-full"
                            data-cursor-text={profile.name}
                        >
                            <Image
                                src="/assets/images/me-coding.jpg"
                                alt={profile.name}
                                fill
                                className="object-cover object-center"
                                priority
                                sizes="50vw"
                            />
                        </div>
                    </TiltCard>
                </motion.div>
            </div>

            <div className="md:hidden min-h-screen flex flex-col">
                <div className="relative flex-1 flex items-center px-6 sm:px-8 pt-24 pb-12">
                    <HeroContent mode="mobile" />
                </div>
            </div>

            <div className="block md:hidden absolute bottom-5 right-2 z-20">
                <ScrollMouse />
            </div>
            <div className="hidden md:block absolute bottom-10 left-10 z-20">
                <ScrollMouse />
                <p className="text-text-secondary text-xs uppercase font-medium mt-2">Scroll down</p>
            </div>
        </section>
    );
}
