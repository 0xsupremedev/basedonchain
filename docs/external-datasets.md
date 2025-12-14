# External Dataset Integration Planning

## Overview

BasedOnchain will integrate with external security databases and reputation systems to enhance our risk detection capabilities. These integrations provide real-time threat intelligence and contract reputation data.

## Planned Integrations

### 1. Webacy/Trugard Dataset

**Source**: Webacy's "The Risks are Real" report and Trugard's contract vulnerability dataset

**Data Available**:
- 34,000+ identified vulnerabilities on Base
- Hidden mint functions
- Unauthorized burn functions
- Balance update vulnerabilities
- Pausable contracts with malicious logic
- Secret owner functions

**Integration Plan**:
1. **Initial Phase (Milestone C)**:
   - Download and parse Trugard dataset
   - Import contract addresses and vulnerability types
   - Create `ContractVulnerability` model in database
   - Query against this database during analysis

2. **Automated Updates**:
   - Periodic crawler to check for new vulnerabilities
   - Webhook integration (if Webacy provides)
   - Community contributions via reporting UI

**Database Schema**:
```prisma
model ContractVulnerability {
  id          String   @id @default(cuid())
  address     String   @unique
  chainId     Int      @default(8453) // Base
  vulnerabilityType   String   // "hidden_mint", "unauthorized_burn", etc.
  severity    String   // "low", "medium", "high", "critical"
  description String?
  source      String   // "webacy", "trugard", "community"
  verified    Boolean  @default(false)
  reportedAt  DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**Usage in Risk Engine**:
```typescript
async function checkContractVulnerabilities(
  address: string
): Promise<HeuristicResult> {
  const vulnerability = await prisma.contractVulnerability.findUnique({
    where: { address: address.toLowerCase() }
  });
  
  if (vulnerability) {
    return {
      passed: false,
      severity: vulnerability.severity as RiskLevel,
      message: `Contract has known vulnerability: ${vulnerability.vulnerabilityType}`,
      details: { vulnerability }
    };
  }
  
  return { passed: true, severity: "low", message: "No known vulnerabilities" };
}
```

### 2. BlockSec Phishing Database

**Source**: BlockSec's Phishing Contract Database

**Statistics**:
- ~37,654 phishing contracts (Dec 2022–Jan 2025)
- ~$190.7M in losses tracked
- Regular updates with new phishing patterns

**Integration Plan**:
1. **Initial Phase (Milestone C)**:
   - Access BlockSec API or database (if available)
   - Import phishing contract addresses
   - Create `PhishingContract` model
   - Real-time lookup during transaction analysis

2. **Pattern Recognition**:
   - Learn common phishing patterns
   - Detect similar contract code
   - Community reporting integration

**Database Schema**:
```prisma
model PhishingContract {
  id          String   @id @default(cuid())
  address     String   @unique
  chainId     Int      @default(8453)
  reportedAt  DateTime
  verified    Boolean  @default(false)
  lossAmount  String?  // Total losses in USD
  description String?
  source      String   @default("blocksec")
  tags        String[] // ["fake_airdrop", "phishing", "drainer"]
}
```

**API Integration** (if available):
```typescript
async function checkPhishingContract(address: string): Promise<boolean> {
  // Option 1: Local database lookup
  const phishing = await prisma.phishingContract.findUnique({
    where: { address: address.toLowerCase() }
  });
  if (phishing) return true;
  
  // Option 2: API call to BlockSec (if endpoint available)
  try {
    const response = await fetch(`https://api.blocksec.com/phishing/${address}`);
    const data = await response.json();
    if (data.isPhishing) {
      // Store in local database for future lookups
      await prisma.phishingContract.create({
        data: {
          address: address.toLowerCase(),
          chainId: 8453,
          source: "blocksec_api",
          verified: data.verified || false
        }
      });
      return true;
    }
  } catch (error) {
    // Fallback to local database
  }
  
  return false;
}
```

### 3. Chainalysis/TRM Intelligence

**Source**: Chainalysis and TRM Labs threat intelligence

**Data Available**:
- Known scam addresses
- Money laundering patterns
- Sanctioned addresses
- High-risk transaction patterns

**Integration Plan**:
- Evaluate API access and pricing
- Integrate for high-value transaction checks
- Real-time verification for transfers > threshold

### 4. Community-Reported Contracts

**Source**: BasedOnchain community reporting UI

**Implementation**:
1. **Reporting UI (Milestone B)**:
   - Form to report suspicious contracts
   - Requires wallet signature for verification
   - Option for anonymous reporting

2. **Verification Process**:
   - Manual review for critical reports
   - Automatic flagging for common patterns
   - Community voting system (future)

**Database Schema**:
```prisma
model ReportedContract {
  id          String   @id @default(cuid())
  address     String
  chainId     Int
  reporter    String?  // Wallet address (optional for anonymous)
  reason      String   // "phishing", "scam", "drainer", etc.
  description String?
  status      String   @default("pending") // "pending", "verified", "rejected"
  votes       Int      @default(0)
  reportedAt  DateTime @default(now())
  reviewedAt  DateTime?
  reviewedBy  String?
}
```

## Data Aggregation Strategy

### Priority System

1. **High Priority**: Verified phishing/scam contracts (BlockSec, Chainalysis)
2. **Medium Priority**: Known vulnerabilities (Webacy/Trugard)
3. **Low Priority**: Community reports (pending verification)

### Risk Scoring Integration

```typescript
async function aggregateContractReputation(
  address: string
): Promise<ContractReputation> {
  const [phishing, vulnerability, reports] = await Promise.all([
    checkPhishingContract(address),
    checkContractVulnerabilities(address),
    getCommunityReports(address)
  ]);
  
  let riskScore = 0;
  let flags: string[] = [];
  
  if (phishing) {
    riskScore += 50;
    flags.push("phishing");
  }
  
  if (vulnerability) {
    riskScore += vulnerability.severity === "critical" ? 30 : 15;
    flags.push(vulnerability.vulnerabilityType);
  }
  
  if (reports.length > 5) {
    riskScore += 10;
    flags.push("multiple_reports");
  }
  
  return {
    address,
    riskScore: Math.min(riskScore, 100),
    flags,
    sources: ["blocksec", "webacy", "community"]
  };
}
```

## Implementation Timeline

### Milestone B
- ✅ Community reporting UI
- ⬜ Basic database schema for reported contracts

### Milestone C
- ⬜ Webacy/Trugard dataset import
- ⬜ BlockSec phishing database integration
- ⬜ Automated vulnerability checking
- ⬜ Contract reputation API endpoint

### Milestone D
- ⬜ Chainalysis/TRM integration (if accessible)
- ⬜ Community voting system
- ⬜ Automated dataset updates
- ⬜ Public API for reputation queries

## Data Privacy & Ethics

### Privacy Considerations
- Only store contract addresses, not user addresses
- No personal information in community reports
- Anonymize reporter addresses if requested

### Data Accuracy
- Verify reports before adding to database
- Regular audits of data quality
- Allow appeals for false positives

### Attribution
- Credit data sources appropriately
- Link to original reports when possible
- Maintain transparency about data sources

## Resources

- [Webacy "The Risks are Real" Report](https://world.webacy.com)
- [BlockSec Phishing Database](https://blocksecteam.medium.com)
- [Chainalysis](https://www.chainalysis.com)
- [TRM Labs](https://www.trmlabs.com)
- [Trugard Dataset](https://world.webacy.com)

## API Endpoints (Future)

### GET /api/reputation/:address
Returns contract reputation from all sources

### POST /api/report
Submit community report for suspicious contract

### GET /api/reports
List community reports (with filtering)

### GET /api/phishing/:address
Check if address is in phishing database
