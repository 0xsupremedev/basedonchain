import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BasedOnchain - AI-Powered Onchain Copilot for Base",
  description:
    "Analyze, simulate, and secure your Base transactions with AI-powered risk assessment",
  other: {
    "base:app_id": "693dab7ed77c069a945bde80",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
