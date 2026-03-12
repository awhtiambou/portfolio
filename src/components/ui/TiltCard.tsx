"use client";

import React, { useRef } from "react";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
    glowSize?: number;
    glowColor?: string;
    glowOpacity?: number;
}

export const TiltCard = ({
    children,
    className,
    intensity = 20, // Lower is more intense tilts
    glowSize = 600,
    glowColor = "rgba(255, 255, 255, 0.3)",
    glowOpacity = 1,
}: TiltCardProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

    const transform = useMotionTemplate`perspective(1000px) rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const bg = useMotionTemplate`radial-gradient(
    ${glowSize}px circle at ${mouseX}px ${mouseY}px,
    ${glowColor},
    transparent 80%
  )`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const rotX = (e.clientY - rect.top - height / 2) / intensity;
        const rotY = (e.clientX - rect.left - width / 2) / intensity;

        x.set(-rotX);
        y.set(rotY);

        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform,
            }}
            className={cn("group relative", className)}
        >
            <div
                className="relative h-full w-full [transform-style:preserve-3d]"
            >
                {children}

                <motion.div
                    style={{
                        background: bg,
                        opacity: glowOpacity,
                    }}
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-[inherit] z-20 mix-blend-overlay"
                />

                <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-[inherit] z-20"
                />
            </div>
        </motion.div>
    );
};
