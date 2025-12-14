import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col">
      <Navbar />
      <div className="flex-grow pt-24 px-4 pb-12">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-zinc-400">Manage your protected assets and view activity.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-zinc-400 text-sm font-medium mb-1">Protected Value</h3>
              <p className="text-2xl font-bold text-white">$0.00</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-zinc-400 text-sm font-medium mb-1">Transactions Analyzed</h3>
              <p className="text-2xl font-bold text-white">0</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-zinc-400 text-sm font-medium mb-1">Risks Blocked</h3>
              <p className="text-2xl font-bold text-white">0</p>
            </div>
          </div>

          <div className="mt-12 text-center py-20 border border-dashed border-zinc-800 rounded-xl">
            <p className="text-zinc-500">Connect your wallet to view your history.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
