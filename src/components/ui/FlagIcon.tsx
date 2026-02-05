"use client";

import { type Locale } from "@/i18n";

interface FlagIconProps {
  locale: Locale;
  className?: string;
  size?: number;
}

// US Flag SVG
const USFlag = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="20" rx="2" fill="#F0F0F0"/>
    <rect width="28" height="1.54" fill="#D80027"/>
    <rect y="3.08" width="28" height="1.54" fill="#D80027"/>
    <rect y="6.15" width="28" height="1.54" fill="#D80027"/>
    <rect y="9.23" width="28" height="1.54" fill="#D80027"/>
    <rect y="12.31" width="28" height="1.54" fill="#D80027"/>
    <rect y="15.38" width="28" height="1.54" fill="#D80027"/>
    <rect y="18.46" width="28" height="1.54" fill="#D80027"/>
    <rect width="12" height="10.77" fill="#2E3B7D"/>
    <g fill="#F0F0F0">
      <circle cx="2" cy="1.5" r="0.6"/>
      <circle cx="4" cy="1.5" r="0.6"/>
      <circle cx="6" cy="1.5" r="0.6"/>
      <circle cx="8" cy="1.5" r="0.6"/>
      <circle cx="10" cy="1.5" r="0.6"/>
      <circle cx="3" cy="2.7" r="0.6"/>
      <circle cx="5" cy="2.7" r="0.6"/>
      <circle cx="7" cy="2.7" r="0.6"/>
      <circle cx="9" cy="2.7" r="0.6"/>
      <circle cx="2" cy="3.9" r="0.6"/>
      <circle cx="4" cy="3.9" r="0.6"/>
      <circle cx="6" cy="3.9" r="0.6"/>
      <circle cx="8" cy="3.9" r="0.6"/>
      <circle cx="10" cy="3.9" r="0.6"/>
      <circle cx="3" cy="5.1" r="0.6"/>
      <circle cx="5" cy="5.1" r="0.6"/>
      <circle cx="7" cy="5.1" r="0.6"/>
      <circle cx="9" cy="5.1" r="0.6"/>
      <circle cx="2" cy="6.3" r="0.6"/>
      <circle cx="4" cy="6.3" r="0.6"/>
      <circle cx="6" cy="6.3" r="0.6"/>
      <circle cx="8" cy="6.3" r="0.6"/>
      <circle cx="10" cy="6.3" r="0.6"/>
      <circle cx="3" cy="7.5" r="0.6"/>
      <circle cx="5" cy="7.5" r="0.6"/>
      <circle cx="7" cy="7.5" r="0.6"/>
      <circle cx="9" cy="7.5" r="0.6"/>
      <circle cx="2" cy="8.7" r="0.6"/>
      <circle cx="4" cy="8.7" r="0.6"/>
      <circle cx="6" cy="8.7" r="0.6"/>
      <circle cx="8" cy="8.7" r="0.6"/>
      <circle cx="10" cy="8.7" r="0.6"/>
    </g>
  </svg>
);

// French Flag SVG
const FRFlag = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="20" rx="2" fill="#F0F0F0"/>
    <rect width="9.33" height="20" fill="#002395"/>
    <rect x="18.67" width="9.33" height="20" fill="#ED2939"/>
  </svg>
);

export function FlagIcon({ locale, className, size = 20 }: FlagIconProps) {
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center' }}>
      {locale === 'en' ? <USFlag size={size} /> : <FRFlag size={size} />}
    </span>
  );
}
