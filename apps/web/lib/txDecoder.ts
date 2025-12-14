import { ethers, Interface } from "ethers";
import type { DecodedTransaction, TransactionInput } from "@/shared";
import { fetchTransaction as fetchTxFromEthers } from "./ethers";

/**
 * Common ERC20 function signatures
 */
const ERC20_FUNCTIONS = {
  transfer: "transfer(address,uint256)",
  approve: "approve(address,uint256)",
  transferFrom: "transferFrom(address,address,uint256)",
  increaseAllowance: "increaseAllowance(address,uint256)",
};

/**
 * Common ERC721 function signatures
 */
const ERC721_FUNCTIONS = {
  approve: "approve(address,uint256)",
  setApprovalForAll: "setApprovalForAll(address,bool)",
  transferFrom: "transferFrom(address,address,uint256)",
  safeTransferFrom: "safeTransferFrom(address,address,uint256)",
};

/**
 * Decode transaction data
 */
export async function decodeTransaction(
  input: TransactionInput,
  provider?: ethers.Provider
): Promise<DecodedTransaction> {
  let to: string;
  let value: bigint;
  let data: string;

  // Handle different input types
  if (input.txHash) {
    // Fetch transaction from blockchain
    const tx = await fetchTxFromEthers(input.txHash, provider);
    if (!tx) {
      throw new Error("Transaction not found");
    }
    to = tx.to || "";
    value = tx.value;
    data = tx.data;
  } else if (input.unsignedTx) {
    to = input.unsignedTx.to;
    value = BigInt(input.unsignedTx.value || "0");
    data = input.unsignedTx.data || "0x";
  } else if (input.calldata && input.to) {
    to = input.to;
    value = BigInt(input.value || "0");
    data = input.calldata;
  } else {
    throw new Error("Invalid transaction input");
  }

  // Decode the transaction
  const decoded = await decodeCalldata(to, data, value);

  return {
    to,
    value: value.toString(),
    data,
    functionName: decoded.functionName,
    functionArgs: decoded.args,
    humanReadable: decoded.humanReadable,
    isContractInteraction: data !== "0x" && data.length > 2,
  };
}

/**
 * Decode calldata to human-readable format
 */
async function decodeCalldata(
  to: string,
  data: string,
  value: bigint
): Promise<{
  functionName?: string;
  args?: Record<string, unknown>;
  humanReadable: string;
}> {
  if (!data || data === "0x" || data.length <= 10) {
    // Simple ETH transfer
    if (value > 0) {
      return {
        humanReadable: `Send ${ethers.formatEther(value)} ETH to ${to}`,
      };
    }
    return {
      humanReadable: "Empty transaction",
    };
  }

  const functionSignature = data.slice(0, 10);

  // Check for common ERC20 functions
  const erc20Interface = new Interface([
    `function ${ERC20_FUNCTIONS.transfer}`,
    `function ${ERC20_FUNCTIONS.approve}`,
    `function ${ERC20_FUNCTIONS.transferFrom}`,
    `function ${ERC20_FUNCTIONS.increaseAllowance}`,
  ]);

  // Check for common ERC721 functions
  const erc721Interface = new Interface([
    `function ${ERC20_FUNCTIONS.approve}`,
    `function ${ERC721_FUNCTIONS.setApprovalForAll}`,
    `function ${ERC721_FUNCTIONS.transferFrom}`,
    `function ${ERC721_FUNCTIONS.safeTransferFrom}`,
  ]);

  try {
    // Try ERC20 first
    try {
      const decoded = erc20Interface.parseTransaction({ data });
      const functionName = decoded.name;
      const args = decoded.args.toObject();

      let humanReadable = "";

      if (functionName === "transfer") {
        humanReadable = `Transfer ${formatTokenAmount(args.amount)} tokens to ${args.to}`;
      } else if (functionName === "approve") {
        const amount = args.amount as bigint;
        const amountStr =
          amount === ethers.MaxUint256
            ? "unlimited"
            : formatTokenAmount(amount);
        humanReadable = `Approve ${amountStr} tokens for ${args.spender}`;
      } else if (functionName === "transferFrom") {
        humanReadable = `Transfer ${formatTokenAmount(args.amount)} tokens from ${args.from} to ${args.to}`;
      } else if (functionName === "increaseAllowance") {
        humanReadable = `Increase allowance by ${formatTokenAmount(args.addedValue)} tokens for ${args.spender}`;
      }

      return {
        functionName,
        args: Object.fromEntries(
          Object.entries(args).map(([key, value]) => [
            key,
            typeof value === "bigint" ? value.toString() : value,
          ])
        ),
        humanReadable,
      };
    } catch {
      // Not an ERC20 function, try ERC721
      try {
        const decoded = erc721Interface.parseTransaction({ data });
        const functionName = decoded.name;
        const args = decoded.args.toObject();

        let humanReadable = "";

        if (functionName === "approve") {
          humanReadable = `Approve NFT #${args.tokenId} to ${args.to}`;
        } else if (functionName === "setApprovalForAll") {
          humanReadable = `Set approval for all NFTs: ${args.approved ? "Granted" : "Revoked"} for ${args.operator}`;
        } else if (functionName === "transferFrom" || functionName === "safeTransferFrom") {
          humanReadable = `Transfer NFT #${args.tokenId} from ${args.from} to ${args.to}`;
        }

        return {
          functionName,
          args: Object.fromEntries(
            Object.entries(args).map(([key, value]) => [
              key,
              typeof value === "bigint" ? value.toString() : value,
            ])
          ),
          humanReadable,
        };
      } catch {
        // Unknown function signature
        return {
          humanReadable: `Call unknown function on ${to}`,
        };
      }
    }
  } catch (error) {
    console.error("Error decoding transaction:", error);
    return {
      humanReadable: `Call contract function on ${to}`,
    };
  }
}

/**
 * Format token amount to human-readable string
 */
function formatTokenAmount(amount: bigint): string {
  // Try to format as ETH (18 decimals) for readability
  try {
    const formatted = ethers.formatEther(amount);
    // If the number is very large, show it in scientific notation
    if (formatted.includes("e")) {
      return formatted;
    }
    // Otherwise, show a reasonable number of decimals
    const num = parseFloat(formatted);
    if (num >= 1) {
      return num.toLocaleString(undefined, { maximumFractionDigits: 4 });
    }
    return formatted;
  } catch {
    return amount.toString();
  }
}
