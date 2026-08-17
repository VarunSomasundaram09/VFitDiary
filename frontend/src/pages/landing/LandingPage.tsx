import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { Features } from "@/components/layout/Features";
import { HowItWorks } from "@/components/layout/HowItWorks";
import { Screenshots } from "@/components/layout/Screenshots";
import { FAQ } from "@/components/layout/FAQ";
import { CTABanner } from "@/components/layout/CTABanner";
import { Footer } from "@/components/layout/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Screenshots />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
