"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import { colors } from "@/config/theme";

export function GlobalBackground() {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);

    // Connect to scroll for parallax effect
    const { scrollYProgress } = useScroll();

    // Smooth out the scroll value
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const y1 = useTransform(smoothProgress, [0, 1], [0, -100]);
    const y2 = useTransform(smoothProgress, [0, 1], [0, -50]);
    const rotate1 = useTransform(smoothProgress, [0, 1], [0, 45]);
    const scale1 = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.2, 1]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === "dark";
    const bgColors = colors.accents;


    if (!mounted) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none"
            style={{
                backgroundColor: isDark ? colors.dark.primary : colors.light.primary,
                transition: "background-color 0.5s ease"
            }}
        >
            <motion.div
                className="absolute inset-0 opacity-60 dark:opacity-40"
                style={{ y: y1 }}
            >
                <motion.div
                    className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-[100px] opacity-40 mix-blend-screen"
                    style={{ backgroundColor: bgColors.yellow }}
                />

                <motion.div
                    className="absolute top-[5%] -right-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-30 mix-blend-screen"
                    style={{ backgroundColor: bgColors.pink, y: y2, scale: scale1 }}
                />

                <motion.div
                    className="absolute bottom-[0%] -left-[5%] w-[55vw] h-[55vw] rounded-full blur-[110px] opacity-30 mix-blend-screen"
                    style={{ backgroundColor: bgColors.mint, rotate: rotate1 }}
                />

                <motion.div
                    className="absolute -bottom-[10%] right-[0%] w-[65vw] h-[65vw] rounded-full blur-[130px] opacity-40 mix-blend-screen"
                    style={{ backgroundColor: bgColors.blue }}
                />

                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full blur-[90px] opacity-20"
                    style={{ backgroundColor: isDark ? bgColors.blue : bgColors.yellow }}
                />
            </motion.div>

            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    opacity: isDark ? 0.35 : 0.95,
                    mixBlendMode: isDark ? "overlay" : "soft-light",
                }}
            >
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noiseFilter">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.55"
                            numOctaves="4"
                            stitchTiles="stitch"
                        />
                        <feColorMatrix type="saturate" values="0" />
                        <feComponentTransfer>
                            <feFuncR type="linear" slope="3" intercept="-1" />
                            <feFuncG type="linear" slope="3" intercept="-1" />
                            <feFuncB type="linear" slope="3" intercept="-1" />
                        </feComponentTransfer>
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>
        </div>
    );
}
