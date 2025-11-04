'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

export default function TourSection() {
  const [activeSection, setActiveSection] = useState(0)

  const tourSections = [
    {
      name: 'Main Entrance',
      description:
        'The Kenneth Dike Library has two main entrances available to readers, equipped with two security points for the protection of library properties.',
      details: [
        'Personal belongings and bags are not allowed inside the reading area and should be deposited in the Cloak Room.',
        'Bags and valuables are kept at the owner’s risk.',
        'The main entrance (Porters’ Lodge) serves as the first contact point for users and visitors.',
      ],
    },
    {
      name: 'Ground Floor (East)',
      description:
        'The 24-hour reading space operates on the ground floor east side, providing a dedicated study area open all week.',
      details: [
        'Open 24 hours a day from Monday to Sunday and on public holidays.',
        'Accessed via the third entrance once the main library closes.',
        'Designed solely for reading — no borrowing or library service access after main hours.',
      ],
    },
    {
      name: 'Ground Floor (West)',
      description: 'This area serves as the primary service and operations hub.',
      details: [
        'Reception',
        'Circulation Desk',
        'Online Public Access Catalogue (OPAC)',
        'Exhibition Gallery',
        'Photocopy Room',
        'Reference/Research Library, Africana and Public Ordinance (PO) Sections',
        'Carrels',
        'E-Classroom',
        'Cataloguing Section',
        'Digitization Chamber',
      ],
    },
    {
      name: 'Basement',
      description:
        'The basement section houses important administrative and technical departments.',
      details: [
        'Serials Section',
        'Carrels',
        'Offices for the Deputy University Librarians',
        'Nigeriana Section',
        'Accounts Unit',
        'Coffee Room',
        'Bindery',
      ],
    },
    {
      name: 'First Floor',
      description: 'This floor is divided into the East, Landing, and West wings.',
      details: [
        'East: E-Research Library',
        'Landing: Chat Room',
        'West: Systems Unit',
      ],
    },
    {
      name: 'Second Floor',
      description: 'Academic and subject-specific collections.',
      details: [
        'East: Literatures, Arts, Economics, and Social Science Materials',
        'Landing: Collection Development Division',
        'West: Education, Librarianship, Medical Sciences, and Agriculture',
      ],
    },
    {
      name: 'Third Floor',
      description: 'Dedicated to science and technology resources.',
      details: [
        'East: Science, Technology, Military Science, and Naval Science',
        'Landing: University Librarian’s Office',
      ],
    },
    {
      name: 'Fourth Floor',
      description:
        'Contains rare and restricted collections accessible only with special permission.',
      details: [
        'Closed Access Section – in-house use only',
        'Arabic Books and Manuscripts Collection',
      ],
    },
  ]

  return (
    <section className="py-20 px-4 md:px-8 md:ml-64 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#002E5D] mb-12">
          Tour of the Library
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Navigation Panel */}
          <nav className="md:col-span-1 space-y-2">
            {tourSections.map((section, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSection(idx)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between ${
                  activeSection === idx
                    ? 'bg-[#002E5D] text-white shadow-lg'
                    : 'bg-gray-100 text-[#002E5D] hover:bg-gray-200'
                }`}
              >
                <span className="font-semibold">{section.name}</span>
                {activeSection === idx && <ChevronRight size={20} />}
              </button>
            ))}
          </nav>

          {/* Section Details */}
          <div className="md:col-span-2 transition-all duration-500">
            <div className="bg-gradient-to-br from-[#f8f9fa] to-white p-8 rounded-xl border-2 border-[#d4af37] shadow-sm">
              <h3 className="text-2xl font-bold text-[#002E5D] mb-2">
                {tourSections[activeSection].name}
              </h3>
              <p className="text-gray-600 mb-6">
                {tourSections[activeSection].description}
              </p>

              <ul className="space-y-3">
                {tourSections[activeSection].details.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-2 h-2 mt-2 bg-[#d4af37] rounded-full"></span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 aspect-video bg-gradient-to-br from-[#002E5D] to-[#004080] rounded-lg flex items-center justify-center text-white">
                <p className="text-center">📸 Section Gallery Image</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
