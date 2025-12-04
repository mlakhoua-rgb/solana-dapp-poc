# Architecture & Implementation Guide

## Table of Contents
1. [System Architecture](#system-architecture)
2. [Component Hierarchy](#component-hierarchy)
3. [Data Flow](#data-flow)
4. [Wallet Integration](#wallet-integration)
5. [Transaction Flow](#transaction-flow)
6. [State Management](#state-management)
7. [Build Configuration](#build-configuration)

---

## System Architecture

The Solana dApp PoC follows a client-side architecture with the following layers:

```
┌─────────────────────────────────────────────────────────┐
│                    User Interface Layer                  │
│  (React Components: WalletConnect, BalanceDisplay, etc)  │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                   Business Logic Layer                   │
│  (React Hooks, Form Handling, Transaction Management)   │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              Solana Integration Layer                    │
│  (Wallet Adapter, Web3.js, RPC Connection)             │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  Solana Blockchain                       │
│  (Devnet RPC Endpoint, Wallet Extensions)              │
└─────────────────────────────────────────────────────────┘
```

### Key Design Principles

**Separation of Concerns**: Each component has a single responsibility:
- `WalletContextProvider`: Manages wallet context
- `WalletConnect`: Handles connection UI
- `BalanceDisplay`: Displays balance information
- `TransferForm`: Manages transfer logic

**React Context Pattern**: The Solana wallet context is provided at the application root, making it available to all child components without prop drilling.

**Functional Components**: All components use React functional components with hooks for cleaner, more maintainable code.

---

## Component Hierarchy

```
App
├── ThemeProvider
│   └── TooltipProvider
│       └── Router
│           └── Home
│               └── WalletContextProvider
│                   ├── Header
│                   │   ├── Logo
│                   │   └── WalletConnect
│                   ├── Main
│                   │   ├── Hero Section
│                   │   ├── Status Cards
│                   │   ├── BalanceDisplay
│                   │   └── TransferForm
│                   └── Footer
```

### Component Descriptions

| Component | Location | Purpose |
|-----------|----------|---------|
| `App` | `client/src/App.tsx` | Root component, routing setup |
| `Home` | `client/src/pages/Home.tsx` | Main page layout |
| `WalletContextProvider` | `client/src/components/WalletContextProvider.tsx` | Wallet context setup |
| `WalletConnect` | `client/src/components/WalletConnect.tsx` | Connection button UI |
| `BalanceDisplay` | `client/src/components/BalanceDisplay.tsx` | Balance information |
| `TransferForm` | `client/src/components/TransferForm.tsx` | Transfer interface |

---

## Data Flow

### Wallet Connection Flow

```
User clicks "Select Wallet"
        ↓
WalletMultiButton opens modal
        ↓
User selects Phantom wallet
        ↓
Phantom extension prompts for approval
        ↓
useWallet() hook updates publicKey
        ↓
BalanceDisplay & TransferForm enable
        ↓
Balance fetched and displayed
```

### Balance Update Flow

```
Component mounts (BalanceDisplay)
        ↓
useEffect triggers
        ↓
connection.getBalance(publicKey) called
        ↓
Balance state updated
        ↓
connection.onAccountChange() subscribed
        ↓
Any balance change triggers callback
        ↓
State updated, UI re-renders
        ↓
Component unmounts
        ↓
Subscription cleaned up
```

### Transaction Flow

```
User enters recipient & amount
        ↓
Form validation (React Hook Form + Zod)
        ↓
User clicks "INITIATE TRANSFER"
        ↓
Transaction object created (SystemProgram.transfer)
        ↓
sendTransaction() called via wallet
        ↓
Phantom extension prompts for signature
        ↓
User approves transaction
        ↓
Transaction submitted to network
        ↓
Signature returned
        ↓
Toast notification shown
        ↓
Balance automatically updates via subscription
```

---

## Wallet Integration

### Wallet Adapter Setup

The `WalletContextProvider` component sets up the Solana wallet ecosystem:

```typescript
// Network configuration
const network = WalletAdapterNetwork.Devnet;
const endpoint = clusterApiUrl(network);

// Wallet adapters
const wallets = [new PhantomWalletAdapter()];

// Provider hierarchy
<ConnectionProvider endpoint={endpoint}>
  <WalletProvider wallets={wallets} autoConnect>
    <WalletModalProvider>
      {children}
    </WalletModalProvider>
  </WalletProvider>
</ConnectionProvider>
```

### Available Hooks

The Wallet Adapter provides several useful hooks:

```typescript
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

// In component
const { publicKey, sendTransaction, connected } = useWallet();
const { connection } = useConnection();
```

| Hook | Property | Type | Description |
|------|----------|------|-------------|
| `useWallet()` | `publicKey` | `PublicKey \| null` | Connected wallet address |
| `useWallet()` | `connected` | `boolean` | Connection status |
| `useWallet()` | `sendTransaction` | `Function` | Sign and send transaction |
| `useConnection()` | `connection` | `Connection` | RPC connection instance |

---

## Transaction Flow

### Creating a Transfer Transaction

```typescript
// 1. Validate inputs
const recipientPubKey = new PublicKey(recipient);
const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

// 2. Create transaction
const transaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: publicKey,
    toPubkey: recipientPubKey,
    lamports,
  })
);

// 3. Send transaction
const signature = await sendTransaction(transaction, connection);

// 4. Handle result
console.log(`Transaction: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
```

### Transaction Components

**SystemProgram.transfer()** - Native Solana program for SOL transfers:
- `fromPubkey`: Sender's wallet address
- `toPubkey`: Recipient's wallet address
- `lamports`: Amount to transfer (1 SOL = 1,000,000,000 lamports)

**Transaction Object** - Container for one or more instructions:
- Can include multiple instructions
- Automatically includes recent blockhash
- Requires signer approval

---

## State Management

### Component State

The application uses React's built-in state management:

```typescript
// BalanceDisplay.tsx
const [balance, setBalance] = useState<number | null>(null);

// TransferForm.tsx
const [recipient, setRecipient] = useState("");
const [amount, setAmount] = useState("");
const [isLoading, setIsLoading] = useState(false);
```

### Context State

Wallet state is managed by the Solana Wallet Adapter:

```typescript
const { publicKey, connected, sendTransaction } = useWallet();
const { connection } = useConnection();
```

### Form State

React Hook Form manages form state efficiently:

```typescript
// In TransferForm, form validation is handled by HTML5 + custom validation
<Input
  required
  type="number"
  step="0.000000001"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
/>
```

---

## Build Configuration

### Vite Configuration

**File:** `vite.config.ts`

Key configurations:

```typescript
// Node.js polyfills for Solana Web3.js
nodePolyfills({
  globals: {
    Buffer: true,
    global: true,
    process: true,
  },
})

// Path aliases
resolve: {
  alias: {
    "@": path.resolve(import.meta.dirname, "client", "src"),
  },
}

// Root directory
root: path.resolve(import.meta.dirname, "client"),

// Output directory
build: {
  outDir: path.resolve(import.meta.dirname, "dist/public"),
}
```

### Why Node Polyfills?

Solana Web3.js uses Node.js modules like `crypto`, `buffer`, and `process` that don't exist in browsers. The `vite-plugin-node-polyfills` plugin provides browser-compatible implementations.

### Browser Polyfill Fallback

**File:** `client/index.html`

```html
<script>
  window.global = window;
</script>
```

This ensures that any code referencing the global object works correctly in the browser.

---

## Styling Architecture

### Global Styles

**File:** `client/src/index.css`

The application uses Tailwind CSS 4 with custom OKLCH color variables:

```css
:root {
  --background: oklch(0.05 0 0);      /* Deep black */
  --foreground: oklch(0.98 0 0);      /* Stark white */
  --primary: oklch(0.85 0.2 145);     /* Neon green */
  --secondary: oklch(0.2 0.05 280);   /* Neon purple */
}
```

### Utility Classes

Custom utilities for the cyberpunk theme:

```css
.neon-border {
  box-shadow: 0 0 5px theme('colors.neon-green'),
              0 0 10px theme('colors.neon-green');
}

.cyber-card {
  @apply bg-card border border-primary/30 relative overflow-hidden;
}

.cyber-card::before {
  content: '';
  @apply absolute top-0 left-0 w-full h-1 
         bg-gradient-to-r from-transparent via-primary to-transparent opacity-50;
}
```

### Responsive Design

Tailwind breakpoints are used for responsive layouts:

```typescript
// Example from Home.tsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
  {/* Mobile: 1 column, Desktop: 12 columns */}
</div>
```

---

## Error Handling

### Wallet Errors

```typescript
try {
  const signature = await sendTransaction(transaction, connection);
} catch (error: any) {
  toast.error("Transfer failed", {
    description: error.message || "Unknown error occurred",
  });
}
```

### Balance Fetch Errors

```typescript
try {
  const bal = await connection.getBalance(publicKey);
  setBalance(bal / LAMPORTS_PER_SOL);
} catch (error) {
  console.error("Error fetching balance:", error);
  setBalance(null);
}
```

### Form Validation

```typescript
// HTML5 validation
<Input required type="number" step="0.000000001" />

// Custom validation
try {
  const recipientPubKey = new PublicKey(recipient);
} catch {
  toast.error("Invalid recipient address");
}
```

---

## Performance Optimizations

### Memoization

```typescript
// In WalletContextProvider
const wallets = useMemo(
  () => [new PhantomWalletAdapter()],
  [network]
);
```

### Subscription Cleanup

```typescript
// In BalanceDisplay
useEffect(() => {
  const id = connection.onAccountChange(publicKey, callback);
  return () => connection.removeAccountChangeListener(id);
}, [connection, publicKey]);
```

### Lazy Loading

Components are code-split by route using Wouter's built-in support.

---

## Security Best Practices

### Private Key Safety
- **Never stored locally**: Private keys remain in the wallet extension
- **Wallet Adapter pattern**: All signing delegated to secure wallet
- **No hardcoded keys**: No sensitive data in code

### Transaction Validation
- **Public key validation**: `new PublicKey()` throws on invalid input
- **Amount validation**: Prevents negative or zero transfers
- **User confirmation**: All transactions require explicit approval

### Network Safety
- **Devnet only**: Configured for testnet to prevent mainnet accidents
- **Official RPC**: Uses Solana's public RPC endpoint
- **HTTPS only**: All connections encrypted

---

## Future Enhancements

### Planned Features
1. **Transaction History**: Display recent transactions for the wallet
2. **SPL Token Support**: Transfer any SPL token, not just SOL
3. **Network Switcher**: Toggle between Devnet, Testnet, and Mainnet
4. **Fee Estimation**: Show estimated transaction fees before sending
5. **Advanced Options**: Custom fees, memos, and other transaction options

### Architecture Considerations
- Consider adding a backend service for caching transaction history
- Implement local storage for user preferences (network, theme)
- Add analytics for tracking user interactions
- Consider adding WebSocket support for real-time updates

---

## Troubleshooting

### Common Build Issues

**Issue**: "Cannot find module '@solana/web3.js'"
- **Solution**: Run `pnpm install` to ensure all dependencies are installed

**Issue**: "global is not defined"
- **Solution**: Ensure `window.global = window;` is in index.html before React loads

**Issue**: "Wallet adapter not working"
- **Solution**: Verify WalletContextProvider wraps the entire app in App.tsx

### Runtime Issues

**Issue**: Balance not updating
- **Solution**: Check browser console for connection errors, verify Phantom is connected

**Issue**: Transaction fails with "Blockhash expired"
- **Solution**: This is normal; retry the transaction

**Issue**: "Insufficient funds"
- **Solution**: Request free SOL from Solana Faucet for Devnet

---

## References

- [Solana Web3.js Documentation](https://solana-labs.github.io/solana-web3.js/)
- [Wallet Adapter GitHub](https://github.com/solana-labs/wallet-adapter)
- [Solana Program Library](https://spl.solana.com/)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)

---

**Last Updated**: December 2025
