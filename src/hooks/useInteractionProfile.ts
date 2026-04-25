"use client";

import { useMediaQuery } from "./useMediaQuery";

interface InteractionProfile {
  isCoarsePointer: boolean;
  prefersReducedMotion: boolean;
  useLiteAnimations: boolean;
}

export function useInteractionProfile(): InteractionProfile {
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const anyCoarsePointer = useMediaQuery("(any-pointer: coarse)");
  const noHover = useMediaQuery("(hover: none)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const isCoarsePointer = coarsePointer || anyCoarsePointer || noHover;

  return {
    isCoarsePointer,
    prefersReducedMotion,
    useLiteAnimations: isCoarsePointer || prefersReducedMotion,
  };
}
