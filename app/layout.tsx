import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Only weights actually referenced in the stylesheet are requested.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
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
    "Chicago Illinois",
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
    canonical: "/",
  },
  openGraph: {
    title: "Harb Trucking — B2B Freight Across 48 States",
    description:
      "Licensed dry-van carrier. Direct rates, live dispatch, and tracking from pickup to delivery across all 48 states.",
    type: "website",
    locale: "en_US",
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
    addressLocality: "Chicago",
    addressRegion: "IL",
    addressCountry: "US",
  },
  knowsLanguage: ["en"],
  identifier: [
    { "@type": "PropertyValue", propertyID: "USDOT", value: "4327636" },
    { "@type": "PropertyValue", propertyID: "MC", value: "1689299" },
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
        {children}
      </body>
    </html>
  );
}
