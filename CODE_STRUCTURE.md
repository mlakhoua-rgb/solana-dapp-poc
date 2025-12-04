# Code Structure & File Reference

Complete documentation of all source files in the Solana dApp PoC project.

---

## Project Directory Structure

```
solana-dapp-poc/
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── components/              # Reusable React components
│   │   │   ├── WalletContextProvider.tsx
│   │   │   ├── WalletConnect.tsx
│   │   │   ├── BalanceDisplay.tsx
│   │   │   ├── TransferForm.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── ui/                  # shadcn/ui components
│   │   │       ├── button.tsx
│   │   │       ├── input.tsx
│   │   │       ├── label.tsx
│   │   │       └── ...
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.tsx
│   │   │   └── NotFound.tsx
│   │   ├── contexts/                # React context providers
│   │   │   └── ThemeContext.tsx
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── lib/                     # Utility functions
│   │   ├── App.tsx                  # Root component
│   │   ├── main.tsx                 # React entry point
│   │   └── index.css                # Global styles
│   ├── index.html                   # HTML entry point
│   └── public/                      # Static assets
├── server/                          # Backend (Express.js)
│   └── index.ts                     # Server entry point
├── shared/                          # Shared types and constants
│   └── const.ts
├── vite.config.ts                   # Vite build configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Dependencies and scripts
├── pnpm-lock.yaml                   # Dependency lock file
├── README.md                        # Project overview
├── ARCHITECTURE.md                  # Architecture guide
├── DEPENDENCIES.md                  # Dependencies reference
├── SETUP.md                         # Setup instructions
└── CODE_STRUCTURE.md                # This file
```

---

## Source Files Reference

### Frontend Components

#### WalletContextProvider.tsx
**Location**: `client/src/components/WalletContextProvider.tsx`

**Purpose**: Sets up Solana wallet context for the entire application

**Key Exports**:
- `WalletContextProvider`: React component that wraps the app with wallet context

**Dependencies**:
- `@solana/wallet-adapter-base`
- `@solana/wallet-adapter-react`
- `@solana/wallet-adapter-react-ui`
- `@solana/wallet-adapter-phantom`
- `@solana/web3.js`

**Key Functionality**:
```typescript
- Initializes Solana Devnet connection
- Sets up Phantom wallet adapter
- Provides ConnectionProvider and WalletProvider context
- Enables wallet modal for user selection
```

**Props**:
- `children: ReactNode` - Child components to wrap

**Example Usage**:
```typescript
<WalletContextProvider>
  <App />
</WalletContextProvider>
```

---

#### WalletConnect.tsx
**Location**: `client/src/components/WalletConnect.tsx`

**Purpose**: Renders wallet connection button and status indicator

**Key Exports**:
- `WalletConnect`: React component for wallet connection UI

**Dependencies**:
- `@solana/wallet-adapter-react`
- `@solana/wallet-adapter-react-ui`
- `lucide-react`

**Key Functionality**:
```typescript
- Displays WalletMultiButton from wallet adapter
- Shows connection status indicator
- Responsive design (hidden on mobile)
- Glowing border effect for cyberpunk theme
```

**State**:
- `mounted: boolean` - Prevents hydration mismatch

**Example Usage**:
```typescript
<WalletConnect />
```

---

#### BalanceDisplay.tsx
**Location**: `client/src/components/BalanceDisplay.tsx`

**Purpose**: Displays connected wallet's SOL balance with real-time updates

**Key Exports**:
- `BalanceDisplay`: React component for balance display

**Dependencies**:
- `@solana/wallet-adapter-react`
- `@solana/web3.js`

**Key Functionality**:
```typescript
- Fetches SOL balance using connection.getBalance()
- Subscribes to account changes for live updates
- Converts lamports to SOL (1 SOL = 1,000,000,000 lamports)
- Displays network status and connection indicators
- Shows decorative pulsing indicators
```

