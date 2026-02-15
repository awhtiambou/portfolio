"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";
import { Container } from "./Container";
import type { WithChildren, WithClassName } from "@/types";

interface SectionProps extends WithChildren, WithClassName {
  /** Section ID for navigation */
  id?: string;
  /** Background variant */
  variant?: "default" | "alternate" | "accent";
  /** Vertical padding size */
  spacing?: "sm" | "md" | "lg" | "xl";
  /** Container size */
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  /** Enable scroll animation */
  animated?: boolean;
}

const spacingClasses = {
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
  xl: "py-24 md:py-32",
};

const variantClasses = {
  default: "bg-transparent",
  alternate: "bg-transparent",
  accent: "bg-transparent",
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      className,
      id,
      variant = "default",
      spacing = "lg",
      containerSize = "xl",
      animated = true,
    },
    ref
  ) => {
    const content = (
      <Container size={containerSize}>{children}</Container>
    );

    return (
      <section
        ref={ref}
        id={id}
        className={cn(spacingClasses[spacing], variantClasses[variant], className)}
      >
        {animated ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            {content}
          </motion.div>
        ) : (
          content
        )}
      </section>
    );
  }
);

Section.displayName = "Section";
