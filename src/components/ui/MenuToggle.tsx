"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MenuToggleProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  isDark?: boolean;
}

const topLineVariants = {
  closed: {
    rotate: 0,
    y: 0,
  },
  open: {
    rotate: 45,
    y: 6,
  },
};

const middleLineVariants = {
  closed: {
    opacity: 1,
    x: 0,
  },
  open: {
    opacity: 0,
    x: 20,
  },
};

const bottomLineVariants = {
  closed: {
    rotate: 0,
    y: 0,
  },
  open: {
    rotate: -45,
    y: -6,
  },
};

export function MenuToggle({ isOpen, onClick, className, isDark = true }: MenuToggleProps) {
  const lineColor = isDark ? "bg-white" : "bg-gray-900";
  
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center justify-center w-10 h-10 rounded-full",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue",
        "transition-colors duration-200",
        isDark 
            ? "text-white" 
            : "text-gray-900",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <div className="flex flex-col items-start justify-center gap-[4px] w-8 h-7">
        <motion.span
          className={cn(
            "block h-[3px] w-full rounded-full origin-center",
            lineColor
          )}
          variants={topLineVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        <motion.span
          className={cn(
            "block h-[3px] w-3/4 rounded-full",
            lineColor
          )}
          variants={middleLineVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        />
        <motion.span
          className={cn(
            "block h-[3px] w-full rounded-full origin-center",
            lineColor
          )}
          variants={bottomLineVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>
    </motion.button>
  );
}
