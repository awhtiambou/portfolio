"use client";

import { motion, useTransform, useSpring, useMotionValue, useMotionTemplate, MotionValue } from "framer-motion";
import { useRef, ReactNode, CSSProperties, useEffect, useState } from "react";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";
import { cn } from "@/lib/utils";

// ============================================================================
// Velocity Skew - Text/elements that skew based on scroll speed
// ============================================================================

interface VelocitySkewProps {
  children: ReactNode;
  className?: string;
  /**
   * Maximum skew angle in degrees
   * @default 15
   */
  maxSkew?: number;
  /**
   * Skew axis
   * @default "y"
   */
  axis?: "x" | "y" | "both";
  /**
   * HTML tag to render
   * @default "div"
   */
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "section";
  style?: CSSProperties;
}

/**
 * Elements that skew based on scroll velocity
 */
export function VelocitySkew({
  children,
  className,
  maxSkew = 15,
  axis = "y",
  as: Component = "div",
  style,
}: VelocitySkewProps) {
  const { smoothVelocity } = useScrollVelocity({ clamp: 150 });

  const skewY = useTransform(smoothVelocity, [-150, 0, 150], [-maxSkew, 0, maxSkew]);
  const skewX = useTransform(smoothVelocity, [-150, 0, 150], [-maxSkew / 2, 0, maxSkew / 2]);

  const smoothSkewY = useSpring(skewY, { stiffness: 200, damping: 30 });
  const smoothSkewX = useSpring(skewX, { stiffness: 200, damping: 30 });

  const MotionComponent = motion[Component] as typeof motion.div;

  return (
    <MotionComponent
      className={cn("will-change-transform", className)}
      style={{
        skewY: axis === "y" || axis === "both" ? smoothSkewY : 0,
        skewX: axis === "x" || axis === "both" ? smoothSkewX : 0,
        transformOrigin: "center center",
        ...style,
      }}
    >
      {children}
    </MotionComponent>
  );
}

// ============================================================================
// Velocity Stretch - Elements that stretch/compress on scroll
// ============================================================================

interface VelocityStretchProps {
  children: ReactNode;
  className?: string;
  /**
   * Maximum stretch multiplier (1 = no stretch, 1.2 = 20% stretch)
   * @default 1.15
   */
  maxStretch?: number;
  /**
   * Stretch axis
   * @default "y"
   */
  axis?: "x" | "y" | "both";
  /**
   * HTML tag to render
   * @default "div"
   */
  as?: "div" | "span" | "p";
  style?: CSSProperties;
}

/**
 * Elements that stretch/compress based on scroll velocity
 */
export function VelocityStretch({
  children,
  className,
  maxStretch = 1.15,
  axis = "y",
  as: Component = "div",
  style,
}: VelocityStretchProps) {
  const { absVelocity } = useScrollVelocity({ clamp: 100 });

  // Stretch on fast scroll, compress back to normal on slow/stop
  const stretchY = useTransform(absVelocity, [0, 100], [1, maxStretch]);
  const compressY = useTransform(absVelocity, [0, 100], [1, 2 - maxStretch]); // inverse
  const stretchX = useTransform(absVelocity, [0, 100], [1, maxStretch]);
  const compressX = useTransform(absVelocity, [0, 100], [1, 2 - maxStretch]);

  const smoothStretchY = useSpring(stretchY, { stiffness: 300, damping: 25 });
  const smoothCompressY = useSpring(compressY, { stiffness: 300, damping: 25 });
  const smoothStretchX = useSpring(stretchX, { stiffness: 300, damping: 25 });

  const MotionComponent = motion[Component] as typeof motion.div;

  const getScale = () => {
    switch (axis) {
      case "y":
        return { scaleY: smoothStretchY, scaleX: smoothCompressY };
      case "x":
        return { scaleX: smoothStretchX, scaleY: smoothCompressY };
      case "both":
        return { scaleX: smoothStretchX, scaleY: smoothStretchY };
    }
  };

  return (
    <MotionComponent
      className={cn("will-change-transform origin-center", className)}
      style={{
        ...getScale(),
        ...style,
      }}
    >
      {children}
    </MotionComponent>
  );
}

// ============================================================================
// Momentum Blur - Blur effect on fast scroll
// ============================================================================

