import { NextRequest, NextResponse } from "next/server";
import { getBaseProvider, isContract } from "@/lib/ethers";
import { ethers, Interface } from "ethers";
import type { ApiResponse } from "@/shared";

// ERC20 ABI for approvals
const ERC20_ABI = [
  "function allowance(address owner, address spender) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

interface ApprovalInfo {
  token: string;
  tokenSymbol?: string;
  spender: string;
  allowance: string;
  allowanceFormatted: string;
  riskFlag: boolean;
}

/**
 * GET /api/approvals/:walletAddress
 * Scan onchain ERC20 approvals for a wallet
 * Note: This is a simplified version. Full implementation would require:
 * - Event indexing (Approval events)
 * - Token registry
 * - Cache for performance
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { walletAddress: string } }
) {
  try {
    const walletAddress = params.walletAddress;
    
    if (!ethers.isAddress(walletAddress)) {
      return NextResponse.json<ApiResponse<never>>(
        {
          success: false,
          error: {
            error: "ValidationError",
            message: "Invalid wallet address",
          },
        },
        { status: 400 }
      );
    }

    const provider = getBaseProvider();

    // This is a placeholder implementation
    // In production, you would:
    // 1. Query Approval events from past blocks
    // 2. Maintain a token registry
    // 3. Check current allowances
    // 4. Flag risky approvals (unlimited, unknown contracts)

    // For MVP, return empty array with note
    const approvals: ApprovalInfo[] = [];

    // Example: Check a few common tokens (USDC on Base)
    const commonTokens = [
      "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base
    ];

    for (const tokenAddress of commonTokens) {
      try {
        const tokenContract = new ethers.Contract(
          tokenAddress,
          ERC20_ABI,
          provider
        );

        // Get token info
        let symbol: string | undefined;
        let decimals = 18;
        try {
          symbol = await tokenContract.symbol();
          decimals = await tokenContract.decimals();
        } catch {
          // Token might not support these calls
        }

        // Note: To get all approvals, we'd need to scan Approval events
        // For MVP, we return structure but empty results
      } catch (error) {
        // Skip tokens that fail
        console.error(`Error checking token ${tokenAddress}:`, error);
      }
    }

    return NextResponse.json<ApiResponse<{
      walletAddress: string;
      approvals: ApprovalInfo[];
      note: string;
    }>>(
      {
        success: true,
        data: {
          walletAddress,
          approvals,
          note: "Full approval scanning requires event indexing. This endpoint structure is ready for implementation with an event indexer.",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Approvals error:", error);
    return NextResponse.json<ApiResponse<never>>(
      {
        success: false,
        error: {
          error: "ApprovalsError",
          message: error instanceof Error ? error.message : "Unknown error",
        },
      },
      { status: 500 }
    );
  }
}
