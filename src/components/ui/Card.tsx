"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardHover } from "@/lib/animations";
import type { WithChildren, WithClassName } from "@/types";

interface CardProps extends WithChildren, WithClassName {
  /** Card visual variant */
  variant?: "default" | "elevated" | "outlined" | "glass";
  /** Enable hover animation */
  hoverable?: boolean;
  /** Padding size */
  padding?: "none" | "sm" | "md" | "lg";
  /** Click handler (makes card interactive) */
  onClick?: () => void;
  /** HTML element to render as */
  as?: "div" | "article" | "section";
}

const variantClasses = {
  default: "bg-background-secondary",
  elevated: "bg-background-secondary shadow-lg",
  outlined: "bg-transparent border border-border",
  glass: "bg-background-secondary/50 backdrop-blur-sm",
};

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      variant = "default",
      hoverable = true,
      padding = "md",
      onClick,
      as: Component = "div",
    },
    ref
  ) => {
    const classes = cn(
      "rounded-xl transition-all duration-300",
      variantClasses[variant],
      paddingClasses[padding],
      onClick && "cursor-pointer",
      className
    );

    if (hoverable) {
      return (
        <motion.div
          ref={ref}
          className={classes}
          variants={cardHover}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          onClick={onClick}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <Component ref={ref} className={classes} onClick={onClick}>
        {children}
      </Component>
    );
  }
);

Card.displayName = "Card";

interface CardHeaderProps extends WithChildren, WithClassName {}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
}

interface CardTitleProps extends WithChildren, WithClassName {
  as?: "h2" | "h3" | "h4";
}

export function CardTitle({ children, className, as: Component = "h3" }: CardTitleProps) {
  return (
    <Component className={cn("font-heading font-semibold text-text-primary", className)}>
      {children}
    </Component>
  );
}

interface CardDescriptionProps extends WithChildren, WithClassName {}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn("text-text-secondary text-sm mt-1", className)}>
      {children}
    </p>
  );
}

interface CardContentProps extends WithChildren, WithClassName {}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn("", className)}>{children}</div>;
}

interface CardFooterProps extends WithChildren, WithClassName {}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn("mt-4 pt-4 border-t border-border", className)}>
      {children}
    </div>
  );
}
