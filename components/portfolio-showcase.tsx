"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import LaptopAnimation from "./laptop-animation"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

// Portfolio items
const portfolioItems = [
  {
    id: 1,
    title: "Responsive E-Commerce",
    description: "Adaptive design with seamless shopping experience across all devices.",
    image: "/placeholder.jpg"
  },
  {
    id: 2,
    title: "Creative Portfolio",
    description: "Showcase of creative work with fluid animations and responsive layouts.",
    image: "/placeholder.jpg"
  },
  {
    id: 3,
    title: "Corporate Website",
    description: "Professional business site optimized for desktop, tablet, and mobile viewing.",
    image: "/placeholder.jpg"
  }
];

export default function PortfolioShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activePanel, setActivePanel] = useState(0)
  
  // For title animation
  const titleRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 0.5], ["100px", "-100px"])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0])

  // Store ScrollTrigger instance in a ref to avoid recreating it on re-renders
  const scrollTriggerRef = useRef<any>(null);
  const timelineRef = useRef<any>(null);

  // Initialize GSAP ScrollTrigger for horizontal scrolling
  useEffect(() => {
    // Skip for SSR
    if (typeof window === "undefined") return;

    // Get the elements
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    // Only initialize once
    if (scrollTriggerRef.current) return;

    // Reset any inline styles
    gsap.set(track, { clearProps: "all" });

    // Calculate dimensions
    const viewportWidth = window.innerWidth;
    const panelCount = portfolioItems.length;
    
    // Wait for layout to complete to get accurate measurements
    const initScrollTrigger = () => {
      if (!track || !track.children[0]) return;
      
      // Get width of the first panel
      const panelWidth = track.children[0].getBoundingClientRect().width;
      
      // Calculate padding needed to center the first and last panels
      const centerOffset = Math.max(0, (viewportWidth - panelWidth) / 2);
      
      // Apply padding to center first panel
      gsap.set(track, { 
        paddingLeft: centerOffset,
        paddingRight: centerOffset,
      });
      
      // Get updated track width with padding
      const totalTrackWidth = track.scrollWidth;
      
      // Calculate the appropriate section height based on viewport
      const viewportHeight = window.innerHeight;
      const sectionHeight = Math.max(
        viewportHeight * 0.8, // Minimum height to maintain proportions
        window.innerWidth < 768 
          ? viewportHeight * 0.9 * panelCount // Mobile sizing
          : viewportHeight * 0.8 * panelCount // Desktop sizing
      );
  
      // Create the ScrollTrigger animation
      timelineRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${sectionHeight}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1, // Smooth scrubbing
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Calculate which panel is active based on scroll progress
            const newActivePanel = Math.round(self.progress * (panelCount - 1));
            if (newActivePanel !== activePanel) {
              setActivePanel(newActivePanel);
            }
          },
        },
      });
      
      // Store the ScrollTrigger instance for cleanup
      scrollTriggerRef.current = ScrollTrigger.getAll().pop();
  
      // Animate the track position to create the horizontal scrolling effect
      timelineRef.current.to(track, {
        x: () => -(totalTrackWidth - viewportWidth),
        ease: "power1.inOut",
      });
    };

    // Initialize after a short delay to ensure DOM is ready
    const timer = setTimeout(initScrollTrigger, 100);
    
    // Make the animation responsive
    const resizeObserver = new ResizeObserver(() => {
      if (scrollTriggerRef.current) {
        ScrollTrigger.update();
      }
    });
    
    resizeObserver.observe(section);

    // Clean up ScrollTrigger and ResizeObserver when component unmounts
    return () => {
      clearTimeout(timer);
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      resizeObserver.disconnect();
    };
  }, []); // Empty dependency array - runs once on mount

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-8 md:py-12 bg-gradient-to-b from-[#0f1520] to-[#141b27] relative overflow-hidden"
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
          className="absolute bottom-1/4 right-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#a0b1c5] to-transparent shadow-[0_0_8px_0px_#a0b1c5]" 
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
          className="absolute bottom-2/3 right-1/4 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#a0b1c5] to-transparent shadow-[0_0_8px_0px_#a0b1c5]" 
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

      <div className="container mx-auto px-10 md:px-6 relative flex flex-col h-full">
        <motion.div ref={titleRef} className="text-center mb-2 md:mb-4" style={{ y, opacity }}>
          <div className="inline-block px-4 py-1 mb-2 bg-[#1c2534] rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#a0b1c5]/10 via-[#8faabe]/10 to-[#5d7b9c]/10" />
            <span className="relative text-[#c6d4e3] text-sm uppercase tracking-widest">Responsive Design</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl mb-2">Our Work in Motion</h2>
          <p className="text-[#a0b1c5] text-lg max-w-2xl mx-auto">
            Experience the fluidity and elegance of our Framer-built websites across all devices.
          </p>
          
          {/* Scroll progress indicator */}
          <div className="flex gap-2 mt-3 justify-center">
            {portfolioItems.map((_, index) => (
              <div 
                key={index} 
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === activePanel 
                    ? "bg-[#8faabe] w-12" 
                    : "bg-[#2a3546] w-6"
                }`}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Horizontal Scrolling Portfolio Section - positioned higher */}
        <div 
          ref={trackRef} 
          className="flex flex-nowrap gap-8 items-start justify-start min-h-[45vh] -mt-2 mb-4 mx-auto"
        >
          {portfolioItems.map((item, index) => (
            <div 
              key={item.id}
              className={`shrink-0 w-[90vw] sm:w-[85vw] md:w-[70vw] lg:w-[55vw] transition-all duration-500 ${
                index === activePanel ? "scale-100 opacity-100" : "scale-95 opacity-70"
              }`}
            >
              <div className="bg-[#1c2534] rounded-lg overflow-hidden shadow-lg">
                <div className="aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/7] relative bg-[#0f1520]">
                  <LaptopAnimation />
                </div>
                <div className="p-4">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-[#a0b1c5] text-sm md:text-base max-w-lg">{item.description}</p>
                  <button className="mt-2 px-4 py-1.5 bg-[#2a3546] hover:bg-[#3a4556] text-white rounded-md transition-colors text-sm">
                    View Project
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll hint for mobile */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-[#5d7b9c] text-sm md:hidden animate-bounce">
        Scroll to explore more
      </div>
    </section>
  )
}

