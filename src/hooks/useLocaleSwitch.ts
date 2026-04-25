"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { locales, defaultLocale, type Locale } from "@/i18n/config";

const COOKIE_NAME = "NEXT_LOCALE";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function getCookieLocale(): Locale | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${COOKIE_NAME}=`));
    if (!match) return null;
    const value = match.split("=")[1] as Locale;
    return locales.includes(value) ? value : null;
}

function getBrowserLocale(): Locale {
    if (typeof navigator === "undefined") return defaultLocale;
    const lang = navigator.language?.substring(0, 2) as Locale;
    return locales.includes(lang) ? lang : defaultLocale;
}

function setLocaleCookie(locale: Locale) {
    document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

// Seeds locale from browser lang on first visit, persists to cookie
export function useLocaleSwitch() {
    const router = useRouter();
    const [currentLocale, setCurrentLocale] = useState<Locale>(() => {
        return getCookieLocale() ?? getBrowserLocale();
    });

    useEffect(() => {
        const cookieLocale = getCookieLocale();
        if (cookieLocale) {
            return;
        }

        const browserLocale = getBrowserLocale();
        setLocaleCookie(browserLocale);

        if (browserLocale !== defaultLocale) {
            router.refresh();
        }
    }, [router]);

    const toggleLocale = useCallback(() => {
        const newLocale: Locale = currentLocale === "en" ? "fr" : "en";
        setLocaleCookie(newLocale);
        setCurrentLocale(newLocale);
        router.refresh();
    }, [currentLocale, router]);

    return { currentLocale, toggleLocale };
}
