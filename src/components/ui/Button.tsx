"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { WithChildren, WithClassName } from "@/types";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "accent";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends WithChildren, WithClassName {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-text-primary text-background-primary hover:bg-text-primary/90 shadow-sm",
  secondary:
    "bg-background-secondary text-text-primary hover:bg-background-secondary/80",
  outline:
    "border-2 border-text-primary text-text-primary hover:bg-text-primary hover:text-background-primary",
  ghost: "text-text-primary hover:bg-background-secondary",
  accent:
    "bg-accent-blue text-text-primary hover:bg-accent-blue/80 shadow-sm",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      href,
      disabled = false,
      loading = false,
      icon,
      iconPosition = "left",
      fullWidth = false,
      type = "button",
      onClick,
    },
    ref
  ) => {
    const baseClasses = cn(
      "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200",
      "focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      variantClasses[variant],
      sizeClasses[size],
      fullWidth && "w-full",
      className
    );

    const content = (
      <>
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && icon && iconPosition === "left" && icon}
        {children}
        {!loading && icon && iconPosition === "right" && icon}
      </>
    );

    if (href) {
      return (
        <motion.a
          href={href}
          className={baseClasses}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        className={baseClasses}
        disabled={disabled || loading}
        onClick={onClick}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
