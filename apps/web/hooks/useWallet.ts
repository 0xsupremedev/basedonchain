"use client";

import { useAccount, useChainId } from "wagmi";
import { base } from "wagmi/chains";

export function useWallet() {
  const { address, isConnected, isConnecting } = useAccount();
  const chainId = useChainId();
  const isBaseNetwork = chainId === base.id;

  return {
    address,
    isConnected,
    isConnecting,
    isBaseNetwork,
    chainId,
  };
}
