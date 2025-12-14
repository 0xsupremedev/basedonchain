import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, User } from "lucide-react"

export default function BlogPage() {
  const posts = [
    {
      title: "Onchain Security Research: The State of Base",
      excerpt: "Deep dive into the latest security findings and vulnerability assessments on the Base network.",
      date: "Oct 12, 2023",
      author: "Security Team",
      image: "/images/blog-security.png",
      tag: "Research"
    },
    {
      title: "Emerging Attack Patterns on Base",
      excerpt: "Analyzing recent exploit vectors and how to defend against them using simulation tools.",
      date: "Oct 05, 2023",
      author: "Threat Intel",
      image: "/images/blog-attack.png",
      tag: "Security"
    },
    {
      title: "AI and Blockchain Safety: A New Era",
      excerpt: "How artificial intelligence is transforming the way we detect and prevent onchain fraud.",
      date: "Sep 28, 2023",
      author: "Product",
      image: "/images/blog-ai.png",
      tag: "AI"
    },
     {
      title: "Product Updates: Version 2.0 Release",
      excerpt: "Introducing new features: enhanced simulation, dark mode, and developer API access.",
      date: "Sep 15, 2023",
      author: "Engineering",
      image: null, // Placeholder or no image for update
      tag: "Updates"
    }
  ]

  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      
      <section className="pt-32 pb-16 px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
           Security, Base, and Onchain Safety
        </h1>
        <p className="text-lg leading-8 text-zinc-400 max-w-2xl mx-auto">
           Insights, updates, and research from the BasedOnchain team.
        </p>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-6 lg:px-8">
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {posts.map((post, i) => (
                 <article key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-colors group">
                     {post.image ? (
                        <div className="relative h-48 w-full overflow-hidden">
                             <Image 
                                src={post.image} 
                                alt={post.title} 
                                fill 
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                             />
                        </div>
                     ) : (
                        <div className="h-48 w-full bg-zinc-800 flex items-center justify-center text-zinc-600">
                            No Image
                        </div>
                     )}
                     
                     <div className="p-6">
                         <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4">
                             <span className="flex items-center gap-1">
                                 <Calendar className="h-3 w-3" /> {post.date}
                             </span>
                             <span className="flex items-center gap-1">
                                 <User className="h-3 w-3" /> {post.author}
                             </span>
                             <span className="ml-auto bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full">
                                 {post.tag}
                             </span>
                         </div>
                         <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                             {post.title}
                         </h3>
                         <p className="text-zinc-400 text-sm mb-6">
                             {post.excerpt}
                         </p>
                         <Link href="#" className="inline-flex items-center gap-2 text-indigo-400 font-medium hover:text-indigo-300">
                             Read Article <ArrowRight className="h-4 w-4" />
                         </Link>
                     </div>
                 </article>
             ))}
         </div>
      </section>

      <Footer />
    </main>
  )
}
