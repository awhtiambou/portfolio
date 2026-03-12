'use client';

import { masteredTechnologies } from "@/data/skills";
import { cn, getShuffledArray } from "@/lib/utils";
import { MasteredTechnology } from "@/types";
import { marqueeLeft, marqueeRight } from "@/lib/animations";
import { useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FillButton } from "@/components/ui";
import { MdArrowForward } from "react-icons/md";

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
        <div className="min-h-[420px] md:min-h-[600px] flex flex-col items-center justify-center gap-10 md:gap-6 w-full overflow-hidden">
            <div className="flex flex-col rotate-6 w-[150%] gap-6">
                <TechRow items={firstHalf} variant={marqueeLeft as Variants} />
                <div className="h-0.5 w-full bg-border" />
                <TechRow items={secondHalf} variant={marqueeRight as Variants} />
            </div>
            <div className="w-full flex justify-center md:justify-start pl-5 md:pl-10">
                <FillButton href="/about#skills" fillColor="var(--color-foreground)" className="group font-mono font-medium text-sm">
                    {t("viewAll")}
                    <MdArrowForward className="ml-2 inline-block transition-transform duration-400 group-hover:translate-x-2" />
                </FillButton>
            </div>
        </div>
    );
};