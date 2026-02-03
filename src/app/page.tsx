'use client';

import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

export default function Home() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <main className="container section">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex justify-between items-center mb-12"
        >
          <h1>Portfolio</h1>
          <button
            onClick={toggleTheme}
            className="btn btn-secondary"
            aria-label="Toggle theme"
          >
            {resolvedTheme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </motion.div>

        {/* Phase 1 Completion Status */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.h2 variants={staggerItem} className="mb-6">
            ✅ Phase 1: Foundation Complete
          </motion.h2>
          
          <motion.div variants={staggerItem} className="card mb-6">
            <h3 className="mb-4">Setup Checklist</h3>
            <ul className="space-y-2">
              <li>✅ Next.js 15 + TypeScript + App Router</li>
              <li>✅ Tailwind CSS v4 with custom theme</li>
              <li>✅ MUI v6 with synced breakpoints</li>
              <li>✅ Framer Motion for animations</li>
              <li>✅ next-themes for dark/light mode</li>
              <li>✅ 60-30-10 color rule implemented</li>
              <li>✅ Besley + Montserrat typography</li>
              <li>✅ Responsive breakpoints configured</li>
            </ul>
          </motion.div>
        </motion.section>

        {/* Color Palette Demo */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.h2 variants={staggerItem} className="mb-6">
            Color Palette
          </motion.h2>
          
          <motion.div variants={staggerItem} className="mb-8">
            <h4 className="mb-4">Theme Colors (60-30-10)</h4>
            <div className="flex flex-wrap gap-4">
              <div className="w-24 h-24 rounded-lg bg-[var(--color-primary)] border border-[var(--color-border)] flex items-center justify-center text-xs">
                Primary<br/>60%
              </div>
              <div className="w-24 h-24 rounded-lg bg-[var(--color-secondary)] flex items-center justify-center text-xs">
                Secondary<br/>30%
              </div>
              <div className="w-24 h-24 rounded-lg bg-[var(--color-accent)] text-[var(--color-primary)] flex items-center justify-center text-xs">
                Accent<br/>10%
              </div>
            </div>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h4 className="mb-4">Accent Colors</h4>
            <div className="flex flex-wrap gap-4">
              <div className="w-24 h-24 rounded-lg flex items-center justify-center text-xs text-[#222222]" style={{ backgroundColor: 'var(--color-yellow)' }}>
                Yellow
              </div>
              <div className="w-24 h-24 rounded-lg flex items-center justify-center text-xs text-[#222222]" style={{ backgroundColor: 'var(--color-pink)' }}>
                Pink
              </div>
              <div className="w-24 h-24 rounded-lg flex items-center justify-center text-xs text-[#222222]" style={{ backgroundColor: 'var(--color-blue)' }}>
                Blue
              </div>
              <div className="w-24 h-24 rounded-lg flex items-center justify-center text-xs text-[#222222]" style={{ backgroundColor: 'var(--color-mint)' }}>
                Mint
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Typography Demo */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.h2 variants={staggerItem} className="mb-6">
            Typography
          </motion.h2>
          
          <motion.div variants={staggerItem} className="card">
            <h1>Heading 1 - Besley</h1>
            <h2>Heading 2 - Besley</h2>
            <h3>Heading 3 - Besley</h3>
            <p className="text-lg">
              Body text in Montserrat. This is the primary font for all paragraph content, 
              providing excellent readability across all device sizes.
            </p>
            <p style={{ color: 'var(--color-muted)' }}>
              Muted text for secondary information and descriptions.
            </p>
          </motion.div>
        </motion.section>

        {/* Components Demo */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.h2 variants={staggerItem} className="mb-6">
            UI Components
          </motion.h2>
          
          <motion.div variants={staggerItem} className="mb-8">
            <h4 className="mb-4">Buttons</h4>
            <div className="flex flex-wrap gap-4">
              <button className="btn btn-primary">Primary Button</button>
              <button className="btn btn-secondary">Secondary Button</button>
              <button className="btn btn-accent">Accent Button</button>
            </div>
          </motion.div>

          <motion.div variants={staggerItem} className="mb-8">
            <h4 className="mb-4">Tags</h4>
            <div className="flex flex-wrap gap-2">
              <span className="tag tag-yellow">React</span>
              <span className="tag tag-pink">TypeScript</span>
              <span className="tag tag-blue">Next.js</span>
              <span className="tag tag-mint">Tailwind</span>
            </div>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h4 className="mb-4">Cards</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card">
                <h5>Card Title</h5>
                <p>This is a sample card component with hover effects.</p>
              </div>
              <div className="card">
                <h5>Another Card</h5>
                <p>Cards automatically adapt to the current theme.</p>
              </div>
              <div className="card">
                <h5>Third Card</h5>
                <p>They feature smooth transitions and shadows.</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Next Steps */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="mb-6">Next: Phase 2 - Layout</h2>
          <div className="card">
            <ul className="space-y-2">
              <li>⏳ Navbar with language/theme toggles</li>
              <li>⏳ Footer component</li>
              <li>⏳ Reusable UI components</li>
              <li>⏳ Page layout wrapper</li>
            </ul>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
