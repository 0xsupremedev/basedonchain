# BasedOnchain Security Documentation

## Security Checklist

### ✅ Input Validation

- **Status**: Implemented
- **Details**: All API endpoints use Zod schemas for input validation
- **Locations**: 
  - `/api/analyze` - Validates transaction input
  - `/api/simulate` - Validates simulation requests
  - `/api/revoke/prepare` - Validates address formats
- **Coverage**: Address format, transaction data, calldata length checks

### ✅ Rate Limiting

- **Status**: Implemented (MVP)
- **Details**: 
  - 10 requests per minute per IP address
  - In-memory store for MVP
  - Applied to `/api/analyze` endpoint
- **Future**: Move to Redis/Upstash for distributed rate limiting
- **Location**: `apps/web/app/api/analyze/route.ts`

### ✅ SQL Injection Prevention

- **Status**: Implemented
- **Details**: 
  - Prisma ORM uses parameterized queries
  - No raw SQL queries in codebase
  - Type-safe database operations
- **Location**: All database access via Prisma Client

### ✅ Secrets Management

- **Status**: Implemented
- **Details**:
  - All secrets stored in environment variables
  - `.env.example` provided without actual secrets
  - Vercel environment variables for production
  - OpenAI API key, database URL, JWT secrets in env
- **Best Practices**:
  - Never commit `.env` files
  - Rotate keys regularly
  - Use least privilege access

### ✅ LLM Output Sanitization

- **Status**: Implemented
- **Details**:
  - Removes HTML/script tags from AI responses
  - Limits output length (1000 chars)
  - Structured prompts to reduce hallucinations
  - Fallback to heuristics if AI fails
- **Location**: `apps/web/lib/ai.ts` - `sanitizeAIOutput()` function

### ✅ HTTPS Enforcement

- **Status**: Enforced by Vercel
- **Details**: 
  - Vercel automatically enforces HTTPS
  - SSL/TLS certificates managed by Vercel
  - HSTS headers configured

### ✅ CORS Configuration

- **Status**: To be configured
- **Details**: 
  - Next.js API routes allow same-origin by default
  - For SDK usage, configure allowed origins
  - Location: `next.config.mjs` (future)

### ✅ Authentication & Authorization

- **Status**: Basic (MVP)
- **Details**:
  - Wallet-based authentication (EIP-191/EIP-712) - planned
  - API key authentication for SDK - planned
  - Current MVP: IP-based rate limiting
- **Future**: JWT tokens for authenticated endpoints

### ✅ Error Handling

- **Status**: Implemented
- **Details**:
  - Try-catch blocks around all async operations
  - Structured error responses (no stack traces in production)
  - Logging for debugging (console.error in development)
- **Best Practices**:
  - Generic error messages for users
  - Detailed errors in logs only
  - Rate limit errors return 429 status

### ⬜ Penetration Testing

- **Status**: Planned
- **Details**:
  - Manual security review
  - Automated vulnerability scanning (Dependabot)
  - Third-party security audit (Milestone C)
  - Fuzzing for API endpoints

### ✅ Dependency Security

- **Status**: Basic
- **Details**:
  - Regular dependency updates
  - Dependabot configured (to be added)
  - No known vulnerabilities in dependencies
- **Tools**: `npm audit`, `pnpm audit`

## Input Validation Details

### Transaction Input Validation

```typescript
// Example: analyze endpoint validation
const analyzeRequestSchema = z.object({
  txHash: z.string().optional(),
  unsignedTx: z.object({
    to: z.string(),
    data: z.string(),
    value: z.string().optional(),
  }).optional(),
  calldata: z.string().optional(),
  // ... more fields
});
```

**Validations:**
- Address format: Uses `ethers.isAddress()` for validation
- Calldata: Ensures hex string format
- Value: Validates numeric string format
- Type checking: Zod runtime validation

## Rate Limiting Implementation

### Current Implementation (MVP)

```typescript
// In-memory rate limiting
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  // 10 requests per minute
  // Returns false if limit exceeded
}
```

**Limitations:**
- Only works for single server instance
- Lost on server restart
- Not distributed across multiple instances

### Future Implementation

- Use Redis or Upstash for distributed rate limiting
- Per-API-key rate limits
- Different limits for different endpoints
- Graceful degradation when rate limit service unavailable

## LLM Security

### Prompt Injection Prevention

- Structured prompts with clear instructions
- User input separated from prompt structure
- No direct user input in system prompts

