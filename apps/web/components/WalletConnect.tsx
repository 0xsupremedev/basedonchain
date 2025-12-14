"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId } from "wagmi";
import { base } from "wagmi/chains";

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const isBaseNetwork = chainId === base.id;

  return (
    <div className="flex flex-col items-center gap-4">
      <ConnectButton />
      {isConnected && !isBaseNetwork && (
        <div className="mt-2 rounded-lg bg-yellow-100 p-3 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
          <p className="text-sm font-medium">
            Please switch to Base network (Chain ID: {base.id}) to use this app.
          </p>
        </div>
      )}
      {isConnected && isBaseNetwork && (
        <div className="mt-2 rounded-lg bg-green-100 p-3 text-green-800 dark:bg-green-900 dark:text-green-200">
          <p className="text-sm font-medium">Connected to Base network</p>
          <p className="text-xs">{address}</p>
        </div>
      )}
    </div>
  );
}
