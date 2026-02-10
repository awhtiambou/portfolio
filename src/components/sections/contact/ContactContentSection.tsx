"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/layout";
import { Button, Text, Card } from "@/components/ui";
import { profile } from "@/data/profile";
import { fadeInUp, staggerContainer } from "@/lib/animations";

// Icons
const EmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const LinkedinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export function ContactContentSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // TODO: Implement actual form submission (e.g., to API route, Formspree, etc.)
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
        <Section>
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
            >
                {/* Contact Info */}
                <motion.div variants={fadeInUp} className="space-y-8">
                    <div>
                        <h2 className="font-heading text-2xl font-semibold text-text-primary mb-4">
                            Let&apos;s Connect
                        </h2>
                        <Text size="lg" className="mb-6">
                            I&apos;m always open to discussing new projects, creative ideas,
                            or opportunities to be part of your vision. Feel free to reach
                            out through the form or via my social links.
                        </Text>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-4">
                        <Card variant="outlined" padding="md">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-accent-blue/10 flex items-center justify-center text-accent-blue">
                                    <EmailIcon />
                                </div>
                                <div>
                                    <Text variant="muted" size="sm">Email</Text>
                                    <a
                                        href={`mailto:${profile.email}`}
                                        className="text-text-primary hover:text-accent-blue transition-colors font-medium"
                                    >
                                        {profile.email}
                                    </a>
                                </div>
                            </div>
                        </Card>

                        <Card variant="outlined" padding="md">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-accent-pink/10 flex items-center justify-center text-accent-pink">
                                    <LocationIcon />
                                </div>
                                <div>
                                    <Text variant="muted" size="sm">Location</Text>
                                    <Text className="font-medium">{profile.location}</Text>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="font-medium text-text-primary mb-4">Follow Me</h3>
                        <div className="flex gap-4">
                            <motion.a
                                href={profile.social.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-lg bg-background-secondary hover:bg-accent-blue/10 flex items-center justify-center text-text-secondary hover:text-accent-blue transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="GitHub"
                            >
                                <GithubIcon />
                            </motion.a>
                            <motion.a
                                href={profile.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-lg bg-background-secondary hover:bg-accent-blue/10 flex items-center justify-center text-text-secondary hover:text-accent-blue transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="LinkedIn"
                            >
                                <LinkedinIcon />
                            </motion.a>
                            <motion.a
                                href={profile.social.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-lg bg-background-secondary hover:bg-accent-blue/10 flex items-center justify-center text-text-secondary hover:text-accent-blue transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Twitter"
                            >
                                <TwitterIcon />
                            </motion.a>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div variants={fadeInUp}>
                    <Card variant="elevated" padding="lg">
                        {submitted ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-accent-mint/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">✓</span>
                                </div>
                                <h3 className="font-heading text-xl font-semibold text-text-primary mb-2">
                                    Message Sent!
                                </h3>
                                <Text variant="muted">
                                    Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                                </Text>
                                <Button
                                    variant="outline"
                                    className="mt-6"
                                    onClick={() => setSubmitted(false)}
                                >
                                    Send Another Message
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-background-primary border border-border focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 outline-none transition-all text-text-primary"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-background-primary border border-border focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 outline-none transition-all text-text-primary"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-background-primary border border-border focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 outline-none transition-all text-text-primary"
                                        placeholder="What's this about?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-lg bg-background-primary border border-border focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 outline-none transition-all text-text-primary resize-none"
                                        placeholder="Your message..."
                                    />
                                </div>

                                <Button type="submit" size="lg" fullWidth loading={isSubmitting}>
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        )}
                    </Card>
                </motion.div>
            </motion.div>
        </Section>
    );
}
