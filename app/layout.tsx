import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-face",
  weight: ["400", "500"],
  display: "swap",
});

const title = "Grab Me a Slice — Get Paid in Crypto";
const description =
  "Payment links for creators and AI agents. Share one link, accept crypto, and get paid.";

export const metadata: Metadata = {
  metadataBase: new URL("https://gbms.xyz"),
  title: {
    default: title,
    template: "%s — Grab Me a Slice",
  },
  description,
  applicationName: "Grab Me a Slice",
  keywords: [
    "crypto tipping",
    "creator payments",
    "payment links",
    "AI agent payments",
    "GBMS",
  ],
  openGraph: {
    type: "website",
    title,
    description,
    siteName: "Grab Me a Slice",
    url: "/",
    images: [
      {
        url: "/assets/send-a-slice.jpg",
        width: 1024,
        height: 1280,
        alt: "Grab Me a Slice — send a slice, tip creators with crypto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/assets/send-a-slice.jpg"],
  },
  icons: {
    icon: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <head>
        {/* Scroll-reveal is JS-driven; without it, opt everything into view. */}
        <noscript>
          <style>{`[style*="blur"]{opacity:1 !important;filter:none !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-crust focus:px-5 focus:py-2.5 focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
