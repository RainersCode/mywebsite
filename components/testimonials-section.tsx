"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { TestimonialCard } from "@/components/ui/testimonial-card"

// Silver trail component - reused from other sections
const SilverTrail = ({ index }: { index: number }) => {
  // Random size for the trail head
  const headSize = Math.random() * 3 + 1.5;
  const tailLength = headSize * (Math.random() * 18 + 12);
  
  // Random angle for diagonal movement
  const angleVariation = Math.random() * 40 - 20;
  const baseAngle = 45 + angleVariation;
  
  // Random duration 
  const duration = 10 + Math.random() * 20;
  
  // Random start positions
  const startFromTop = Math.random() > 0.5;
  const startX = startFromTop ? Math.random() * 100 : -tailLength;
  const startY = startFromTop ? -tailLength : Math.random() * 100;
  
  // Calculate end position
  const travelDistance = 120 + Math.random() * 30;
  const endX = startX + travelDistance * Math.cos(baseAngle * Math.PI / 180);
  const endY = startY + travelDistance * Math.sin(baseAngle * Math.PI / 180);
  
  // Delay
  const delay = Math.random() * 15;
  
  // Silver color with varying opacity
  const opacity = Math.random() * 0.4 + 0.5;
  
  // Rotation to match movement angle
  const rotation = (baseAngle - 45) + 90;
  
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
      {/* The trail head */}
      <div 
        className="absolute rounded-full bg-[#e0e9f5]"
        style={{
          width: headSize,
          height: headSize,
          boxShadow: `0 0 ${headSize * 3}px 2px rgba(224, 233, 245, 0.9)`
        }}
      />
      
      {/* The trail tail */}
      <div 
        className="absolute bg-gradient-to-t from-transparent to-[#c6d4e3]"
        style={{
          width: headSize / 1.2,
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

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Testimonials data
  const testimonialData = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Director",
      content: "The website design exceeded our expectations. The team was responsive, creative, and delivered on time. Our conversions have increased by 35% since the redesign.",
      avatarSrc: "/testimonials/avatar-1.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Startup Founder",
      content: "Working with this team was seamless. They understood our vision from day one and translated it into a stunning website that perfectly represents our brand.",
      avatarSrc: "/testimonials/avatar-2.jpg"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "E-commerce Manager",
      content: "The Framer website they built for us is not only beautiful but incredibly fast and functional. Our customers love the new shopping experience.",
      avatarSrc: "/testimonials/avatar-3.jpg"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Tech Entrepreneur",
      content: "Their expertise in Framer development is exceptional. They helped us migrate from WordPress, and the performance improvements were immediate and significant.",
      avatarSrc: "/testimonials/avatar-4.jpg"
    },
  ]

  // State to track the current order of testimonials
  const [testimonialOrder, setTestimonialOrder] = useState([0, 1, 2])

  // Function to shuffle the testimonials order
  const handleShuffle = () => {
    setTestimonialOrder(prev => {
      const newOrder = [...prev]
      const first = newOrder.shift() as number
      newOrder.push(first)
      return newOrder
    })
  }

  return (
    <section id="testimonials" ref={ref} className="py-24 md:py-32 bg-[#141b27] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 right-0 w-1/3 h-[1px] bg-gradient-to-l from-transparent via-[#a0b1c5] to-transparent shadow-[0_0_8px_0px_#a0b1c5]" 
          animate={{ 
            x: [100, -100, 100],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 24, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#5d7b9c] to-transparent shadow-[0_0_8px_0px_#5d7b9c]" 
          animate={{ 
            x: [-100, 100, -100],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 28, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
        
        {/* Falling star trails */}
        {[...Array(12)].map((_, i) => (
          <SilverTrail key={i} index={i} />
        ))}
      </div>

      <div className="container mx-auto px-6">
        <motion.div style={{ y, opacity }}>
          <div className="text-center mb-24">
            <div className="inline-block px-4 py-1 mb-4 bg-[#1c2534] border border-[#2a3546] rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#a0b1c5]/10 via-[#8faabe]/10 to-[#5d7b9c]/10" />
              <span className="relative text-[#c6d4e3] text-sm uppercase tracking-widest">Client Feedback</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">What Our Clients Say</h2>
            <p className="text-[#a0b1c5] text-lg max-w-2xl mx-auto">
              Discover why businesses trust us to deliver exceptional web development solutions.
              <span className="block mt-4 text-sm opacity-75">Swipe cards to see more testimonials</span>
            </p>
          </div>

          <div className="flex justify-center items-center">
            {/* Card stack */}
            <div className="relative h-[450px] w-[350px]">
              {testimonialOrder.map((index, position) => {
                const testimonial = testimonialData[index]
                return (
                  <TestimonialCard
                    key={`testimonial-${testimonial.id}`}
                    position={position === 0 ? "front" : position === 1 ? "middle" : "back"}
                    handleShuffle={handleShuffle}
                    {...testimonial}
                  />
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 