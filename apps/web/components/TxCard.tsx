"use client";

import type { AnalysisResult } from "@/shared";
import { RiskBadge } from "./RiskBadge";
import { TransactionDecoder } from "./TransactionDecoder";

interface TxCardProps {
  analysis: AnalysisResult;
}

export function TxCard({ analysis }: TxCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Transaction Analysis</h3>
        <RiskBadge level={analysis.riskScore.level} score={analysis.riskScore.score} />
      </div>

      <div className="mb-4">
        <TransactionDecoder decodedTx={analysis.decodedTx} />
      </div>

      <div className="mb-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
        <h4 className="mb-2 font-medium text-gray-900 dark:text-gray-100">Risk Explanation</h4>
        <p className="text-sm text-gray-700 dark:text-gray-300">{analysis.explanation}</p>
      </div>

      {analysis.recommendations.length > 0 && (
        <div className="mb-4">
          <h4 className="mb-2 font-medium text-gray-900 dark:text-gray-100">Recommendations</h4>
          <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {analysis.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}

      {analysis.simulationResult?.valueAtRisk && (
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
            Value at Risk: {analysis.simulationResult.valueAtRisk}
          </p>
        </div>
      )}

      {analysis.txHash && (
        <div className="mt-4 text-xs text-gray-500">
          <a
            href={`https://basescan.org/tx/${analysis.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            View on BaseScan
          </a>
        </div>
      )}
    </div>
  );
}
