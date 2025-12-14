"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const navigation = [
    { name: "Product", href: "/product" },
    { name: "Developers", href: "/developers" },
    { name: "Security", href: "/security" },
    { name: "Blog", href: "/blog" },
];

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
                aria-label="Global"
            >
                {/* Logo */}
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
                            B
                        </div>
                        <span className="font-bold text-lg text-white">BasedOnchain</span>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-400"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className="sr-only">Open main menu</span>
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        )}
                    </button>
                </div>

                {/* Desktop navigation */}
                <div className="hidden lg:flex lg:gap-x-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop CTA */}
                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
                    <Link
                        href="/analyze"
                        className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                        Analyze Transaction
                    </Link>
                    <ConnectButton />
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden">
                    <div className="space-y-1 px-6 pb-6 pt-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block rounded-lg px-3 py-2 text-base font-medium text-zinc-400 hover:bg-zinc-900 hover:text-white"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <Link
                                href="/analyze"
                                className="block rounded-lg px-3 py-2 text-base font-semibold text-indigo-400 hover:bg-zinc-900"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Analyze Transaction
                            </Link>
                            <div className="mt-4 px-3">
                                <ConnectButton />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
