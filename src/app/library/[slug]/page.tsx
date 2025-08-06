"use client"

import { useParams } from "next/navigation"
import { motion, useScroll, useSpring } from "framer-motion"
import { ArrowLeft, MapPin, BookOpen, Users, Clock, Award, Database, Globe, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Detailed library data
const libraryData = {
  arts: {
    name: "Faculty of Arts Library",
    faculty: "Arts",
    image: "/placeholder.svg?height=500&width=800&text=Arts+Library+Interior",
    description:
      "The Faculty of Arts Library serves as the intellectual hub for humanities education and research at the University of Ibadan. Established in 1962, it houses one of the most comprehensive collections of humanities resources in West Africa.",
    location: "Arts Building, Ground Floor, University of Ibadan",
    coordinates: "7.3775° N, 3.9470° E",
    books: "45,230",
    journals: "267",
    articles: "12,500+",
    seatingCapacity: 150,
    studyRooms: 8,
    computerStations: 25,
    openingHours: "Monday - Friday: 8:00 AM - 10:00 PM, Saturday: 9:00 AM - 6:00 PM, Sunday: 2:00 PM - 8:00 PM",
    contact: {
      phone: "+234 (0) 2 810 1150",
      email: "artslibrary@ui.edu.ng",
      librarian: "Dr. Adebayo Ogundimu",
    },
    specialCollections: [
      {
        name: "African Literature Collection",
        description:
          "Comprehensive collection of African literary works including novels, poetry, and drama from across the continent",
        items: "3,500+ books",
      },
      {
        name: "Historical Manuscripts",
        description: "Rare manuscripts and historical documents relating to Nigerian and African history",
        items: "1,200+ manuscripts",
      },
      {
        name: "Philosophy Archives",
        description: "Extensive collection of philosophical works from ancient to contemporary periods",
        items: "2,800+ volumes",
      },
      {
        name: "Language Resources",
        description: "Materials in various Nigerian languages and linguistic research resources",
        items: "1,900+ items",
      },
    ],
    services: [
      "Reference and Information Services",
      "Inter-library Loan",
      "Document Delivery",
      "Research Consultation",
      "Digital Archive Access",
      "Thesis and Dissertation Support",
      "Citation and Bibliography Assistance",
      "Group Study Room Booking",
    ],
    facilities: [
      "Silent Study Areas",
      "Group Discussion Rooms",
      "Computer Lab with Internet Access",
      "Printing and Photocopying Services",
      "Microfilm/Microfiche Readers",
      "Audio-Visual Equipment",
      "Rare Books Reading Room",
      "Faculty Research Carrels",
    ],
    departments: [
      "English Language and Literature",
      "History",
      "Philosophy",
      "Linguistics and African Languages",
      "Arabic and Islamic Studies",
      "European Languages",
      "Theatre Arts",
      "Music",
      "Fine Arts",
    ],
    recentAcquisitions: [
      "Digital Humanities Database Access (2024)",
      "Contemporary African Literature Collection (2023)",
      "Historical Archives Digitization Project (2023)",
      "Philosophy E-Journal Subscriptions (2024)",
    ],
    stats: {
      dailyVisitors: "200-300",
      monthlyLoans: "1,500+",
      digitalAccess: "24/7",
      staffMembers: 12,
    },
  },
  science: {
    name: "Faculty of Science Library",
    faculty: "Science",
    image: "/placeholder.svg?height=500&width=800&text=Science+Library+Interior",
    description:
      "The Faculty of Science Library is a modern research facility supporting scientific education and research across multiple disciplines. It features state-of-the-art resources and technology to support undergraduate and postgraduate studies in the sciences.",
    location: "Science Complex, 2nd Floor, University of Ibadan",
    coordinates: "7.3780° N, 3.9465° E",
    books: "38,450",
    journals: "189",
    articles: "15,200+",
    seatingCapacity: 120,
    studyRooms: 6,
    computerStations: 30,
    openingHours: "Monday - Friday: 8:00 AM - 9:00 PM, Saturday: 9:00 AM - 5:00 PM, Sunday: Closed",
    contact: {
      phone: "+234 (0) 2 810 1151",
      email: "sciencelibrary@ui.edu.ng",
      librarian: "Dr. Folake Adeyemi",
    },
    specialCollections: [
      {
        name: "Research Journals Collection",
        description: "Current and back issues of major scientific journals and research publications",
        items: "5,000+ journal volumes",
      },
      {
        name: "Laboratory Manuals",
        description: "Comprehensive collection of laboratory procedures and experimental guides",
        items: "800+ manuals",
      },
      {
        name: "Scientific Databases",
        description: "Access to major scientific databases and electronic resources",
        items: "25+ databases",
      },
      {
        name: "Thesis Collection",
        description: "Graduate theses and dissertations in various scientific disciplines",
        items: "2,200+ theses",
      },
    ],
    services: [
      "Scientific Literature Search",
      "Database Training",
      "Research Methodology Support",
      "Statistical Software Access",
      "Laboratory Information Services",
      "Patent and Standards Information",
      "Scientific Writing Support",
      "Equipment Manuals Access",
    ],
    facilities: [
      "Modern Computer Lab",
      "Scientific Calculator Lending",
      "Multimedia Presentation Room",
      "Quiet Study Zones",
      "Collaborative Learning Spaces",
      "3D Printing Access",
      "Scientific Software Stations",
      "Research Data Storage",
    ],
    departments: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "Computer Science",
      "Statistics",
      "Geology",
      "Geography",
    ],
    recentAcquisitions: [
      "Advanced Scientific Computing Software (2024)",
      "Nature Digital Archive Access (2024)",
      "Laboratory Equipment Manuals Database (2023)",
      "Open Access Scientific Journals (2024)",
    ],
    stats: {
      dailyVisitors: "150-250",
      monthlyLoans: "1,200+",
      digitalAccess: "24/7",
      staffMembers: 10,
    },
  },
  medicine: {
    name: "E. Latunde Odeku Medical Library",
    faculty: "College of Medicine",
    image: "/libraries/college/odeku.jpg",
    description:
      "The Faculty of Medicine Library is a specialized medical library providing comprehensive resources for medical education, clinical practice, and biomedical research. It operates 24/7 to support the demanding schedules of medical students and healthcare professionals.",
       location: `Queen Elisabeth Road,
P.M.B. 5017, GPO,
University College Hospital
Ibadan`,
    coordinates: "7.3785° N, 3.9460° E",
    books: "32,180",
    journals: "324",
    articles: "18,500+",
    seatingCapacity: 100,
    studyRooms: 10,
    computerStations: 20,
    openingHours: "Monday - Friday: 9:00 AM - 8:00 PM, Saturday: 9:00 AM - 12:00 PM",
    contact: {
      phone: " 08091761085, 08117522327 ",
      email: "medicallibrary@com.ui.edu.ng",
      librarian: "Dr. Grace A. Ajuwon",
    },
    specialCollections: [
      {
        name: "Clinical Guidelines Collection",
        description: "Current clinical practice guidelines and evidence-based medicine resources",
        items: "1,500+ guidelines",
      },
      {
        name: "Medical Databases",
        description: "Access to PubMed, Cochrane Library, and other medical databases",
        items: "15+ databases",
      },
      {
        name: "Anatomy Models",
        description: "3D anatomical models and medical simulation resources",
        items: "200+ models",
      },
      {
        name: "Medical Imaging Collection",
        description: "Radiological images and diagnostic imaging resources",
        items: "5,000+ images",
      },
    ],
    services: [
      "Clinical Literature Search",
      "Evidence-Based Medicine Support",
      "Medical Database Training",
      "Systematic Review Assistance",
      "Clinical Decision Support",
      "Medical Writing Support",
      "Research Ethics Information",
      "Continuing Medical Education Resources",
    ],
    facilities: [
      "24/7 Study Areas",
      "Medical Simulation Lab",
      "Anatomy Study Room",
      "Clinical Skills Practice Area",
      "Medical Imaging Workstations",
      "Telemedicine Equipment",
      "Medical Software Access",
      "Quiet Zones for Exam Preparation",
    ],
    departments: [
      "Medicine",
      "Surgery",
      "Pediatrics",
      "Obstetrics and Gynecology",
      "Psychiatry",
      "Radiology",
      "Pathology",
      "Anesthesia",
    ],
    recentAcquisitions: [
      "Latest Medical Textbooks (2024)",
      "Clinical Decision Support Tools (2024)",
      "Medical Simulation Software (2023)",
      "Telemedicine Resources (2024)",
    ],
    stats: {
      dailyVisitors: "300-400",
      monthlyLoans: "2,000+",
      digitalAccess: "24/7",
      staffMembers: 15,
    },
  },
  // Add more libraries as needed...
}

