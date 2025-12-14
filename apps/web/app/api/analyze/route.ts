import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { decodeTransaction } from "@/lib/txDecoder";
import { runAllHeuristics, calculateRiskScoreFromHeuristics } from "@/lib/riskEngine/heuristics";
import { simulateTransaction, estimateValueAtRisk } from "@/lib/riskEngine/simulation";
import { generateRiskExplanation } from "@/lib/ai";
import { getBaseProvider } from "@/lib/ethers";
import type { AnalysisResult, RiskScore, TransactionInput, ApiResponse } from "@/shared";

const prisma = new PrismaClient();

// Rate limiting store (in production, use Redis or Upstash)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Request schema validation
const analyzeRequestSchema = z.object({
  txHash: z.string().optional(),
  unsignedTx: z
    .object({
      to: z.string(),
      data: z.string(),
      value: z.string().optional(),
      gasLimit: z.string().optional(),
      gasPrice: z.string().optional(),
    })
    .optional(),
  calldata: z.string().optional(),
  to: z.string().optional(),
  value: z.string().optional(),
  walletAddress: z.string().optional(),
});

/**
 * Simple rate limiting (10 requests per minute per IP)
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitStore.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + 60 * 1000 });
    return true;
  }

  if (limit.count >= 10) {
    return false;
  }

  limit.count++;
  return true;
}

/**
 * POST /api/analyze
 * Analyzes a transaction and returns risk assessment
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json<ApiResponse<never>>(
        {
          success: false,
          error: {
            error: "RateLimitExceeded",
            message: "Too many requests. Please try again later.",
            code: "429",
          },
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = analyzeRequestSchema.safeParse(body);

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

    const input: TransactionInput = validationResult.data;

    // Decode transaction
    const provider = getBaseProvider();
    const decodedTx = await decodeTransaction(input, provider);

    // Run heuristics
    const heuristicResults = runAllHeuristics(decodedTx);

    // Calculate risk score from heuristics
    const heuristicRisk = calculateRiskScoreFromHeuristics(heuristicResults);

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

    // Determine final risk score
    const riskScore: RiskScore = {
      score: heuristicRisk.score,
      level: heuristicRisk.level,
      label: getRiskLabel(heuristicRisk.score),
    };

    // Generate AI explanation
    const { explanation, recommendations } = await generateRiskExplanation(
      decodedTx,
      heuristicResults,
      riskScore
    );

    // Store or get wallet
    let walletId: string | undefined;
    if (validationResult.data.walletAddress) {
      const wallet = await prisma.wallet.upsert({
        where: { address: validationResult.data.walletAddress.toLowerCase() },
        update: {},
        create: {
          address: validationResult.data.walletAddress.toLowerCase(),
        },
      });
      walletId = wallet.id;
    }

    // Store analysis in database
    const analysis = await prisma.analysis.create({
      data: {
        walletId,
        txHash: input.txHash,
        inputData: input as unknown as object,
        riskScore: riskScore.score,
        label: riskScore.label,
        explanation,
        recommendations: recommendations as unknown as object,
        decodedTx: decodedTx as unknown as object,
        simulationResult: {
          ...simulationResult,
          valueAtRisk,
        } as unknown as object,
      },
    });

    // Metrics tracking (for future instrumentation)
    // In production, use Prometheus, StatsD, or Vercel Analytics
    // For now, metrics are tracked via database queries in /api/metrics
    // TODO: Add metrics export (analyze_requests_total, risk_score_histogram)

    // Build response
    const result: AnalysisResult = {
      id: analysis.id,
      walletId: analysis.walletId || undefined,
      txHash: analysis.txHash || undefined,
      inputData: input,
      riskScore,
      explanation,
      recommendations,
      decodedTx,
      simulationResult: {
        ...simulationResult,
        valueAtRisk,
      },
      createdAt: analysis.createdAt.toISOString(),
    };

    return NextResponse.json<ApiResponse<AnalysisResult>>(
      {
        success: true,
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Analysis error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json<ApiResponse<never>>(
      {
        success: false,
        error: {
          error: "AnalysisError",
          message: errorMessage,
        },
      },
      { status: 500 }
    );
  }
}

/**
 * Get risk label from score
 */
function getRiskLabel(score: number): "Safe" | "Caution" | "Risky" | "Dangerous" | "Critical Risk" {
  if (score >= 85) return "Critical Risk";
  if (score >= 60) return "Dangerous";
  if (score >= 30) return "Risky";
  if (score >= 10) return "Caution";
  return "Safe";
}
