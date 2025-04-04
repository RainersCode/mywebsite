"use client"

import React, { useState } from "react"
import { Container } from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Linkedin, Clock } from "lucide-react"
import { CardSpotlight } from "@/components/ui/card-spotlight"

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [sending, setSending] = useState(false)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // Clear form
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    
    setSending(false)
    
    // Here you would normally handle the form submission to your backend
    console.log("Form submitted:", formState)
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <Container className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            Get in Touch
          </h2>
          <p className="text-[#c6d4e3] max-w-2xl mx-auto">
            Have a question or want to work together? Drop us a message and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form - Takes up 2/3 of the space on large screens */}
          <div className="lg:col-span-2">
            <CardSpotlight 
              className="p-6 bg-[#111622]/80 backdrop-blur-sm border-[#2a3546]"
              radius={300}
            >
              <h3 className="text-xl font-semibold text-white mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[#c6d4e3] text-sm">
                      Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formState.name}
                      onChange={handleChange}
                      className="relative bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[#c6d4e3] text-sm">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formState.email}
                      onChange={handleChange}
                      className="relative bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69]"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <label htmlFor="subject" className="text-[#c6d4e3] text-sm">
                    Subject
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="relative bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69]"
                    required
                  />
                </div>
                <div className="space-y-2 mb-6">
                  <label htmlFor="message" className="text-[#c6d4e3] text-sm">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formState.message}
                    onChange={handleChange}
                    className="relative bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69] min-h-[150px]"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={sending}
                  variant="nav"
                  className="w-full"
                >
                  {sending ? "SENDING..." : "SEND MESSAGE"}
                </Button>
              </form>
            </CardSpotlight>
          </div>

          {/* Contact Information & Office Hours - Takes up 1/3 of the space on large screens */}
          <div className="space-y-6">
            <CardSpotlight 
              className="p-6 bg-[#111622]/80 backdrop-blur-sm border-[#2a3546]"
              radius={300}
            >
              <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-[#7d8ea1] mr-3" />
                  <a href="mailto:info@webdeco.com" className="text-[#c6d4e3] hover:text-white transition-colors">
                    info@webdeco.com
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
                    href="https://linkedin.com/company/webdeco" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#c6d4e3] hover:text-white transition-colors"
                  >
                    linkedin.com/company/webdeco
                  </a>
                </div>
              </div>
            </CardSpotlight>

            <CardSpotlight 
              className="p-6 bg-[#111622]/80 backdrop-blur-sm border-[#2a3546]"
              radius={300}
            >
              <h3 className="text-xl font-semibold text-white mb-6">Office Hours</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-[#7d8ea1] mr-3" />
                  <div>
                    <p className="text-[#c6d4e3]">Monday - Friday:</p>
                    <p className="text-white">9:00 AM - 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-[#7d8ea1] mr-3 mt-1" />
                  <div>
                    <p className="text-[#c6d4e3]">Saturday:</p>
                    <p className="text-white">10:00 AM - 4:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-[#7d8ea1] mr-3 mt-1" />
                  <div>
                    <p className="text-[#c6d4e3]">Sunday:</p>
                    <p className="text-white">Closed</p>
                  </div>
                </div>
              </div>
            </CardSpotlight>
          </div>
        </div>
      </Container>

      {/* Dark background with gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050813] via-[#0a0e1c] to-[#050813] z-0"></div>
    </section>
  )
}

