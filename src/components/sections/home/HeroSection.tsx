"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";
import { MagneticButton, FillButton, ScrollMouse, TiltCard } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ScrollText, SplitText, RevealText } from "@/components/scroll";
import { profile } from "@/data/profile";
import { MdArrowForward } from "react-icons/md";
import { useTheme } from "next-themes";
import { useHydrated, useInteractionProfile } from "@/hooks";


function HeroContent({ mode }: { mode: "desktop" | "mobile" }) {
    const t = useTranslations();
    const isDesktop = mode === "desktop";
    const { resolvedTheme } = useTheme();
    const hydrated = useHydrated();
    const isDark = !hydrated || resolvedTheme !== "light";
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
                    <ScrollText 
                        className="inline-block"
                        skewIntensity={0.25}
                        scaleIntensity={0.03}
                    >
                        {t("hero.title")}
                    </ScrollText>
                </h1>
                <h2 className={`font-heading ${isDesktop ? "text-3xl sm:text-4xl xl:text-5xl -mt-5" : "text-2xl sm:text-3xl md:text-4xl"} font-bold text-accent-yellow leading-tight`}>
                    <SplitText
                        type="chars"
                        animation="wave"
                        staggerDelay={0.03}
                        className="inline-block"
                    >
                        {t("hero.subtitle")}
                    </SplitText>
                </h2>
            </motion.div>

            <motion.div variants={fadeInUp}>
                <RevealText
                    className={`text-text-primary/85 text-base text-justify ${isDesktop ? "md:text-lg max-w-lg" : ""} leading-relaxed`}
                    direction="up"
                    delay={0.3}
                >
                    {t("hero.description")}
                </RevealText>
            </motion.div>

            <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-4 pt-2"
            >
                <MagneticButton href="/contact" backgroundColor={isDark ? "var(--color-yellow)" : "var(--color-blue)"} style={{ fontWeight: 600, backgroundColor: isDark ? 'var(--color-yellow)' : 'var(--color-blue)', color: isDark ? 'var(--color-foreground)' : 'var(--color-foreground)' }} className="font-mono font-medium">
                    {t("common.getInTouch")}
                </MagneticButton>
                <FillButton href="/about" fillColor="var(--color-foreground)" className="group font-mono font-medium">
                    {t("hero.getToKnowMe")}
                    <MdArrowForward className="ml-2 inline-block transition-transform duration-400 group-hover:translate-x-2" />
                </FillButton>
            </motion.div>
        </motion.div>
    );
}

function HeroImageFrame({ interactive }: { interactive: boolean }) {
    const image = (
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
    );

    if (!interactive) {
        return (
            <div className="relative w-full h-full overflow-hidden [clip-path:polygon(20%_0,100%_0,100%_100%,0%_100%)]">
                {image}
            </div>
        );
    }

    return (
        <TiltCard
            className="w-full h-full [clip-path:polygon(20%_0,100%_0,100%_100%,0%_100%)] backface-visible"
            intensity={40}
            glowOpacity={0.4}
            glowColor="rgba(255,255,255,0.4)"
        >
            {image}
        </TiltCard>
    );
}

function RichHeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });
    
    // Parallax transforms for image
    const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
    
    return (
        <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
            <div className="hidden md:flex min-h-screen">
                <motion.div 
                    className="relative w-1/2 min-h-screen flex items-center"
                    style={{ opacity: contentOpacity, y: contentY }}
                >
                    <div className="relative w-full flex flex-col items-center justify-center">
                        <HeroContent mode="desktop" />
                    </div>
                </motion.div>

                <motion.div
                    className="relative w-1/2 min-h-screen"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                >
                    <motion.div 
                        className="w-full h-full"
                        style={{ y: imageY, scale: imageScale }}
                    >
                        <HeroImageFrame interactive />
                    </motion.div>
                </motion.div>
            </div>

            <div className="md:hidden min-h-screen flex flex-col">
                <motion.div 
                    className="relative flex-1 flex items-center px-6 sm:px-8 pt-24 pb-12"
                    style={{ opacity: contentOpacity, y: contentY }}
                >
                    <HeroContent mode="mobile" />
                </motion.div>
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

function LiteHeroSection() {
    return (
        <section className="relative min-h-screen overflow-hidden">
            <div className="hidden md:flex min-h-screen">
                <motion.div
                    className="relative w-1/2 min-h-screen flex items-center"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="relative w-full flex flex-col items-center justify-center">
                        <HeroContent mode="desktop" />
                    </div>
                </motion.div>

                <motion.div
                    className="relative w-1/2 min-h-screen"
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="w-full h-full">
                        <HeroImageFrame interactive={false} />
                    </div>
                </motion.div>
            </div>

            <div className="md:hidden min-h-screen flex flex-col">
                <motion.div
                    className="relative flex-1 flex items-center px-6 sm:px-8 pt-24 pb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <HeroContent mode="mobile" />
                </motion.div>
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

export function HeroSection() {
    const { useLiteAnimations } = useInteractionProfile();

    return useLiteAnimations ? <LiteHeroSection /> : <RichHeroSection />;
}
