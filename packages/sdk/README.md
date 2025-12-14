# @basedonchain/sdk

JavaScript/TypeScript SDK for analyzing Base blockchain transactions with BasedOnchain.

## Installation

```bash
npm install @basedonchain/sdk
# or
pnpm add @basedonchain/sdk
# or
yarn add @basedonchain/sdk
```

## Usage

### Basic Analysis

```typescript
import { analyzeTx } from "@basedonchain/sdk";

const result = await analyzeTx("your-api-key", {
  txHash: "0x1234...",
  walletAddress: "0x5678...",
});

console.log(result.riskScore); // { score: 85, level: "critical", label: "Critical Risk" }
console.log(result.explanation); // AI-generated explanation
console.log(result.recommendations); // Array of recommendations
```

### Using the SDK Class

```typescript
import { BasedOnchainSDK } from "@basedonchain/sdk";

const sdk = new BasedOnchainSDK({
  apiKey: "your-api-key",
  baseUrl: "https://basedonchain.vercel.app", // optional
});

// Analyze transaction
const analysis = await sdk.analyzeTx({
  unsignedTx: {
    to: "0x...",
    data: "0x...",
    value: "0",
  },
  walletAddress: "0x...",
});

// Simulate transaction
const simulation = await sdk.simulateTx({
  calldata: "0x...",
  to: "0x...",
});

// Get wallet analyses
const analyses = await sdk.getAnalyses("0x...");
```

### Example: Analyzing an Approval Transaction

```typescript
import { BasedOnchainSDK } from "@basedonchain/sdk";

const sdk = new BasedOnchainSDK({ apiKey: "your-api-key" });

const result = await sdk.analyzeTx({
  calldata: "0x095ea7b3...", // approve function call
  to: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC token
  walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
});

if (result.riskScore.level === "critical" || result.riskScore.level === "high") {
  console.warn("⚠️ High risk transaction detected!");
  console.log(result.explanation);
  console.log("Recommendations:", result.recommendations);
}
```

## API Reference

### `analyzeTx(apiKey, options, baseUrl?)`

Analyze a transaction and get risk assessment.

**Parameters:**
- `apiKey` (string): Your API key
- `options` (AnalyzeOptions): Transaction data
- `baseUrl` (string, optional): API base URL

**Returns:** `Promise<AnalysisResult>`

### `BasedOnchainSDK`

Main SDK class.

**Constructor:**
```typescript
new BasedOnchainSDK(config: {
  apiKey: string;
  baseUrl?: string;
})
```

**Methods:**
- `analyzeTx(options): Promise<AnalysisResult>`
- `simulateTx(options): Promise<SimulationResult>`
- `getAnalyses(walletAddress): Promise<AnalysisResult[]>`

## Error Handling

The SDK throws errors for API failures:

```typescript
try {
  const result = await analyzeTx("api-key", { txHash: "0x..." });
} catch (error) {
  if (error instanceof Error) {
    console.error("Analysis failed:", error.message);
  }
}
```

### Webhook Support (Coming in Milestone C)

Register a webhook to receive async analysis results:

```typescript
// Register webhook
const { webhookId } = await sdk.registerWebhook("https://your-app.com/webhook");

// Analyze with webhook callback
const analysis = await sdk.analyzeTxWithWebhook({
  txHash: "0x...",
  webhookId, // Results will be sent to registered webhook URL
});
```

**Note**: Webhook endpoints are planned for Milestone C. The SDK interface is ready for future implementation.

## License

MIT
