"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { ArrowLeft, X, ChevronLeft, ChevronRight, Calendar, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from "@/components/header"
import ScrollToTop from "@/components/scroll-to-top"

const galleryImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=600&width=800&text=Kenneth+Dike+Library+Exterior",
    title: "Kenneth Dike Library - Main Entrance",
    description:
      "The iconic main entrance of Kenneth Dike Library, showcasing modern architectural design blended with traditional Nigerian elements. This grand entrance welcomes thousands of students and researchers daily.",
    date: "2024-01-15",
    photographer: "UI Photography Team",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=600&width=800&text=Reading+Hall+Interior",
    title: "Main Reading Hall",
    description:
      "The spacious main reading hall with its soaring ceilings and natural lighting provides an inspiring environment for study and research. The hall can accommodate over 500 students simultaneously.",
    date: "2024-01-20",
    photographer: "Dr. Adebayo Ogundimu",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=600&width=800&text=Digital+Resources+Center",
    title: "Digital Resources Center",
    description:
      "State-of-the-art computer workstations providing 24/7 access to digital databases, e-journals, and online resources. The center features high-speed internet and modern computing facilities.",
    date: "2024-02-01",
    photographer: "ICT Department",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=600&width=800&text=Rare+Books+Collection",
    title: "Rare Books and Manuscripts",
    description:
      "A glimpse into our precious rare books collection, featuring centuries-old manuscripts, first editions, and historical documents that preserve Nigeria's rich literary heritage.",
    date: "2024-02-10",
    photographer: "Special Collections Team",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=600&width=800&text=Group+Study+Rooms",
    title: "Collaborative Study Spaces",
    description:
      "Modern group study rooms equipped with interactive whiteboards, comfortable seating, and multimedia capabilities, perfect for collaborative learning and team projects.",
    date: "2024-02-15",
    photographer: "Student Services",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=600&width=800&text=Library+Staff+at+Work",
    title: "Dedicated Library Staff",
    description:
      "Our professional librarians and staff members providing personalized assistance to students and researchers, embodying our commitment to excellent service.",
    date: "2024-02-20",
    photographer: "HR Department",
  },
  {
    id: 7,
    src: "/placeholder.svg?height=600&width=800&text=Medical+Library+Section",
    title: "Medical Library Resources",
    description:
      "Specialized medical library section with anatomical models, medical journals, and clinical resources supporting the College of Medicine's academic programs.",
    date: "2024-02-25",
    photographer: "Medical Library Team",
  },
  {
    id: 8,
    src: "/placeholder.svg?height=600&width=800&text=Students+Studying",
    title: "Students in Deep Study",
    description:
      "Capturing the essence of academic dedication - students immersed in their studies, utilizing the library's peaceful environment for focused learning.",
    date: "2024-03-01",
    photographer: "Campus Life Team",
  },
  {
    id: 9,
    src: "/placeholder.svg?height=600&width=800&text=African+Studies+Collection",
    title: "African Studies Collection",
    description:
      "Our extensive African Studies collection featuring works by renowned African authors, historical documents, and cultural artifacts that celebrate African heritage.",
    date: "2024-03-05",
    photographer: "African Studies Institute",
  },
  {
    id: 10,
    src: "/placeholder.svg?height=600&width=800&text=Library+Garden",
    title: "Peaceful Library Gardens",
    description:
      "The serene outdoor reading spaces and gardens surrounding the library, providing a tranquil environment for reflection and outdoor study sessions.",
    date: "2024-03-10",
    photographer: "Landscape Team",
  },
  {
    id: 11,
    src: "/placeholder.svg?height=600&width=800&text=Research+Workshop",
    title: "Research Skills Workshop",
    description:
      "Interactive workshop session where librarians teach students advanced research methodologies, database navigation, and citation techniques.",
    date: "2024-03-15",
    photographer: "Training Department",
  },
  {
    id: 12,
    src: "/placeholder.svg?height=600&width=800&text=Digital+Archive+System",
    title: "Digital Archive Interface",
    description:
      "Screenshot of our advanced digital archive system, showcasing the user-friendly interface that provides access to thousands of digitized historical documents.",
    date: "2024-03-20",
    photographer: "Digital Services Team",
  },
  {
    id: 13,
    src: "/placeholder.svg?height=600&width=800&text=Night+Study+Session",
    title: "24/7 Study Environment",
    description:
      "The library's commitment to round-the-clock service, showing students taking advantage of late-night study hours in our well-lit, secure environment.",
    date: "2024-03-25",
    photographer: "Security Team",
  },
  {
    id: 14,
    src: "/placeholder.svg?height=600&width=800&text=Book+Restoration",
    title: "Book Conservation Lab",
    description:
      "Behind-the-scenes look at our book conservation laboratory where skilled technicians restore and preserve valuable texts for future generations.",
    date: "2024-04-01",
    photographer: "Conservation Team",
  },
  {
    id: 15,
    src: "/placeholder.svg?height=600&width=800&text=Virtual+Reality+Station",
    title: "VR Learning Station",
    description:
      "Cutting-edge virtual reality station allowing students to explore historical sites, conduct virtual experiments, and engage in immersive learning experiences.",
    date: "2024-04-05",
    photographer: "Innovation Lab",
  },
  {
    id: 16,
    src: "/placeholder.svg?height=600&width=800&text=Cultural+Exhibition",
    title: "Cultural Heritage Exhibition",
    description:
      "Annual cultural exhibition displaying artifacts, traditional crafts, and historical items that showcase Nigeria's rich cultural diversity and heritage.",
    date: "2024-04-10",
    photographer: "Cultural Affairs",
  },
  {
    id: 17,
    src: "/placeholder.svg?height=600&width=800&text=Thesis+Defense",
    title: "Graduate Thesis Defense",
    description:
      "A proud moment captured during a graduate student's thesis defense, highlighting the library's role in supporting advanced research and academic achievement.",
    date: "2024-04-15",
    photographer: "Graduate School",
  },
  {
    id: 18,
    src: "/placeholder.svg?height=600&width=800&text=International+Collaboration",
    title: "International Partnership Meeting",
    description:
      "Historic meeting with international library partners, showcasing our global connections and collaborative efforts to enhance academic resources.",
    date: "2024-04-20",
    photographer: "International Relations",
  },
  {
    id: 19,
    src: "/placeholder.svg?height=600&width=800&text=Student+Innovation+Hub",
    title: "Innovation and Maker Space",
    description:
      "The library's innovation hub where students can access 3D printers, design software, and collaborative tools to bring their creative ideas to life.",
    date: "2024-04-25",
    photographer: "Innovation Team",
  },
  {
    id: 20,
    src: "/placeholder.svg?height=600&width=800&text=Library+Anniversary",
    title: "75th Anniversary Celebration",
    description:
      "Commemorating 75 years of academic excellence, this image captures the joyous celebration with students, faculty, and alumni gathered to honor the library's legacy.",
    date: "2024-05-01",
    photographer: "Anniversary Committee",
  },
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<any>(null)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const nextImage = () => {
    if (selectedImage) {
      const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage.id)
      const nextIndex = (currentIndex + 1) % galleryImages.length
      setSelectedImage(galleryImages[nextIndex])
    }
  }

  const prevImage = () => {
    if (selectedImage) {
      const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage.id)
      const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length
      setSelectedImage(galleryImages[prevIndex])
    }
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === "ArrowRight") nextImage()
        if (e.key === "ArrowLeft") prevImage()
        if (e.key === "Escape") setSelectedImage(null)
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [selectedImage])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-4 h-4 rounded-full ${
              i % 4 === 0
                ? "bg-purple-300/20"
                : i % 4 === 1
                  ? "bg-pink-300/20"
                  : i % 4 === 2
                    ? "bg-orange-300/20"
                    : "bg-blue-300/20"
            }`}
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1080),
            }}
            animate={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1080),
            }}
            transition={{
              duration: Math.random() * 25 + 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}

        {/* Large floating shapes */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-200/30 to-purple-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
       <Header />
      </motion.header>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Camera className="w-4 h-4 mr-2" />
            Visual Journey
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Library{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600">
              Gallery
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Explore the beauty, innovation, and vibrant life of Kenneth Dike Library through our curated collection of
            stunning photographs
          </motion.p>

          {/* Floating stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-purple-600">20</div>
              <div className="text-xs sm:text-sm text-gray-600">Photos</div>
            </motion.div>
            <motion.div
              className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-pink-600">75</div>
              <div className="text-xs sm:text-sm text-gray-600">Years</div>
            </motion.div>
            <motion.div
              className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 col-span-2 md:col-span-1"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-orange-600">2024</div>
              <div className="text-xs sm:text-sm text-gray-600">Latest</div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {galleryImages.map((image, index) => (
            <GalleryCard key={image.id} image={image} index={index} onClick={() => setSelectedImage(image)} />
          ))}
        </motion.div>
      </div>

      {/* Fully Responsive Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Mobile Layout (xs to lg) */}
            <div className="lg:hidden w-full h-full flex flex-col overflow-y-auto">
              {/* Mobile Header */}
              <div className="flex-shrink-0 flex justify-between items-center p-4 bg-black/50 backdrop-blur-sm">
                <button
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-5 w-5" />
                </button>

                <button
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Image */}
              <div className="flex-1 flex items-center justify-center p-4">
                <motion.img
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.title}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Mobile Info Panel */}
              <motion.div
                className="flex-shrink-0 bg-white rounded-t-3xl p-4 sm:p-6 max-h-[40vh] overflow-y-auto"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                  {selectedImage.title}
                </h3>

                <div className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                  {selectedImage.description}
                </div>

                <div className="flex flex-col gap-2 text-xs sm:text-sm text-gray-500 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span>{selectedImage.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 flex-shrink-0" />
                    <span>{selectedImage.photographer}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Desktop Layout (lg and up) */}
            <div className="hidden lg:flex w-full h-full items-center justify-center p-6 xl:p-8">
              {/* Desktop Close Button */}
              <button
                className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200 cursor-pointer"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </button>

              {/* Desktop Navigation Buttons */}
              <button
                className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
              >
                <ChevronRight className="h-7 w-7" />
              </button>

              {/* Desktop Content Container */}
              <motion.div
                className="w-full max-w-7xl flex gap-8 items-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Desktop Image Container */}
                <div className="flex-1 flex items-center justify-center">
                  <img
                    src={selectedImage.src || "/placeholder.svg"}
                    alt={selectedImage.title}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                  />
                </div>

                {/* Desktop Info Panel */}
                <div className="w-96 xl:w-[28rem] flex-shrink-0">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 xl:p-8 shadow-2xl max-h-[80vh] overflow-y-auto">
                    <h3 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {selectedImage.title}
                    </h3>

                    <div className="text-gray-700 text-base xl:text-lg leading-relaxed mb-6">
                      {selectedImage.description}
                    </div>

                    <div className="flex flex-col gap-3 text-sm xl:text-base text-gray-500 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 flex-shrink-0" />
                        <span>{selectedImage.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Camera className="h-5 w-5 flex-shrink-0" />
                        <span>{selectedImage.photographer}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function GalleryCard({ image, index, onClick }: { image: any; index: number; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>    <motion.div
      className="group cursor-pointer break-inside-avoid"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500">
        {/* Image */}
        <div className="relative overflow-hidden">
          <motion.img
            src={image.src}
            alt={image.title}
            className="w-full h-auto object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <motion.h3
            className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.05 + 0.4 }}
          >
            {image.title}
          </motion.h3>

          <motion.p
            className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.05 + 0.5 }}
          >
            {image.description}
          </motion.p>

          {/* Photo Info */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-gray-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.05 + 0.6 }}
          >
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {image.date}
            </div>
            <div className="flex items-center gap-1">
              <Camera className="h-3 w-3" />
              {image.photographer}
            </div>
          </motion.div>
        </div>

        {/* Hover Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent"
          animate={{
            borderColor: isHovered ? "rgba(147, 51, 234, 0.3)" : "transparent",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Sparkle Effect */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-purple-400 rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 2,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>

    <div>
      <ScrollToTop />
    </div>
    
    </>

  )
}
