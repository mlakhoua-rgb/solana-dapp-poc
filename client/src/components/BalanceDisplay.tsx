import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { FC, useEffect, useState } from "react";

export const BalanceDisplay: FC = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!connection || !publicKey) {
      setBalance(null);
      return;
    }

    const getBalance = async () => {
      try {
        const bal = await connection.getBalance(publicKey);
        setBalance(bal / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance(null);
      }
    };

    getBalance();
    
    // Subscribe to account changes
    const id = connection.onAccountChange(publicKey, (accountInfo) => {
      setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
    });

    return () => {
      connection.removeAccountChangeListener(id);
    };
  }, [connection, publicKey]);

  if (!publicKey) {
    return (
      <div className="cyber-card p-6 rounded-none border-l-4 border-l-muted">
        <h2 className="text-xl font-bold mb-2 text-muted-foreground">Wallet Balance</h2>
        <p className="text-sm text-muted-foreground">Connect your wallet to view balance</p>
      </div>
    );
  }

  return (
    <div className="cyber-card p-6 rounded-none border-l-4 border-l-primary relative group">
      <div className="absolute top-2 right-2 text-[10px] text-primary/50 border border-primary/30 px-1">SOL-DEVNET</div>
      <h2 className="text-xl font-bold mb-2 text-primary tracking-wider">SYSTEM STATUS</h2>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Current Balance</span>
        <div className="text-4xl font-bold text-white font-mono flex items-baseline gap-2">
          {balance !== null ? balance.toFixed(4) : "---"}
          <span className="text-lg text-primary">SOL</span>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-2 right-2 flex gap-1">
        <div className="w-1 h-1 bg-primary animate-pulse"></div>
        <div className="w-1 h-1 bg-primary animate-pulse delay-75"></div>
        <div className="w-1 h-1 bg-primary animate-pulse delay-150"></div>
      </div>
    </div>
  );
};
