"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    fillColor?: string;
    overlayTextColor?: string;
    backgroundColor?: string;
    textColor?: string;
    href?: string;
}

/**
 * A button with an outline that fills from left to right on hover.
 */
export function FillButton({
    children,
    className,
    fillColor = "#222222",
    overlayTextColor = "var(--color-background)",
    href,
    ...props
}: AnimatedButtonProps) {
    const Component = href ? Link : "button";

    return (
        <motion.div
            className="inline-block"
            whileTap={{ scale: 0.95 }}
        >
            {/* @ts-expect-error Link/button polymorphism shares a single render path here */}
            <Component
                href={href || ""}
                className={cn(
                    "relative overflow-hidden px-8 py-4 border-2 border-current rounded-full group inline-block",
                    className
                )}
                style={{ color: "var(--color-foreground)" }}
                {...props}
            >
                <span className="relative z-10 flex items-center gap-2 justify-center">
                    {children}
                </span>

                <span
                    className="absolute inset-0 z-20 overflow-hidden -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"
                    style={{ backgroundColor: fillColor }}
                >
                    <span
                        className="absolute inset-0 flex items-center justify-center w-full h-full translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out gap-2"
                        style={{ color: overlayTextColor }}
                    >
                        {children}
                    </span>
                </span>
            </Component>
        </motion.div >
    );
}

/**
 * A button where the text slides up and is replaced by a duplicate on hover.
 */
export function SlideTextButton({
    children,
    className,
    href,
    ...props
}: AnimatedButtonProps) {
    const Component = href ? Link : "button";

    return (
        <motion.div
            className="inline-block"
            whileTap={{ scale: 0.95 }}
        >
            {/* @ts-expect-error Link/button polymorphism shares a single render path here */}
            <Component
                href={href || ""}
                className={cn(
                    "relative overflow-hidden px-6 py-2 rounded-lg bg-foreground text-background group inline-block",
                    className
                )}
                {...props}
            >
                <div className="relative overflow-hidden h-[1.5em]">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                        {children}
                    </span>
                    <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                        {children}
                    </span>
                </div>
            </Component>
        </motion.div>
    );
}

/**
 * A magnetic button that follows the mouse slightly.
 */
export function MagneticButton({
    children,
    className,
    backgroundColor = "var(--color-foreground)",
    textColor = "var(--color-background)",
    href,
    ...props
}: AnimatedButtonProps) {
    const ref = React.useRef<HTMLDivElement>(null);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x: x * 0.3, y: y * 0.3 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const Component = href ? Link : "button";

    return (
        <motion.div
            ref={ref}
            className="inline-block"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {/* @ts-expect-error Link/button polymorphism shares a single render path here */}
            <Component
                href={href || ""}
                className={cn(
                    "relative z-10 px-8 py-4 rounded-full inline-block flex items-center gap-2",
                    className
                )}
                style={{
                    backgroundColor: backgroundColor,
                    color: textColor
                }}
                {...props}
            >
                {children}
            </Component>
        </motion.div>
    );
}
