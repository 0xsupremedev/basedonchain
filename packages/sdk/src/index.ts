/**
 * BasedOnchain SDK
 * JavaScript/TypeScript SDK for analyzing Base transactions
 */

import type { AnalysisResult, ApiResponse, TransactionInput } from "../../shared/index";

// Note: Webhook functionality requires API endpoint implementation (planned for Milestone C)
// These methods provide the SDK interface for future webhook support

export interface AnalyzeOptions {
  txHash?: string;
  unsignedTx?: {
    to: string;
    data: string;
    value?: string;
    gasLimit?: string;
    gasPrice?: string;
  };
  calldata?: string;
  to?: string;
  value?: string;
  walletAddress?: string;
  chainId?: number;
}

export interface SDKConfig {
  apiKey: string;
  baseUrl?: string;
}

export class BasedOnchainSDK {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: SDKConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || "https://basedonchain.vercel.app";
  }

  /**
   * Generate a random secret for webhook
   */
  private generateSecret(): string {
    // Generate a random secret
    // Use crypto.randomUUID if available (Node.js 14.17+, modern browsers)
    if (typeof globalThis !== "undefined" && globalThis.crypto && globalThis.crypto.randomUUID) {
      return globalThis.crypto.randomUUID();
    }
    // Fallback for environments without randomUUID
    const randomBytes = new Uint8Array(16);
    if (typeof globalThis !== "undefined" && globalThis.crypto && globalThis.crypto.getRandomValues) {
      globalThis.crypto.getRandomValues(randomBytes);
    } else {
      // Final fallback - generate pseudo-random (not cryptographically secure)
      for (let i = 0; i < randomBytes.length; i++) {
        randomBytes[i] = Math.floor(Math.random() * 256);
      }
    }
    return Array.from(randomBytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  /**
   * Analyze a transaction
   */
  async analyzeTx(options: AnalyzeOptions): Promise<AnalysisResult> {
    const response = await fetch(`${this.baseUrl}/api/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        error.error?.message || `API request failed: ${response.statusText}`
      );
    }

    const data: ApiResponse<AnalysisResult> = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.error?.message || "Analysis failed");
    }

    return data.data;
  }

  /**
   * Simulate a transaction
   */
  async simulateTx(options: AnalyzeOptions): Promise<{
    success: boolean;
    valueAtRisk?: string;
    stateDiffs?: Array<unknown>;
    error?: string;
  }> {
    const response = await fetch(`${this.baseUrl}/api/simulate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        error.error?.message || `API request failed: ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.error?.message || "Simulation failed");
    }

    return data.data;
  }

  /**
   * Get analyses for a wallet
   */
  async getAnalyses(walletAddress: string): Promise<AnalysisResult[]> {
    const response = await fetch(
      `${this.baseUrl}/api/analyses?walletAddress=${walletAddress}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        error.error?.message || `API request failed: ${response.statusText}`
      );
    }

    const data: ApiResponse<AnalysisResult[]> = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.error?.message || "Failed to fetch analyses");
    }

    return data.data;
  }

  /**
   * Register a webhook URL for async analysis results
   * Note: This requires webhook endpoint implementation (Milestone C)
   */
  async registerWebhook(webhookUrl: string, secret?: string): Promise<{ webhookId: string }> {
    const response = await fetch(`${this.baseUrl}/api/sdk/webhook/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        webhookUrl,
        secret: secret || this.generateSecret(), // Generate secret if not provided
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        error.error?.message || `Webhook registration failed: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.data;
  }

  /**
   * Analyze transaction with webhook callback
   * If webhookId is provided, results will be sent to registered webhook URL
   */
  async analyzeTxWithWebhook(
    options: AnalyzeOptions & { webhookId?: string }
  ): Promise<AnalysisResult> {
    const response = await fetch(`${this.baseUrl}/api/sdk/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        error.error?.message || `API request failed: ${response.statusText}`
      );
    }

    const data: ApiResponse<AnalysisResult> = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.error?.message || "Analysis failed");
    }

    return data.data;
  }
}

/**
 * Convenience function for one-off analysis
 */
export async function analyzeTx(
  apiKey: string,
  options: AnalyzeOptions,
  baseUrl?: string
): Promise<AnalysisResult> {
  const sdk = new BasedOnchainSDK({ apiKey, baseUrl });
  return sdk.analyzeTx(options);
}

// Export types
export type { AnalysisResult, ApiResponse, TransactionInput } from "../../shared/index";
