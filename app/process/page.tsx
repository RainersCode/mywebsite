import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import { 
  MessageSquare, 
  FileText, 
  Paintbrush, 
  Code, 
  Search, 
  Rocket,
  Clock
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ParticlesBackground } from "@/components/ui/particles-background"

export default function ProcessPage() {
  // Main process steps
  const steps = [
    {
      number: "01",
      title: "Discovery & Strategy",
      description: "We start by diving deep into your world. Through a kickoff meeting or detailed questionnaire, we'll learn about your business, your target audience, your goals for the website, and your design preferences (like brand colors, logos, and websites you admire).",
      input: "This is where you share your vision! The more information you provide about your needs and what you hope to achieve, the better we can tailor the website strategy.",
      outcome: "A clear understanding of the project scope, goals, and target audience.",
      gradient: "from-[#a0b1c5] to-[#5d7b9c]",
      icon: <MessageSquare className="h-8 w-8 text-[#a0b1c5]" />,
    },
    {
      number: "02",
      title: "Blueprint & Content",
      description: "Based on our discovery session, we create a visual blueprint, called a wireframe, using a tool like Figma. This simple sketch shows the layout and structure of your key website pages – where text blocks, images, buttons, and menus will go, before we add colours and final designs.",
      input: "We'll share the Figma wireframe link with you. Your crucial role here is to review the flow, provide content (website text and images), and give layout feedback. Changes are easiest at this blueprint stage!",
      outcome: "An approved website structure and the core content ready for design and development.",
      gradient: "from-[#97a8bc] to-[#5f7d9e]",
      icon: <FileText className="h-8 w-8 text-[#97a8bc]" />,
    },
    {
      number: "03",
      title: "Design & Development",
      description: "With the approved blueprint and content, our team gets to work! We design the visual look and feel (colors, fonts, imagery) and build the functional website, ensuring it's responsive (looks great on all devices).",
      input: "If your project uses Framer, we can often provide a special preview link. This allows you to visually track the progress and see your website taking shape in real-time – like watching the construction happen!",
      outcome: "A functional, designed website built on a development or staging server.",
      gradient: "from-[#8fa0b4] to-[#617f9f]",
      icon: <Code className="h-8 w-8 text-[#8fa0b4]" />,
    },
    {
      number: "04",
      title: "Review & Refine",
      description: "We'll provide you with a private link to the nearly-finished website (on a temporary \"staging\" address) for your review.",
      input: "Take your time exploring the site! Click through pages, test buttons and forms, read the text carefully, and view it on different devices. Provide feedback on typos, images that need swapping, minor design tweaks, or anything not working as expected.",
      outcome: "A list of final revisions needed before launch.",
      gradient: "from-[#8799ad] to-[#64819f]",
      icon: <Search className="h-8 w-8 text-[#8799ad]" />,
    },
    {
      number: "05",
      title: "Launch & Handover",
      description: "After implementing your final feedback and performing thorough checks, we handle the technical process of migrating your website from the staging server to your live domain name. Your website is now live for the world to see!",
      input: "Share your new website! This is your moment to promote your new online presence.",
      outcome: "Your brand new, professional website is live and ready to achieve your goals!",
      gradient: "from-[#8092a6] to-[#68839f]",
      icon: <Rocket className="h-8 w-8 text-[#8092a6]" />,
    },
  ]

  // Project timeline information
  const timelines = [
    {
      type: "Simple Websites",
      description: "Informational, few pages, contact form",
      duration: "2-4 Weeks",
      icon: <Clock className="h-6 w-6 text-[#a0b1c5]" />
    },
    {
      type: "Medium Websites",
      description: "Blog integration, more pages, standard features",
      duration: "4-8 Weeks",
      icon: <Clock className="h-6 w-6 text-[#97a8bc]" />
    },
    {
      type: "Complex Websites",
      description: "E-commerce, custom features, large content volume",
      duration: "8-12+ Weeks",
      icon: <Clock className="h-6 w-6 text-[#8fa0b4]" />
    }
  ]

  return (
    <div className="min-h-screen bg-[#141b27] text-zinc-100">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#141b27] to-[#111622] relative overflow-hidden">
          <ParticlesBackground visibility="reduced" />
          <div className="container mx-auto px-6 relative z-30">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block px-4 py-1 mb-4 bg-[#1c2534] border border-[#2a3546] rounded-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#a0b1c5]/10 via-[#8faabe]/10 to-[#5d7b9c]/10" />
                <span className="relative text-[#c6d4e3] text-sm uppercase tracking-widest">Our Process</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">Our Website Building Process</h1>
              <p className="text-[#a0b1c5] text-lg md:text-xl max-w-3xl mx-auto mb-8">
                Building a great website is a journey we take together! We believe in a clear, collaborative process to ensure we create a website that perfectly meets your goals. Here's a step-by-step look at how we turn your vision into reality:
              </p>
            </div>
          </div>
        </section>

        {/* Process Steps Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#111622] to-[#0f1520]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl mb-6">Our Proven 5-Step Process</h2>
              <p className="text-[#a0b1c5] text-lg max-w-2xl mx-auto">
                We've refined our approach over many projects to ensure efficient collaboration and exceptional results.
              </p>
            </div>

            <div className="space-y-16 md:space-y-24 max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center">
                    <div className="w-full relative">
                      <CardSpotlight
                        className="p-8 bg-[#111622]/80 backdrop-blur-sm border border-[#2a3546] relative overflow-hidden group hover:border-[#3d4f69] transition-colors"
                        radius={200}
                        color="#2a3546"
                      >
                        <div className="flex items-center mb-4">
                          <div className="mr-4">{step.icon}</div>
                          <div className="font-serif text-2xl md:text-3xl font-medium">{step.title}</div>
                          <div className="ml-auto font-serif text-4xl md:text-5xl text-white/10">{step.number}</div>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-[#8fa0b4] font-medium mb-2">What We Do:</h4>
                          <p className="text-[#a0b1c5]">{step.description}</p>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-[#8fa0b4] font-medium mb-2">Your Input:</h4>
                          <p className="text-[#a0b1c5]">{step.input}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-[#8fa0b4] font-medium mb-2">Outcome:</h4>
                          <p className="text-[#a0b1c5]">{step.outcome}</p>
                        </div>
                      </CardSpotlight>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timelines Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#0f1520] to-[#0c111a]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl mb-6">Project Timelines: What to Expect</h2>
              <p className="text-[#a0b1c5] text-lg max-w-2xl mx-auto">
                While every project is unique, here are some general timeframes based on complexity. These timelines depend heavily on receiving content and feedback promptly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {timelines.map((timeline, index) => (
                <div 
                  key={index}
                  className="bg-[#111622]/80 backdrop-blur-sm border border-[#2a3546] rounded-lg p-6 hover:border-[#3d4f69] transition-colors"
                >
                  <div className="flex items-center mb-4">
                    <div className="mr-3">{timeline.icon}</div>
                    <h3 className="font-serif text-xl">{timeline.type}</h3>
                  </div>
                  <p className="text-[#a0b1c5] mb-4">{timeline.description}</p>
                  <div className="text-xl text-[#c6d4e3] font-medium">{timeline.duration}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Collaboration Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#0c111a] to-[#141b27]">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl md:text-4xl mb-6">Collaboration is Key for Success!</h2>
                <p className="text-[#a0b1c5] text-lg max-w-3xl mx-auto">
                  Your active participation makes the process smoother and ensures the final website truly reflects your vision. The most successful projects happen when clients provide:
                </p>
              </div>

              <div className="bg-[#111622]/80 backdrop-blur-sm border border-[#2a3546] rounded-lg p-8 mb-12">
                <ul className="space-y-4 text-[#a0b1c5]">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-[#2a3546] text-[#c6d4e3] flex items-center justify-center mr-3 mt-0.5">✓</div>
                    <div>
                      <span className="text-[#c6d4e3] font-medium">Clear Information</span> during the Discovery phase.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-[#2a3546] text-[#c6d4e3] flex items-center justify-center mr-3 mt-0.5">✓</div>
                    <div>
                      <span className="text-[#c6d4e3] font-medium">Timely Content</span> (text, images) during the Blueprint phase.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-[#2a3546] text-[#c6d4e3] flex items-center justify-center mr-3 mt-0.5">✓</div>
                    <div>
                      <span className="text-[#c6d4e3] font-medium">Prompt Feedback</span> during the Review stages.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <h3 className="font-serif text-2xl md:text-3xl mb-6">Ready to Start Your Website Journey?</h3>
                <p className="text-[#a0b1c5] text-lg mb-8">
                  We're excited to learn about your project. Contact us today for a free consultation!
                </p>
                <Button
                  asChild
                  variant="default"
                  size="lg"
                >
                  <Link href="#contact">Get in Touch</Link>
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