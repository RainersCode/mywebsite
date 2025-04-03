"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function LaptopAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.05 })
  const [isLaptopOpen, setIsLaptopOpen] = useState(false)
  const [isContentVisible, setIsContentVisible] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])
  const phoneX = useTransform(scrollYProgress, [0.2, 0.4], [50, 0])
  const phoneOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1])

  useEffect(() => {
    if (isInView) {
      // Delay the laptop opening animation
      const openTimer = setTimeout(() => {
        setIsLaptopOpen(true)
      }, 500)

      // Delay the content appearing after laptop is open
      const contentTimer = setTimeout(() => {
        setIsContentVisible(true)
      }, 1500)

      return () => {
        clearTimeout(openTimer)
        clearTimeout(contentTimer)
      }
    } else {
      setIsLaptopOpen(false)
      setIsContentVisible(false)
    }
  }, [isInView])

  return (
    <motion.div ref={containerRef} className="relative w-full max-w-5xl mx-auto" style={{ scale, opacity }}>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        {/* Laptop Screen Only */}
        <div className="relative w-full max-w-2xl aspect-[16/10]">
          {/* Screen Container */}
          <motion.div
            className="w-full h-full bg-gradient-to-b from-[#2a3546] to-[#1c2534] rounded-lg shadow-xl overflow-hidden"
            style={{
              boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 5px rgba(0, 0, 0, 0.1) inset"
            }}
            initial={{ opacity: 0.8, y: 10 }}
            animate={{
              opacity: isLaptopOpen ? 1 : 0.8,
              y: isLaptopOpen ? 0 : 10
            }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 100,
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
                {isContentVisible && (
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
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
                          src="/responsivedg/resdesk1.png"
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
                )}
              </AnimatePresence>
            </div>

            {/* Screen Reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#a0b1c5]/10 to-transparent pointer-events-none" />
            
            {/* Bottom Border with subtle glow */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#5d7b9c]/30 via-[#8faabe]/50 to-[#5d7b9c]/30 shadow-[0_0_8px_0px_#8faabe]" />
          </motion.div>
        </div>

        {/* Phone */}
        <motion.div
          className="relative w-full max-w-[200px] aspect-[9/19]"
          style={{
            x: phoneX,
            opacity: phoneOpacity,
          }}
        >
          {/* Phone Frame */}
          <div className="relative w-full h-full bg-[#2a3546] rounded-[24px] border-[8px] border-[#1c2534] shadow-xl overflow-hidden">
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/4 h-[5%] bg-[#0f1520] rounded-b-xl z-10" />

            {/* Phone Screen */}
            <AnimatePresence>
              {isContentVisible && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {/* Mobile Website Scrolling Animation */}
                  <div className="absolute inset-0 overflow-hidden">
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
                        src="/responsivedg/respho1.png"
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
              )}
            </AnimatePresence>

            {/* Screen Reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#a0b1c5]/10 to-transparent pointer-events-none" />

            {/* Home Indicator */}
            <div className="absolute bottom-[2%] left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-[#5d7b9c] rounded-full" />
          </div>

          {/* Side Buttons */}
          <div className="absolute top-[20%] right-[-2px] w-[2px] h-[10%] bg-[#5d7b9c] rounded-l-sm" />
          <div className="absolute top-[35%] right-[-2px] w-[2px] h-[10%] bg-[#5d7b9c] rounded-l-sm" />
          <div className="absolute top-[20%] left-[-2px] w-[2px] h-[15%] bg-[#5d7b9c] rounded-r-sm" />
        </motion.div>
      </div>
    </motion.div>
  )
}

