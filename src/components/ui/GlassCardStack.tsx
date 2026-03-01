"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";

interface GlassCardStackProps<T> {
    items: T[];
    renderCard: (item: T, index: number, isTop: boolean) => React.ReactNode;
    autoPlayInterval?: number;
    className?: string;
    isDark?: boolean;
    onActiveChange?: (index: number) => void;
}

// Spring config for the physics-based shuffle
const SPRING = {
    type: "spring" as const,
    stiffness: 260,
    damping: 30,
    mass: 0.8,
};

export function GlassCardStack<T>({
    items,
    renderCard,
    autoPlayInterval = 5000,
    className = "",
    isDark = true,
    onActiveChange,
}: GlassCardStackProps<T>) {
    // `order` tracks which item index is at each stack position
    // order[0] = item at top, order[1] = second from top, etc.
    const [order, setOrder] = useState<number[]>(() =>
        items.map((_, i) => i)
    );
    const [isAnimating, setIsAnimating] = useState(false);
    const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Drag state for the top card
    const dragX = useMotionValue(0);
    const dragRotate = useTransform(dragX, [-200, 0, 200], [-12, 0, 12]);

    const topItemIndex = order[0];

    // Shuffle forward: move front to back
    const shuffleForward = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setOrder((prev) => {
            const next = [...prev];
            const first = next.shift()!;
            next.push(first);
            return next;
        });
        // Allow re-shuffle after animation settles
        setTimeout(() => setIsAnimating(false), 500);
    }, [isAnimating]);

    // Shuffle backward: move back to front
    const shuffleBackward = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setOrder((prev) => {
            const next = [...prev];
            const last = next.pop()!;
            next.unshift(last);
            return next;
        });
        setTimeout(() => setIsAnimating(false), 500);
    }, [isAnimating]);

    // Notify parent of active card
    useEffect(() => {
        onActiveChange?.(topItemIndex);
    }, [topItemIndex, onActiveChange]);

    // Auto-play
    useEffect(() => {
        if (autoPlayInterval > 0) {
            autoPlayRef.current = setInterval(shuffleForward, autoPlayInterval);
        }
        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        };
    }, [autoPlayInterval, shuffleForward]);

    // Reset autoplay on interaction
    const resetAutoPlay = useCallback(() => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = setInterval(shuffleForward, autoPlayInterval);
        }
    }, [autoPlayInterval, shuffleForward]);

    // Handle click on top card
    const handleCardClick = useCallback(() => {
        resetAutoPlay();
        shuffleForward();
    }, [resetAutoPlay, shuffleForward]);

    // Handle swipe/drag end
    const handleDragEnd = useCallback(
        (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
            const threshold = 60;
            if (info.offset.x < -threshold) {
                resetAutoPlay();
                shuffleForward();
            } else if (info.offset.x > threshold) {
                resetAutoPlay();
                shuffleBackward();
            }
        },
        [resetAutoPlay, shuffleForward, shuffleBackward]
    );

    // Compute the stack position for each item index
    // Returns a map: itemIndex -> stackPosition (0 = top)
    const positionMap = new Map<number, number>();
    order.forEach((itemIndex, stackPos) => {
        positionMap.set(itemIndex, stackPos);
    });

    const maxVisible = Math.min(items.length, 5);

    // Get animated styles based on stack position
    const getTargetStyles = (stackPos: number) => {
        if (stackPos >= maxVisible) {
            return {
                x: 0,
                y: 0,
                rotate: 0,
                scale: 0.82,
                zIndex: 0,
            };
        }

        return {
            x: stackPos * 30,
            y: stackPos * -8,
            rotate: stackPos * 4,
            scale: 1 - stackPos * 0.04,
            zIndex: maxVisible - stackPos,
        };
    };

    // Glass style based on theme and stack position
    const getGlassStyle = (stackPos: number) => {
        const isTop = stackPos === 0;

        if (isDark) {
            return {
                background: isTop
                    ? "linear-gradient(145deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.06) 100%)"
                    : "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
                border: isTop
                    ? "1px solid rgba(255,255,255,0.14)"
                    : "1px solid rgba(255,255,255,0.08)",
                boxShadow: isTop
                    ? "0 25px 60px -12px rgba(0,0,0,0.35), inset 0 0 0 0.5px rgba(255,255,255,0.08)"
                    : "0 15px 40px -15px rgba(0,0,0,0.25), inset 0 0 0 0.5px rgba(255,255,255,0.05)",
            };
        }

        // Light theme
        return {
            background: isTop
                ? "linear-gradient(145deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0.75) 100%)"
                : "linear-gradient(145deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.5) 100%)",
            border: isTop
                ? "1px solid rgba(0,0,0,0.08)"
                : "1px solid rgba(0,0,0,0.05)",
            boxShadow: isTop
                ? "0 25px 60px -12px rgba(0,0,0,0.12), inset 0 0 0 0.5px rgba(255,255,255,0.4)"
                : "0 15px 40px -15px rgba(0,0,0,0.08), inset 0 0 0 0.5px rgba(255,255,255,0.3)",
        };
    };

    return (
        <div
            className={`relative flex items-center justify-center select-none ${className}`}
            style={{ perspective: "1200px" }}
        >
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{
                    background: isDark
                        ? "radial-gradient(ellipse at center, rgba(78, 205, 196, 0.4), transparent 70%)"
                        : "radial-gradient(ellipse at center, rgba(78, 205, 196, 0.2), transparent 70%)",
                }}
            />

            <div
                className="relative"
                style={{
                    width: "clamp(300px, 40vw, 420px)",
                    height: "clamp(380px, 50vw, 500px)",
                }}
            >
                {items.map((item, itemIndex) => {
                    const stackPos = positionMap.get(itemIndex) ?? maxVisible;
                    const target = getTargetStyles(stackPos);
                    const glass = getGlassStyle(stackPos);
                    const isTop = stackPos === 0;
                    const isVisible = stackPos < maxVisible;

                    // Progressive blur: 0 for top, increasing for deeper cards
                    const blurAmount = stackPos * 6; // 0px, 6px, 12px, 18px...
                    const overlayOpacity = Math.min(stackPos * 0.25, 0.8); // 0, 0.25, 0.5, 0.75...

                    return (
                        <motion.div
                            key={`card-${itemIndex}`}
                            className="absolute inset-0"
                            animate={{
                                x: target.x,
                                y: target.y,
                                rotate: target.rotate,
                                scale: target.scale,
                                opacity: isVisible ? 1 : 0,
                            }}
                            transition={SPRING}
                            style={{
                                zIndex: target.zIndex,
                                pointerEvents: isTop ? "auto" : "none",
                                ...(isTop
                                    ? {
                                        x: dragX,
                                        rotate: dragRotate,
                                    }
                                    : {}),
                            }}
                            drag={isTop ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.6}
                            onDragEnd={isTop ? handleDragEnd : undefined}
                            onClick={isTop ? handleCardClick : undefined}
                            whileHover={
                                isTop
                                    ? { y: -8, transition: { duration: 0.2 } }
                                    : undefined
                            }
                        >
                            <div
                                className="w-full h-full rounded-3xl overflow-hidden relative"
                                style={{
                                    ...glass,
                                    backdropFilter: `blur(${isTop ? 24 : 16}px) saturate(1.3)`,
                                    WebkitBackdropFilter: `blur(${isTop ? 24 : 16}px) saturate(1.3)`,
                                }}
                                data-cursor-text="⟷"
                                data-cursor-hover="true"
                            >
                                <div
                                    className="absolute top-0 left-[10%] right-[10%] h-[1px] pointer-events-none"
                                    style={{
                                        background: isDark
                                            ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
                                            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                                    }}
                                />

                                <div className="relative w-full h-full">
                                    {renderCard(item, itemIndex, isTop)}
                                </div>

                                {!isTop && (
                                    <div
                                        className="absolute inset-0 pointer-events-none rounded-3xl"
                                        style={{
                                            backdropFilter: `blur(${blurAmount}px)`,
                                            WebkitBackdropFilter: `blur(${blurAmount}px)`,
                                            background: isDark
                                                ? `rgba(15, 15, 26, ${overlayOpacity})`
                                                : `rgba(240, 240, 245, ${overlayOpacity})`,
                                        }}
                                    />
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            if (order[0] !== i) {
                                resetAutoPlay();
                                const currentStackPos = order.indexOf(i);
                                if (currentStackPos > 0) {
                                    let count = 0;
                                    const interval = setInterval(() => {
                                        shuffleForward();
                                        count++;
                                        if (count >= currentStackPos) clearInterval(interval);
                                    }, 200);
                                }
                            }
                        }}
                        className="group relative"
                        aria-label={`Go to card ${i + 1}`}
                    >
                        <div
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${order[0] === i
                                ? isDark
                                    ? "bg-white scale-125"
                                    : "bg-gray-900 scale-125"
                                : isDark
                                    ? "bg-white/30 group-hover:bg-white/60"
                                    : "bg-gray-400/50 group-hover:bg-gray-600"
                                }`}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
