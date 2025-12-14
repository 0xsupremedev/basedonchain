import { ethers } from "ethers";
import type { HeuristicResult, RiskLevel, DecodedTransaction } from "@/shared";

/**
 * Known malicious contract addresses (this should be populated from a database or API)
 */
const KNOWN_MALICIOUS_CONTRACTS: Set<string> = new Set([
  // Add known malicious contract addresses here
  // Example: "0x1234567890123456789012345678901234567890"
]);

/**
 * Known drainer patterns (function signatures commonly used in scams)
 */
const DRAINER_FUNCTION_SIGNATURES: Set<string> = new Set([
  "0xb93073bf", // A common drainer function
]);

/**
 * Check if contract is known malicious
 */
export function checkKnownMalicious(to: string): HeuristicResult {
  const normalizedAddress = ethers.getAddress(to);
  const isMalicious = KNOWN_MALICIOUS_CONTRACTS.has(normalizedAddress);

  return {
    passed: !isMalicious,
    severity: isMalicious ? "critical" : "low",
    message: isMalicious
      ? "This contract is flagged as malicious"
      : "Contract not found in malicious database",
    details: {
      address: normalizedAddress,
      isKnownMalicious: isMalicious,
    },
  };
}

/**
 * Check for unlimited approval (common scam pattern)
 */
export function checkUnlimitedApproval(
  decodedTx: DecodedTransaction
): HeuristicResult {
  if (decodedTx.functionName === "approve") {
    const args = decodedTx.functionArgs;
    if (args && "amount" in args) {
      const amount = BigInt(args.amount as string);
      const maxUint256 = ethers.MaxUint256;
      const isUnlimited = amount === maxUint256 || amount > BigInt(10 ** 18) * BigInt(1000000); // Very large amounts (>1M tokens)

      return {
        passed: !isUnlimited,
        severity: isUnlimited ? "critical" : "low",
        message: isUnlimited
          ? "This approval sets an unlimited or extremely high allowance"
          : "Approval amount is within reasonable limits",
        details: {
          amount: amount.toString(),
          isUnlimited,
        },
      };
    }
  }

  if (decodedTx.functionName === "increaseAllowance") {
    return {
      passed: true,
      severity: "medium",
      message: "Increasing allowance - verify the new total amount",
      details: {
        function: "increaseAllowance",
      },
    };
  }

  return {
    passed: true,
    severity: "low",
    message: "No approval-related risk detected",
  };
}

/**
 * Check for suspicious value transfers
 */
export function checkValueTransfer(
  decodedTx: DecodedTransaction,
  threshold: bigint = ethers.parseEther("1.0") // 1 ETH default threshold
): HeuristicResult {
  const value = BigInt(decodedTx.value);
  const isHighValue = value > threshold;

  return {
    passed: !isHighValue,
    severity: isHighValue ? "high" : "low",
    message: isHighValue
      ? `Large value transfer: ${ethers.formatEther(value)} ETH`
      : "Value transfer is within normal range",
    details: {
      value: value.toString(),
      valueEth: ethers.formatEther(value),
      threshold: threshold.toString(),
    },
  };
}

/**
 * Check for drainer function signatures
 */
export function checkDrainerSignature(data: string): HeuristicResult {
  if (!data || data.length < 10) {
    return {
      passed: true,
      severity: "low",
      message: "No function call detected",
    };
  }

  const functionSignature = data.slice(0, 10);
  const isDrainer = DRAINER_FUNCTION_SIGNATURES.has(functionSignature);

  return {
    passed: !isDrainer,
    severity: isDrainer ? "critical" : "low",
    message: isDrainer
      ? "This function signature matches known drainer patterns"
      : "Function signature appears safe",
    details: {
      functionSignature,
      isDrainer,
    },
  };
}

/**
 * Check for setApprovalForAll (ERC721/NFT approval risk)
 */
export function checkNFTApprovalForAll(
  decodedTx: DecodedTransaction
): HeuristicResult {
  if (decodedTx.functionName === "setApprovalForAll") {
    const args = decodedTx.functionArgs;
    if (args && "approved" in args) {
      const approved = args.approved as boolean;

      return {
        passed: !approved,
        severity: approved ? "high" : "low",
        message: approved
          ? "This grants approval for ALL your NFTs to this contract"
          : "Revoking approval for all NFTs",
        details: {
          approved,
          operator: args.operator,
        },
      };
    }
  }

  return {
    passed: true,
    severity: "low",
    message: "No NFT approval risk detected",
  };
}

/**
 * Run all heuristics and aggregate results
 */
export function runAllHeuristics(
  decodedTx: DecodedTransaction
): HeuristicResult[] {
  const results: HeuristicResult[] = [];

  // Check known malicious contracts
  results.push(checkKnownMalicious(decodedTx.to));

  // Check for unlimited approvals
  results.push(checkUnlimitedApproval(decodedTx));

  // Check value transfers
  results.push(checkValueTransfer(decodedTx));

  // Check drainer signatures
  results.push(checkDrainerSignature(decodedTx.data));

  // Check NFT approvals
  results.push(checkNFTApprovalForAll(decodedTx));

  return results;
}

/**
 * Calculate overall risk score from heuristic results
 */
export function calculateRiskScoreFromHeuristics(
  results: HeuristicResult[]
): { score: number; level: RiskLevel } {
  let criticalCount = 0;
  let highCount = 0;
  let mediumCount = 0;
  let lowCount = 0;

  for (const result of results) {
    if (!result.passed) {
      switch (result.severity) {
        case "critical":
          criticalCount++;
          break;
        case "high":
          highCount++;
          break;
        case "medium":
          mediumCount++;
          break;
        case "low":
          lowCount++;
          break;
      }
    }
  }

  // Calculate score (0-100)
  let score = 0;
  if (criticalCount > 0) {
    score = 85 + Math.min(criticalCount * 5, 15); // 85-100 for critical
  } else if (highCount > 0) {
    score = 60 + Math.min(highCount * 10, 25); // 60-85 for high
  } else if (mediumCount > 0) {
    score = 30 + Math.min(mediumCount * 10, 30); // 30-60 for medium
  } else {
    score = Math.min(lowCount * 5, 30); // 0-30 for low
  }

  // Determine level
  let level: RiskLevel;
  if (score >= 85) {
    level = "critical";
  } else if (score >= 60) {
    level = "high";
  } else if (score >= 30) {
    level = "medium";
  } else {
    level = "low";
  }

  return { score: Math.min(score, 100), level };
}
