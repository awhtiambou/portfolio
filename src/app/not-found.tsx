"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { FiArrowLeft } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useHydrated } from "@/hooks";

const HORIZON_PCT = 50;

// sin-seeded deterministic positions so SSR matches client
const STARS = Array.from({ length: 90 }, (_, i) => ({
    id: i,
    x: (((Math.sin(i * 47.31 + 1) + 1) / 2) * 100).toFixed(3),
    y: (((Math.sin(i * 31.71 + 2) + 1) / 2) * 48).toFixed(3),
    r: (((Math.sin(i * 19.13) + 1) / 2) * 1.4 + 0.3).toFixed(3),
    o: (((Math.sin(i * 7.37) + 1) / 2) * 0.5 + 0.15).toFixed(3),
    delay: (((Math.sin(i * 13.71) + 1) / 2) * 4).toFixed(3),
    dur: (((Math.sin(i * 23.11) + 1) / 2) * 3 + 2.5).toFixed(3),
}));

function Stars() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
            {STARS.map((s) => (
                <motion.div
                    key={s.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                        width: +s.r,
                        height: +s.r,
                        opacity: +s.o,
                    }}
                    animate={{ opacity: [+s.o, +s.o * 0.07, +s.o] }}
                    transition={{
                        duration: +s.dur,
                        delay: +s.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

function ShootingStar() {
    const [idx, setIdx] = useState(0);
    const [pos, setPos] = useState({ x: 15, y: 8 });
    useEffect(() => {
        let tid: ReturnType<typeof setTimeout>;
        const fire = () => {
            tid = setTimeout(() => {
                setPos({ x: 8 + Math.random() * 55, y: 4 + Math.random() * 22 });
                setIdx((n) => n + 1);
                fire();
            }, 4500 + Math.random() * 6000);
        };
        fire();
        return () => clearTimeout(tid);
    }, []);

    return (
        <div
            className="absolute pointer-events-none"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, zIndex: 5 }}
            aria-hidden
        >
            <motion.div
                key={idx}
                initial={{ opacity: 0, scaleX: 0, x: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], scaleX: 1, x: 80, y: 40 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                style={{
                    width: 85,
                    height: 1.5,
                    borderRadius: 2,
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.92))",
                    transformOrigin: "left center",
                }}
            />
        </div>
    );
}

function FourOhFour({ isDark }: { isDark: boolean }) {
    return (
        <motion.div
            initial={{ y: 55, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative", userSelect: "none" }}
        >
            <div
                aria-hidden
                style={{
                    position: "absolute",
                    top: "45%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "clamp(80px, 12vw, 200px)",
                    height: "clamp(80px, 12vw, 200px)",
                    background: isDark
                        ? "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(200,210,255,0.35) 30%, transparent 65%)"
                        : "radial-gradient(circle, rgba(255,255,240,0.9) 0%, rgba(255,220,120,0.4) 30%, transparent 65%)",
                    borderRadius: "50%",
                    filter: "blur(14px)",
                    zIndex: -1,
                    pointerEvents: "none",
                }}
            />

            <span
                className="font-heading font-black block text-center"
                style={{
                    fontSize: "clamp(7rem, 24vw, 20rem)",
                    letterSpacing: "-0.025em",
                    lineHeight: 0.86,
                    color: isDark ? "#d8d8f0" : "#8b6914",
                    textShadow: isDark
                        ? [
                            "0 0 40px rgba(200,210,255,0.75)",
                            "0 0 90px rgba(175,185,255,0.4)",
                            "0 0 160px rgba(150,160,255,0.2)",
                            "0 6px 16px rgba(0,0,0,0.6)",
                        ].join(", ")
                        : [
                            "0 0 40px rgba(255,210,60,0.6)",
                            "0 0 90px rgba(255,180,20,0.3)",
                            "0 0 160px rgba(255,140,0,0.15)",
                            "0 6px 16px rgba(60,30,0,0.4)",
                        ].join(", "),
                }}
            >
                404
            </span>
        </motion.div>
    );
}

// SVG ellipse planet — cx/cy pushed below viewBox so only the arc crown shows
const VB_W = 1600;
const VB_H = 800;
const CX = VB_W / 2;
const CY = 900;
const RX = 1100;
const RY = 880;

function PlanetWithGlow({ isDark }: { isDark: boolean }) {
    return (
        <motion.div
            className="absolute left-0 right-0 pointer-events-none"
            aria-hidden
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
                top: `${HORIZON_PCT}%`,
                bottom: 0,
                zIndex: 15,
            }}
        >
            <svg
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                preserveAspectRatio="xMidYMin slice"
                className="absolute inset-0 w-full h-full"
                style={{ overflow: "visible" }}
            >
                <defs>
                    <radialGradient id="planetFill" cx="50%" cy="0%" r="60%" gradientUnits="objectBoundingBox">
                        {isDark ? (
                            <>
                                <stop offset="0%" stopColor="#1c1c38" />
                                <stop offset="20%" stopColor="#14142c" />
                                <stop offset="45%" stopColor="#0c0c20" />
                                <stop offset="100%" stopColor="#050512" />
                            </>
                        ) : (
                            <>
                                <stop offset="0%" stopColor="#c8a860" />
                                <stop offset="20%" stopColor="#b0904a" />
                                <stop offset="45%" stopColor="#8c7038" />
                                <stop offset="100%" stopColor="#5a3e1c" />
                            </>
                        )}
                    </radialGradient>

                    <linearGradient id="rimGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        {isDark ? (
                            <>
                                <stop offset="20%" stopColor="rgba(160,170,255,0.35)" />
                                <stop offset="50%" stopColor="rgba(220,225,255,0.8)" />
                                <stop offset="80%" stopColor="rgba(160,170,255,0.35)" />
                            </>
                        ) : (
                            <>
                                <stop offset="20%" stopColor="rgba(255,210,80,0.4)" />
                                <stop offset="50%" stopColor="rgba(255,250,200,0.85)" />
                                <stop offset="80%" stopColor="rgba(255,210,80,0.4)" />
                            </>
                        )}
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>

                    <filter id="glowSmall" x="-30%" y="-50%" width="160%" height="200%">
                        <feGaussianBlur stdDeviation="18" />
                    </filter>
                    <filter id="glowMed" x="-40%" y="-60%" width="180%" height="220%">
                        <feGaussianBlur stdDeviation="35" />
                    </filter>
                    <filter id="glowLarge" x="-50%" y="-80%" width="200%" height="260%">
                        <feGaussianBlur stdDeviation="55" />
                    </filter>
                </defs>

                {/* atmospheric glow layers */}
                <ellipse
                    cx={CX} cy={CY} rx={RX * 0.85} ry={RY * 0.85}
                    fill="none"
                    stroke={isDark ? "rgba(120,130,220,0.12)" : "rgba(255,210,100,0.18)"}
                    strokeWidth="80"
                    filter="url(#glowLarge)"
                />
                <ellipse
                    cx={CX} cy={CY} rx={RX} ry={RY}
                    fill="none"
                    stroke={isDark ? "rgba(170,180,255,0.18)" : "rgba(255,220,120,0.25)"}
                    strokeWidth="40"
                    filter="url(#glowMed)"
                />
                <ellipse
                    cx={CX} cy={CY} rx={RX * 0.4} ry={RY * 0.4}
                    fill={isDark ? "rgba(200,210,255,0.2)" : "rgba(255,240,180,0.3)"}
                    filter="url(#glowMed)"
                />

                {/* planet body — opaque, clips 404 text behind it */}
                <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="url(#planetFill)" />

                {/* specular highlight + rim stroke */}
                <ellipse
                    cx={CX} cy={CY - RY + 12} rx={RX * 0.3} ry={20}
                    fill={isDark ? "rgba(255,255,255,0.1)" : "rgba(255,250,220,0.2)"}
                    filter="url(#glowSmall)"
                />
                <ellipse
                    cx={CX} cy={CY} rx={RX} ry={RY}
                    fill="none"
                    stroke="url(#rimGlow)"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                />

                {/* glow pool under 404 */}
                <ellipse
                    cx={CX} cy={CY - RY + 50}
                    rx={300} ry={40}
                    fill={isDark ? "rgba(180,190,255,0.1)" : "rgba(255,220,100,0.15)"}
                    filter="url(#glowSmall)"
                />
            </svg>
        </motion.div>
    );
}

