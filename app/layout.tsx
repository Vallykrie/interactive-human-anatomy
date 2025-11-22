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
  title: "Interactive Human Anatomy | 3D Viewer",
  description: "Explore the human body in detail with this interactive 3D anatomy viewer. Toggle between skin, muscle, and skeleton layers for a comprehensive learning experience. Created by Nathan Sudiara.",
  keywords: ["anatomy", "3d", "interactive", "human body", "medical", "education", "webgl", "react three fiber", "Nathan Sudiara"],
  openGraph: {
    title: "Interactive Human Anatomy | 3D Viewer",
    description: "Explore the human body in detail with this interactive 3D anatomy viewer. Toggle between skin, muscle, and skeleton layers for a comprehensive learning experience.",
    url: "https://interactive-human-anatomy.vercel.app", // Assuming a URL or placeholder
    siteName: "Interactive Human Anatomy",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Interactive Human Anatomy 3D Viewer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive Human Anatomy | 3D Viewer",
    description: "Explore the human body in detail with this interactive 3D anatomy viewer.",
    images: ["/og-image.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