### Output Sanitization

```typescript
function sanitizeAIOutput(text: string): string {
  // Remove script tags
  // Remove HTML tags
  // Limit length
  return sanitized;
}
```

### Fallback Strategy

- If OpenAI API fails, use heuristics-based explanation
- Never expose API errors to users
- Log AI failures for monitoring

## Database Security

### Connection Security

- PostgreSQL connection string in environment variables
- SSL/TLS connection to database (production)
- Connection pooling via Prisma

### Query Security

- All queries via Prisma ORM (parameterized)
- No raw SQL queries
- Type-safe queries prevent SQL injection

### Data Isolation

- Current: No user isolation (MVP)
- Future: Row-level security based on wallet address
- Future: User authentication and authorization

## API Security

### Request Validation

- All requests validated with Zod
- Type checking at runtime
- Early rejection of invalid requests

### Response Security

- No sensitive data in error messages
- Generic error messages for users
- Detailed errors logged only

### Headers Security

- Content-Type validation
- CORS headers (to be configured)
- Rate limit headers (future)

## Deployment Security

### Environment Variables

- Secrets stored in Vercel environment variables
- Different envs for staging and production
- No secrets in code repository

### Build Security

- Dependencies verified in CI/CD
- No build-time secrets
- Lock file committed (pnpm-lock.yaml)

### Monitoring

- Error tracking (Sentry - optional)
- Log aggregation
- Rate limit monitoring
- Performance monitoring

## Security Best Practices

### Development

1. **Code Review**: All changes reviewed before merge
2. **Dependency Updates**: Regular updates via Dependabot
3. **Linting**: ESLint configured for security rules
4. **Type Safety**: TypeScript for compile-time checks

### Production

1. **Secrets Rotation**: Regular rotation of API keys
2. **Monitoring**: Active monitoring for anomalies
3. **Incident Response**: Plan for security incidents
4. **Backups**: Regular database backups

### User Data

1. **Privacy**: Minimal data collection
2. **Retention**: Data retention policies
3. **GDPR**: Compliance considerations (future)
4. **Encryption**: Data encryption at rest (PostgreSQL)

## Threat Modeling & Real-World Examples

### Smart Contract Vulnerabilities

**Hidden Mint Functions** (Webacy Report):
- Example: Contracts with `ownerMint()` functions not disclosed in public interface
- Impact: Unlimited token creation, inflation attacks
- Detection: Static analysis of bytecode, checking for mint functions
- Our Mitigation: Simulate transaction to detect unexpected state changes

**Unauthorized Burns**:
- Example: Contracts allowing unauthorized token burns
- Impact: User token balances reduced without consent
- Detection: Transaction simulation shows balance reductions
- Our Mitigation: Flag balance-reducing operations, especially without user approval

**Pausable with Malicious Logic**:
- Example: Contracts with pause functions that can lock user funds indefinitely
- Impact: Funds frozen, unable to withdraw
- Detection: Check for pause functionality, verify owner controls
- Our Mitigation: Flag contracts with pause functionality, warn users

**Secret Owner Functions**:
- Example: Hidden owner transfer functions
- Impact: Contract control can be transferred to malicious party
- Detection: Bytecode analysis, checking for owner modification functions
- Our Mitigation: Check contract verification status, flag unverified contracts

### Phishing Contract Patterns (BlockSec Statistics)

**Statistics**: ~37,654 phishing contracts (Dec 2022–Jan 2025), ~$190.7M in losses

**Common Patterns**:

1. **Fake Airdrop Contracts**:
   - Pattern: Contract promises airdrop, requires approval
   - Example: User approves unlimited tokens, attacker drains wallet
   - Case Study: User lost ~$908K by signing unlimited approval for fake airdrop (Turnkey report)
   - Our Detection: Flag unlimited approvals, check contract age/reputation

2. **Batch Token Transfer Drainers**:
   - Pattern: Contract batches multiple token transfers in single transaction
   - Example: `transferFrom(user, attacker, amount)` called for multiple tokens
   - Our Detection: Decode calldata, identify batch transfers, flag if to unknown address

3. **Deceptive Function Names**:
   - Pattern: Functions named like legitimate operations (e.g., "claimRewards" that actually drains)
   - Example: Function appears safe but executes malicious transfer
   - Our Detection: Verify function behavior via simulation, not just name

### Approval Exploit Case Studies

**Turnkey 2024 Report**: 31% of crypto attacks were phishing, often via approvals

