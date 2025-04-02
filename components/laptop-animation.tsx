"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function LaptopAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const [isLaptopOpen, setIsLaptopOpen] = useState(false)
  const [isContentVisible, setIsContentVisible] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const phoneX = useTransform(scrollYProgress, [0.3, 0.6], [50, 0])
  const phoneOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])

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
        {/* Laptop */}
        <div className="relative w-full max-w-2xl">
          {/* Laptop Base */}
          <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-b-lg shadow-xl">
            {/* Laptop Bottom Edge */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-600" />

            {/* Laptop Keyboard Area */}
            <div className="absolute bottom-0 left-0 right-0 h-[10%] bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-b-lg">
              {/* Trackpad */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-3/5 bg-zinc-600/80 rounded-sm border border-zinc-500/20" />

              {/* Power Button */}
              <div className="absolute top-1/2 right-[5%] transform -translate-y-1/2 w-2 h-2 rounded-full bg-zinc-600/80" />
            </div>
          </div>

          {/* Laptop Screen */}
          <motion.div
            className="absolute top-0 left-0 right-0 origin-bottom bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-t-lg shadow-lg overflow-hidden"
            style={{
              height: "90%",
              transformOrigin: "center bottom",
            }}
            animate={{
              rotateX: isLaptopOpen ? 0 : -90,
              opacity: isLaptopOpen ? 1 : 0.8,
            }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 100,
            }}
          >
            {/* Screen Bezel */}
            <div className="absolute inset-[2%] bg-zinc-900 rounded overflow-hidden">
              {/* Camera */}
              <div className="absolute top-[2%] left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-zinc-700 z-10" />

              {/* Screen Content */}
              <AnimatePresence>
                {isContentVisible && (
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Website Scrolling Animation */}
                    <motion.div
                      className="absolute inset-0 overflow-hidden"
                      animate={{
                        y: [0, -1000],
                      }}
                      transition={{
                        duration: 15,
                        ease: "linear",
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                      }}
                    >
                      <Image
                        src="/placeholder.svg?height=2000&width=1200"
                        alt="Website Showcase"
                        width={1200}
                        height={2000}
                        className="w-full"
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Screen Reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          </motion.div>

          {/* Laptop Hinge */}
          <div className="absolute bottom-[10%] left-0 right-0 h-[1%] bg-zinc-600 z-10" />
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
          <div className="relative w-full h-full bg-zinc-800 rounded-[24px] border-[8px] border-zinc-700 shadow-xl overflow-hidden">
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/4 h-[5%] bg-zinc-900 rounded-b-xl z-10" />

            {/* Phone Screen */}
            <AnimatePresence>
              {isContentVisible && (
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {/* Mobile Website Scrolling Animation */}
                  <motion.div
                    className="absolute inset-0 overflow-hidden"
                    animate={{
                      y: [0, -800],
                    }}
                    transition={{
                      duration: 12,
                      ease: "linear",
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                  >
                    <Image
                      src="/placeholder.svg?height=1600&width=750"
                      alt="Mobile Website Showcase"
                      width={750}
                      height={1600}
                      className="w-full"
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Screen Reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            {/* Home Indicator */}
            <div className="absolute bottom-[2%] left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-zinc-600 rounded-full" />
          </div>

          {/* Side Buttons */}
          <div className="absolute top-[20%] right-[-2px] w-[2px] h-[10%] bg-zinc-600 rounded-l-sm" />
          <div className="absolute top-[35%] right-[-2px] w-[2px] h-[10%] bg-zinc-600 rounded-l-sm" />
          <div className="absolute top-[20%] left-[-2px] w-[2px] h-[15%] bg-zinc-600 rounded-r-sm" />
        </motion.div>
      </div>
    </motion.div>
  )
}

