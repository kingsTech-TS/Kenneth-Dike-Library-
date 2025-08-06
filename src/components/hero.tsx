"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import Link from "next/link"

const heroSlides = [
  {
    id: 1,
    image: "img1.jpg",
    title: "Discover Knowledge Beyond Limits",
    subtitle: "Step into a world where tradition meets innovation",
    description: "Our library is more than books—it's your gateway to endless possibilities and academic excellence.",
    stats: { resources: "2.5M+", students: "45K+", access: "24/7" },
  },
  {
    id: 2,
    image: "img2.jpg",
    title: "Modern Learning Spaces",
    subtitle: "Where comfort meets productivity",
    description: "Experience state-of-the-art study environments designed for collaboration, focus, and innovation.",
    stats: { rooms: "150+", seats: "2000+", hours: "24/7" },
  },
  {
    id: 3,
    image: "img3.jpg",
    title: "Digital Excellence",
    subtitle: "Access the world's knowledge",
    description: "Explore millions of digital resources, databases, and e-books from anywhere, anytime.",
    stats: { databases: "500+", ebooks: "1M+", journals: "50K+" },
  },
  {
    id: 4,
    image: "Img675.jpg",
    title: "Research Support",
    subtitle: "Expert guidance for your journey",
    description: "Get personalized research assistance from our expert librarians and subject specialists.",
    stats: { librarians: "25+", consultations: "5K+", success: "98%" },
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const currentSlideData = heroSlides[currentSlide]

  return (
    <section className="relative min-h-[92vh] overflow-hidden group">
      {/* Background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0 bg-black"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <img
              src={currentSlideData.image}
              alt={currentSlideData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 pointer-events-none" />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Animated Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"
          animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 0.8, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Slide Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center">
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-white space-y-8"
            >
              {/* Title */}
              <motion.h1
                className="text-5xl md:text-7xl lg:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                {currentSlideData.title.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    className={
                      index >= currentSlideData.title.split(" ").length - 2
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-yellow-400"
                        : ""
                    }
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-xl md:text-2xl text-gray-200 font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {currentSlideData.subtitle}
              </motion.p>

              {/* Description */}
              <motion.p
                className="text-xl md:text-sm text-gray-300 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                {currentSlideData.description}
              </motion.p>

              {/* Stats */}
              <motion.div
                className="flex gap-12 pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                {Object.entries(currentSlideData.stats).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    className="text-left"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                  >
                    <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-yellow-400">
                      {value}
                    </div>
                    <div className="text-sm text-gray-400 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <div className="flex space-x-2">
            {heroSlides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all cursor-pointer duration-300 ${
                  index === currentSlide ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          <motion.button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-yellow-400"
          initial={{ width: "0%" }}
          animate={{
            width: isAutoPlaying ? "100%" : `${((currentSlide + 1) / heroSlides.length) * 100}%`,
          }}
          transition={{ duration: isAutoPlaying ? 6 : 0.5, ease: "linear" }}
        />
      </div>

      {/* Floating Book Icon */}
      <motion.div
        className="hidden md:flex absolute top-1/2 right-8 transform -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full items-center justify-center border border-white/20 z-20"
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Link href="/e-resources">
          <BookOpen className="w-8 h-8 text-white" />
        </Link>
      </motion.div>
    </section>
  )
}
