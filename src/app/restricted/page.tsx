"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Shield,
  Lock,
  AlertTriangle,
  ArrowLeft,
  Wifi,
  MapPin,
  Clock,
  Users,
  Contact2,
  PhoneCall,
  Send,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RestrictedPage() {
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showContacts, setShowContacts] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!mounted) return null

  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1920
  const screenHeight = typeof window !== "undefined" ? window.innerHeight : 1080

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-red-400/20 rounded-full"
            initial={{
              x: Math.random() * screenWidth,
              y: Math.random() * screenHeight,
            }}
            animate={{
              x: Math.random() * screenWidth,
              y: Math.random() * screenHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        {/* Pulsing Circles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-red-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-52 h-52 sm:w-80 sm:h-80 bg-orange-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 0.3, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Header */}
      <motion.header
        className="relative z-10 py-6"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Link href="/e-resources">
          <Button variant="ghost" className="text-white hover:bg-white/10 border border-white/20 cursor-pointer">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-140px)]">
        <div className="max-w-5xl w-full mx-auto text-center">
          {/* Animated Shield */}
          <motion.div
            className="relative mb-12"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          >
            <motion.div
              className="relative inline-block"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute inset-0 w-24 h-24 sm:w-32 sm:h-32 mx-auto"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full border-2 border-red-400/30 rounded-full border-dashed" />
              </motion.div>

              <motion.div
                className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-2xl"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(239, 68, 68, 0.5)",
                    "0 0 40px rgba(239, 68, 68, 0.8)",
                    "0 0 20px rgba(239, 68, 68, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Shield className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
              </motion.div>

              {[Lock, AlertTriangle, Wifi].map((Icon, index) => (
                <motion.div
                  key={index}
                  className="absolute w-6 h-6 sm:w-8 sm:h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
                  style={{ top: "50%", left: "50%", transformOrigin: "0 0" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8 + index * 2, repeat: Infinity, ease: "linear" }}
                  initial={{ x: 60 + index * 20, y: -12 }}
                >
                  <Icon className="h-4 w-4 text-white" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Main Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6">
              Visit the{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-red-400 inline-block"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Library
              </motion.span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 font-light">
              This resource is only accessible within the{" "}
              <span className="text-white font-semibold">Library</span>
            </p>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {/* Card 1 */}
            <motion.div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <MapPin className="h-8 w-8 text-red-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Location Required</h3>
              <p className="text-gray-400 text-sm">Must be present in the Library</p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Clock className="h-8 w-8 text-orange-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Library Hours</h3>
              <p className="text-gray-400 text-sm">
                {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </motion.div>

            {/* Card 3 - Contact */}
            <motion.div
              onClick={() => setShowContacts(!showContacts)}
              className="cursor-pointer bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all relative"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Need Help?</h3>
              <p className="text-gray-400 text-sm">Contact Library staff</p>

              {showContacts && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 space-y-2 text-sm text-white"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-2 bg-blue-500/10 p-2 rounded-lg border border-white/10"
                  >
                    <Send className="w-4 h-4 text-blue-300" />
                    <a href="mailto:library@university.edu" className="underline">
                      kdl.ui@gmail.com
                    </a>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-2 bg-blue-500/10 p-2 rounded-lg border border-white/10"
                  >
                    <PhoneCall className="w-4 h-4 text-blue-300" />
                    <a href="tel:+1234567890" className="underline">
                      +234 903 2193 358
                    </a>
                  </motion.div>

                   <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-2 bg-blue-500/10 p-2 rounded-lg border border-white/10"
                  >
                    <MessageCircle className="w-4 h-4 text-blue-300" />
                    <a href="tel:+1234567890" className="underline">
                      +234 815 0607 963
                    </a>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-2xl shadow-lg">
                <MapPin className="mr-2 h-5 w-5" />
                Find the Library
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/e-resources">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-2xl">
                  Browse Other Resources
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Warning */}
          <motion.div
            className="mt-12"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              This restriction is in place to comply with licensing agreements
            </p>
          </motion.div>
        </div>
      </div>

      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 border-4 border-red-500/20 rounded-3xl m-4 pointer-events-none"
        animate={{
          borderColor: ["rgba(239, 68, 68, 0.2)", "rgba(239, 68, 68, 0.5)", "rgba(239, 68, 68, 0.2)"],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}
