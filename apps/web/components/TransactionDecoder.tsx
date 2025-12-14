"use client";

import type { DecodedTransaction } from "@/shared";

interface TransactionDecoderProps {
  decodedTx: DecodedTransaction;
}

export function TransactionDecoder({ decodedTx }: TransactionDecoderProps) {
  return (
    <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
      <div>
        <h4 className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Transaction Summary
        </h4>
        <p className="text-sm text-gray-900 dark:text-gray-100">{decodedTx.humanReadable}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">To Address</p>
          <p className="break-all text-sm font-mono text-gray-900 dark:text-gray-100">
            {decodedTx.to}
          </p>
        </div>

        {decodedTx.value !== "0" && (
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Value</p>
            <p className="text-sm text-gray-900 dark:text-gray-100">{decodedTx.value} wei</p>
          </div>
        )}

        {decodedTx.functionName && (
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Function</p>
            <p className="text-sm font-mono text-gray-900 dark:text-gray-100">
              {decodedTx.functionName}
            </p>
          </div>
        )}

        {decodedTx.isContractInteraction && (
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Contract Interaction
            </p>
            <p className="text-sm text-gray-900 dark:text-gray-100">Yes</p>
          </div>
        )}
      </div>

      {decodedTx.functionArgs && Object.keys(decodedTx.functionArgs).length > 0 && (
        <div>
          <p className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
            Function Arguments
          </p>
          <div className="rounded bg-white p-2 dark:bg-gray-800">
            <pre className="overflow-x-auto text-xs text-gray-900 dark:text-gray-100">
              {JSON.stringify(decodedTx.functionArgs, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
