"use client"

import { useRef, useCallback, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ParticlesBackground } from "@/components/ui/particles-background"
import LaptopAnimation from "./laptop-animation"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Detect if we're on mobile
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // Changed breakpoint to lg
    }
    
    // Initial check
    checkMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkMobile)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section 
      ref={ref} 
      // Adjusted padding and alignment for two-column layout
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0f1520] to-[#141b27] text-white pt-32 pb-20 md:pt-40 md:pb-32 flex flex-col items-center justify-center"
    >
      {/* Background Particles */}
      <ParticlesBackground />
      
      {/* Main Content Container (Two Columns on Large Screens) */}
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
        
        {/* Left Column: Text Content */}
        <motion.div 
          className="lg:w-1/2 text-center lg:text-left" // Adjusted width and text alignment
          style={{ y: isMobile ? 0 : textY, opacity }} // Apply parallax only on desktop
        >
          <motion.h1 
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 max-w-4xl mx-auto lg:mx-0 leading-tight" // Removed mx-auto for lg
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Restore original h1 structure with gradient span */}
            Websites Crafted with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a0b1c5] to-[#5d7b9c]">Precision & Flair</span>
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-[#a0b1c5] mb-10 max-w-2xl mx-auto lg:mx-0" // Keep margin and max-width here
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <TextGenerateEffect 
              words="We build stunning, high-performance websites using Framer, blending design excellence with seamless user experiences." 
              className="text-lg sm:text-xl text-[#a0b1c5]" 
              filter={false} 
              duration={0.6} 
            />
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4" // Adjusted justification for lg
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button asChild variant="default" size="lg">
              <Link href="/projects">View Our Work</Link>
            </Button>
            <Button asChild variant="default" size="lg">
              <Link href="#contact">Get a Free Quote</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Column: Laptop/Phone Showcase */}
        <motion.div
          // Added hidden lg:block to hide on mobile/tablet
          // Adjusted width, positioning, and added negative right margin for overflow
          className="hidden lg:block lg:w-[60%] w-full mt-12 lg:mt-0 relative -right-16 xl:-right-24" // Increased width percentage, added negative right margins
          // Apply scale transform to make the showcase larger
          style={{ scale: 1.8 }} // Increased scale factor further
          // Optional: Adjust origin if needed
          // style={{ scale: 1.8, transformOrigin: 'center left' }} // Adjusted transform origin
        >
          <LaptopAnimation />
        </motion.div>
      </div>
    </section>
  )
}

