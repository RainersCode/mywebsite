import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import IntroSection from "@/components/intro-section"
import PortfolioShowcase from "@/components/portfolio-showcase"
import ServicesSection from "@/components/services-section"
import ProcessSection from "@/components/process-section"
import CtaSection from "@/components/cta-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#141b27] text-zinc-100">
      <Navbar />
      <main>
        <HeroSection />
        <IntroSection />
        <PortfolioShowcase />
        <ServicesSection />
        <ProcessSection />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

