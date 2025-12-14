import OpenAI from "openai";
import type { RiskScore, DecodedTransaction, HeuristicResult } from "@/shared";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate risk explanation using OpenAI
 */
export async function generateRiskExplanation(
  decodedTx: DecodedTransaction,
  heuristicResults: HeuristicResult[],
  riskScore: RiskScore
): Promise<{ explanation: string; recommendations: string[] }> {
  if (!process.env.OPENAI_API_KEY) {
    // Fallback explanation if OpenAI is not configured
    return {
      explanation: generateFallbackExplanation(riskScore, heuristicResults),
      recommendations: generateFallbackRecommendations(riskScore),
    };
  }

  try {
    const prompt = buildAnalysisPrompt(decodedTx, heuristicResults, riskScore);

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content:
            "You are a blockchain security expert analyzing Ethereum transactions. Provide clear, concise explanations of transaction risks and actionable recommendations. Always prioritize user safety.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content || "";
    const { explanation, recommendations } = parseAIResponse(content);

    return {
      explanation: sanitizeAIOutput(explanation),
      recommendations: recommendations.map(sanitizeAIOutput),
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    // Fallback to heuristic-based explanation
    return {
      explanation: generateFallbackExplanation(riskScore, heuristicResults),
      recommendations: generateFallbackRecommendations(riskScore),
    };
  }
}

/**
 * Build the analysis prompt for OpenAI
 */
function buildAnalysisPrompt(
  decodedTx: DecodedTransaction,
  heuristicResults: HeuristicResult[],
  riskScore: RiskScore
): string {
  const failedHeuristics = heuristicResults.filter((h) => !h.passed);

  return `Analyze this blockchain transaction and provide a security assessment.

Transaction Details:
- To: ${decodedTx.to}
- Value: ${decodedTx.value} wei
- Function: ${decodedTx.functionName || "Unknown"}
- Human-readable: ${decodedTx.humanReadable}

Risk Score: ${riskScore.score}/100 (${riskScore.level})

Security Concerns Detected:
${failedHeuristics.map((h, i) => `${i + 1}. ${h.message} (Severity: ${h.severity})`).join("\n")}

Provide:
1. A clear explanation of the risks (2-3 sentences)
2. Three specific recommendations for the user

Format your response as:
EXPLANATION: [your explanation]
RECOMMENDATIONS:
1. [recommendation 1]
2. [recommendation 2]
3. [recommendation 3]`;
}

/**
 * Parse AI response into structured format
 */
function parseAIResponse(content: string): {
  explanation: string;
  recommendations: string[];
} {
  const explanationMatch = content.match(/EXPLANATION:\s*(.+?)(?=RECOMMENDATIONS:|$)/s);
  const explanation = explanationMatch
    ? explanationMatch[1].trim()
    : "Unable to generate explanation. Please review the transaction carefully.";

  const recommendationsMatch = content.match(/RECOMMENDATIONS:\s*([\s\S]+)/);
  const recommendationsText = recommendationsMatch ? recommendationsMatch[1] : "";

  // Extract numbered recommendations
  const recommendations = recommendationsText
    .split(/\d+\.\s*/)
    .filter((rec) => rec.trim())
    .slice(0, 3)
    .map((rec) => rec.trim())
    .filter(Boolean);

  // If no recommendations found, use fallback
  if (recommendations.length === 0) {
    return {
      explanation,
      recommendations: generateFallbackRecommendations({
        score: 50,
        level: "medium",
        label: "Caution",
      }),
    };
  }

  return { explanation, recommendations };
}

/**
 * Sanitize AI output to prevent XSS and hallucinations
 */
function sanitizeAIOutput(text: string): string {
  // Remove any script tags
  let sanitized = text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

  // Remove any HTML tags (keep plain text)
  sanitized = sanitized.replace(/<[^>]+>/g, "");

  // Limit length
  if (sanitized.length > 1000) {
    sanitized = sanitized.substring(0, 1000) + "...";
  }

  return sanitized.trim();
}

/**
 * Generate fallback explanation when AI is unavailable
 */
function generateFallbackExplanation(
  riskScore: RiskScore,
  heuristicResults: HeuristicResult[]
): string {
  const failedHeuristics = heuristicResults.filter((h) => !h.passed);

  if (failedHeuristics.length === 0) {
    return "This transaction appears to be low risk based on automated checks.";
  }

  const concerns = failedHeuristics.map((h) => h.message).join(". ");

  if (riskScore.level === "critical") {
    return `CRITICAL RISK: This transaction has multiple security concerns: ${concerns}. We strongly recommend against proceeding.`;
  } else if (riskScore.level === "high") {
    return `HIGH RISK: This transaction has security concerns: ${concerns}. Please review carefully before proceeding.`;
  } else if (riskScore.level === "medium") {
    return `MODERATE RISK: This transaction has some concerns: ${concerns}. Please verify the details before proceeding.`;
  } else {
    return `This transaction appears relatively safe, but note: ${concerns}.`;
  }
}

/**
 * Generate fallback recommendations
 */
function generateFallbackRecommendations(riskScore: RiskScore): string[] {
  if (riskScore.level === "critical" || riskScore.level === "high") {
    return [
      "Do not sign this transaction",
      "Verify the contract address is legitimate",
      "Contact support if you're unsure",
    ];
  } else if (riskScore.level === "medium") {
    return [
      "Review all transaction details carefully",
      "Verify the receiving address is correct",
      "Consider starting with a small test amount",
    ];
  } else {
    return [
      "Verify the transaction details match your expectations",
      "Double-check the recipient address",
      "Ensure you trust the contract you're interacting with",
    ];
  }
}
