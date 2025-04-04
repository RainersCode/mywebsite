import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// Same portfolio items from the showcase component
const portfolioItems = [
  {
    id: 1,
    slug: "responsive-ecommerce",
    title: "Responsive E-Commerce",
    description: "Adaptive design with seamless shopping experience across all devices.",
    image: "/responsivedg/resdesk1.png",
    mobileImage: "/responsivedg/respho1.png"
  },
  {
    id: 2,
    slug: "creative-portfolio",
    title: "Creative Portfolio",
    description: "Showcase of creative work with fluid animations and responsive layouts.",
    image: "/responsivedg/resdesk2.png",
    mobileImage: "/responsivedg/respho2.png"
  },
  {
    id: 3,
    slug: "corporate-website",
    title: "Corporate Website",
    description: "Professional business site optimized for desktop, tablet, and mobile viewing.",
    image: "/responsivedg/resdesk3.png",
    mobileImage: "/responsivedg/respho3.png"
  }
];

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-1 mb-2 bg-[#1c2534] rounded-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#a0b1c5]/10 via-[#8faabe]/10 to-[#5d7b9c]/10" />
          <span className="relative text-[#c6d4e3] text-sm uppercase tracking-widest">Our Projects</span>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl mb-4">Responsive Design Projects</h1>
        <p className="text-[#a0b1c5] text-base md:text-lg max-w-2xl mx-auto">
          Explore our responsive design projects showcasing adaptive layouts for all devices.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map((project) => (
          <div 
            key={project.id}
            className="bg-[#111622]/80 rounded-lg overflow-hidden shadow-lg border border-[#2a3546] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            <div className="relative aspect-[16/9]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="font-serif text-xl mb-2">{project.title}</h2>
              <p className="text-[#a0b1c5] mb-4">{project.description}</p>
              <Button asChild variant="nav" size="sm">
                <Link href={`/projects/${project.slug}`}>
                  View Details
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 