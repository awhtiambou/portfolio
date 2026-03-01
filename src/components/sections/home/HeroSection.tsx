"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { MagneticButton, FillButton, ScrollMouse, TiltCard } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { profile } from "@/data/profile";

export function HeroSection() {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();
    const t = useTranslations();

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === "dark";

    return (
        <section className="relative min-h-screen">
            {/* Desktop Layout */}
            <div className="hidden md:flex min-h-screen">
                {/* Left Side - Content */}
                <div className="relative w-1/2 min-h-screen flex items-center">
                    {/* Content */}
                    <div className="relative w-full flex flex-col items-center justify-center">
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="space-y-6"
                        >
                            {/* Availability Badge */}
                            <motion.div
                                variants={fadeInUp}
                                className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-text-muted/20 bg-background-secondary/50"
                            >
                                <div className="w-4 h-4 rounded-full bg-green-200 flex items-center justify-center">
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-700"></div>
                                </div>
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

                            {/* Main Title */}
                            <motion.div variants={fadeInUp}>
                                <h1 className="font-heading text-4xl sm:text-5xl xl:text-6xl font-bold text-text-primary leading-tight">
                                    {t("hero.title")}
                                </h1>
                                <h2 className="font-heading text-3xl sm:text-4xl xl:text-5xl font-bold text-accent-yellow leading-tight -mt-5">
                                    {t("hero.subtitle")}
                                </h2>
                            </motion.div>

                            {/* Description */}
                            <motion.p
                                variants={fadeInUp}
                                className="text-text-primary/85  text-base md:text-lg leading-relaxed max-w-lg text-justify"
                            >
                                {t("hero.description")}
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                variants={fadeInUp}
                                className="flex flex-wrap gap-4 pt-2"
                            >
                                <MagneticButton href="/contact" backgroundColor="var(--color-yellow)" style={{ fontWeight: 600, backgroundColor: 'var(--color-yellow)' }}>
                                    {t("common.getInTouch")}
                                </MagneticButton>
                                <FillButton href="/about" fillColor="var(--color-foreground)" className="group">
                                    {t("hero.getToKnowMe")}
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
                    </div>
                </div>

                {/* Right Side - Image with Diagonal Clip & Tilt */}
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

            {/* Mobile/Tablet Layout */}
            <div className="md:hidden min-h-screen flex flex-col">
                {/* Content Section */}
                <div className="relative flex-1 flex items-center px-6 sm:px-8 pt-24 pb-12">

                    {/* Content */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="relative z-10 space-y-4 md:space-y-6 max-w-xl"
                    >
                        {/* Availability Badge */}
                        <motion.div
                            variants={fadeInUp}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-text-muted/20 bg-background-secondary/50"
                        >
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

                        {/* Main Title */}
                        <motion.div variants={fadeInUp}>
                            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight">
                                {t("hero.title")}
                            </h1>
                            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-accent-pink leading-tight">
                                {t("hero.subtitle")}
                            </h2>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            variants={fadeInUp}
                            className="text-text-secondary text-base leading-relaxed"
                        >
                            {t("hero.description")}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-wrap gap-4 pt-2"
                        >
                            <MagneticButton backgroundColor="var(--color-yellow)" href="/contact">
                                {t("common.getInTouch")}
                            </MagneticButton>
                            <FillButton href="/projects" fillColor="var(--color-foreground)" className="group">
                                {t("common.viewWork")}
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
                </div>

            </div>
            {/* Scroll Mouse Indicator for Mobile */}
            <div className="block md:hidden absolute bottom-5 right-2 z-20">
                <ScrollMouse />
            </div>
            {/* Scroll Mouse Indicator for Desktop */}
            <div className="hidden md:block absolute bottom-10 left-10 z-20">
                <ScrollMouse />
                <p className="text-text-secondary text-xs uppercase font-medium mt-2">Scroll down</p>
            </div>
        </section>
    );
}
