"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Code, Zap, Palette } from "lucide-react"
import { CardSpotlight } from "@/components/ui/card-spotlight"

export default function IntroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

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
            <h2 className="font-serif text-3xl md:text-4xl mb-6">The Framer Advantage</h2>
            <p className="text-[#a0b1c5] text-lg max-w-2xl mx-auto">
              Combining the power of Framer with expert development skills to deliver websites that stand out in both
              design and performance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <CardSpotlight 
              className="bg-[#111622]/80 backdrop-blur-sm p-8 border border-[#2a3546] relative group hover:border-[#3d4f69] transition-colors overflow-hidden"
              radius={250}
              color="#2a3546"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#a0b1c5] to-[#5d7b9c] opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <Zap className="text-[#a0b1c5] mb-6 h-8 w-8" />
              <h3 className="text-xl mb-3 font-medium">Unmatched Speed</h3>
              <p className="text-[#a0b1c5]">
                Accelerate your development process with Framer's powerful tools and our expertise.
              </p>
            </CardSpotlight>

            <CardSpotlight 
              className="bg-[#111622]/80 backdrop-blur-sm p-8 border border-[#2a3546] relative group hover:border-[#3d4f69] transition-colors overflow-hidden"
              radius={250}
              color="#2a3546"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#97a8bc] to-[#5f7d9e] opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <Palette className="text-[#97a8bc] mb-6 h-8 w-8" />
              <h3 className="text-xl mb-3 font-medium">Stunning Design</h3>
              <p className="text-[#a0b1c5]">Create visually impressive experiences that captivate your audience.</p>
            </CardSpotlight>

            <CardSpotlight 
              className="bg-[#111622]/80 backdrop-blur-sm p-8 border border-[#2a3546] relative group hover:border-[#3d4f69] transition-colors overflow-hidden"
              radius={250}
              color="#2a3546"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#8fa0b4] to-[#617f9f] opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <Code className="text-[#8fa0b4] mb-6 h-8 w-8" />
              <h3 className="text-xl mb-3 font-medium">Technical Excellence</h3>
              <p className="text-[#a0b1c5]">
                Websites that not only look great but perform flawlessly across all devices.
              </p>
            </CardSpotlight>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

