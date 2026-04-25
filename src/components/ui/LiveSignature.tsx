"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useHydrated } from "@/hooks";

interface LiveSignatureProps {
    className?: string;
    color?: string;
    accent1?: string;
    accent2?: string;
}

export function LiveSignature({ className = "", color, accent1, accent2 }: LiveSignatureProps) {
    const { resolvedTheme } = useTheme();
    const hydrated = useHydrated();

    // Determine colors based on theme
    const isDark = hydrated && resolvedTheme === "dark";
    const mainColor = color || (isDark ? "#FFFFFF" : "#1a1a1a");
    const accentColor1 = accent1 || (isDark ? "#4ECDC4" : "#FF6B8A"); // Mint/Pink
    const accentColor2 = accent2 || (isDark ? "#F5A623" : "#4ECDC4"); // Yellow/Blue

    return (
        <div className={`relative w-full flex items-center justify-center select-none overflow-hidden ${className}`}>
            <svg
                viewBox="0 0 1000 300"
                className="w-full h-full max-w-[1400px]"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* 
          Layer 1: Accent Stroke (Echo) 
          Draws first, slightly offset, with color
        */}
                <motion.text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="transparent"
                    stroke={accentColor2}
                    strokeWidth="3"
                    strokeDasharray="2000"
                    strokeDashoffset="2000"
                    style={{
                        fontFamily: "var(--font-signature)",
                        fontSize: "280px",
                        opacity: 0.3
                    }}
                    initial={{ strokeDashoffset: 2000 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{
                        duration: 4,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                >
                    Tiambou
                </motion.text>

                {/* 
          Layer 2: Another Accent (Offset)
        */}
                <motion.text
                    x="51%"
                    y="51%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="transparent"
                    stroke={accentColor1}
                    strokeWidth="3"
                    strokeDasharray="2000"
                    strokeDashoffset="2000"
                    style={{
                        fontFamily: "var(--font-signature)",
                        fontSize: "280px",
                        opacity: 0.3
                    }}
                    initial={{ strokeDashoffset: 2000 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{
                        duration: 4,
                        ease: "easeInOut",
                        delay: 1
                    }}
                >
                    Tiambou
                </motion.text>

                {/* 
          Layer 3: Main White/Black Stroke (The foreground signature) 
        */}
                <motion.text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="transparent"
                    stroke={mainColor}
                    strokeWidth="4"
                    strokeDasharray="2000"
                    style={{
                        fontFamily: "var(--font-signature)",
                        fontSize: "280px",
                        filter: "url(#glow)"
                    }}
                    initial={{ strokeDashoffset: 2000 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{
                        duration: 3.5,
                        ease: "easeInOut",
                        delay: 0
                    }}
                >
                    Tiambou
                </motion.text>

                {/* 
          Layer 4: Final Fill (Fade In) 
        */}
                <motion.text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={mainColor}
                    stroke="none"
                    style={{
                        fontFamily: "var(--font-signature)",
                        fontSize: "280px",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isDark ? 0.1 : 0.05 }}
                    transition={{
                        duration: 2,
                        delay: 3.5
                    }}
                >
                    Tiambou
                </motion.text>
            </svg>
        </div>
    );
}
