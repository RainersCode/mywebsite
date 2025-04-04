"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Code, Zap, Laptop, Gauge, LayoutGrid } from "lucide-react"
import { CardSpotlight } from "@/components/ui/card-spotlight"

export default function IntroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const services = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Next.js Development",
      description: "Building blazing-fast, SEO-ready web applications and websites.",
      gradient: "from-[#a0b1c5] to-[#5d7b9c]",
    },
    {
      icon: <Laptop className="h-8 w-8" />,
      title: "Framer Design & Build",
      description: "Crafting pixel-perfect, interactive interfaces and websites directly from design.",
      gradient: "from-[#97a8bc] to-[#5f7d9e]",
    },
    {
      icon: <Gauge className="h-8 w-8" />,
      title: "Performance Optimization",
      description: "Ensuring your website loads quickly and runs smoothly for the best user experience.",
      gradient: "from-[#8fa0b4] to-[#617f9f]",
    },
    {
      icon: <LayoutGrid className="h-8 w-8" />,
      title: "Responsive Design",
      description: "Guaranteeing a flawless look and feel on desktops, tablets, and mobile devices.",
      gradient: "from-[#8799ad] to-[#64819f]",
    },
  ]

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#0f1520] relative overflow-hidden">
      {/* Background Elements - Removed */}
      <div className="container mx-auto px-6">
        <motion.div className="max-w-4xl mx-auto" style={{ y, opacity }}>
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 mb-4 bg-[#1c2534] border border-[#2a3546] rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#a0b1c5]/10 via-[#8faabe]/10 to-[#5d7b9c]/10" />
              <span className="relative text-[#c6d4e3] text-sm uppercase tracking-widest">Why Choose Us</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">What I Offer</h2>
            <p className="text-[#a0b1c5] text-lg max-w-2xl mx-auto">
              Specialized web development services focused on performance, design, and user experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <CardSpotlight
                  className="group bg-[#111622]/80 backdrop-blur-sm p-8 border border-[#2a3546] hover:border-[#3d4f69] transition-colors relative overflow-hidden h-full"
                  radius={350}
                  color="#2a3546"
                >
                  <div className="text-[#c6d4e3] mb-4">{service.icon}</div>
                  <h3 className="text-xl mb-3 font-medium">{service.title}</h3>
                  <p className="text-[#a0b1c5]">{service.description}</p>
                </CardSpotlight>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

