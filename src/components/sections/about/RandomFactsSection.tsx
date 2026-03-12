"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { SectionTitle } from "@/components/ui";
import { useIsMobile } from "@/hooks";

type Direction = "top" | "bottom" | "left" | "right";

const getInitialOffset = (direction: Direction) => {
  const offset = 100;
  const transforms: Record<Direction, { x: number; y: number }> = {
    top: { x: 0, y: -offset },
    bottom: { x: 0, y: offset },
    left: { x: -offset, y: 0 },
    right: { x: offset, y: 0 },
  };
  return transforms[direction];
};

const GridImage = ({
  src,
  title,
  description,
  className,
  direction = "bottom",
  mobileDirection,
  delay = 0,
}: {
  src: string;
  title: string;
  description: string;
  className?: string;
  direction?: Direction;
  mobileDirection?: Direction;
  delay?: number;
}) => {
  const isMobile = useIsMobile();
  const activeDirection = isMobile && mobileDirection ? mobileDirection : direction;
  const offset = getInitialOffset(activeDirection);

  return (
    <motion.div
      className={`relative flex flex-col h-full overflow-hidden ${className}`}
      initial={{ 
        opacity: 0, 
        x: offset.x, 
        y: offset.y,
        scale: 0.9 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0,
        scale: 1 
      }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8,
        delay,
      }}
      whileHover="hover"
    >
      <div className="relative flex-1 w-full rounded-2xl overflow-hidden bg-gray-900 group">
        <Image
          src={src}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110"
          fill
        />
        <motion.div
          initial={{ y: "100%" }}
          variants={{
            hover: { y: 0 }
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent hidden md:flex flex-col justify-end"
        >
          <span className="text-white font-bold text-sm truncate w-full">
            {title}
          </span>
          <p className="text-white/70 text-xs mt-1">
            {description}
          </p>
        </motion.div>
      </div>
      <div className="md:hidden pt-2 px-1">
        <p className="font-semibold text-xs truncate">{title}</p>
        <p className="text-[10px] leading-tight mt-0.5">{description}</p>
      </div>
    </motion.div>
  );
};

export function RandomFactsSection() {
  const t = useTranslations("about.randomFacts");

  return (
    <div className="w-full py-20 px-2 lg:px-10 overflow-hidden">
      <div className="lg:container overflow-hidden grid grid-cols-12 gap-6 place-items-center justify-items-center">

        <div className="col-span-12 lg:col-span-5 px-5 lg:pr-5">
          <SectionTitle className="md:!text-left" subtitle={t("subtitle")} title={t("title")} />
          <p className="hidden lg:block text-2xl opacity-90">{t("description")}</p>
        </div>

        <div className="block lg:hidden col-span-12 lg:col-span-7 grid grid-cols-12 w-full gap-6 overflow-hidden">
          <p className="text-lg col-span-12 md:col-span-8 lg:col-span-4 text-center md:text-left opacity-90">{t("description")}</p>

          <div className="hidden md:flex col-span-12 md:col-span-4 items-center justify-center h-64 overflow-hidden">
            <div className="w-11/12 h-full overflow-hidden">
              <GridImage
                src="/assets/images/facts/coffee.jpg"
                title={t("coffee.title")}
                description={t("coffee.description")}
                className="rounded-4xl"
                direction="left"
                delay={0}
              />
            </div>
          </div>

          <div className="col-span-12 grid grid-flow-col grid-rows-12 gap-2 h-[600px] w-full overflow-hidden">
            <div className="grid grid-flow-col grid-rows-12 gap-4 h-[600px] w-full overflow-hidden">

              <GridImage
                src="/assets/images/facts/coffee.jpg"
                title={t("coffee.title")}
                description={t("coffee.description")}
                className="row-start-4 row-span-4 md:hidden"
                direction="left"
                mobileDirection="top"
                delay={0}
              />

              <GridImage
                src="/assets/images/facts/me-winter.jpg"
                title={t("location.title")}
                description={t("location.description")}
                className="row-start-8 md:row-start-4 lg:row-start-8 row-span-5"
                direction="bottom"
                delay={0.1}
              />

              <GridImage
                src="/assets/images/facts/soccer.jpg"
                title={t("soccer.title")}
                description={t("soccer.description")}
                className="row-start-1 row-span-5"
                direction="top"
                delay={0.15}
              />

              <GridImage
                src="/assets/images/facts/niger.jpg"
                title={t("roots.title")}
                description={t("roots.description")}
                className="row-start-6 row-span-7"
                direction="bottom"
                delay={0.2}
              />

              <GridImage
                src="/assets/images/facts/dream.jpg"
                title={t("dream.title")}
                description={t("dream.description")}
                className="row-start-4 row-span-8"
                direction="right"
                mobileDirection="bottom"
                delay={0.25}
              />

            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center col-span-7 w-full overflow-hidden">
          <div className="grid grid-flow-col grid-rows-12 gap-4 h-[600px] w-full overflow-hidden">

            <GridImage
              src="/assets/images/facts/coffee.jpg"
              title={t("coffee.title")}
              description={t("coffee.description")}
              className="row-start-4 row-span-4"
              direction="left"
              delay={0}
            />

            <GridImage
              src="/assets/images/facts/me-winter.jpg"
              title={t("location.title")}
              description={t("location.description")}
              className="row-start-8 row-span-5"
              direction="bottom"
              delay={0.1}
            />

            <GridImage
              src="/assets/images/facts/soccer.jpg"
              title={t("soccer.title")}
              description={t("soccer.description")}
              className="row-start-1 row-span-5"
              direction="top"
              delay={0.15}
            />

            <GridImage
              src="/assets/images/facts/niger.jpg"
              title={t("roots.title")}
              description={t("roots.description")}
              className="row-start-6 row-span-7"
              direction="bottom"
              delay={0.2}
            />

            <GridImage
              src="/assets/images/facts/dream.jpg"
              title={t("dream.title")}
              description={t("dream.description")}
              className="row-start-4 row-span-8"
              direction="right"
              delay={0.25}
            />

          </div>
        </div>
      </div>
    </div>
  );
}