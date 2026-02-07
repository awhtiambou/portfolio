"use client";

import { motion } from "framer-motion";

export function ScrollMouse() {
    return (
        <motion.div
            className="flex flex-col items-center justify-center gap-2 opacity-70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
        >
            <div className="relative w-6 h-10 rounded-full border-2 border-text-secondary flex justify-center p-1">
                <motion.div
                    className="w-1 h-1.5 bg-text-secondary rounded-full"
                    animate={{
                        y: [0, 12, 0],
                        opacity: [1, 0, 0] // Fade out at bottom
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
        </motion.div>
    );
}
