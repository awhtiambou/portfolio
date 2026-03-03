"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface TransitionContextValue {
  isTransitioning: boolean;
  triggerTransition: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextValue>({
  isTransitioning: false,
  triggerTransition: () => { },
});

export function useTransition() {
  return useContext(TransitionContext);
}

const ENTER_DURATION = 800; // ms before navigating — lets base layer linger

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const triggerTransition = useCallback(
    (href: string) => {
      if (isTransitioning) return;
      if (href === pathname) return;

      setIsTransitioning(true);

      setTimeout(() => {
        router.push(href);
        // exit animation: accent peels off fast, then base follows
        setTimeout(() => setIsTransitioning(false), 800);
      }, ENTER_DURATION);
    },
    [isTransitioning, pathname, router]
  );

  return (
    <TransitionContext.Provider value={{ isTransitioning, triggerTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}
