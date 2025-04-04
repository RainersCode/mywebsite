import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import { 
  ShoppingCart, 
  Zap, 
  Briefcase, 
  Rocket,
  Check,
  X
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PricingPage() {
  // Pricing packages
  const packages = [
    {
      name: "Essential Presence Package",
      description: "Simple Websites",
      idealFor: "Startups, small businesses, personal portfolios, or landing pages needing a professional online identity.",
      features: [
        "Up to 5 Core Pages (e.g., Home, About, Services, Contact)",
        "Custom Design based on your brand (Logo, Colors, Fonts provided by you)",
        "Mobile-Responsive Design (Looks great on all devices)",
        "Contact Form Integration",
        "Basic On-Page SEO Setup (Titles, Descriptions)",
        "Standard Security Measures",
        "Our Collaborative Process (Discovery, Wireframe Review, Development, Feedback Rounds, Launch)",
        "Figma Wireframes for Content Planning"
      ],
      investment: "Starting from $1,500 - $3,500",
      timeline: "2-4 Weeks (dependent on content delivery & feedback)",
      icon: <ShoppingCart className="h-8 w-8 text-[#a0b1c5]" />,
      gradient: "from-[#a0b1c5] to-[#5d7b9c]",
    },
    {
      name: "Business Growth Package",
      description: "Medium Websites",
      idealFor: "Growing businesses needing more content, functionality like a blog, or enhanced design customization.",
      features: [
        "Everything in the Essential Presence Package PLUS:",
        "6 - 15 Pages",
        "Blog Setup & Styling",
        "More In-Depth Design Customization",
        "Integration with standard tools (e.g., Newsletter signup)",
        "Content Management System (CMS) setup for easy updates",
        "Basic CMS Training Session (1 Hour)",
        "Enhanced On-Page SEO Setup",
        "(Optional: If using Framer): Visual progress tracking via Framer preview link during development"
      ],
      investment: "Starting from $3,500 - $6,500",
      timeline: "4-8 Weeks (dependent on content delivery & feedback)",
      icon: <Briefcase className="h-8 w-8 text-[#97a8bc]" />,
      gradient: "from-[#97a8bc] to-[#5f7d9e]",
    },
    {
      name: "Advanced Solution Package",
      description: "Complex Websites",
      idealFor: "Businesses needing e-commerce functionality, membership areas, custom integrations, or extensive websites.",
      features: [
        "Everything in the Business Growth Package PLUS:",
        "15+ Pages (or complex single-page structures)",
        "E-commerce Functionality (Payment gateway integration)",
        "Advanced Features (e.g., Basic Membership Setup, Custom Calculators, API integrations)",
        "Advanced Custom Design & Interactions",
        "Potentially more complex CMS requirements",
        "Deeper integration support"
      ],
      investment: "Starting from $7,000+ (Highly variable based on specific features)",
      timeline: "8-12+ Weeks (dependent on complexity, content & feedback)",
      icon: <Rocket className="h-8 w-8 text-[#8fa0b4]" />,
      gradient: "from-[#8fa0b4] to-[#617f9f]",
    }
  ]

  // Factors influencing price
  const priceFactors = [
    "Number of Pages: More pages mean more design and development time.",
    "Design Complexity: Highly unique layouts, animations, or interactions require more effort.",
    "Custom Features: E-commerce, memberships, integrations, complex forms add complexity.",
    "Content: Do you have finalized text and images, or do you need help with migration or sourcing?",
    "Platform Choice: While we love Framer for its visual building and client previews, specific platform requirements might affect cost."
  ]

  // What's included in all packages
  const included = [
    "Initial Discovery & Strategy Call",
    "Figma Wireframes & Content Planning Phase",
    "Custom Visual Design",
    "Responsive Website Development",
    "Basic SEO Foundations",
    "Testing Across Browsers & Devices",
    "Staging Link for Review Before Launch",
    "Standard Security Practices",
    "Deployment to Your Live Hosting"
  ]

  // What's not included (available as add-ons)
  const notIncluded = [
    "Domain Name Purchase",
    "Website Hosting Fees",
    "Ongoing Website Maintenance & Support Plans",
    "Content Writing or Copywriting",
    "Logo Design or Full Branding Packages",
    "Advanced SEO or Marketing Services",
    "Stock Photography or Videography Licensing",
    "Extensive E-commerce Product Uploading"
  ]

  return (
    <div className="min-h-screen bg-[#141b27] text-zinc-100">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#141b27] to-[#111622]">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block px-4 py-1 mb-4 bg-[#1c2534] border border-[#2a3546] rounded-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#a0b1c5]/10 via-[#8faabe]/10 to-[#5d7b9c]/10" />
                <span className="relative text-[#c6d4e3] text-sm uppercase tracking-widest">Our Pricing</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">Clear & Transparent Pricing</h1>
              <p className="text-[#a0b1c5] text-lg md:text-xl max-w-3xl mx-auto mb-8">
                We believe in transparent pricing tailored to your specific needs. Below you'll find our standard website packages, designed to give you a clear idea of investment levels. Remember, every project is unique, so these are starting points. For a precise quote based on your exact requirements, please get in touch!
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Packages Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#111622] to-[#0f1520]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl mb-6">Our Website Packages</h2>
              <p className="text-[#a0b1c5] text-lg max-w-2xl mx-auto">
                Choose the package that best fits your business needs and goals.
              </p>
            </div>

            <div className="space-y-16 md:space-y-24 max-w-4xl mx-auto">
              {packages.map((pkg, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center">
                    <div className="w-full relative">
                      <CardSpotlight
                        className="p-8 bg-[#111622]/80 backdrop-blur-sm border border-[#2a3546] relative overflow-hidden group hover:border-[#3d4f69] transition-colors"
                        radius={200}
                        color="#2a3546"
                      >
                        <div className="flex items-center mb-4">
                          <div className="mr-4">{pkg.icon}</div>
                          <div>
                            <div className="font-serif text-2xl md:text-3xl font-medium">{pkg.name}</div>
                            <div className="text-[#a0b1c5] text-sm">{pkg.description}</div>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <h4 className="text-[#8fa0b4] font-medium mb-2">Ideal For:</h4>
                          <p className="text-[#a0b1c5]">{pkg.idealFor}</p>
                        </div>
                        
                        <div className="mb-6">
                          <h4 className="text-[#8fa0b4] font-medium mb-2">What's Included:</h4>
                          <ul className="text-[#a0b1c5] space-y-2">
                            {pkg.features.map((feature, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-[#5d7b9c] mr-2">•</span> {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#2a3546]">
                          <div>
                            <h4 className="text-[#8fa0b4] font-medium mb-1">Estimated Investment:</h4>
                            <p className="text-[#c6d4e3] font-medium">{pkg.investment}</p>
                          </div>
                          <div>
                            <h4 className="text-[#8fa0b4] font-medium mb-1">Typical Timeline:</h4>
                            <p className="text-[#a0b1c5]">{pkg.timeline}</p>
                          </div>
                        </div>
                      </CardSpotlight>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Price Factors Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#0f1520] to-[#0c111a]">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl md:text-4xl mb-6">What Influences the Final Price?</h2>
                <p className="text-[#a0b1c5] text-lg max-w-3xl mx-auto mb-8">
                  These packages are guides. The final quote depends on factors like:
                </p>
              </div>

              <div className="bg-[#111622]/80 backdrop-blur-sm border border-[#2a3546] rounded-lg p-8 mb-16">
                <ul className="space-y-3 text-[#a0b1c5]">
                  {priceFactors.map((factor, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-[#2a3546] text-[#c6d4e3] flex items-center justify-center mr-3 mt-0.5">
                        <Zap size={12} />
                      </div>
                      <div>{factor}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-[#111622]/80 backdrop-blur-sm border border-[#2a3546] rounded-lg p-8 h-full">
                  <h3 className="font-serif text-xl md:text-2xl mb-6 text-center">What's Generally Included in All Packages</h3>
                  <ul className="space-y-3 text-[#a0b1c5]">
                    {included.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-[#2a3546] text-[#5d7b9c] flex items-center justify-center mr-3 mt-0.5">
                          <Check size={14} />
                        </div>
                        <div>{item}</div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#111622]/80 backdrop-blur-sm border border-[#2a3546] rounded-lg p-8 h-full">
                  <h3 className="font-serif text-xl md:text-2xl mb-6 text-center">What's Typically Not Included (Available as Add-Ons)</h3>
                  <ul className="space-y-3 text-[#a0b1c5]">
                    {notIncluded.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-[#2a3546] text-[#8799ad] flex items-center justify-center mr-3 mt-0.5">
                          <X size={14} />
                        </div>
                        <div>{item}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#0c111a] to-[#141b27]">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl mb-6">Ready for a Custom Quote?</h2>
              <p className="text-[#a0b1c5] text-lg mb-8">
                Every project is unique! The best way to get an accurate price is to discuss your specific needs. Contact us today for a personalized quote tailored to your project requirements.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  asChild
                  variant="nav"
                  size="lg"
                  className="bg-gradient-to-r from-[#141b27] to-[#1c2534] border-[#4d5f79] hover:border-[#a0b1c5] hover:bg-gradient-to-r hover:from-[#15202f] hover:to-[#1f2a3c]"
                >
                  <Link href="#contact">
                    Get Your Free Quote
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-[#2a3546] text-[#a0b1c5] hover:text-white hover:border-[#4d5f79]"
                >
                  <Link href="/process">
                    Learn About Our Process
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 