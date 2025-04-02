"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import LaptopAnimation from "./laptop-animation"

// Silver trail component - like a small comet or shooting star
const SilverTrail = ({ index }: { index: number }) => {
  // Random size for the trail head - increased sizes
  const headSize = Math.random() * 3 + 1.5; // 1.5-4.5px head (increased)
  const tailLength = headSize * (Math.random() * 18 + 12); // proportional tail length (increased)
  
  // Random angle for diagonal movement
  const angleVariation = Math.random() * 40 - 20; // -20 to +20 degrees variation
  const baseAngle = 45 + angleVariation; // Around 45 degrees (diagonal)
  
  // Random duration between 10-30 seconds for slightly faster movement
  const duration = 10 + Math.random() * 20;
  
  // Random start positions
  // Start either from top or left side for diagonal movement
  const startFromTop = Math.random() > 0.5;
  const startX = startFromTop ? Math.random() * 100 : -tailLength;
  const startY = startFromTop ? -tailLength : Math.random() * 100;
  
  // Calculate end position based on angle and travel distance
  const travelDistance = 120 + Math.random() * 30; // 120-150% of screen size
  const endX = startX + travelDistance * Math.cos(baseAngle * Math.PI / 180);
  const endY = startY + travelDistance * Math.sin(baseAngle * Math.PI / 180);
  
  // Delay so trails don't all appear at once
  const delay = Math.random() * 15;
  
  // Silver color with varying opacity - increased
  const opacity = Math.random() * 0.4 + 0.5; // 0.5-0.9 opacity (increased)
  
  // Rotation to match movement angle
  const rotation = (baseAngle - 45) + 90; // Transform from math angle to CSS rotation
  
  return (
    <motion.div
      className="absolute z-20 pointer-events-none"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        rotate: `${rotation}deg`,
        opacity: 0
      }}
      animate={{
        left: `${endX}%`,
        top: `${endY}%`,
        opacity: [0, opacity, opacity, 0]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "linear",
        opacity: {
          times: [0, 0.05, 0.95, 1]
        }
      }}
    >
      {/* The trail head (circle) */}
      <div 
        className="absolute rounded-full bg-[#e0e9f5]" // Brighter color
        style={{
          width: headSize,
          height: headSize,
          boxShadow: `0 0 ${headSize * 3}px 2px rgba(224, 233, 245, 0.9)`
        }}
      />
      
      {/* The trail tail (gradient line) */}
      <div 
        className="absolute bg-gradient-to-t from-transparent to-[#c6d4e3]" // Brighter gradient
        style={{
          width: headSize / 1.2, // Wider than before
          height: tailLength,
          transformOrigin: 'center top',
          top: headSize / 2,
          left: headSize / 3,
          filter: 'blur(0.5px)'
        }}
      />
    </motion.div>
  );
};

export default function PortfolioShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section
      id="portfolio"
      ref={ref}
      className="py-24 md:py-40 bg-gradient-to-b from-[#0f1520] to-[#141b27] relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#2a3546] to-transparent shadow-[0_0_8px_0px_#2a3546]" 
          animate={{
            y: ["-100%", "100%", "-100%"],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#2a3546] to-transparent shadow-[0_0_8px_0px_#2a3546]" 
          animate={{
            y: ["100%", "-100%", "100%"],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Colorful Accent Lines */}
        <motion.div 
          className="absolute top-1/4 left-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#a0b1c5] to-transparent shadow-[0_0_8px_0px_#a0b1c5]" 
          animate={{
            x: [-100, 100, -100],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#5d7b9c] to-transparent shadow-[0_0_8px_0px_#5d7b9c]" 
          animate={{
            x: [100, -100, 100],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4.5
          }}
        />
        <motion.div 
          className="absolute top-2/3 left-1/4 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#a0b1c5] to-transparent shadow-[0_0_8px_0px_#a0b1c5]" 
          animate={{
            x: [-80, 80, -80],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-2/3 right-1/4 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#5d7b9c] to-transparent shadow-[0_0_8px_0px_#5d7b9c]" 
          animate={{
            x: [80, -80, 80],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        
        {/* Falling star trails - increased quantity */}
        {[...Array(18)].map((_, i) => (
          <SilverTrail key={i} index={i} />
        ))}
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.div className="text-center mb-16" style={{ y, opacity }}>
          <div className="inline-block px-4 py-1 mb-4 bg-[#1c2534] border border-[#2a3546] rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#a0b1c5]/10 via-[#8faabe]/10 to-[#5d7b9c]/10" />
            <span className="relative text-[#c6d4e3] text-sm uppercase tracking-widest">Responsive Design</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Our Work in Motion</h2>
          <p className="text-[#a0b1c5] text-lg max-w-2xl mx-auto">
            Experience the fluidity and elegance of our Framer-built websites across all devices.
          </p>
        </motion.div>

        <LaptopAnimation />

        <motion.div className="mt-16 text-center" style={{ opacity }}>
          <p className="text-[#7d8ea1] text-sm uppercase tracking-widest">Scroll to explore more</p>
        </motion.div>
      </div>
    </section>
  )
}

