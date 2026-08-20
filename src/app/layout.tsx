import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gopo - Temukan ORMAWA yang Tepat untukmu",
  description: "Gopo adalah platform yang membantu mahasiswa Polibatam menemukan Organisasi Mahasiswa (ORMAWA) yang sesuai dengan minat, bakat, dan tujuan mereka. Dengan fitur pencocokan berbasis jawaban kuis, Gopo memberikan rekomendasi personal untuk bergabung dengan ORMAWA yang paling cocok.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
