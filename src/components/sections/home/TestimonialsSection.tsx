"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { FiArrowLeft, FiArrowRight, FiLinkedin } from "react-icons/fi";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { testimonials, getRelationshipText, truncateText } from "@/data/testimonials";
import { cn } from "@/lib/utils";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut" as const,
        },
    },
};

const quoteVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut" as const,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 0.3,
        },
    },
};



// Quote mark component
function QuoteMark({ className, isDark }: { className?: string; isDark: boolean }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={cn(
                "w-12 h-12",
                isDark ? "text-accent-yellow/40" : "text-accent-blue/40",
                className
            )}
        >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
    );
}

// Testimonial card component
interface TestimonialCardProps {
    testimonial: (typeof testimonials)[0];
    locale: "en" | "fr";
    isActive: boolean;
    isDark: boolean;
}

function TestimonialCard({ testimonial, locale, isActive, isDark }: TestimonialCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const t = useTranslations("testimonials");
    const MAX_LENGTH = 280;

    const content = testimonial.content[locale];
    const { text: truncatedText, isTruncated } = truncateText(content, MAX_LENGTH);
    const displayText = isExpanded ? content : truncatedText;

    return (
        <motion.div
            variants={quoteVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            exit="exit"
            className="h-full"
        >
            <div className="p-8 md:p-10 h-full relative">
                {/* Quote mark */}
                <QuoteMark className="absolute top-0 left-0 opacity-60" isDark={isDark} />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                    {/* Testimonial text */}
                    <div className="flex-grow mb-6">
                        <motion.p
                            style={{ fontFamily: "var(--font-montserrat)" }}
                            className={cn(
                                "text-lg md:text-xl leading-relaxed font-body italic pl-8",
                                isDark ? "text-white/90" : "text-gray-900"
                            )}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {displayText}
                        </motion.p>

                        {/* See more/less button */}
                        {isTruncated && (
                            <motion.button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className={cn(
                                    "mt-3 ml-8 transition-colors text-sm font-medium flex items-center gap-1",
                                    isDark
                                        ? "text-accent-yellow hover:text-accent-mint"
                                        : "text-accent-blue hover:text-accent-blue"
                                )}
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isExpanded ? t("seeLess") : t("seeMore")}
                                <motion.span
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    →
                                </motion.span>
                            </motion.button>
                        )}
                    </div>

                    {/* Author info */}
                    <motion.div
                        className={cn(
                            "flex items-start gap-4 pt-6 border-t",
                            isDark ? "border-white/10" : "border-gray-200"
                        )}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        {/* Avatar placeholder */}
                        <Avatar
                            sx={{
                                fontFamily: "var(--font-besley)",
                                width: 60,
                                height: 60,
                                color: "white",
                            }}
                            className="bg-gradient-to-br from-accent-blue via-accent-blue to-accent-yellow font-medium text-sm shadow-lg">
                            {testimonial.name.charAt(0)}
                        </Avatar>

                        <div className="flex-grow">
                            <h5 className={cn(
                                "font-bold text-lg",
                                isDark ? "text-white" : "text-gray-900"
                            )}>
                                {testimonial.name}
                            </h5>
                            <p className={cn(
                                "text-sm",
                                isDark ? "text-white/70" : "text-gray-600"
                            )}>
                                {testimonial.title}
                            </p>
                            <p className={cn(
                                "text-xs mt-1",
                                isDark ? "text-white/50" : "text-gray-400"
                            )}>
                                {getRelationshipText(testimonial, locale)}
                            </p>
                        </div>

                        {/* LinkedIn link */}
                        {testimonial.linkedinUrl && (
                            <motion.a
                                href={testimonial.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "p-3 rounded-full transition-all",
                                    isDark
                                        ? "bg-white/10 text-white hover:bg-accent-blue hover:text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-accent-blue hover:text-white"
                                )}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FiLinkedin className="w-5 h-5" />
                            </motion.a>
                        )}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

// Navigation button component
interface NavButtonProps {
    direction: "prev" | "next";
    onClick: () => void;
    disabled?: boolean;
    isDark: boolean;
}

function NavButton({ direction, onClick, disabled, isDark }: NavButtonProps) {
    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "w-12 h-12 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center transition-all",
                isDark
                    ? "border-white/30 hover:border-accent-yellow hover:bg-accent-yellow/10"
                    : "border-gray-300 hover:border-accent-blue hover:bg-accent-blue/10",
                "disabled:opacity-30 disabled:cursor-not-allowed"
            )}
            whileHover={{ scale: disabled ? 1 : 1.1 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
        >
            {direction === "prev" ? (
                <FiArrowLeft className={cn(
                    "w-5 h-5 md:w-6 md:h-6",
                    isDark ? "text-white" : "text-gray-700"
                )} />
            ) : (
                <FiArrowRight className={cn(
                    "w-5 h-5 md:w-6 md:h-6",
                    isDark ? "text-white" : "text-gray-700"
                )} />
            )}
        </motion.button>
    );
}

