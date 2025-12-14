"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { AnalysisList } from "@/components/AnalysisList";
import type { AnalysisResult } from "@/shared";

export default function DashboardPage() {
  const { address } = useAccount();
  const [analyses, setAnalyses] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAnalyzed: 0,
    warningsIssued: 0,
    highRiskCount: 0,
  });

  useEffect(() => {
    if (!address) {
      setLoading(false);
      return;
    }

    // Fetch analyses for connected wallet
    // For MVP, we'll fetch from localStorage or could call an API endpoint
    fetchAnalyses();
  }, [address]);

  const fetchAnalyses = async () => {
    if (!address) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/analyses?walletAddress=${address}`);
      const data = await response.json();

      if (data.success && data.data) {
        setAnalyses(data.data);

        // Calculate stats
        setStats({
          totalAnalyzed: data.data.length,
          warningsIssued: data.data.filter((a: AnalysisResult) => a.riskScore.score >= 30).length,
          highRiskCount: data.data.filter(
            (a: AnalysisResult) =>
              a.riskScore.level === "high" || a.riskScore.level === "critical"
          ).length,
        });
      }
    } catch (error) {
      console.error("Error fetching analyses:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!address) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please connect your wallet to view your transaction analyses.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Analyzed
            </p>
            <p className="mt-2 text-3xl font-bold">{stats.totalAnalyzed}</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Warnings Issued
            </p>
            <p className="mt-2 text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              {stats.warningsIssued}
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              High Risk Transactions
            </p>
            <p className="mt-2 text-3xl font-bold text-red-600 dark:text-red-400">
              {stats.highRiskCount}
            </p>
          </div>
        </div>

        {/* Wallet Address */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Wallet Address</p>
          <p className="mt-1 font-mono text-sm">{address}</p>
        </div>

        {/* Analyses List */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">Recent Analyses</h2>
          {loading ? (
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          ) : (
            <AnalysisList analyses={analyses} />
          )}
        </div>
      </div>
    </main>
  );
}
