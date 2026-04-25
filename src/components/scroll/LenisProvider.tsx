"use client";

import { createContext, useContext, useEffect, useMemo, ReactNode } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useInteractionProfile } from "@/hooks/useInteractionProfile";

interface LenisContextValue {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
});

export function useLenis() {
  return useContext(LenisContext);
}

interface LenisProviderProps {
  children: ReactNode;
  options?: ConstructorParameters<typeof Lenis>[0];
}

export function LenisProvider({ children, options }: LenisProviderProps) {
  const pathname = usePathname();
  const { prefersReducedMotion, useLiteAnimations } = useInteractionProfile();
  const lenis = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return new Lenis({
      duration: prefersReducedMotion ? 0 : useLiteAnimations ? 0.75 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: !prefersReducedMotion,
      syncTouch: useLiteAnimations && !prefersReducedMotion,
      touchMultiplier: useLiteAnimations ? 1 : 2,
      autoRaf: true,
      ...options,
    });
  }, [options, prefersReducedMotion, useLiteAnimations]);

  useEffect(() => {
    return () => {
      lenis?.destroy();
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
      }}
    >
      {children}
    </LenisContext.Provider>
  );
}
