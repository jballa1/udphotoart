import type { Metadata } from "next";
import { Bebas_Neue, Open_Sans } from "next/font/google";
import "./globals.css";

// Primary Typography: Bebas Neue - for titles (Brand Manual)
const bebasNeue = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

// Secondary Typography: Open Sans - for content (Brand Manual)
const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-open-sans",
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
    <html lang="en" className={`${bebasNeue.variable} ${openSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
