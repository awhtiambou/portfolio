'use client';

import { useState, useEffect } from 'react';
import { breakpoints } from '@/config/theme';

type BreakpointKey = keyof typeof breakpoints;

/**
 * Hook to check if a media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);

    // Create listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener
    media.addEventListener('change', listener);

    // Cleanup
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

/**
 * Check if screen is at least the given breakpoint
 */
export function useBreakpoint(breakpoint: BreakpointKey): boolean {
  return useMediaQuery(`(min-width: ${breakpoints[breakpoint]}px)`);
}

/**
 * Check if screen is below the given breakpoint
 */
export function useBreakpointDown(breakpoint: BreakpointKey): boolean {
  return useMediaQuery(`(max-width: ${breakpoints[breakpoint] - 1}px)`);
}

/**
 * Common breakpoint hooks
 */
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

/**
 * Get current breakpoint name
 */
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
