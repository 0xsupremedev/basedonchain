import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { ApiResponse } from "@/shared";

/**
 * GET /api/metrics
 * Returns KPIs for grant submission and dashboard
 */
export async function GET(request: NextRequest) {
  try {
    // Get all analyses
    const allAnalyses = await prisma.analysis.findMany({
      select: {
        riskScore: true,
        label: true,
      },
    });

    const totalAnalyzed = allAnalyses.length;
    const warningsIssued = allAnalyses.filter((a: { riskScore: number }) => a.riskScore >= 30).length;
    const highRiskCount = allAnalyses.filter(
      (a: { label: string }) => a.label === "High" || a.label === "Critical Risk" || a.label === "Dangerous"
    ).length;

    // Calculate risk distribution
    const riskDistribution = {
      low: allAnalyses.filter((a: { riskScore: number }) => a.riskScore < 30).length,
      medium: allAnalyses.filter((a: { riskScore: number }) => a.riskScore >= 30 && a.riskScore < 60).length,
      high: allAnalyses.filter((a: { riskScore: number }) => a.riskScore >= 60 && a.riskScore < 85).length,
      critical: allAnalyses.filter((a: { riskScore: number }) => a.riskScore >= 85).length,
    };

    // Get unique wallets
    const uniqueWallets = await prisma.wallet.count();

    return NextResponse.json<ApiResponse<{
      txsAnalyzed: number;
      warningsIssued: number;
      highRiskCount: number;
      blockedCount: number;
      uniqueWallets: number;
      riskDistribution: {
        low: number;
        medium: number;
        high: number;
        critical: number;
      };
    }>>(
      {
        success: true,
        data: {
          txsAnalyzed: totalAnalyzed,
          warningsIssued,
          highRiskCount,
          blockedCount: 0, // TODO: Track blocked transactions in future
          uniqueWallets,
          riskDistribution,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Metrics error:", error);
    return NextResponse.json<ApiResponse<never>>(
      {
        success: false,
        error: {
          error: "MetricsError",
          message: error instanceof Error ? error.message : "Unknown error",
        },
      },
      { status: 500 }
    );
  }
}
