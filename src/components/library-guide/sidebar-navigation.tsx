'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

interface Section {
  id: string
  label: string
}

interface SidebarNavigationProps {
  sections: Section[]
  activeSection: string
}

export default function SidebarNavigation({ sections, activeSection }: SidebarNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-[#002E5D] text-white p-2 rounded-lg hover:bg-[#001a37] transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-[#002E5D] text-white z-40 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } overflow-y-auto`}
      >
        <div className="p-8 pt-16 md:pt-8">
          <h2 className="text-2xl font-bold mb-8 text-[#d4af37]">Library Guide</h2>
          
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  activeSection === section.id
                    ? 'bg-[#d4af37] text-[#002E5D] font-semibold'
                    : 'text-white hover:bg-[#004080] hover:translate-x-2'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
