# BasedOnchain API Documentation

## Overview

BasedOnchain provides a REST API for analyzing blockchain transactions and assessing risk. All endpoints are rate-limited to 10 requests per minute per IP address.

## Base URL

```
https://basedonchain.vercel.app/api
```

## Authentication

Currently, the API does not require authentication for MVP. Rate limiting is applied per IP address.

## Endpoints

### POST /api/analyze

Analyzes a transaction and returns a risk assessment.

#### Request Body

The request body accepts one of the following formats:

**Option 1: Transaction Hash**
```json
{
  "txHash": "0x...",
  "walletAddress": "0x..." // optional
}
```

**Option 2: Unsigned Transaction**
```json
{
  "unsignedTx": {
    "to": "0x...",
    "data": "0x...",
    "value": "0", // optional, in wei
    "gasLimit": "21000", // optional
    "gasPrice": "20000000000" // optional
  },
  "walletAddress": "0x..." // optional
}
```

**Option 3: Calldata**
```json
{
  "calldata": "0x...",
  "to": "0x...",
  "value": "0", // optional, in wei
  "walletAddress": "0x..." // optional
}
```

#### Response

**Success (200 OK)**
```json
{
  "success": true,
  "data": {
    "id": "clx...",
    "walletId": "clx...",
    "txHash": "0x...",
    "inputData": { ... },
    "riskScore": {
      "score": 85,
      "level": "critical",
      "label": "Critical Risk"
    },
    "explanation": "This transaction has critical security concerns...",
    "recommendations": [
      "Do not sign this transaction",
      "Verify the contract address",
      "Contact support if unsure"
    ],
    "decodedTx": {
      "to": "0x...",
      "value": "0",
      "data": "0x...",
      "functionName": "approve",
      "functionArgs": { ... },
      "humanReadable": "Approve unlimited tokens for 0x...",
      "isContractInteraction": true
    },
    "simulationResult": {
      "success": true,
      "valueAtRisk": "Unlimited (check token balance)"
    },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error (400 Bad Request)**
```json
{
  "success": false,
  "error": {
    "error": "ValidationError",
    "message": "Invalid request format"
  }
}
```

**Error (429 Too Many Requests)**
```json
{
  "success": false,
  "error": {
    "error": "RateLimitExceeded",
    "message": "Too many requests. Please try again later.",
    "code": "429"
  }
}
```

**Error (500 Internal Server Error)**
```json
{
  "success": false,
  "error": {
    "error": "AnalysisError",
    "message": "Error message here"
  }
}
```

## Risk Score Levels

- **0-29**: Low Risk (Safe)
- **30-59**: Medium Risk (Caution)
- **60-84**: High Risk (Risky)
- **85-100**: Critical Risk (Dangerous)

## Rate Limits

- **Limit**: 10 requests per minute per IP address
- **Headers**: Rate limit information is not currently included in response headers

## Examples

### Analyze Transaction Hash

```bash
curl -X POST https://basedonchain.vercel.app/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  }'
```

### Analyze Calldata

```bash
curl -X POST https://basedonchain.vercel.app/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "calldata": "0x095ea7b3000000000000000000000000742d35cc6634c0532925a3b844bc9e7595f0bebffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    "to": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
  }'
```

### GET /api/health

Health check endpoint for monitoring and uptime checks.

**Response (200 OK)**
```json
{
  "status": "ok",
  "uptime": 3600,
  "version": "0.1.0",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### POST /api/simulate

Simulate a transaction without storing the analysis. Returns state changes and value at risk.

**Request Body**
```json
{
  "txHash": "0x...",
  "walletAddress": "0x..." // optional
}
```

Or:
```json
{
  "calldata": "0x...",
  "to": "0x...",
  "value": "0",
  "walletAddress": "0x..." // optional
}
```

**Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "success": true,
    "valueAtRisk": "1200.5",
    "stateDiffs": []
  }
}
```

### GET /api/metrics

Get KPIs and analytics data for grant submission and dashboard.

**Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "txsAnalyzed": 123,
    "warningsIssued": 12,
    "highRiskCount": 3,
    "blockedCount": 0,
    "uniqueWallets": 45,
    "riskDistribution": {
      "low": 80,
      "medium": 30,
      "high": 10,
      "critical": 3
    }
  }
}
```

### GET /api/analyses

Get list of analyses for a wallet address.

**Query Parameters**
- `walletAddress` (required): Wallet address to fetch analyses for
- `limit` (optional): Number of results (default: 100)
- `offset` (optional): Pagination offset

**Example**
```bash
curl "https://basedonchain.vercel.app/api/analyses?walletAddress=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb&limit=20"
```

**Response (200 OK)**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx...",
      "txHash": "0x...",
      "riskScore": {
        "score": 85,
        "level": "critical",
        "label": "Critical Risk"
      },
      "explanation": "...",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### GET /api/approvals/:walletAddress

Get ERC20 token approvals for a wallet address.

**Note**: Full implementation requires event indexing. This endpoint returns the structure ready for integration with an event indexer.

**Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "walletAddress": "0x...",
    "approvals": [
      {
        "token": "0x...",
        "tokenSymbol": "USDC",
        "spender": "0x...",
        "allowance": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
        "allowanceFormatted": "Unlimited",
        "riskFlag": true
      }
    ],
    "note": "Full approval scanning requires event indexing. This endpoint structure is ready for implementation with an event indexer."
  }
}
```

### POST /api/revoke/prepare

Prepare an unsigned transaction to revoke a token approval (sets allowance to 0).

**Request Body**
```json
{
  "tokenAddress": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  "spender": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "owner": "0x..."
}
```

**Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "to": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "data": "0x095ea7b3000000000000000000000000742d35cc6634c0532925a3b844bc9e7595f0beb0000000000000000000000000000000000000000000000000000000000000000",
    "value": "0",
    "note": "Sign this transaction with your wallet to revoke the approval. This sets the allowance to 0."
  }
}
```

## SDK Usage

See [packages/sdk/README.md](../packages/sdk/README.md) for JavaScript/TypeScript SDK usage examples.
