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

const siteUrl = "https://gopo.vercel.app";
const ogImage = `${siteUrl}/images/sinergisasi.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Gopo - Temukan ORMAWA yang Tepat untukmu",
    template: "%s | Gopo",
  },

  description:
    "Gopo adalah platform yang membantu mahasiswa Polibatam menemukan Organisasi Mahasiswa (ORMAWA) yang sesuai dengan minat, bakat, dan tujuan mereka.",

  applicationName: "Gopo",

  keywords: [
    "Gopo",
    "ORMAWA",
    "Polibatam",
    "Organisasi Mahasiswa",
    "Politeknik Negeri Batam",
    "mahasiswa",
  ],

  authors: [
    {
      name: "Gopo",
    },
  ],

  creator: "Gopo",
  publisher: "Gopo",

  icons: {
    icon: "/images/sinergisasi.png",
    shortcut: "/images/sinergisasi.png",
    apple: "/images/sinergisasi.png",
  },

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,

    title: "Gopo - Temukan ORMAWA yang Tepat untukmu",

    description:
      "Temukan ORMAWA yang paling cocok dengan minat, bakat, dan tujuanmu melalui Gopo.",

    siteName: "Gopo",

    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Gopo - Temukan ORMAWA yang Tepat untukmu",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Gopo - Temukan ORMAWA yang Tepat untukmu",

    description:
      "Temukan ORMAWA yang paling cocok dengan minat, bakat, dan tujuanmu melalui Gopo.",

    images: [ogImage],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}