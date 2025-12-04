import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FC, useEffect, useState } from "react";

export const WalletConnect: FC = () => {
  const { publicKey } = useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        <div className="relative">
          <WalletMultiButton className="!bg-black !text-primary !border !border-primary/50 !font-mono !rounded-none hover:!bg-primary/10 transition-all" />
        </div>
      </div>
      {publicKey && (
        <div className="hidden md:block text-xs text-muted-foreground font-mono">
          <span className="text-primary">●</span> Connected
        </div>
      )}
    </div>
  );
};
