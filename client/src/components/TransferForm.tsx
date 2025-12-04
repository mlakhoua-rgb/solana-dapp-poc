import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

export const TransferForm: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!publicKey || !connection) {
      toast.error("Wallet not connected");
      return;
    }

    try {
      setIsLoading(true);
      const recipientPubKey = new PublicKey(recipient);
      const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubKey,
          lamports,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      
      toast.success("Transaction sent!", {
        description: `Signature: ${signature.slice(0, 8)}...${signature.slice(-8)}`,
        action: {
          label: "View",
          onClick: () => window.open(`https://explorer.solana.com/tx/${signature}?cluster=devnet`, "_blank"),
        },
      });

      // Reset form
      setAmount("");
      setRecipient("");
      
    } catch (error: any) {
      console.error("Transfer error:", error);
      toast.error("Transfer failed", {
        description: error.message || "Unknown error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cyber-card p-6 rounded-none border-t-4 border-t-secondary mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-secondary tracking-wider">EXECUTE TRANSFER</h2>
        <div className="h-px flex-1 bg-secondary/30 mx-4"></div>
        <div className="w-2 h-2 bg-secondary rotate-45"></div>
      </div>

      <form onSubmit={handleTransfer} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="recipient" className="text-xs uppercase tracking-widest text-muted-foreground">
            Recipient Address
          </Label>
          <div className="relative">
            <Input
              id="recipient"
              placeholder="Wallet Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="bg-black/50 border-secondary/30 focus:border-secondary font-mono text-sm pl-4 h-12 rounded-none"
              disabled={!publicKey || isLoading}
              required
            />
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary/50"></div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount" className="text-xs uppercase tracking-widest text-muted-foreground">
            Amount (SOL)
          </Label>
          <div className="relative">
            <Input
              id="amount"
              type="number"
              step="0.000000001"
              min="0"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-black/50 border-secondary/30 focus:border-secondary font-mono text-sm pl-4 h-12 rounded-none"
              disabled={!publicKey || isLoading}
              required
            />
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary/50"></div>
            <div className="absolute right-4 top-3 text-xs text-muted-foreground font-mono">SOL</div>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-secondary hover:bg-secondary/80 text-white font-bold tracking-widest rounded-none h-12 border border-white/10"
          disabled={!publicKey || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              PROCESSING...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              INITIATE TRANSFER
            </>
          )}
        </Button>
      </form>
    </div>
  );
};
