import type { Metadata } from "next";
import { Heebo, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const frankRuhl = Frank_Ruhl_Libre({
  variable: "--font-frank",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "מוצאים עבודה בהולנד | jobs.israelis.nl",
  description:
    "המרכז לישראלים שמחפשים עבודה בהולנד. משרות, משאבים, קהילה — הכל במקום אחד.",
  keywords: [
    "עבודה בהולנד",
    "ישראלים בהולנד",
    "משרות הולנד",
    "עבודה באמסטרדם",
    "קריירה בהולנד",
  ],
  openGraph: {
    title: "מוצאים עבודה בהולנד",
    description:
      "המרכז לישראלים שמחפשים עבודה בהולנד. הצטרפו לקהילה שלנו.",
    url: "https://jobs.israelis.nl",
    siteName: "jobs.israelis.nl",
    locale: "he_IL",
    type: "website",
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
        className={`${heebo.variable} ${frankRuhl.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
