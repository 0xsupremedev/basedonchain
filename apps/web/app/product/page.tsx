import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ShieldCheck, Search, Zap, Brain, CheckCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProductPage() {
    return (
        <main className="min-h-screen bg-zinc-950">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                        Understand Every Transaction Before You Sign
                    </h1>
                    <p className="text-lg leading-8 text-zinc-400 mb-10">
                        BasedOnchain is an AI-powered onchain copilot built specifically for Base. It helps users understand, simulate, and assess the risk of transactions before they are signed — preventing wallet drainers, malicious approvals, and hidden value loss.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button asChild size="lg" className="rounded-xl bg-indigo-600 hover:bg-indigo-500">
                            <Link href="/analyze">Analyze a Transaction</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="rounded-xl border-zinc-700 hover:bg-zinc-800">
                            <Link href="/dashboard">View Dashboard</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section className="py-24 bg-zinc-900/30">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">What Problem Are We Solving?</h2>
                        <p className="mt-4 text-lg text-zinc-400">Onchain users lose millions of dollars every year because:</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Unreadable Calldata", desc: "Transaction calldata is often opaque and impossible to read.", icon: Search },
                            { title: "No Simulation", desc: "Wallets do not simulate state changes before signing.", icon: Zap },
                            { title: "Unlimited Approvals", desc: "Approvals are often unlimited and persistent, leading to risk.", icon: AlertTriangle },
                            { title: "Malicious Contracts", desc: "Malicious contracts disguise dangerous behavior.", icon: ShieldCheck }
                        ].map((item, i) => (
                            <div key={i} className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
                                <item.icon className="h-8 w-8 text-indigo-500 mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-zinc-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-center mt-12 text-zinc-300 font-medium">
                        BasedOnchain addresses this by acting as a read-only safety layer that analyzes transactions in advance and explains the real impact.
                    </p>
                </div>
            </section>

            {/* Core Features */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Core Features</h2>
                    </div>

                    <div className="space-y-24">
                        {/* Feature 1 */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-400 ring-1 ring-inset ring-indigo-500/20 mb-6">
                                    Transaction Decoding
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">No more guessing what a transaction does.</h3>
                                <p className="text-lg text-zinc-400 mb-6">BasedOnchain decodes raw transaction calldata and displays:</p>
                                <ul className="space-y-3 text-zinc-300">
                                    {["Function names and parameters", "Token transfers and amounts", "Contract addresses and verification status", "Approval actions and scope"].map(item => (
                                        <li key={item} className="flex items-center gap-3">
                                            <CheckCircle className="h-5 w-5 text-indigo-500" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 aspect-video flex items-center justify-center text-zinc-500 font-mono">
                                [Decoded UI Preview]
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                            <div className="md:order-2">
                                <div className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-400 ring-1 ring-inset ring-indigo-500/20 mb-6">
                                    Pre-Execution Simulation
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">See the future before it happens.</h3>
                                <p className="text-lg text-zinc-400 mb-6">Every transaction is simulated using eth_call to detect:</p>
                                <ul className="space-y-3 text-zinc-300">
                                    {["Balance changes", "Token movements", "Approval changes", "Potential value loss"].map(item => (
                                        <li key={item} className="flex items-center gap-3">
                                            <CheckCircle className="h-5 w-5 text-indigo-500" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="md:order-1 bg-zinc-900 p-8 rounded-2xl border border-zinc-800 aspect-video flex items-center justify-center text-zinc-500 font-mono">
                                [Simulation UI Preview]
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-400 ring-1 ring-inset ring-indigo-500/20 mb-6">
                                    AI-Powered Risk Scoring
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">Plain English Explanations.</h3>
                                <p className="text-lg text-zinc-400 mb-6">Each transaction receives a detailed breakdown:</p>
                                <ul className="space-y-3 text-zinc-300">
                                    {["A risk score (0–100)", "A risk label (Low / Medium / High / Critical)", "Plain-English explanation of risks", "Non-authoritative guidance"].map(item => (
                                        <li key={item} className="flex items-center gap-3">
                                            <Brain className="h-5 w-5 text-indigo-500" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 aspect-video flex items-center justify-center text-zinc-500 font-mono">
                                [Risk Score UI Preview]
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why BasedOnchain */}
            <section className="py-24 bg-indigo-950/20 border-y border-indigo-500/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-8">Why BasedOnchain?</h2>
                    <div className="max-w-3xl mx-auto text-lg text-zinc-300 space-y-6">
                        <p>BasedOnchain is built natively for Base, optimized for its ecosystem, tooling, and user base.</p>
                        <div className="grid md:grid-cols-3 gap-6 text-left mt-12">
                            <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/5">
                                <h4 className="font-bold text-white mb-2">Proactive Simulation</h4>
                                <p className="text-sm text-zinc-400">We simulate transactions before execution, unlike traditional wallets.</p>
                            </div>
                            <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/5">
                                <h4 className="font-bold text-white mb-2">Human Language</h4>
                                <p className="text-sm text-zinc-400">We explain calldata in plain English so you understand what you're signing.</p>
                            </div>
                            <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/5">
                                <h4 className="font-bold text-white mb-2">Prevention First</h4>
                                <p className="text-sm text-zinc-400">We focus on preventing loss, not just reacting after it happens.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
