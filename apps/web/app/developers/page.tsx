import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Code2, Terminal, Webhook, Box, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DevelopersPage() {
    return (
        <main className="min-h-screen bg-zinc-950">
            <Navbar />

            <section className="pt-32 pb-16 px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                            Build Safer Onchain Experiences on Base
                        </h1>
                        <p className="text-lg leading-8 text-zinc-400 mb-8">
                            BasedOnchain provides APIs and SDKs that allow developers to embed transaction simulation and AI risk analysis directly into their applications.
                        </p>
                        <div className="flex gap-4">
                            <Button asChild className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl">
                                <Link href="#get-started">Get Started</Link>
                            </Button>
                            <Button asChild variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800 rounded-xl">
                                <Link href="/docs">Read the Docs</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="mt-12 lg:mt-0 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 font-mono text-sm relative">
                        <div className="absolute top-4 right-4 flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <pre className="text-indigo-300 mt-6 overflow-x-auto">
                            {`import { analyzeTx } from "@basedonchain/sdk";

const analysis = await analyzeTx({
  to: "0x...",
  data: "0x...",
  value: "0"
});

console.log(analysis); 
// { 
//   riskScore: 87, 
//   label: "HIGH", 
//   explanation: "..." 
// }`}
                        </pre>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-zinc-900/30">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {[
                            { title: "Wallet Developers", icon: Box },
                            { title: "DeFi Protocols", icon: Terminal },
                            { title: "NFT Marketplaces", icon: Code2 },
                            { title: "DAO Tooling", icon: Webhook },
                            { title: "Analytics Platforms", icon: ArrowRight }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 bg-zinc-950 p-6 rounded-xl border border-zinc-800">
                                <div className="bg-indigo-500/10 p-3 rounded-lg">
                                    <item.icon className="h-6 w-6 text-indigo-500" />
                                </div>
                                <h3 className="font-bold text-white">{item.title}</h3>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-8">Core API</h2>
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="bg-green-500/10 text-green-500 font-bold px-3 py-1 rounded text-sm">POST</span>
                            <code className="text-zinc-300 text-lg">/api/analyze</code>
                        </div>
                        <p className="text-zinc-400 mb-6">Submit a transaction hash or unsigned transaction and receive risk score, label, explanation, and recommendation.</p>

                        <div className="bg-black/50 p-6 rounded-xl border border-white/5 font-mono text-sm text-zinc-400">
                            <pre>
                                {`{
  "riskScore": 87,
  "label": "HIGH",
  "explanation": "This transaction grants unlimited token approval to an unverified contract.",
  "recommendedAction": "DO_NOT_SIGN"
}`}
                            </pre>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">Developer Features</h2>
                            <ul className="space-y-4">
                                {["REST API", "JavaScript SDK", "Webhooks (planned)", "Rate limiting", "Base-native support"].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-zinc-300">
                                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">Built With</h2>
                            <div className="flex flex-wrap gap-2">
                                {["TypeScript", "Next.js", "ethers.js", "Wagmi", "Base RPC"].map(item => (
                                    <div key={item} className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="get-started" className="py-24 text-center">
                <h2 className="text-3xl font-bold text-white mb-8">Get Started</h2>
                <div className="flex justify-center gap-6">
                    <Link href="/docs" className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-2">
                        Read the Docs <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href="https://github.com/basedonchain" className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-2">
                        View GitHub <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}
