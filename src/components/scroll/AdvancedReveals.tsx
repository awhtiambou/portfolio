"use client";

import { motion, useScroll, useTransform, useSpring, useInView, Variants } from "framer-motion";
import { useRef, ReactNode, CSSProperties, Children, cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// Curtain Reveal - Content reveals like a curtain opening
// ============================================================================

interface CurtainRevealProps {
  children: ReactNode;
  className?: string;
  /**
   * Direction the curtain opens
   * @default "horizontal"
   */
  direction?: "horizontal" | "vertical";
  /**
   * Color of the curtain
   * @default "#000"
   */
  curtainColor?: string;
  /**
   * Animation duration
   * @default 1
   */
  duration?: number;
  /**
   * Delay before animation
   * @default 0
   */
  delay?: number;
  style?: CSSProperties;
}

/**
 * Reveals content with a curtain-opening effect
 */
export function CurtainReveal({
  children,
  className,
  direction = "horizontal",
  curtainColor = "var(--color-background)",
  duration = 1,
  delay = 0,
  style,
}: CurtainRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" as `${number}px` });

  const curtainVariants: Variants = {
    hidden: direction === "horizontal"
      ? { scaleX: 1 }
      : { scaleY: 1 },
    visible: direction === "horizontal"
      ? { scaleX: 0, transition: { duration, delay, ease: [0.65, 0, 0.35, 1] } }
      : { scaleY: 0, transition: { duration, delay, ease: [0.65, 0, 0.35, 1] } },
  };

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)} style={style}>
      {children}
      
      {/* Left/Top curtain */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          backgroundColor: curtainColor,
          transformOrigin: direction === "horizontal" ? "left center" : "center top",
          ...(direction === "horizontal" ? { right: "50%" } : { bottom: "50%" }),
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={curtainVariants}
      />
      
      {/* Right/Bottom curtain */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          backgroundColor: curtainColor,
          transformOrigin: direction === "horizontal" ? "right center" : "center bottom",
          ...(direction === "horizontal" ? { left: "50%" } : { top: "50%" }),
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={curtainVariants}
      />
    </div>
  );
}

// ============================================================================
// Diagonal Reveal - Content reveals with diagonal wipe
// ============================================================================

interface DiagonalRevealProps {
  children: ReactNode;
  className?: string;
  /**
   * Diagonal direction
   * @default "top-left"
   */
  direction?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /**
   * Animation duration
   * @default 1.2
   */
  duration?: number;
  /**
   * Delay before animation
   * @default 0
   */
  delay?: number;
  style?: CSSProperties;
}

/**
 * Reveals content with a diagonal wipe effect
 */
