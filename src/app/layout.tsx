import type { Metadata, Viewport } from "next";
import { Besley, Inter, Work_Sans, Pacifico } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale, getTranslations } from "next-intl/server";
import { ThemeProvider, TransitionProvider, LenisProvider } from "@/providers";
import { CustomCursor, GlobalBackground, PageTransition } from "@/components/ui";
import "./globals.css";

const besley = Besley({
  variable: "--font-besley",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// signature-style font for watermark
const pacifico = Pacifico({
  variable: "--font-signature",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#222222" },
  ],
};


export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL("https://awhtiambou.com"),
    title: {
      default: t("title"),
      template: "%s | Portfolio",
    },
    description: t("description"),
    keywords: ["portfolio", "computer science", "software engineer", "projects", "experience", "skills", "Abdoul-Wahabou H. Tiambou", "AI/ML Engineer", "Full-Stack Developer"],
    authors: [{ name: "Abdoul-Wahabou H. Tiambou" }],
    creator: "Abdoul-Wahabou H. Tiambou",
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_CA" : "en_US",
      url: "https://awhtiambou.com",
      siteName: "Portfolio",
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      creator: "@awhtiambou",
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${besley.variable} ${inter.variable} ${workSans.variable} ${pacifico.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <TransitionProvider>
              <LenisProvider>
                <CustomCursor />
                <GlobalBackground />
                <PageTransition />
                {children}
              </LenisProvider>
            </TransitionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
