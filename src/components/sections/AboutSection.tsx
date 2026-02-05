"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout";
import { Button, SectionTitle, Text } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function AboutSection() {
  return (
    <Section id="about" variant="alternate">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SectionTitle
          title="About Me"
          subtitle="Get to know me better"
        />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div variants={fadeInUp} className="relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
              {/* Placeholder for profile image */}
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-accent-blue via-accent-pink to-accent-yellow opacity-20" />
              <div className="absolute inset-4 rounded-xl bg-background-secondary flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-blue/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-pink/20 rounded-full blur-2xl" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <Text size="lg" className="leading-relaxed">
              I&apos;m a passionate AI/ML Engineer and Full-Stack Developer with expertise 
              in building intelligent systems and scalable web applications. Currently 
              pursuing my degree in Computer Science, I combine academic knowledge with 
              hands-on experience in machine learning, deep learning, and modern development.
            </Text>

            <Text variant="muted" className="leading-relaxed">
              My journey in tech started with curiosity about how machines can learn and 
              make decisions. Today, I work on projects ranging from natural language 
              processing to computer vision, always seeking to push the boundaries of 
              what&apos;s possible with AI.
            </Text>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="text-center p-4 bg-background-primary rounded-xl">
                <div className="font-heading text-3xl font-bold text-accent-blue">3+</div>
                <Text variant="muted" size="sm">Years Experience</Text>
              </div>
              <div className="text-center p-4 bg-background-primary rounded-xl">
                <div className="font-heading text-3xl font-bold text-accent-pink">15+</div>
                <Text variant="muted" size="sm">Projects Completed</Text>
              </div>
            </div>

            <Button href="/about" variant="outline">
              Learn More About Me
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
