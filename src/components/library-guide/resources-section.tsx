'use client'

import { useState } from 'react'
import { BookOpen, Globe, Archive, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function ResourcesSection() {
  const [activeTab, setActiveTab] = useState('print')

  const tabs = [
    { id: 'print', label: 'Print Resources', icon: BookOpen },
    { id: 'electronic', label: 'Electronic Resources', icon: Globe },
    { id: 'special', label: 'Special Collections', icon: Archive },
  ]

  const printResources = [
    { title: 'General Collection', count: '500,000+ items', description: 'Books across all disciplines' },
    { title: 'Africana/Nigeriana', count: '50,000+ items', description: 'Collections on African and Nigerian studies' },
    { title: 'Government Publications', count: '30,000+ items', description: 'Official government documents' },
    { title: 'Journals & Periodicals', count: '2,000+ titles', description: 'Academic and professional journals' },
  ]

  const electronicResources = [
    { resource: 'JSTOR', access: 'Full Access', description: 'Multidisciplinary digital library' },
    { resource: 'ProQuest', access: 'Limited', description: 'Dissertations and databases' },
    { resource: 'EBSCO', access: 'Full Access', description: 'Academic research databases' },
    { resource: 'PubMed', access: 'Free', description: 'Biomedical and life sciences' },
    { resource: 'Institutional Repository', access: 'Open Access', description: 'ir.library.ui.edu.ng' },
  ]

  const specialCollections = [
    { name: 'Maps and Atlases', items: '5,000+' },
    { name: 'Manuscripts', items: '2,000+' },
    { name: 'Theses and Dissertations', items: '100,000+' },
    { name: 'Rare Books', items: '10,000+' },
  ]

  return (
    <section className="py-20 px-4 md:px-8 md:ml-64 bg-[#fdfdfd]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#002E5D] mb-6">
          Resources
        </h2>
        <p className="text-gray-600 mb-12 max-w-3xl">
          The Kenneth Dike Library provides access to a wide range of print,
          electronic, and special collections to support teaching, learning, and
          research across all disciplines.
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-12" role="tablist">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`${tab.id}-panel`}
                id={`${tab.id}-tab`}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all font-semibold focus:ring-2 focus:ring-[#d4af37] ${
                  activeTab === tab.id
                    ? 'bg-[#002E5D] text-white'
                    : 'bg-gray-100 text-[#002E5D] hover:bg-gray-200'
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content with Animation */}
        <AnimatePresence mode="wait">
          {activeTab === 'print' && (
            <motion.div
              key="print"
              id="print-panel"
              role="tabpanel"
              aria-labelledby="print-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {printResources.map((resource, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-[#f8f9fa] to-white p-6 rounded-lg border-l-4 border-[#d4af37]"
                  >
                    <h4 className="text-xl font-bold text-[#002E5D] mb-2">
                      {resource.title}
                    </h4>
                    <p className="text-[#d4af37] font-semibold mb-2">
                      {resource.count}
                    </p>
                    <p className="text-gray-700">{resource.description}</p>
                  </div>
                ))}
              </div>

              {/* See More Button */}
              <div className="text-center">
                <Link
                href="/print-resources">
                <button className="inline-flex items-center gap-2 bg-[#002E5D] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#003974] transition-all cursor-pointer">
                  See more Print Resources
                  <ArrowRight size={18} />
                </button>
                </Link>
              </div>
            </motion.div>
          )}

          {activeTab === 'electronic' && (
            <motion.div
              key="electronic"
              id="electronic-panel"
              role="tabpanel"
              aria-labelledby="electronic-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative overflow-x-auto border border-gray-200 rounded-lg mb-8">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#002E5D] text-white">
                      <th className="px-6 py-3">Resource</th>
                      <th className="px-6 py-3">Access Type</th>
                      <th className="px-6 py-3">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {electronicResources.map((resource, idx) => (
                      <tr
                        key={idx}
                        className={`border-b ${
                          idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                        } hover:bg-gray-100 transition-colors`}
                      >
                        <td className="px-6 py-3 font-semibold text-[#002E5D]">
                          {resource.resource}
                        </td>
                        <td className="px-6 py-3">
                          <span className="px-3 py-1 bg-[#d4af37] text-[#002E5D] rounded-full text-sm font-semibold">
                            {resource.access}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-gray-700">
                          {resource.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* See More Button */}
              <div className="text-center">
                 <Link
                href="/e-resources">
                <button className="inline-flex items-center gap-2 bg-[#d4af37] text-[#002E5D] font-semibold px-6 py-3 rounded-lg hover:bg-[#e0be55] transition-all">
                  See more Electronic Resources
                  <ArrowRight size={18} />
                </button>
                </Link>
              </div>
            </motion.div>
          )}

          {activeTab === 'special' && (
            <motion.div
              key="special"
              id="special-panel"
              role="tabpanel"
              aria-labelledby="special-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {specialCollections.map((collection, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-r from-[#002E5D] to-[#004080] text-white p-6 rounded-lg shadow-md"
                  >
                    <h4 className="text-xl font-bold mb-2">
                      {collection.name}
                    </h4>
                    <p className="text-[#d4af37] text-lg font-semibold">
                      {collection.items} items
                    </p>
                  </div>
                ))}
              </div>

              {/* See More Button */}
              <div className="text-center">
                 <Link
                href="/print-resources">
                <button className="inline-flex items-center gap-2 bg-[#004080] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#002E5D] transition-all">
                  See more Special Collections
                  <ArrowRight size={18} />
                </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
