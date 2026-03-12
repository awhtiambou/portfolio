"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef, ReactNode, CSSProperties, useMemo } from "react";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";
import { cn } from "@/lib/utils";

interface ScrollTextProps {
  children: ReactNode;
  className?: string;
  /**
   * How much the text skews based on scroll velocity
   * @default 0.1
   */
  skewIntensity?: number;
  /**
   * How much the text scales based on scroll velocity
   * @default 0.05
   */
  scaleIntensity?: number;
  /**
   * Enable horizontal stretch effect
   * @default false
   */
  stretch?: boolean;
  /**
   * HTML tag to render
   * @default "span"
   */
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
  style?: CSSProperties;
}

export function ScrollText({
  children,
  className,
  skewIntensity = 0.1,
  scaleIntensity = 0.05,
  stretch = false,
  as: Component = "span",
  style,
}: ScrollTextProps) {
  const { smoothVelocity } = useScrollVelocity({ clamp: 150 });

  const skewY = useTransform(smoothVelocity, [-150, 0, 150], [-skewIntensity * 15, 0, skewIntensity * 15]);
  const scaleX = useTransform(
    smoothVelocity,
    [-150, 0, 150],
    stretch ? [1 + scaleIntensity, 1, 1 + scaleIntensity] : [1, 1, 1]
  );
  const scaleY = useTransform(
    smoothVelocity,
    [-150, 0, 150],
    [1 - scaleIntensity * 0.5, 1, 1 - scaleIntensity * 0.5]
  );

  const smoothSkewY = useSpring(skewY, { stiffness: 200, damping: 30 });
  const smoothScaleX = useSpring(scaleX, { stiffness: 200, damping: 30 });
  const smoothScaleY = useSpring(scaleY, { stiffness: 200, damping: 30 });

  const MotionComponent = motion[Component] as typeof motion.span;

  return (
    <MotionComponent
      className={cn("inline-block will-change-transform", className)}
      style={{
        skewY: smoothSkewY,
        scaleX: smoothScaleX,
        scaleY: smoothScaleY,
        transformOrigin: "center center",
        ...style,
      }}
    >
      {children}
    </MotionComponent>
  );
}

interface VelocityTextProps {
  children: ReactNode;
  className?: string;
  /**
   * Base font weight (CSS value)
   * @default 400
   */
  baseWeight?: number;
  /**
   * Maximum font weight on scroll
   * @default 900
   */
  maxWeight?: number;
  /**
   * HTML tag to render
   * @default "span"
   */
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
  style?: CSSProperties;
}

/**
 * Text that changes font weight based on scroll velocity.
 * Best used with variable fonts like Inter or Work Sans.
 */
export function VelocityText({
  children,
  className,
  baseWeight = 400,
  maxWeight = 900,
  as: Component = "span",
  style,
}: VelocityTextProps) {
  const { absVelocity } = useScrollVelocity({ clamp: 100 });

  const fontWeight = useTransform(absVelocity, [0, 100], [baseWeight, maxWeight]);
  const smoothWeight = useSpring(fontWeight, { stiffness: 300, damping: 40 });

  const MotionComponent = motion[Component] as typeof motion.span;

  return (
    <MotionComponent
      className={cn("inline-block", className)}
      style={{
        fontWeight: smoothWeight,
        fontVariationSettings: useTransform(smoothWeight, (w) => `"wght" ${w}`),
        ...style,
      }}
    >
      {children}
    </MotionComponent>
  );
}
