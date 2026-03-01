"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedLoadingProps {
    size?: "sm" | "md" | "lg";
    text?: string;
    className?: string;
}

export function AnimatedLoading({
    size = "md",
    text = "Loading...",
    className
}: AnimatedLoadingProps) {
    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-16 h-16",
        lg: "w-24 h-24",
    };

    const dotSizeClasses = {
        sm: "w-2 h-2",
        md: "w-3 h-3",
        lg: "w-4 h-4",
    };

    const textSizeClasses = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
    };

    const colors = [
        "bg-accent-blue",
        "bg-accent-pink",
        "bg-accent-yellow",
        "bg-accent-mint",
    ];

    const getTranslateY = () => {
        if (size === "lg") return 40;
        if (size === "md") return 28;
        return 16;
    };

    return (
        <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
            <motion.div
                className={cn("relative", sizeClasses[size])}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {colors.map((color, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut",
                        }}
                        className={cn(
                            "absolute rounded-full",
                            dotSizeClasses[size],
                            color
                        )}
                        style={{
                            top: "50%",
                            left: "50%",
                            transform: `rotate(${i * 90}deg) translateY(-${getTranslateY()}px) translateX(-50%)`,
                            transformOrigin: "center center",
                        }}
                    />
                ))}
            </motion.div>

            {text && (
                <motion.p
                    className={cn(
                        "font-heading font-medium text-text-secondary",
                        textSizeClasses[size]
                    )}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    {text}
                </motion.p>
            )}
        </div>
    );
}
