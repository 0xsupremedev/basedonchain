# BasedOnchain Grant Proposal

## One-Liner

AI-powered onchain copilot for Base that simulates, explains, and blocks risky transactions before users sign.

## Base's 2025 Vision Alignment

Base's 2025 strategy aims to build "a global onchain economy" with millions of builders and users. Base emphasizes powerful developer tools (OnchainKit), AI integration, and account abstraction (smart wallets and gasless paymasters). BasedOnchain aligns with this vision by making Base transactions safer and more understandable via AI-driven simulation, explanation, and risk-blocking.

Our copilot decodes calldata, scores risk, and enforces policies, enabling innovation without compromising security. In short, we seek to help bring everyone, everywhere onchain safely. By 2025, ERC-4337 accounts are expected to reach hundreds of millions, especially for AI/DeFi "super apps", so our support for smart wallets and paymasters is critical for Base's growth.

## Problem Statement

Users lose millions in crypto assets annually due to:
1. **Opaque Transactions**: Smart contract interactions are encoded in hex, making them impossible for most users to understand before signing
2. **Approval Risks**: Unlimited token approvals can lead to complete wallet drainage
3. **No Pre-Sign Simulation**: Wallets don't provide pre-execution analysis showing what will actually happen
4. **Limited Safety Tools**: Existing solutions are reactive (after-the-fact) rather than preventive

On Base specifically, as an emerging L2 with growing DeFi activity, users need better safety tooling to navigate the ecosystem confidently. A recent analysis found over 34,000 vulnerabilities across Base smart contracts, including hidden mints, unauthorized burns, and balance updates.

## Threat Landscape

### Smart Contract Vulnerabilities
Many on-chain contracts (even "trusted" ones) contain hidden backdoors. Webacy's report ("The Risks are Real") highlights rampant issues like hidden mints, unauthorized burns, and balance updates. Traditional audits alone aren't enough, so real-time monitoring is needed. Our system simulates each transaction through the actual contracts, catching forbidden actions (like unannounced mints or pauses) as they happen.

### Phishing & Malicious Contracts
Scammers increasingly deploy phishing contracts that mimic legitimate apps. BlockSec found ~37,654 phishing contracts (Dec 2022–Jan 2025) on Ethereum causing ~$190.7M in losses. These contracts often batch-token transfers or call deceptive "claim" functions to drain wallets. By decoding calldata and highlighting anomalous calls, BasedOnchain helps users spot and refuse phishing scams.

### Approval Exploits
Attackers lure users into signing dangerous ERC-20 approvals. Turnkey reports that 31% of crypto attacks in 2024 were phishing, often via approvals. One case cost a user ~$908K by signing an unlimited token-approval for a fake airdrop. We flag unusually large or open-ended approvals and enable instant revocation, cutting off this common drain attack.

### Transaction Complexity
The average user cannot parse raw calldata. Tools like Tenderly and QuickNode emphasize that simulation tools allow developers to test and debug in a controlled environment. Likewise, Ledger's Transaction Check feature analyzes Ethereum transactions for threats before signing. BasedOnchain implements this "dry-run" approach: every transaction is simulated against on-chain state and our risk rules, surfacing any hidden state changes or policy violations. This prevents "blind signing" mistakes.

### Emerging Wallet Tech
Base plans wide adoption of smart contract accounts (ERC-4337) by 2025. "Agentic AI" wallets and DeFi super-apps will rely on these smart accounts, often using paymasters for gasless UX. We must support these flows. For example, simulations must work even when a paymaster subsidizes gas, and our UI should explain multi-step meta-transactions. Staying compatible with this roadmap ensures our copilot stays relevant.

## Proposed Solution

BasedOnchain delivers a comprehensive transaction safety layer:

1. **Transaction Decoder**: Converts complex calldata into human-readable summaries
2. **AI Risk Scoring**: Explainable heuristics + LLM-powered risk assessment with clear reasoning
3. **Pre-Sign Simulation**: Runs `eth_call` simulations to show state changes and value at risk
4. **Approval Manager**: Tracks and enables one-click revocation of dangerous approvals
5. **Public API & SDK**: Enables wallets and dApps to integrate transaction analysis

