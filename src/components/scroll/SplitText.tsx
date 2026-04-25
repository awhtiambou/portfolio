"use client";

import { motion, useInView, Variants, useTransform, useSpring } from "framer-motion";
import { useRef, useMemo, ReactNode, CSSProperties } from "react";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";
import { useInteractionProfile } from "@/hooks";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  children: string;
  className?: string;
  /**
   * Animation type
   * @default "chars"
   */
  type?: "chars" | "words" | "lines";
  /**
   * Animation variant to use
   * @default "fadeUp"
   */
  animation?: "fadeUp" | "fadeIn" | "slideUp" | "scaleUp" | "blur" | "wave";
  /**
   * Delay between each element animation (seconds)
   * @default 0.03
   */
  staggerDelay?: number;
  /**
   * Initial delay before animation starts (seconds)
   * @default 0
   */
  delay?: number;
  /**
   * Animation duration for each element (seconds)
   * @default 0.5
   */
  duration?: number;
  /**
   * Only animate once when in view
   * @default true
   */
  once?: boolean;
  /**
   * Viewport margin for triggering animation
   * @default "-10%"
   */
  viewportMargin?: string;
  /**
   * Enable velocity-based skew on characters
   * @default false
   */
  velocitySkew?: boolean;
  /**
   * HTML tag to render
   * @default "span"
   */
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
  style?: CSSProperties;
}

const animations = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: "0%", opacity: 1 },
  },
  scaleUp: {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  wave: {
    hidden: { y: 20, opacity: 0, rotateX: -90 },
    visible: { y: 0, opacity: 1, rotateX: 0 },
  },
} as const;

export function SplitText({
  children,
  className,
  type = "chars",
  animation = "fadeUp",
  staggerDelay = 0.03,
  delay = 0,
  duration = 0.5,
  once = true,
  viewportMargin = "-10%",
  velocitySkew = false,
  as: Component = "span",
  style,
}: SplitTextProps) {
  const { useLiteAnimations } = useInteractionProfile();
  const sharedProps = {
    className,
    type,
    animation,
    staggerDelay,
    delay,
    duration,
    once,
    viewportMargin,
    velocitySkew,
    as: Component,
    style,
  };

  return useLiteAnimations ? (
    <LiteSplitText {...sharedProps}>{children}</LiteSplitText>
  ) : (
    <RichSplitText {...sharedProps}>{children}</RichSplitText>
  );
}

function LiteSplitText({
  children,
  className,
  type = "chars",
  delay = 0,
  duration = 0.5,
  once = true,
  viewportMargin = "-10%",
  as: Component = "span",
  style,
}: SplitTextProps) {
  const MotionComponent = motion[Component] as typeof motion.span;

  return (
    <MotionComponent
      className={cn("inline-block", type === "lines" && "whitespace-pre-line", className)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: viewportMargin }}
      transition={{ duration: Math.min(duration, 0.45), delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
      aria-label={children}
    >
      {children}
    </MotionComponent>
  );
}

function RichSplitText({
  children,
  className,
  type = "chars",
  animation = "fadeUp",
  staggerDelay = 0.03,
  delay = 0,
  duration = 0.5,
  once = true,
  viewportMargin = "-10%",
  velocitySkew = false,
  as: Component = "span",
  style,
}: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once, margin: viewportMargin as `${number}px` });
  const { smoothVelocity } = useScrollVelocity({ clamp: 100 });

  const elements = useMemo(() => {
    if (type === "words") {
      return children.split(" ").map((word, i, arr) => ({
        text: word,
        key: `word-${i}`,
        hasSpace: i < arr.length - 1,
      }));
    }
    if (type === "lines") {
      return children.split("\n").map((line, i) => ({
        text: line,
        key: `line-${i}`,
        hasSpace: false,
      }));
    }
    // chars (default)
    return children.split("").map((char, i) => ({
      text: char === " " ? "\u00A0" : char,
      key: `char-${i}`,
      hasSpace: false,
    }));
  }, [children, type]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const elementVariants: Variants = {
    hidden: animations[animation].hidden,
    visible: {
      ...animations[animation].visible,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  // Velocity-based skew transform
  const skewY = useTransform(smoothVelocity, [-100, 0, 100], [-3, 0, 3]);
  const smoothSkewY = useSpring(skewY, { stiffness: 200, damping: 30 });

  const MotionComponent = motion[Component] as typeof motion.span;

  return (
    <MotionComponent
      ref={containerRef}
      className={cn("inline-block", className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={style}
      aria-label={children}
    >
      {elements.map(({ text, key, hasSpace }) => (
        <span key={key}>
          <motion.span
            className="inline-block will-change-transform"
            variants={elementVariants}
            style={
              velocitySkew
                ? {
                    skewY: smoothSkewY,
                    transformOrigin: "center bottom",
                  }
                : undefined
            }
          >
            {text}
          </motion.span>
          {hasSpace && " "}
        </span>
      ))}
    </MotionComponent>
  );
}

interface RevealTextProps {
  children: ReactNode;
  className?: string;
  /**
   * Direction of reveal
   * @default "up"
   */
  direction?: "up" | "down" | "left" | "right";
  /**
   * Animation delay (seconds)
   * @default 0
   */
  delay?: number;
  /**
   * Animation duration (seconds)
   * @default 0.8
   */
  duration?: number;
  /**
   * Only animate once
   * @default true
   */
  once?: boolean;
  /**
   * HTML tag to render
   * @default "span"
   */
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
  style?: CSSProperties;
}

/**
 * Text that reveals from behind a mask/clip
 */
export function RevealText({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.8,
  once = true,
  as: Component = "span",
  style,
}: RevealTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-10%" as `${number}px` });

  const transforms = {
    up: { hidden: { y: "110%" }, visible: { y: "0%" } },
    down: { hidden: { y: "-110%" }, visible: { y: "0%" } },
    left: { hidden: { x: "110%" }, visible: { x: "0%" } },
    right: { hidden: { x: "-110%" }, visible: { x: "0%" } },
  };

  const MotionComponent = motion[Component] as typeof motion.span;

  return (
    <span
      ref={ref}
      className={cn("inline-block overflow-hidden", className)}
      style={style}
    >
      <MotionComponent
        className="inline-block will-change-transform"
        initial={transforms[direction].hidden}
        animate={isInView ? transforms[direction].visible : transforms[direction].hidden}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </MotionComponent>
    </span>
  );
}
