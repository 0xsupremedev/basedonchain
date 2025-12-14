# BasedOnchain

<div align="center">

**AI-powered onchain copilot for Base that simulates, explains, and blocks risky transactions before users sign**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Base](https://img.shields.io/badge/Base-0052FF?logo=base&logoColor=white)](https://base.org)

[Live Demo](https://basedonchain.vercel.app) • [Documentation](./docs) • [API Docs](./docs/api.md)

</div>

## Overview

BasedOnchain helps users make safer onchain decisions by:
- 🔍 **Decoding** complex transactions into human-readable format
- 🤖 **Scoring** risk using heuristics and AI
- ⚡ **Simulating** transactions before execution
- 💡 **Explaining** risks with clear recommendations
- 🛡️ **Protecting** users from approval exploits and phishing

## Tech Stack

### Frontend

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)

### Blockchain

![ethers.js](https://img.shields.io/badge/ethers.js-6.11-627EEA?logo=ethereum&logoColor=white)
![Wagmi](https://img.shields.io/badge/Wagmi-2.5-F97316?logo=wagmi&logoColor=white)
![RainbowKit](https://img.shields.io/badge/RainbowKit-2.1-FF0066?logo=rainbow&logoColor=white)
![Base](https://img.shields.io/badge/Base-L2-0052FF?logo=base&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-18-339933?logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-5.9-2D3748?logo=prisma&logoColor=white)

### AI & Services

![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?logo=openai&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?logo=vercel&logoColor=white)

### Development

![pnpm](https://img.shields.io/badge/pnpm-8-F69220?logo=pnpm&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-8.56-4B32C3?logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-3.2-F7B93E?logo=prettier&logoColor=black)
![Jest](https://img.shields.io/badge/Jest-29.7-C21325?logo=jest&logoColor=white)

## Features

### ✅ Milestone A (MVP)

- 🔌 Wallet connection (MetaMask, Coinbase Wallet) with Base network detection
- 📊 Transaction decoder with ERC20/ERC721 support
- 🤖 AI-powered risk scoring with explainable assessments
- 📈 Dashboard with analytics and transaction history
- 🔒 Rate-limited REST API
- 📦 JavaScript/TypeScript SDK

### 🚧 Planned (Milestone B-D)

- 🧪 Pre-sign simulation with state change detection
- 🛡️ Approval manager with one-click revocation
- 📱 ERC-4337 smart wallet support
- 🌐 Community reporting & blacklist
- 🔄 Webhook support for async analysis
- 🗄️ Contract reputation database

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm 8+
- PostgreSQL database
- OpenAI API key

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/0xsupremedev/basedonchain.git
   cd basedonchain
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Set up the database
   ```bash
   pnpm db:generate
   pnpm db:push
   ```

5. Run the development server
   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
/
├── apps/
│   └── web/              # Next.js application
│       ├── app/          # App Router pages and API routes
│       ├── components/   # React components
│       ├── lib/          # Utility libraries
│       └── hooks/        # Custom React hooks
├── packages/
│   ├── sdk/              # JavaScript/TypeScript SDK
│   └── shared/           # Shared types and utilities
├── prisma/               # Database schema
├── docs/                 # Documentation
└── tests/                # Test files
```

## Base Network Integration

BasedOnchain is built specifically for Base (Chain ID 8453):
- **Base Mainnet**: `https://mainnet.base.org`
- **Base Sepolia**: `https://sepolia.base.org`

The app automatically detects and prompts users to switch to Base network when connecting their wallet.

## Documentation

- [Grant Proposal](./docs/grant-proposal.md) - Complete grant application
- [Architecture](./docs/arch.md) - System architecture and design
- [API Documentation](./docs/api.md) - REST API reference
- [Security](./docs/security.md) - Security practices and cryptography
- [ERC-4337 Planning](./docs/erc4337-planning.md) - Smart wallet support roadmap
- [External Datasets](./docs/external-datasets.md) - Threat intelligence integration

## Environment Variables

See `.env.example` for all required environment variables. Key variables include:

- `DATABASE_URL` - PostgreSQL connection string
- `OPENAI_API_KEY` - OpenAI API key for AI risk explanations
- `BASE_RPC_URL` - Base network RPC endpoint (default: https://mainnet.base.org)
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` - WalletConnect project ID (optional)
- `JWT_SECRET` - Secret for API authentication (future use)
- `SENTRY_DSN` - Sentry error tracking (optional)

## Base Blockchain

This project is built specifically for Base (Chain ID 8453). Base is an Ethereum L2 network that uses:

- **Solidity** for smart contracts (same as Ethereum)
- **EVM** (Ethereum Virtual Machine) compatibility
- **Ethers.js** and **Viem** for blockchain interactions
- **TypeScript/JavaScript** for application development

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues and questions, please open an issue on GitHub.

## Links

- 🌐 [Live Demo](https://basedonchain.vercel.app)
- 📚 [Documentation](./docs)
- 🔌 [API Docs](./docs/api.md)
- 🔒 [Security](./docs/security.md)

---

<div align="center">

Built with ❤️ for the Base ecosystem

[Base](https://base.org) • [Base Docs](https://docs.base.org) • [Base Blog](https://blog.base.org)

</div>