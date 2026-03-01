"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface UnderlinedAnimatedLinkProps {
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
    className?: string;
    underlineColor?: "blue" | "pink" | "mint" | "yellow";
    onClick?: () => void;
}

const colorValues = {
    blue: "#4ECDC4",   // rich teal
    pink: "#FF6B8A",   // vibrant coral
    mint: "#2ECC71",   // vibrant green
    yellow: "#F5A623", // golden amber
};

export function UnderlinedAnimatedLink({
    href,
    children,
    isActive = false,
    className,
    underlineColor = "blue",
    onClick,
}: UnderlinedAnimatedLinkProps) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                "relative inline-block text-sm transition-colors group",
                !isActive && "text-text-secondary hover:text-text-primary",
                isActive && "font-medium",
                className
            )}
            style={isActive ? { color: colorValues[underlineColor] } : undefined}
            data-cursor="pointer"
        >
            <span className="relative font-heading font-black">
                {children}

                <span className="absolute -bottom-1 left-0 w-full h-[2px] overflow-hidden">
                    <motion.span
                        className="absolute inset-0 origin-left"
                        style={{ backgroundColor: colorValues[underlineColor] }}
                        initial={{ scaleX: isActive ? 1 : 0 }}
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    />

                    <motion.span
                        className="absolute inset-0 origin-left"
                        style={{ backgroundColor: colorValues[underlineColor] }}
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    />
                </span>

                <span
                    className={cn(
                        "absolute -bottom-1 left-0 w-full h-[2px]",
                        "origin-left scale-x-0 group-hover:scale-x-100",
                        "transition-transform duration-300 ease-out",
                        isActive && "scale-x-100"
                    )}
                    style={{ backgroundColor: colorValues[underlineColor] }}
                />
            </span>
        </Link>
    );
}
