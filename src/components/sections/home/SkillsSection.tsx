'use client';

import { masteredTechnologies } from "@/data/skills";
import { cn, getShuffledArray } from "@/lib/utils";
import { MasteredTechnology } from "@/types";
import { marqueeLeft, marqueeRight } from "@/lib/animations";
import { useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

const TechRow = ({ items, variant }: { items: MasteredTechnology[], variant: Variants }) => (
    <div className="flex overflow-hidden w-full">
        <motion.div
            className="flex gap-10 md:gap-16 items-center"
            variants={variant}
            animate="animate"
        >
            {[...items, ...items, ...items].map((tech, index) => (
                <div
                    key={`${tech.title}-${index}`}
                    className="flex flex-col items-center justify-center gap-2 flex-shrink-0"
                >
                    <span className="text-sm md:text-lg font-normal whitespace-nowrap">
                        {tech.title}
                    </span>
                    <div className="relative w-8 h-8 md:w-12 md:h-12 flex-shrink-0">
                        <Image
                            src={tech.logoImageUrl || ''}
                            alt={tech.title}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 32px, 48px"
                        />
                    </div>
                </div>
            ))}
        </motion.div>
    </div>
);

export const SkillsSection = () => {
    const t = useTranslations("skills");

    const { firstHalf, secondHalf } = useMemo(() => {
        const shuffled = getShuffledArray<MasteredTechnology>([...masteredTechnologies]);
        const mid = Math.floor(shuffled.length / 2);
        return {
            firstHalf: shuffled.slice(0, mid),
            secondHalf: shuffled.slice(mid)
        };
    }, []);

    return (
        <div className="min-h-[420px] md:min-h-[600px] flex flex-col items-center justify-center gap-6 w-full overflow-hidden">
            <div className="flex flex-col rotate-6 w-[150%] gap-6">
                <TechRow items={firstHalf} variant={marqueeLeft as Variants} />
                <div className="h-0.5 w-full bg-border" />
                <TechRow items={secondHalf} variant={marqueeRight as Variants} />
            </div>
            <div className="w-full flex justify-start pl-10">
                <Link href="/about#skills" className="flex justify-center md:justify-start">
                    <motion.button
                        className={cn(
                            "group flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all",
                            "bg-gray-900 text-white hover:bg-accent-blue hover:text-white",
                            "dark:bg-white dark:text-gray-900 dark:hover:bg-accent-yellow dark:hover:text-gray-900"
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {t("viewAll")}
                        <FiArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </motion.button>
                </Link>
            </div>
        </div>
    );
};