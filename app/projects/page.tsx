import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"
import { ParticlesBackground } from "@/components/ui/particles-background"

// Same portfolio items from the showcase component
const portfolioItems = [
  {
    id: 1,
    slug: "responsive-ecommerce",
    title: "Rugby Club Website & Admin Portal",
    description: "Comprehensive website for a rugby club with public content and secure admin portal.",
    image: "/responsivedg/resdesk1.png",
    mobileImage: "/responsivedg/respho1.png",
    size: "large"
  },
  {
    id: 2,
    slug: "creative-portfolio",
    title: "Fitness Trainer Website",
    description: "Modern, responsive personal training website with online booking system.",
    image: "/responsivedg/resdesk2.png",
    mobileImage: "/responsivedg/respho2.png",
    size: "medium"
  },
  {
    id: 3,
    slug: "corporate-website",
    title: "Agricultural Export Consultancy",
    description: "Professional website for livestock export consultancy with service showcase and contact system.",
    image: "/responsivedg/resdesk3.png",
    mobileImage: "/responsivedg/respho3.png",
    size: "small"
  },
  {
    id: 4,
    slug: "e-learning-platform",
    title: "Digital Agency Portfolio",
    description: "Modern dark-themed developer portfolio with interactive particle background and clean UI.",
    image: "/responsivedg/respdesk4.png",
    mobileImage: "/responsivedg/respho4.png",
    size: "medium"
  }
];

// Feature highlights
const features = [
  {
    id: 1,
    title: "Responsive Design",
    description: "All our projects are fully responsive and optimized for all device sizes"
  },
  {
    id: 2,
    title: "Modern Technologies",
    description: "We use the latest frameworks and tools to deliver high-performance websites"
  },
  {
    id: 3,
    title: "User Experience",
    description: "Intuitive interfaces designed with user experience as the top priority"
  }
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#141b27] text-zinc-100">
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#141b27] to-[#111622] relative overflow-hidden">
          <ParticlesBackground visibility="reduced" />
          <div className="container mx-auto px-6 relative z-30">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1 mb-4 bg-[#1c2534] border border-[#2a3546] rounded-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#a0b1c5]/10 via-[#8faabe]/10 to-[#5d7b9c]/10" />
                <span className="relative text-[#c6d4e3] text-sm uppercase tracking-widest">Our Projects</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">Responsive Design Projects</h1>
              <p className="text-[#a0b1c5] text-lg md:text-xl max-w-3xl mx-auto mb-8">
                Explore our responsive design projects showcasing adaptive layouts for all devices.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Content Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#111622] to-[#0f1520]">
          <div className="container mx-auto px-6">
            {/* Feature highlights section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 md:mb-12">
              {features.map((feature) => (
                <div 
                  key={feature.id}
                  className="bg-[#1c2534]/50 p-6 rounded-lg border border-[#2a3546] transition-all duration-300 hover:bg-[#1c2534]/70"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-[#111622] rounded-full mr-3">
                      <span className="text-[#c6d4e3] font-bold">{feature.id}</span>
                    </div>
                    <h3 className="font-serif text-xl">{feature.title}</h3>
                  </div>
                  <p className="text-[#a0b1c5]">{feature.description}</p>
                </div>
              ))}
            </div>
            
            {/* Project filter (decorative for now) */}
            <div className="flex flex-wrap items-center justify-center mb-8 gap-2">
              <span className="text-sm text-[#a0b1c5] mr-2">Filter:</span>
              <button className="px-3 py-1 bg-[#1c2534] rounded-full text-sm text-[#c6d4e3] transition-colors hover:bg-[#2a3546] active">All</button>
              <button className="px-3 py-1 bg-[#111622]/50 rounded-full text-sm text-[#a0b1c5] transition-colors hover:bg-[#1c2534]">Websites</button>
              <button className="px-3 py-1 bg-[#111622]/50 rounded-full text-sm text-[#a0b1c5] transition-colors hover:bg-[#1c2534]">Apps</button>
              <button className="px-3 py-1 bg-[#111622]/50 rounded-full text-sm text-[#a0b1c5] transition-colors hover:bg-[#1c2534]">E-commerce</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[minmax(180px,auto)]">
              {portfolioItems.map((project) => {
                // Define classes based on the size property
                const sizeClasses = {
                  large: "sm:col-span-2 md:col-span-2 md:row-span-2",
                  medium: "sm:col-span-2 md:col-span-2 md:row-span-1",
                  small: "sm:col-span-1 md:col-span-1 md:row-span-1"
                }[project.size || "medium"];
                
                return (
                  <div 
                    key={project.id}
                    className={`group bg-[#111622]/80 rounded-lg overflow-hidden shadow-lg border border-[#2a3546] 
                      transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-[#3d4c63] ${sizeClasses}`}
                  >
                    <div className="relative w-full h-full flex flex-col">
                      <div className="relative flex-grow min-h-[160px] overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Base overlay - always visible */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111622] via-[#111622]/20 to-transparent opacity-60 transition-all duration-300"></div>
                        
                        {/* Hover overlay - only visible on hover */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#1c2534]/50 to-transparent opacity-0 group-hover:opacity-40 transition-all duration-300"></div>
                      </div>
                      <div className="p-4 md:p-6 relative z-10 mt-auto">
                        <div className="mb-1 inline-block px-2 py-0.5 bg-[#1c2534]/80 rounded-md text-xs text-[#c6d4e3] font-medium tracking-wide transition-colors group-hover:bg-[#2a3546]">
                          Project {project.id}
                        </div>
                        <h2 className="font-serif text-xl mb-2 transition-colors duration-300 group-hover:text-white">{project.title}</h2>
                        <p className="text-[#a0b1c5] mb-4 line-clamp-2 group-hover:text-[#c6d4e3] transition-colors duration-300">{project.description}</p>
                        <Button asChild variant="nav" size="sm" className="opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                          <Link href={`/projects/${project.slug}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 