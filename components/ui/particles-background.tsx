"use client"

import { useCallback, useEffect, useState } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import type { Engine } from "tsparticles-engine"

type ParticlesBackgroundProps = {
  visibility?: "enhanced" | "normal" | "reduced"
}

export function ParticlesBackground({ visibility = "normal" }: ParticlesBackgroundProps) {
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

  // Particles initialization
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  // Adjust opacity based on visibility prop
  let opacityMultiplier = 1
  if (visibility === "reduced") {
    opacityMultiplier = 0.4
  } else if (visibility === "enhanced") {
    opacityMultiplier = 1.3
  }

  // Optimized particle settings for mobile
  const particleOptions = isMobile ? 
    {
      fpsLimit: 30, // Lower FPS limit for mobile
      interactivity: {
        events: {
          onHover: {
            enable: true, // Allow hover interactions on mobile
            mode: "repulse" as const,
          },
          resize: true,
        },
        modes: {
          repulse: {
            distance: visibility === "enhanced" ? 70 : 60, // Enhanced repulse distance on home page
            duration: visibility === "enhanced" ? 0.3 : 0.2,
          },
        },
      },
      particles: {
        color: {
          value: "#a0b1c5",
        },
        links: {
          color: "#5d7b9c",
          distance: 150,
          enable: true,
          opacity: visibility === "enhanced" ? 0.4 : 0.3 * opacityMultiplier,
          width: 1,
        },
        move: {
          enable: true,
          speed: visibility === "enhanced" ? 0.7 : (visibility === "reduced" ? 0.5 : 0.6), // Speed based on visibility
          direction: "none" as const,
          random: false,
          straight: false,
          outModes: {
            default: "bounce" as const,
          },
        },
        number: {
          density: {
            enable: true,
            area: visibility === "enhanced" ? 800 : 1000, // Smaller area = more particles for enhanced
          },
          value: visibility === "enhanced" ? 40 : (visibility === "reduced" ? 20 : 30), // More particles for enhanced
        },
        opacity: {
          value: visibility === "enhanced" ? 0.3 : (0.2 * opacityMultiplier), // Higher opacity for enhanced
        },
        shape: {
          type: "circle" as const,
        },
        size: {
          value: { min: 1, max: visibility === "enhanced" ? 3 : 2 }, // Larger particles for enhanced
        },
      },
      detectRetina: false, // Disable retina detection for performance
    } 
    : 
    {
      // Desktop settings - optimized based on visibility
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true, // Always enable hover interactions
            mode: "repulse" as const,
          },
          resize: true,
        },
        modes: {
          repulse: {
            distance: visibility === "enhanced" ? 120 : (visibility === "reduced" ? 70 : 100), // Enhanced repulsion for home page
            duration: visibility === "enhanced" ? 0.5 : (visibility === "reduced" ? 0.3 : 0.4),
          },
        },
      },
      particles: {
        color: {
          value: "#a0b1c5",
        },
        links: {
          color: "#5d7b9c",
          distance: 150,
          enable: true,
          opacity: visibility === "enhanced" ? 0.6 : (0.5 * opacityMultiplier),
          width: visibility === "enhanced" ? 1.2 : 1,
        },
        move: {
          enable: true,
          direction: "none" as const,
          outModes: {
            default: "bounce" as const,
          },
          random: true,
          speed: visibility === "enhanced" ? 1.2 : (visibility === "reduced" ? 0.6 : 1),
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: visibility === "enhanced" ? 700 : 800,
          },
          value: visibility === "enhanced" ? 100 : (visibility === "reduced" ? 50 : 80), // More particles for enhanced
        },
        opacity: {
          value: visibility === "enhanced" ? 0.4 : (0.3 * opacityMultiplier),
        },
        shape: {
          type: "circle" as const,
        },
        size: {
          value: { min: 1, max: visibility === "enhanced" ? 4 : 3 },
        },
      },
      detectRetina: true,
    };

  return (
    <>
      {/* Enhanced dark starry background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-black z-0" />
      
      {/* Particles - shown on both desktop and mobile with different settings */}
      <Particles
        id="tsparticles"
        className="absolute inset-0 z-10"
        init={particlesInit}
        options={particleOptions}
      />
      
      {/* Subtle cosmic dust/nebula effect - simplified on mobile */}
      <div className="absolute inset-0 opacity-30 z-5">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-r from-[#a0b1c5]/20 to-transparent blur-[100px] transform rotate-12" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-r from-[#5d7b9c]/20 to-transparent blur-[100px] transform -rotate-12" />
      </div>

      {/* Add a subtle silver color overlay */}
      <div className="absolute inset-0 z-5">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#a0b1c5]/10 via-transparent to-[#5d7b9c]/10 z-10" />
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0f1520] opacity-90"></div>
        <div className="absolute inset-0 bg-grid-[#a0b1c5]/[0.02]"></div>
      </div>
    </>
  )
} 