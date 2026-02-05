"use client";

import { cn } from "@/lib/utils";
import type { WithChildren, WithClassName } from "@/types";

type BadgeVariant = "default" | "primary" | "secondary" | "outline" | "accent-yellow" | "accent-pink" | "accent-blue" | "accent-mint";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps extends WithChildren, WithClassName {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-background-secondary text-text-secondary",
  primary: "bg-text-primary text-background-primary",
  secondary: "bg-background-secondary text-text-primary",
  outline: "border border-border text-text-secondary bg-transparent",
  "accent-yellow": "bg-accent-yellow/20 text-accent-yellow border border-accent-yellow/30",
  "accent-pink": "bg-accent-pink/20 text-accent-pink border border-accent-pink/30",
  "accent-blue": "bg-accent-blue/20 text-accent-blue border border-accent-blue/30",
  "accent-mint": "bg-accent-mint/20 text-accent-mint border border-accent-mint/30",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-base",
};

export function Badge({
  children,
  className,
  variant = "default",
  size = "md",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}

// Skill-specific badge with level indicator
interface SkillBadgeProps extends BadgeProps {
  level?: "beginner" | "intermediate" | "advanced" | "expert";
}

const levelColors: Record<string, BadgeVariant> = {
  beginner: "accent-yellow",
  intermediate: "accent-mint",
  advanced: "accent-blue",
  expert: "accent-pink",
};

export function SkillBadge({ level = "intermediate", ...props }: SkillBadgeProps) {
  return <Badge variant={levelColors[level]} {...props} />;
}