**State**:
- `balance: number | null` - Current SOL balance

**Hooks Used**:
- `useConnection()` - Get RPC connection
- `useWallet()` - Get connected wallet info

**Example Usage**:
```typescript
<BalanceDisplay />
```

---

#### TransferForm.tsx
**Location**: `client/src/components/TransferForm.tsx`

**Purpose**: Handles SOL transfer form with validation and submission

**Key Exports**:
- `TransferForm`: React component for transfer interface

**Dependencies**:
- `@solana/wallet-adapter-react`
- `@solana/web3.js`
- `react-hook-form`
- `sonner` (toast notifications)
- `lucide-react` (icons)

**Key Functionality**:
```typescript
- Form with recipient address and amount inputs
- Validates recipient as valid Solana public key
- Converts SOL amount to lamports
- Creates SystemProgram.transfer transaction
- Sends transaction via wallet adapter
- Shows success/error toast notifications
- Links to Solana Explorer for transaction verification
```

**State**:
- `recipient: string` - Recipient wallet address
- `amount: string` - Transfer amount in SOL
- `isLoading: boolean` - Loading state during submission

**Hooks Used**:
- `useConnection()` - Get RPC connection
- `useWallet()` - Get wallet for signing

**Example Usage**:
```typescript
<TransferForm />
```

---

#### ErrorBoundary.tsx
**Location**: `client/src/components/ErrorBoundary.tsx`

**Purpose**: Catches React errors and displays fallback UI

**Key Exports**:
- `ErrorBoundary`: React component for error handling

**Key Functionality**:
```typescript
- Catches JavaScript errors in child components
- Displays error message to user
- Logs errors to console
- Prevents white screen of death
```

---

### Page Components

#### Home.tsx
**Location**: `client/src/pages/Home.tsx`

**Purpose**: Main application page with layout and component composition

**Key Exports**:
- `Home`: Default export - main page component

**Key Sections**:
```typescript
1. Header
   - Logo and branding
   - WalletConnect button

2. Main Content
   - Hero section with title
   - Network and status indicators
   - BalanceDisplay component
   - TransferForm component

3. Footer
   - Copyright information
```

**Layout**:
- Responsive grid layout (1 column mobile, 12 columns desktop)
- Asymmetric design with hero on left, forms on right
- Cyberpunk theme with neon colors

**Example Structure**:
```typescript
<WalletContextProvider>
  <div className="min-h-screen flex flex-col">
    <header>...</header>
    <main>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7">Hero Section</div>
        <div className="lg:col-span-5">Forms</div>
      </div>
    </main>
    <footer>...</footer>
  </div>
</WalletContextProvider>
```

---

#### NotFound.tsx
**Location**: `client/src/pages/NotFound.tsx`

**Purpose**: 404 error page for non-existent routes

**Key Exports**:
- `NotFound`: Default export - 404 page component

---

### Context Providers

#### ThemeContext.tsx
**Location**: `client/src/contexts/ThemeContext.tsx`

**Purpose**: Manages application theme (dark/light mode)

**Key Exports**:
- `ThemeProvider`: Context provider component
- `useTheme()`: Hook to access theme state

**Key Functionality**:
```typescript
- Provides theme context to entire app
- Manages dark/light mode switching
- Persists theme preference to localStorage
- Applies theme class to document root
```

**Context Value**:
```typescript
{
  theme: "dark" | "light",
  toggleTheme: () => void,
  setTheme: (theme: string) => void
}
```

---

### Root Components

#### App.tsx
**Location**: `client/src/App.tsx`

**Purpose**: Root component with routing and theme setup

**Key Exports**:
- `App`: Default export - root component

**Key Functionality**:
```typescript
1. Sets up theme provider (defaults to dark)
2. Configures tooltip provider
3. Sets up router with routes
4. Wraps with error boundary
5. Includes toast notifications (Sonner)
```

**Routes**:
- `/` → Home page
- `/404` → Not found page
- `*` → Fallback to not found

