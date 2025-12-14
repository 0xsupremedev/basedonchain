"use client";

import type { RiskLevel } from "@/shared";

interface RiskBadgeProps {
  level: RiskLevel;
  score: number;
  className?: string;
}

const riskColors = {
  low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  critical: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const riskLabels = {
  low: "Low Risk",
  medium: "Medium Risk",
  high: "High Risk",
  critical: "Critical Risk",
};

export function RiskBadge({ level, score, className = "" }: RiskBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold ${riskColors[level]} ${className}`}
    >
      <span>{riskLabels[level]}</span>
      <span className="text-xs opacity-75">({score}/100)</span>
    </div>
  );
}
