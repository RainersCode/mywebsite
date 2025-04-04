"use client"

import { useEffect, useRef, useState, useCallback, memo } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import LaptopAnimation from "./laptop-animation"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

// Define the type for a portfolio item
type PortfolioItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  mobileImage: string;
  slug: string;
};

// Memoize the portfolio item component to prevent unnecessary re-renders
const PortfolioItemComponent = memo(({ 
  item, 
  isActive 
}: { 
  item: PortfolioItem, 
  isActive: boolean 
}) => {
  return (
    <div 
      className={`transition-all duration-500 ${
        isActive 
          ? "scale-100 opacity-100 transform-gpu" 
          : "scale-[0.85] opacity-30 blur-[1px]"
      }`}
      style={{
        zIndex: isActive ? 10 : 0,
        transition: "all 0.5s ease-out",
        willChange: 'transform, opacity' // Hint to browser for optimization
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
            asChild
          >
            <Link href={`/projects/${item.slug}`}>
              View Project
            </Link>
          </Button>
        </div>
      </CardSpotlight>
    </div>
  );
});
PortfolioItemComponent.displayName = 'PortfolioItemComponent';

// Portfolio items
const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Rugby Club Website & Admin Portal",
    description: "Comprehensive website for a rugby club with public content and secure admin portal.",
    image: "/responsivedg/resdesk1.png",
    mobileImage: "/responsivedg/respho1.png",
    slug: "responsive-ecommerce"
  },
  {
    id: 2,
    title: "Fitness Trainer Website",
    description: "Modern, responsive personal training website with online booking system.",
    image: "/responsivedg/resdesk2.png",
    mobileImage: "/responsivedg/respho2.png",
    slug: "creative-portfolio"
  },
  {
    id: 3,
    title: "Agricultural Export Consultancy",
    description: "Professional website for livestock export consultancy with service showcase and contact system.",
    image: "/responsivedg/resdesk3.png",
    mobileImage: "/responsivedg/respho3.png",
    slug: "corporate-website"
  },
  {
    id: 4,
    title: "Digital Agency Portfolio",
    description: "Modern dark-themed developer portfolio with interactive particle background and clean UI.",
    image: "/responsivedg/respdesk4.png",
    mobileImage: "/responsivedg/respho4.png",
    slug: "e-learning-platform"
  }
];

