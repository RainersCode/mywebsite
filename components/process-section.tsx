"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const steps = [
    {
      number: "01",
      title: "Discover",
      description: "We begin by understanding your goals, audience, and unique requirements.",
      gradient: "from-[#a0b1c5] to-[#5d7b9c]",
    },
    {
      number: "02",
      title: "Design",
      description: "Creating a visual direction that aligns with your brand and captivates your audience.",
      gradient: "from-[#97a8bc] to-[#5f7d9e]",
    },
    {
      number: "03",
      title: "Develop",
      description: "Building your website with Framer, ensuring performance and functionality.",
      gradient: "from-[#8fa0b4] to-[#617f9f]",
    },
    {
      number: "04",
      title: "Launch",
      description: "Deploying your website and ensuring everything runs smoothly.",
      gradient: "from-[#8799ad] to-[#64819f]",
    },
  ]

  return (
    <section
      id="process"
      ref={ref}
      className="py-24 md:py-32 bg-gradient-to-b from-[#141b27] to-[#0f1520] relative overflow-hidden"
    >
      {/* Background Elements - Removed */}
      <div className="container mx-auto px-6">
        <motion.div className="max-w-4xl mx-auto" style={{ y, opacity }}>
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 mb-4 bg-[#1c2534] border border-[#2a3546] rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#a0b1c5]/10 via-[#8faabe]/10 to-[#5d7b9c]/10" />
              <span className="relative text-[#c6d4e3] text-sm uppercase tracking-widest">Our Approach</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">Why Framer</h2>
            <p className="text-[#a0b1c5] text-lg max-w-2xl mx-auto">
              Framer enables us to create websites that are not only visually stunning but also highly functional and
              easy to maintain.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <motion.div 
              className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-[#2a3546] md:transform md:-translate-x-px"
              animate={{
                backgroundImage: [
                  "linear-gradient(to bottom, rgba(160, 177, 197, 0.1), rgba(160, 177, 197, 0.3), rgba(93, 123, 156, 0.3), rgba(93, 123, 156, 0.1))",
                  "linear-gradient(to bottom, rgba(93, 123, 156, 0.1), rgba(93, 123, 156, 0.3), rgba(160, 177, 197, 0.3), rgba(160, 177, 197, 0.1))",
                  "linear-gradient(to bottom, rgba(160, 177, 197, 0.1), rgba(160, 177, 197, 0.3), rgba(93, 123, 156, 0.3), rgba(93, 123, 156, 0.1))"
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Process Steps */}
            <div className="space-y-12 md:space-y-0">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <motion.div
                    className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 bg-[#1c2534] border border-[#2a3546] rounded-full flex items-center justify-center md:transform md:-translate-x-1/2 overflow-hidden">
                      {/* Colorful Background */}
                      <motion.div 
                        className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-20`}
                        animate={{
                          opacity: [0.1, 0.4, 0.1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5
                        }}
                      />
                      <span className="relative text-xs font-medium text-[#c6d4e3]">{step.number}</span>
                    </div>

                    {/* Content */}
                    <div className={`pl-12 md:pl-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                      <div
                        className={`p-6 bg-[#1c2534]/50 border border-[#2a3546] ${index % 2 === 0 ? "md:text-right" : ""} relative overflow-hidden group hover:border-[#3d4f69] transition-colors`}
                      >
                        {/* Colorful Border */}
                        <motion.div
                          className={`absolute inset-y-0 ${index % 2 === 0 ? "right-0" : "left-0"} w-[2px] bg-gradient-to-b ${step.gradient} opacity-70 group-hover:opacity-100 transition-opacity`}
                          animate={{
                            opacity: [0.5, 0.9, 0.5],
                            height: ["100%", "105%", "100%"],
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.7
                          }}
                        />

                        <h3 className="text-xl mb-2 font-medium">{step.title}</h3>
                        <p className="text-[#a0b1c5]">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

