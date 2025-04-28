"use client"

import { useState } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Container } from "@/components/ui/container"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { SlidingNumber } from "@/components/ui/sliding-number"
import { BudgetSlider } from "@/components/ui/budget-slider"
import { ParticlesBackground } from "@/components/ui/particles-background"

export default function ProjectKickoffPage() {
  const [currentSection, setCurrentSection] = useState(1)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formState, setFormState] = useState({
    // Contact Information
    name: "",
    email: "",
    phone: "",
    company: "",
    contactPreference: "email",
    
    // About Your Business
    websiteName: "",
    businessDescription: "",
    uniqueValue: "",
    targetAudience: "",
    existingWebsite: "",
    existingWebsiteFeedback: "",
    competitors: "",
    
    // Website Goals
    primaryGoal: "",
    secondaryGoals: [],
    desiredActions: "",
    
    // Design Preferences
    hasLogo: false,
    brandGuidelines: "no",
    preferredColors: "",
    preferredFonts: "",
    lookAndFeel: "",
    websitesLiked: "",
    websitesDisliked: "",
    
    // Content & Functionality
    pages: [],
    contentReady: "no",
    mediaReady: "no",
    features: [],
    ecommerceDetails: "",
    
    // Logistics & Budget
    hasDomain: "no",
    domainName: "",
    hasHosting: "no",
    deadline: "",
    budget: "essential",
    additionalInfo: ""
  })
  
  const [sending, setSending] = useState(false)
  
  // Function to handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  
  // Function to handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  
  // Function to handle checkbox changes
  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    setFormState((prev) => {
      const currentValues = Array.isArray(prev[name as keyof typeof prev]) 
        ? prev[name as keyof typeof prev] as string[]
        : []
        
      return {
        ...prev,
        [name]: checked 
          ? [...currentValues, value]
          : currentValues.filter(item => item !== value)
      }
    })
  }
  
  // Function to handle boolean checkbox changes
  const handleBooleanChange = (name: string, checked: boolean) => {
    setFormState((prev) => ({
      ...prev,
      [name]: checked
    }))
  }
  
  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setFormSubmitted(true)
    setSending(false)
    
    // Here you would normally handle the form submission to your backend
    console.log("Form submitted:", formState)
  }
  
  // Function to navigate to next section
  const nextSection = () => {
    window.scrollTo(0, 0)
    setCurrentSection(currentSection + 1)
  }
  
  // Function to navigate to previous section
  const prevSection = () => {
    window.scrollTo(0, 0)
    setCurrentSection(currentSection - 1)
  }
  
  return (
    <div className="min-h-screen bg-[#141b27] text-zinc-100">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#141b27] to-[#111622] relative overflow-hidden">
          <ParticlesBackground visibility="reduced" />
          <Container className="relative z-30">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block px-4 py-1 mb-4 bg-[#1c2534] border border-[#2a3546] rounded-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#a0b1c5]/10 via-[#8faabe]/10 to-[#5d7b9c]/10" />
                <span className="relative text-[#c6d4e3] text-sm uppercase tracking-widest">Project Kickoff</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">Let's Build Your Awesome Website!</h1>
              <p className="text-[#a0b1c5] text-lg md:text-xl max-w-3xl mx-auto mb-8">
                Tell Us About Your Vision
              </p>
            </div>
          </Container>
        </section>

        {/* Form Introduction */}
        <section className="py-12 bg-gradient-to-b from-[#111622] to-[#0f1520]">
          <Container>
            <CardSpotlight 
              className="p-8 bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] max-w-4xl mx-auto mb-12"
              radius={300}
            >
              <p className="text-[#c6d4e3] mb-6">
                Welcome! We're excited about the possibility of working together. This form is the first step in our collaborative process. By providing detailed information below, you help us understand your business, goals, and design preferences right from the start.
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-4">Why this form?</h3>
              
              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[#2a3546] text-[#c6d4e3] flex items-center justify-center mr-3 mt-0.5">✓</div>
                  <div>
                    <span className="text-[#c6d4e3] font-medium">Efficiency:</span> It helps us gather all the essential details in one place, saving time for both of us.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[#2a3546] text-[#c6d4e3] flex items-center justify-center mr-3 mt-0.5">✓</div>
                  <div>
                    <span className="text-[#c6d4e3] font-medium">Clarity:</span> Ensures we're on the same page regarding your vision and requirements.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[#2a3546] text-[#c6d4e3] flex items-center justify-center mr-3 mt-0.5">✓</div>
                  <div>
                    <span className="text-[#c6d4e3] font-medium">Better Proposals:</span> Allows us to provide a more accurate and tailored proposal or estimate for your project.
                  </div>
                </li>
              </ul>
              
              <p className="text-[#c6d4e3]">
                Please take a few moments to fill this out as completely as possible. The more detail you provide, the better we can serve you!
              </p>
            </CardSpotlight>
          </Container>
        </section>

        {/* Form Sections will be added in the next edit */}
        
        {/* Form Section */}
        <section className="py-12 bg-[#0f1520]">
          <Container>
            <div className="max-w-4xl mx-auto">
              {!formSubmitted ? (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="font-serif text-2xl">The Project Kickoff Form</h2>
                    <div className="text-sm text-[#a0b1c5]">
                      Section {currentSection} of 6
                    </div>
                  </div>
                
                  <CardSpotlight 
                    className="p-8 bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] mb-8"
                    radius={300}
                  >
                    <form onSubmit={handleSubmit}>
                      {/* Section 1: Contact Information */}
                      {currentSection === 1 && (
                        <div className="space-y-8">
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-6">Section 1: Your Contact Information</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                              <div className="space-y-2">
                                <label htmlFor="name" className="text-[#c6d4e3] text-sm flex items-center">
                                  Your Name <span className="text-[#a0b1c5] ml-1">*</span>
                                </label>
                                <Input
                                  id="name"
                                  name="name"
                                  value={formState.name}
                                  onChange={handleChange}
                                  placeholder="Enter your full name"
                                  className="bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69]"
                                  required
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <label htmlFor="email" className="text-[#c6d4e3] text-sm flex items-center">
                                  Your Email <span className="text-[#a0b1c5] ml-1">*</span>
                                </label>
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  value={formState.email}
                                  onChange={handleChange}
                                  placeholder="your@email.com"
                                  className="bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69]"
                                  required
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                              <div className="space-y-2">
                                <label htmlFor="phone" className="text-[#c6d4e3] text-sm">
                                  Your Phone Number (Optional)
                                </label>
                                <Input
                                  id="phone"
                                  name="phone"
                                  value={formState.phone}
                                  onChange={handleChange}
                                  placeholder="+1 (123) 456-7890"
                                  className="bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69]"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <label htmlFor="company" className="text-[#c6d4e3] text-sm">
                                  Company Name (if applicable)
                                </label>
                                <Input
                                  id="company"
                                  name="company"
                                  value={formState.company}
                                  onChange={handleChange}
                                  placeholder="Your company name"
                                  className="bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69]"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="contactPreference" className="text-[#c6d4e3] text-sm">
                                Best Way to Reach You?
                              </label>
                              <Select
                                value={formState.contactPreference}
                                onValueChange={(value) => handleSelectChange("contactPreference", value)}
                              >
                                <SelectTrigger className="bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69]">
                                  <SelectValue placeholder="Select your preferred contact method" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1c2534] border-[#2a3546]">
                                  <SelectItem value="email">Email</SelectItem>
                                  <SelectItem value="phone">Phone</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <Button 
                              type="button" 
                              onClick={nextSection}
                              variant="default"
                            >
                              Next Section
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {/* Section 2: About Your Business */}
                      {currentSection === 2 && (
                        <div className="space-y-8">
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-6">Section 2: About Your Business/Project</h3>
                            
                            <div className="space-y-2 mb-6">
                              <label htmlFor="websiteName" className="text-[#c6d4e3] text-sm flex items-center">
                                Website Name (or Proposed Name) <span className="text-[#a0b1c5] ml-1">*</span>
                              </label>
                              <Input
                                id="websiteName"
                                name="websiteName"
                                value={formState.websiteName}
                                onChange={handleChange}
                                placeholder="Enter your website name"
                                className="bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69]"
                                required
                              />
                            </div>
                            
                            <div className="space-y-2 mb-6">
                              <label htmlFor="businessDescription" className="text-[#c6d4e3] text-sm flex items-center">
                                Briefly Describe Your Business/Organization/Project <span className="text-[#a0b1c5] ml-1">*</span>
                              </label>
                              <Textarea
                                id="businessDescription"
                                name="businessDescription"
                                value={formState.businessDescription}
                                onChange={handleChange}
                                placeholder="What do you do? Who do you serve?"
                                className="bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69] min-h-[100px]"
                                required
                              />
                            </div>
                            
                            <div className="space-y-2 mb-6">
                              <label htmlFor="uniqueValue" className="text-[#c6d4e3] text-sm">
                                What makes your business/service unique?
                              </label>
                              <Textarea
                                id="uniqueValue"
                                name="uniqueValue"
                                value={formState.uniqueValue}
                                onChange={handleChange}
                                placeholder="Your key differentiator or value proposition"
                                className="bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69] min-h-[100px]"
                              />
                            </div>
                            
                            <div className="space-y-2 mb-6">
                              <label htmlFor="targetAudience" className="text-[#c6d4e3] text-sm flex items-center">
                                Who is your Target Audience? <span className="text-[#a0b1c5] ml-1">*</span>
                              </label>
                              <Textarea
                                id="targetAudience"
                                name="targetAudience"
                                value={formState.targetAudience}
                                onChange={handleChange}
                                placeholder="Be specific - demographics, interests, needs, pain points"
                                className="bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69] min-h-[100px]"
                                required
                              />
                            </div>
                            
                            <div className="space-y-2 mb-6">
                              <label htmlFor="existingWebsite" className="text-[#c6d4e3] text-sm">
                                Do you have an existing website? If yes, please provide the link:
                              </label>
                              <Input
                                id="existingWebsite"
                                name="existingWebsite"
                                value={formState.existingWebsite}
                                onChange={handleChange}
                                placeholder="https://example.com"
                                className="bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69]"
                              />
                            </div>
                            
                            {formState.existingWebsite && (
                              <div className="space-y-2 mb-6">
                                <label htmlFor="existingWebsiteFeedback" className="text-[#c6d4e3] text-sm">
                                  What do you like/dislike about your current site? What needs to change?
                                </label>
                                <Textarea
                                  id="existingWebsiteFeedback"
                                  name="existingWebsiteFeedback"
                                  value={formState.existingWebsiteFeedback}
                                  onChange={handleChange}
                                  placeholder="Share your thoughts about your current website"
                                  className="bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69] min-h-[100px]"
                                />
                              </div>
                            )}
                            
                            <div className="space-y-2 mb-6">
                              <label htmlFor="competitors" className="text-[#c6d4e3] text-sm">
                                Please list 2-3 main competitors (if applicable) and their website links:
                              </label>
                              <Textarea
                                id="competitors"
                                name="competitors"
                                value={formState.competitors}
                                onChange={handleChange}
                                placeholder="Competitor 1: https://competitor1.com 
Competitor 2: https://competitor2.com"
                                className="bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69] min-h-[100px]"
                              />
                            </div>
                          </div>
                          
                          <div className="flex justify-between">
                            <Button 
                              type="button" 
                              onClick={prevSection}
                              variant="outline"
                              className="border-[#2a3546] text-[#a0b1c5] hover:text-white hover:border-[#4d5f79]"
                            >
                              Previous
                            </Button>
                            <Button 
                              type="button" 
                              onClick={nextSection}
                              variant="default"
                            >
                              Next Section
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Section 3: Website Goals */}
                      {currentSection === 3 && (
                        <div className="space-y-8">
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-6">Section 3: Your Website Goals</h3>
                            
                            <div className="space-y-2 mb-6">
                              <label htmlFor="primaryGoal" className="text-[#c6d4e3] text-sm flex items-center">
                                What is the PRIMARY goal for this new website? <span className="text-[#a0b1c5] ml-1">*</span>
                              </label>
                              <Select
                                value={formState.primaryGoal}
                                onValueChange={(value) => handleSelectChange("primaryGoal", value)}
                                required
                              >
                                <SelectTrigger className="bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69]">
                                  <SelectValue placeholder="Select your primary goal" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1c2534] border-[#2a3546]">
                                  <SelectItem value="generate_leads">Generate leads</SelectItem>
                                  <SelectItem value="sell_products">Sell products</SelectItem>
                                  <SelectItem value="provide_information">Provide information</SelectItem>
                                  <SelectItem value="build_brand">Build brand awareness</SelectItem>
                                  <SelectItem value="showcase_portfolio">Showcase portfolio</SelectItem>
                                  <SelectItem value="drive_signups">Drive sign-ups</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2 mb-6">
                              <label className="text-[#c6d4e3] text-sm">
                                What are the secondary goals? (Check all that apply)
                              </label>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                                {[
                                  { id: "increase_traffic", label: "Increase traffic" },
                                  { id: "improve_ux", label: "Improve user experience" },
                                  { id: "educate_visitors", label: "Educate visitors" },
                                  { id: "collect_emails", label: "Collect email addresses" },
                                  { id: "online_booking", label: "Offer online booking" },
                                  { id: "build_community", label: "Build a community" },
                                  { id: "share_content", label: "Share regular content" },
                                  { id: "social_proof", label: "Showcase testimonials" },
                                ].map((goal) => (
                                  <div key={goal.id} className="flex items-center space-x-2">
                                    <Checkbox 
                                      id={goal.id} 
                                      checked={formState.secondaryGoals.includes(goal.id)}
                                      onCheckedChange={(checked) => 
                                        handleCheckboxChange("secondaryGoals", goal.id, checked as boolean)
                                      }
                                      className="border-[#3d4f69] data-[state=checked]:bg-[#3d4f69] data-[state=checked]:text-white"
                                    />
                                    <label
                                      htmlFor={goal.id}
                                      className="text-sm text-[#c6d4e3] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      {goal.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="space-y-2 mb-6">
                              <label htmlFor="desiredActions" className="text-[#c6d4e3] text-sm flex items-center">
                                What specific actions do you want visitors to take on the site? <span className="text-[#a0b1c5] ml-1">*</span>
                              </label>
                              <Textarea
                                id="desiredActions"
                                name="desiredActions"
                                value={formState.desiredActions}
                                onChange={handleChange}
                                placeholder="e.g., Fill out contact form, Call us, Buy a product, Download a guide, Subscribe to newsletter"
                                className="bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69] min-h-[100px]"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="flex justify-between">
                            <Button 
                              type="button" 
                              onClick={prevSection}
                              variant="outline"
                              className="border-[#2a3546] text-[#a0b1c5] hover:text-white hover:border-[#4d5f79]"
                            >
                              Previous
                            </Button>
                            <Button 
                              type="button" 
                              onClick={nextSection}
                              variant="default"
                            >
                              Next Section
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Section 4: Design Preferences */}
                      {currentSection === 4 && (
                        <div className="space-y-8">
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-6">Section 4: Design & Style Preferences</h3>
                            
                            <div className="space-y-2 mb-6">
                              <label className="text-[#c6d4e3] text-sm flex items-center">
                                Do you have an existing logo? <span className="text-[#a0b1c5] ml-1">*</span>
                              </label>
                              <div className="flex items-center space-x-6 pt-2">
                                <div className="flex items-center space-x-2">
                                  <RadioGroup
                                    value={formState.hasLogo ? "yes" : "no"}
                                    onValueChange={(value) => handleBooleanChange("hasLogo", value === "yes")}
                                    className="flex items-center space-x-6"
                                    required
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem 
                                        value="yes" 
                                        id="hasLogo-yes"
                                        className="border-[#3d4f69] text-[#a0b1c5]" 
                                      />
                                      <label htmlFor="hasLogo-yes" className="text-sm text-[#c6d4e3]">Yes</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem 
                                        value="no" 
                                        id="hasLogo-no"
                                        className="border-[#3d4f69] text-[#a0b1c5]" 
                                      />
                                      <label htmlFor="hasLogo-no" className="text-sm text-[#c6d4e3]">No</label>
                                    </div>
                                  </RadioGroup>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-2 mb-6">
                              <label className="text-[#c6d4e3] text-sm flex items-center">
                                Do you have established brand guidelines (colors, fonts)? <span className="text-[#a0b1c5] ml-1">*</span>
                              </label>
                              <RadioGroup
                                value={formState.brandGuidelines}
                                onValueChange={(value) => handleSelectChange("brandGuidelines", value)}
                                className="flex flex-col space-y-2 pt-2"
                                required
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem 
                                    value="yes" 
                                    id="brandGuidelines-yes"
                                    className="border-[#3d4f69] text-[#a0b1c5]" 
                                  />
                                  <label htmlFor="brandGuidelines-yes" className="text-sm text-[#c6d4e3]">Yes, complete brand guidelines</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem 
                                    value="partially" 
                                    id="brandGuidelines-partially"
                                    className="border-[#3d4f69] text-[#a0b1c5]" 
                                  />
                                  <label htmlFor="brandGuidelines-partially" className="text-sm text-[#c6d4e3]">Partially (some colors/fonts defined)</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem 
                                    value="no" 
                                    id="brandGuidelines-no"
                                    className="border-[#3d4f69] text-[#a0b1c5]" 
                                  />
                                  <label htmlFor="brandGuidelines-no" className="text-sm text-[#c6d4e3]">No brand guidelines yet</label>
                                </div>
                              </RadioGroup>
                            </div>
                            
                            <div className="space-y-2 mb-6">
                              <label htmlFor="preferredColors" className="text-[#c6d4e3] text-sm">
                                Preferred Colors (If no strict brand guide, what colours do you like?)
                              </label>
                              <Textarea
                                id="preferredColors"
                                name="preferredColors"
                                value={formState.preferredColors}
                                onChange={handleChange}
                                placeholder="e.g., Blues and greys, Warm earth tones, Provide hex codes if known: #FFFFFF"
                                className="bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69]"
                              />
                            </div>
                            
                            <div className="space-y-2 mb-6">
                              <label htmlFor="preferredFonts" className="text-[#c6d4e3] text-sm">
                                Preferred Font Styles
                              </label>
                              <Textarea
                                id="preferredFonts"
                                name="preferredFonts"
                                value={formState.preferredFonts}
                                onChange={handleChange}
                                placeholder="e.g., Modern sans-serif, Classic serif, Playful script, Professional feel"
                                className="bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69]"
                              />
                            </div>
                            
                            <div className="space-y-2 mb-6">
                              <label htmlFor="lookAndFeel" className="text-[#c6d4e3] text-sm">
                                Overall Look & Feel
                              </label>
                              <Textarea
                                id="lookAndFeel"
                                name="lookAndFeel"
                                value={formState.lookAndFeel}
                                onChange={handleChange}
                                placeholder="Describe the vibe - e.g., Minimalist, Corporate, Friendly, Luxurious, Funky, High-tech, Rustic"
                                className="bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69]"
                              />
                            </div>
                            
                            <div className="space-y-2 mb-6">
                              <label htmlFor="websitesLiked" className="text-[#c6d4e3] text-sm flex items-center">
                                Please list 2-3 websites you LIKE the design of (and briefly explain why): <span className="text-[#a0b1c5] ml-1">*</span>
                              </label>
                              <Textarea
                                id="websitesLiked"
                                name="websitesLiked"
                                value={formState.websitesLiked}
                                onChange={handleChange}
                                placeholder="Website Link 1: https://example.com
Why: Clean layout and intuitive navigation

Website Link 2: https://example2.com
Why: Love the color scheme and typography"
                                className="bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69] min-h-[120px]"
                                required
                              />
                            </div>
                            
                            <div className="space-y-2 mb-6">
                              <label htmlFor="websitesDisliked" className="text-[#c6d4e3] text-sm">
                                Please list 1-2 websites you DISLIKE the design of (and briefly explain why):
                              </label>
                              <Textarea
                                id="websitesDisliked"
                                name="websitesDisliked"
                                value={formState.websitesDisliked}
                                onChange={handleChange}
                                placeholder="Website Link 1: https://example.com
Why: Too cluttered and hard to navigate

Website Link 2: https://example2.com
Why: Design feels outdated"
                                className="bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69] min-h-[120px]"
                              />
                            </div>
                          </div>
                          
                          <div className="flex justify-between">
                            <Button 
                              type="button" 
                              onClick={prevSection}
                              variant="outline"
                              className="border-[#2a3546] text-[#a0b1c5] hover:text-white hover:border-[#4d5f79]"
                            >
                              Previous
                            </Button>
                            <Button 
                              type="button" 
                              onClick={nextSection}
                              variant="default"
                            >
                              Next Section
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Section 5: Content & Functionality */}
                      {currentSection === 5 && (
                        <div className="space-y-8">
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-6">Section 5: Content & Functionality</h3>
                            
                            <div className="space-y-2 mb-6">
                              <label className="text-[#c6d4e3] text-sm flex items-center">
                                What pages do you anticipate needing? <span className="text-[#a0b1c5] ml-1">*</span>
                              </label>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                                {[
                                  { id: "home", label: "Home" },
                                  { id: "about", label: "About Us" },
                                  { id: "services", label: "Services" },
                                  { id: "products", label: "Products" },
                                  { id: "portfolio", label: "Portfolio/Gallery" },
                                  { id: "blog", label: "Blog" },
                                  { id: "contact", label: "Contact" },
                                  { id: "faq", label: "FAQ" },
                                  { id: "testimonials", label: "Testimonials" },
                                  { id: "pricing", label: "Pricing" },
                                  { id: "team", label: "Team" },
                                  { id: "careers", label: "Careers" },
                                ].map((page) => (
                                  <div key={page.id} className="flex items-center space-x-2">
                                    <Checkbox 
                                      id={page.id} 
                                      checked={formState.pages.includes(page.id)}
                                      onCheckedChange={(checked) => 
                                        handleCheckboxChange("pages", page.id, checked as boolean)
                                      }
                                      className="border-[#3d4f69] data-[state=checked]:bg-[#3d4f69] data-[state=checked]:text-white"
                                    />
                                    <label
                                      htmlFor={page.id}
                                      className="text-sm text-[#c6d4e3] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      {page.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="space-y-2 mb-6">
                              <label className="text-[#c6d4e3] text-sm flex items-center">
                                Do you have the website text (copy) ready? <span className="text-[#a0b1c5] ml-1">*</span>
                              </label>
                              <RadioGroup
                                value={formState.contentReady}
                                onValueChange={(value) => handleSelectChange("contentReady", value)}
                                className="flex flex-col space-y-2 pt-2"
                                required
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem 
                                    value="yes" 
                                    id="contentReady-yes"
                                    className="border-[#3d4f69] text-[#a0b1c5]" 
                                  />
                                  <label htmlFor="contentReady-yes" className="text-sm text-[#c6d4e3]">Yes, all content is ready</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem 
                                    value="partial" 
                                    id="contentReady-partial"
                                    className="border-[#3d4f69] text-[#a0b1c5]" 
                                  />
                                  <label htmlFor="contentReady-partial" className="text-sm text-[#c6d4e3]">Some content is ready</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem 
                                    value="no" 
                                    id="contentReady-no"
                                    className="border-[#3d4f69] text-[#a0b1c5]" 
                                  />
                                  <label htmlFor="contentReady-no" className="text-sm text-[#c6d4e3]">No, need help writing content</label>
                                </div>
                              </RadioGroup>
                            </div>
                            
                            <div className="space-y-2 mb-6">
                              <label className="text-[#c6d4e3] text-sm flex items-center">
                                Do you have photos/videos for the site? <span className="text-[#a0b1c5] ml-1">*</span>
                              </label>
                              <RadioGroup
                                value={formState.mediaReady}
                                onValueChange={(value) => handleSelectChange("mediaReady", value)}
                                className="flex flex-col space-y-2 pt-2"
                                required
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem 
                                    value="yes" 
                                    id="mediaReady-yes"
                                    className="border-[#3d4f69] text-[#a0b1c5]" 
                                  />
                                  <label htmlFor="mediaReady-yes" className="text-sm text-[#c6d4e3]">Yes, all media is ready</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem 
                                    value="some" 
                                    id="mediaReady-some"
                                    className="border-[#3d4f69] text-[#a0b1c5]" 
                                  />
                                  <label htmlFor="mediaReady-some" className="text-sm text-[#c6d4e3]">Have some media</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem 
                                    value="stock" 
                                    id="mediaReady-stock"
                                    className="border-[#3d4f69] text-[#a0b1c5]" 
                                  />
                                  <label htmlFor="mediaReady-stock" className="text-sm text-[#c6d4e3]">Need stock photos</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem 
                                    value="custom" 
                                    id="mediaReady-custom"
                                    className="border-[#3d4f69] text-[#a0b1c5]" 
                                  />
                                  <label htmlFor="mediaReady-custom" className="text-sm text-[#c6d4e3]">Need custom photography</label>
                                </div>
                              </RadioGroup>
                            </div>
                            
                            <div className="space-y-2 mb-6">
                              <label className="text-[#c6d4e3] text-sm">
                                Do you need specific features? (Check all that apply)
                              </label>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                                {[
                                  { id: "blog", label: "Blog" },
                                  { id: "ecommerce", label: "E-commerce/Online Store" },
                                  { id: "portfolio", label: "Portfolio/Gallery" },
                                  { id: "contact_forms", label: "Contact Forms" },
                                  { id: "map", label: "Map Integration" },
                                  { id: "newsletter", label: "Newsletter Signup" },
                                  { id: "social_media", label: "Social Media Feed" },
                                  { id: "membership", label: "Basic Membership" },
                                  { id: "booking", label: "Online Booking/Calendar" },
                                  { id: "search", label: "Search Functionality" },
                                ].map((feature) => (
                                  <div key={feature.id} className="flex items-center space-x-2">
                                    <Checkbox 
                                      id={`feature-${feature.id}`} 
                                      checked={formState.features.includes(feature.id)}
                                      onCheckedChange={(checked) => 
                                        handleCheckboxChange("features", feature.id, checked as boolean)
                                      }
                                      className="border-[#3d4f69] data-[state=checked]:bg-[#3d4f69] data-[state=checked]:text-white"
                                    />
                                    <label
                                      htmlFor={`feature-${feature.id}`}
                                      className="text-sm text-[#c6d4e3] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      {feature.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {formState.features.includes("ecommerce") && (
                              <div className="space-y-2 mb-6">
                                <label htmlFor="ecommerceDetails" className="text-[#c6d4e3] text-sm">
                                  E-commerce Details
                                </label>
                                <Textarea
                                  id="ecommerceDetails"
                                  name="ecommerceDetails"
                                  value={formState.ecommerceDetails}
                                  onChange={handleChange}
                                  placeholder="Roughly how many products will you sell? Do you have a preferred payment processor?"
                                  className="bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69]"
                                />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex justify-between">
                            <Button 
                              type="button" 
                              onClick={prevSection}
                              variant="outline"
                              className="border-[#2a3546] text-[#a0b1c5] hover:text-white hover:border-[#4d5f79]"
                            >
                              Previous
                            </Button>
                            <Button 
                              type="button" 
                              onClick={nextSection}
                              variant="default"
                            >
                              Next Section
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Section 6: Logistics & Budget */}
                      {currentSection === 6 && (
                        <div className="space-y-8">
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-6">Section 6: Logistics & Budget</h3>
                            
                            <div className="space-y-2 mb-6">
                              <label className="text-[#c6d4e3] text-sm">
                                Do you already have a domain name?
                              </label>
                              <RadioGroup
                                value={formState.hasDomain}
                                onValueChange={(value) => handleSelectChange("hasDomain", value)}
                                className="flex items-center space-x-6 pt-2"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem 
                                    value="yes" 
                                    id="hasDomain-yes"
                                    className="border-[#3d4f69] text-[#a0b1c5]" 
                                  />
                                  <label htmlFor="hasDomain-yes" className="text-sm text-[#c6d4e3]">Yes</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem 
                                    value="no" 
                                    id="hasDomain-no"
                                    className="border-[#3d4f69] text-[#a0b1c5]" 
                                  />
                                  <label htmlFor="hasDomain-no" className="text-sm text-[#c6d4e3]">No</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem 
                                    value="help" 
                                    id="hasDomain-help"
                                    className="border-[#3d4f69] text-[#a0b1c5]" 
                                  />
                                  <label htmlFor="hasDomain-help" className="text-sm text-[#c6d4e3]">Need help choosing</label>
                                </div>
                              </RadioGroup>
                            </div>
                            
                            {formState.hasDomain === "yes" && (
                              <div className="space-y-2 mb-6">
                                <label htmlFor="domainName" className="text-[#c6d4e3] text-sm">
                                  What is your domain name?
                                </label>
                                <Input
                                  id="domainName"
                                  name="domainName"
                                  value={formState.domainName}
                                  onChange={handleChange}
                                  placeholder="example.com"
                                  className="bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69]"
                                />
                              </div>
                            )}
                            
                            <div className="space-y-2 mb-6">
                              <label className="text-[#c6d4e3] text-sm">
                                Do you already have website hosting?
                              </label>
                              <RadioGroup
                                value={formState.hasHosting}
                                onValueChange={(value) => handleSelectChange("hasHosting", value)}
                                className="flex items-center space-x-6 pt-2"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem 
                                    value="yes" 
                                    id="hasHosting-yes"
                                    className="border-[#3d4f69] text-[#a0b1c5]" 
                                  />
                                  <label htmlFor="hasHosting-yes" className="text-sm text-[#c6d4e3]">Yes</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem 
                                    value="no" 
                                    id="hasHosting-no"
                                    className="border-[#3d4f69] text-[#a0b1c5]" 
                                  />
                                  <label htmlFor="hasHosting-no" className="text-sm text-[#c6d4e3]">No</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem 
                                    value="help" 
                                    id="hasHosting-help"
                                    className="border-[#3d4f69] text-[#a0b1c5]" 
                                  />
                                  <label htmlFor="hasHosting-help" className="text-sm text-[#c6d4e3]">Need help choosing</label>
                                </div>
                              </RadioGroup>
                            </div>
                            
                            <div className="space-y-2 mb-6">
                              <label htmlFor="deadline" className="text-[#c6d4e3] text-sm">
                                Do you have a specific deadline or launch date in mind?
                              </label>
                              <Input
                                id="deadline"
                                name="deadline"
                                type="date"
                                value={formState.deadline}
                                onChange={handleChange}
                                className="bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69]"
                              />
                            </div>
                            
                            <div className="space-y-2 mb-6">
                              <label className="text-[#c6d4e3] text-sm flex items-center">
                                Budget Indication <span className="text-[#a0b1c5] ml-1">*</span>
                              </label>
                              <p className="text-xs text-[#a0b1c5] mb-2">
                                Understanding your approximate budget helps us tailor the best possible solution within your means.
                              </p>
                              <BudgetSlider
                                onChange={(value) => handleSelectChange("budget", value)}
                                className="py-4"
                              />
                            </div>
                            
                            <div className="space-y-2 mb-6">
                              <label htmlFor="additionalInfo" className="text-[#c6d4e3] text-sm">
                                Is there anything else you think we should know?
                              </label>
                              <Textarea
                                id="additionalInfo"
                                name="additionalInfo"
                                value={formState.additionalInfo}
                                onChange={handleChange}
                                placeholder="Any specific concerns, questions, or unique requirements"
                                className="bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] focus:border-[#3d4f69] min-h-[120px]"
                              />
                            </div>
                          </div>
                          
                          <div className="flex justify-between">
                            <Button 
                              type="button" 
                              onClick={prevSection}
                              variant="outline"
                              className="border-[#2a3546] text-[#a0b1c5] hover:text-white hover:border-[#4d5f79]"
                            >
                              Previous
                            </Button>
                            <Button 
                              type="submit"
                              variant="nav"
                              disabled={sending}
                            >
                              {sending ? "Submitting..." : "Submit Project Details"}
                            </Button>
                          </div>
                        </div>
                      )}
                    </form>
                  </CardSpotlight>
                </>
              ) : (
                <CardSpotlight 
                  className="p-8 bg-[#111622]/80 backdrop-blur-sm border-[#2a3546] text-center"
                  radius={300}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1c2534] border border-[#3d4f69] mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a0b1c5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  
                  <h2 className="font-serif text-3xl mb-4">Thank You!</h2>
                  
                  <p className="text-[#c6d4e3] mb-6 max-w-2xl mx-auto">
                    Thanks for taking the time to fill out our Project Kickoff form. This information is incredibly valuable as we move forward.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mb-4">What's Next?</h3>
                  
                  <ul className="space-y-4 mb-8 text-left max-w-md mx-auto">
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-[#2a3546] text-[#c6d4e3] flex items-center justify-center mr-3 mt-0.5">1</div>
                      <div className="text-[#c6d4e3]">
                        We'll carefully review your submission.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-[#2a3546] text-[#c6d4e3] flex items-center justify-center mr-3 mt-0.5">2</div>
                      <div className="text-[#c6d4e3]">
                        We will get back to you within 1-2 business days to discuss your project in more detail, ask any clarifying questions, and outline the next steps.
                      </div>
                    </li>
                  </ul>
                  
                  <p className="text-[#a0b1c5] mb-8">
                    We look forward to connecting with you!
                  </p>
                  
                  <Button asChild variant="nav">
                    <Link href="/">
                      Return to Homepage
                    </Link>
                  </Button>
                </CardSpotlight>
              )}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  )
} 