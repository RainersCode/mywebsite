"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, Linkedin } from "lucide-react"

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

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log(formState)
    alert("Thank you for your message! We'll get back to you soon.")
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 bg-[#141b27] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-1/3 w-[1px] h-1/3 bg-gradient-to-b from-transparent via-[#a0b1c5] to-transparent shadow-[0_0_8px_0px_#a0b1c5]" 
          animate={{
            y: ["-30%", "100%", "-30%"],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/3 w-[1px] h-1/3 bg-gradient-to-b from-transparent via-[#5d7b9c] to-transparent shadow-[0_0_8px_0px_#5d7b9c]" 
          animate={{
            y: ["100%", "-30%", "100%"],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.8
          }}
        />
        <motion.div 
          className="absolute top-0 right-1/4 w-[1px] h-1/3 bg-gradient-to-b from-transparent via-[#a0b1c5] to-transparent shadow-[0_0_8px_0px_#a0b1c5]" 
          animate={{
            y: ["-30%", "120%", "-30%"],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-1/4 w-[1px] h-1/3 bg-gradient-to-b from-transparent via-[#5d7b9c] to-transparent shadow-[0_0_8px_0px_#5d7b9c]" 
          animate={{
            y: ["120%", "-30%", "120%"],
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
        {[...Array(14)].map((_, i) => (
          <SilverTrail key={i} index={i} />
        ))}
      </div>

      <div className="container mx-auto px-6">
        <motion.div className="max-w-4xl mx-auto" style={{ y, opacity }}>
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 mb-4 bg-[#1c2534] border border-[#2a3546] rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#a0b1c5]/10 via-[#8faabe]/10 to-[#5d7b9c]/10" />
              <span className="relative text-[#c6d4e3] text-sm uppercase tracking-widest">Get In Touch</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">Contact Us</h2>
            <p className="text-[#a0b1c5] text-lg max-w-2xl mx-auto">
              Ready to discuss your project? Get in touch with us today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#a0b1c5]/50 to-[#5d7b9c]/50 rounded opacity-0 group-focus-within:opacity-100 transition duration-300"></div>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formState.name}
                      onChange={handleChange}
                      className="relative bg-[#1c2534]/50 border-[#2a3546] focus:border-[#3d4f69]"
                      required
                    />
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#97a8bc]/50 to-[#5f7d9e]/50 rounded opacity-0 group-focus-within:opacity-100 transition duration-300"></div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formState.email}
                      onChange={handleChange}
                      className="relative bg-[#1c2534]/50 border-[#2a3546] focus:border-[#3d4f69]"
                      required
                    />
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8fa0b4]/50 to-[#617f9f]/50 rounded opacity-0 group-focus-within:opacity-100 transition duration-300"></div>
                  <Input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="relative bg-[#1c2534]/50 border-[#2a3546] focus:border-[#3d4f69]"
                    required
                  />
                </div>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#a0b1c5]/50 to-[#5d7b9c]/50 rounded opacity-0 group-focus-within:opacity-100 transition duration-300"></div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formState.message}
                    onChange={handleChange}
                    className="relative bg-[#1c2534]/50 border-[#2a3546] focus:border-[#3d4f69] min-h-[150px]"
                    required
                  />
                </div>
                <div className="relative inline-block group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#a0b1c5] to-[#5d7b9c] rounded opacity-70 group-hover:opacity-100 blur transition duration-300"></div>
                  <Button
                    type="submit"
                    className="relative px-8 py-6 h-auto bg-[#141b27] text-[#c6d4e3] hover:bg-[#1c2534]"
                  >
                    SEND MESSAGE
                  </Button>
                </div>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-[#1c2534]/50 p-6 border border-[#2a3546] relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#a0b1c5] to-[#5d7b9c] opacity-70"></div>
                <h3 className="text-lg font-medium mb-3">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-[#7d8ea1] mr-3" />
                    <a
                      href="mailto:contact@framerstudio.com"
                      className="text-[#c6d4e3] hover:text-white transition-colors"
                    >
                      contact@framerstudio.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-[#7d8ea1] mr-3" />
                    <a href="tel:+1234567890" className="text-[#c6d4e3] hover:text-white transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Linkedin className="h-5 w-5 text-[#7d8ea1] mr-3" />
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#c6d4e3] hover:text-white transition-colors"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-[#1c2534]/50 p-6 border border-[#2a3546] relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#a0b1c5] to-[#5d7b9c] opacity-70"></div>
                <h3 className="text-lg font-medium mb-3">Office Hours</h3>
                <p className="text-[#a0b1c5]">
                  Monday - Friday: 9am - 6pm
                  <br />
                  Saturday - Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

