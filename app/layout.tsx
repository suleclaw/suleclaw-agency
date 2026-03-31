import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import { Syne } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
    <html lang="en" className={`${instrumentSans.variable} ${jetbrainsMono.variable} ${syne.variable}`}>
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
