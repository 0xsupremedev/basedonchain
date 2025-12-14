import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ethers, Interface } from "ethers";
import type { ApiResponse } from "@/shared";

const revokeRequestSchema = z.object({
  tokenAddress: z.string(),
  spender: z.string(),
  owner: z.string(),
});

/**
 * POST /api/revoke/prepare
 * Prepare an unsigned revoke transaction (sets approval to 0)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = revokeRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json<ApiResponse<never>>(
        {
          success: false,
          error: {
            error: "ValidationError",
            message: validationResult.error.errors[0]?.message || "Invalid request format",
          },
        },
        { status: 400 }
      );
    }

    const { tokenAddress, spender, owner } = validationResult.data;

    // Validate addresses
    if (!ethers.isAddress(tokenAddress) || !ethers.isAddress(spender) || !ethers.isAddress(owner)) {
      return NextResponse.json<ApiResponse<never>>(
        {
          success: false,
          error: {
            error: "ValidationError",
            message: "Invalid address format",
          },
        },
        { status: 400 }
      );
    }

    // Create ERC20 interface
    const erc20Interface = new Interface([
      "function approve(address spender, uint256 amount) returns (bool)",
    ]);

    // Prepare approve(spender, 0) transaction
    const data = erc20Interface.encodeFunctionData("approve", [spender, 0]);

    return NextResponse.json<ApiResponse<{
      to: string;
      data: string;
      value: string;
      note: string;
    }>>(
      {
        success: true,
        data: {
          to: tokenAddress,
          data,
          value: "0",
          note: "Sign this transaction with your wallet to revoke the approval. This sets the allowance to 0.",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Revoke prepare error:", error);
    return NextResponse.json<ApiResponse<never>>(
      {
        success: false,
        error: {
          error: "RevokeError",
          message: error instanceof Error ? error.message : "Unknown error",
        },
      },
      { status: 500 }
    );
  }
}
