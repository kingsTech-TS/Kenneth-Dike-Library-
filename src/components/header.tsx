"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  ChevronDown,
  DownloadCloud,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

// Navigation Items (except ones that became dropdowns)
const navItems = [
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
]

const homeDropdownItems = [
  { name: "Home", href: "/" },
  { name: "History", href: "/history" },
  { name: "Faculty Libraries", href: "/libraries" },
]

const getStartedItems = [
  { name: "Register", href: "http://41.184.122.87:8080/" },
  { name: "Search", href: "http://41.184.122.87:8080/record/opac" },
  { name: "Institutional Repository", href: "https://repository.ui.edu.ng/home" },
]

const eResourcesItems = [
  { name: "E-resources", href: "/e-resources/" },
  { name: "Print Resources", href: "/print-resources" },
  { name: "SDI Form", href: "https://docs.google.com/forms/d/e/1FAIpQLSe1gvHauaOPO5NOm4PQ6WdDNnZqAdcv2agrrI7L3VetU3oi0w/viewform?usp=header" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/Guide/LIBRARY GUIDE.docx"
    link.download = "LIBRARY GUIDE.docx"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast.success("Download Started", {
      description: "Your user guide is being downloaded.",
      icon: <DownloadCloud className="text-blue-600" />,
      duration: 4000,
    })
  }

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="flex items-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex items-center space-x-1">
                <Image src="/logo/Ui_logo.png" alt="UI Logo" width={32} height={32} className="w-8 h-8 object-contain" />
                <Image src="/logo/Kdl_logo.png" alt="KDL Logo" width={24} height={24} className="w-6 h-6 object-contain" />
              </div>
              <span className="ml-2 text-sm sm:text-lg font-bold text-gray-900">
                Kenneth Dike Library
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Home Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group flex items-center gap-1">
                Home
                <ChevronDown className="h-4 w-4" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 bg-white border border-gray-200 shadow-md rounded-md animate-slideDown">
                {homeDropdownItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link href={item.href} className="w-full cursor-pointer px-2 py-2 hover:bg-green-50 rounded-md">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* E-resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group flex items-center gap-1">
                Resources
                <ChevronDown className="h-4 w-4" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 bg-white border border-gray-200 shadow-md rounded-md animate-slideDown">
                {eResourcesItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link href={item.href} className="w-full cursor-pointer px-2 py-2 hover:bg-green-50 rounded-md">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Static Links */}
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group">
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}

            {/* Get Started Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  Get Started
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-md rounded-md animate-slideDown">
                {getStartedItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link href={item.href} className="w-full cursor-pointer px-2 py-2 hover:bg-green-50 rounded-md">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Download Button */}
            <Button className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-yellow-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300" onClick={handleDownload}>
              Download Guide
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 transition-colors duration-200"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-100 py-4"
            >
              <nav className="flex flex-col space-y-4">
                {/* Home Section */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Home</p>
                  {homeDropdownItems.map((item, index) => (
                    <motion.div key={item.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
                      <Link href={item.href} onClick={() => setIsOpen(false)} className="block py-2 pl-4 text-gray-700 hover:text-green-600 font-medium">
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* E-resources Section */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">E-resources</p>
                  {eResourcesItems.map((item, index) => (
                    <motion.div key={item.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: (homeDropdownItems.length + index) * 0.1 }}>
                      <Link href={item.href} onClick={() => setIsOpen(false)} className="block py-2 pl-4 text-gray-700 hover:text-green-600 font-medium">
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Main Navigation */}
                {navItems.map((item, index) => (
                  <motion.div key={item.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: (homeDropdownItems.length + eResourcesItems.length + index) * 0.1 }}>
                    <Link href={item.href} onClick={() => setIsOpen(false)} className="block py-2 text-gray-700 hover:text-green-600 font-medium">
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                {/* Get Started */}
                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Get Started</p>
                  {getStartedItems.map((item, index) => (
                    <motion.div key={item.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: (homeDropdownItems.length + eResourcesItems.length + navItems.length + index) * 0.1 }}>
                      <Link href={item.href} onClick={() => setIsOpen(false)} className="block py-2 pl-4 text-gray-700 hover:text-green-600 font-medium">
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Download Button */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: (homeDropdownItems.length + eResourcesItems.length + navItems.length + getStartedItems.length) * 0.1 }} className="pt-4">
                  <Button className="flex items-center gap-2 w-full justify-start bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-yellow-600 hover:to-amber-600 text-white" onClick={handleDownload}>
                    Download Guide
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
