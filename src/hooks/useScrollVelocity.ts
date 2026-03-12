"use client";

import { useScroll, useVelocity, useSpring, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface UseScrollVelocityOptions {
  /**
   * Clamp velocity to this range [-max, max]
   * @default 100
   */
  clamp?: number;
  /**
   * Spring stiffness for smoothing
   * @default 300
   */
  stiffness?: number;
  /**
   * Spring damping for smoothing
   * @default 50
   */
  damping?: number;
}

interface UseScrollVelocityReturn {
  /** Raw scroll Y position */
  scrollY: MotionValue<number>;
  /** Raw velocity (can be negative) */
  velocity: MotionValue<number>;
  /** Smoothed velocity */
  smoothVelocity: MotionValue<number>;
  /** Absolute velocity (always positive) */
  absVelocity: MotionValue<number>;
  /** Normalized velocity (0-1 range) */
  normalizedVelocity: MotionValue<number>;
  /** Reference to attach to scroll container (optional) */
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function useScrollVelocity(options: UseScrollVelocityOptions = {}): UseScrollVelocityReturn {
  const { clamp = 100, stiffness = 300, damping = 50 } = options;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  
  const smoothVelocity = useSpring(velocity, {
    stiffness,
    damping,
    restDelta: 0.001,
  });

  const absVelocity = useTransform(smoothVelocity, (v) => Math.abs(v));
  
  const normalizedVelocity = useTransform(
    smoothVelocity,
    [-clamp, 0, clamp],
    [1, 0, 1]
  );

  return {
    scrollY,
    velocity,
    smoothVelocity,
    absVelocity,
    normalizedVelocity,
    containerRef,
  };
}
