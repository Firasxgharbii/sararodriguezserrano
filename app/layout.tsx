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
  title: "Sara Rodríguez Serrano",
  description: "Portfolio artistique de Sara Rodríguez Serrano",
  icons: {
    icon: "/logosara.png?v=10",
    shortcut: "/logosara.png?v=10",
    apple: "/logosara.png?v=10",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/logosara.png?v=10" type="image/png" />
        <link rel="shortcut icon" href="/logosara.png?v=10" type="image/png" />
        <link rel="apple-touch-icon" href="/logosara.png?v=10" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}