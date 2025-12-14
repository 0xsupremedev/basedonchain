import {
  checkUnlimitedApproval,
  checkValueTransfer,
  calculateRiskScoreFromHeuristics,
} from "@/lib/riskEngine/heuristics";
import type { DecodedTransaction } from "@/shared";
import { ethers } from "ethers";

describe("heuristics", () => {
  describe("checkUnlimitedApproval", () => {
    it("should detect unlimited approval", () => {
      const decodedTx: DecodedTransaction = {
        to: "0x123",
        value: "0",
        data: "0x",
        functionName: "approve",
        functionArgs: {
          spender: "0x456",
          amount: ethers.MaxUint256.toString(),
        },
        humanReadable: "Approve unlimited tokens",
        isContractInteraction: true,
      };

      const result = checkUnlimitedApproval(decodedTx);

      expect(result.passed).toBe(false);
      expect(result.severity).toBe("critical");
      expect(result.message).toContain("unlimited");
    });

    it("should pass for limited approval", () => {
      const decodedTx: DecodedTransaction = {
        to: "0x123",
        value: "0",
        data: "0x",
        functionName: "approve",
        functionArgs: {
          spender: "0x456",
          amount: ethers.parseEther("100").toString(),
        },
        humanReadable: "Approve 100 tokens",
        isContractInteraction: true,
      };

      const result = checkUnlimitedApproval(decodedTx);

      expect(result.passed).toBe(true);
      expect(result.severity).toBe("low");
    });
  });

  describe("checkValueTransfer", () => {
    it("should flag high value transfers", () => {
      const decodedTx: DecodedTransaction = {
        to: "0x123",
        value: ethers.parseEther("10").toString(),
        data: "0x",
        humanReadable: "Send 10 ETH",
        isContractInteraction: false,
      };

      const result = checkValueTransfer(decodedTx, ethers.parseEther("1"));

      expect(result.passed).toBe(false);
      expect(result.severity).toBe("high");
    });
  });

  describe("calculateRiskScoreFromHeuristics", () => {
    it("should calculate critical risk for multiple critical issues", () => {
      const results = [
        {
          passed: false,
          severity: "critical" as const,
          message: "Test",
        },
        {
          passed: false,
          severity: "critical" as const,
          message: "Test 2",
        },
      ];

      const { score, level } = calculateRiskScoreFromHeuristics(results);

      expect(score).toBeGreaterThanOrEqual(85);
      expect(level).toBe("critical");
    });

    it("should calculate low risk for passed checks", () => {
      const results = [
        {
          passed: true,
          severity: "low" as const,
          message: "Test",
        },
      ];

      const { score, level } = calculateRiskScoreFromHeuristics(results);

      expect(score).toBeLessThan(30);
      expect(level).toBe("low");
    });
  });
});
