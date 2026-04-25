"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTransition } from "@/providers/TransitionContext";
import { useTheme } from "next-themes";
import { LiveSignature } from "@/components/ui";
import { useHydrated } from "@/hooks";

const EASE = [0.76, 0, 0.24, 1] as const;

export function PageTransition() {
    const { isTransitioning } = useTransition();
    const { resolvedTheme } = useTheme();
    const hydrated = useHydrated();
    const isDark = !hydrated || resolvedTheme !== "light";
    const accentColor = isDark ? "#222222" : "#F8F8F8";
    const baseColor = isDark ? "#F5A623" : "#4ECDC4";

    return (
        <AnimatePresence mode="wait">
            {isTransitioning && (
                <>
                    {/* Layer 1 — base: slides up first, lingers, exits last */}
                    <motion.div
                        key="curtain-base"
                        className="fixed inset-0 pointer-events-none"
                        style={{ zIndex: 9998, backgroundColor: baseColor }}
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-100%" }}
                        transition={{
                            y: {
                                duration: 0.6,
                                ease: EASE,
                            },
                        }}
                    />

                    {/* Layer 2 — accent: enters with delay, exits first with its own curve */}
                    <motion.div
                        key="curtain-accent"
                        className="fixed inset-0 pointer-events-none overflow-hidden"
                        style={{ zIndex: 9999, backgroundColor: accentColor }}
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-100%", transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
                        transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
                    >
                        {/* Watermark Signature - Integrated exactly like in MenuDrawer */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] dark:opacity-[0.1] z-[2] overflow-visible"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isDark ? 0.5 : 0.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Huge container to ensure no clipping, rotated slightly */}
                            <div className="w-[150vw] h-[150vh] flex items-center justify-center transform -rotate-15 translate-y-32">
                                <LiveSignature className="w-full h-full" color={baseColor} accent1={baseColor} accent2={baseColor} />
                            </div>
                        </motion.div>

                        {/* noise texture */}
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
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
