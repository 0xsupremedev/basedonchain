import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { ApiResponse, AnalysisResult } from "@/shared";

/**
 * GET /api/analyses
 * Get analyses for a wallet address
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const walletAddress = searchParams.get("walletAddress");

    if (!walletAddress) {
      return NextResponse.json<ApiResponse<never>>(
        {
          success: false,
          error: {
            error: "ValidationError",
            message: "walletAddress query parameter is required",
          },
        },
        { status: 400 }
      );
    }

    // Get or create wallet
    const wallet = await prisma.wallet.findUnique({
      where: { address: walletAddress.toLowerCase() },
      include: {
        analyses: {
          orderBy: { createdAt: "desc" },
          take: 100, // Limit to last 100 analyses
        },
      },
    });

    if (!wallet) {
      return NextResponse.json<ApiResponse<AnalysisResult[]>>(
        {
          success: true,
          data: [],
        },
        { status: 200 }
      );
    }

    const analyses: AnalysisResult[] = wallet.analyses.map((a) => ({
      id: a.id,
      walletId: a.walletId || undefined,
      txHash: a.txHash || undefined,
      inputData: a.inputData as unknown as AnalysisResult["inputData"],
      riskScore: {
        score: a.riskScore,
        level: getRiskLevel(a.riskScore),
        label: a.label as AnalysisResult["riskScore"]["label"],
      },
      explanation: a.explanation,
      recommendations: (a.recommendations as unknown as string[]) || [],
      decodedTx: (a.decodedTx as unknown as AnalysisResult["decodedTx"]) || {
        to: "",
        value: "0",
        data: "0x",
        humanReadable: "",
        isContractInteraction: false,
      },
      simulationResult: (a.simulationResult as unknown as AnalysisResult["simulationResult"]),
      createdAt: a.createdAt.toISOString(),
    }));

    return NextResponse.json<ApiResponse<AnalysisResult[]>>(
      {
        success: true,
        data: analyses,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching analyses:", error);
    return NextResponse.json<ApiResponse<never>>(
      {
        success: false,
        error: {
          error: "FetchError",
          message: error instanceof Error ? error.message : "Unknown error",
        },
      },
      { status: 500 }
    );
  }
}

function getRiskLevel(score: number): "low" | "medium" | "high" | "critical" {
  if (score >= 85) return "critical";
  if (score >= 60) return "high";
  if (score >= 30) return "medium";
  return "low";
}
