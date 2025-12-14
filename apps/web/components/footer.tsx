import Link from "next/link"
import { Github, Twitter, Disc, ArrowRight } from "lucide-react"

const footerNavigation = {
    product: [
        { name: "Analyze Transaction", href: "/analyze" },
        { name: "Dashboard", href: "/dashboard" },
        { name: "Approval Manager", href: "/dashboard/approvals" },
        { name: "API", href: "/docs/api" },
    ],
    developers: [
        { name: "Documentation", href: "/docs" },
        { name: "SDK", href: "/docs/sdk" },
        { name: "GitHub", href: "https://github.com/basedonchain" },
        { name: "Changelog", href: "/changelog" },
    ],
    community: [
        { name: "X / Twitter", href: "https://x.com/basedonchain" },
        { name: "Discord", href: "https://discord.gg/basedonchain" },
        { name: "Blog", href: "/blog" },
        { name: "Newsletter", href: "/newsletter" },
    ],
    legal: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Responsible Disclosure", href: "/responsible-disclosure" },
    ],
}

export function Footer() {
    return (
        <footer className="bg-zinc-950 border-t border-white/5" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
                                B
                            </div>
                            <span className="font-bold text-lg text-white">BasedOnchain</span>
                        </Link>
                        <p className="text-sm leading-6 text-zinc-400">
                            AI-powered onchain copilot that simulates, explains, and blocks risky transactions on Base.
                        </p>
                        <div className="flex space-x-6">
                            <Link href="https://x.com/basedonchain" className="text-zinc-500 hover:text-zinc-400">
                                <span className="sr-only">X</span>
                                <Twitter className="h-5 w-5" aria-hidden="true" />
                            </Link>
                            <Link href="https://github.com/basedonchain" className="text-zinc-500 hover:text-zinc-400">
                                <span className="sr-only">GitHub</span>
                                <Github className="h-5 w-5" aria-hidden="true" />
                            </Link>
                        </div>
                        <div className="mt-8 rounded-2xl bg-white/5 p-6 border border-white/10">
                            <h4 className="text-sm font-semibold text-white">Stay safe on Base</h4>
                            <p className="mt-2 text-sm text-zinc-400">Join our newsletter for latest security alerts.</p>
                            <div className="mt-4 flex gap-2">
                                <input type="email" placeholder="Enter your email" className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                <button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-3 py-2">
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">Product</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {footerNavigation.product.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-zinc-400 hover:text-white">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">Developers</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {footerNavigation.developers.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-zinc-400 hover:text-white">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">Community</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {footerNavigation.community.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-zinc-400 hover:text-white">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {footerNavigation.legal.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-zinc-400 hover:text-white">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 flex md:flex-row flex-col justify-between items-center gap-4">
                    <p className="text-xs leading-5 text-zinc-400">
                        &copy; 2025 BasedOnchain. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-zinc-500">Built on Base</span>
                        <span className="text-xs text-zinc-500">•</span>
                        <span className="text-xs text-zinc-500">Non-custodial</span>
                        <span className="text-xs text-zinc-500">•</span>
                        <span className="text-xs text-zinc-500">Open-source core</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
