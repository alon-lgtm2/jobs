import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Jobs for Israelis in the Netherlands | jobs.israelis.nl",
  description:
    "The central hub for Israeli professionals seeking career opportunities in the Netherlands. Find jobs, resources, and community.",
  keywords: [
    "Israeli jobs Netherlands",
    "Israel Netherlands careers",
    "Dutch jobs for Israelis",
    "work in Netherlands",
    "Israeli professionals",
  ],
  openGraph: {
    title: "Jobs for Israelis in the Netherlands",
    description:
      "Your gateway to career opportunities in the Netherlands. Join the Israeli professional community in NL.",
    url: "https://jobs.israelis.nl",
    siteName: "jobs.israelis.nl",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
