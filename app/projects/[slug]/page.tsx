import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

// Portfolio items with extended content for detail pages
const portfolioItems = [
  {
    id: 1,
    slug: "responsive-ecommerce",
    title: "Responsive E-Commerce",
    description: "Adaptive design with seamless shopping experience across all devices.",
    image: "/responsivedg/resdesk1.png",
    mobileImage: "/responsivedg/respho1.png",
    fullDescription: "Our responsive e-commerce project demonstrates how a modern online store can provide an optimal shopping experience across all devices. We focused on creating fluid layouts that adapt to any screen size, ensuring product displays, shopping carts, and checkout processes work flawlessly whether on desktop or mobile.",
    features: [
      "Fluid grid layouts that adjust to any screen size",
      "Optimized product galleries that work on touch and mouse interfaces",
      "Responsive checkout process designed for conversion",
      "Performance optimized for mobile data connections",
      "Cross-browser compatibility across modern browsers"
    ],
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Responsive Images", "CSS Grid/Flexbox"],
    challenge: "The main challenge was creating a seamless shopping experience that works equally well on desktop, tablet, and mobile devices while maintaining fast load times and smooth interactions.",
    solution: "We implemented a mobile-first approach, designing the core experience for small screens first, then progressively enhancing it for larger displays. This ensured essential functionality was optimized for all users."
  },
  {
    id: 2,
    slug: "creative-portfolio",
    title: "Creative Portfolio",
    description: "Showcase of creative work with fluid animations and responsive layouts.",
    image: "/responsivedg/resdesk2.png",
    mobileImage: "/responsivedg/respho2.png",
    fullDescription: "This creative portfolio website was designed to showcase artistic work with an emphasis on visual impact and smooth animations. The responsive design ensures that images and galleries display beautifully on any device, with special attention to maintaining the visual integrity of the portfolio pieces.",
    features: [
      "Responsive image galleries that adapt to screen size",
      "Animation effects that scale appropriately for different devices",
      "Touch-friendly navigation for mobile users",
      "Optimized asset loading for faster mobile performance",
      "Accessibility considerations across all breakpoints"
    ],
    technologies: ["Next.js", "Framer Motion", "GSAP", "Responsive Images", "CSS Grid"],
    challenge: "Creating animations and transitions that work well across different device capabilities while ensuring the portfolio pieces remain the focus of attention.",
    solution: "We implemented device-specific animation variations that deliver the appropriate level of visual complexity based on screen size and processing power, ensuring smooth performance everywhere."
  },
  {
    id: 3,
    slug: "corporate-website",
    title: "Corporate Website",
    description: "Professional business site optimized for desktop, tablet, and mobile viewing.",
    image: "/responsivedg/resdesk3.png",
    mobileImage: "/responsivedg/respho3.png",
    fullDescription: "This corporate website project demonstrates how professional business content can be presented effectively across all devices. We focused on creating a clean, authoritative design that maintains brand consistency while adapting to different screen sizes and contexts.",
    features: [
      "Responsive navigation systems that transform for mobile",
      "Content hierarchies that adjust based on screen size",
      "Interactive elements that work with both touch and mouse inputs",
      "Performance optimizations for corporate users on various networks",
      "Print stylesheets for important business content"
    ],
    technologies: ["Next.js", "Tailwind CSS", "Responsive Typography", "SVG Icons", "CSS Grid"],
    challenge: "Balancing comprehensive corporate content needs with mobile usability while maintaining a professional aesthetic across all device sizes.",
    solution: "We implemented context-aware content prioritization that intelligently adjusts information density based on screen size, ensuring the most important business information is always accessible."
  }
];

export function generateStaticParams() {
  return portfolioItems.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  // Find the project that matches the slug
  const project = portfolioItems.find((p) => p.slug === params.slug)
  
  // If project not found, show 404
  if (!project) {
    notFound()
  }
  
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-[#a0b1c5] hover:text-white mb-4"
        >
          <Link href="/projects" className="flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Projects
          </Link>
        </Button>
        
        <div className="text-center md:text-left mb-8">
          <div className="inline-block px-4 py-1 mb-2 bg-[#1c2534] rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#a0b1c5]/10 via-[#8faabe]/10 to-[#5d7b9c]/10" />
            <span className="relative text-[#c6d4e3] text-sm uppercase tracking-widest">Project Details</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl mb-4">{project.title}</h1>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-[#111622]/80 rounded-lg overflow-hidden shadow-lg border border-[#2a3546]">
          <div className="relative aspect-[16/9]">
            <Image
              src={project.image}
              alt={`${project.title} - Desktop`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="p-4 text-center text-sm text-[#a0b1c5]">
            Desktop View
          </div>
        </div>
        
        <div className="bg-[#111622]/80 rounded-lg overflow-hidden shadow-lg border border-[#2a3546]">
          <div className="relative aspect-[16/9]">
            <Image
              src={project.mobileImage}
              alt={`${project.title} - Mobile`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="p-4 text-center text-sm text-[#a0b1c5]">
            Mobile View
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="bg-[#111622]/80 rounded-lg p-6 shadow-lg border border-[#2a3546] h-full">
            <h2 className="font-serif text-xl mb-4">Project Overview</h2>
            <p className="text-[#a0b1c5] mb-6">{project.fullDescription}</p>
            
            <h3 className="font-serif text-lg mb-3">The Challenge</h3>
            <p className="text-[#a0b1c5] mb-6">{project.challenge}</p>
            
            <h3 className="font-serif text-lg mb-3">Our Solution</h3>
            <p className="text-[#a0b1c5]">{project.solution}</p>
          </div>
        </div>
        
        <div>
          <div className="bg-[#111622]/80 rounded-lg p-6 shadow-lg border border-[#2a3546] mb-8">
            <h2 className="font-serif text-xl mb-4">Key Features</h2>
            <ul className="text-[#a0b1c5] space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 bg-[#5d7b9c] rounded-full mt-2 mr-2"></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-[#111622]/80 rounded-lg p-6 shadow-lg border border-[#2a3546]">
            <h2 className="font-serif text-xl mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="inline-block px-3 py-1 bg-[#1c2534] rounded-full text-sm text-[#c6d4e3]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-12">
        <Button
          asChild
          variant="nav"
          size="lg"
          className="bg-gradient-to-r from-[#141b27] to-[#1c2534] border-[#4d5f79] hover:border-[#a0b1c5] hover:bg-gradient-to-r hover:from-[#15202f] hover:to-[#1f2a3c]"
        >
          <Link href="/#contact">
            Start Your Project
          </Link>
        </Button>
      </div>
    </div>
  )
} 