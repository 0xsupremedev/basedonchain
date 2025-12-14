"use client";

import Link from "next/link";
import {
    ShieldAlert,
    FileWarning,
    ShieldX,
    Search,
    Brain,
    Zap,
    Lock,
    Code2,
    CheckCircle,
    Terminal
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProblemSection() {
    const problems = [
        {
            title: "Wallet Drainers",
            description: "Malicious contracts steal assets instantly upon approval.",
            icon: ShieldX,
        },
        {
            title: "Unreadable Transactions",
            description: "Users sign blinded calldata they don't understand.",
            icon: FileWarning,
        },
        {
            title: "No Safety Net",
            description: "Once you sign on Base, there's no undo functionality.",
            icon: ShieldAlert,
        },
        {
            title: "Complex Security",
            description: "Existing tools are hard to use and lack clear explanations.",
            icon: Lock,
        },
    ];

    return (
        <section id="problem" className="py-24 bg-zinc-950 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Why BasedOnchain?
                    </h2>
                    <p className="mt-4 text-lg text-zinc-400">
                        The Base ecosystem is growing fast, but so are the threats. Don't let your wallet be the next victim.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {problems.map((item, index) => (
                        <div
                            key={index}
                            className="group relative rounded-2xl border border-white/5 bg-white/5 p-6 hover:bg-white/10 transition-colors"
                        >
                            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-red-500/10 p-3 text-red-400 group-hover:bg-red-500/20 transition-colors">
                                <item.icon className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-white">
                                {item.title}
                            </h3>
                            <p className="text-sm text-zinc-400">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function HowItWorksSection() {
    const steps = [
        {
            step: 1,
            title: "Connect Wallet",
            description: "Connect MetaMask or Coinbase Wallet safely.",
        },
        {
            step: 2,
            title: "Simulate Transaction",
            description: "We verify the transaction outcome before you sign.",
        },
        {
            step: 3,
            title: "AI Analysis",
            description: "Our AI explains risks in plain English.",
        },
        {
            step: 4,
            title: "Sign or Block",
            description: "Proceed with confidence or block the threat.",
        },
    ];

    return (
        <section id="how-it-works" className="py-24 bg-zinc-900/50 border-y border-white/5">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        How It Works
                    </h2>
                </div>
                <div className="grid gap-8 md:grid-cols-4">
                    {steps.map((item, index) => (
                        <div key={index} className="relative flex flex-col items-center text-center">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white shadow-lg ring-4 ring-zinc-900">
                                {item.step}
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-white">
                                {item.title}
                            </h3>
                            <p className="text-sm text-zinc-400">{item.description}</p>
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-6 left-1/2 w-full h-[2px] bg-zinc-800 -z-10" style={{ transform: 'translateX(50%)' }} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function FeaturesSection() {
    const features = [
        {
            title: "Transaction Decoder",
            description: "Human-readable summaries of complex contracts.",
            icon: Search,
        },
        {
            title: "AI Risk Engine",
            description: "Real-time risk scoring and plain-English explanations.",
            icon: Brain,
        },
        {
            title: "Pre-Sign Simulation",
            description: "Preview state changes and value at risk instantly.",
            icon: Zap,
        },
        {
            title: "Approval Manager",
            description: "Detect and revoke unlimited token approvals.",
            icon: CheckCircle,
        },
    ];

    return (
        <section id="features" className="py-24 bg-zinc-950">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Core Security Features
                    </h2>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 hover:border-indigo-500/50 transition-colors"
                        >
                            <feature.icon className="mb-4 h-8 w-8 text-indigo-400" />
                            <h3 className="mb-2 text-xl font-semibold text-white">
                                {feature.title}
                            </h3>
                            <p className="text-zinc-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function DeveloperSection() {
    return (
        <section id="developers" className="py-24 bg-zinc-900/30 border-y border-white/5 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300 mb-6">
                        <Code2 className="mr-2 h-4 w-4" />
                        For Developers
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                        Integrate Safety into Your App
                    </h2>
                    <p className="text-lg text-zinc-400 mb-8">
                        Use our SDK to protect your users directly within your dApp. Simulates transactions and provides risk scores in milliseconds.
                    </p>
                    <div className="flex gap-4">
                        <Button asChild className="rounded-xl bg-white text-black hover:bg-zinc-200">
                            <Link href="/docs">View API Docs</Link>
                        </Button>
                        <Button asChild variant="outline" className="rounded-xl border-zinc-700 text-white hover:bg-zinc-800 hover:text-white">
                            <Link href="https://github.com/basedonchain">GitHub Repo</Link>
                        </Button>
                    </div>
                </div>
                <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-6 font-mono text-sm relative shadow-2xl">
                    <div className="flex gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <pre className="text-zinc-300 overflow-x-auto">
                        <code>{`const result = await basedonchain.analyzeTx({
  to: "0x...",
  data: "0x...",
  value: "0"
});

console.log(result.riskScore); // 85 (High Risk)
console.log(result.explanation); 
// "Detects potential wallet drainer..."`}</code>
                    </pre>
                </div>
            </div>
        </section>
    );
}

export function SecuritySection() {
    return (
        <section id="security" className="py-24 bg-zinc-950">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Uncompromising Security
                    </h2>
                    <p className="mt-4 text-zinc-400">Built on core principles of trust and transparency.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        "Non-custodial (we never touch private keys)",
                        "Read-only simulations",
                        "Open-source core heuristics",
                        "Rate-limited & DDoS protected APIs",
                        "Explainable AI (no black boxes)",
                        "Planned Security Audit"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-zinc-900 border border-zinc-800">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="text-zinc-300 font-medium">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function CTASection() {
    return (
        <section className="py-32 bg-zinc-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-indigo-600/5" />
            <div className="container mx-auto px-4 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                    Don't Sign Blindly on Base.
                </h2>
                <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
                    Join thousands of users who trust BasedOnchain to secure their transactions.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button asChild size="lg" className="rounded-full bg-indigo-600 text-white hover:bg-indigo-500 px-8 h-12 text-lg">
                        <Link href="/analyze">Launch BasedOnchain</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="rounded-full border-zinc-700 text-white hover:bg-zinc-800 hover:text-white px-8 h-12 text-lg">
                        <Link href="/docs">Read the Docs</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

export function GrantSection() {
    return (
        <section className="py-16 bg-zinc-950 border-t border-white/5">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-8">
                    Proudly Building for the Superchain
                </p>
                <div className="flex justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="text-2xl font-bold text-blue-500">BASE</div>
                    <div className="text-2xl font-bold text-zinc-300">ETHEREUM</div>
                    <div className="text-2xl font-bold text-red-500">OP STACK</div>
                </div>
            </div>
        </section>
    )
}
