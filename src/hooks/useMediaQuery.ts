'use client';

import { useState, useEffect } from 'react';
import { breakpoints } from '@/config/theme';

type BreakpointKey = keyof typeof breakpoints;

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

export function useBreakpoint(breakpoint: BreakpointKey): boolean {
  return useMediaQuery(`(min-width: ${breakpoints[breakpoint]}px)`);
}

export function useBreakpointDown(breakpoint: BreakpointKey): boolean {
  return useMediaQuery(`(max-width: ${breakpoints[breakpoint] - 1}px)`);
}

export function useIsMobile(): boolean {
  return useBreakpointDown('md');
}

export function useIsTablet(): boolean {
  const isAboveSm = useBreakpoint('sm');
  const isBelowLg = useBreakpointDown('lg');
  return isAboveSm && isBelowLg;
}

export function useIsDesktop(): boolean {
  return useBreakpoint('lg');
}

export function useCurrentBreakpoint(): BreakpointKey {
  const is2xl = useBreakpoint('2xl');
  const isXl = useBreakpoint('xl');
  const isLg = useBreakpoint('lg');
  const isMd = useBreakpoint('md');
  const isSm = useBreakpoint('sm');

  if (is2xl) return '2xl';
  if (isXl) return 'xl';
  if (isLg) return 'lg';
  if (isMd) return 'md';
  if (isSm) return 'sm';
  return 'xs';
}
