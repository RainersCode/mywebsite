"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface LaptopAnimationProps {
  desktopImage?: string
  mobileImage?: string
}

export default function LaptopAnimation({ 
  desktopImage = "/responsivedg/resdesk1.png", 
  mobileImage = "/responsivedg/respho1.png" 
}: LaptopAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.05 })
  const [isLaptopOpen, setIsLaptopOpen] = useState(false)
  const [isContentVisible, setIsContentVisible] = useState(false)

  useEffect(() => {
    if (isInView) {
      // Start loading images immediately
      setIsContentVisible(true)
      
      // Delay the laptop opening animation slightly
      const openTimer = setTimeout(() => {
        setIsLaptopOpen(true)
      }, 300)

      return () => {
        clearTimeout(openTimer)
      }
    } else {
      setIsLaptopOpen(false)
      setIsContentVisible(false)
    }
  }, [isInView])

  return (
    <div ref={containerRef} className="relative w-full aspect-[16/9] flex items-center justify-center">
      {/* Laptop Screen - Positioned absolutely, scaled up, lower z-index */}
      <motion.div 
        className="absolute w-[85%] md:w-[75%] lg:w-[70%] aspect-[16/10] z-0" // Scaled up, z-0
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: isLaptopOpen ? 1 : 0.9, opacity: isLaptopOpen ? 1 : 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.1 }}
      >
        {/* Screen Container */}
        <div
          className="w-full h-full bg-gradient-to-b from-[#2a3546] to-[#1c2534] rounded-lg shadow-xl overflow-hidden"
          style={{
            boxShadow: "0 15px 40px -10px rgba(0, 0, 0, 0.6), 0 0 8px rgba(0, 0, 0, 0.1) inset"
          }}
        >
          {/* Screen Bezel */}
          <div className="absolute inset-[1.5%] bg-[#141b27] rounded-md overflow-hidden">
            {/* Camera */}
            <div className="absolute top-[1%] left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-[#0f1520] z-10">
              <div className="absolute inset-[30%] rounded-full bg-[#2a3546]/50"></div>
            </div>

            {/* Screen Content */}
            <AnimatePresence>
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: isContentVisible ? 1 : 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                {/* Website Scrolling Animation */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    className="w-full"
                    style={{ height: "auto", position: "relative" }}
                    animate={{
                      y: ["0%", "-75%", "0%"],
                    }}
                    transition={{
                      duration: 40,
                      ease: "linear",
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                  >
                    <Image
                      src={desktopImage}
                      alt="Desktop Website Showcase"
                      width={1200}
                      height={4000}
                      className="w-full h-auto"
                      unoptimized={true}
                      priority
                    />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Screen Reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#a0b1c5]/10 to-transparent pointer-events-none" />
          
          {/* Bottom Border */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#5d7b9c]/30 via-[#8faabe]/50 to-[#5d7b9c]/30" />
        </div>
      </motion.div>

      {/* Phone - Positioned absolutely, higher z-index */}
      <motion.div
        className="absolute w-[35%] sm:w-[30%] md:w-[25%] lg:w-[20%] aspect-[9/19] z-10 right-[5%] bottom-[-5%] sm:right-[10%] sm:bottom-[-2%] md:right-[15%] md:bottom-[0%]" // Positioned bottom-right, z-10
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: isContentVisible ? 0 : 30, opacity: isContentVisible ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {/* Phone Frame */}
        <div className="relative w-full h-full bg-[#2a3546] rounded-[24px] border-[4px] md:border-[8px] border-[#1c2534] shadow-xl overflow-hidden">
          {/* Phone Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/4 h-[5%] bg-[#0f1520] rounded-b-xl z-10" />

          {/* Phone Screen */}
          <AnimatePresence>
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: isContentVisible ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.6 }} // Slightly delayed fade-in
            >
              {/* Mobile Website Scrolling Animation */}
              <div className="absolute inset-0 overflow-hidden rounded-[16px]"> {/* Added rounding to match frame */} 
                <motion.div
                  className="w-full"
                  style={{ height: "auto", position: "relative" }}
                  animate={{
                    y: ["0%", "-75%", "0%"],
                  }}
                  transition={{
                    duration: 35,
                    ease: "linear",
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                >
                  <Image
                    src={mobileImage}
                    alt="Mobile Website Showcase"
                    width={750}
                    height={3500}
                    className="w-full h-auto"
                    unoptimized={true}
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Screen Reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#a0b1c5]/10 to-transparent pointer-events-none rounded-[16px]" />

          {/* Home Indicator */}
          <div className="absolute bottom-[2%] left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-[#5d7b9c] rounded-full" />
        </div>

        {/* Side Buttons - Simplified positioning */} 
        <div className="absolute top-[20%] -right-[2px] w-[2px] h-[8%] bg-[#5d7b9c] rounded-l-sm" />
        <div className="absolute top-[30%] -right-[2px] w-[2px] h-[8%] bg-[#5d7b9c] rounded-l-sm" />
        <div className="absolute top-[20%] -left-[2px] w-[2px] h-[12%] bg-[#5d7b9c] rounded-r-sm" />
      </motion.div>
    </div>
  )
}

