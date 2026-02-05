"use client";

import { cn } from "@/lib/utils";
import type { WithChildren, WithClassName } from "@/types";

interface ContainerProps extends WithChildren, WithClassName {
  /** Maximum width variant */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Add padding on x-axis */
  padded?: boolean;
  /** Center content */
  centered?: boolean;
  /** HTML element to render as */
  as?: "div" | "section" | "article" | "main" | "aside";
}

const sizeClasses = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

export function Container({
  children,
  className,
  size = "xl",
  padded = true,
  centered = true,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        sizeClasses[size],
        padded && "px-4 sm:px-6 lg:px-8",
        centered && "mx-auto",
        className
      )}
    >
      {children}
    </Component>
  );
}
