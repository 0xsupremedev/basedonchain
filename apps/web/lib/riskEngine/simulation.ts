import { ethers } from "ethers";
import { getBaseProvider } from "../ethers";
import type { SimulationResult, TransactionInput, DecodedTransaction } from "@/shared";

/**
 * Simulate a transaction using eth_call
 */
export async function simulateTransaction(
  decodedTx: DecodedTransaction,
  fromAddress?: string,
  provider?: ethers.Provider
): Promise<SimulationResult> {
  const rpcProvider = provider || getBaseProvider();

  try {
    // Create a call request
    const callRequest: ethers.TransactionRequest = {
      to: decodedTx.to,
      data: decodedTx.data,
      value: decodedTx.value !== "0" ? decodedTx.value : undefined,
    };

    if (fromAddress) {
      callRequest.from = fromAddress;
    }

    // Simulate the call
    const result = await rpcProvider.call(callRequest, "latest");

    // Check if the call reverted
    if (result === "0x") {
      return {
        success: false,
        error: "Transaction would revert",
      };
    }

    // Get balance before and after (if fromAddress provided)
    let valueAtRisk: string | undefined;
    if (fromAddress && decodedTx.value !== "0") {
      const balanceBefore = await rpcProvider.getBalance(fromAddress);
      // Note: This is a simplified check. Full simulation would require
      // tracking state changes which is complex
      valueAtRisk = ethers.formatEther(decodedTx.value);
    }

    return {
      success: true,
      valueAtRisk,
      stateChanges: [], // Full state diff analysis would go here
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown simulation error";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Estimate value at risk for a transaction
 */
export async function estimateValueAtRisk(
  decodedTx: DecodedTransaction,
  fromAddress?: string,
  provider?: ethers.Provider
): Promise<string> {
  // For simple ETH transfers, the value is directly at risk
  if (decodedTx.value !== "0" && decodedTx.data === "0x") {
    return ethers.formatEther(decodedTx.value);
  }

  // For token approvals, calculate potential loss
  if (decodedTx.functionName === "approve" || decodedTx.functionName === "increaseAllowance") {
    const args = decodedTx.functionArgs;
    if (args && "amount" in args) {
      const amount = BigInt(args.amount as string);
      // Check if it's unlimited
      if (amount === ethers.MaxUint256) {
        return "Unlimited (check token balance)";
      }
      // Format as readable token amount
      try {
        return ethers.formatEther(amount);
      } catch {
        return amount.toString();
      }
    }
  }

  // For NFT approvals, indicate all NFTs
  if (decodedTx.functionName === "setApprovalForAll") {
    const args = decodedTx.functionArgs;
    if (args && "approved" in args && args.approved === true) {
      return "All NFTs in collection";
    }
  }

  // Default: unknown value at risk
  return "Unknown (requires contract analysis)";
}

/**
 * Check if transaction is a contract creation
 */
export function isContractCreation(tx: DecodedTransaction): boolean {
  return tx.to === "" || tx.data.length > 1000; // Simple heuristic
}

/**
 * Get gas estimate for transaction
 */
export async function estimateGas(
  decodedTx: DecodedTransaction,
  fromAddress?: string,
  provider?: ethers.Provider
): Promise<bigint | null> {
  const rpcProvider = provider || getBaseProvider();

  try {
    const estimate = await rpcProvider.estimateGas({
      to: decodedTx.to,
      data: decodedTx.data,
      value: decodedTx.value !== "0" ? decodedTx.value : undefined,
      from: fromAddress,
    });

    return estimate;
  } catch (error) {
    console.error("Error estimating gas:", error);
    return null;
  }
}
