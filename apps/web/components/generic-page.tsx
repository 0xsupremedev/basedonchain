import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function GenericPage({ title, description }: { title: string, description: string }) {
    return (
        <main className="min-h-screen bg-zinc-950 flex flex-col">
            <Navbar />
            <div className="flex-grow pt-24 px-4 pb-12 flex items-center justify-center">
                <div className="text-center max-w-2xl">
                    <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
                    <p className="text-xl text-zinc-400">{description}</p>
                    <div className="mt-8">
                        <span className="inline-block px-4 py-2 rounded-full bg-zinc-900 text-zinc-500 text-sm border border-zinc-800">
                            Coming Soon
                        </span>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
