import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

// Archivo ships Latin only in next/font; Russian headings fall back to system-ui
// via the --font-display chain in globals.css. English (primary) uses Archivo.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arrogatetransportation.com"),
  title: "Arrogate Transportation — B2B Freight Across 48 States",
  description:
    "Arrogate Transportation is a licensed dry-van carrier for shippers and distributors. Direct rates, live dispatch, and tracking from pickup to delivery across all 48 states.",
  keywords: [
    "freight",
    "dry van",
    "FTL",
    "LTL",
    "B2B logistics",
    "trucking",
    "Arrogate Transportation",
    "Katy Texas",
  ],
  authors: [{ name: "Arrogate Transportation INC." }],
  alternates: {
    languages: {
      en: "/",
      ru: "/",
    },
  },
  openGraph: {
    title: "Arrogate Transportation — B2B Freight Across 48 States",
    description:
      "Licensed dry-van carrier. Direct rates, live dispatch, and tracking from pickup to delivery across all 48 states.",
    type: "website",
    locale: "en_US",
    alternateLocale: "ru_RU",
    siteName: "Arrogate Transportation",
  },
};

export const viewport: Viewport = {
  themeColor: "#10131c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrainsMono.variable}`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