export default function NotFound() {
    const t = useTranslations("notFound");
    const { resolvedTheme } = useTheme();
    const hydrated = useHydrated();
    const isDark = !hydrated || resolvedTheme !== "light";

    return (
        <main
            className="relative overflow-hidden"
            style={{ height: "100svh" }}
            aria-label="404 — Page not found"
        >
            <div
                className="absolute inset-0"
                style={{
                    background: isDark
                        ? "radial-gradient(ellipse at 50% 20%, #1c1c38 0%, #0d0d20 42%, #050510 100%)"
                        : [
                            "linear-gradient(180deg,",
                            " #3a7cc4 0%,",
                            " #5a9ad8 8%,",
                            " #88bde8 18%,",
                            " #aed4f2 30%,",
                            " #c8dce8 42%,",
                            " #d8d0b8 54%,",
                            " #d4b87c 66%,",
                            " #c8a050 78%,",
                            " #b88830 100%)",
                        ].join(""),
                }}
            />

            {isDark && <Stars />}
            {isDark && <ShootingStar />}

            <div
                className="absolute left-0 right-0 flex flex-col items-center justify-center text-center px-6"
                style={{ top: 0, height: `${HORIZON_PCT - 6}%`, zIndex: 20 }}
            >
                <motion.h1
                    className="font-heading font-black uppercase mb-3"
                    style={{
                        fontSize: "clamp(1.05rem, 3.4vw, 2.5rem)",
                        letterSpacing: "0.2em",
                        lineHeight: 1.12,
                        color: isDark ? "rgba(228,230,255,0.93)" : "rgba(36,18,0,0.88)",
                        fontWeight: 800,
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.12 }}
                >
                    {t("title")}
                </motion.h1>

                <motion.p
                    className="mb-8 max-w-sm"
                    style={{
                        fontSize: "clamp(0.78rem, 1.5vw, 0.9rem)",
                        lineHeight: 1.65,
                        color: isDark ? "rgba(182,188,232,0.48)" : "rgba(62,36,4,0.55)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.22 }}
                >
                    {t("subtitle")}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.34 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2.5 rounded-full font-medium transition-all duration-300 focus-visible:outline-none"
                        style={{
                            fontSize: "clamp(0.78rem, 1.4vw, 0.875rem)",
                            padding: "0.7em 1.7em",
                            background: isDark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.52)",
                            border: isDark
                                ? "1px solid rgba(255,255,255,0.13)"
                                : "1px solid rgba(145,85,5,0.28)",
                            color: isDark ? "rgba(255,255,255,0.88)" : "rgba(48,22,0,0.88)",
                            backdropFilter: "blur(18px)",
                            WebkitBackdropFilter: "blur(18px)",
                            boxShadow: isDark
                                ? "0 2px 18px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)"
                                : "0 2px 18px rgba(175,110,0,0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
                        }}
                        onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.background = isDark ? "rgba(255,255,255,0.13)" : "rgba(255,255,255,0.72)";
                            el.style.borderColor = isDark ? "rgba(255,255,255,0.26)" : "rgba(145,85,5,0.45)";
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.background = isDark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.52)";
                            el.style.borderColor = isDark ? "rgba(255,255,255,0.13)" : "rgba(145,85,5,0.28)";
                        }}
                    >
                        <motion.span
                            animate={{ x: [0, -3, 0] }}
                            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                        >
                            <FiArrowLeft className="w-4 h-4" />
                        </motion.span>
                        {t("goHome")}
                    </Link>
                </motion.div>
            </div>

            {/* z-index 12 < planet's 15, so the arc clips the bottom of 404 */}
            <div
                className="absolute left-0 right-0 flex justify-center items-center px-4"
                style={{
                    top: `${HORIZON_PCT}%`,
                    transform: "translateY(-60%)",
                    zIndex: 12,
                }}
            >
                <FourOhFour isDark={isDark} />
            </div>

            <PlanetWithGlow isDark={isDark} />
        </main>
    );
}
