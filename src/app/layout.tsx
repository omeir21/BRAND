// ============================================
// ROOT LAYOUT
// ============================================

import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Notifications from "@/components/layout/Notifications";
import { BRAND } from "@/lib/constants";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} - ${BRAND.description}`,
    template: `%s | ${BRAND.name}`,
  },
  description: `${BRAND.name}: ${BRAND.description}. Global Top-Tier Luxury Fashion Brand.`,
  keywords: ["luxury fashion", "designer clothing", "premium brands", BRAND.name],
  authors: [{ name: BRAND.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://atlas-eo.com",
    siteName: BRAND.name,
    title: `${BRAND.name} - ${BRAND.description}`,
    description: `Experience luxury with ${BRAND.name}. Global Top-Tier Fashion Brand.`,
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.name,
    description: BRAND.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0B1F3A" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Garamond:wght@400;700&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-off-white text-charcoal">
        <div className="flex min-h-screen flex-col">
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <Footer />
        </div>

        {/* Notifications */}
        <Notifications />
      </body>
    </html>
  );
}
