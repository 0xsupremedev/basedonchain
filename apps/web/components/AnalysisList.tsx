"use client";

import type { AnalysisResult } from "@/shared";
import { TxCard } from "./TxCard";

interface AnalysisListProps {
  analyses: AnalysisResult[];
}

export function AnalysisList({ analyses }: AnalysisListProps) {
  if (analyses.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400">No analyses yet. Analyze a transaction to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {analyses.map((analysis) => (
        <TxCard key={analysis.id} analysis={analysis} />
      ))}
    </div>
  );
}
