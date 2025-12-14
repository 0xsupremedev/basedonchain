import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Providers } from "@/components/providers";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "BasedOnchain — AI Transaction Security for Base",
  description:
    "AI-powered onchain copilot that simulates, explains, and blocks risky transactions on Base.",
  other: {
    "base:app_id": "693dab7ed77c069a945bde80",
  },
  openGraph: {
    title: "BasedOnchain — AI Transaction Security for Base",
    description: "Simulate, explain, and block risky onchain transactions before you sign.",
    url: "https://basedonchain.xyz",
    siteName: "BasedOnchain",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BasedOnchain — AI Security for Base",
    description: "AI-powered onchain copilot that simulates, explains, and blocks risky transactions on Base.",
    creator: "@basedonchain",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
