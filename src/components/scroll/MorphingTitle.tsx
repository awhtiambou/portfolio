"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface MorphingTitleProps {
  children: string;
  className?: string;
  /**
   * Starting font weight
   * @default 100
   */
  fromWeight?: number;
  /**
   * Ending font weight
   * @default 900
   */
  toWeight?: number;
  /**
   * Starting font width (for variable fonts that support it)
   * @default 75
   */
  fromWidth?: number;
  /**
   * Ending font width
   * @default 125
   */
  toWidth?: number;
  /**
   * Enable width morphing (requires variable font with width axis)
   * @default false
   */
  morphWidth?: boolean;
  /**
   * Scroll trigger start (0-1)
   * @default 0.3
   */
  triggerStart?: number;
  /**
   * Scroll trigger end (0-1)
   * @default 0.7
   */
  triggerEnd?: number;
  /**
   * HTML tag to render
   * @default "h2"
   */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p" | "div";
  style?: CSSProperties;
}

export function MorphingTitle({
  children,
  className,
  fromWeight = 100,
  toWeight = 900,
  fromWidth = 75,
  toWidth = 125,
  morphWidth = false,
  triggerStart = 0.3,
  triggerEnd = 0.7,
  as: Component = "h2",
  style,
}: MorphingTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress to weight
  const weight = useTransform(
    scrollYProgress,
    [0, triggerStart, triggerEnd, 1],
    [fromWeight, fromWeight, toWeight, toWeight]
  );

  const width = useTransform(
    scrollYProgress,
    [0, triggerStart, triggerEnd, 1],
    [fromWidth, fromWidth, toWidth, toWidth]
  );

  const smoothWeight = useSpring(weight, { stiffness: 100, damping: 30 });
  const smoothWidth = useSpring(width, { stiffness: 100, damping: 30 });
  const fontVariationWithWidth = useTransform(
    [smoothWeight, smoothWidth],
    ([w, wd]) => `"wght" ${w}, "wdth" ${wd}`
  );
  const fontVariationWeightOnly = useTransform(smoothWeight, (w) => `"wght" ${w}`);

  const MotionComponent = motion[Component] as typeof motion.h2;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <MotionComponent
        className="will-change-[font-variation-settings]"
        style={{
          fontVariationSettings: morphWidth ? fontVariationWithWidth : fontVariationWeightOnly,
          ...style,
        }}
      >
        {children}
      </MotionComponent>
    </div>
  );
}

interface ScrollScaleTextProps {
  children: ReactNode;
  className?: string;
  /**
   * Starting scale
   * @default 0.8
   */
  fromScale?: number;
  /**
   * Ending scale
   * @default 1
   */
  toScale?: number;
  /**
   * Starting opacity
   * @default 0.5
   */
  fromOpacity?: number;
  /**
   * Ending opacity
   * @default 1
   */
  toOpacity?: number;
  /**
   * HTML tag to render
   * @default "div"
   */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p" | "div";
  style?: CSSProperties;
}

export function ScrollScaleText({
  children,
  className,
  fromScale = 0.8,
  toScale = 1,
  fromOpacity = 0.5,
  toOpacity = 1,
  as: Component = "div",
  style,
}: ScrollScaleTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [fromScale, toScale]);
  const opacity = useTransform(scrollYProgress, [0, 1], [fromOpacity, toOpacity]);

  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  const MotionComponent = motion[Component] as typeof motion.div;

  return (
    <div ref={containerRef}>
      <MotionComponent
        className={cn("will-change-transform", className)}
        style={{
          scale: smoothScale,
          opacity: smoothOpacity,
          ...style,
        }}
      >
        {children}
      </MotionComponent>
    </div>
  );
}
