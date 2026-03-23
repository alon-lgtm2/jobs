import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "מוצאים עבודה בהולנד | פרסמו משרה חינם | jobs.israelis.nl",
  description:
    "הפלטפורמה של הישראלים בהולנד. פרסמו משרות בחינם, חפשו עבודה עם כלי AI, מאמרים מעשיים וליווי אישי.",
  keywords: [
    "עבודה בהולנד",
    "ישראלים בהולנד",
    "משרות הולנד",
    "עבודה באמסטרדם",
    "קריירה בהולנד",
    "פרסום משרה בהולנד",
    "גיוס ישראלים בהולנד",
  ],
  openGraph: {
    title: "מוצאים עבודה בהולנד | פרסמו משרה חינם",
    description:
      "הפלטפורמה של הישראלים בהולנד. פרסמו משרות בחינם, חפשו עבודה עם כלי AI, מאמרים מעשיים וליווי אישי.",
    url: "https://jobs.israelis.nl",
    siteName: "jobs.israelis.nl",
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "מוצאים עבודה בהולנד | פרסמו משרה חינם",
    description:
      "הפלטפורמה של הישראלים בהולנד. פרסמו משרות בחינם, חפשו עבודה עם כלי AI, מאמרים מעשיים וליווי אישי.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${heebo.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