export default function LibraryDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const library = libraryData[slug as keyof typeof libraryData]

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  if (!library) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Library Not Found</h1>
          <Link href="/libraries">
            <Button>Back to Libraries</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/libraries">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Libraries</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
          <div className="text-xs sm:text-sm text-gray-500 italic">Library Details</div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl">
        {/* Hero Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative h-64 sm:h-80 lg:h-96">
            <img src={library.image || "/placeholder.svg"} alt={library.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <motion.h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {library.name}
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg lg:text-xl opacity-90 flex items-center gap-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <MapPin className="h-5 w-5" />
                {library.location}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg text-center">
            <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 text-green-600 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{library.books}</div>
            <div className="text-xs sm:text-sm text-gray-600">Books</div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg text-center">
            <Database className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{library.journals}</div>
            <div className="text-xs sm:text-sm text-gray-600">Journals</div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg text-center">
            <Users className="h-8 w-8 sm:h-10 sm:w-10 text-orange-600 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{library.seatingCapacity}</div>
            <div className="text-xs sm:text-sm text-gray-600">Seats</div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg text-center">
            <Globe className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{library.articles}</div>
            <div className="text-xs sm:text-sm text-gray-600">Articles</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <motion.section
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Library</h2>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">{library.description}</p>
            </motion.section>

            {/* Special Collections */}
            <motion.section
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Award className="h-6 w-6 text-green-600" />
                Special Collections
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {library.specialCollections.map((collection, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-gray-50 rounded-xl border-l-4 border-green-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">{collection.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{collection.description}</p>
                    <span className="text-green-600 font-medium text-sm">{collection.items}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Services */}
            <motion.section
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {library.services.map((service, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1 + index * 0.05 }}
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{service}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Facilities */}
            <motion.section
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Facilities & Equipment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {library.facilities.map((facility, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 + index * 0.05 }}
                  >
                    <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{facility}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900">{library.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href={`mailto:${library.contact.email}`} className="text-blue-600 hover:underline">
                      {library.contact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Head Librarian</p>
                    <p className="text-gray-900">{library.contact.librarian}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Opening Hours */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                Opening Hours
              </h3>
              <p className="text-gray-700 leading-relaxed">{library.openingHours}</p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="bg-gradient-to-br from-green-600 to-orange-600 rounded-2xl shadow-lg p-6 text-white"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-xl font-bold mb-4">Library Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Daily Visitors:</span>
                  <span className="font-semibold">{library.stats.dailyVisitors}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Loans:</span>
                  <span className="font-semibold">{library.stats.monthlyLoans}</span>
                </div>
                <div className="flex justify-between">
                  <span>Digital Access:</span>
                  <span className="font-semibold">{library.stats.digitalAccess}</span>
                </div>
                <div className="flex justify-between">
                  <span>Staff Members:</span>
                  <span className="font-semibold">{library.stats.staffMembers}</span>
                </div>
              </div>
            </motion.div>

            {/* Departments Served */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Departments Served</h3>
              <div className="space-y-2">
                {library.departments.map((dept, index) => (
                  <motion.div
                    key={index}
                    className="px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-700"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 + index * 0.05 }}
                  >
                    {dept}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Acquisitions */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Acquisitions</h3>
              <div className="space-y-3">
                {library.recentAcquisitions.map((acquisition, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{acquisition}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
