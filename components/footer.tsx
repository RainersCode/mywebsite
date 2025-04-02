export default function Footer() {
  return (
    <footer className="py-8 bg-[#141b27] border-t border-[#2a3546] relative overflow-hidden">
      {/* Colorful Accent Line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#8faabe]/30 via-[#a0b1c5]/30 to-[#5d7b9c]/30"></div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-[#7d8ea1] text-sm">
              &copy; {new Date().getFullYear()} FRAMERSTUDIO. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-[#7d8ea1] hover:text-[#c6d4e3] text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[#7d8ea1] hover:text-[#c6d4e3] text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

