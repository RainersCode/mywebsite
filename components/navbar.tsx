"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle body scroll lock when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen])

  // Navigation items with icons and descriptions
  const navItems = [
    { 
      href: "/process", 
      label: "PROCESS", 
      description: "How we work" 
    },
    { 
      href: "/pricing", 
      label: "PRICING", 
      description: "Package options" 
    },
    { 
      href: "/projects", 
      label: "PROJECTS", 
      description: "Browse our projects" 
    },
    { 
      href: "/project-kickoff", 
      label: "START PROJECT", 
      description: "Begin your website" 
    },
    { 
      href: "#contact", 
      label: "CONTACT", 
      description: "Get in touch" 
    }
  ]

  // Animation variants
  const menuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98],
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      height: "100vh",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.04, 0.62, 0.23, 0.98],
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const linkVariants = {
    closed: { 
      x: -20, 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    open: { 
      x: 0, 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  }

  const buttonVariants = {
    rest: { 
      scale: 1,
      backgroundColor: "rgba(20, 27, 39, 0)",
      border: "1px solid rgba(61, 79, 105, 0)"
    },
    hover: { 
      scale: 1.1,
      backgroundColor: "rgba(20, 27, 39, 0.5)",
      border: "1px solid rgba(61, 79, 105, 1)"
    },
    pressed: { 
      scale: 0.95
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bg-[#141b27]/90 backdrop-blur-md py-3 border-b border-[#2a3546]" : "bg-transparent py-6",
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-serif tracking-wider">
          FRAMER<span className="text-[#a0b1c5]">STUDIO</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/process" className="text-sm tracking-wide text-[#c6d4e3] hover:text-white transition-colors">
            PROCESS
          </Link>
          <Link href="/pricing" className="text-sm tracking-wide text-[#c6d4e3] hover:text-white transition-colors">
            PRICING
          </Link>
          <Link href="/projects" className="text-sm tracking-wide text-[#c6d4e3] hover:text-white transition-colors">
            PROJECTS
          </Link>
          <Link href="/project-kickoff" className="text-sm tracking-wide text-[#c6d4e3] hover:text-white transition-colors">
            START PROJECT
          </Link>
          <Button asChild variant="default" size="sm">
            <Link href="#contact">CONTACT</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden relative z-50 w-12 h-12 rounded-full flex items-center justify-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="pressed"
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-white"
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-[#c6d4e3]"
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Navigation - Fullscreen overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {/* Solid background layer */}
            <div className="absolute inset-0 bg-[#090c17]"></div>
            
            {/* Overlay with blur effect */}
            <div className="absolute inset-0 bg-[#0A0F1B]/95 backdrop-blur-lg"></div>
            
            {/* Additional darkening gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3d4f69] to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3d4f69] to-transparent opacity-50"></div>
            <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-[#a0b1c5]/5 blur-3xl"></div>
            <div className="absolute bottom-1/4 -right-20 w-40 h-40 rounded-full bg-[#5d7b9c]/5 blur-3xl"></div>
            
            <div className="container mx-auto h-full px-6 pt-16 pb-10 flex flex-col justify-start">
              <motion.div 
                className="text-2xl font-serif mb-8 text-center relative z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                FRAMER<span className="text-[#a0b1c5]">STUDIO</span>
              </motion.div>
              
              <nav className="w-full max-w-md mx-auto flex flex-col gap-2 relative z-10">
                {navItems.map((item, index) => (
                  <motion.div 
                    key={item.href}
                    variants={linkVariants}
                    custom={index}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#141b27]/50 to-[#1c2534]/50 rounded-lg scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300"></div>
                    <Link
                      href={item.href}
                      className="relative block p-3 z-10"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-white font-medium mb-0.5">{item.label}</div>
                          <div className="text-[9px] text-[#a0b1c5]">{item.description}</div>
                        </div>
                        <motion.div 
                          className="w-6 h-6 rounded-full border border-[#3d4f69] flex items-center justify-center"
                          whileHover={{ x: 5, borderColor: "#a0b1c5" }}
                        >
                          <svg 
                            width="8" 
                            height="8" 
                            viewBox="0 0 12 12" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-[#a0b1c5]"
                          >
                            <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </motion.div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              
              {/* Contact Information */}
              <motion.div 
                className="mt-10 flex flex-col gap-4 w-full max-w-md mx-auto relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#3d4f69] to-transparent opacity-30 mb-2"></div>
                
                <a 
                  href="tel:+1234567890" 
                  className="relative flex items-center gap-3 p-3 group"
                >
                  <div className="w-8 h-8 rounded-full border border-[#3d4f69] flex items-center justify-center bg-[#141b27]/40 group-hover:border-[#a0b1c5] transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#a0b1c5]">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[#a0b1c5] text-xs">Call Us</div>
                    <div className="text-white text-sm font-medium">+1 (234) 567-890</div>
                  </div>
                </a>
                
                <a 
                  href="mailto:info@framerstudio.com" 
                  className="relative flex items-center gap-3 p-3 group"
                >
                  <div className="w-8 h-8 rounded-full border border-[#3d4f69] flex items-center justify-center bg-[#141b27]/40 group-hover:border-[#a0b1c5] transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#a0b1c5]">
                      <path d="M22 8.62v7.76a2 2 0 0 1-2 2h-1.09c.048-.327.09-.656.09-.99 0-3.87-3.13-7-7-7s-7 3.13-7 7c0 .334.042.663.09.99H4a2 2 0 0 1-2-2V8.62a2.001 2.001 0 0 1 1.27-1.862l7.5-3.409a2 2 0 0 1 1.677-.036l7.773 3.409A2 2 0 0 1 22 8.62z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 14.5c-2.21 0-4 1.79-4 4 0 .74.21 1.41.58 2h6.84c.37-.59.58-1.26.58-2 0-2.21-1.79-4-4-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[#a0b1c5] text-xs">Email Us</div>
                    <div className="text-white text-sm font-medium">info@framerstudio.com</div>
                  </div>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

