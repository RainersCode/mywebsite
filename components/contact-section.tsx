"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, Linkedin } from "lucide-react"

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
      {/* Background Elements - Removed */}
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

