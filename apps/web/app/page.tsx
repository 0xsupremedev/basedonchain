import Link from "next/link";
import { WalletConnect } from "@/components/WalletConnect";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900 dark:text-white">
            BasedOnchain
          </h1>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
            AI-powered onchain copilot for Base that simulates, explains, and blocks risky
            transactions before you sign
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/analyze"
              className="rounded-lg bg-base-blue px-6 py-3 font-semibold text-white hover:bg-base-blue-dark transition-colors"
            >
              Analyze Transaction
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>

        {/* Wallet Connect Section */}
        <div className="mb-16 flex justify-center">
          <WalletConnect />
        </div>

        {/* Features Section */}
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 text-3xl">🔍</div>
            <h3 className="mb-2 text-xl font-semibold">Transaction Decoder</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Decode complex transactions into human-readable summaries. Understand exactly what
              you're signing.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 text-3xl">🤖</div>
            <h3 className="mb-2 text-xl font-semibold">AI Risk Scoring</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get AI-powered risk assessments with clear explanations and actionable
              recommendations.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 text-3xl">⚡</div>
            <h3 className="mb-2 text-xl font-semibold">Pre-Sign Simulation</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Simulate transactions before signing to see potential state changes and value at risk.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16 rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-6 text-2xl font-bold">How It Works</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-base-blue text-white font-semibold">
                1
              </span>
              <div>
                <h4 className="font-semibold">Connect Your Wallet</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Connect MetaMask, Coinbase Wallet, or any compatible wallet on Base network.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-base-blue text-white font-semibold">
                2
              </span>
              <div>
                <h4 className="font-semibold">Submit Transaction</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Paste a transaction hash, calldata, or unsigned transaction to analyze.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-base-blue text-white font-semibold">
                3
              </span>
              <div>
                <h4 className="font-semibold">Get Risk Assessment</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Receive an instant risk score, explanation, and recommendations before signing.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </main>
  );
}
