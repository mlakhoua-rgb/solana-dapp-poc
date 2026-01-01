import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock Solana wallet adapter
vi.mock('@solana/wallet-adapter-react', () => ({
  useWallet: () => ({
    publicKey: null,
    connected: false,
    connecting: false,
    disconnect: vi.fn(),
    wallet: null,
    wallets: [],
    select: vi.fn(),
    connect: vi.fn(),
    sendTransaction: vi.fn(),
  }),
  useConnection: () => ({
    connection: {
      getBalance: vi.fn().mockResolvedValue(1000000000),
      onAccountChange: vi.fn().mockReturnValue(1),
      removeAccountChangeListener: vi.fn(),
    },
  }),
  WalletProvider: ({ children }: { children: React.ReactNode }) => children,
  ConnectionProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock Solana wallet adapter UI
vi.mock('@solana/wallet-adapter-react-ui', () => ({
  WalletModalProvider: ({ children }: { children: React.ReactNode }) => children,
  WalletMultiButton: () => <button>Connect Wallet</button>,
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
