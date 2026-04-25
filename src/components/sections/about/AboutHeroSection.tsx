"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton, TiltCard, FillButton } from "@/components/ui";
import { RevealText, SplitText, ClipReveal } from "@/components/scroll";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { GoFileCode } from "react-icons/go";
import { MdArrowForward } from "react-icons/md";
import { useHydrated } from "@/hooks";


export function AboutHeroSection() {
    const t = useTranslations();
    const { resolvedTheme } = useTheme();
    const sectionRef = useRef<HTMLDivElement>(null);
    const hydrated = useHydrated();
    const isDark = !hydrated || resolvedTheme !== "light";

    // Parallax scroll effects for image
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
    const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

    return (
        <div ref={sectionRef} className="min-h-screen w-full flex justify-center items-center pt-28 overflow-hidden">
            <motion.div 
                className="app-container grid grid-cols-6 gap-8 place-items-center"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >

                <h1 className="hidden text-5xl font-bold text-center col-span-6 w-full">
                    {t("about.title")}
                </h1>

                {/* Image with parallax and reveal animation */}
                <motion.div
                    className="w-full text-center col-span-6 md:col-span-3 lg:col-span-2"
                    initial={{ opacity: 0, x: -100, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] as const, delay: 0.2 }}
                >
                    <motion.div
                        style={{ y: imageY, scale: imageScale, rotate: imageRotate }}
                    >
                        <ClipReveal delay={0.4} duration={1}>
                            <TiltCard 
                                glowOpacity={0.15} 
                                glowColor="rgba(255,255,255,0.3)"
                                className="aspect-[5/5] md:aspect-[4/5] overflow-hidden rounded-b-4xl md:rounded-b-xl rounded-t-4xl md:rounded-t-full"
                            >
                                <Image
                                    src="/assets/images/me-coding.jpg"
                                    alt="Abdoul"
                                    fill
                                    className="object-cover rounded-b-4xl md:rounded-b-xl"
                                    priority
                                />
                            </TiltCard>
                        </ClipReveal>
                    </motion.div>
                </motion.div>

                {/* Content with staggered animations */}
                <motion.div 
                    className="w-full text-justify col-span-6 md:col-span-3 lg:col-span-4 lg:pl-20"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Animated title */}
                    <motion.div variants={fadeInUp} className="mb-6">
                        <p className="text-xs font-mono uppercase tracking-[0.25em] text-text-muted mb-3">
                            <SplitText type="chars" animation="wave" staggerDelay={0.02}>
                                {t("about.subtitle")}
                            </SplitText>
                        </p>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary text-left">
                            <SplitText type="words" animation="slideUp" staggerDelay={0.1} className="inline-block">
                                {t("about.title")}
                            </SplitText>
                        </h2>
                    </motion.div>

                    {/* Bio paragraphs with staggered reveal */}
                    <motion.div 
                        className="space-y-4 font-base text-lg md:text-md max-w-2xl"
                        variants={fadeInUp}
                    >
                        <RevealText direction="up" delay={0.5} duration={0.8}>
                            <p>{t("about.bio1")}</p>
                        </RevealText>
                        <RevealText direction="up" delay={0.7} duration={0.8}>
                            <p>{t("about.bio2")}</p>
                        </RevealText>
                        <RevealText direction="up" delay={0.9} duration={0.8}>
                            <p>{t("about.bio3")}</p>
                        </RevealText>
                    </motion.div>

                    {/* CTA buttons */}
                    <motion.div 
                        className="mt-10 lg:mt-5 flex flex-wrap gap-5"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
                    >
                        <MagneticButton href="/contact" backgroundColor={isDark ? "var(--color-yellow)" : "var(--color-blue)"} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600, backgroundColor: isDark ? 'var(--color-yellow)' : 'var(--color-blue)', color: isDark ? 'var(--color-black)' : 'var(--color-foreground)' }} className="font-mono font-medium">
                            <GoFileCode className="text-lg" />
                            <span>{t("common.downloadMyResume")}</span>
                        </MagneticButton>
                        <FillButton href="/projects" fillColor="var(--color-foreground)" className="group font-mono font-medium">
                            {t("common.viewWork")}
                            <MdArrowForward className="ml-2 inline-block transition-transform duration-400 group-hover:translate-x-2" />
                        </FillButton>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