interface MomentumBlurProps {
  children: ReactNode;
  className?: string;
  /**
   * Maximum blur in pixels
   * @default 8
   */
  maxBlur?: number;
  /**
   * Blur direction based on scroll
   * @default "vertical"
   */
  direction?: "vertical" | "horizontal" | "radial";
  style?: CSSProperties;
}

/**
 * Applies motion blur effect based on scroll velocity
 */
export function MomentumBlur({
  children,
  className,
  maxBlur = 8,
  direction = "vertical",
  style,
}: MomentumBlurProps) {
  const { absVelocity, smoothVelocity } = useScrollVelocity({ clamp: 150 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const blurAmount = useTransform(absVelocity, [0, 150], [0, maxBlur]);
  const smoothBlur = useSpring(blurAmount, { stiffness: 200, damping: 30 });

  // Create directional blur filter
  const blurFilter = useMotionTemplate`blur(${smoothBlur}px)`;

  if (!mounted) {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      style={{
        filter: blurFilter,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Velocity Opacity - Fade based on scroll speed
// ============================================================================

interface VelocityOpacityProps {
  children: ReactNode;
  className?: string;
  /**
   * Minimum opacity when scrolling fast
   * @default 0.3
   */
  minOpacity?: number;
  /**
   * Invert behavior (fade in on scroll instead of out)
   * @default false
   */
  invert?: boolean;
  style?: CSSProperties;
}

/**
 * Element that fades based on scroll velocity
 */
export function VelocityOpacity({
  children,
  className,
  minOpacity = 0.3,
  invert = false,
  style,
}: VelocityOpacityProps) {
  const { absVelocity } = useScrollVelocity({ clamp: 100 });

  const opacity = useTransform(
    absVelocity,
    [0, 100],
    invert ? [minOpacity, 1] : [1, minOpacity]
  );
  const smoothOpacity = useSpring(opacity, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className={className}
      style={{
        opacity: smoothOpacity,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Velocity Color Shift - Color/hue changes on scroll
// ============================================================================

interface VelocityColorShiftProps {
  children: ReactNode;
  className?: string;
  /**
   * Starting hue rotation (degrees)
   * @default 0
   */
  fromHue?: number;
  /**
   * Ending hue rotation (degrees)
   * @default 30
   */
  toHue?: number;
  /**
   * Saturation boost percentage
   * @default 0
   */
  saturationBoost?: number;
  style?: CSSProperties;
}

/**
 * Element with color/hue shift based on scroll velocity
 */
export function VelocityColorShift({
  children,
  className,
  fromHue = 0,
  toHue = 30,
  saturationBoost = 0,
  style,
}: VelocityColorShiftProps) {
  const { absVelocity } = useScrollVelocity({ clamp: 100 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hue = useTransform(absVelocity, [0, 100], [fromHue, toHue]);
  const saturation = useTransform(absVelocity, [0, 100], [100, 100 + saturationBoost]);

  const smoothHue = useSpring(hue, { stiffness: 200, damping: 30 });
  const smoothSaturation = useSpring(saturation, { stiffness: 200, damping: 30 });

  const filter = useMotionTemplate`hue-rotate(${smoothHue}deg) saturate(${smoothSaturation}%)`;

  if (!mounted) {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{
        filter,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Velocity Wave - Wave distortion effect
// ============================================================================

interface VelocityWaveProps {
  children: ReactNode;
  className?: string;
  /**
   * Maximum wave intensity
   * @default 5
   */
  intensity?: number;
  style?: CSSProperties;
}

/**
 * SVG filter-based wave distortion on scroll
 */
export function VelocityWave({
  children,
  className,
  intensity = 5,
  style,
}: VelocityWaveProps) {
  const { absVelocity } = useScrollVelocity({ clamp: 100 });
  const filterId = useRef(`velocity-wave-${Math.random().toString(36).substr(2, 9)}`);
  const [mounted, setMounted] = useState(false);

  const turbulence = useTransform(absVelocity, [0, 100], [0, intensity / 100]);
  const smoothTurbulence = useSpring(turbulence, { stiffness: 200, damping: 30 });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <>
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id={filterId.current}>
            <motion.feTurbulence
              type="turbulence"
              baseFrequency={smoothTurbulence}
              numOctaves="3"
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="10"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <div
        className={className}
        style={{
          filter: `url(#${filterId.current})`,
          ...style,
        }}
      >
        {children}
      </div>
    </>
  );
}
