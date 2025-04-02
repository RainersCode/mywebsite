"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

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
          <Link href="#services" className="text-sm tracking-wide text-[#c6d4e3] hover:text-white transition-colors">
            SERVICES
          </Link>
          <Link href="#portfolio" className="text-sm tracking-wide text-[#c6d4e3] hover:text-white transition-colors">
            PORTFOLIO
          </Link>
          <Link href="#process" className="text-sm tracking-wide text-[#c6d4e3] hover:text-white transition-colors">
            PROCESS
          </Link>
          <Link
            href="#contact"
            className="text-sm px-5 py-2 border border-[#3d4f69] hover:border-[#a0b1c5] text-[#c6d4e3] hover:text-white transition-colors"
          >
            CONTACT
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-[#c6d4e3]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#141b27]/95 backdrop-blur-md border-b border-[#2a3546]">
          <nav className="container mx-auto px-6 py-6 flex flex-col space-y-4">
            <Link
              href="#services"
              className="text-sm tracking-wide py-2 text-[#c6d4e3] hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              SERVICES
            </Link>
            <Link
              href="#portfolio"
              className="text-sm tracking-wide py-2 text-[#c6d4e3] hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              PORTFOLIO
            </Link>
            <Link
              href="#process"
              className="text-sm tracking-wide py-2 text-[#c6d4e3] hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              PROCESS
            </Link>
            <Link
              href="#contact"
              className="text-sm py-2 text-[#c6d4e3] hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              CONTACT
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

