"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import LaptopAnimation from "./laptop-animation"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import { Button } from "@/components/ui/button"

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Portfolio items
const portfolioItems = [
  {
    id: 1,
    title: "Responsive E-Commerce",
    description: "Adaptive design with seamless shopping experience across all devices.",
    image: "/responsivedg/resdesk1.png",
    mobileImage: "/responsivedg/respho1.png"
  },
  {
    id: 2,
    title: "Creative Portfolio",
    description: "Showcase of creative work with fluid animations and responsive layouts.",
    image: "/responsivedg/resdesk2.png",
    mobileImage: "/responsivedg/respho2.png"
  },
  {
    id: 3,
    title: "Corporate Website",
    description: "Professional business site optimized for desktop, tablet, and mobile viewing.",
    image: "/responsivedg/resdesk3.png",
    mobileImage: "/responsivedg/respho3.png"
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
        viewportHeight * 0.7, // Minimum height to maintain proportions
        window.innerWidth < 768 
          ? viewportHeight * 0.7 * panelCount // Mobile sizing (reduced)
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
      {/* Background Elements - Removed */}
      <div className="container mx-auto px-10 md:px-6 relative flex flex-col h-full">
        <motion.div ref={titleRef} className="text-center mb-0 md:mb-4" style={{ y, opacity }}>
          <div className="inline-block px-4 py-1 mb-2 bg-[#1c2534] rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#a0b1c5]/10 via-[#8faabe]/10 to-[#5d7b9c]/10" />
            <span className="relative text-[#c6d4e3] text-sm uppercase tracking-widest">Responsive Design</span>
          </div>
          <h2 className="font-serif text-2xl md:text-4xl mb-1 md:mb-2">Our Work in Motion</h2>
          <p className="text-[#a0b1c5] text-sm md:text-lg max-w-2xl mx-auto">
            Experience the fluidity and elegance of our Framer-built websites across all devices.
          </p>
          
          {/* Scroll progress indicator */}
          <div className="flex gap-2 mt-2 md:mt-3 justify-center">
            {portfolioItems.map((_, index) => (
              <div 
                key={index} 
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === activePanel 
                    ? "bg-[#8faabe] w-8 md:w-12" 
                    : "bg-[#2a3546] w-4 md:w-6"
                }`}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Horizontal Scrolling Portfolio Section */}
        <div 
          ref={trackRef} 
          className="flex flex-nowrap gap-4 md:gap-8 items-start justify-start min-h-[35vh] md:min-h-[45vh] -mt-0 mb-2 mx-auto"
        >
          {portfolioItems.map((item, index) => (
            <div 
              key={item.id}
              className={`shrink-0 w-[85vw] sm:w-[80vw] md:w-[70vw] lg:w-[55vw] transition-all duration-500 ${
                index === activePanel ? "scale-100 opacity-100" : "scale-95 opacity-70"
              }`}
            >
              <CardSpotlight
                className="bg-[#111622]/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-[#2a3546]"
                radius={450}
                color="#2a3546"
              >
                <div className="aspect-[16/12] sm:aspect-[16/10] md:aspect-[16/7] relative bg-[#0f1520]">
                  <LaptopAnimation 
                    desktopImage={item.image}
                    mobileImage={item.mobileImage}
                  />
                </div>
                <div className="p-2 md:p-4">
                  <h3 className="text-base md:text-xl font-semibold text-white mb-0.5 md:mb-1">{item.title}</h3>
                  <p className="text-[#a0b1c5] text-xs md:text-base max-w-lg">{item.description}</p>
                  <Button
                    variant="nav"
                    size="sm"
                    className="mt-1 md:mt-2"
                  >
                    View Project
                  </Button>
                </div>
              </CardSpotlight>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll hint for mobile */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-[#5d7b9c] text-xs md:text-sm md:hidden animate-bounce">
        Scroll to explore more
      </div>
    </section>
  )
}

