import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { decodeTransaction } from "@/lib/txDecoder";
import { simulateTransaction, estimateValueAtRisk } from "@/lib/riskEngine/simulation";
import { getBaseProvider } from "@/lib/ethers";
import type { ApiResponse } from "@/shared";

const simulateRequestSchema = z.object({
  txHash: z.string().optional(),
  unsignedTx: z
    .object({
      to: z.string(),
      data: z.string(),
      value: z.string().optional(),
    })
    .optional(),
  calldata: z.string().optional(),
  to: z.string().optional(),
  value: z.string().optional(),
  walletAddress: z.string().optional(),
  chainId: z.number().optional(),
});

/**
 * POST /api/simulate
 * Simulate a transaction and return state changes and value at risk
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = simulateRequestSchema.safeParse(body);

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

    const input = validationResult.data;
    const provider = getBaseProvider();

    // Decode transaction
    const decodedTx = await decodeTransaction(input, provider);

    // Simulate transaction
    const simulationResult = await simulateTransaction(
      decodedTx,
      validationResult.data.walletAddress,
      provider
    );

    // Estimate value at risk
    const valueAtRisk = await estimateValueAtRisk(
      decodedTx,
      validationResult.data.walletAddress,
      provider
    );

    return NextResponse.json<ApiResponse<{
      success: boolean;
      valueAtRisk?: string;
      stateDiffs?: Array<unknown>;
      error?: string;
    }>>(
      {
        success: true,
        data: {
          ...simulationResult,
          valueAtRisk: valueAtRisk || simulationResult.valueAtRisk,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Simulation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json<ApiResponse<never>>(
      {
        success: false,
        error: {
          error: "SimulationError",
          message: errorMessage,
        },
      },
      { status: 500 }
    );
  }
}
