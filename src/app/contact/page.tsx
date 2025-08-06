"use client"

import type React from "react"

import { useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  User,
  BookOpen,
  Building,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  BookPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import BookRecommendationModal from "@/components/book-recommendation-modal"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showBookForm, setShowBookForm] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)

  // ✅ Log the form data to the browser console
  console.log("Contact Form Submission:", formData)

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000))

  setIsSubmitting(false)
  setIsSubmitted(true)

  // Reset form after 3 seconds
  setTimeout(() => {
    setIsSubmitted(false)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }, 3000)
}


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }


  const departments = [
      {
    name: "Readers Service",
    email: "reference@library.ui.edu.ng",
    phone: "+234 (0) 2 810 1101",
    head: "DR. BEATRICE A. FABUNMI",
  },
    {
    name: "Digital Services & ICT",
    email: "digital@library.ui.edu.ng",
    phone: "+234 (0) 2 810 1102",
    head: "DR. REUBEN A. OJO",
  },
{
     name: "Special Collections",
    email: "archives@library.ui.edu.ng",
    phone: "+234 (0) 2 810 1103",
    head: "Mrs. Bolarinwa M. Adeyemi",
  },
  {
    name: "Technical Services",
    email: "training@library.ui.edu.ng",
    phone: "+234 (0) 2 810 1104",
    head: "Dr. Adetoun A. Oyelude",
  },
  {
    name: "Reference Services",
    email: "reference@library.ui.edu.ng",
    phone: "+234 (0) 2 810 1104",
    head: "Dr. Adetoun A. Oyelude",
  },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-orange-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Header */}
      <motion.header
        className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
         <Header />
      </motion.header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact Us
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-orange-600">Touch</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're here to help you with any questions, suggestions, or assistance you need. Reach out to us through any
            of the channels below.
          </p>
        </motion.div>

        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card className="p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                <p className="text-gray-600">We'll get back to you as soon as possible.</p>
              </div>

              {isSubmitted ? (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for contacting us. We'll respond within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="h-4 w-4 inline mr-2" />
                        Name
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="h-4 w-4 inline mr-2" />
                        Email
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="What is this regarding?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MessageSquare className="h-4 w-4 inline mr-2" />
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Please describe how we can help you..."
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-600 to-orange-600 hover:from-green-700 hover:to-orange-700 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <motion.div className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </motion.div>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>

                   {/* Book Recommendation Button */}
            <motion.div
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <BookPlus className="h-8 w-8" />
                <div>
                  <h3 className="text-xl font-bold">Recommend a Book</h3>
                  <p className="text-blue-100">Help us expand our collection</p>
                </div>
              </div>
              <p className="text-blue-100 mb-6">
                Know of a book that would benefit our library? Share your recommendations with us and help enhance our
                collection for all users.
              </p>
              <Button
                onClick={() => setShowBookForm(true)}
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold cursor-pointer"
              >
                <BookPlus className="w-4 h-4 mr-2" />
                Recommend a Book
              </Button>
            </motion.div>
                </form>
              )}
            </Card>
          </motion.div>

          

          {/* Departments & Additional Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {/* Departments */}
            <Card className="p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Building className="h-6 w-6 text-blue-600" />
                  Departments
                </h2>
                <p className="text-gray-600">Contact specific departments directly</p>
              </div>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <motion.div
                    key={dept.name}
                    className="p-4 bg-gray-50 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  >
                    <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{dept.head}</p>
                    <div className="flex flex-col sm:flex-row gap-2 text-sm">
                      <a href={`mailto:${dept.email}`} className="text-blue-600 hover:underline">
                        {dept.email}
                      </a>
                      <span className="hidden sm:inline text-gray-400">•</span>
                      <span className="text-gray-600">{dept.phone}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Social Media & Links */}
            <Card className="p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Globe className="h-6 w-6 text-green-600" />
                  Connect With Us
                </h2>
                <p className="text-gray-600">Follow us on social media for updates</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://www.facebook.com/LibraryKDLUI"
                  className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Facebook className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Facebook</span>
                </a>
                <a
                  href="https://x.com/LibraryKDLUI"
                  className="flex items-center gap-3 p-3 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors"
                >
                  <Twitter className="h-5 w-5 text-sky-600" />
                  <span className="text-sm font-medium">Twitter</span>
                </a>
                <a
                  href="https://instagram.com/uilibrary"
                  className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
                >
                  <Instagram className="h-5 w-5 text-pink-600" />
                  <span className="text-sm font-medium">Instagram</span>
                </a>
                <a
                  href="https://linkedin.com/company/uilibrary"
                  className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Linkedin className="h-5 w-5 text-blue-700" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
              </div>
            </Card>

          
          </motion.div>
        </div>
      </div>


      {/* Book Recommendation Modal */}
     <BookRecommendationModal isOpen={showBookForm} onClose={() => setShowBookForm(false)} />


      {/* Footer and ScrollToTop */}
      <Footer />
    
    </div>
  )
}