// Main component
export function TestimonialsSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [mounted, setMounted] = useState(false);
    const swiperRef = useRef<SwiperType | null>(null);
    const locale = useLocale() as "en" | "fr";
    const t = useTranslations("testimonials");
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === "dark";

    const handlePrev = () => {
        swiperRef.current?.slidePrev();
    };

    const handleNext = () => {
        swiperRef.current?.slideNext();
    };

    // Loading state with skeleton
    if (!mounted) {
        return (
            <section id="testimonials" className="relative py-16 md:py-24 overflow-hidden">
                <div className="container relative z-10">
                    {/* Header skeleton */}
                    <div className="mb-12">
                        <Skeleton
                            variant="text"
                            width={200}
                            height={32}
                            sx={{ bgcolor: 'grey.300', '.dark &': { bgcolor: 'grey.800' } }}
                            className="dark:!bg-white/10"
                        />
                        <Skeleton
                            variant="text"
                            width={350}
                            height={64}
                            sx={{ bgcolor: 'grey.300' }}
                            className="dark:!bg-white/10"
                        />
                    </div>

                    {/* Testimonial content skeleton */}
                    <div className="p-8 md:p-10">
                        {/* Quote lines */}
                        <div className="pl-8 space-y-3 mb-8">
                            <Skeleton variant="text" width="100%" height={28} className="dark:!bg-white/10" />
                            <Skeleton variant="text" width="95%" height={28} className="dark:!bg-white/10" />
                            <Skeleton variant="text" width="90%" height={28} className="dark:!bg-white/10" />
                            <Skeleton variant="text" width="60%" height={28} className="dark:!bg-white/10" />
                        </div>

                        {/* Author skeleton */}
                        <div className="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-white/10">
                            <Skeleton variant="circular" width={60} height={60} className="dark:!bg-white/10" />
                            <div className="flex-grow">
                                <Skeleton variant="text" width={180} height={24} className="dark:!bg-white/10" />
                                <Skeleton variant="text" width={250} height={20} className="dark:!bg-white/10" />
                                <Skeleton variant="text" width={150} height={16} className="dark:!bg-white/10 mt-1" />
                            </div>
                            <Skeleton variant="circular" width={44} height={44} className="dark:!bg-white/10" />
                        </div>
                    </div>

                    {/* Navigation skeleton */}
                    <div className="flex items-center justify-between mt-8">
                        <div className="flex items-center gap-2">
                            <Skeleton variant="circular" width={8} height={8} className="dark:!bg-white/10" />
                            <Skeleton variant="rounded" width={32} height={8} className="dark:!bg-white/10" />
                        </div>
                        <div className="flex items-center gap-3">
                            <Skeleton variant="circular" width={56} height={56} className="dark:!bg-white/10" />
                            <Skeleton variant="circular" width={56} height={56} className="dark:!bg-white/10" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="testimonials" className="relative py-16 md:py-24 overflow-hidden">


            {/* Content container */}
            <div className="container relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="mb-12">
                        <p className={cn(
                            "text-xl md:text-2xl mb-0 italic font-medium",

                            isDark ? "text-accent-yellow" : "text-accent-blue"
                        )}>
                            {t("subtitle")}
                        </p>
                        <h2
                            style={{ fontFamily: "Besley" }}
                            className={cn(
                                "text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase tracking-wider",
                                isDark ? "text-white" : "text-gray-900"
                            )}
                        >
                            {t("title")}
                        </h2>
                    </motion.div>

                    {/* Swiper container */}
                    <motion.div variants={itemVariants} className="relative">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            loop={testimonials.length > 1}
                            autoplay={{
                                delay: 8000,
                                disableOnInteraction: true,
                                pauseOnMouseEnter: true,
                            }}
                            speed={600}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            onSlideChange={(swiper) => {
                                setActiveIndex(swiper.realIndex);
                            }}
                            className="testimonials-swiper"
                            grabCursor
                        >
                            {testimonials.map((testimonial, index) => (
                                <SwiperSlide key={testimonial.id}>
                                    <TestimonialCard
                                        testimonial={testimonial}
                                        locale={locale}
                                        isActive={activeIndex === index}
                                        isDark={isDark}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Navigation controls */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center justify-between mt-8"
                        >
                            {/* Pagination dots */}
                            <div className="flex items-center gap-2">
                                {testimonials.map((_, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => swiperRef.current?.slideTo(index)}
                                        className={cn(
                                            "h-2 rounded-full transition-all duration-300",
                                            activeIndex === index
                                                ? cn(
                                                    "w-8",
                                                    isDark ? "bg-accent-yellow" : "bg-accent-blue"
                                                )
                                                : cn(
                                                    "w-2",
                                                    isDark ? "bg-white/30 hover:bg-white/50" : "bg-gray-300 hover:bg-gray-400"
                                                )
                                        )}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                    />
                                ))}
                            </div>

                            {/* Arrow buttons */}
                            <div className="flex items-center gap-3">
                                <NavButton
                                    direction="prev"
                                    onClick={handlePrev}
                                    disabled={!testimonials.length}
                                    isDark={isDark}
                                />
                                <NavButton
                                    direction="next"
                                    onClick={handleNext}
                                    disabled={!testimonials.length}
                                    isDark={isDark}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
