"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import { Button } from "@/components/ui/button"

export default function CtaSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#141b27] relative overflow-hidden">
      {/* Background Elements - Removed */}
      <div className="container mx-auto px-6 relative">
        <motion.div className="max-w-4xl mx-auto text-center" style={{ y, opacity }}>
          <CardSpotlight 
            className="bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] p-12"
            radius={700}
            color="#2a3546"
          >
            <div className="inline-block px-4 py-1 mb-6 bg-[#1c2534] border border-[#2a3546] rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#a0b1c5]/10 via-[#8faabe]/10 to-[#5d7b9c]/10" />
              <span className="relative text-[#c6d4e3] text-sm uppercase tracking-widest">Get Started</span>
            </div>

            <h2 className="font-serif text-3xl md:text-5xl mb-6">Ready to Build Your Vision?</h2>
            <p className="text-[#a0b1c5] text-lg mb-10 max-w-2xl mx-auto">
              Let's create a website that elevates your brand and delivers exceptional user experiences.
            </p>

            <Button
              asChild
              variant="default"
              size="lg"
            >
              <Link href="#contact">
                GET A FREE QUOTE
              </Link>
            </Button>
          </CardSpotlight>
        </motion.div>
      </div>
    </section>
  )
}

