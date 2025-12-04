import { BalanceDisplay } from "@/components/BalanceDisplay";
import { TransferForm } from "@/components/TransferForm";
import { WalletConnect } from "@/components/WalletConnect";
import { WalletContextProvider } from "@/components/WalletContextProvider";

export default function Home() {
  return (
    <WalletContextProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-black">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary flex items-center justify-center font-bold text-black text-xl">S</div>
              <h1 className="text-xl font-bold tracking-tighter">
                SOLANA<span className="text-primary">.NEXUS</span>
              </h1>
            </div>
            <WalletConnect />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Info & Status */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                  DECENTRALIZED <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    TRANSACTION
                  </span> <br />
                  PROTOCOL
                </h2>
                <p className="text-muted-foreground max-w-md text-lg border-l-2 border-primary/50 pl-4">
                  Secure, high-speed value transfer on the Solana Devnet. Connect your wallet to begin interacting with the blockchain.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-12">
                <div className="p-4 border border-white/10 bg-white/5">
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Network</div>
                  <div className="text-xl font-mono text-primary">DEVNET</div>
                </div>
                <div className="p-4 border border-white/10 bg-white/5">
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Status</div>
                  <div className="text-xl font-mono text-green-500 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    ONLINE
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interaction */}
            <div className="lg:col-span-5 space-y-6">
              <BalanceDisplay />
              <TransferForm />
              
              <div className="text-center text-xs text-muted-foreground font-mono mt-8 opacity-50">
                // SECURE CONNECTION ESTABLISHED
                <br />
                // READY FOR TRANSACTION
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="border-t border-white/10 py-6 bg-black">
          <div className="container mx-auto text-center text-xs text-muted-foreground font-mono">
            SOLANA DAPP POC © 2025 // MANUS AI
          </div>
        </footer>
      </div>
    </WalletContextProvider>
  );
}
