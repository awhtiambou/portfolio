"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { useRef, ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  /**
   * Container class for the sticky wrapper
   */
  containerClassName?: string;
  /**
   * Height of the scroll area (controls scroll length)
   * @default "300vh"
   */
  scrollHeight?: string;
  /**
   * Enable parallax effect on children
   * @default false
   */
  parallax?: boolean;
  /**
   * Direction of horizontal scroll
   * @default "left"
   */
  direction?: "left" | "right";
  /**
   * Easing spring stiffness
   * @default 100
   */
  stiffness?: number;
  /**
   * Easing spring damping
   * @default 30
   */
  damping?: number;
}

export function HorizontalScroll({
  children,
  className,
  containerClassName,
  scrollHeight = "300vh",
  parallax = false,
  direction = "left",
  stiffness = 100,
  damping = 30,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const xPercent = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"]
  );

  const smoothX = useSpring(xPercent, { stiffness, damping });

  return (
    <section
      ref={containerRef}
      className={cn("relative", containerClassName)}
      style={{ height: scrollHeight }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div
          ref={contentRef}
          className={cn("flex gap-8 will-change-transform", className)}
          style={{
            x: smoothX,
            // Offset by 100% to start visible
            marginLeft: direction === "left" ? "100vw" : undefined,
            marginRight: direction === "right" ? "100vw" : undefined,
          }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

interface HorizontalScrollItemProps {
  children: ReactNode;
  className?: string;
  /**
   * Width of the item
   * @default "100vw"
   */
  width?: string;
  /**
   * Enable scale effect on scroll
   * @default false
   */
  scaleOnScroll?: boolean;
  style?: CSSProperties;
}

export function HorizontalScrollItem({
  children,
  className,
  width = "100vw",
  scaleOnScroll = false,
  style,
}: HorizontalScrollItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={itemRef}
      className={cn("flex-shrink-0", className)}
      style={{
        width,
        scale: scaleOnScroll ? smoothScale : 1,
        opacity: scaleOnScroll ? smoothOpacity : 1,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

interface PinnedHorizontalScrollProps {
  children: ReactNode;
  className?: string;
  /**
   * Number of "pages" to scroll through
   * @default auto-calculated from children
   */
  pages?: number;
  /**
   * Gap between items in pixels
   * @default 32
   */
  gap?: number;
}

/**
 * A horizontal scroll section that pins the container
 * and scrolls content horizontally based on vertical scroll.
 */
export function PinnedHorizontalScroll({
  children,
  className,
  pages,
  gap = 32,
}: PinnedHorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalItems = Array.isArray(children) ? children.length : 1;
  const effectivePages = pages || totalItems;

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(effectivePages - 1) * 100}%`]);
  const smoothX = useSpring(x, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${effectivePages * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div
          ref={contentRef}
          className={cn("flex will-change-transform h-full items-center", className)}
          style={{
            x: smoothX,
            gap,
          }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
