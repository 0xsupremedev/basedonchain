/**
 * Shared types and utilities for BasedOnchain
 */

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type RiskLabel =
  | "Safe"
  | "Caution"
  | "Risky"
  | "Dangerous"
  | "Critical Risk";

export interface RiskScore {
  score: number; // 0-100
  level: RiskLevel;
  label: RiskLabel;
}

export interface TransactionInput {
  txHash?: string;
  unsignedTx?: {
    to: string;
    data: string;
    value: string;
    gasLimit?: string;
    gasPrice?: string;
  };
  calldata?: string;
  to?: string;
  value?: string;
}

export interface DecodedTransaction {
  to: string;
  value: string;
  data: string;
  functionName?: string;
  functionArgs?: Record<string, unknown>;
  humanReadable: string;
  isContractInteraction: boolean;
}

export interface AnalysisResult {
  id: string;
  walletId?: string;
  txHash?: string;
  inputData: TransactionInput;
  riskScore: RiskScore;
  explanation: string;
  recommendations: string[];
  decodedTx: DecodedTransaction;
  simulationResult?: SimulationResult;
  createdAt: string;
}

export interface SimulationResult {
  success: boolean;
  stateChanges?: Array<{
    address: string;
    type: "balance" | "storage" | "code";
    before: string;
    after: string;
  }>;
  valueAtRisk?: string;
  error?: string;
}

export interface HeuristicResult {
  passed: boolean;
  severity: RiskLevel;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiError {
  error: string;
  message: string;
  code?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}