Our approach follows Halborn's "secure-by-design" philosophy: we simulate each transaction through a dedicated RPC endpoint and alert on deviations before execution, similar to Halborn's Seraph product which acts as an "anti-virus" for transactions.

## Deliverables (Milestone A - MVP)

### Core Features
- ✅ Live demo application on https://basedonchain.vercel.app
- ✅ Wallet connection (MetaMask, Coinbase Wallet) with Base network detection using Wagmi/RainbowKit
- ✅ Transaction decoder with ERC20/ERC721 support
- ✅ AI-powered risk scoring API endpoint
- ✅ Dashboard showing analyzed transactions with metrics
- ✅ Public REST API with rate limiting

### Developer Tools
- ✅ JavaScript/TypeScript SDK for easy integration
- ✅ API documentation with examples
- ✅ Sample test cases and transaction examples

### Documentation & Assets
- ✅ Open-source GitHub repository
- ✅ Architecture documentation
- ✅ Security checklist and practices
- ✅ Demo video and screenshots
- ✅ Metrics dashboard (transactions analyzed, warnings issued)

### Technical Implementation
- ✅ Next.js 14 frontend with Tailwind CSS
- ✅ PostgreSQL database with Prisma ORM
- ✅ OpenAI integration for explainable risk assessments
- ✅ Base network integration (Chain ID 8453)
- ✅ Rate limiting and input validation
- ✅ CI/CD pipeline with GitHub Actions
- ⬜ OnchainKit integration (planned for Milestone B) - Leverage Coinbase's OnchainKit React/TypeScript toolkit for accelerated development

## Roadmap

### Milestone B - Safety & UX Expansion

**Pre-Sign Simulation & Warnings**: Integrate a transaction "dry-run" via eth_call before user signature. This lets us estimate outcomes (state changes, token movements, value at risk). We use ethers.js on a read-only RPC to replay the TX and apply our policy/risk engine to the result. If we detect anomalies (e.g. hidden token drains), we block or flag it.

**Approval Manager**: Build a UI listing ERC-20 approvals granted by the user, highlighting "risky" allowances (e.g. unlimited approvals to new tokens). Users can revoke approvals with one click via JSON-RPC.

**Smart Wallet & Gasless Support**: Expand to support Base's account abstraction efforts. Base plans to push ERC-4337 smart wallets and paymasters for gasless UX. We will enable simulation of paymaster-funded ("gasless") transactions and potentially integrate with sample bundler APIs. See [ERC-4337 Planning Document](erc4337-planning.md) for detailed implementation plan.

**Community Reporting & Blacklist**: Provide a form/UI to submit suspected scam contracts or addresses. Maintain an internal "watchlist" and share data with the community. We can also leverage public scams datasets like BlockSec's phishing database or Chainalysis/TRM intelligence.

### Milestone C - Developer Ecosystem & Scale

**Public SDK & APIs**: Publish a well-documented JS/TS SDK (and REST API) with an analyzeTx(tx) function. Other projects can call this to get a risk report or webhook callback. Rate-limit the API and provide team analytics.

**Reputation Database & Crawler**: Automate collection of on-chain data: crawlers that scan new contracts on Base, run them through our static checks (e.g. detect hidden mints/pauses), and build a reputation DB. We will also pull in external blacklists and DeFi risk feeds (Webacy/Trugard datasets, BlockSec phishing database).

**Policy Engine**: Implement a flexible rule engine for risk thresholds and whitelists. For example, an admin could configure "block if >50% of user's balance is drained by a single TX" or allow small approvals. This lets organizations tune strictness.

**Monitoring & Logging**: Use Sentry for error tracking and Prometheus/Grafana or Vercel Analytics for usage metrics. Capture logs of blocked transactions (hash, reason) and system health.

**Security Audit**: Before full public release, commission a third-party audit of our frontend and backend code.

### Milestone D - Growth & Trust Signals

**Open Source & Community**: Open-source our core heuristics and LLM prompts on GitHub. Encourage community contributions (flagged addresses, new risk rules) via a public repository.

**Ecosystem Integrations**: Collaborate with Base partners (explorers, wallets, DeFi apps) to integrate our analysis engine. Explore embedding this in hardware wallets or Discord bots for on-chain alerts.

**OnchainKit Integration**: Leverage Coinbase's OnchainKit (a React/TypeScript toolkit) to accelerate development and ensure compatibility with Base ecosystem standards.

