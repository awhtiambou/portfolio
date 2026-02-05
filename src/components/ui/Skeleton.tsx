"use client";

import { cn } from "@/lib/utils";
import type { WithClassName } from "@/types";

type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";

interface SkeletonProps extends WithClassName {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
}

const variantClasses: Record<SkeletonVariant, string> = {
  text: "rounded",
  circular: "rounded-full",
  rectangular: "rounded-none",
  rounded: "rounded-lg",
};

export function Skeleton({
  className,
  variant = "text",
  width,
  height,
  animation = "pulse",
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-background-secondary",
        animation === "pulse" && "animate-pulse",
        animation === "wave" && "animate-shimmer",
        variantClasses[variant],
        className
      )}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  );
}

// Pre-built skeleton components
export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={16}
          width={i === lines - 1 ? "60%" : "100%"}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("p-6 bg-background-secondary rounded-xl", className)}>
      <Skeleton variant="rounded" height={200} className="mb-4" />
      <Skeleton height={24} width="70%" className="mb-2" />
      <SkeletonText lines={2} />
    </div>
  );
}

export function SkeletonAvatar({ size = 48, className }: { size?: number; className?: string }) {
  return (
    <Skeleton
      variant="circular"
      width={size}
      height={size}
      className={className}
    />
  );
}
