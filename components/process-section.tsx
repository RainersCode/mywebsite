"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

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
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
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
            delay: 3
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
          className="absolute top-1/2 right-1/4 w-1/4 h-[1px] bg-gradient-to-l from-transparent via-[#5d7b9c] to-transparent shadow-[0_0_8px_0px_#5d7b9c]" 
          animate={{ 
            x: [80, -80, 80],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Falling star trails - increased quantity */}
        {[...Array(16)].map((_, i) => (
          <SilverTrail key={i} index={i} />
        ))}
      </div>

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
            {/* Timeline Line */}
            <motion.div 
              className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-[#2a3546] md:transform md:-translate-x-px"
              animate={{
                backgroundImage: [
                  "linear-gradient(to bottom, rgba(160, 177, 197, 0.1), rgba(160, 177, 197, 0.3), rgba(93, 123, 156, 0.3), rgba(93, 123, 156, 0.1))",
                  "linear-gradient(to bottom, rgba(93, 123, 156, 0.1), rgba(93, 123, 156, 0.3), rgba(160, 177, 197, 0.3), rgba(160, 177, 197, 0.1))",
                  "linear-gradient(to bottom, rgba(160, 177, 197, 0.1), rgba(160, 177, 197, 0.3), rgba(93, 123, 156, 0.3), rgba(93, 123, 156, 0.1))"
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Process Steps */}
            <div className="space-y-12 md:space-y-0">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <motion.div
                    className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 bg-[#1c2534] border border-[#2a3546] rounded-full flex items-center justify-center md:transform md:-translate-x-1/2 overflow-hidden">
                      {/* Colorful Background */}
                      <motion.div 
                        className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-20`}
                        animate={{
                          opacity: [0.1, 0.4, 0.1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5
                        }}
                      />
                      <span className="relative text-xs font-medium text-[#c6d4e3]">{step.number}</span>
                    </div>

                    {/* Content */}
                    <div className={`pl-12 md:pl-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                      <div
                        className={`p-6 bg-[#1c2534]/50 border border-[#2a3546] ${index % 2 === 0 ? "md:text-right" : ""} relative overflow-hidden group hover:border-[#3d4f69] transition-colors`}
                      >
                        {/* Colorful Border */}
                        <motion.div
                          className={`absolute inset-y-0 ${index % 2 === 0 ? "right-0" : "left-0"} w-[2px] bg-gradient-to-b ${step.gradient} opacity-70 group-hover:opacity-100 transition-opacity`}
                          animate={{
                            opacity: [0.5, 0.9, 0.5],
                            height: ["100%", "105%", "100%"],
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.7
                          }}
                        />

                        <h3 className="text-xl mb-2 font-medium">{step.title}</h3>
                        <p className="text-[#a0b1c5]">{step.description}</p>
                      </div>
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

