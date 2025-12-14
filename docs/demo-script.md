# BasedOnchain Demo Video Script

## Overview
1-2 minute demo video showcasing BasedOnchain's core features for grant submission.

## Recording Setup Checklist

- [ ] Clean browser window (incognito/private)
- [ ] Base network test wallet with test funds
- [ ] Screen recording software ready (OBS, QuickTime, Loom)
- [ ] Microphone for voiceover (optional)
- [ ] Demo environment ready (localhost or staging URL)

## Script (1-2 minutes)

### 0:00 - 0:10 | Introduction

**Visual**: BasedOnchain logo/splash screen, or landing page

**Voiceover**: 
> "BasedOnchain is an AI-powered onchain copilot for Base that simulates, explains, and blocks risky transactions before you sign."

**Action**: 
- Show landing page with hero section
- Highlight key features: "Transaction Decoder", "AI Risk Scoring", "Pre-Sign Simulation"

---

### 0:10 - 0:30 | Wallet Connection

**Visual**: Click "Connect Wallet" button

**Voiceover**: 
> "Let's connect a wallet. BasedOnchain works with MetaMask, Coinbase Wallet, and other compatible wallets on Base network."

**Action**:
- Click wallet connect button
- Show RainbowKit modal
- Connect MetaMask (or Coinbase Wallet)
- Show success message: "Connected to Base network"
- Display connected wallet address

**Key Point**: Emphasize Base network detection and automatic switching prompt if on wrong network.

---

### 0:30 - 0:55 | Analyze Transaction

**Visual**: Navigate to Analyze page, paste transaction data

**Voiceover**: 
> "Now let's analyze a transaction. You can paste a transaction hash, calldata, or an unsigned transaction."

**Action**:
- Navigate to `/analyze` page
- Paste example transaction hash or calldata (use sample from tests/sampleTxs.json)
- Click "Analyze Transaction"
- Show loading state
- Wait for results

**Key Point**: Show that the UI is responsive and provides clear feedback.

---

### 0:55 - 1:25 | Results & Risk Assessment

**Visual**: Display analysis results with risk score

**Voiceover**: 
> "BasedOnchain decodes the transaction and provides a risk assessment. Here we can see a critical risk transaction with an unlimited approval. The AI explains the risks clearly and provides actionable recommendations."

**Action**:
- Show TxCard component with:
  - Risk badge (highlight if critical/high)
  - Decoded transaction summary
  - AI explanation (scroll to show full text)
  - Recommendations list
  - Value at risk estimate (if available)
- Highlight the risk level and explanation
- Show link to BaseScan for transaction details

**Key Point**: Emphasize human-readable explanation and clear recommendations.

---

### 1:25 - 1:40 | Dashboard & Metrics

**Visual**: Navigate to Dashboard

**Voiceover**: 
> "All analyzed transactions are saved to your dashboard. Here you can see metrics: total transactions analyzed, warnings issued, and high-risk transactions detected."

**Action**:
- Navigate to `/dashboard` page
- Show metrics cards:
  - Total Analyzed
  - Warnings Issued
  - High Risk Count
- Show list of recent analyses
- Click on one analysis to show details

**Key Point**: Show persistence and analytics capabilities.

---

### 1:40 - 2:00 | Closing & Call to Action

**Visual**: Return to landing page or show repository link

**Voiceover**: 
> "BasedOnchain is open-source and ready for integration. Check out our GitHub repository, try the demo, and help make Base safer for everyone."

**Action**:
- Show repository link: `github.com/[org]/basedonchain`
- Show demo URL: `basedonchain.vercel.app`
- Show "View on GitHub" button or link
- Fade to BasedOnchain logo

**Text Overlay**: 
- Repository: `github.com/[org]/basedonchain`
- Demo: `basedonchain.vercel.app`
- Built for Base

---

## Screen Recording Tips

1. **Resolution**: Record in 1920x1080 or 1280x720
2. **Frame Rate**: 30fps minimum
3. **Audio**: Clear voiceover or add captions
4. **Cursor**: Show cursor movements clearly
5. **Zoom**: Zoom in on important UI elements (risk scores, explanations)
6. **Transitions**: Use smooth transitions between sections
7. **Text Overlays**: Add text overlays for URLs and key points

## Post-Production

- [ ] Add captions/subtitles (for accessibility)
- [ ] Add background music (optional, keep volume low)
- [ ] Trim unnecessary pauses
- [ ] Add zoom-ins on key features
- [ ] Add arrows/highlights for important UI elements
- [ ] Export in MP4 format (H.264 codec)
- [ ] Upload to YouTube or Vimeo (set to unlisted for grant submission)

## Sample Transactions for Demo

Use transactions from `tests/sampleTxs.json`:

**For Safe Transaction Demo:**
- Use `safe_1` (simple ETH transfer) or `safe_3` (limited approval)

**For Risky Transaction Demo:**
- Use `risky_1` (unlimited approval) - shows critical risk
- Use `risky_3` (NFT approvalForAll) - shows high risk

**Note**: In production demo, use real Base mainnet transactions if available.

## Script Variations

### Short Version (1 minute)
- Skip dashboard section
- Focus on: Connect → Analyze → Show Results
- Emphasize risk detection and AI explanation

### Long Version (2-3 minutes)
- Add section on transaction decoder details
- Show simulation results in detail
- Demonstrate approval manager (when implemented)
- Show SDK usage example

## Captions Template

If adding captions, use this format:

```
[0:00-0:10] BasedOnchain - AI-powered onchain copilot for Base
[0:10-0:30] Connect your wallet on Base network
[0:30-0:55] Analyze any transaction with one click
[0:55-1:25] Get AI-powered risk assessment and recommendations
[1:25-1:40] Track all analyses in your dashboard
[1:40-2:00] Open-source and ready for integration
```

## Links to Include

- GitHub: `https://github.com/[org]/basedonchain`
- Demo: `https://basedonchain.vercel.app`
- Documentation: `https://github.com/[org]/basedonchain/tree/main/docs`
- API Docs: `https://github.com/[org]/basedonchain/blob/main/docs/api.md`
