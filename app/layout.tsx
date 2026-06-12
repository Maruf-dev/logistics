import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

// Archivo ships Latin only in next/font; Russian headings fall back to system-ui
// via the --font-display chain in globals.css. English (primary) uses Archivo.
// Only weights actually referenced in the stylesheet are requested.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://harbtrucking.com"),
  title: "Harb Trucking — B2B Freight Across 48 States",
  description:
    "Harb Trucking is a licensed dry-van carrier for shippers and distributors. Direct rates, live dispatch, and tracking from pickup to delivery across all 48 states.",
  keywords: [
    "freight",
    "dry van",
    "FTL",
    "LTL",
    "B2B logistics",
    "trucking",
    "Harb Trucking",
    "Katy Texas",
  ],
  authors: [{ name: "Harb Trucking" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    // Language is a same-URL client toggle (no /ru route), so the honest signal
    // is a single self-canonical — not conflicting per-language hreflang alternates.
    canonical: "/",
  },
  openGraph: {
    title: "Harb Trucking — B2B Freight Across 48 States",
    description:
      "Licensed dry-van carrier. Direct rates, live dispatch, and tracking from pickup to delivery across all 48 states.",
    type: "website",
    locale: "en_US",
    alternateLocale: "ru_RU",
    siteName: "Harb Trucking",
    // og:image is generated as a raster PNG by app/opengraph-image.tsx (social
    // crawlers don't render SVG), wired automatically via the file convention.
  },
  twitter: {
    card: "summary_large_image",
    title: "Harb Trucking — B2B Freight Across 48 States",
    description:
      "Licensed dry-van carrier. Direct rates, live dispatch, and tracking from pickup to delivery across all 48 states.",
    // twitter:image supplied by app/twitter-image.tsx (raster PNG).
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#10131c" },
  ],
  width: "device-width",
  initialScale: 1,
};

// schema.org structured data — USDOT/MC and location are real; email + domain
// are placeholders on the harbtrucking.com brand until the real ones are set.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: "Harb Trucking",
  url: "https://harbtrucking.com",
  email: "dispatch@harbtrucking.com",
  image: "https://harbtrucking.com/og.svg",
  description:
    "Licensed dry-van carrier for B2B shippers and distributors. Direct rates, live dispatch, and tracking from pickup to delivery across all 48 states.",
  areaServed: { "@type": "Country", name: "United States" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Katy",
    addressRegion: "TX",
    addressCountry: "US",
  },
  knowsLanguage: ["en", "ru"],
  identifier: [
    { "@type": "PropertyValue", propertyID: "USDOT", value: "3822610" },
    { "@type": "PropertyValue", propertyID: "MC", value: "1383751" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
