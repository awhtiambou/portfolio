"use client";

import { cn } from "@/lib/utils";
import type { WithChildren, WithClassName } from "@/types";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

interface HeadingProps extends WithChildren, WithClassName {
  as?: HeadingLevel;
  size?: HeadingSize;
  gradient?: boolean;
  accent?: "yellow" | "pink" | "blue" | "mint";
}

const sizeClasses: Record<HeadingSize, string> = {
  xs: "text-sm",
  sm: "text-lg",
  md: "text-xl md:text-2xl",
  lg: "text-2xl md:text-3xl",
  xl: "text-3xl md:text-4xl",
  "2xl": "text-4xl md:text-5xl",
  "3xl": "text-5xl md:text-6xl",
  "4xl": "text-6xl md:text-7xl",
};

const accentClasses: Record<string, string> = {
  yellow: "text-accent-yellow",
  pink: "text-accent-pink",
  blue: "text-accent-blue",
  mint: "text-accent-mint",
};

export function Heading({
  children,
  className,
  as: Component = "h2",
  size = "lg",
  gradient = false,
  accent,
}: HeadingProps) {
  return (
    <Component
      className={cn(
        "font-heading font-bold text-text-primary",
        sizeClasses[size],
        gradient && "bg-gradient-to-r from-accent-blue via-accent-pink to-accent-yellow bg-clip-text text-transparent",
        accent && accentClasses[accent],
        className
      )}
    >
      {children}
    </Component>
  );
}

type TextSize = "xs" | "sm" | "base" | "lg" | "xl";
type TextVariant = "default" | "muted" | "accent";

interface TextProps extends WithChildren, WithClassName {
  size?: TextSize;
  variant?: TextVariant;
  as?: "p" | "span" | "div";
  leading?: "tight" | "normal" | "relaxed";
}

const textSizeClasses: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const textVariantClasses: Record<TextVariant, string> = {
  default: "text-text-primary",
  muted: "text-text-secondary",
  accent: "text-accent-blue",
};

const leadingClasses = {
  tight: "leading-tight",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
};

export function Text({
  children,
  className,
  size = "base",
  variant = "default",
  as: Component = "p",
  leading = "relaxed",
}: TextProps) {
  return (
    <Component
      className={cn(
        "font-body",
        textSizeClasses[size],
        textVariantClasses[variant],
        leadingClasses[leading],
        className
      )}
    >
      {children}
    </Component>
  );
}

interface SectionTitleProps extends WithClassName {
  title: string;
  subtitle?: string;
  centered?: boolean;
  size?: HeadingSize;
}

export function SectionTitle({
  title,
  subtitle,
  centered = true,
  size = "xl",
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      <Heading size={size} className="mb-4">
        {title}
      </Heading>
      {subtitle && (
        <Text variant="muted" size="lg" className="max-w-2xl mx-auto">
          {subtitle}
        </Text>
      )}
    </div>
  );
}
