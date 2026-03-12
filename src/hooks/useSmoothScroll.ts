"use client";

import { useLenis } from "@/components/scroll/LenisProvider";
import { useCallback } from "react";

interface ScrollToOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
  easing?: (t: number) => number;
}

export function useSmoothScroll() {
  const { lenis, scrollProgress, scrollVelocity, scrollDirection } = useLenis();

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: ScrollToOptions) => {
      if (!lenis) return;
      lenis.scrollTo(target, options);
    },
    [lenis]
  );

  const scrollToTop = useCallback(
    (options?: ScrollToOptions) => {
      if (!lenis) return;
      lenis.scrollTo(0, options);
    },
    [lenis]
  );

  const scrollToElement = useCallback(
    (selector: string, options?: ScrollToOptions) => {
      if (!lenis) return;
      const element = document.querySelector(selector);
      if (element) {
        lenis.scrollTo(element as HTMLElement, options);
      }
    },
    [lenis]
  );

  const stop = useCallback(() => {
    if (!lenis) return;
    lenis.stop();
  }, [lenis]);

  const start = useCallback(() => {
    if (!lenis) return;
    lenis.start();
  }, [lenis]);

  return {
    lenis,
    scrollProgress,
    scrollVelocity,
    scrollDirection,
    scrollTo,
    scrollToTop,
    scrollToElement,
    stop,
    start,
  };
}
