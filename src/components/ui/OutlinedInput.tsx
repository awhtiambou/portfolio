"use client";

import { useState, useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface OutlinedInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  className?: string;
  disabled?: boolean;
}

export function OutlinedInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  multiline = false,
  rows = 5,
  className,
  disabled = false,
}: OutlinedInputProps) {
  const [focused, setFocused] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const id = useId();

  const isActive = focused || value.length > 0;
  const accentColor = isDark ? "var(--color-yellow)" : "var(--color-blue)";

  const sharedClasses = cn(
    "peer w-full bg-transparent px-4 pb-2 text-text-primary text-base",
    "disabled:cursor-not-allowed disabled:opacity-60",
    multiline ? "pt-7 resize-none [&::-webkit-scrollbar]:hidden" : "pt-5",
  );

  const noOutlineStyle: React.CSSProperties = {
    border: "none",
    outline: "none",
    boxShadow: "none",
    ...(multiline && {
      scrollbarWidth: "none" as const,
    }),
  };

  return (
    <div className={cn("relative group", className)}>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          rows={rows}
          disabled={disabled}
          className={sharedClasses}
          style={noOutlineStyle}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          disabled={disabled}
          className={sharedClasses}
          style={noOutlineStyle}
        />
      )}

      {/* Animated border with legend notch */}
      <motion.fieldset
        className="pointer-events-none absolute inset-0 rounded-lg border-2 m-0 px-2"
        animate={{
          borderColor: isActive ? accentColor : isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.2)",
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.legend
          className="invisible h-0 overflow-hidden font-mono uppercase tracking-[0.2em] text-xs whitespace-nowrap px-1"
          animate={{ width: isActive ? "auto" : 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}{required && " *"}
        </motion.legend>
      </motion.fieldset>

      {/* Floating label */}
      <motion.label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-4 font-mono uppercase tracking-[0.2em] text-xs origin-top-left",
        )}
        animate={{
          y: isActive ? -8 : multiline ? 14 : 14,
          scale: isActive ? 0.85 : 1,
          color: focused ? accentColor : isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)",
        }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        {label}{required && " *"}
      </motion.label>


    </div>
  );
}
