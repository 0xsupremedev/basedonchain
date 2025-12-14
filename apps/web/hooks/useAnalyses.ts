"use client";

import { useState, useEffect } from "react";
import type { AnalysisResult } from "@/shared";

export function useAnalyses(walletAddress?: string) {
  const [analyses, setAnalyses] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!walletAddress) {
      setAnalyses([]);
      return;
    }

    // Load from localStorage (client-side storage for MVP)
    // In production, this would fetch from an API endpoint
    const stored = localStorage.getItem(`analyses_${walletAddress}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AnalysisResult[];
        setAnalyses(parsed);
      } catch (err) {
        console.error("Error parsing stored analyses:", err);
        setAnalyses([]);
      }
    }
  }, [walletAddress]);

  const addAnalysis = (analysis: AnalysisResult) => {
    if (!walletAddress) return;

    const updated = [analysis, ...analyses];
    setAnalyses(updated);

    // Store in localStorage
    localStorage.setItem(`analyses_${walletAddress}`, JSON.stringify(updated));
  };

  return {
    analyses,
    loading,
    error,
    addAnalysis,
  };
}
