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

  // Detect if we're on mobile for different animation settings
  const [isMobile, setIsMobile] = useState(false)
  // Track if footer is visible to hide scroll indicator
  const [isFooterVisible, setIsFooterVisible] = useState(false)
  
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

  // Set up intersection observer for footer
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Get footer element
    const footer = document.getElementById('footer') || document.querySelector('footer');
    if (!footer) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        // Update state when footer visibility changes
        entries.forEach(entry => {
          setIsFooterVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 } // Trigger when at least 10% of the footer is visible
    );
    
    // Start observing the footer
    observer.observe(footer);
    
    // Cleanup observer on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  // Reduce movement on mobile
  const y = useTransform(
    scrollYProgress, 
    [0, 0.5], 
    isMobile ? ["30px", "-30px"] : ["100px", "-100px"]
  )
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
            // Completely simplified panel detection based on scroll progress position
            // This approach avoids complex DOM position calculations
            const progress = self.progress;
            
            // Directly map scroll progress to panel index
            // For example, with 3 panels:
            // 0-0.33 = panel 0, 0.33-0.66 = panel 1, 0.66-1 = panel 2
            const panelCount = portfolioItems.length;
            const segmentSize = 1 / panelCount;
            
            // Calculate which panel should be active based on progress
            // For the first panel, we use a larger active zone to make it easier to activate
            if (progress < segmentSize * 1.2) {
              // First panel - give it a 20% larger activation zone
              setActivePanel(0);
            } else if (progress < segmentSize * 2) {
              // Second panel
              setActivePanel(1);
            } else {
              // Last panel
              setActivePanel(2);
            }
          },
          onEnter: () => {
            // Add a class to control z-index when the section is active
            if (section) {
              section.classList.add('z-20');
            }
          },
          onLeaveBack: () => {
            // Remove the class when scrolling above the section
            if (section) {
              section.classList.remove('z-20');
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
    <>
      <section
        id="portfolio"
        ref={sectionRef}
        className="py-8 md:py-12 bg-gradient-to-b from-[#0f1520] to-[#141b27] relative overflow-hidden isolation"
      >
        {/* Add a fixed background to prevent content from showing through */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1520] to-[#141b27] z-0"></div>

        {/* Background Elements - Removed */}
        <div className="container mx-auto px-10 md:px-6 relative flex flex-col h-full">
          <motion.div 
            ref={titleRef} 
            className="text-center mb-0 md:mb-4 relative z-30" 
            style={{ y, opacity }}
          >
            <div className="inline-block px-4 py-1 mb-2 bg-[#1c2534] rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#a0b1c5]/10 via-[#8faabe]/10 to-[#5d7b9c]/10" />
              <span className="relative text-[#c6d4e3] text-sm uppercase tracking-widest">Responsive Design</span>
            </div>
            <h2 className="font-serif text-2xl md:text-4xl mb-1 md:mb-2">Our Work in Motion</h2>
            <p className="text-[#a0b1c5] text-sm md:text-lg max-w-2xl mx-auto">
              Experience the fluidity and elegance of our Framer-built websites across all devices.
            </p>
            
            {/* Scroll progress indicator */}
            <div className="flex gap-3 mt-4 md:mt-5 justify-center">
              {portfolioItems.map((_, index) => (
                <div 
                  key={index} 
                  className={`rounded-full transition-all duration-300 ${
                    index === activePanel 
                      ? "bg-gradient-to-r from-[#a0b1c5] to-[#5d7b9c] w-10 md:w-14 h-2 shadow-[0_0_8px_rgba(160,177,197,0.5)]" 
                      : "bg-[#2a3546] w-5 md:w-7 h-1"
                  }`}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Horizontal Scrolling Portfolio Section */}
          <div 
            ref={trackRef} 
            className="flex flex-nowrap gap-4 md:gap-8 items-start justify-start min-h-[35vh] md:min-h-[45vh] -mt-0 mb-2 mx-auto relative z-20"
          >
            {portfolioItems.map((item, index) => {
              // Determine if this item is active
              const isActive = index === activePanel;
              
              return (
                <div 
                  key={item.id}
                  className={`shrink-0 w-[85vw] sm:w-[80vw] md:w-[70vw] lg:w-[55vw] transition-all duration-500 ${
                    isActive 
                      ? "scale-100 opacity-100 transform-gpu" 
                      : "scale-[0.85] opacity-30 blur-[1px]"
                  }`}
                  style={{
                    zIndex: isActive ? 10 : 0,
                    transition: "all 0.5s ease-out"
                  }}
                >
                  <CardSpotlight
                    className="bg-[#111622]/80 rounded-lg overflow-hidden shadow-lg border border-[#2a3546] no-hover"
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Scroll hint for mobile - fixed position outside the section flow */}
      {isMobile && !isFooterVisible && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 text-center md:hidden z-[999]">
          <div className="flex flex-col items-center">
            <motion.div 
              className="w-px h-16 bg-gradient-to-b from-transparent via-[#5d7b9c]/40 to-[#5d7b9c]/60"
              animate={{ 
                height: ["60px", "70px", "60px"],
                opacity: [0.6, 1, 0.6] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "mirror"
              }}
            />
            <motion.p 
              className="text-xs tracking-widest text-[#5d7b9c] mt-1"
              animate={{ 
                opacity: [0.7, 1, 0.4, 1, 0.7],
                y: [0, -3, 0, -3, 0],
                scale: [1, 1.1, 1, 1.1, 1],
                textShadow: [
                  "0 0 0px rgba(93,123,156,0)",
                  "0 0 8px rgba(93,123,156,0.7)",
                  "0 0 2px rgba(93,123,156,0.3)",
                  "0 0 8px rgba(93,123,156,0.7)",
                  "0 0 0px rgba(93,123,156,0)"
                ]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatType: "loop",
                ease: "easeInOut"
              }}
            >
              SCROLL
            </motion.p>
          </div>
        </div>
      )}
    </>
  )
}

