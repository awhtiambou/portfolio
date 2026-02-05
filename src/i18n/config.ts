export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
};

// Using text codes as emoji flags may not render properly on all systems
export const localeFlags: Record<Locale, string> = {
  en: 'EN',
  fr: 'FR',
};

// Flag SVG components for reliable rendering
export const LocaleFlagIcons: Record<Locale, { name: string; colors: string[] }> = {
  en: { name: 'US', colors: ['#B22234', '#FFFFFF', '#3C3B6E'] },
  fr: { name: 'FR', colors: ['#002395', '#FFFFFF', '#ED2939'] },
};