**Outreach & Reporting**: Produce a post-grant report with impact metrics (TXs analyzed, estimated losses prevented, user testimonials, and roadmap).

**KPI Dashboard**: Track and publicize key metrics: transactions analyzed, risk warnings issued, estimated value at risk prevented, active protected wallets, and API integrations.

## Impact Metrics

### Grant Submission Metrics
- **Transactions Analyzed**: Tracked via database and exposed via `/api/metrics`
- **Warnings Issued**: Count of analyses with risk score ≥ 30
- **High Risk Transactions**: Count of critical/high risk analyses
- **Active Wallets Protected**: Unique wallet addresses that have used the service
- **Estimated Prevented Loss**: Sum of value at risk for blocked transactions

### Target KPIs (3-6 months post-grant)
- 10,000+ transactions analyzed
- 1,000+ active wallets protected
- Integration with 2+ Base ecosystem wallets/dApps
- Community-reported suspicious contracts database

## Cryptography & Secure Design

To build trust, we adhere to crypto best practices throughout:

**Secure Algorithms**: On the server, we use Node's crypto module with strong algorithms: AES-256 (e.g. aes-256-cbc or GCM) for any symmetric encryption, and SHA-256 for hashing. We hash (with salt) any sensitive tokens or passwords to protect against leaks.

**Key Management**: Never hard-code secrets. All keys (API secrets, encryption keys) come from environment variables or a secrets manager. This prevents accidental exposure in code.

**Encrypted Transport**: All web requests (UI↔backend, backend↔RPC) use HTTPS/TLS by default. We obtain TLS certs (e.g. via Vercel) to secure data-in-transit.

**Wallet Encryption**: We rely on WalletConnect's audited encryption: it uses end-to-end symmetric encryption so the user's private key never leaves their device. Session data is safe against man-in-the-middle.

**Standardized Signing**: For message authentication (e.g. logging into our API or verifying callbacks), we follow established formats. We use EIP-712 typed data or EIP-191 signatures so that any signed payload is unambiguous and chain-specific.

By combining these cryptographic safeguards with our architecture, we ensure that user data and keys are protected. In particular, we do not store any wallet private keys on our servers at all – users sign transactions locally. Our backend never sees keys, only the transaction data to analyze. We will also perform a full security audit (Milestone C) to validate that our cryptography and implementation have no flaws.

## Why Base?

Base is an ideal ecosystem for this tool because:
1. **Growing Activity**: Rapidly expanding DeFi and NFT activity creates need for safety tools
2. **Developer-Friendly**: Base's developer experience aligns with our tech stack
3. **EVM Compatibility**: Our tools work seamlessly with Base's Ethereum compatibility
4. **Community Focus**: Base's emphasis on user safety aligns with our mission
5. **OnchainKit Support**: Base's OnchainKit provides React/TypeScript components that accelerate development

## Team & Contact

- **Repository**: https://github.com/[your-org]/basedonchain
- **Demo**: https://basedonchain.vercel.app
- **Documentation**: https://github.com/[your-org]/basedonchain/tree/main/docs

## Grant Request

We are requesting grant support to:
1. Complete MVP development and deployment
2. Conduct security audit
3. Scale infrastructure for production use
4. Integrate with Base ecosystem partners
5. Build community and developer adoption

This grant will enable us to launch a production-ready safety tool that significantly improves user experience and security on Base.

## References

1. Base 2025 Strategy: https://blog.base.org
2. Base Account Abstraction: https://blog.rhinestone.wtf
3. Halborn Security (Seraph, AI-Blockchain convergence): https://halborn.com
4. BlockSec Phishing Report: https://blocksecteam.medium.com
5. Webacy "The Risks are Real" Report: https://world.webacy.com
6. Turnkey Security Report 2024: https://turnkey.com
7. Ledger Transaction Check: https://ledger.com
8. QuickNode Simulation Tools: https://quicknode.com
9. Node.js Crypto Best Practices: https://dev.to
10. WalletConnect Security (CAIP-222, encryption): https://binance.com
11. OnchainKit Documentation: https://github.com/coinbase/onchainkit

---

*This proposal is designed to be copy-pasted into grant application forms. Sections can be expanded or condensed as needed.*