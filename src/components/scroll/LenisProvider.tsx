"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

interface LenisContextValue {
  lenis: Lenis | null;
  scrollProgress: number;
  scrollVelocity: number;
  scrollDirection: "up" | "down" | "none";
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollProgress: 0,
  scrollVelocity: 0,
  scrollDirection: "none",
});

export function useLenis() {
  return useContext(LenisContext);
}

interface LenisProviderProps {
  children: ReactNode;
  options?: ConstructorParameters<typeof Lenis>[0];
}

export function LenisProvider({ children, options }: LenisProviderProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | "none">("none");
  const pathname = usePathname();
  const lenis = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return new Lenis({
      duration: prefersReducedMotion ? 0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: !prefersReducedMotion,
      touchMultiplier: 2,
      ...options,
    });
  }, [options]);

  useEffect(() => {
    if (!lenis) {
      return;
    }

    const lenisInstance = lenis;

    // Scroll event handler
    lenisInstance.on("scroll", ({ progress, velocity, direction }: { progress: number; velocity: number; direction: number }) => {
      setScrollProgress(progress);
      setScrollVelocity(velocity);
      setScrollDirection(direction > 0 ? "down" : direction < 0 ? "up" : "none");
    });

    // Animation frame loop
    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
    };
  }, [lenis]);

  // Scroll to top on route change
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [lenis, pathname]);

  return (
    <LenisContext.Provider
      value={{
        lenis,
        scrollProgress,
        scrollVelocity,
        scrollDirection,
      }}
    >
      {children}
    </LenisContext.Provider>
  );
}
