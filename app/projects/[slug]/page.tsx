import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import LaptopAnimation from "@/components/laptop-animation"
import Footer from "@/components/footer"
import { ParticlesBackground } from "@/components/ui/particles-background"

// Portfolio items with extended content for detail pages
const portfolioItems = [
  {
    id: 1,
    slug: "responsive-ecommerce",
    title: "Rugby Club Website & Admin Portal",
    description: "Comprehensive website for a rugby club with public content and secure admin portal.",
    image: "/responsivedg/resdesk1.png",
    mobileImage: "/responsivedg/respho1.png",
    fullDescription: "This project involves the development of a comprehensive website for a rugby club, designed to serve both public supporters and internal administrators. The primary goal is to create an engaging, modern, and mobile-responsive public-facing website showcasing club information (articles, fixtures, galleries, team details, contacts) while providing a secure and intuitive admin portal for easy content management. The website follows design principles from v0.dev and utilizes the CodeGuide Starter Lite boilerplate for structure.",
    features: [
      "Public Content Display: Sections for Articles, Fixtures, Galleries, Team Players, Coaches, and Contacts",
      "Secure Admin Authentication: Email/password login for administrators powered by Clerk Auth",
      "Content Management System (CMS): Admin dashboard to add, edit, and delete all types of content",
      "Social Media Integration: Functionality to share articles directly to Facebook",
      "Responsive Design: Fully responsive layout adapting to desktops, tablets, and mobile devices",
      "Real-time Updates: Content changes made in the admin portal are reflected instantly on the public website",
      "Modern UI/UX: Clean, intuitive interface using Shadcn UI components"
    ],
    technologies: [
      "Next.js 14 (App Router)",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI", 
      "V0 by Vercel",
      "Supabase",
      "Clerk Auth",
      "Vercel",
      "Git"
    ],
    challenge: "The main challenge is to empower the rugby club with a dynamic online presence that is easy to update for non-technical admin staff. The club needed a reliable way to keep supporters informed with timely news, match schedules, and other content, replacing potentially outdated or cumbersome processes. This required a solution that balanced a professional, modern public interface with a secure, user-friendly backend for content management.",
    solution: "We are building a web application using Next.js 14 with the App Router structure. The solution comprises two core components: a visually appealing public website built with Shadcn UI components for displaying club content, and a secure admin portal accessible via Clerk Auth for content management. The backend is powered by Supabase, providing a PostgreSQL database, real-time capabilities for instant content updates, and API endpoints. Integration with the Facebook API allows for seamless sharing of articles."
  },
  {
    id: 2,
    slug: "creative-portfolio",
    title: "Fitness Trainer Website",
    description: "Modern, responsive personal training website with online booking system.",
    image: "/responsivedg/resdesk2.png",
    mobileImage: "/responsivedg/respho2.png",
    fullDescription: "This project features a sleek, modern website for fitness trainer Sindija Turka, designed to showcase her training programs and personal brand. The site combines striking visuals with functional elements that allow clients to learn about her approach, browse available programs, and book training sessions online. Built with Framer, the site offers a fully responsive experience with animated transitions and smooth interactions across all devices.",
    features: [
      "Professional Biography Section: Engaging 'About Me' presentation with personal training philosophy",
      "Training Program Showcase: Visual display of various personal training offerings with pricing",
      "Client Testimonials: Dynamic testimonial section displaying real client feedback",
      "FAQ Accordion: Interactive frequently asked questions to address common client inquiries",
      "Online Booking System: Integrated registration form for new clients to schedule sessions",
      "Social Media Integration: Seamless connections to trainer's social media profiles",
      "Responsive Design: Fully adaptive layout for optimal viewing on all devices"
    ],
    technologies: [
      "Framer",
      "React",
      "Responsive Design",
      "CSS Animations",
      "Form Handling",
      "Social Media API",
      "Mobile-First Design",
      "Custom Typography"
    ],
    challenge: "The primary challenge was creating a visually striking website that effectively presents the trainer's unique personality and expertise while providing practical functionality for program information and booking. The site needed to appeal to potential clients through compelling visuals while maintaining excellent performance across all devices and offering clear pathways to conversion.",
    solution: "We developed a custom website using Framer that balances bold visuals with intuitive navigation. The dark theme with burgundy accents creates a distinctive brand presence, while the responsive design ensures a seamless experience on desktop and mobile devices. The site structure prioritizes client engagement, placing testimonials and program offerings prominently to build trust and facilitate conversion. The online booking system streamlines the client onboarding process."
  },
  {
    id: 3,
    slug: "corporate-website",
    title: "Agricultural Export Consultancy",
    description: "Professional website for livestock export consultancy with service showcase and contact system.",
    image: "/responsivedg/resdesk3.png",
    mobileImage: "/responsivedg/respho3.png",
    fullDescription: "This project features a comprehensive website for SIA 'Eksporta konsultācijas', a leading livestock export consultancy in Latvia. The site serves as both an informational platform and a service catalog, helping farmers and agricultural businesses access export consulting services. The design incorporates vibrant green branding with professional imagery of livestock to create an agricultural-focused web presence that inspires trust while effectively communicating the company's expertise in the field.",
    features: [
      "Hero Section: Prominent company introduction with professional livestock imagery",
      "Service Catalog: Detailed presentation of livestock purchase and transportation services",
      "Client Testimonials: Featured feedback from satisfied agricultural clients",
      "News & Updates: Section showcasing industry events and company announcements",
      "Contact Form: Integrated inquiry system for potential clients to request consultations",
      "Service Icons: Visual representations of different service categories for easy navigation",
      "Responsive Design: Fully adaptive layout for agricultural clients using various devices"
    ],
    technologies: [
      "Framer",
      "React",
      "Responsive Design",
      "Contact Form Integration",
      "Custom Icons",
      "Content Management System",
      "Mobile Optimization",
      "SEO for Agricultural Sector"
    ],
    challenge: "The main challenge was creating a professional digital presence for an agricultural business that traditionally operates in a more analog environment. The website needed to present complex export services and regulations in an accessible way to farmers who may not be tech-savvy, while still projecting expertise and trustworthiness in the livestock export field.",
    solution: "We developed a clean, intuitive website with a strong visual identity using the bright green brand color that resonates with the agricultural sector. The information architecture was carefully structured to highlight different service categories with clear visual indicators and simple navigation paths. We incorporated genuine livestock imagery throughout the site to create authentic connections with the target audience of farmers and agricultural businesses."
  },
  {
    id: 4,
    slug: "e-learning-platform",
    title: "Digital Agency Portfolio",
    description: "Modern dark-themed developer portfolio with interactive particle background and clean UI.",
    image: "/responsivedg/respdesk4.png",
    mobileImage: "/responsivedg/respho4.png",
    fullDescription: "This project showcases a sophisticated digital agency website with a dark space-inspired theme featuring interactive particle backgrounds. The site is designed to highlight the agency's development capabilities and project portfolio with a focus on high-performance, visually striking experiences. The minimalist interface uses subtle animations and a strategic information hierarchy to guide potential clients through the agency's service offerings and collaborative process.",
    features: [
      "Interactive Particle Background: Dynamic animated constellation effect that responds to user interaction",
      "Service Showcase: Visual representation of core service offerings with hover effects",
      "Project Portfolio Gallery: Showcasing client work with detailed case studies",
      "Collaborative Process Timeline: Step-by-step visualization of the development workflow",
      "Client Testimonials: Featured feedback from previous clients with elegant transitions",
      "Contact Form Integration: Custom-designed inquiry system with validation",
      "Fully Responsive Design: Optimized experience from desktop to mobile devices"
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Framer Motion",
      "Three.js for Particle Effects",
      "CSS Grid & Flexbox",
      "GSAP Animations",
      "Responsive Design",
      "Contact Form Integration"
    ],
    challenge: "The main challenge was creating a portfolio website that effectively communicates technical expertise while maintaining an engaging visual experience. The site needed to balance sophisticated animations and interactive elements with fast load times and performance, while effectively showcasing the agency's capabilities and previous work in a compelling way.",
    solution: "We developed a striking design centered around a space-themed particle animation that creates visual interest without compromising performance. The information architecture guides visitors from service offerings through the collaborative process to completed projects, building credibility at each step. Custom animations and transitions were optimized for performance, ensuring the interactive elements enhance rather than detract from the user experience."
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
    <div className="min-h-screen bg-[#141b27] text-zinc-100">
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#141b27] to-[#111622] relative overflow-hidden">
          <ParticlesBackground visibility="reduced" />
          <div className="container mx-auto px-6 relative z-30">
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
                <div className="inline-block px-4 py-1 mb-4 bg-[#1c2534] border border-[#2a3546] rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#a0b1c5]/10 via-[#8faabe]/10 to-[#5d7b9c]/10" />
                  <span className="relative text-[#c6d4e3] text-sm uppercase tracking-widest">Project Details</span>
                </div>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">{project.title}</h1>
                <p className="text-[#a0b1c5] text-lg md:text-xl max-w-3xl mx-auto md:mx-0">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Project Content Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#111622] to-[#0f1520]">
          <div className="container mx-auto px-6">
            {/* Project Preview - Image Display */}
            <div className="mb-16">
              {params.slug === "responsive-ecommerce" || params.slug === "creative-portfolio" || params.slug === "corporate-website" || params.slug === "e-learning-platform" ? (
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <LaptopAnimation 
                    desktopImage={project.image}
                    mobileImage={project.mobileImage}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-[#111622]/80 rounded-xl overflow-hidden shadow-xl border border-[#2a3546] transform md:hover:scale-[1.02] transition-transform duration-300">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={project.image}
                        alt={`${project.title} - Desktop`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 text-center text-sm text-[#a0b1c5] bg-[#141b27]/50 backdrop-blur-sm">
                      Desktop View
                    </div>
                  </div>
                  
                  <div className="bg-[#111622]/80 rounded-xl overflow-hidden shadow-xl border border-[#2a3546] transform md:hover:scale-[1.02] transition-transform duration-300">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={project.mobileImage}
                        alt={`${project.title} - Mobile`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 text-center text-sm text-[#a0b1c5] bg-[#141b27]/50 backdrop-blur-sm">
                      Mobile View
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Project Overview */}
            <div className="bg-[#141b27]/40 backdrop-blur-sm border border-[#2a3546] rounded-xl p-8 mb-16 shadow-xl">
              <h2 className="font-serif text-2xl md:text-3xl mb-6 text-white relative inline-block">
                Project Overview
                <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-[#a0b1c5] to-transparent rounded-full"></div>
              </h2>
              <p className="text-[#a0b1c5] mb-8 text-lg leading-relaxed">{project.fullDescription}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                <div className="bg-[#111622]/50 p-6 rounded-lg border border-[#2a3546]/50">
                  <h3 className="font-serif text-xl mb-4 text-[#c6d4e3]">The Challenge</h3>
                  <p className="text-[#a0b1c5]">{project.challenge}</p>
                </div>
                <div className="bg-[#111622]/50 p-6 rounded-lg border border-[#2a3546]/50">
                  <h3 className="font-serif text-xl mb-4 text-[#c6d4e3]">Our Solution</h3>
                  <p className="text-[#a0b1c5]">{project.solution}</p>
                </div>
              </div>
            </div>
            
            {/* Features and Technologies in Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Features Card */}
              <div className="bg-[#141b27]/40 backdrop-blur-sm border border-[#2a3546] rounded-xl p-8 shadow-xl h-full">
                <h2 className="font-serif text-2xl md:text-3xl mb-6 text-white relative inline-block">
                  Key Features
                  <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-[#a0b1c5] to-transparent rounded-full"></div>
                </h2>
                <ul className="space-y-4 text-[#a0b1c5]">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start group">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#1c2534] to-[#2a3546] flex items-center justify-center mt-0.5 mr-3 group-hover:from-[#5d7b9c] group-hover:to-[#8faabe] transition-colors duration-300">
                        <span className="text-[#a0b1c5] text-xs group-hover:text-white transition-colors duration-300">{index + 1}</span>
                      </span>
                      <span className="group-hover:text-white transition-colors duration-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Technologies Card */}
              <div className="bg-[#141b27]/40 backdrop-blur-sm border border-[#2a3546] rounded-xl p-8 shadow-xl h-full">
                <h2 className="font-serif text-2xl md:text-3xl mb-6 text-white relative inline-block">
                  Technologies
                  <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-[#a0b1c5] to-transparent rounded-full"></div>
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="px-4 py-2 bg-gradient-to-r from-[#1c2534] to-[#2a3546] rounded-full text-[#c6d4e3] border border-[#4d5f79]/30 hover:border-[#a0b1c5]/30 transition-colors duration-300 hover:from-[#1f2a3c] hover:to-[#15202f] hover:text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="mt-16 text-center">
              <p className="text-[#a0b1c5] mb-6 max-w-2xl mx-auto">
                Interested in discussing your own project? We'd love to hear about your ideas and how we can help bring them to life.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  variant="nav"
                  size="lg"
                  className="px-8"
                >
                  <Link href="/projects">
                    View More Projects
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="nav"
                  size="lg"
                  className="px-8 bg-gradient-to-r from-[#141b27] to-[#1c2534] border-[#4d5f79] hover:border-[#a0b1c5] hover:bg-gradient-to-r hover:from-[#15202f] hover:to-[#1f2a3c]"
                >
                  <Link href="/project-kickoff">
                    Start Your Project
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 