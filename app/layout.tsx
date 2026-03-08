import type { Metadata } from "next";
import { Orbitron, Space_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"], // pick what you need
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={orbitron.className}>
      <body className={spaceMono.className}>{children}</body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Vincent Cordova — Software Engineer",
  description: "Software engineer building scalable systems and clean interfaces.",
};

