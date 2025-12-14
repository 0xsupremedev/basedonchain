# GitHub Repository Setup Instructions

Follow these steps to create and configure the GitHub repository:

## 1. Create Repository on GitHub

1. Go to https://github.com/0xsupremedev
2. Click "New repository" or go to https://github.com/new
3. Repository details:
   - **Owner**: `0xsupremedev`
   - **Repository name**: `basedonchain`
   - **Description**: `AI-powered onchain copilot for Base that simulates, explains, and blocks risky transactions before users sign`
   - **Visibility**: Public (recommended) or Private
   - **Initialize with**: 
     - ✅ Add a README file (we'll replace it)
     - ❌ Add .gitignore (we have one)
     - ❌ Choose a license (we have LICENSE file)
4. Click "Create repository"

## 2. Push Code to GitHub

```bash
# If you haven't initialized git yet
git init

# Add remote repository
git remote add origin https://github.com/0xsupremedev/basedonchain.git

# Add all files
git add .

# Commit
git commit -m "Initial commit: BasedOnchain MVP"

# Push to main branch
git branch -M main
git push -u origin main
```

## 3. Add Repository Labels

You can add labels using the GitHub API or manually through the web interface.

### Option A: Using GitHub CLI (gh)

```bash
# Install GitHub CLI if needed: https://cli.github.com/

# Authenticate
gh auth login

# Create labels from JSON file
gh api repos/0xsupremedev/basedonchain/labels --method POST -f name=bug -f color=d73a4a -f description="Something isn't working"
gh api repos/0xsupremedev/basedonchain/labels --method POST -f name=enhancement -f color=a2eeef -f description="New feature or request"
# ... repeat for each label
```

### Option B: Using GitHub Web Interface

1. Go to your repository
2. Click "Issues" → "Labels"
3. Click "New label"
4. For each label in `.github/labels.json`, create:
   - Name
   - Color (hex code)
   - Description

### Option C: Using GitHub API (curl)

```bash
# Set your GitHub token
export GITHUB_TOKEN=your_token_here

# Create labels (example for bug label)
curl -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/0xsupremedev/basedonchain/labels \
  -d '{"name":"bug","color":"d73a4a","description":"Something isn'\''t working"}'

# Repeat for each label in .github/labels.json
```

## 4. Repository Settings

### Topics/Tags

Add these topics to your repository:
- `base`
- `base-ecosystem`
- `ethereum`
- `web3`
- `blockchain-security`
- `transaction-analysis`
- `ai`
- `nextjs`
- `typescript`
- `prisma`
- `postgresql`

### Repository Description

```
AI-powered onchain copilot for Base that simulates, explains, and blocks risky transactions before users sign. Built with Next.js, TypeScript, and OpenAI.
```

### Website

Add: `https://basedonchain.vercel.app`

### Social Preview

Upload a social preview image (recommended: 1280x640px)

## 5. Branch Protection (Optional but Recommended)

1. Go to Settings → Branches
2. Add rule for `main` branch:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require conversation resolution before merging

## 6. GitHub Actions Secrets

For CI/CD to work, add these secrets in Settings → Secrets and variables → Actions:

- `DATABASE_URL` - PostgreSQL connection string
- `OPENAI_API_KEY` - OpenAI API key
- `VERCEL_TOKEN` - (if using Vercel deployment)
- `VERCEL_ORG_ID` - (if using Vercel deployment)
- `VERCEL_PROJECT_ID` - (if using Vercel deployment)

## 7. Enable GitHub Features

- ✅ Issues
- ✅ Projects
- ✅ Wiki (optional)
- ✅ Discussions (optional)
- ✅ Releases
- ✅ Packages (optional)

## 8. Create Initial Release

1. Go to Releases → "Create a new release"
2. Tag: `v0.1.0`
3. Title: `v0.1.0 - MVP Release`
4. Description:
   ```
   ## Milestone A - MVP Release
   
   Initial release of BasedOnchain with:
   - Transaction decoder
   - AI-powered risk scoring
   - Dashboard and analytics
   - REST API
   - JavaScript/TypeScript SDK
   
   See [docs/grant-proposal.md](docs/grant-proposal.md) for full details.
   ```
5. Publish release

## Quick Setup Script

If you have `gh` CLI installed, you can use this script:

```bash
#!/bin/bash

# Create repo
gh repo create 0xsupremedev/basedonchain --public --description "AI-powered onchain copilot for Base that simulates, explains, and blocks risky transactions before users sign"

# Add remote
git remote add origin https://github.com/0xsupremedev/basedonchain.git

# Push code
git push -u origin main

# Add topics
gh repo edit 0xsupremedev/basedonchain --add-topic base,base-ecosystem,ethereum,web3,blockchain-security,transaction-analysis,ai,nextjs,typescript

# Create labels (you'll need to run this for each label)
# See Option A above for label creation
```

## Verification Checklist

- [ ] Repository created with correct name and description
- [ ] Code pushed to GitHub
- [ ] README displays correctly with tech stack icons
- [ ] All labels created
- [ ] Topics/tags added
- [ ] Website URL set
- [ ] Initial release created (optional)
- [ ] CI/CD secrets configured (if needed)
