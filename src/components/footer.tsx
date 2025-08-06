"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    "Quick Links": [
      { name: "History", href: "/history" },
      { name: "E-Resources", href: "/e-resources" },
      { name: "Facluty Libraries", href: "/libraries" },
      { name: "Gallery", href: "/gallery" },
    ],
    Services: [
      { name: "Register", href: "http://41.184.122.87:8080/" },
      { name: "Search", href: "http://41.184.122.87:8080/record/opac" },
      { name: "Institutional Repository", href: "https://repository.ui.edu.ng/home" },
      { name: "SDI Form", href: "https://docs.google.com/forms/d/e/1FAIpQLSe1gvHauaOPO5NOm4PQ6WdDNnZqAdcv2agrrI7L3VetU3oi0w/viewform?usp=header" },
    ],
    About: [
      { name: "Library Hours", href: "#library-hours" },
      { name: "Recommend a Book", href: "/contact#Recommend" },
      { name: "Print Resources", href: "/print-resources" },
      { name: "Staff Directory", href: "#staff" },
    ],
  }

  return (
    <footer className="bg-gradient-to-br from-indigo-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Contact */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <motion.div
                className="flex items-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex items-center space-x-1">
                  <Image src="/logo/Ui_logo.png" alt="UI Logo" width={32} height={32} className="w-8 h-8 object-contain" />
                  <Image src="/logo/Kdl_logo.png" alt="KDL Logo" width={24} height={24} className="w-6 h-6 object-contain" />
                </div>
                <span className="ml-2 text-sm sm:text-lg font-bold text-white">
                  Kenneth Dike Library
                </span>
              </motion.div>
            </Link>

            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-white flex-shrink-0" />
                <span className="text-gray-100">Kenneth Dike Library
                  University of Ibadan
                  Ibadan, Oyo State Nigeria.</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-white flex-shrink-0" />
                <span className="text-gray-100">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-white flex-shrink-0" />
                <span className="text-gray-100">librarykdl@mail.ui.edu.ng</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <motion.a
                href="https://www.facebook.com/LibraryKDLUI"
                className="text-white hover:text-blue-500 transition-colors duration-300"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Facebook className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="https://x.com/LibraryKDLUI"
                className="text-white hover:text-amber-500 transition-colors duration-300"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Twitter className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="#"
                className="text-white hover:text-blue-500 transition-colors duration-300"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Instagram className="h-6 w-6" />
              </motion.a>
            </div>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4 text-indigo-400">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-white hover:text-blue-500 transition-colors duration-300"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/20 mt-12 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-100">© {currentYear} Kenneth Dike Library. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
