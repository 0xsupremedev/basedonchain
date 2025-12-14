import { decodeTransaction } from "@/lib/txDecoder";
import type { TransactionInput } from "@/shared";

// Mock ethers provider
jest.mock("@/lib/ethers", () => ({
  getBaseProvider: jest.fn(),
  fetchTransaction: jest.fn(),
}));

describe("txDecoder", () => {
  it("should decode a simple ETH transfer", async () => {
    const input: TransactionInput = {
      to: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      value: "1000000000000000000", // 1 ETH
      calldata: "0x",
    };

    const result = await decodeTransaction(input);

    expect(result.to).toBe(input.to);
    expect(result.value).toBe(input.value);
    expect(result.humanReadable).toContain("Send");
    expect(result.isContractInteraction).toBe(false);
  });

  it("should decode ERC20 approve transaction", async () => {
    // Mock approve(address,uint256) with unlimited amount
    const input: TransactionInput = {
      to: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      calldata:
        "0x095ea7b3000000000000000000000000742d35cc6634c0532925a3b844bc9e7595f0bebffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    };

    const result = await decodeTransaction(input);

    expect(result.functionName).toBe("approve");
    expect(result.isContractInteraction).toBe(true);
    expect(result.humanReadable).toContain("Approve");
  });
});
