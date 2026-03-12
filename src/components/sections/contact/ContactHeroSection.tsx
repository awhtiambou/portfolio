"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout";
import { Text } from "@/components/ui";
import { SplitText, RevealText, VelocitySkew, TextLineReveal } from "@/components/scroll";
import { useTranslations } from "next-intl";

export function ContactHeroSection() {
    const t = useTranslations("contact");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
        }
    };

    return (
        <Section variant="alternate" spacing="lg">
            <motion.div 
                className="text-center max-w-3xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1 
                    className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4"
                    variants={itemVariants}
                >
                    <VelocitySkew maxSkew={3} className="inline-block">
                        <SplitText type="chars" animation="wave" staggerDelay={0.03}>
                            {t("title")}
                        </SplitText>
                    </VelocitySkew>
                </motion.h1>
                <motion.div variants={itemVariants}>
                    <RevealText direction="up" delay={0.5} duration={0.8}>
                        <Text size="lg" variant="muted">
                            {t("subtitle")}
                        </Text>
                    </RevealText>
                </motion.div>
            </motion.div>
        </Section>
    );
}
