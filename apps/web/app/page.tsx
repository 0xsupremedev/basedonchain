import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/Hero";
import {
  ProblemSection,
  HowItWorksSection,
  FeaturesSection,
  DeveloperSection,
  SecuritySection,
  GrantSection,
  CTASection
} from "@/components/landing-sections";

export default function Home() {
  return (
    <main className="bg-zinc-950 min-h-screen selection:bg-indigo-500/30">
      <Navbar />
      <Hero />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <SecuritySection />
      <DeveloperSection />
      <GrantSection />
      <CTASection />
      <Footer />
    </main>
  );
}