export default function PortfolioShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activePanel, setActivePanel] = useState(0)
  
  // Store ScrollTrigger instance in a ref to avoid recreating it on re-renders
  const scrollTriggerRef = useRef<any>(null);
  const timelineRef = useRef<any>(null);
  
  // Use a ref for the goToPanel function to avoid circular dependencies
  const goPanelRef = useRef<(index: number) => void>(undefined!);
  
  // Touch handling state
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isSwiping, setIsSwiping] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)
  const [swipeDistance, setSwipeDistance] = useState(0)
  
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
  
  // For touch swiping, let's add some variables to track manual dragging
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const currentOffsetRef = useRef(0);
  
  // Function to navigate to a specific panel with useCallback
  const goToPanel = useCallback((index: number) => {
    if (index < 0 || index >= portfolioItems.length) return
    
    setActivePanel(index)
    
    // For mobile, we handle the sliding directly
    if (isMobile && trackRef.current) {
      const track = trackRef.current;
      const viewportWidth = window.innerWidth;
      
      // Find the target slide
      const targetSlide = track.children[index] as HTMLElement;
      if (targetSlide) {
        const slideWidth = targetSlide.offsetWidth;
        const slideLeft = targetSlide.offsetLeft;
        
        // Adjust position to be slightly left of center (visual correction)
        // Smaller screens need less offset
        const leftOffsetPercentage = Math.min(0.12, Math.max(0.08, viewportWidth / 5000));
        const leftOffset = viewportWidth * leftOffsetPercentage;
        const leftPosition = (viewportWidth - slideWidth) / 2 - leftOffset;
        const targetPosition = leftPosition - slideLeft;
        
        // Animate to that position
        gsap.to(track, {
          x: targetPosition,
          duration: 0.4,
          ease: "power2.out"
        });
      }
      
      return;
    }
    
    // Desktop scroll logic
    if (scrollTriggerRef.current) {
      const scrollInstance = scrollTriggerRef.current
      const panelCount = portfolioItems.length
      const segmentSize = 1 / panelCount
      
      // Calculate target progress (center of the panel's segment)
      const targetProgress = segmentSize * index + (segmentSize / 2)
      
      // Convert progress to scroll position
      const scrollPositionPx = scrollInstance.start + 
        (scrollInstance.end - scrollInstance.start) * targetProgress
      
      // Animate to that scroll position
      gsap.to(window, {
        scrollTo: { y: scrollPositionPx },
        duration: 0.5,
        ease: "power2.out"
      })
    }
  }, [isMobile]);
  
  // Update the ref whenever goToPanel changes
  useEffect(() => {
    goPanelRef.current = goToPanel;
  }, [goToPanel]);
  
  // Optimize event handlers with useCallback
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const track = trackRef.current;
    if (!track || !isMobile) return;
    
    // Get the current transform value
    const transform = window.getComputedStyle(track).transform;
    let currentX = 0;
    
    // Parse the transform matrix to get current X position
    if (transform && transform !== 'none') {
      const matrix = transform.match(/matrix.*\((.+)\)/);
      if (matrix) {
        const values = matrix[1].split(', ');
        currentX = parseFloat(values[4] || '0');
      }
    }
    
    // Store the current X position and touch start position
    currentOffsetRef.current = currentX;
    startXRef.current = e.targetTouches[0].clientX;
    draggingRef.current = true;
    
    // Also update state for visual feedback
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwiping(true);
    setSwipeDirection(null);
    setSwipeDistance(0);
  }, [isMobile]);
  
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const track = trackRef.current;
    if (!track || !isMobile || !draggingRef.current) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    const deltaX = currentTouch - startXRef.current;
    
    // Apply direct transform during drag for immediate feedback
    const newX = currentOffsetRef.current + deltaX;
    gsap.set(track, { x: newX });
    
    // Update state for visual indicators
    setTouchEnd(currentTouch);
    const distance = startXRef.current - currentTouch;
    setSwipeDistance(Math.abs(distance));
    
    if (distance > 10) {
      setSwipeDirection('left');
    } else if (distance < -10) {
      setSwipeDirection('right');
    } else {
      setSwipeDirection(null);
    }
  }, [isMobile]);
  
  const handleTouchEnd = useCallback(() => {
    draggingRef.current = false;
    
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && activePanel < portfolioItems.length - 1) {
      // Handle left swipe - go to next panel
      if (goPanelRef.current) {
        goPanelRef.current(activePanel + 1);
      }
    } else if (isRightSwipe && activePanel > 0) {
      // Handle right swipe - go to previous panel
      if (goPanelRef.current) {
        goPanelRef.current(activePanel - 1);
      }
    } else {
      // If not enough distance for a swipe, snap back to current panel
      if (goPanelRef.current) {
        goPanelRef.current(activePanel);
      }
    }
    
    // Reset touch state
    setTouchStart(null);
    setTouchEnd(null);
    setIsSwiping(false);
  }, [touchStart, touchEnd, activePanel]);
  
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
    
    // For mobile, we'll only setup the basic structure and let CSS handle transitions
    const isMobileView = window.innerWidth < 768;
    
    if (isMobileView) {
      // Set initial centered position for first slide
      setTimeout(() => {
        if (track) {
          // Initially center the first slide
          const firstSlide = track.children[0] as HTMLElement;
          if (firstSlide) {
            const slideWidth = firstSlide.offsetWidth;
            // Apply the same responsive leftward shift as in goToPanel
            const leftOffsetPercentage = Math.min(0.12, Math.max(0.08, viewportWidth / 5000));
            const leftOffset = viewportWidth * leftOffsetPercentage;
            const leftPosition = (viewportWidth - slideWidth) / 2 - leftOffset;
            gsap.set(track, { 
              x: leftPosition
            });
          }
        }
      }, 100);
      
      // Ensure we're starting with panel 0
      setActivePanel(0);
      return;
    }
    
    // Continue with desktop ScrollTrigger setup
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
      
      // Make sure the right edge of the last panel is fully visible when scrolled to end
      const lastChild = track.children[track.children.length - 1] as HTMLElement;
      if (lastChild) {
        // Increase padding drastically to ensure the last item shifts far left
        const extraPadding = 400; // Increased from 250 to 400
        const lastPanelEndPosition = lastChild.offsetLeft + lastChild.offsetWidth + extraPadding;
        const minTrackWidth = lastPanelEndPosition + centerOffset;
        
        // Set a minimum width to ensure the last panel can be fully scrolled into view
        if (totalTrackWidth < minTrackWidth) {
          gsap.set(track, {
            width: minTrackWidth
          });
        }
      }
      
      // Calculate the appropriate section height based on viewport
      const viewportHeight = window.innerHeight;
      const sectionHeight = Math.max(
        viewportHeight * 0.7, // Minimum height to maintain proportions
        viewportHeight * 0.8 * panelCount // Desktop sizing
      );

      // Create the ScrollTrigger animation
      timelineRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${sectionHeight * 1.15}`,
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
            } else if (progress < segmentSize * 3) {
              // Third panel
              setActivePanel(2);
            } else if (progress <= 1) {
              // Fourth panel - ensure this triggers all the way to the end
              setActivePanel(3);
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
        x: () => {
          // Calculate the exact endpoint that ensures the last panel is fully visible
          // Increase the buffer drastically to shift content more to the left
          return -(totalTrackWidth - viewportWidth + 400); // Increased from 250 to 400
        },
        ease: "power1.inOut",
      });

      // Add even more right padding to the track to allow more leftward movement
      gsap.set(track, { 
        paddingLeft: centerOffset,
        paddingRight: centerOffset + 350, // Increased from 200 to 350
      });
    };

    // Initialize after a short delay to ensure DOM is ready
    const timer = setTimeout(initScrollTrigger, 100);
    
    // Make the animation responsive
    const resizeObserver = new ResizeObserver(() => {
      // On resize, check if we crossed the mobile/desktop threshold
      const wasMobile = isMobile;
      const isMobileNow = window.innerWidth < 768;
      
      // If we switched between mobile and desktop, refresh the page
      // This is a simple approach; a more complex one would re-initialize the component
      if (wasMobile !== isMobileNow) {
        window.location.reload();
        return;
      }
      
      // Otherwise just update ScrollTrigger
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
          
          {/* Mobile swipe container - this is the fixed outer container */}
          <div className={`${isMobile ? 'overflow-hidden' : 'overflow-visible'} min-h-[35vh] md:min-h-[45vh] relative z-20`}>
            {/* Horizontal Scrolling Portfolio Section - this is the sliding track */}
            <div 
              ref={trackRef} 
              className={`flex flex-nowrap gap-4 md:gap-8 items-start justify-start -mt-0 mb-2 mx-auto relative ${
                isMobile ? 'touch-action-none' : ''
              }`}
              onTouchStart={isMobile ? handleTouchStart : undefined}
              onTouchMove={isMobile ? handleTouchMove : undefined}
              onTouchEnd={isMobile ? handleTouchEnd : undefined}
              style={{ 
                willChange: isMobile ? 'transform' : 'auto'
                // Let GSAP handle the transform for more precise control
              }}
            >
              {portfolioItems.map((item, index) => (
                <div 
                  key={item.id}
                  className={`shrink-0 ${isMobile ? 'w-[80vw]' : 'w-[85vw] sm:w-[80vw] md:w-[70vw] lg:w-[55vw]'}`}
                  style={{
                    // Add extra margin to the last item in desktop view
                    marginRight: !isMobile && index === portfolioItems.length - 1 ? '400px' : undefined
                  }}
                >
                  <PortfolioItemComponent 
                    item={item} 
                    isActive={index === activePanel} 
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile navigation buttons - only inside the showcase section */}
          {isMobile && (
            <div className="flex gap-6 justify-center mt-6 pb-4">
              <button 
                onClick={() => activePanel > 0 && goToPanel(activePanel - 1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activePanel === 0 ? 'opacity-30 cursor-not-allowed' : 'bg-[#1c2534] opacity-70 hover:opacity-100'
                }`}
                disabled={activePanel === 0}
                aria-label="Previous project"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              
              <button 
                onClick={() => activePanel < portfolioItems.length - 1 && goToPanel(activePanel + 1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activePanel === portfolioItems.length - 1 ? 'opacity-30 cursor-not-allowed' : 'bg-[#1c2534] opacity-70 hover:opacity-100'
                }`}
                disabled={activePanel === portfolioItems.length - 1}
                aria-label="Next project"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Remove the fixed position mobile navigation buttons - now placed inside the section */}

      {/* Scroll hint for mobile - only visible when ScrollTrigger is active (desktop) */}
      {!isMobile && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 text-center md:block hidden z-[999]">
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

      {/* Swipe indicators - show arrows when swiping */}
      {isMobile && isSwiping && swipeDirection && swipeDistance > 20 && (
        <div className="fixed inset-0 pointer-events-none z-[1000] flex items-center justify-center">
          <div 
            className={`bg-[#1c2534]/30 backdrop-blur-sm rounded-full p-6 transform transition-all duration-300 ${
              swipeDirection === 'left' 
                ? 'translate-x-10' 
                : '-translate-x-10'
            }`}
            style={{
              opacity: Math.min(0.8, swipeDistance / 150)
            }}
          >
            {swipeDirection === 'left' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {activePanel < portfolioItems.length - 1 ? (
                  <path d="M9 18l6-6-6-6" />
                ) : (
                  <path d="M6 18l6-6-6-6" className="opacity-30" />
                )}
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {activePanel > 0 ? (
                  <path d="M15 18l-6-6 6-6" />
                ) : (
                  <path d="M15 18l-6-6 6-6" className="opacity-30" />
                )}
              </svg>
            )}
          </div>
        </div>
      )}
    </>
  )
}

