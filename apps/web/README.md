# BasedOnchain Web Application

Next.js 14 application for analyzing Base blockchain transactions with AI-powered risk assessment.

## Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Set up the database:
   ```bash
   pnpm db:generate
   pnpm db:push
   ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

See `.env.example` for all required environment variables.

### Required

- `DATABASE_URL` - PostgreSQL connection string
- `OPENAI_API_KEY` - OpenAI API key for risk explanations
- `BASE_RPC_URL` - Base network RPC endpoint

### Optional

- `BASE_SEPOLIA_RPC_URL` - Base Sepolia testnet RPC
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` - WalletConnect project ID
- `NEXT_PUBLIC_APP_URL` - Application URL
- `SENTRY_DSN` - Sentry error tracking (optional)

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking
- `pnpm test` - Run tests
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:push` - Push schema to database
- `pnpm db:migrate` - Run database migrations
- `pnpm db:studio` - Open Prisma Studio

## Project Structure

```
apps/web/
├── app/              # Next.js App Router
│   ├── api/         # API routes
│   ├── analyze/     # Analyze page
│   └── dashboard/   # Dashboard page
├── components/       # React components
├── lib/             # Utility libraries
│   ├── riskEngine/  # Risk analysis engine
│   └── ...
├── hooks/           # Custom React hooks
└── public/          # Static assets
```

## Deployment

The application is configured for deployment on Vercel. Push to the main branch to trigger automatic deployment.
