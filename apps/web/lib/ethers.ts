import { ethers } from "ethers";

/**
 * Base network configuration
 */
export const BASE_MAINNET = {
  chainId: 8453,
  name: "Base",
  rpcUrls: {
    default: {
      http: [
        process.env.BASE_RPC_URL || "https://mainnet.base.org",
        "https://base.llamarpc.com",
      ],
    },
  },
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "BaseScan",
      url: "https://basescan.org",
    },
  },
};

export const BASE_SEPOLIA = {
  chainId: 84532,
  name: "Base Sepolia",
  rpcUrls: {
    default: {
      http: [
        process.env.BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org",
      ],
    },
  },
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "BaseScan",
      url: "https://sepolia.basescan.org",
    },
  },
};

/**
 * Get Base RPC provider
 */
export function getBaseProvider(): ethers.JsonRpcProvider {
  const rpcUrl = process.env.BASE_RPC_URL || "https://mainnet.base.org";
  return new ethers.JsonRpcProvider(rpcUrl);
}

/**
 * Get Base Sepolia provider (for testing)
 */
export function getBaseSepoliaProvider(): ethers.JsonRpcProvider {
  const rpcUrl = process.env.BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org";
  return new ethers.JsonRpcProvider(rpcUrl);
}

/**
 * Get provider based on chain ID
 */
export function getProvider(chainId: number): ethers.JsonRpcProvider {
  if (chainId === BASE_SEPOLIA.chainId) {
    return getBaseSepoliaProvider();
  }
  return getBaseProvider();
}

/**
 * Parse transaction hash and fetch transaction data
 */
export async function fetchTransaction(
  txHash: string,
  provider?: ethers.Provider
): Promise<ethers.TransactionResponse | null> {
  const rpcProvider = provider || getBaseProvider();
  try {
    const tx = await rpcProvider.getTransaction(txHash);
    return tx;
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return null;
  }
}

/**
 * Get transaction receipt
 */
export async function getTransactionReceipt(
  txHash: string,
  provider?: ethers.Provider
): Promise<ethers.TransactionReceipt | null> {
  const rpcProvider = provider || getBaseProvider();
  try {
    const receipt = await rpcProvider.getTransactionReceipt(txHash);
    return receipt;
  } catch (error) {
    console.error("Error fetching transaction receipt:", error);
    return null;
  }
}

/**
 * Check if address is a contract
 */
export async function isContract(
  address: string,
  provider?: ethers.Provider
): Promise<boolean> {
  const rpcProvider = provider || getBaseProvider();
  try {
    const code = await rpcProvider.getCode(address);
    return code !== "0x" && code.length > 2;
  } catch (error) {
    console.error("Error checking contract:", error);
    return false;
  }
}

/**
 * Get balance of an address
 */
export async function getBalance(
  address: string,
  provider?: ethers.Provider
): Promise<bigint> {
  const rpcProvider = provider || getBaseProvider();
  try {
    return await rpcProvider.getBalance(address);
  } catch (error) {
    console.error("Error getting balance:", error);
    return BigInt(0);
  }
}

/**
 * Format ETH value to human-readable string
 */
export function formatEth(value: bigint | string): string {
  return ethers.formatEther(value);
}

/**
 * Parse ETH value from string
 */
export function parseEth(value: string): bigint {
  return ethers.parseEther(value);
}
