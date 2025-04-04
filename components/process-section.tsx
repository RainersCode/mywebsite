"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import { MessageSquare, Paintbrush, Code, Rocket } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const steps = [
    {
      number: "01",
      title: "Discovery & Strategy",
      description: "We start with a deep dive into your project goals, target audience, and specific requirements. I listen carefully to understand your vision, and together we define a clear strategy and scope to ensure we build exactly what you need.",
      gradient: "from-[#a0b1c5] to-[#5d7b9c]",
      icon: <MessageSquare className="h-8 w-8 text-[#a0b1c5]" />,
    },
    {
      number: "02",
      title: "Design & Prototyping",
      description: "Leveraging tools like Framer, I create wireframes and interactive prototypes. This allows you to visualize the user experience and provide feedback early on, ensuring the design aligns perfectly before we move into development.",
      gradient: "from-[#97a8bc] to-[#5f7d9e]",
      icon: <Paintbrush className="h-8 w-8 text-[#97a8bc]" />,
    },
    {
      number: "03",
      title: "Development & Build",
      description: "This is where the design comes alive. I build your website using Next.js, focusing on clean, efficient code, blazing-fast performance, and seamless responsiveness across all devices. You'll receive updates throughout this phase.",
      gradient: "from-[#8fa0b4] to-[#617f9f]",
      icon: <Code className="h-8 w-8 text-[#8fa0b4]" />,
    },
    {
      number: "04",
      title: "Testing & Launch",
      description: "Before the big reveal, we conduct thorough testing to ensure everything works flawlessly. After your final review and approval, I handle the deployment process, launching your polished, high-performance website for the world to see.",
      gradient: "from-[#8799ad] to-[#64819f]",
      icon: <Rocket className="h-8 w-8 text-[#8799ad]" />,
    },
  ]

  return (
    <section
      id="process"
      ref={ref}
      className="py-24 md:py-32 bg-gradient-to-b from-[#141b27] to-[#0f1520] relative overflow-hidden"
    >
      {/* Background Elements - Removed */}
      <div className="container mx-auto px-6">
        <motion.div className="max-w-4xl mx-auto" style={{ y, opacity }}>
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 mb-4 bg-[#1c2534] border border-[#2a3546] rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#a0b1c5]/10 via-[#8faabe]/10 to-[#5d7b9c]/10" />
              <span className="relative text-[#c6d4e3] text-sm uppercase tracking-widest">Workflow</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">My Collaborative Process: From Idea to Launch</h2>
            <p className="text-[#a0b1c5] text-lg max-w-2xl mx-auto">
              I believe in a transparent and structured approach to bring your vision to life. Here's how we'll work together:
            </p>
          </div>

          <div className="relative">
            {/* Process Steps */}
            <div className="space-y-16 md:space-y-24">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Content */}
                    <div className="w-full md:w-3/4 relative">
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
                        <p className="text-[#a0b1c5]">{step.description}</p>
                      </CardSpotlight>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
            
            {/* CTA */}
            <div className="text-center mt-16">
              <p className="text-[#a0b1c5] text-lg mb-8">
                Ready to take the first step? Let's discuss your project!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  variant="nav"
                  size="lg"
                  className="bg-gradient-to-r from-[#141b27] to-[#1c2534] border-[#4d5f79] hover:border-[#a0b1c5] hover:bg-gradient-to-r hover:from-[#15202f] hover:to-[#1f2a3c]"
                >
                  <Link href="#contact">
                    Get Started
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-[#2a3546] text-[#a0b1c5] hover:text-white hover:border-[#4d5f79]"
                >
                  <Link href="/process">
                    Learn More About Our Process
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

