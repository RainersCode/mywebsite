"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { CardSpotlight } from "@/components/ui/card-spotlight"

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
      title: "Discover",
      description: "We begin by understanding your goals, audience, and unique requirements.",
      gradient: "from-[#a0b1c5] to-[#5d7b9c]",
    },
    {
      number: "02",
      title: "Design",
      description: "Creating a visual direction that aligns with your brand and captivates your audience.",
      gradient: "from-[#97a8bc] to-[#5f7d9e]",
    },
    {
      number: "03",
      title: "Develop",
      description: "Building your website with Framer, ensuring performance and functionality.",
      gradient: "from-[#8fa0b4] to-[#617f9f]",
    },
    {
      number: "04",
      title: "Launch",
      description: "Deploying your website and ensuring everything runs smoothly.",
      gradient: "from-[#8799ad] to-[#64819f]",
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
              <span className="relative text-[#c6d4e3] text-sm uppercase tracking-widest">Our Approach</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">Why Framer</h2>
            <p className="text-[#a0b1c5] text-lg max-w-2xl mx-auto">
              Framer enables us to create websites that are not only visually stunning but also highly functional and
              easy to maintain.
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
                        className="p-6 bg-[#111622]/80 backdrop-blur-sm border border-[#2a3546] relative overflow-hidden group hover:border-[#3d4f69] transition-colors text-center"
                        radius={200}
                        color="#2a3546"
                      >
                        <div className="font-serif text-4xl md:text-6xl mb-4 text-white/20">{step.number}</div>
                        <h3 className="text-xl mb-2 font-medium">{step.title}</h3>
                        <p className="text-[#a0b1c5]">{step.description}</p>
                      </CardSpotlight>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

