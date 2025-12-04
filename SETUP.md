# Setup & Installation Guide

Complete step-by-step guide to set up and run the Solana dApp PoC locally.

---

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Prerequisites](#prerequisites)
3. [Installation Steps](#installation-steps)
4. [Configuration](#configuration)
5. [Running the Application](#running-the-application)
6. [Building for Production](#building-for-production)
7. [Troubleshooting](#troubleshooting)

---

## System Requirements

### Minimum Requirements
- **OS**: Windows, macOS, or Linux
- **Node.js**: 18.0.0 or higher
- **RAM**: 2GB minimum (4GB recommended)
- **Disk Space**: 500MB for dependencies and build artifacts
- **Internet**: Required for npm packages and Solana RPC

### Recommended Setup
- **Node.js**: 20.x or 22.x LTS
- **RAM**: 8GB or more
- **SSD**: For faster build times
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

### Supported Operating Systems
- macOS 10.15+
- Windows 10/11
- Ubuntu 20.04+
- Debian 11+
- Other Linux distributions

---

## Prerequisites

### 1. Node.js & npm/pnpm

**Check if Node.js is installed:**
```bash
node --version
npm --version
```

**If not installed, download from:**
- [https://nodejs.org](https://nodejs.org) (LTS version recommended)

**Verify installation:**
```bash
node -v  # Should output v18.0.0 or higher
npm -v   # Should output 9.0.0 or higher
```

### 2. pnpm (Package Manager)

**Install pnpm globally:**
```bash
npm install -g pnpm@10.4.1
```

**Verify installation:**
```bash
pnpm --version  # Should output 10.4.1
```

### 3. Git

**Check if Git is installed:**
```bash
git --version
```

**If not installed, download from:**
- [https://git-scm.com](https://git-scm.com)

### 4. Phantom Wallet (Browser Extension)

**Install Phantom Wallet:**
1. Visit [https://phantom.app](https://phantom.app)
2. Click "Download Extension"
3. Select your browser (Chrome, Firefox, Safari, or Edge)
4. Add extension to your browser
5. Create a new wallet or import existing one

**Create Devnet Wallet:**
1. Open Phantom extension
2. Click the network selector (top-right)
3. Select "Devnet"
4. Create or import a wallet

### 5. Solana Devnet SOL (for testing)

**Get free SOL from Solana Faucet:**
1. Visit [https://faucet.solana.com](https://faucet.solana.com)
2. Paste your Devnet wallet address
3. Request SOL (2 SOL per request, up to 24 SOL per day)
4. Wait for confirmation (usually instant)

**Verify balance in Phantom:**
1. Open Phantom extension
2. Check balance shows SOL amount

---

## Installation Steps

### Step 1: Clone the Repository

```bash
# Clone from GitHub
git clone https://github.com/mlakhoua-rgb/solana-dapp-poc.git

# Navigate to project directory
cd solana-dapp-poc
```

### Step 2: Install Dependencies

```bash
# Install all dependencies using pnpm
pnpm install

# This will:
# - Download all npm packages
# - Install Solana libraries
# - Set up development tools
# - Create node_modules directory
```

**Expected output:**
```
Progress: resolved 1474, reused 677, downloaded 710, added 782, done
Done in 18.3s using pnpm v10.4.1
```

### Step 3: Verify Installation

```bash
# Check TypeScript compilation
pnpm check

# This should complete without errors
```

### Step 4: (Optional) Install Specific Solana Wallet Adapters

The project includes Phantom by default. To add other wallets:

```bash
# Add Ledger wallet support
pnpm add @solana/wallet-adapter-ledger

# Add Solflare wallet support
pnpm add @solana/wallet-adapter-solflare

# Then update WalletContextProvider.tsx to include them
```

---

## Configuration

### 1. Environment Variables

The application uses environment variables for configuration. Create a `.env` file in the project root:

```bash
# .env
VITE_APP_TITLE=Solana dApp PoC
VITE_APP_LOGO=/logo.png
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id
```

**Available Variables:**

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `VITE_APP_TITLE` | string | "Solana dApp PoC" | Application title |
| `VITE_APP_LOGO` | string | "/logo.png" | Logo URL |
| `VITE_ANALYTICS_ENDPOINT` | string | "" | Analytics service endpoint |
| `VITE_ANALYTICS_WEBSITE_ID` | string | "" | Analytics website ID |

### 2. Network Configuration

**To change network (Devnet/Testnet/Mainnet):**

Edit `client/src/components/WalletContextProvider.tsx`:

```typescript
// Change this line:
const network = WalletAdapterNetwork.Devnet;

// To one of:
const network = WalletAdapterNetwork.Testnet;
const network = WalletAdapterNetwork.Mainnet;
```

**Network Details:**

| Network | RPC Endpoint | Use Case |
|---------|-------------|----------|
| **Devnet** | `https://api.devnet.solana.com` | Development & testing |
| **Testnet** | `https://api.testnet.solana.com` | Pre-production testing |
| **Mainnet** | `https://api.mainnet-beta.solana.com` | Production (real SOL) |

### 3. Wallet Configuration

**To add more wallet adapters:**

Edit `client/src/components/WalletContextProvider.tsx`:

```typescript
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { LedgerWalletAdapter } from "@solana/wallet-adapter-ledger";

const wallets = useMemo(
  () => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new LedgerWalletAdapter(),
  ],
  [network]
);
```

---

## Running the Application

### Development Server

**Start the development server:**

```bash
pnpm dev
```

**Expected output:**
```
  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.1.100:3000/
```

**Access the application:**
- Open browser to `http://localhost:3000`
- The page will hot-reload on file changes
- Open browser DevTools for debugging (F12)

### Development Server Options

```bash
# Run with specific host
pnpm dev -- --host 0.0.0.0

# Run with specific port
pnpm dev -- --port 5173

# Run with HTTPS
pnpm dev -- --https
```

### Hot Module Replacement (HMR)

The development server supports HMR, which means:
- Changes to React components reload instantly
- Changes to CSS reload without full page refresh
- Component state is preserved when possible

---

## Building for Production

### Build Process

```bash
# Create optimized production build
pnpm build

# This will:
# - Compile TypeScript
# - Bundle JavaScript
# - Optimize CSS
# - Minify code
# - Create dist/ directory
```

**Expected output:**
```
✓ 1234 modules transformed
dist/public/index.html                 2.45 kB
dist/public/assets/main.abc123.js    145.67 kB
dist/public/assets/main.abc123.css     5.23 kB
```

### Preview Production Build

```bash
# Start production server locally
pnpm preview

# Access at http://localhost:4173
```

### Build Optimization Tips

1. **Code Splitting**: Routes are automatically split
2. **Tree Shaking**: Unused code is removed
3. **Minification**: All code is minified
4. **CSS Purging**: Unused CSS is removed
5. **Image Optimization**: Images are optimized

### Production Deployment

The `dist/public` directory contains the production build:

```bash
# Deploy to static hosting:
# - Vercel
# - Netlify
# - GitHub Pages
# - AWS S3 + CloudFront
# - Any static hosting service
```

---

## Development Workflow

### Typical Development Session

```bash
# 1. Start development server
pnpm dev

# 2. Open browser to http://localhost:3000

# 3. Make code changes in your editor

# 4. Changes automatically reload in browser

# 5. Check console for errors (F12)

# 6. When done, press Ctrl+C to stop server
```

### Code Quality

```bash
# Format code with Prettier
pnpm format

# Check TypeScript types
pnpm check

# Run tests (when added)
pnpm test
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "Add my feature"

# Push to GitHub
git push origin feature/my-feature

# Create Pull Request on GitHub
```

---

## Troubleshooting

### Common Installation Issues

#### Issue: "pnpm: command not found"
**Solution:**
```bash
npm install -g pnpm@10.4.1
```

#### Issue: "node_modules not found"
**Solution:**
```bash
# Remove lock file and reinstall
rm -rf pnpm-lock.yaml node_modules
pnpm install
```

#### Issue: "Port 3000 already in use"
**Solution:**
```bash
# Use different port
pnpm dev -- --port 5173

# Or kill process using port 3000
# On macOS/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Common Runtime Issues

#### Issue: "Wallet not connected"
**Solution:**
1. Ensure Phantom wallet extension is installed
2. Create a wallet in Phantom
3. Refresh the page
4. Click "Select Wallet" button

#### Issue: "Insufficient balance"
**Solution:**
1. Go to [https://faucet.solana.com](https://faucet.solana.com)
2. Paste your Devnet wallet address
3. Request SOL
4. Wait for confirmation

#### Issue: "Invalid recipient address"
**Solution:**
1. Ensure recipient address is 44 characters
2. Verify it's a valid base58 Solana address
3. Check for typos

#### Issue: "Transaction failed"
**Solution:**
1. Check balance is sufficient
2. Verify recipient address is correct
3. Wait a moment and retry
4. Check Solana network status

### Build Issues

#### Issue: "Build failed - memory limit exceeded"
**Solution:**
```bash
# Increase Node.js memory limit
NODE_OPTIONS=--max-old-space-size=4096 pnpm build
```

#### Issue: "Cannot find module '@solana/web3.js'"
**Solution:**
```bash
# Reinstall dependencies
pnpm install

# Clear cache
pnpm store prune
pnpm install
```

### Development Server Issues

#### Issue: "Hot reload not working"
**Solution:**
1. Restart development server: `pnpm dev`
2. Clear browser cache (Ctrl+Shift+Delete)
3. Hard refresh page (Ctrl+Shift+R)

#### Issue: "TypeScript errors in editor"
**Solution:**
```bash
# Run type check
pnpm check

# Restart TypeScript server in your editor
# VS Code: Cmd+Shift+P > "TypeScript: Restart TS Server"
```

### Browser Issues

#### Issue: "Phantom wallet not detected"
**Solution:**
1. Ensure Phantom extension is installed
2. Check extension is enabled
3. Refresh page
4. Try different browser

#### Issue: "Network errors in console"
**Solution:**
1. Check internet connection
2. Verify Solana network is operational
3. Try different RPC endpoint
4. Check browser firewall settings

---

## Performance Optimization

### Development Performance

```bash
# Use faster builds with esbuild
# (Already configured in vite.config.ts)

# Monitor bundle size
pnpm build --analyze
```

### Runtime Performance

1. **Lazy Loading**: Components load on demand
2. **Code Splitting**: Routes split automatically
3. **Caching**: Browser caches assets
4. **Compression**: Assets are gzipped

---

## Security Best Practices

### Local Development

1. **Never commit `.env` files**: Add to `.gitignore`
2. **Use environment variables**: For sensitive data
3. **Keep dependencies updated**: Run `pnpm update`
4. **Check for vulnerabilities**: Run `pnpm audit`

### Production Deployment

1. **Use HTTPS**: Always use secure connections
2. **Set CSP headers**: Content Security Policy
3. **Disable source maps**: In production builds
4. **Monitor dependencies**: For security updates

---

## Next Steps

After successful setup:

1. **Explore the code**: Read through components
2. **Connect wallet**: Test wallet connection
3. **Request Devnet SOL**: Get test tokens
4. **Make a transfer**: Test the transfer feature
5. **Review architecture**: Read ARCHITECTURE.md
6. **Check dependencies**: Read DEPENDENCIES.md

---

## Getting Help

### Resources

- **Solana Docs**: [https://docs.solana.com](https://docs.solana.com)
- **Web3.js Docs**: [https://solana-labs.github.io/solana-web3.js/](https://solana-labs.github.io/solana-web3.js/)
- **Wallet Adapter**: [https://github.com/solana-labs/wallet-adapter](https://github.com/solana-labs/wallet-adapter)
- **React Docs**: [https://react.dev](https://react.dev)
- **Vite Docs**: [https://vitejs.dev](https://vitejs.dev)

### Support Channels

- **GitHub Issues**: Report bugs on the repository
- **Stack Overflow**: Tag questions with `solana` and `web3.js`
- **Solana Discord**: [https://discord.gg/solana](https://discord.gg/solana)
- **Phantom Support**: [https://phantom.app/support](https://phantom.app/support)

---

**Last Updated**: December 2025
