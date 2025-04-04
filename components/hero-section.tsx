"use client"

import { useRef, useCallback, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ParticlesBackground } from "@/components/ui/particles-background"

// Updated showcase items with enhanced visual appearance
const showcaseItems = [
  { 
    id: 1, 
    title: "Hero Section", 
    color: "from-[#a0b1c5] to-[#5d7b9c]",
    glowColor: "sky",
    content: (
      <div className="w-full h-full flex flex-col justify-center items-center scale-[0.7]">
        <div className="w-36 h-5 bg-white/90 rounded-sm mb-3 font-semibold text-[8px] text-black flex items-center justify-center">HEADLINE TEXT</div>
        <div className="w-28 h-2 bg-gradient-to-r from-white/70 to-white/60 rounded-sm mb-3"></div>
        <div className="flex gap-3 mt-1">
          <div className="w-12 h-5 bg-gradient-to-r from-[#a0b1c5] to-[#5d7b9c] rounded-sm text-[6px] text-white flex items-center justify-center font-medium">BUTTON</div>
          <div className="w-12 h-5 border border-white/60 rounded-sm text-[6px] text-white flex items-center justify-center font-medium">BUTTON</div>
        </div>
      </div>
    )
  },
  { 
    id: 2, 
    title: "Testimonials", 
    color: "from-[#8faabe] to-[#4f6d8e]",
    glowColor: "sky",
    content: (
      <div className="w-full h-full flex flex-col items-center justify-center scale-[0.7]">
        <div className="flex mb-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="mx-1 flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#a0b1c5] to-[#5d7b9c] mb-1 ring-2 ring-white/20 flex items-center justify-center overflow-hidden">
                <div className="w-4 h-2 bg-white/30 rounded-full mt-3"></div>
              </div>
              <div className="w-12 h-10 bg-black/40 backdrop-blur-sm rounded-md border border-white/10 p-1">
                <div className="w-full h-1 bg-white/80 rounded-sm mb-1"></div>
                <div className="w-full h-0.5 bg-white/50 rounded-sm mb-1"></div>
                <div className="w-8 h-0.5 bg-white/50 rounded-sm"></div>
                <div className="flex space-x-0.5 mt-1 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-gradient-to-r from-[#a0b1c5] to-[#5d7b9c]"></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  { 
    id: 3, 
    title: "Features Grid", 
    color: "from-[#a0b1c5] to-[#5d7b9c]",
    glowColor: "sky",
    content: (
      <div className="w-full h-full flex flex-col items-center justify-center scale-[0.7]">
        <div className="w-32 h-3 bg-white/90 rounded-sm mb-3 font-semibold text-[6px] text-black flex items-center justify-center">FEATURES</div>
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-12 h-12 bg-gradient-to-br from-black/50 to-black/30 backdrop-blur-sm rounded-md border border-white/10 flex flex-col items-center justify-center p-1">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#a0b1c5] to-[#5d7b9c] flex items-center justify-center mb-1">
                <div className="w-3 h-3 bg-white/80 rounded-sm"></div>
              </div>
              <div className="w-10 h-0.5 bg-white/70 rounded-sm"></div>
              <div className="w-8 h-0.5 bg-white/40 rounded-sm mt-0.5"></div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  { 
    id: 4, 
    title: "Pricing Table", 
    color: "from-[#8faabe] to-[#4f6d8e]",
    glowColor: "sky",
    content: (
      <div className="w-full h-full flex flex-col items-center justify-center scale-[0.7]">
        <div className="w-32 h-3 bg-white/90 rounded-sm mb-3 font-semibold text-[6px] text-black flex items-center justify-center">PRICING</div>
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`w-12 h-20 ${i === 1 ? 'bg-gradient-to-b from-[#a0b1c5]/20 to-[#5d7b9c]/20 -mt-2' : 'bg-black/40'} backdrop-blur-sm rounded-md border ${i === 1 ? 'border-[#a0b1c5]/30' : 'border-white/10'} flex flex-col items-center p-1`}>
              <div className="w-8 h-1.5 bg-white/70 rounded-sm mb-1 text-[4px] text-white flex items-center justify-center font-medium">{i === 0 ? 'BASIC' : i === 1 ? 'PRO' : 'TEAM'}</div>
              <div className="w-8 h-3 bg-gradient-to-r from-[#a0b1c5] to-[#5d7b9c] rounded-sm mb-2 flex items-center justify-center text-[5px] text-white font-bold">{i === 0 ? '$9' : i === 1 ? '$19' : '$29'}</div>
              <div className="w-7 h-0.5 bg-white/50 rounded-sm"></div>
              <div className="w-7 h-0.5 bg-white/50 rounded-sm mt-1"></div>
              <div className="w-7 h-0.5 bg-white/50 rounded-sm mt-1"></div>
              <div className="w-8 h-2 bg-white/20 rounded-sm mt-2 flex items-center justify-center text-[4px] text-white">SELECT</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  { 
    id: 5, 
    title: "Contact Form", 
    color: "from-[#a0b1c5] to-[#5d7b9c]",
    glowColor: "sky",
    content: (
      <div className="w-full h-full flex flex-col items-center justify-center scale-[0.7]">
        <div className="w-32 h-3 bg-white/90 rounded-sm mb-3 font-semibold text-[6px] text-black flex items-center justify-center">CONTACT US</div>
        <div className="w-32 h-5 bg-black/40 backdrop-blur-sm rounded-sm border border-white/10 mb-2 flex px-2 items-center">
          <div className="w-12 h-0.5 bg-white/90 rounded-sm"></div>
        </div>
        <div className="w-32 h-5 bg-black/40 backdrop-blur-sm rounded-sm border border-white/10 mb-2 flex px-2 items-center">
          <div className="w-16 h-0.5 bg-white/90 rounded-sm"></div>
        </div>
        <div className="w-32 h-10 bg-black/40 backdrop-blur-sm rounded-sm border border-white/10 mb-3 p-2">
          <div className="w-24 h-0.5 bg-white/70 rounded-sm mb-1"></div>
          <div className="w-20 h-0.5 bg-white/70 rounded-sm mb-1"></div>
          <div className="w-16 h-0.5 bg-white/70 rounded-sm"></div>
        </div>
        <div className="w-20 h-6 bg-gradient-to-r from-[#a0b1c5] to-[#5d7b9c] rounded-sm flex items-center justify-center">
          <div className="text-[6px] text-white font-medium">SUBMIT</div>
        </div>
      </div>
    )
  },
  { 
    id: 6, 
    title: "Navigation", 
    color: "from-[#8faabe] to-[#4f6d8e]",
    glowColor: "sky",
    content: (
      <div className="w-full h-full flex items-center justify-center scale-[0.7]">
        <div className="h-8 w-full bg-gradient-to-r from-black/50 to-black/30 backdrop-blur-sm border-b border-white/10 flex items-center px-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#a0b1c5] to-[#5d7b9c] mr-4 flex items-center justify-center">
            <div className="w-3 h-3 bg-white/80 rounded-sm"></div>
          </div>
          <div className="flex-1 flex justify-between items-center">
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`w-8 h-1.5 rounded-sm ${i === 0 ? 'bg-gradient-to-r from-[#a0b1c5] to-[#5d7b9c]' : 'bg-white/60'} flex items-center justify-center text-[3px] text-white font-medium`}>
                  {i === 0 ? 'HOME' : i === 1 ? 'ABOUT' : i === 2 ? 'WORK' : 'CONTACT'}
                </div>
              ))}
            </div>
            <div className="w-8 h-4 bg-gradient-to-r from-[#a0b1c5] to-[#5d7b9c] rounded-sm flex items-center justify-center text-[4px] text-white font-medium">MENU</div>
          </div>
        </div>
      </div>
    )
  },
  { 
    id: 7, 
    title: "Image Gallery", 
    color: "from-[#a0b1c5] to-[#5d7b9c]",
    glowColor: "sky",
    content: (
      <div className="w-full h-full flex flex-col items-center justify-center scale-[0.7]">
        <div className="w-32 h-3 bg-white/90 rounded-sm mb-3 font-semibold text-[6px] text-black flex items-center justify-center">GALLERY</div>
        <div className="grid grid-cols-3 gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-9 h-9 rounded-md bg-gradient-to-br from-[#a0b1c5]/80 to-[#5d7b9c]/80 backdrop-blur-sm overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-black/20"></div>
              {i % 2 === 0 && <div className="w-5 h-5 rounded-full bg-white/20"></div>}
              {i % 3 === 0 && <div className="w-7 h-1 bg-white/20"></div>}
              {i % 4 === 0 && (
                <>
                  <div className="w-5 h-5 rounded-md bg-black/30"></div>
                  <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-gradient-to-r from-[#a0b1c5] to-[#5d7b9c]"></div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  },
  { 
    id: 8, 
    title: "Footer", 
    color: "from-[#8faabe] to-[#4f6d8e]",
    glowColor: "sky",
    content: (
      <div className="w-full h-full flex items-center justify-center scale-[0.7]">
        <div className="w-full bg-gradient-to-r from-black/50 to-black/30 backdrop-blur-sm border-t border-white/10 p-2 flex flex-col">
          <div className="flex justify-between w-full mb-2">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-[#a0b1c5] to-[#5d7b9c] flex items-center justify-center">
              <div className="w-5 h-5 bg-white/80 rounded-sm"></div>
            </div>
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-black/30 border border-white/10 flex items-center justify-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-[#a0b1c5] to-[#5d7b9c] rounded-sm"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#a0b1c5]/30 to-transparent mb-2"></div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div className="w-10 h-2 bg-white/40 rounded-sm"></div>
              <div className="w-10 h-2 bg-white/40 rounded-sm"></div>
            </div>
            <div className="w-20 h-2 bg-white/20 rounded-sm"></div>
          </div>
        </div>
      </div>
    )
  },
]

const DiagonalCarouselItem = ({ item, index }: { 
  item: typeof showcaseItems[0], 
  index: number
}) => {
  // Create more scattered, random positioning
  const randomAngle = 20 + Math.random() * 70; // Between 20 and 90 degrees
  const randomDistance = 60 + Math.random() * 80; // Between 60 and 140
  const randomDirection = index % 2 === 0;
  const randomDelay = index * 2 + Math.random() * 5;
  const randomDuration = 20 + Math.random() * 30;
  
  // Calculate starting and ending positions using trig functions
  // for more natural, semi-circular paths
  const startX = randomDirection ? 
    `${100 + randomDistance * Math.cos(randomAngle * Math.PI / 180)}%` : 
    `${-randomDistance * Math.cos(randomAngle * Math.PI / 180)}%`;
  
  const startY = randomDirection ? 
    `${-randomDistance * Math.sin(randomAngle * Math.PI / 180)}%` : 
    `${100 + randomDistance * Math.sin(randomAngle * Math.PI / 180)}%`;
  
  const endX = randomDirection ? 
    `${-randomDistance * Math.cos(randomAngle * Math.PI / 180)}%` : 
    `${100 + randomDistance * Math.cos(randomAngle * Math.PI / 180)}%`;
  
  const endY = randomDirection ? 
    `${100 + randomDistance * Math.sin(randomAngle * Math.PI / 180)}%` : 
    `${-randomDistance * Math.sin(randomAngle * Math.PI / 180)}%`;
  
  const rotateValue = (Math.random() * 30 - 15).toFixed(1);
  
  return (
    <motion.div
      initial={{ 
        x: startX,
        y: startY,
        opacity: 0
      }}
      animate={{ 
        x: endX,
        y: endY,
        opacity: [0, 1, 1, 0]
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: randomDelay,
        ease: "linear",
        opacity: {
          duration: randomDuration,
          times: [0, 0.1, 0.9, 1],
          ease: "easeInOut"
        }
      }}
      className="absolute"
      style={{
        left: `${(index % 3) * 30 + Math.random() * 10}%`,
        top: `${(Math.floor(index / 3) % 3) * 30 + Math.random() * 10}%`,
        perspective: "1000px"
      }}
    >
      {/* Card with enhanced 3D and glow effects */}
      <motion.div
        animate={{ 
          boxShadow: [
            `0 0 0 rgba(0, 0, 0, 0)`,
            `0 0 25px ${item.glowColor}-500/50`,
            `0 0 0 rgba(0, 0, 0, 0)`
          ],
          scale: [1, 1.03, 1],
          rotateX: [0, 5, 0],
          rotateY: [0, -5, 0],
          rotate: [`${rotateValue}deg`, `${Number(rotateValue) + 3}deg`, `${rotateValue}deg`],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.05 }}
      >
        <Card className={cn(
          "w-56 h-40 backdrop-blur-xl bg-black/30 border-opacity-20 shadow-xl transform",
          "bg-gradient-to-br from-black/60 to-black/30 border border-white/20 overflow-hidden",
          "relative rounded-xl"
        )}>
          {/* Glass highlight effect */}
          <div 
            className="absolute inset-0 overflow-hidden rounded-xl"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
              opacity: 0.2
            }}
          />
          
          {/* Subtle gradient overlay that animates */}
          <motion.div 
            className="absolute inset-0 opacity-30 pointer-events-none z-10"
            style={{
              background: `linear-gradient(45deg, transparent 25%, ${item.glowColor}-400/40 50%, transparent 75%)`,
              backgroundSize: "200% 200%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Mockup device frame */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-black/50 rounded-t-xl flex items-center px-2">
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/70"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/70"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/70"></div>
            </div>
          </div>
          
          <CardContent className="p-4 pt-6 flex flex-col items-center justify-center h-full">
            <div className="flex-1 w-full flex items-center justify-center">
              {item.content}
            </div>
            <div className={`text-xs font-medium text-center bg-gradient-to-r ${item.color} bg-clip-text text-transparent mt-2 px-3 py-1 rounded-full bg-black/40 border border-white/10`}>
              {item.title}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

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
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkMobile)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Use ParticlesBackground with enhanced visibility for home page */}
      <ParticlesBackground visibility="enhanced" />
      
      {/* Parallax Background - only apply motion effects on desktop */}
      {isMobile ? (
        <div className="absolute inset-0 z-5">
          {/* Add a subtle silver color overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#a0b1c5]/10 via-transparent to-[#5d7b9c]/10 z-10" />
        </div>
      ) : (
        <motion.div className="absolute inset-0 z-5" style={{ y: backgroundY }}>
          {/* Add a subtle silver color overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#a0b1c5]/10 via-transparent to-[#5d7b9c]/10 z-10" />
        </motion.div>
      )}

      {/* Content */}
      <div className="container mx-auto px-6 relative z-30">
        {isMobile ? (
          // Static content for mobile
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
                Building High-Performance, <br />
                <span className="bg-gradient-to-r from-[#a0b1c5] to-[#5d7b9c] bg-clip-text text-transparent">Visually Stunning Websites with Next.js & Framer</span>
              </h1>
            </div>
            <p className="text-zinc-400 text-lg md:text-xl mb-10 max-w-xl mx-auto">
              Transforming ideas into fast, engaging, and user-friendly digital experiences tailored to your unique need
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                variant="nav"
                size="lg"
                className="w-full sm:w-48"
              >
                <Link href="/projects">
                  VIEW SHOWCASE
                </Link>
              </Button>
              <Button
                asChild
                variant="nav"
                size="lg"
                className="w-full sm:w-48 bg-gradient-to-r from-[#141b27] to-[#1c2534] border-[#4d5f79] hover:border-[#a0b1c5] hover:bg-gradient-to-r hover:from-[#15202f] hover:to-[#1f2a3c]"
              >
                <Link href="/project-kickoff">
                  START YOUR PROJECT
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          // Animated content for desktop
          <motion.div className="max-w-3xl mx-auto text-center" style={{ y: textY, opacity }}>
            <div className="mb-6">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
                Building High-Performance, <br />
                <span className="bg-gradient-to-r from-[#a0b1c5] to-[#5d7b9c] bg-clip-text text-transparent">Visually Stunning Websites with Next.js & Framer</span>
              </h1>
            </div>
            <p className="text-zinc-400 text-lg md:text-xl mb-10 max-w-xl mx-auto">
              Transforming ideas into fast, engaging, and user-friendly digital experiences tailored to your unique needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                variant="nav"
                size="lg"
                className="w-full sm:w-48"
              >
                <Link href="/projects">
                  VIEW SHOWCASE
                </Link>
              </Button>
              <Button
                asChild
                variant="nav"
                size="lg"
                className="w-full sm:w-48 bg-gradient-to-r from-[#141b27] to-[#1c2534] border-[#4d5f79] hover:border-[#a0b1c5] hover:bg-gradient-to-r hover:from-[#15202f] hover:to-[#1f2a3c]"
              >
                <Link href="/project-kickoff">
                  START YOUR PROJECT
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

