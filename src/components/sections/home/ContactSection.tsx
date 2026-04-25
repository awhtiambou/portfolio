"use client";

import { motion } from "framer-motion";
import { MagneticButton, SectionTitle, Text } from "@/components/ui";
import { OutlinedInput } from "@/components/ui/OutlinedInput";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone } from "react-icons/hi2";
import { GrSend } from "react-icons/gr";
import { useContactForm, useHydrated } from "@/hooks";

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

export function ContactSection() {
  const { errorCode, formData, handleChange, isSubmitting, status, submitForm } = useContactForm();

  const t = useTranslations("contact");
  const tCommon = useTranslations("common");
  const { resolvedTheme } = useTheme();
  const hydrated = useHydrated();
  const isDark = hydrated && resolvedTheme === "dark";
  const errorMessage = errorCode ? t(`form.errors.${errorCode}`) : t("form.error");

  return (
    <div id="contact" className="py-20 w-full flex flex-col items-center justify-center">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="app-container"
      >
        <SectionTitle subtitle={t("subtitle")} title={t("title")} />

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div variants={fadeInUp} className="space-y-10">
            <div>
              <Text size="lg" variant="muted" className="leading-relaxed">
                {t("description")}
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
            <form onSubmit={submitForm} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <OutlinedInput
                  label={t("form.name")}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                />
                <OutlinedInput
                  label={t("form.email")}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                />
              </div>
              <OutlinedInput
                label={t("form.subject")}
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
              <OutlinedInput
                label={t("form.message")}
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                required
                multiline
                rows={5}
              />

              <MagneticButton
                type="submit"
                disabled={isSubmitting}
                backgroundColor={isDark ? "var(--color-yellow)" : "var(--color-blue)"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontWeight: 600,
                  backgroundColor: isDark ? "var(--color-yellow)" : "var(--color-blue)",
                  color: isDark ? "var(--color-black)" : "var(--color-foreground)",
                }}
                className={cn(
                  "font-mono font-medium",
                  isSubmitting && "cursor-not-allowed opacity-70",
                )}
              >
                <GrSend className="text-lg" />
                <span>{isSubmitting ? t("form.sending") : tCommon("sendMessage")}</span>
              </MagneticButton>

              <div aria-live="polite" className="min-h-6">
                {status === "success" ? (
                  <Text
                    size="sm"
                    className={cn(
                      isDark ? "text-accent-yellow" : "text-accent-blue",
                    )}
                  >
                    {t("form.success")}
                  </Text>
                ) : null}

                {status === "error" ? (
                  <Text size="sm" className="text-red-500">
                    {errorMessage}
                  </Text>
                ) : null}
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
