import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import IntroSection from "@/components/intro-section"
import PortfolioShowcase from "@/components/portfolio-showcase"
import ProcessSection from "@/components/process-section"
import TestimonialsSection from "@/components/testimonials-section"
import CtaSection from "@/components/cta-section"
import { ContactSection } from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#141b27] text-zinc-100">
      <Navbar />
      <main>
        <HeroSection />
        <IntroSection />
        <PortfolioShowcase />
        <ProcessSection />
        <TestimonialsSection />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