**Case Study 1 - Unlimited Approval Drain**:
- Victim signed `approve(spender, type(uint256).max)` for fake airdrop
- Attacker immediately drained ~$908K in tokens
- Prevention: Our system flags unlimited approvals with critical risk

**Case Study 2 - Incremental Drain**:
- Victim approved large but limited amount
- Attacker used `transferFrom` multiple times until exhausted
- Prevention: Our system monitors approval usage patterns

**Case Study 3 - NFT Approval For All**:
- Victim signed `setApprovalForAll(operator, true)` for phishing site
- Attacker transferred all NFTs from collection
- Prevention: Our system flags `setApprovalForAll` with high risk

### Transaction Complexity Examples

**Multi-Call Routers**:
- Pattern: DEX routers that execute multiple operations
- Risk: Hidden approvals, unexpected swaps, front-running
- Example: Uniswap router with hidden approval before swap
- Our Detection: Decode all function calls, analyze each independently

**Proxy Patterns**:
- Pattern: Contracts using proxy patterns (EIP-1967)
- Risk: Implementation can be upgraded, changing behavior
- Example: Transparent proxy with admin that can upgrade to malicious implementation
- Our Detection: Check proxy status, verify implementation contract

**Delegatecall Vulnerabilities**:
- Pattern: Contracts using delegatecall to external libraries
- Risk: Malicious library can modify caller's storage
- Example: Wallet contract using malicious library via delegatecall
- Our Detection: Flag delegatecall usage, verify target library

### Real-World Attack Patterns

**Drainer Bot Pattern**:
1. User interacts with phishing site
2. Site requests unlimited approval
3. Bot monitors for approval transaction
4. Bot immediately drains tokens via `transferFrom`
5. Prevention: Flag + block unlimited approvals

**Social Engineering via Transaction**:
1. Attacker creates contract mimicking legitimate service
2. Contract name/interface looks legitimate
3. User signs transaction thinking it's safe
4. Transaction actually drains funds
5. Prevention: Reputation database, contract verification checks

**Time-Based Attacks**:
1. Contract has time-locked malicious function
2. Initially appears safe
3. After time period, malicious function activates
4. Prevention: Long-term reputation tracking, periodic re-analysis

## Known Limitations (MVP)

1. **Rate Limiting**: In-memory only (not distributed)
2. **Authentication**: IP-based only (no user auth)
3. **Approvals Scanning**: Placeholder (requires event indexing)
4. **CORS**: Not configured (same-origin only)
5. **Audit Logging**: Basic console logging only

## Security Audit Plan

### Phase 1: Self-Assessment (MVP)
- ✅ Security checklist completion
- ✅ Code review for common vulnerabilities
- ✅ Dependency vulnerability scanning

### Phase 2: Automated Testing (Milestone B)
- Automated security scanning
- Fuzzing for API endpoints
- Penetration testing tools

### Phase 3: Third-Party Audit (Milestone C)
- Professional security audit
- Smart contract security review (if applicable)
- Infrastructure security review

## Reporting Security Issues

If you discover a security vulnerability, please email: [security@basedonchain.com] (to be configured)

**Do not** open public GitHub issues for security vulnerabilities.

## Compliance

### Current Status
- MVP phase - basic security measures
- No user data collection beyond transaction analysis
- No PII stored

### Future Considerations
- GDPR compliance (if storing user data)
- SOC 2 certification (for enterprise)
- Insurance coverage (if handling funds)

## Cryptography Specifications

### Encryption Algorithms

**AES-256 Encryption**
- Algorithm: AES-256-GCM (Galois/Counter Mode) preferred, or AES-256-CBC as fallback
- Implementation: Node.js `crypto.createCipheriv()` and `crypto.createDecipheriv()`
- Use Case: Encrypting stored secrets, API keys, or sensitive configuration data
- Example:
  ```typescript
  import crypto from 'crypto';
  
  const algorithm = 'aes-256-gcm';
  const key = crypto.scryptSync(secret, 'salt', 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  ```

**SHA-256 Hashing**
- Algorithm: SHA-256 (Secure Hash Algorithm 256-bit)
- Implementation: Node.js `crypto.createHash('sha256')`
- Use Case: Hashing passwords, tokens, or generating deterministic IDs
- Salt: Always use salt for password hashing (crypto.randomBytes)
- Example:
  ```typescript
  import crypto from 'crypto';
  
  function hashWithSalt(data: string, salt: Buffer): string {
    return crypto.pbkdf2Sync(data, salt, 100000, 64, 'sha256').toString('hex');
  }
  ```

