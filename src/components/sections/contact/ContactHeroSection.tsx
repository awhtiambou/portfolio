"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { SplitText, VelocitySkew, RevealText } from "@/components/scroll";
import { Text } from "@/components/ui";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ContactHeroSection() {
    const t = useTranslations("contact");
    const containerRef = useRef<HTMLDivElement>(null);
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.75]);

    return (
        <div ref={containerRef} className="relative w-full h-[75vh] overflow-hidden">
            <motion.div className="absolute inset-0" style={{ y: imageY }}>
                <Image
                    src="/assets/images/me-coding.jpg"
                    alt={t("hero.imageAlt")}
                    fill
                    className="object-cover scale-110"
                    priority
                    sizes="100vw"
                />
            </motion.div>

            <motion.div
                className="absolute inset-0 bg-black"
                style={{ opacity: overlayOpacity }}
            />

            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                <motion.p
                    className={cn(
                        "text-xs font-mono uppercase tracking-[0.25em] mb-4",
                        isDark ? "text-accent-yellow" : "text-accent-blue",
                    )}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {t("subtitle")}
                </motion.p>

                <motion.h1
                    className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <VelocitySkew maxSkew={3} className="inline-block">
                        <SplitText type="chars" animation="wave" staggerDelay={0.03}>
                            {t("title")}
                        </SplitText>
                    </VelocitySkew>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="max-w-2xl"
                >
                    <RevealText direction="up" delay={0.6} duration={0.8}>
                        <Text size="lg" className="text-white/80">
                            {t("hero.description")}
                        </Text>
                    </RevealText>
                </motion.div>
            </div>
        </div>
    );
}
