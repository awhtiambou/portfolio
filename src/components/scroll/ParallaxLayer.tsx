"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { useRef, ReactNode, CSSProperties, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  /**
   * Parallax speed multiplier. Negative = opposite direction.
   * @default 0.5
   */
  speed?: number;
  /**
   * Direction of parallax movement
   * @default "vertical"
   */
  direction?: "vertical" | "horizontal" | "both";
  /**
   * Enable rotation based on scroll
   * @default false
   */
  rotate?: boolean;
  /**
   * Enable scale based on scroll
   * @default false
   */
  scale?: boolean;
  /**
   * Enable opacity fade based on scroll
   * @default false
   */
  fade?: boolean;
  /**
   * Scroll container element (defaults to window)
   */
  container?: React.RefObject<HTMLElement>;
  style?: CSSProperties;
}

export function ParallaxLayer({
  children,
  className,
  speed = 0.5,
  direction = "vertical",
  rotate = false,
  scale = false,
  fade = false,
  container,
  style,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    ...(container && { container }),
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);
  const x = useTransform(scrollYProgress, [0, 1], [-50 * speed, 50 * speed]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, 15 * speed]);
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothX = useSpring(x, { stiffness: 100, damping: 30 });
  const smoothRotate = useSpring(rotateZ, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scaleValue, { stiffness: 100, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{
        y: direction === "vertical" || direction === "both" ? smoothY : 0,
        x: direction === "horizontal" || direction === "both" ? smoothX : 0,
        rotate: rotate ? smoothRotate : 0,
        scale: scale ? smoothScale : 1,
        opacity: fade ? smoothOpacity : 1,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  /**
   * Parallax speed multiplier
   * @default 0.3
   */
  speed?: number;
  /**
   * Container height class
   * @default "h-[50vh]"
   */
  height?: string;
  /**
   * Extra scale to prevent edges showing
   * @default 1.2
   */
  imageScale?: number;
  style?: CSSProperties;
}

/**
 * A parallax image container that moves slower than scroll
 */
export function ParallaxImage({
  src,
  alt,
  className,
  speed = 0.3,
  height = "h-[50vh]",
  imageScale = 1.2,
  style,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", height, className)}
      style={style}
    >
      <motion.img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        style={{
          y: smoothY,
          scale: imageScale,
        }}
      />
    </div>
  );
}

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  /**
   * Floating animation intensity
   * @default 20
   */
  intensity?: number;
  /**
   * Animation duration in seconds
   * @default 3
   */
  duration?: number;
  /**
   * Delay before animation starts
   * @default 0
   */
  delay?: number;
  /**
   * Enable rotation in float animation
   * @default false
   */
  rotate?: boolean;
  style?: CSSProperties;
}

/**
 * An element that floats up and down continuously
 */
export function FloatingElement({
  children,
  className,
  intensity = 20,
  duration = 3,
  delay = 0,
  rotate = false,
  style,
}: FloatingElementProps) {
  return (
    <motion.div
      className={cn("will-change-transform", className)}
      animate={{
        y: [-intensity / 2, intensity / 2, -intensity / 2],
        rotate: rotate ? [-2, 2, -2] : 0,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

interface DepthLayerProps {
  children: ReactNode;
  className?: string;
  /**
   * Depth level (higher = further back, slower)
   * @default 1
   */
  depth?: number;
  style?: CSSProperties;
}

/**
 * Creates a depth effect where elements at different depths move at different speeds
 */
export function DepthLayer({
  children,
  className,
  depth = 1,
  style,
}: DepthLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Higher depth = slower movement
  const speed = 1 / depth;
  const y = useTransform(scrollYProgress, [0, 1], [-50 * speed, 50 * speed]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{
        y: smoothY,
        zIndex: -depth,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Multi-Layer Parallax Background
// ============================================================================

interface ParallaxBackgroundLayer {
  content: ReactNode;
  speed: number;
  className?: string;
  zIndex?: number;
}

interface MultiLayerParallaxProps {
  children: ReactNode;
  layers: ParallaxBackgroundLayer[];
  className?: string;
  style?: CSSProperties;
}

/**
 * Creates a parallax background with multiple layers moving at different speeds
 */
export function MultiLayerParallax({
  children,
  layers,
  className,
  style,
}: MultiLayerParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={style}
    >
      {/* Background Layers */}
      {layers.map((layer, index) => {
        const y = useTransform(
          scrollYProgress,
          [0, 1],
          [-100 * layer.speed, 100 * layer.speed]
        );
        const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

        return (
          <motion.div
            key={index}
            className={cn("absolute inset-0 will-change-transform", layer.className)}
            style={{
              y: smoothY,
              zIndex: layer.zIndex ?? -index - 1,
            }}
          >
            {layer.content}
          </motion.div>
        );
      })}

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================================================================
// Parallax Reveal (Depth-based image reveal)
// ============================================================================

interface ParallaxRevealProps {
  children: ReactNode;
  className?: string;
  /**
   * Direction of the reveal
   * @default "up"
   */
  direction?: "up" | "down" | "left" | "right";
  /**
   * How much offset before revealing (in pixels or %)
   * @default 100
   */
  offset?: number;
  /**
   * Scale multiplier during reveal
   * @default 1.1
   */
  scale?: number;
  style?: CSSProperties;
}

/**
 * Content reveals with parallax shift as it enters viewport
 */
export function ParallaxReveal({
  children,
  className,
  direction = "up",
  offset = 100,
  scale = 1.1,
  style,
}: ParallaxRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const getTransformValues = () => {
    switch (direction) {
      case "up":
        return { x: 0, y: offset };
      case "down":
        return { x: 0, y: -offset };
      case "left":
        return { x: offset, y: 0 };
      case "right":
        return { x: -offset, y: 0 };
    }
  };

  const { x: startX, y: startY } = getTransformValues();

  const x = useTransform(scrollYProgress, [0, 1], [startX, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [startY, 0]);
  const scaleValue = useTransform(scrollYProgress, [0, 1], [scale, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  const smoothX = useSpring(x, { stiffness: 100, damping: 25 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 25 });
  const smoothScale = useSpring(scaleValue, { stiffness: 100, damping: 25 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 25 });

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden", className)}
      style={style}
    >
      <motion.div
        className="will-change-transform"
        style={{
          x: smoothX,
          y: smoothY,
          scale: smoothScale,
          opacity: smoothOpacity,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ============================================================================
// Scroll-Linked Floating Element
// ============================================================================

interface ScrollFloatProps {
  children: ReactNode;
  className?: string;
  /**
   * Scroll speed multiplier
   * @default 0.5
   */
  speed?: number;
  /**
   * Additional floating animation
   * @default true
   */
  float?: boolean;
  /**
   * Float animation intensity
   * @default 10
   */
  floatIntensity?: number;
  style?: CSSProperties;
}

/**
 * Floating element that also responds to scroll
 */
export function ScrollFloat({
  children,
  className,
  speed = 0.5,
  float = true,
  floatIntensity = 10,
  style,
}: ScrollFloatProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], [-50 * speed, 50 * speed]);
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{
        y: smoothScrollY,
        ...style,
      }}
      animate={
        float
          ? {
              y: [-floatIntensity / 2, floatIntensity / 2, -floatIntensity / 2],
            }
          : undefined
      }
      transition={
        float
          ? {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Mouse-tracking Parallax
// ============================================================================

interface MouseParallaxProps {
  children: ReactNode;
  className?: string;
  /**
   * Movement intensity multiplier
   * @default 20
   */
  intensity?: number;
  /**
   * Invert the movement direction
   * @default false
   */
  invert?: boolean;
  style?: CSSProperties;
}

/**
 * Element that moves based on mouse position (parallax on hover)
 */
export function MouseParallax({
  children,
  className,
  intensity = 20,
  invert = false,
  style,
}: MouseParallaxProps) {
  const [mounted, setMounted] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xOffset = ((clientX / innerWidth) - 0.5) * intensity * (invert ? -1 : 1);
      const yOffset = ((clientY / innerHeight) - 0.5) * intensity * (invert ? -1 : 1);

      x.set(xOffset);
      y.set(yOffset);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [intensity, invert, x, y]);

  if (!mounted) {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      style={{
        x: smoothX,
        y: smoothY,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
