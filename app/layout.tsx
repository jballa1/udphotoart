import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { InsiderPopup } from "@/components/insider-popup";

// Primary Typography: Cormorant Garamond - for titles (Brand Manual)
const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

// Secondary Typography: Inter - for content (Brand Manual)
const inter = Inter({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UDPhotoArt | Seizing the Moment",
  description:
    "Fine art photography by Rigo Gonzalez-Nossa. Where ideas meet the lens — transforming moments into art.",
  keywords: [
    "fine art photography",
    "photography",
    "art",
    "prints",
    "Rigo Gonzalez-Nossa",
    "UDPhotoArt",
  ],
  authors: [{ name: "Rigo Gonzalez-Nossa" }],
  creator: "UDPhotoArt",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://udphotoart.com",
    title: "UDPhotoArt | Seizing the Moment",
    description:
      "Fine art photography by Rigo Gonzalez-Nossa. Where ideas meet the lens — transforming moments into art.",
    siteName: "UDPhotoArt",
  },
  twitter: {
    card: "summary_large_image",
    title: "UDPhotoArt | Seizing the Moment",
    description:
      "Fine art photography by Rigo Gonzalez-Nossa. Where ideas meet the lens — transforming moments into art.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${inter.variable}`}
    >
      <body className="antialiased">
        <CartProvider>
          {children}
          <InsiderPopup />
        </CartProvider>
      </body>
    </html>
  );
}
