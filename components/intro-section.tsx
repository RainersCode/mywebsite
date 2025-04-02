"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Code, Zap, Palette } from "lucide-react"

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
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Existing animated lines - made more visible */}
        <motion.div 
          className="absolute top-1/3 left-0 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#a0b1c5] to-transparent shadow-[0_0_8px_0px_#a0b1c5]" 
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
          className="absolute bottom-1/3 right-0 w-1/4 h-[1px] bg-gradient-to-l from-transparent via-[#5d7b9c] to-transparent shadow-[0_0_8px_0px_#5d7b9c]"
          animate={{ 
            x: [100, -100, 100],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 24, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-2/3 left-1/4 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#a0b1c5] to-transparent shadow-[0_0_8px_0px_#a0b1c5]" 
          animate={{ 
            x: [-80, 80, -80],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 22, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-1/2 right-1/4 w-1/4 h-[1px] bg-gradient-to-l from-transparent via-[#5d7b9c] to-transparent shadow-[0_0_8px_0px_#5d7b9c]"
          animate={{ 
            x: [80, -80, 80],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 26, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />

        {/* Falling star trails - increased quantity */}
        {[...Array(12)].map((_, i) => (
          <SilverTrail key={i} index={i} />
        ))}
      </div>

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
            <div className="bg-[#1c2534]/50 p-8 border border-[#2a3546] relative group hover:border-[#3d4f69] transition-colors overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#a0b1c5] to-[#5d7b9c] opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <Zap className="text-[#a0b1c5] mb-6 h-8 w-8" />
              <h3 className="text-xl mb-3 font-medium">Unmatched Speed</h3>
              <p className="text-[#a0b1c5]">
                Accelerate your development process with Framer's powerful tools and our expertise.
              </p>
            </div>

            <div className="bg-[#1c2534]/50 p-8 border border-[#2a3546] relative group hover:border-[#3d4f69] transition-colors overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#97a8bc] to-[#5f7d9e] opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <Palette className="text-[#97a8bc] mb-6 h-8 w-8" />
              <h3 className="text-xl mb-3 font-medium">Stunning Design</h3>
              <p className="text-[#a0b1c5]">Create visually impressive experiences that captivate your audience.</p>
            </div>

            <div className="bg-[#1c2534]/50 p-8 border border-[#2a3546] relative group hover:border-[#3d4f69] transition-colors overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#8fa0b4] to-[#617f9f] opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <Code className="text-[#8fa0b4] mb-6 h-8 w-8" />
              <h3 className="text-xl mb-3 font-medium">Technical Excellence</h3>
              <p className="text-[#a0b1c5]">
                Websites that not only look great but perform flawlessly across all devices.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