export function DiagonalReveal({
  children,
  className,
  direction = "top-left",
  duration = 1.2,
  delay = 0,
  style,
}: DiagonalRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" as `${number}px` });

  const getClipPath = () => {
    const hidden = {
      "top-left": "polygon(0 0, 0 0, 0 0)",
      "top-right": "polygon(100% 0, 100% 0, 100% 0)",
      "bottom-left": "polygon(0 100%, 0 100%, 0 100%)",
      "bottom-right": "polygon(100% 100%, 100% 100%, 100% 100%)",
    };
    const visible = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
    return { hidden: hidden[direction], visible };
  };

  const { hidden, visible } = getClipPath();

  return (
    <div ref={ref} className={cn("overflow-hidden", className)} style={style}>
      <motion.div
        initial={{ clipPath: hidden }}
        animate={{ clipPath: isInView ? visible : hidden }}
        transition={{ duration, delay, ease: [0.65, 0, 0.35, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ============================================================================
// Circular Reveal - Expanding circle reveal
// ============================================================================

interface CircularRevealProps {
  children: ReactNode;
  className?: string;
  /**
   * Origin point of the circle
   * @default "center"
   */
  origin?: "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top" | "bottom";
  /**
   * Animation duration
   * @default 1
   */
  duration?: number;
  /**
   * Delay before animation
   * @default 0
   */
  delay?: number;
  style?: CSSProperties;
}

const originPositions = {
  center: "50% 50%",
  "top-left": "0% 0%",
  "top-right": "100% 0%",
  "bottom-left": "0% 100%",
  "bottom-right": "100% 100%",
  top: "50% 0%",
  bottom: "50% 100%",
};

/**
 * Reveals content with an expanding circle effect
 */
export function CircularReveal({
  children,
  className,
  origin = "center",
  duration = 1,
  delay = 0,
  style,
}: CircularRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" as `${number}px` });

  const position = originPositions[origin];

  return (
    <div ref={ref} className={cn("overflow-hidden", className)} style={style}>
      <motion.div
        initial={{ clipPath: `circle(0% at ${position})` }}
        animate={{ clipPath: isInView ? `circle(150% at ${position})` : `circle(0% at ${position})` }}
        transition={{ duration, delay, ease: [0.65, 0, 0.35, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ============================================================================
// Staggered Grid - Grid items animate in with stagger
// ============================================================================

interface StaggeredGridProps {
  children: ReactNode;
  className?: string;
  /**
   * Number of columns
   * @default 3
   */
  columns?: number;
  /**
   * Gap between items
   * @default "1rem"
   */
  gap?: string;
  /**
   * Stagger delay between items
   * @default 0.1
   */
  staggerDelay?: number;
  /**
   * Animation direction
   * @default "up"
   */
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  /**
   * Repeat animation on every view
   * @default false
   */
  repeat?: boolean;
  style?: CSSProperties;
}

/**
 * Grid with staggered entrance animations
 */
export function StaggeredGrid({
  children,
  className,
  columns = 3,
  gap = "1rem",
  staggerDelay = 0.1,
  direction = "up",
  repeat = false,
  style,
}: StaggeredGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: !repeat, margin: "-50px" as `${number}px` });

  const getItemVariants = (): Variants => {
    const baseTransition = {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    };

    switch (direction) {
      case "up":
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: baseTransition },
        };
      case "down":
        return {
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0, transition: baseTransition },
        };
      case "left":
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0, transition: baseTransition },
        };
      case "right":
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0, transition: baseTransition },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: baseTransition },
        };
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: baseTransition },
        };
    }
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = getItemVariants();

  return (
    <motion.div
      ref={ref}
      className={cn("grid", className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap,
        ...style,
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// ============================================================================
// Flip Card - 3D card flip on scroll
// ============================================================================

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  /**
   * Flip direction
   * @default "horizontal"
   */
  flipDirection?: "horizontal" | "vertical";
  /**
   * Trigger on hover instead of scroll
   * @default false
   */
  hover?: boolean;
  /**
   * Flip duration
   * @default 0.8
   */
  duration?: number;
  style?: CSSProperties;
}

/**
 * 3D card that flips to reveal back content
 */
export function FlipCard({
  front,
  back,
  className,
  flipDirection = "horizontal",
  hover = false,
  duration = 0.8,
  style,
}: FlipCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30%" as `${number}px` });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const scrollRotation = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const smoothRotation = useSpring(scrollRotation, { stiffness: 100, damping: 30 });

  const rotateAxis = flipDirection === "horizontal" ? "rotateY" : "rotateX";

  if (hover) {
    return (
      <motion.div
        ref={ref}
        className={cn("relative cursor-pointer", className)}
        style={{
          perspective: 1000,
          ...style,
        }}
        initial="front"
        whileHover="back"
      >
        <motion.div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
          variants={{
            front: { [rotateAxis]: 0 },
            back: { [rotateAxis]: 180 },
          }}
          transition={{ duration }}
        >
          {front}
        </motion.div>
        <motion.div
          className="absolute inset-0 backface-hidden"
          style={{ 
            backfaceVisibility: "hidden",
            transform: flipDirection === "horizontal" ? "rotateY(180deg)" : "rotateX(180deg)",
          }}
          variants={{
            front: { [rotateAxis]: 180 },
            back: { [rotateAxis]: 360 },
          }}
          transition={{ duration }}
        >
          {back}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      style={{
        perspective: 1000,
        ...style,
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          [rotateAxis]: smoothRotation,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden" }}
        >
          {front}
        </div>
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            transform: flipDirection === "horizontal" ? "rotateY(180deg)" : "rotateX(180deg)",
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// Scroll Flip Card - Card flips based on scroll progress
// ============================================================================

interface ScrollFlipCardProps {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  /**
   * Flip direction
   * @default "horizontal"
   */
  flipDirection?: "horizontal" | "vertical";
  style?: CSSProperties;
}

/**
 * 3D card that flips based on scroll position
 */
export function ScrollFlipCard({
  front,
  back,
  className,
  flipDirection = "horizontal",
  style,
}: ScrollFlipCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotation = useTransform(scrollYProgress, [0, 0.5, 1], [0, 180, 360]);
  const smoothRotation = useSpring(rotation, { stiffness: 100, damping: 30 });

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      style={{
        perspective: 1000,
        ...style,
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          [flipDirection === "horizontal" ? "rotateY" : "rotateX"]: smoothRotation,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden" }}
        >
          {front}
        </div>
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            transform: flipDirection === "horizontal" ? "rotateY(180deg)" : "rotateX(180deg)",
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// Text Line Reveal - Lines of text reveal one by one
// ============================================================================

interface TextLineRevealProps {
  text: string;
  className?: string;
  /**
   * Stagger delay between lines
   * @default 0.1
   */
  staggerDelay?: number;
  /**
   * Line height
   * @default "1.2em"
   */
  lineHeight?: string;
  /**
   * HTML tag for each line
   * @default "span"
   */
  as?: "span" | "p" | "div";
  style?: CSSProperties;
}

/**
 * Text that reveals line by line with a mask effect
 */
export function TextLineReveal({
  text,
  className,
  staggerDelay = 0.1,
  lineHeight = "1.2em",
  as: Component = "span",
  style,
}: TextLineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" as `${number}px` });

  const lines = text.split("\n");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn("overflow-hidden", className)}
      style={style}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {lines.map((line, index) => (
        <div key={index} className="overflow-hidden" style={{ lineHeight }}>
          <motion.span
            className="block"
            variants={lineVariants}
          >
            {line}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
}

// ============================================================================
// ImageRevealSequence
// ============================================================================

interface ImageRevealSequenceProps {
  images: string[];
  className?: string;
  /**
   * Time each image stays visible
   * @default 2
   */
  displayTime?: number;
  /**
   * Transition duration
   * @default 0.5
   */
  transitionDuration?: number;
  /**
   * Transition type
   * @default "fade"
   */
  transition?: "fade" | "slide" | "scale" | "flip";
  style?: CSSProperties;
}

/**
 * Cycles through images with animations
 */
export function ImageRevealSequence({
  images,
  className,
  displayTime = 2,
  transitionDuration = 0.5,
  transition = "fade",
  style,
}: ImageRevealSequenceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false });

  const getVariants = () => {
    switch (transition) {
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        };
      case "slide":
        return {
          initial: { x: "100%", opacity: 0 },
          animate: { x: 0, opacity: 1 },
        };
      case "scale":
        return {
          initial: { scale: 0.8, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
        };
      case "flip":
        return {
          initial: { rotateY: 90, opacity: 0 },
          animate: { rotateY: 0, opacity: 1 },
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        };
    }
  };

  const variants = getVariants();

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{ perspective: transition === "flip" ? 1000 : undefined, ...style }}
    >
      {images.map((src, index) => (
        <motion.img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={variants.initial}
          animate={isInView ? variants.animate : variants.initial}
          transition={{
            duration: transitionDuration,
            delay: index * (displayTime + transitionDuration),
            repeat: Infinity,
            repeatDelay: (images.length - 1) * (displayTime + transitionDuration),
          }}
        />
      ))}
    </div>
  );
}
