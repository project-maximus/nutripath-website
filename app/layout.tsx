import type { Metadata } from "next";
import { Nunito, Lexend } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "NutriPath Canada | CDRE & KCAT Exam Prep Built by Dietitians",
    template: "%s | NutriPath Canada",
  },
  description:
    "CDRE exam prep Canada and KCAT study guide built by registered dietitians. Accessibility-first, neurodiversity-friendly preparation for Canadian dietitian licensing exams.",
  metadataBase: new URL("https://nutripath.ca"),
  openGraph: {
    title: "NutriPath Canada | CDRE & KCAT Exam Prep Built by Dietitians",
    description:
      "Accessibility-first CDRE and KCAT exam prep, built by registered dietitians who've been exactly where you are.",
    url: "https://nutripath.ca",
    siteName: "NutriPath Canada",
    locale: "en_CA",
    type: "website",
  },
  verification: {
    google: "1f5GWhE8_PtT0FoLVhYoDonht8BRf-bYThpi02iY0RI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${lexend.variable}`}>
      <body className="flex min-h-screen flex-col font-body text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