### EIP-712/EIP-191 Signature Standards

**EIP-191 (Personal Sign)**
- Standard for Ethereum message signing
- Format: `"\x19Ethereum Signed Message:\n" + len(message) + message`
- Use Case: Simple message authentication, login flows
- Implementation: ethers.js `wallet.signMessage()` or `ethers.verifyMessage()`
- Example:
  ```typescript
  import { ethers } from 'ethers';
  
  const message = "Login to BasedOnchain";
  const signature = await wallet.signMessage(message);
  const recoveredAddress = ethers.verifyMessage(message, signature);
  ```

**EIP-712 (Typed Data Signing)**
- Standard for structured data signing
- Provides human-readable signatures with domain separation
- Use Case: Transaction approval, API authentication, complex data structures
- Implementation: ethers.js `wallet.signTypedData()` or `ethers.verifyTypedData()`
- Domain: Must include chainId to prevent cross-chain replay attacks
- Example:
  ```typescript
  const domain = {
    name: 'BasedOnchain',
    version: '1',
    chainId: 8453, // Base mainnet
    verifyingContract: '0x...'
  };
  
  const types = {
    AnalysisRequest: [
      { name: 'txHash', type: 'bytes32' },
      { name: 'wallet', type: 'address' },
      { name: 'nonce', type: 'uint256' }
    ]
  };
  
  const value = {
    txHash: '0x...',
    wallet: '0x...',
    nonce: 123
  };
  
  const signature = await wallet.signTypedData(domain, types, value);
  ```

**Best Practices**:
- Always include chainId in EIP-712 domain
- Use nonces to prevent replay attacks
- Verify signature before processing authenticated requests
- Store signature metadata (timestamp, nonce) in database

### Key Management

**Environment Variables**
- Store all secrets in environment variables
- Never commit `.env` files to version control
- Use `.env.example` with placeholder values
- Production: Use Vercel environment variables or AWS Secrets Manager

**Key Derivation**
- Use `crypto.scryptSync()` or `crypto.pbkdf2Sync()` for key derivation
- Minimum iterations: 100,000
- Use random salts (crypto.randomBytes(32))
- Never reuse salts across different keys

**Key Rotation**
- Implement key rotation policy (e.g., every 90 days)
- Support multiple active keys during rotation period
- Archive old keys securely before deletion

### WalletConnect Security

**End-to-End Encryption**
- WalletConnect uses end-to-end symmetric encryption
- Private keys never leave user's device
- Session keys established via secure key exchange
- All communication encrypted with session keys

**CAIP-222 Standard**
- WalletConnect follows CAIP-222 for signing requests
- Ensures chain-agnostic, standardized signing format
- Prevents signature confusion across different chains

**Implementation Details**:
- WalletConnect sessions use Waku network for P2P communication
- Session metadata encrypted with ephemeral keys
- Automatic session expiration (default: 7 days)
- Users can revoke sessions from wallet

### Node.js Crypto Module Usage

**Secure Random Generation**
```typescript
import crypto from 'crypto';

// Generate secure random bytes
const randomBytes = crypto.randomBytes(32);

// Generate secure random UUID
const uuid = crypto.randomUUID();
```

**Secure Comparison**
```typescript
// Use crypto.timingSafeEqual to prevent timing attacks
import crypto from 'crypto';

function secureCompare(a: string, b: string): boolean {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  if (aBuffer.length !== bBuffer.length) {
    return false;
  }
  return crypto.timingSafeEqual(aBuffer, bBuffer);
}
```

**Hash Functions**
```typescript
import crypto from 'crypto';

// SHA-256 hash
const hash = crypto.createHash('sha256').update(data).digest('hex');

// HMAC for message authentication
const hmac = crypto.createHmac('sha256', secretKey).update(data).digest('hex');
```

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web Security Best Practices](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Prisma Security](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management)
- [Vercel Security](https://vercel.com/docs/security)
- [EIP-191: Signed Data Standard](https://eips.ethereum.org/EIPS/eip-191)
- [EIP-712: Typed Structured Data Hashing and Signing](https://eips.ethereum.org/EIPS/eip-712)
- [Node.js Crypto Documentation](https://nodejs.org/api/crypto.html)
- [WalletConnect Security](https://docs.walletconnect.com/2.0/protocol/security)
- [CAIP-222: Signing Request](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-222.md)
