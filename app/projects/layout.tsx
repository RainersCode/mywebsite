import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata = {
  title: 'Project Details - WebDeco',
  description: 'Detailed information about our responsive design projects',
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#141b27] text-zinc-100">
      <Navbar />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </div>
  )
} 