---

#### main.tsx
**Location**: `client/src/main.tsx`

**Purpose**: React entry point and DOM rendering

**Key Functionality**:
```typescript
1. Gets root DOM element
2. Creates React root
3. Renders App component
4. Enables React strict mode (development)
```

**Code**:
```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

### Styling

#### index.css
**Location**: `client/src/index.css`

**Purpose**: Global styles and theme configuration

**Key Sections**:
```css
1. Tailwind CSS imports
2. Custom theme variables (OKLCH color space)
3. Dark mode configuration
4. Base layer styles
5. Component layer utilities
6. Custom cyberpunk utilities
```

**Custom Utilities**:
- `.neon-border` - Glowing border effect
- `.neon-text` - Glowing text effect
- `.cyber-card` - Card with top border accent
- `.container` - Responsive container

**Theme Colors**:
- Background: Deep void black (#050505)
- Foreground: Stark white (#FFFFFF)
- Primary: Neon green (#14F195)
- Secondary: Neon purple (#9945FF)

---

### HTML Entry Point

#### index.html
**Location**: `client/index.html`

**Purpose**: HTML entry point for the React application

**Key Elements**:
```html
1. Meta tags for viewport and charset
2. Global window.global polyfill for browser compatibility
3. Root div for React mounting
4. Script tag for React main.tsx
5. Analytics script (Umami)
```

**Important Polyfill**:
```html
<script>
  window.global = window;
</script>
```
This ensures Solana Web3.js works correctly in the browser.

---

### Configuration Files

#### vite.config.ts
**Location**: `vite.config.ts`

**Purpose**: Vite build tool configuration

**Key Configurations**:
```typescript
1. Plugins:
   - React plugin
   - Tailwind CSS plugin
   - JSX location plugin
   - Manus runtime plugin
   - Node polyfills plugin

2. Resolve:
   - Path aliases (@, @shared, @assets)

3. Build:
   - Output directory
   - Empty output on build

4. Server:
   - Port 3000
   - Allowed hosts
   - File system restrictions
```

**Node Polyfills**:
- Buffer: true
- global: true
- process: true

---

#### tsconfig.json
**Location**: `tsconfig.json`

**Purpose**: TypeScript compiler configuration

**Key Settings**:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./client/src/*"],
      "@shared/*": ["./shared/*"]
    }
  }
}
```

---

#### package.json
**Location**: `package.json`

**Purpose**: Project metadata and dependency management

**Key Scripts**:
```json
{
  "dev": "vite --host",           // Start dev server
  "build": "vite build && ...",   // Build for production
  "start": "node dist/index.js",  // Run production build
  "preview": "vite preview --host", // Preview production build
  "check": "tsc --noEmit",        // Type checking
  "format": "prettier --write ."  // Code formatting
}
```

**Dependencies**: 70+ packages including:
- Solana libraries
- React and React DOM
- Tailwind CSS
- shadcn/ui components
- Form management (React Hook Form, Zod)
- And more...

---

### Server Files

#### server/index.ts
**Location**: `server/index.ts`

**Purpose**: Express.js server for production deployment

**Key Functionality**:
```typescript
1. Creates Express app
2. Serves static files from dist/public
3. Handles client-side routing (SPA fallback)
4. Listens on port 3000
```

**Code Structure**:
```typescript
- Import Express
- Create HTTP server
- Serve static files
- Catch-all route for SPA
- Start listening
```

---

### Shared Files

#### shared/const.ts
**Location**: `shared/const.ts`

**Purpose**: Shared constants between frontend and backend

**Typical Contents**:
```typescript
// API endpoints
export const API_BASE_URL = process.env.VITE_API_URL || "http://localhost:3000";

// Feature flags
export const FEATURES = {
  ENABLE_ANALYTICS: true,
  ENABLE_NOTIFICATIONS: false,
};

// Constants
export const SOLANA_NETWORK = "devnet";
```

