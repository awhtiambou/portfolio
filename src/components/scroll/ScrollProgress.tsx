"use client";

import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { useRef, CSSProperties, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
  /**
   * Position of the progress indicator
   * @default "top"
   */
  position?: "top" | "bottom" | "left" | "right";
  /**
   * Color of the progress bar
   * @default "var(--color-accent)"
   */
  color?: string;
  /**
   * Height/width of the progress bar
   * @default 3
   */
  size?: number;
  /**
   * Show percentage text
   * @default false
   */
  showPercentage?: boolean;
  style?: CSSProperties;
}

export function ScrollProgress({
  className,
  position = "top",
  color = "var(--color-accent)",
  size = 3,
  showPercentage = false,
  style,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
  });
  const [displayProgress, setDisplayProgress] = useState(0);

  const isHorizontal = position === "top" || position === "bottom";
  const positionStyles = {
    top: position === "top" ? 0 : undefined,
    bottom: position === "bottom" ? 0 : undefined,
    left: position === "left" ? 0 : undefined,
    right: position === "right" ? 0 : undefined,
    width: isHorizontal ? "100%" : size,
    height: isHorizontal ? size : "100%",
    transformOrigin: isHorizontal ? "left center" : "center top",
    scaleX: isHorizontal ? smoothProgress : 1,
    scaleY: isHorizontal ? 1 : smoothProgress,
  };

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setDisplayProgress(Math.round(latest * 100));
  });

  return (
    <>
      <motion.div
        className={cn("fixed z-50", className)}
        style={{
          backgroundColor: color,
          ...positionStyles,
          ...style,
        }}
      />
      {showPercentage && (
        <motion.div
          className="fixed z-50 text-xs font-mono"
          style={{
            color,
            top: position === "top" ? size + 4 : undefined,
            bottom: position === "bottom" ? size + 4 : undefined,
            right: 8,
          }}
        >
          {displayProgress}%
        </motion.div>
      )}
    </>
  );
}

interface SectionProgressProps {
  className?: string;
  /**
   * Section ID to track
   */
  sectionId: string;
  /**
   * Color of the progress indicator
   */
  color?: string;
  /**
   * Size of the indicator
   * @default 2
   */
  size?: number;
  style?: CSSProperties;
}

/**
 * Progress indicator for a specific section
 */
export function SectionProgress({
  className,
  sectionId,
  color = "var(--color-accent)",
  size = 2,
  style,
}: SectionProgressProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    sectionRef.current = document.getElementById(sectionId);
  }, [sectionId]);

  const { scrollYProgress } = useScroll({
    target: sectionRef as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setProgress(latest);
    });
  }, [scrollYProgress]);

  return (
    <div
      className={cn("relative overflow-hidden rounded-full bg-muted/20", className)}
      style={{ height: size, ...style }}
    >
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          backgroundColor: color,
          width: `${progress * 100}%`,
        }}
      />
    </div>
  );
}

interface ReadingProgressProps {
  className?: string;
  /**
   * Container to track reading progress in
   */
  containerRef?: React.RefObject<HTMLElement>;
  /**
   * Color of the progress bar
   */
  color?: string;
  /**
   * Show reading time estimate
   * @default false
   */
  showReadingTime?: boolean;
  /**
   * Average words per minute for reading time calc
   * @default 200
   */
  wordsPerMinute?: number;
  style?: CSSProperties;
}

/**
 * Reading progress bar for long-form content (blog posts, etc.)
 */
export function ReadingProgress({
  className,
  containerRef,
  color = "var(--color-accent)",
  showReadingTime = false,
  wordsPerMinute = 200,
  style,
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [readingTime, setReadingTime] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setProgress(latest);
    });
  }, [scrollYProgress]);

  useEffect(() => {
    if (containerRef?.current && showReadingTime) {
      const frameId = requestAnimationFrame(() => {
        const text = containerRef.current?.textContent || "";
        const words = text.split(/\s+/).filter(Boolean).length;
        setReadingTime(Math.ceil(words / wordsPerMinute));
      });

      return () => cancelAnimationFrame(frameId);
    }
  }, [containerRef, showReadingTime, wordsPerMinute]);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-1 bg-muted/20",
        className
      )}
      style={style}
    >
      <motion.div
        className="h-full origin-left"
        style={{
          backgroundColor: color,
          scaleX: progress,
        }}
      />
      {showReadingTime && (
        <div
          className="absolute right-4 top-2 text-xs font-mono"
          style={{ color }}
        >
          {Math.ceil(readingTime * (1 - progress))} min left
        </div>
      )}
    </div>
  );
}

interface ScrollIndicatorProps {
  className?: string;
  /**
   * Text to display
   * @default "Scroll"
   */
  text?: string;
  /**
   * Show arrow indicator
   * @default true
   */
  showArrow?: boolean;
  /**
   * Hide after scrolling this percentage
   * @default 0.1
   */
  hideAfter?: number;
  style?: CSSProperties;
}

/**
 * Animated scroll down indicator
 */
export function ScrollIndicator({
  className,
  text = "Scroll",
  showArrow = true,
  hideAfter = 0.1,
  style,
}: ScrollIndicatorProps) {
  const { scrollYProgress } = useScroll();
  const [shouldHide, setShouldHide] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShouldHide(latest > hideAfter);
  });

  return (
    <motion.div
      className={cn(
        "flex flex-col items-center gap-2 text-muted",
        className
      )}
      initial={{ opacity: 1 }}
      animate={{ opacity: shouldHide ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      style={style}
    >
      <span className="text-xs font-mono uppercase tracking-widest">{text}</span>
      {showArrow && (
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 4v16M2 14l6 6 6-6" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
}
