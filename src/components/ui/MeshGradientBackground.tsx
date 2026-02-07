"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

interface MeshGradientBackgroundProps {
    /** Whether to show the handwritten name watermark */
    showWatermark?: boolean;
    /** Custom class names for the container */
    className?: string;
    /** Whether to enable animated orbs */
    animated?: boolean;
}

export function MeshGradientBackground({
    showWatermark = true,
    className = "",
    animated = true,
}: MeshGradientBackgroundProps) {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === "dark";

    // Theme-aware gradient configurations
    const gradientConfig = {
        // Primary mesh gradient overlay
        meshGradient: isDark
            ? `
          radial-gradient(ellipse 80% 50% at 20% 40%, rgba(139, 92, 246, 0.25) 0%, transparent 50%),
          radial-gradient(ellipse 60% 40% at 80% 20%, rgba(78, 205, 196, 0.2) 0%, transparent 50%),
          radial-gradient(ellipse 50% 60% at 60% 80%, rgba(255, 107, 138, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse 70% 50% at 30% 70%, rgba(46, 204, 113, 0.12) 0%, transparent 50%)
        `
            : `
          radial-gradient(ellipse 90% 60% at 0% 50%, rgba(78, 205, 196, 0.25) 0%, transparent 60%),
          radial-gradient(ellipse 80% 50% at 100% 50%, rgba(255, 182, 193, 0.2) 0%, transparent 60%)
        `,

        // Animated orb colors
        orbs: isDark
            ? {
                primary: "radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)",
                secondary: "radial-gradient(circle, rgba(78, 205, 196, 0.3) 0%, rgba(78, 205, 196, 0.08) 40%, transparent 70%)",
                accent: "radial-gradient(circle, rgba(255, 107, 138, 0.25) 0%, rgba(255, 107, 138, 0.06) 40%, transparent 70%)",
            }
            : {
                primary: "radial-gradient(circle, rgba(78, 205, 196, 0.18) 0%, rgba(78, 205, 196, 0.05) 40%, transparent 70%)",
                secondary: "radial-gradient(circle, rgba(255, 182, 193, 0.15) 0%, rgba(255, 182, 193, 0.04) 40%, transparent 70%)",
                accent: "radial-gradient(circle, rgba(78, 205, 196, 0.12) 0%, transparent 60%)",
            },

        // Shape colors
        shapes: {
            stroke: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(78, 205, 196, 0.2)",
            fill: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(78, 205, 196, 0.06)",
            accent: isDark ? "rgba(139, 92, 246, 0.15)" : "rgba(255, 182, 193, 0.15)",
        },

        // Watermark text styling
        watermark: {
            color: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.05)",
            strokeColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
        },
    };

    const backgroundColor = isDark ? "#222222" : "#FFFFFF";

    return (
        <div
            className={`absolute inset-0 overflow-hidden transition-colors duration-500 ${className}`}
            style={{ backgroundColor }}
        >
            {/* Static mesh gradient layer */}
            <div
                className="absolute inset-0 transition-all duration-700"
                style={{ background: gradientConfig.meshGradient }}
            />

            {/* Animated gradient orbs */}
            {animated && (
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute -top-1/4 -left-1/4 w-[70%] h-[70%] rounded-full"
                        style={{ background: gradientConfig.orbs.primary, filter: "blur(60px)" }}
                        animate={{ x: [0, 100, 50, 0], y: [0, 50, 100, 0], scale: [1, 1.1, 0.95, 1] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute top-0 -right-1/4 w-[60%] h-[60%] rounded-full"
                        style={{ background: gradientConfig.orbs.secondary, filter: "blur(50px)" }}
                        animate={{ x: [0, -80, -40, 0], y: [0, 80, 40, 0], scale: [1, 0.9, 1.1, 1] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute -bottom-1/4 left-1/4 w-[55%] h-[55%] rounded-full"
                        style={{ background: gradientConfig.orbs.accent, filter: "blur(55px)" }}
                        animate={{ x: [0, 60, -40, 0], y: [0, -50, 60, 0], scale: [1, 1.15, 0.9, 1] }}
                        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            )}

            {/* Animated Geometric Shapes - Various types */}
            {animated && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">

                    {/* CIRCLE - Large, partially off-screen top-left */}
                    <motion.div
                        className="absolute"
                        style={{
                            top: "-180px",
                            left: "-100px",
                            width: "400px",
                            height: "400px",
                            borderRadius: "50%",
                            border: `1.5px solid ${gradientConfig.shapes.stroke}`,
                            background: gradientConfig.shapes.fill,
                        }}
                        animate={{ y: [0, 20, 0], rotate: [0, 360] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    />

                    {/* TRIANGLE - Floating in center-right */}
                    <motion.div
                        className="absolute"
                        style={{
                            top: "20%",
                            right: "15%",
                            width: 0,
                            height: 0,
                            borderLeft: "40px solid transparent",
                            borderRight: "40px solid transparent",
                            borderBottom: `70px solid ${gradientConfig.shapes.fill}`,
                            filter: `drop-shadow(0 0 0 ${gradientConfig.shapes.stroke})`,
                        }}
                        animate={{ y: [0, -25, 0], rotate: [0, 15, 0] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* DIAMOND (rotated square) - Center */}
                    <motion.div
                        className="absolute"
                        style={{
                            top: "50%",
                            left: "50%",
                            width: "80px",
                            height: "80px",
                            border: `1px solid ${gradientConfig.shapes.stroke}`,
                            transform: "translate(-50%, -50%) rotate(45deg)",
                        }}
                        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* CIRCLE - Small filled dot */}
                    <motion.div
                        className="absolute"
                        style={{
                            top: "70%",
                            right: "40%",
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            background: gradientConfig.shapes.accent,
                        }}
                        animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* CIRCLE - Medium ring, partially off-screen left */}
                    <motion.div
                        className="absolute"
                        style={{
                            top: "60%",
                            left: "-50px",
                            width: "140px",
                            height: "140px",
                            borderRadius: "50%",
                            border: `1px solid ${gradientConfig.shapes.stroke}`,
                        }}
                        animate={{ x: [0, 20, 0], rotate: [0, -180, -360] }}
                        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Small scattered dots */}
                    {[
                        { top: "12%", left: "60%" },
                        { top: "80%", left: "45%" },
                        { top: "35%", right: "8%" },
                        { bottom: "10%", right: "60%" },
                    ].map((pos, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{
                                ...pos,
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                background: gradientConfig.shapes.stroke,
                            }}
                            animate={{ y: [0, -12, 0], opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
                        />
                    ))}
                </div>
            )}

            {/* Signature-style name watermark - Always fully visible */}
            {showWatermark && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden px-4">
                    <motion.div
                        className="relative select-none w-full flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8, rotate: -25 }}
                        animate={{ opacity: 1, scale: 1, rotate: -15 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        {/* Main watermark text - responsive sizing to always fit */}
                        <span
                            className="whitespace-nowrap text-center"
                            style={{
                                fontFamily: "var(--font-signature), cursive",
                                fontSize: "min(38vw, 500px)", // Always fits within viewport width
                                color: gradientConfig.watermark.color,
                                WebkitTextStroke: `1px ${gradientConfig.watermark.strokeColor}`,
                                letterSpacing: "0.01em",
                                lineHeight: 1,
                                display: "block",
                                fontWeight: 400,
                            }}
                        >
                            Tiambou
                        </span>
                    </motion.div>
                </div>
            )}

            {/* Subtle noise texture */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.012]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
}