---

## File Relationships & Dependencies

### Component Dependency Graph

```
App.tsx
├── ThemeProvider (ThemeContext.tsx)
├── TooltipProvider
├── Router (Wouter)
│   └── Home.tsx
│       └── WalletContextProvider.tsx
│           ├── Header
│           │   ├── Logo
│           │   └── WalletConnect.tsx
│           │       └── WalletMultiButton
│           ├── Main
│           │   ├── Hero Section
│           │   ├── Status Cards
│           │   ├── BalanceDisplay.tsx
│           │   │   └── useWallet, useConnection
│           │   └── TransferForm.tsx
│           │       └── useWallet, useConnection
│           └── Footer
└── Sonner (Toast notifications)
```

### Library Dependency Graph

```
Solana Web3.js
├── @solana/wallet-adapter-base
├── @solana/wallet-adapter-react
│   └── @solana/wallet-adapter-react-ui
│       └── Radix UI Components
└── @solana/wallet-adapter-phantom

React 19
├── React DOM
├── Wouter (Router)
├── React Hook Form
│   └── Zod (Validation)
├── Framer Motion (Animations)
└── next-themes (Theme Management)

Styling
├── Tailwind CSS 4
│   └── @tailwindcss/vite
├── shadcn/ui
│   └── Radix UI
└── Lucide React (Icons)

Build Tools
├── Vite
│   ├── @vitejs/plugin-react
│   ├── vite-plugin-node-polyfills
│   └── @tailwindcss/vite
├── TypeScript
├── Prettier
└── ESBuild
```

---

## Code Style & Conventions

### File Naming
- **Components**: PascalCase (e.g., `WalletConnect.tsx`)
- **Pages**: PascalCase (e.g., `Home.tsx`)
- **Utilities**: camelCase (e.g., `formatAddress.ts`)
- **Types**: PascalCase (e.g., `WalletState.ts`)

### Component Structure
```typescript
// Imports
import { FC } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

// Type definitions (if needed)
interface Props {
  title: string;
}

// Component
export const MyComponent: FC<Props> = ({ title }) => {
  const { publicKey } = useWallet();

  return <div>{title}</div>;
};
```

### CSS Class Organization
```typescript
// Tailwind classes organized by:
// 1. Layout (flex, grid, absolute)
// 2. Sizing (w-, h-, p-, m-)
// 3. Colors (bg-, text-, border-)
// 4. Effects (shadow, opacity, transform)
// 5. Responsive (sm:, md:, lg:)
// 6. States (hover:, focus:, active:)

className="flex items-center gap-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
```

---

## Adding New Features

### Adding a New Component

1. Create file in `client/src/components/MyComponent.tsx`
2. Export as named export
3. Import in parent component
4. Use in JSX

### Adding a New Page

1. Create file in `client/src/pages/MyPage.tsx`
2. Export as default export
3. Add route in `App.tsx`
4. Link from navigation

### Adding a New Hook

1. Create file in `client/src/hooks/useMyHook.ts`
2. Export hook function
3. Import in components
4. Use in component

### Adding Styles

1. Use Tailwind classes in JSX
2. Add custom utilities to `index.css` if needed
3. Use CSS variables for theme colors

---

## Testing Structure

When tests are added, they will follow this structure:

```
client/src/
├── components/
│   ├── MyComponent.tsx
│   └── MyComponent.test.tsx
├── hooks/
│   ├── useMyHook.ts
│   └── useMyHook.test.ts
└── lib/
    ├── utils.ts
    └── utils.test.ts
```

---

## Build Output Structure

After running `pnpm build`, the output structure is:

```
dist/
├── public/
│   ├── index.html
│   ├── assets/
│   │   ├── main.abc123.js
│   │   ├── main.abc123.css
│   │   └── vendor.xyz789.js
│   └── favicon.ico
└── index.js (server entry point)
```

---

**Last Updated**: December 2025
