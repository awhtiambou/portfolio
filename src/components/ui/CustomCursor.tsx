"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

interface CursorState {
  isHovering: boolean;
  isClicking: boolean;
  cursorText: string;
  cursorVariant: "default" | "hover" | "click" | "text" | "hidden";
}

export function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    isClicking: false,
    cursorText: "",
    cursorVariant: "default",
  });
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Smooth cursor position with spring physics
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Dot follows with slight delay
  const dotX = useSpring(cursorX, { damping: 35, stiffness: 300 });
  const dotY = useSpring(cursorY, { damping: 35, stiffness: 300 });

  const onMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  }, [cursorX, cursorY]);

  const onMouseDown = useCallback(() => {
    setCursorState((prev) => ({ ...prev, isClicking: true }));
  }, []);

  const onMouseUp = useCallback(() => {
    setCursorState((prev) => ({ ...prev, isClicking: false }));
  }, []);

  const onMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Mouse events
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.body.addEventListener("mouseenter", onMouseEnter);
    document.body.addEventListener("mouseleave", onMouseLeave);

    // Add hover detection for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"], [data-cursor-text], .cursor-hover'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          const cursorText = el.getAttribute("data-cursor-text") || "";
          setCursorState({
            isHovering: true,
            isClicking: false,
            cursorText,
            cursorVariant: cursorText ? "text" : "hover",
          });
        });

        el.addEventListener("mouseleave", () => {
          setCursorState({
            isHovering: false,
            isClicking: false,
            cursorText: "",
            cursorVariant: "default",
          });
        });
      });
    };

    // Initial setup and mutation observer for dynamic content
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.body.removeEventListener("mouseenter", onMouseEnter);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", checkMobile);
      observer.disconnect();
    };
  }, [onMouseMove, onMouseDown, onMouseUp, onMouseEnter, onMouseLeave]);

  // Don't render on mobile or touch devices
  if (isMobile) return null;

  const { isHovering, isClicking, cursorText, cursorVariant } = cursorState;

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
          animate={{
            width: isHovering ? (cursorText ? 120 : 60) : 40,
            height: isHovering ? (cursorText ? 120 : 60) : 40,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white"
            animate={{
              scale: isClicking ? 0.8 : 1,
              borderWidth: isHovering ? 0 : 1,
              backgroundColor: isHovering ? "#ffffff" : "transparent",
            }}
            transition={{ duration: 0.15 }}
          />
          <AnimatePresence>
            {cursorText && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-white text-xs font-medium text-center"
              >
                {cursorText}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
        }}
      >
        <motion.div
          className="w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isHovering ? 0 : isClicking ? 0.5 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Add global styles to hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        @media (max-width: 768px), (hover: none) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
}
