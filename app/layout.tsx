import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SuleClaw Agency — AI Agent Teams for Founders",
  description:
    "SuleClaw Agency builds AI agent teams that work alongside solo founders and small companies — multiplying what you can ship.",
  keywords: ["AI agents", "software development", "solo founders", "agent teams"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${syne.variable}`}>
      <body className="min-h-full flex flex-col bg-[#0A0A0B] text-[#FAFAFA] antialiased">
        {children}
      </body>
    </html>
  );
}
