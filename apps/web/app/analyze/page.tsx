import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function AnalyzePage() {
  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col">
      <Navbar />
      <div className="flex-grow pt-24 px-4 pb-12">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-white mb-4">Analyze Transaction</h1>
            <p className="text-zinc-400">
              Paste a transaction hash, address, or raw calldata to simulate and check for risks.
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 shadow-xl">
            <div className="flex gap-4">
              <Input
                placeholder="0x..."
                className="flex-grow bg-black/50 border-zinc-700 text-white placeholder:text-zinc-600 rounded-xl h-12"
              />
              <Button className="h-12 px-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl">
                <Search className="mr-2 h-4 w-4" />
                Analyze
              </Button>
            </div>

            <div className="mt-8 text-center border-t border-white/5 pt-8">
              <p className="text-sm text-zinc-500 mb-4">Or try a sample transaction</p>
              <div className="flex flex-wrap justify-center gap-2">
                <button className="text-xs px-3 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors">
                  Uniswap Swap
                </button>
                <button className="text-xs px-3 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors">
                  NFT Mint
                </button>
                <button className="text-xs px-3 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors">
                  Approval (0x0)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
