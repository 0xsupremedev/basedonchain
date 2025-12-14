"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { TxCard } from "@/components/TxCard";
import type { AnalysisResult, ApiResponse } from "@/shared";

export default function AnalyzePage() {
  const [txInput, setTxInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();

  const handleAnalyze = async () => {
    if (!txInput.trim()) {
      setError("Please enter a transaction hash, calldata, or transaction data");
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      // Try to determine input type
      let requestBody: unknown;

      if (txInput.startsWith("0x") && txInput.length === 66) {
        // Likely a transaction hash
        requestBody = { txHash: txInput, walletAddress: address };
      } else if (txInput.includes("{") || txInput.includes("to")) {
        // Try to parse as JSON (unsigned tx)
        try {
          requestBody = { unsignedTx: JSON.parse(txInput), walletAddress: address };
        } catch {
          requestBody = { calldata: txInput, walletAddress: address };
        }
      } else {
        // Treat as calldata
        requestBody = { calldata: txInput, walletAddress: address };
      }

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data: ApiResponse<AnalysisResult> = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error?.message || "Analysis failed");
      }

      if (data.data) {
        setAnalysis(data.data);
        
        // Store in localStorage for dashboard (client-side backup)
        if (address) {
          const stored = localStorage.getItem(`analyses_${address}`);
          const analyses = stored ? JSON.parse(stored) : [];
          analyses.unshift(data.data); // Add to beginning
          localStorage.setItem(`analyses_${address}`, JSON.stringify(analyses.slice(0, 100))); // Keep last 100
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold">Analyze Transaction</h1>

        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <label htmlFor="tx-input" className="mb-2 block font-medium">
            Transaction Input
          </label>
          <textarea
            id="tx-input"
            value={txInput}
            onChange={(e) => setTxInput(e.target.value)}
            placeholder="Enter transaction hash (0x...), calldata, or JSON transaction object"
            className="w-full rounded-lg border border-gray-300 p-3 font-mono text-sm dark:border-gray-600 dark:bg-gray-900"
            rows={6}
          />
          <p className="mt-2 text-sm text-gray-500">
            You can paste a transaction hash, raw calldata, or an unsigned transaction object.
          </p>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-4 rounded-lg bg-base-blue px-6 py-2 font-semibold text-white hover:bg-base-blue-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Analyzing..." : "Analyze Transaction"}
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-900 dark:text-red-200">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {analysis && <TxCard analysis={analysis} />}
      </div>
    </main>
  );
}
