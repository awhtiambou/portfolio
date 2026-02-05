import type { Metadata, Viewport } from "next";
import { Besley, Montserrat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { ThemeProvider, MUIProvider } from "@/providers";
import { CustomCursor } from "@/components/ui";
import "./globals.css";

const besley = Besley({
  variable: "--font-besley",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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

export const metadata: Metadata = {
  metadataBase: new URL("https://awhtiambou.com"),
  title: {
    default: "Portfolio | Abdoul-Wahabou H. Tiambou",
    template: "%s | Portfolio",
  },
  description: "Personal portfolio showcasing my work, experience, and skills in computer science.",
  keywords: ["portfolio", "computer science", "software engineer", "projects", "experience", "skills", "Abdoul-Wahabou H. Tiambou", "AI/ML Engineer", "Full-Stack Developer"],
  authors: [{ name: "Abdoul-Wahabou H. Tiambou" }],
  creator: "Abdoul-Wahabou H. Tiambou",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://awhtiambou.com",
    siteName: "Portfolio",
    title: "Portfolio | Abdoul-Wahabou H. Tiambou",
    description: "Personal portfolio showcasing my work, experience, and skills in computer science.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Abdoul-Wahabou H. Tiambou",
    description: "Personal portfolio showcasing my work, experience, and skills in computer science.",
    creator: "@awhtiambou",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${besley.variable} ${montserrat.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <MUIProvider>
              <CustomCursor />
              {children}
            </MUIProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
