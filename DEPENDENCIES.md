# Dependencies & Libraries Reference

Complete documentation of all dependencies used in the Solana dApp PoC, including their purpose, version, and usage.

---

## Table of Contents
1. [Solana & Web3 Libraries](#solana--web3-libraries)
2. [React & UI Framework](#react--ui-framework)
3. [UI Components & Styling](#ui-components--styling)
4. [Form Management](#form-management)
5. [Build & Development Tools](#build--development-tools)
6. [Utility Libraries](#utility-libraries)

---

## Solana & Web3 Libraries

### @solana/web3.js (v1.98.4)

**Purpose**: Official Solana JavaScript library for blockchain interaction

**Key Features**:
- RPC client for connecting to Solana nodes
- Transaction building and signing
- Account querying and monitoring
- Program interactions

**Usage in Project**:
```typescript
import { Connection, PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js";

// Create RPC connection
const connection = new Connection(clusterApiUrl("devnet"));

// Query balance
const balance = await connection.getBalance(publicKey);

// Create transfer transaction
const transaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: publicKey,
    toPubkey: recipient,
    lamports: amount * LAMPORTS_PER_SOL,
  })
);
```

**Documentation**: [https://solana-labs.github.io/solana-web3.js/](https://solana-labs.github.io/solana-web3.js/)

---

### @solana/wallet-adapter-base (v0.9.27)

**Purpose**: Base classes and interfaces for wallet adapters

**Key Features**:
- Abstract wallet adapter interface
- Common types and enums
- Wallet adapter network definitions

**Usage in Project**:
```typescript
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

const network = WalletAdapterNetwork.Devnet;
```

**Documentation**: [https://github.com/solana-labs/wallet-adapter](https://github.com/solana-labs/wallet-adapter)

---

### @solana/wallet-adapter-react (v0.15.39)

**Purpose**: React hooks and context for wallet management

**Key Features**:
- `useWallet()` hook for wallet state
- `useConnection()` hook for RPC connection
- Context providers for wallet setup
- Auto-connect functionality

**Usage in Project**:
```typescript
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";

// In component
const { publicKey, sendTransaction, connected } = useWallet();
const { connection } = useConnection();

// In App
<ConnectionProvider endpoint={endpoint}>
  <WalletProvider wallets={wallets}>
    {children}
  </WalletProvider>
</ConnectionProvider>
```

**Key Hooks**:

| Hook | Returns | Description |
|------|---------|-------------|
| `useWallet()` | `WalletContextState` | Wallet connection state |
| `useConnection()` | `{ connection }` | RPC connection instance |
| `useLocalStorage()` | `[value, setValue]` | Persistent wallet selection |

**Documentation**: [https://github.com/solana-labs/wallet-adapter](https://github.com/solana-labs/wallet-adapter)

---

### @solana/wallet-adapter-react-ui (v0.9.39)

**Purpose**: Pre-built React UI components for wallet interaction

**Key Features**:
- `WalletMultiButton` component
- `WalletModalProvider` for wallet selection
- Styled components with Tailwind support
- Responsive design

**Usage in Project**:
```typescript
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

// In component
<WalletMultiButton />

// In App
<WalletModalProvider>
  {children}
</WalletModalProvider>
```

**Components**:

| Component | Purpose |
|-----------|---------|
| `WalletMultiButton` | Multi-wallet selector button |
| `WalletConnectButton` | Simple connect button |
| `WalletDisconnectButton` | Disconnect button |
| `WalletModalProvider` | Modal for wallet selection |

**Documentation**: [https://github.com/solana-labs/wallet-adapter](https://github.com/solana-labs/wallet-adapter)

---

### @solana/wallet-adapter-phantom (v0.9.28)

**Purpose**: Phantom wallet adapter for Solana

**Key Features**:
- Phantom wallet integration
- Browser extension detection
- Secure transaction signing

**Usage in Project**:
```typescript
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";

const wallets = [new PhantomWalletAdapter()];
```

**Documentation**: [https://phantom.app](https://phantom.app)

---

### @solana/wallet-adapter-wallets (v0.19.37)

**Purpose**: Collection of wallet adapters for multiple wallet providers

**Key Features**:
- Support for multiple wallet types
- Unified adapter interface
- Easy wallet switching

**Supported Wallets**:
- Phantom
- Ledger
- Solflare
- Torus
- Slope
- Backpack
- And more...

**Documentation**: [https://github.com/solana-labs/wallet-adapter](https://github.com/solana-labs/wallet-adapter)

---

## React & UI Framework

### react (v19.0.0)

**Purpose**: Modern JavaScript library for building user interfaces

**Key Features**:
- Component-based architecture
- Hooks for state management
- Virtual DOM for performance
- JSX syntax

**Usage in Project**:
```typescript
import React, { useState, useEffect, FC } from "react";

const MyComponent: FC = () => {
  const [state, setState] = useState(null);
  
  useEffect(() => {
    // Side effects
  }, []);
  
  return <div>{state}</div>;
};
```

**Documentation**: [https://react.dev](https://react.dev)

---

### react-dom (v19.0.0)

**Purpose**: React package for working with the DOM

**Key Features**:
- DOM rendering
- Event handling
- Portals for modals

**Usage in Project**:
```typescript
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
```

**Documentation**: [https://react.dev/reference/react-dom](https://react.dev/reference/react-dom)

---

### wouter (v3.3.5)

**Purpose**: Lightweight client-side router for React

**Key Features**:
- Minimal bundle size
- Hook-based routing
- No configuration needed
- Hash-based routing support

**Usage in Project**:
```typescript
import { Route, Switch } from "wouter";

<Switch>
  <Route path="/" component={Home} />
  <Route path="/404" component={NotFound} />
  <Route component={NotFound} />
</Switch>
```

**Documentation**: [https://github.com/molefrog/wouter](https://github.com/molefrog/wouter)

---

## UI Components & Styling

### tailwindcss (v4.1.14)

**Purpose**: Utility-first CSS framework for rapid UI development

**Key Features**:
- Utility classes for styling
- Responsive design utilities
- Custom theme configuration
- Minimal CSS output

**Usage in Project**:
```tsx
<div className="bg-background text-foreground p-4 rounded-lg border border-border">
  Content
</div>
```

**Custom Theme Variables**:
```css
:root {
  --background: oklch(0.05 0 0);
  --foreground: oklch(0.98 0 0);
  --primary: oklch(0.85 0.2 145);
}
```

**Documentation**: [https://tailwindcss.com](https://tailwindcss.com)

---

### @tailwindcss/vite (v4.1.3)

**Purpose**: Vite plugin for Tailwind CSS

**Key Features**:
- Fast CSS processing
- Hot module replacement
- Optimized production builds

**Configuration**: Automatically included in `vite.config.ts`

**Documentation**: [https://tailwindcss.com/docs/installation/using-vite](https://tailwindcss.com/docs/installation/using-vite)

---

### shadcn/ui (Built on Radix UI)

**Purpose**: High-quality, accessible React components

**Key Features**:
- Copy-paste component library
- Built on Radix UI primitives
- Fully customizable
- TypeScript support

**Included Components**:
- Button
- Input
- Label
- Card
- Dialog
- Dropdown Menu
- And 40+ more...

**Usage in Project**:
```typescript
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<Button onClick={handleClick}>Click me</Button>
<Input type="text" placeholder="Enter text" />
<Label htmlFor="input">Label</Label>
```

**Documentation**: [https://ui.shadcn.com](https://ui.shadcn.com)

---

### lucide-react (v0.453.0)

**Purpose**: Beautiful, consistent SVG icon library

**Key Features**:
- 1000+ icons
- Customizable size and color
- TypeScript support
- Tree-shakeable

**Usage in Project**:
```typescript
import { Send, Loader2 } from "lucide-react";

<Send className="w-4 h-4" />
<Loader2 className="animate-spin" />
```

**Documentation**: [https://lucide.dev](https://lucide.dev)

---

### sonner (v2.0.7)

**Purpose**: Toast notification system for React

**Key Features**:
- Customizable toast messages
- Success, error, loading states
- Action buttons
- Auto-dismiss

**Usage in Project**:
```typescript
import { toast } from "sonner";

toast.success("Transaction sent!", {
  description: `Signature: ${signature}`,
  action: {
    label: "View",
    onClick: () => window.open(url),
  },
});

toast.error("Transfer failed", {
  description: error.message,
});
```

**Documentation**: [https://sonner.emilkowal.ski](https://sonner.emilkowal.ski)

---

### framer-motion (v12.23.22)

**Purpose**: Animation library for React

**Key Features**:
- Declarative animations
- Gesture animations
- Layout animations
- Variants system

**Usage in Project**:
```typescript
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

**Documentation**: [https://www.framer.com/motion](https://www.framer.com/motion)

---

### next-themes (v0.4.6)

**Purpose**: Theme management for React applications

**Key Features**:
- Dark/light mode switching
- Persistent theme selection
- System preference detection
- No flash on page load

**Usage in Project**:
```typescript
import { ThemeProvider } from "./contexts/ThemeContext";

<ThemeProvider defaultTheme="dark">
  {children}
</ThemeProvider>
```

**Documentation**: [https://github.com/pacocoursey/next-themes](https://github.com/pacocoursey/next-themes)

---

## Form Management

### react-hook-form (v7.64.0)

**Purpose**: Efficient form state management for React

**Key Features**:
- Minimal re-renders
- Built-in validation
- Small bundle size
- TypeScript support

**Usage in Project**:
```typescript
import { useForm } from "react-hook-form";

const { register, handleSubmit, formState: { errors } } = useForm();

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register("email", { required: true })} />
  {errors.email && <span>Email is required</span>}
</form>
```

**Documentation**: [https://react-hook-form.com](https://react-hook-form.com)

---

### zod (v4.1.12)

**Purpose**: TypeScript-first schema validation library

**Key Features**:
- Type-safe validation
- Composable schemas
- Custom validation rules
- Error messages

**Usage in Project**:
```typescript
import { z } from "zod";

const transferSchema = z.object({
  recipient: z.string().refine((val) => {
    try {
      new PublicKey(val);
      return true;
    } catch {
      return false;
    }
  }, "Invalid Solana address"),
  amount: z.number().positive("Amount must be positive"),
});

type TransferInput = z.infer<typeof transferSchema>;
```

**Documentation**: [https://zod.dev](https://zod.dev)

---

### @hookform/resolvers (v5.2.2)

**Purpose**: Resolvers for integrating validation libraries with React Hook Form

**Key Features**:
- Zod integration
- Yup integration
- Joi integration
- And more...

**Usage in Project**:
```typescript
import { zodResolver } from "@hookform/resolvers/zod";

const { control } = useForm({
  resolver: zodResolver(transferSchema),
});
```

**Documentation**: [https://github.com/react-hook-form/resolvers](https://github.com/react-hook-form/resolvers)

---

## Build & Development Tools

### vite (v7.1.7)

**Purpose**: Next-generation frontend build tool

**Key Features**:
- Lightning-fast dev server
- Optimized production builds
- ES modules support
- Plugin ecosystem

**Configuration**: `vite.config.ts`

**Scripts**:
```json
{
  "dev": "vite --host",
  "build": "vite build",
  "preview": "vite preview --host"
}
```

**Documentation**: [https://vitejs.dev](https://vitejs.dev)

---

### @vitejs/plugin-react (v5.0.4)

**Purpose**: Vite plugin for React support

**Key Features**:
- JSX transformation
- Fast refresh
- Automatic React imports

**Configuration**: Automatically included in `vite.config.ts`

**Documentation**: [https://github.com/vitejs/vite-plugin-react](https://github.com/vitejs/vite-plugin-react)

---

### vite-plugin-node-polyfills (v0.24.0)

**Purpose**: Provides Node.js polyfills for browser environments

**Key Features**:
- Buffer polyfill
- Process polyfill
- Global polyfill
- Crypto polyfill

**Configuration**:
```typescript
nodePolyfills({
  globals: {
    Buffer: true,
    global: true,
    process: true,
  },
})
```

**Why Needed**: Solana Web3.js uses Node.js modules that don't exist in browsers

**Documentation**: [https://github.com/davidmyersdev/vite-plugin-node-polyfills](https://github.com/davidmyersdev/vite-plugin-node-polyfills)

---

### typescript (v5.6.3)

**Purpose**: Typed superset of JavaScript

**Key Features**:
- Static type checking
- Better IDE support
- Compile-time error detection
- Modern JavaScript features

**Configuration**: `tsconfig.json`

**Usage**:
```typescript
const greeting: string = "Hello";
const count: number = 42;
const isActive: boolean = true;
```

**Documentation**: [https://www.typescriptlang.org](https://www.typescriptlang.org)

---

### prettier (v3.6.2)

**Purpose**: Code formatter for consistent code style

**Key Features**:
- Opinionated formatting
- Language support
- Editor integration
- Configuration options

**Usage**:
```bash
pnpm format
```

**Configuration**: `.prettierrc` (uses defaults)

**Documentation**: [https://prettier.io](https://prettier.io)

---

### esbuild (v0.25.0)

**Purpose**: JavaScript bundler and minifier

**Key Features**:
- Extremely fast bundling
- Code splitting
- Tree shaking
- Minification

**Usage in Project**: Used in build script for server code

**Documentation**: [https://esbuild.github.io](https://esbuild.github.io)

---

### vitest (v2.1.4)

**Purpose**: Unit testing framework for JavaScript

**Key Features**:
- Vite-native testing
- Jest-compatible API
- Fast test execution
- TypeScript support

**Usage**:
```bash
pnpm test
```

**Documentation**: [https://vitest.dev](https://vitest.dev)

---

## Utility Libraries

### clsx (v2.1.1)

**Purpose**: Utility for constructing className strings conditionally

**Key Features**:
- Conditional class names
- Array/object support
- Small bundle size

**Usage in Project**:
```typescript
import clsx from "clsx";

const buttonClass = clsx(
  "px-4 py-2 rounded",
  isActive && "bg-primary text-white",
  isDisabled && "opacity-50 cursor-not-allowed"
);
```

**Documentation**: [https://github.com/lukeed/clsx](https://github.com/lukeed/clsx)

---

### tailwind-merge (v3.3.1)

**Purpose**: Merge Tailwind CSS classes without conflicts

**Key Features**:
- Resolves class conflicts
- Preserves specificity
- Works with custom classes

**Usage in Project**:
```typescript
import { twMerge } from "tailwind-merge";

const merged = twMerge("px-2 px-4", "text-center"); // px-4 wins
```

**Documentation**: [https://github.com/dcastil/tailwind-merge](https://github.com/dcastil/tailwind-merge)

---

### class-variance-authority (v0.7.1)

**Purpose**: Type-safe component variant system

**Key Features**:
- Variant management
- Type-safe props
- Tailwind CSS integration

**Usage in Project**:
```typescript
import { cva } from "class-variance-authority";

const button = cva("px-4 py-2", {
  variants: {
    intent: {
      primary: "bg-blue-600",
      secondary: "bg-gray-600",
    },
  },
});
```

**Documentation**: [https://cva.style](https://cva.style)

---

### nanoid (v5.1.5)

**Purpose**: Tiny, secure URL-friendly unique string ID generator

**Key Features**:
- Cryptographically secure
- URL-friendly
- Extremely small
- No dependencies

**Usage in Project**:
```typescript
import { nanoid } from "nanoid";

const id = nanoid(); // "V1StGXR_Z5j3eK4m"
```

**Documentation**: [https://github.com/ai/nanoid](https://github.com/ai/nanoid)

---

### axios (v1.12.0)

**Purpose**: Promise-based HTTP client

**Key Features**:
- Request/response interceptors
- Request cancellation
- Timeout support
- JSON transformation

**Usage in Project**:
```typescript
import axios from "axios";

const response = await axios.get("/api/data");
```

**Documentation**: [https://axios-http.com](https://axios-http.com)

---

### express (v4.21.2)

**Purpose**: Node.js web application framework

**Key Features**:
- Routing
- Middleware
- Static file serving
- Error handling

**Usage in Project**: Server-side rendering and API routes (if needed)

**Documentation**: [https://expressjs.com](https://expressjs.com)

---

## Optional/Future Dependencies

### embla-carousel-react (v8.6.0)

**Purpose**: Carousel/slider component for React

**Status**: Included but not currently used

**Documentation**: [https://www.embla-carousel.com](https://www.embla-carousel.com)

---

### react-resizable-panels (v3.0.6)

**Purpose**: Resizable panel layout component

**Status**: Included but not currently used

**Documentation**: [https://github.com/bvaughn/react-resizable-panels](https://github.com/bvaughn/react-resizable-panels)

---

### recharts (v2.15.2)

**Purpose**: React charting library

**Status**: Included but not currently used

**Use Case**: For transaction history charts or analytics

**Documentation**: [https://recharts.org](https://recharts.org)

---

### streamdown (v1.4.0)

**Purpose**: Markdown rendering for React

**Status**: Included but not currently used

**Documentation**: [https://github.com/ifiokjr/streamdown](https://github.com/ifiokjr/streamdown)

---

## Dependency Management

### pnpm (v10.4.1)

**Purpose**: Fast, disk space efficient package manager

**Key Features**:
- Monorepo support
- Strict dependency resolution
- Faster installation
- Better disk space usage

**Usage**:
```bash
pnpm install
pnpm add <package>
pnpm remove <package>
pnpm update
```

**Documentation**: [https://pnpm.io](https://pnpm.io)

---

## Summary Table

| Category | Library | Version | Purpose |
|----------|---------|---------|---------|
| **Solana** | @solana/web3.js | 1.98.4 | Blockchain interaction |
| **Solana** | @solana/wallet-adapter-react | 0.15.39 | Wallet management |
| **Solana** | @solana/wallet-adapter-react-ui | 0.9.39 | Wallet UI components |
| **React** | react | 19.0.0 | UI library |
| **Styling** | tailwindcss | 4.1.14 | CSS framework |
| **Components** | shadcn/ui | Latest | UI components |
| **Icons** | lucide-react | 0.453.0 | Icon library |
| **Forms** | react-hook-form | 7.64.0 | Form management |
| **Validation** | zod | 4.1.12 | Schema validation |
| **Build** | vite | 7.1.7 | Build tool |
| **Build** | vite-plugin-node-polyfills | 0.24.0 | Node polyfills |
| **Language** | typescript | 5.6.3 | Type safety |

---

## Installation & Updates

### Install All Dependencies
```bash
pnpm install
```

### Update All Dependencies
```bash
pnpm update
```

### Check for Outdated Packages
```bash
pnpm outdated
```

### Install Specific Package
```bash
pnpm add <package-name>
```

### Remove Package
```bash
pnpm remove <package-name>
```

---

## Performance Impact

### Bundle Size Analysis

**Key Contributors**:
- @solana/web3.js: ~500KB (with dependencies)
- React: ~42KB
- Tailwind CSS: ~15KB (production)
- shadcn/ui components: ~5-10KB (per component)

**Optimization Strategies**:
1. Code splitting by route
2. Tree-shaking unused code
3. Minification in production
4. Lazy loading components
5. Image optimization

---

## Security Considerations

### Dependency Auditing

```bash
# Check for security vulnerabilities
pnpm audit

# Fix vulnerabilities
pnpm audit --fix
```

### Trusted Sources
- All dependencies from npm registry
- No custom/forked versions
- Regular security updates

### Key Security Packages
- **@solana/web3.js**: Cryptographic operations
- **zod**: Input validation
- **vite-plugin-node-polyfills**: Safe polyfills

---

**Last Updated**: December 2025
