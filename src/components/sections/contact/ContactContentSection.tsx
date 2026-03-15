"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/layout";
import { Button, Text, SectionTitle } from "@/components/ui";
import { OutlinedInput } from "@/components/ui/OutlinedInput";
import { profile } from "@/data/profile";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone } from "react-icons/hi2";
import { GrSend } from "react-icons/gr";
import { MagneticButton } from "@/components/ui";

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={cn(
                "relative w-12 h-12 rounded-xl flex items-center justify-center text-lg overflow-hidden transition-colors duration-300",
                isDark
                    ? "bg-white/5 text-white/60 hover:text-accent-yellow"
                    : "bg-gray-100 text-gray-500 hover:text-accent-blue",
            )}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            <motion.span
                className={cn(
                    "absolute inset-0 opacity-0",
                    isDark ? "bg-accent-yellow/10" : "bg-accent-blue/10",
                )}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
            />
            <span className="relative z-10">{children}</span>
        </motion.a>
    );
}

function ContactInfoRow({
    icon,
    label,
    value,
    href,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string;
}) {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    return (
        <div className="flex items-center gap-5">
            <div
                className={cn(
                    "w-12 h-12 min-w-12 rounded-xl flex items-center justify-center text-xl border",
                    isDark
                        ? "border-accent-yellow/30 text-accent-yellow bg-accent-yellow/5"
                        : "border-accent-blue/30 text-accent-blue bg-accent-blue/5",
                )}
            >
                {icon}
            </div>
            <div className="min-w-0">
                <p className={cn(
                    "text-xs font-mono uppercase tracking-[0.2em] mb-0.5",
                    isDark ? "text-white/40" : "text-gray-400",
                )}>
                    {label}
                </p>
                {href ? (
                    <a
                        href={href}
                        className={cn(
                            "text-sm font-medium transition-colors truncate block",
                            isDark
                                ? "text-white hover:text-accent-yellow"
                                : "text-gray-900 hover:text-accent-blue",
                        )}
                    >
                        {value}
                    </a>
                ) : (
                    <p className="text-sm font-medium text-text-primary truncate">{value}</p>
                )}
            </div>
        </div>
    );
}

export function ContactContentSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [mounted, setMounted] = useState(false);

    const t = useTranslations("contact");
    const { resolvedTheme } = useTheme();

    useEffect(() => { setMounted(true); }, []);

    const isDark = mounted && resolvedTheme === "dark";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid lg:grid-cols-2 gap-16 app-container py-28"
            >
                <motion.div variants={fadeInUp} className="space-y-10">
                    <div>
                        <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-4">
                            {t("info.heading")}
                        </h2>
                        <Text size="lg" variant="muted" className="leading-relaxed">
                            {t("info.description")}
                        </Text>
                    </div>

                    <div className="space-y-5">
                        <ContactInfoRow
                            icon={<HiOutlineMapPin />}
                            label={t("info.locationLabel")}
                            value={profile.location}
                        />
                        <ContactInfoRow
                            icon={<HiOutlinePhone />}
                            label={t("info.phoneLabel")}
                            value={profile.phone}
                            href={`tel:${profile.phone.replace(/\s/g, "")}`}
                        />
                        <ContactInfoRow
                            icon={<HiOutlineEnvelope />}
                            label={t("info.emailLabel")}
                            value={profile.email}
                            href={`mailto:${profile.email}`}
                        />
                    </div>

                    <div>
                        <p className={cn(
                            "text-xs font-mono uppercase tracking-[0.2em] mb-4",
                            isDark ? "text-white/40" : "text-gray-400",
                        )}>
                            {t("info.followMe")}
                        </p>
                        <div className="flex gap-3">
                            <SocialIcon href={profile.social.github} label="GitHub">
                                <SiGithub />
                            </SocialIcon>
                            <SocialIcon href={profile.social.linkedin} label="LinkedIn">
                                <SiLinkedin />
                            </SocialIcon>
                            <SocialIcon href={profile.social.twitter} label="X / Twitter">
                                <FaXTwitter />
                            </SocialIcon>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={fadeInUp}>
                    {submitted ? (
                        <div className="text-center py-16">
                            <motion.div
                                className={cn(
                                    "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
                                    isDark ? "bg-accent-yellow/20" : "bg-accent-blue/20",
                                )}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <span className="text-3xl">✓</span>
                            </motion.div>
                            <h3 className="font-heading text-xl font-semibold text-text-primary mb-2">
                                {t("form.successTitle")}
                            </h3>
                            <Text variant="muted">{t("form.success")}</Text>
                            <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
                                {t("form.sendAnother")}
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-5">
                                <OutlinedInput
                                    label={t("form.name")}
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <OutlinedInput
                                    label={t("form.email")}
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <OutlinedInput
                                label={t("form.subject")}
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                            <OutlinedInput
                                label={t("form.message")}
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                multiline
                                rows={6}
                            />
                            <MagneticButton
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const form = (e.target as HTMLElement).closest("form");
                                    form?.requestSubmit();
                                }}
                                backgroundColor={isDark ? "var(--color-yellow)" : "var(--color-blue)"}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    fontWeight: 600,
                                    backgroundColor: isDark ? "var(--color-yellow)" : "var(--color-blue)",
                                    color: isDark ? "var(--color-black)" : "var(--color-foreground)",
                                }}
                                className="font-mono font-medium"
                            >
                                <GrSend className="text-lg" />
                                <span>{isSubmitting ? t("form.sending") : t("form.submit")}</span>
                            </MagneticButton>
                        </form>
                    )}
                </motion.div>
            </motion.div>
    );
}
