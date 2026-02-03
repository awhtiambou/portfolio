import type { Metadata, Viewport } from "next";
import { Besley, Montserrat } from "next/font/google";
import { ThemeProvider, MUIProvider } from "@/providers";
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
  metadataBase: new URL("https://portfolio.dev"),
  title: {
    default: "Portfolio | Your Name",
    template: "%s | Portfolio",
  },
  description: "Personal portfolio showcasing my work, experience, and skills in web development.",
  keywords: ["portfolio", "web developer", "software engineer", "projects"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio.dev",
    siteName: "Portfolio",
    title: "Portfolio | Your Name",
    description: "Personal portfolio showcasing my work, experience, and skills in web development.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Your Name",
    description: "Personal portfolio showcasing my work, experience, and skills in web development.",
    creator: "@yourhandle",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${besley.variable} ${montserrat.variable} antialiased`}>
        <ThemeProvider>
          <MUIProvider>
            {children}
          </MUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
