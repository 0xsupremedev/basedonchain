# ERC-4337 Smart Wallet Support Planning

## Overview

Base plans wide adoption of smart contract accounts (ERC-4337) by 2025. "Agentic AI" wallets and DeFi super-apps will rely on these smart accounts, often using paymasters for gasless UX. BasedOnchain must support these flows to remain relevant.

## ERC-4337 Account Abstraction

### Key Concepts

**Smart Contract Wallets**: ERC-4337 enables wallets as smart contracts, allowing:
- Social recovery
- Multi-signature support
- Transaction batching
- Custom validation logic
- Gas abstraction via paymasters

**Paymasters**: Contracts that sponsor gas fees, enabling:
- Gasless transactions for users
- Sponsored transactions by dApps
- ERC-20 token gas payments

**Bundlers**: Off-chain actors that bundle user operations and submit to mempool
**EntryPoint Contract**: Single contract that handles all user operations

## Integration Challenges

### Transaction Simulation

**Challenge**: Paymaster-sponsored transactions have different execution flow
- Original transaction may fail, but paymaster covers gas
- Need to simulate both user operation and paymaster sponsorship
- Must detect if paymaster will accept/reject sponsorship

**Solution**: 
- Extend simulation engine to handle `UserOperation` format
- Check paymaster balance and validation rules
- Simulate entry point contract execution
- Include paymaster validation in risk assessment

### Multi-Step Transactions

**Challenge**: User operations can contain multiple actions (batch transactions)
- Need to decode and analyze each action
- Aggregate risk scores across all actions
- Identify value at risk across entire batch

**Solution**:
- Parse `UserOperation.calls` array
- Analyze each call separately
- Combine risk assessments
- Show breakdown in UI

### Paymaster Risk Assessment

**Challenge**: Paymasters themselves can be risky
- Paymaster might drain funds
- Malicious paymaster might front-run
- Need to verify paymaster contract safety

**Solution**:
- Check paymaster contract reputation
- Verify paymaster balance
- Analyze paymaster validation logic
- Flag suspicious paymaster patterns

## Implementation Plan

### Phase 1: UserOperation Decoding (Milestone B)

**Goals**:
- Decode ERC-4337 UserOperation format
- Extract target contracts and calldata
- Identify paymaster and sponsored status

**Implementation**:
```typescript
interface UserOperation {
  sender: string;
  nonce: bigint;
  initCode: string;
  callData: string;
  callGasLimit: bigint;
  verificationGasLimit: bigint;
  preVerificationGas: bigint;
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
  paymasterAndData: string;
  signature: string;
}

function decodeUserOperation(op: UserOperation): DecodedTransaction {
  // Decode callData into individual calls
  // Extract paymaster information
  // Identify sponsored vs self-funded
}
```

### Phase 2: Paymaster Simulation (Milestone B)

**Goals**:
- Simulate paymaster validation
- Check paymaster balance
- Verify sponsorship eligibility

**Implementation**:
```typescript
async function simulatePaymaster(
  userOp: UserOperation,
  provider: Provider
): Promise<PaymasterValidation> {
  // Call EntryPoint.simulateValidation()
  // Check paymaster balance
  // Verify sponsorship rules
  // Return validation result
}
```

### Phase 3: Batch Transaction Analysis (Milestone B)

**Goals**:
- Analyze multi-call transactions
- Aggregate risk scores
- Show detailed breakdown

**Implementation**:
- Parse UserOperation.calls array
- Analyze each call independently
- Combine risk assessments
- Display in UI with breakdown

### Phase 4: Paymaster Reputation Database (Milestone C)

**Goals**:
- Maintain database of known paymasters
- Track paymaster safety scores
- Flag suspicious paymasters

**Implementation**:
- Add Paymaster model to Prisma schema
- Crawler to discover new paymasters
- Community reporting for paymaster issues

## UI/UX Considerations

### Gasless Transaction Indicators

- Show "Gasless Transaction" badge
- Display paymaster information
- Warn if paymaster is unknown/unverified

### Multi-Step Transaction Display

- Show each step in transaction batch
- Individual risk scores per step
- Aggregate risk assessment
- Expandable details for each call

### Paymaster Safety

- Display paymaster verification status
- Show paymaster balance (if applicable)
- Warn about unverified paymasters

## Example User Flows

### Gasless Swap

```
1. User initiates swap via smart wallet
2. dApp paymaster sponsors gas
3. BasedOnchain analyzes:
   - Swap transaction (target, amount, slippage)
   - Paymaster validation
   - Entry point execution
4. Display: "Gasless swap: 100 USDC → ETH, Paymaster: Verified"
```

### Batch Transaction

```
1. User batches: approve + swap + transfer
2. BasedOnchain analyzes each:
   - Approval risk (unlimited?)
   - Swap risk (slippage, DEX verification)
   - Transfer risk (destination, amount)
3. Display: "Batch transaction (3 steps), High risk: unlimited approval"
```

## Testing Strategy

### Unit Tests
- UserOperation decoding
- Paymaster validation logic
- Multi-call parsing

### Integration Tests
- Fork Base mainnet with testnet paymaster
- Test paymaster-sponsored transaction simulation
- Verify batch transaction analysis

### E2E Tests
- Connect smart wallet (e.g., Coinbase Smart Wallet)
- Submit gasless transaction
- Verify analysis results

## Resources

- [ERC-4337 Specification](https://eips.ethereum.org/EIPS/eip-4337)
- [Base Account Abstraction](https://blog.rhinestone.wtf)
- [Rhinestone (Base AA Infrastructure)](https://rhinestone.wtf)
- [Stackup Bundler](https://docs.stackup.sh)
- [Pimlico Paymaster](https://docs.pimlico.io)

## Timeline

- **Milestone B**: Basic UserOperation support, paymaster simulation
- **Milestone C**: Paymaster reputation database, advanced batch analysis
- **Ongoing**: Keep updated with ERC-4337 ecosystem changes
