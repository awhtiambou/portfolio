"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/layout";
import { FiArrowUpRight } from "react-icons/fi";

// Navigation links for the 404 page
const navigationLinks = [
    {
        title: "About",
        description: "Learn more about my background and skills",
        href: "/about",
    },
    {
        title: "Projects",
        description: "Explore my work and portfolio",
        href: "/projects",
    },
    {
        title: "Contact",
        description: "Get in touch and let's collaborate",
        href: "/contact",
    },
    {
        title: "Blog",
        description: "Read articles and tutorials",
        href: "/blog",
    },
];

// Decorative arrow component
function DecorativeArrow({ className, rotate = 0 }: { className?: string; rotate?: number }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <svg
                viewBox="0 0 100 100"
                fill="currentColor"
                className="w-full h-full"
                style={{ transform: `rotate(${rotate}deg)` }}
            >
                <path d="M20 50 L50 20 L80 50 L65 50 L65 80 L35 80 L35 50 Z" />
            </svg>
        </motion.div>
    );
}

export default function NotFound() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-accent-pink/20 relative overflow-hidden pt-24">
                {/* Background decorative arrows */}
                <DecorativeArrow
                    className="absolute top-20 left-10 w-32 h-32 text-accent-pink/40 hidden lg:block"
                    rotate={-45}
                />
                <DecorativeArrow
                    className="absolute bottom-20 right-10 w-40 h-40 text-accent-pink/60 hidden lg:block"
                    rotate={135}
                />
                <DecorativeArrow
                    className="absolute top-1/3 right-1/4 w-24 h-24 text-accent-pink/30 hidden xl:block"
                    rotate={45}
                />

                {/* Main content */}
                <div className="container max-w-6xl mx-auto px-4 py-16 relative z-10">
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Left decorative cards */}
                        <div className="hidden lg:flex flex-col gap-6">
                            <motion.div
                                className="bg-primary rounded-2xl aspect-square relative overflow-hidden shadow-lg"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <DecorativeArrow
                                    className="absolute bottom-4 right-4 w-20 h-20 text-accent-pink"
                                    rotate={135}
                                />
                            </motion.div>
                            <motion.div
                                className="bg-primary rounded-2xl aspect-[4/3] shadow-lg"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            />
                        </div>

                        {/* Center - Main 404 content */}
                        <motion.div
                            className="bg-background rounded-2xl p-8 md:p-12 shadow-lg"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* 404 Header */}
                            <div className="text-center mb-8">
                                <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4">
                                    ...404 error...
                                    <br />
                                    Sorry, page not found
                                </h1>
                                <p className="text-text-secondary">
                                    Go to other sections to learn more about me
                                </p>
                            </div>

                            {/* Navigation Links */}
                            <div className="space-y-3">
                                {navigationLinks.map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className="group flex items-center justify-between p-4 rounded-xl border border-border hover:border-accent-pink hover:bg-accent-pink/5 transition-all"
                                        >
                                            <div>
                                                <h3 className="font-heading font-semibold text-text-primary group-hover:text-accent-pink transition-colors">
                                                    {link.title}
                                                </h3>
                                                <p className="text-sm text-text-muted">
                                                    {link.description}
                                                </p>
                                            </div>
                                            <div className="w-10 h-10 rounded-full border border-border group-hover:border-accent-pink group-hover:bg-accent-pink group-hover:text-white flex items-center justify-center transition-all">
                                                <FiArrowUpRight className="w-5 h-5" />
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right decorative cards */}
                        <div className="hidden lg:flex flex-col gap-6">
                            <motion.div
                                className="bg-background rounded-2xl aspect-[4/3] relative overflow-hidden shadow-lg border border-border"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <DecorativeArrow
                                    className="absolute top-4 left-4 w-16 h-16 text-accent-pink"
                                    rotate={-45}
                                />
                            </motion.div>
                            <motion.div
                                className="bg-primary rounded-2xl aspect-square relative overflow-hidden shadow-lg"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <DecorativeArrow
                                    className="absolute bottom-4 left-4 w-24 h-24 text-accent-pink"
                                    rotate={225}
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
