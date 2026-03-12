"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface ClipRevealProps {
  children: ReactNode;
  className?: string;
  /**
   * Shape of the reveal mask
   * @default "circle"
   */
  shape?: "circle" | "ellipse" | "rectangle" | "inset";
  /**
   * Starting size of the mask (0-100)
   * @default 0
   */
  fromSize?: number;
  /**
   * Ending size of the mask (0-100)
   * @default 150
   */
  toSize?: number;
  /**
   * Origin position of the reveal
   * @default "center"
   */
  origin?: "center" | "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /**
   * Scroll trigger point (0-1, where in viewport)
   * @default 0.5
   */
  triggerPoint?: number;
  /**
   * Duration of reveal animation
   * @default 0.8
   */
  duration?: number;
  /**
   * Delay before animation starts
   * @default 0
   */
  delay?: number;
  /**
   * Background color behind the reveal
   */
  backgroundColor?: string;
  style?: CSSProperties;
}

const originMap = {
  center: "50% 50%",
  top: "50% 0%",
  bottom: "50% 100%",
  left: "0% 50%",
  right: "100% 50%",
  "top-left": "0% 0%",
  "top-right": "100% 0%",
  "bottom-left": "0% 100%",
  "bottom-right": "100% 100%",
};

export function ClipReveal({
  children,
  className,
  shape = "circle",
  fromSize = 0,
  toSize = 150,
  origin = "center",
  triggerPoint = 0.5,
  duration = 0.8,
  delay = 0,
  backgroundColor,
  style,
}: ClipRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: `-${Math.round(triggerPoint * 100)}% 0px` as `${number}px`,
  });

  const getClipPath = (size: number) => {
    const [x, y] = originMap[origin].split(" ");
    switch (shape) {
      case "circle":
        return `circle(${size}% at ${x} ${y})`;
      case "ellipse":
        return `ellipse(${size}% ${size * 0.75}% at ${x} ${y})`;
      case "rectangle":
        const halfSize = size / 2;
        return `inset(${50 - halfSize}% ${50 - halfSize}% ${50 - halfSize}% ${50 - halfSize}%)`;
      case "inset":
        const insetSize = 50 - size / 2;
        return `inset(${Math.max(0, insetSize)}%)`;
      default:
        return `circle(${size}% at ${x} ${y})`;
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ backgroundColor, ...style }}
    >
      <motion.div
        initial={{ clipPath: getClipPath(fromSize) }}
        animate={{
          clipPath: isInView ? getClipPath(toSize) : getClipPath(fromSize),
        }}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

interface ScrollClipRevealProps {
  children: ReactNode;
  className?: string;
  /**
   * Shape of the reveal mask
   * @default "circle"
   */
  shape?: "circle" | "ellipse" | "inset";
  /**
   * Origin position
   * @default "center"
   */
  origin?: "center" | "top" | "bottom" | "left" | "right";
  /**
   * Start size
   * @default 0
   */
  fromSize?: number;
  /**
   * End size
   * @default 150
   */
  toSize?: number;
  style?: CSSProperties;
}

/**
 * Scroll-driven clip reveal that responds to scroll position
 */
export function ScrollClipReveal({
  children,
  className,
  shape = "circle",
  origin = "center",
  fromSize = 0,
  toSize = 150,
  style,
}: ScrollClipRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const size = useTransform(scrollYProgress, [0, 1], [fromSize, toSize]);
  const smoothSize = useSpring(size, { stiffness: 100, damping: 30 });

  const [x, y] = originMap[origin].split(" ");

  const getClipPath = (s: number) => {
    switch (shape) {
      case "circle":
        return `circle(${s}% at ${x} ${y})`;
      case "ellipse":
        return `ellipse(${s}% ${s * 0.75}% at ${x} ${y})`;
      case "inset":
        const insetSize = 50 - s / 2;
        return `inset(${Math.max(0, insetSize)}%)`;
      default:
        return `circle(${s}% at ${x} ${y})`;
    }
  };

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)} style={style}>
      <motion.div
        className="w-full h-full"
        style={{
          clipPath: useTransform(smoothSize, getClipPath),
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface MaskRevealProps {
  children: ReactNode;
  /**
   * Content to reveal (shown behind the mask)
   */
  revealContent: ReactNode;
  className?: string;
  /**
   * SVG path for custom mask shape
   */
  maskPath?: string;
  style?: CSSProperties;
}

/**
 * Custom SVG mask reveal animation
 */
export function MaskReveal({
  children,
  revealContent,
  className,
  maskPath,
  style,
}: MaskRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" as `${number}px` });

  return (
    <div ref={containerRef} className={cn("relative", className)} style={style}>
      {/* Background/Reveal content */}
      <div className="absolute inset-0">{revealContent}</div>

      {/* Masked foreground */}
      <motion.div
        className="relative z-10"
        initial={{ clipPath: "inset(0%)" }}
        animate={{
          clipPath: isInView ? "inset(100%)" : "inset(0%)",
        }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
