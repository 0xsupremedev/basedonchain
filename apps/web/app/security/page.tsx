import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Shield, Lock, Eye, AlertCircle, Database, Server, Brain } from "lucide-react"

export default function SecurityPage() {
    return (
        <main className="min-h-screen bg-zinc-950">
            <Navbar />

            <section className="pt-32 pb-16 px-6 lg:px-8 max-w-7xl mx-auto text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                    Security First, Always Non-Custodial
                </h1>
                <p className="text-lg leading-8 text-zinc-400 max-w-2xl mx-auto">
                    BasedOnchain is designed as a non-custodial, read-only security layer. We never take control of user funds or wallets.
                </p>
            </section>

            <section className="py-16 bg-zinc-900/30">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-white mb-8 text-center">What We Never Access</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            "Store private keys",
                            "Request seed phrases",
                            "Sign transactions",
                            "Move user funds",
                            "Execute transactions on behalf of users"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 bg-zinc-900 p-4 rounded-xl border border-red-500/20">
                                <AlertCircle className="h-6 w-6 text-red-500" />
                                <span className="text-zinc-300">{item}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-center mt-8 text-zinc-500">All analysis is performed on public blockchain data or unsigned transactions.</p>
                </div>
            </section>

            <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">How Transaction Analysis Works</h2>
                        <ul className="space-y-6">
                            {[
                                "Transaction data is decoded",
                                "Known risk heuristics are applied",
                                "The transaction is simulated via eth_call",
                                "AI generates a structured explanation",
                                "A risk score and recommendation are returned"
                            ].map((step, i) => (
                                <li key={i} className="flex gap-4">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                                        {i + 1}
                                    </div>
                                    <span className="text-lg text-zinc-300">{step}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-8 text-indigo-400 font-medium">The final decision always belongs to the user.</p>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Eye className="h-5 w-5 text-indigo-500" /> Risk Detection Techniques
                            </h3>
                            <ul className="space-y-2 text-zinc-400 list-disc list-inside">
                                <li>Unlimited token approvals</li>
                                <li>Interactions with known malicious contracts</li>
                                <li>Suspicious function signatures</li>
                                <li>Abnormally large value transfers</li>
                                <li>Calls to unverified or newly deployed contracts</li>
                            </ul>
                        </div>

                        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Brain className="h-5 w-5 text-indigo-500" /> AI Safety & Explainability
                            </h3>
                            <p className="text-zinc-400 mb-4">AI is used only for explanation and categorization, not enforcement.</p>
                            <div className="grid grid-cols-2 gap-4">
                                {["Structured prompts", "Output sanitization", "No autonomous decision-making", "Clear disclaimers"].map(tag => (
                                    <div key={tag} className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-center">
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-indigo-950/20 border-y border-indigo-500/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-white mb-8">Infrastructure Security</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {["HTTPS enforced", "Rate-limited APIs", "Strict input validation", "Secrets stored securely", "Database access via Prisma ORM", "Continuous dependency scanning"].map(item => (
                            <div key={item} className="flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-800">
                                <Lock className="h-4 w-4 text-green-500" />
                                <span className="text-zinc-300 text-sm">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Responsible Disclosure</h2>
                <p className="text-zinc-400 max-w-xl mx-auto">
                    If you discover a security issue, please report it responsibly. We take security reports seriously and respond promptly.
                </p>
            </section>

            <Footer />
        </main>
    )
}
