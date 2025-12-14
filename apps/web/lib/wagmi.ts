"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base, baseSepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "BasedOnchain",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "default-project-id",
  chains: [base, baseSepolia],
  ssr: true,
});
