"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

interface CircleArrowLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    circleColor?: string;
    circleClassName?: string;
    onClick?: () => void;
    isActive?: boolean;
}

export function CircleArrowLink({
    href,
    children,
    className,
    circleColor,
    circleClassName,
    onClick,
    isActive,
    activeColor = "var(--color-yellow)",
    ...props
}: CircleArrowLinkProps & Omit<React.ComponentProps<typeof Link>, "href"> & { activeColor?: string }) {
    return (
        <motion.div
            initial="initial"
            whileHover="hover"
            className={cn("inline-block", className)}
        >
            <Link
                href={href}
                onClick={onClick}
                className={cn("group flex items-center gap-0 cursor-pointer transition-colors duration-300", isActive && "font-bold")}
                style={isActive ? { color: activeColor } : undefined}
                {...props}
            >
                <span className="relative overflow-hidden">
                    {children}
                    <span className={cn(
                        "absolute left-0 bottom-0 w-full h-[2px] bg-current origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                        isActive && "scale-x-100" // Keep underline if active
                    )} />
                </span>

                <motion.div
                    className={cn(
                        "relative w-8 h-8 rounded-full border border-current overflow-hidden flex items-center justify-center",
                        circleClassName
                    )}
                    style={{ borderColor: circleColor }}
                    variants={{
                        initial: { y: 10, opacity: 0, scale: 0.8 },
                        hover: { y: 0, opacity: 1, scale: 1 }
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    {/* Arrow Container */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
                        <ArrowOutwardIcon
                            fontSize="inherit"
                            className="w-full h-full text-current" // Removed padding to make arrow bigger
                            style={{ color: "inherit", transform: "scale(1.2)" }} // Scale up arrow slightly more
                        />
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}
