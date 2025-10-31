"use client"

import { motion } from "framer-motion"
import { BookOpen, Globe, FileText, Clock } from "lucide-react"

const quickAccessItems = [
  {
    title: "Library Catalog",
    description: "Search our complete collection of books, journals, and media",
    icon: BookOpen,
    color: "bg-blue-500",
    href: "#catalog",
  },
  {
    title: "E-Resources",
    description: "Access digital databases, e-books, and online journals",
    icon: Globe,
    color: "bg-green-500",
    href: "#e-resources",
  },
  {
    title: "Research Guides",
    description: "Subject-specific guides to help with your research",
    icon: FileText,
    color: "bg-purple-500",
    href: "#research-guides",
  },
  {
    title: "Opening Hours",
    description: "View current hours and holiday schedules",
    icon: Clock,
    color: "bg-orange-500",
    href: "#hours",
  },
]

export default function QuickAccess() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Quick Access</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find what you need quickly with our most popular resources
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickAccessItems.map((item, index) => (
            <motion.a
              key={item.title}
              href={item.href}
              className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div
                className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
