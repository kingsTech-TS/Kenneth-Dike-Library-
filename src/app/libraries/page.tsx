"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import {
  ArrowLeft,
  MapPin,
  BookOpen,
  Users,
  Clock,
  ExternalLink,
  Search,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import Header from "@/components/header"
import ScrollToTop from "@/components/scroll-to-top"
import Footer from "@/components/footer"

const facultyLibraries = [
  {
    id: 1,
    name: "Faculty of the social science Library",
    faculty: "Social Science",
    image: "/Libraries/Social-science/social.jpg",
    description:
      "The faculty of the social science Library was established in the year 1972. It caters for the reading, teaching and research interest of students...",
    location: "Arts Building, Ground Floor",
    books: "8,918",
    journals: "850",
    seatingCapacity: 112,
    openingHours: "8:00AM - 4:00PM",
    specialCollections: ["Faculty Prospectus", "Faculty Lectures", "Order proceedings"],
    slug: "social",
  },
  {
    id: 2,
    name: "Wilson Olabode Aiyepeku Library",
    faculty: "Multidisciplinary Studies",
    image: "/Libraries/Multidisciplinary/mult.jpg",
    description:
      "The department of Data and information Science (DDIS) Library was formerly an African Regional Center for Information Science (ARCIS) Library is...",
    location: "Ground floor of the DDIS building",
    books: "926",
    journals: "57",
    seatingCapacity: 20,
    openingHours: "8:00 AM - 4:00 PM",
    specialCollections: ["Research Journals", "Laboratory Manuals", "Scientific Databases"],
    slug: "multidisciplinary",
  },
  {
    id: 3,
    name: "E. Latunde Odeku Medical Library",
    faculty: "College of Medicine",
    image: "/Libraries/College/odeku.jpg",
    description:
      "Medical and health sciences collection with clinical resources, medical journals, and research materials.",
    location: `Queen Elisabeth Road,
P.M.B. 5017, GPO,
University College Hospital
Ibadan`,
    books: "50,000+",
    journals: "320+",
    seatingCapacity: 100,
    openingHours: "9:00AM - 8:00AM",
    specialCollections: ["Clinical Guidelines", "Medical Databases", "Anatomy Models"],
    slug: "medicine",
  },
  {
    id: 4,
    name: "Faculty Library of Veterinanry Medicine",
    faculty: "Veterinanry Medicine",
    image: "/Libraries/Veterinanry/vet.jpg",
    description: "The Faculty Library of Veterinary Medicine is established to bring library and information services closer to the students and...",
    location: "Faculty of Veterinary Medicine Buliding",
    books: "620",
    journals: "20",
    seatingCapacity: 85,
    openingHours: "8:00 AM - 4:00 PM",
    specialCollections: ["Nigerian Law Reports", "International Law", "Legal Databases"],
    slug: "veterinanry",
  },
  {
    id: 5,
    name: "Faculty of Arts Library",
    faculty: "Arts",
    image: "/Libraries/Art/art.jpeg",
    description:
      "Faculty of Arts Library is a 2009 ETF Special Intervention project meant to centralise and harmonise the resources in the various departmental...",
    location: "At the entrance of Faculty of Arts ",
    books: "499",
    journals: "35",
    seatingCapacity: 60,
    openingHours: "8:00 AM - 4:00 PM",
    specialCollections: ["Curriculum Materials", "Educational Psychology", "Teaching Resources"],
    slug: "art",
  },
  {
    id: 6,
    name: "Adéọlá Odùtọ́lá Law Library",
    faculty: "Law",
    image: "/Libraries/Law/law.jpg",
    description:
      "Adéọlá Odùtọ́lá Law Library is the knowledge hub of the Faculty of Law, University of Ibadan. It was established to provide adequate information...",
    location: "Niger Road, along Vice Chancellor's Lodge, University of Ibadan",
    books: "8,923",
    journals: "4,688",
    seatingCapacity: 153,
    openingHours: "8:00 AM - 4:00 PM",
    specialCollections: ["Agricultural Research", "Crop Science", "Animal Husbandry"],
    slug: "law",
  },
  {
    id: 7,
    name: "Faculty of Agriculture and Renewable Natural Resources Library",
    faculty: "Agriculture",
    image: "/Libraries/Agriculture/agric.jpg",
    description:
      "The Faculty of Agriculture library is a modern, well-equipped facility offering students and researchers a conducive study environment...",
    location: "Faculty of Agriculture",
    books: "8,748",
    journals: "856",
    seatingCapacity: 110,
    openingHours: "8:00 AM - 4:00 PM",
    specialCollections: ["African Studies", "Development Studies", "Political Archives"],
    slug: "agriculture",
  },
  {
    id: 8,
    name: "Faculty of Technology Library",
    faculty: "Technology",
    image: "/placeholder.svg?height=300&width=400&text=Technology+Library",
    description:
      "Engineering and technology resources including mechanical, electrical, civil, and computer engineering materials.",
    location: "Technology Complex",
    books: "25,000+",
    journals: "140+",
    seatingCapacity: 85,
    openingHours: "8:00 AM - 8:00 PM",
    specialCollections: ["Engineering Standards", "Technical Manuals", "Patent Documents"],
    slug: "technology",
  },
  {
    id: 9,
    name: "Faculty of Pharmacy Library",
    faculty: "Pharmacy",
    image: "/placeholder.svg?height=300&width=400&text=Pharmacy+Library",
    description:
      "Pharmaceutical sciences collection with drug information, pharmacology, and pharmaceutical chemistry resources.",
    location: "Pharmacy Building",
    books: "18,000+",
    journals: "120+",
    seatingCapacity: 60,
    openingHours: "8:00 AM - 7:00 PM",
    specialCollections: ["Drug Information", "Pharmacology", "Pharmaceutical Chemistry"],
    slug: "pharmacy",
  },
  {
    id: 10,
    name: "Faculty of Dentistry Library",
    faculty: "Dentistry",
    image: "/placeholder.svg?height=300&width=400&text=Dentistry+Library",
    description: "Dental sciences resources including oral health, dental procedures, and dental research materials.",
    location: "Dental Sciences Building",
    books: "15,000+",
    journals: "80+",
    seatingCapacity: 50,
    openingHours: "8:00 AM - 6:00 PM",
    specialCollections: ["Oral Health", "Dental Procedures", "Clinical Dentistry"],
    slug: "dentistry",
  },
  {
    id: 11,
    name: "Faculty of Veterinary Medicine Library",
    faculty: "Veterinary Medicine",
    image: "/placeholder.svg?height=300&width=400&text=Veterinary+Library",
    description: "Veterinary sciences collection covering animal health, veterinary procedures, and animal research.",
    location: "Veterinary Medicine Building",
    books: "20,000+",
    journals: "100+",
    seatingCapacity: 65,
    openingHours: "8:00 AM - 6:00 PM",
    specialCollections: ["Animal Health", "Veterinary Procedures", "Animal Research"],
    slug: "veterinary-medicine",
  },
  {
    id: 12,
    name: "Faculty of Public Health Library",
    faculty: "Public Health",
    image: "/placeholder.svg?height=300&width=400&text=Public+Health+Library",
    description:
      "Public health resources including epidemiology, health policy, environmental health, and community health materials.",
    location: "Public Health Building",
    books: "22,000+",
    journals: "130+",
    seatingCapacity: 75,
    openingHours: "8:00 AM - 7:00 PM",
    specialCollections: ["Epidemiology", "Health Policy", "Environmental Health"],
    slug: "public-health",
  },
  {
    id: 13,
    name: "Faculty of Economics Library",
    faculty: "Economics",
    image: "/placeholder.svg?height=300&width=400&text=Economics+Library",
    description:
      "Economics and business resources including economic theory, development economics, and business studies.",
    location: "Economics Building",
    books: "26,000+",
    journals: "110+",
    seatingCapacity: 70,
    openingHours: "8:00 AM - 8:00 PM",
    specialCollections: ["Development Economics", "Economic Theory", "Business Studies"],
    slug: "economics",
  },
  {
    id: 14,
    name: "Faculty of Environmental Design Library",
    faculty: "Environmental Design",
    image: "/placeholder.svg?height=300&width=400&text=Environmental+Design+Library",
    description:
      "Architecture, urban planning, and environmental design resources with design portfolios and planning materials.",
    location: "Environmental Design Building",
    books: "19,000+",
    journals: "90+",
    seatingCapacity: 55,
    openingHours: "8:00 AM - 7:00 PM",
    specialCollections: ["Architecture", "Urban Planning", "Design Portfolios"],
    slug: "environmental-design",
  },
  {
    id: 15,
    name: "Faculty of Renewable Natural Resources Library",
    faculty: "Renewable Natural Resources",
    image: "/placeholder.svg?height=300&width=400&text=Natural+Resources+Library",
    description:
      "Natural resources management including forestry, wildlife, fisheries, and environmental conservation materials.",
    location: "Natural Resources Building",
    books: "24,000+",
    journals: "105+",
    seatingCapacity: 65,
    openingHours: "8:00 AM - 6:00 PM",
    specialCollections: ["Forestry", "Wildlife Management", "Environmental Conservation"],
    slug: "renewable-natural-resources",
  },
  {
    id: 16,
    name: "Faculty of Clinical Sciences Library",
    faculty: "Clinical Sciences",
    image: "/placeholder.svg?height=300&width=400&text=Clinical+Sciences+Library",
    description:
      "Clinical medicine resources including internal medicine, surgery, pediatrics, and specialized clinical materials.",
    location: "Clinical Sciences Building",
    books: "28,000+",
    journals: "200+",
    seatingCapacity: 85,
    openingHours: "24/7",
    specialCollections: ["Internal Medicine", "Surgery", "Pediatrics"],
    slug: "clinical-sciences",
  },
  {
    id: 17,
    name: "Faculty of Basic Medical Sciences Library",
    faculty: "Basic Medical Sciences",
    image: "/placeholder.svg?height=300&width=400&text=Basic+Medical+Sciences+Library",
    description: "Basic medical sciences including anatomy, physiology, biochemistry, and pathology resources.",
    location: "Basic Medical Sciences Building",
    books: "25,000+",
    journals: "150+",
    seatingCapacity: 80,
    openingHours: "8:00 AM - 10:00 PM",
    specialCollections: ["Anatomy", "Physiology", "Biochemistry"],
    slug: "basic-medical-sciences",
  },
  {
    id: 18,
    name: "Institute of African Studies Library",
    faculty: "African Studies",
    image: "/placeholder.svg?height=300&width=400&text=African+Studies+Library",
    description:
      "African studies resources including African history, culture, languages, and contemporary African issues.",
    location: "Institute of African Studies",
    books: "35,000+",
    journals: "180+",
    seatingCapacity: 90,
    openingHours: "8:00 AM - 8:00 PM",
    specialCollections: ["African History", "African Languages", "Cultural Studies"],
    slug: "african-studies",
  },
  {
    id: 19,
    name: "Postgraduate School Library",
    faculty: "Postgraduate Studies",
    image: "/placeholder.svg?height=300&width=400&text=Postgraduate+Library",
    description:
      "Specialized resources for postgraduate research including theses, dissertations, and advanced research materials.",
    location: "Postgraduate School Building",
    books: "40,000+",
    journals: "300+",
    seatingCapacity: 120,
    openingHours: "8:00 AM - 11:00 PM",
    specialCollections: ["Theses Collection", "Research Databases", "Advanced Materials"],
    slug: "postgraduate-studies",
  },
]

export default function LibrariesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFaculty, setSelectedFaculty] = useState("All")

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const faculties = ["All", ...Array.from(new Set(facultyLibraries.map((lib) => lib.faculty)))]

  const filteredLibraries = facultyLibraries.filter((library) => {
    const matchesSearch =
      library.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      library.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFaculty = selectedFaculty === "All" || library.faculty === selectedFaculty
    return matchesSearch && matchesFaculty
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-4 h-4 rounded-full ${i % 4 === 0
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
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Faculty{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
              Libraries
            </span>
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover specialized library resources across all 19 faculties at the University of Ibadan, each tailored to
            support specific academic disciplines and research needs.
          </motion.p>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-8 sm:mt-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-600">19</div>
              <div className="text-xs sm:text-sm text-gray-600">Faculty Libraries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">500K+</div>
              <div className="text-xs sm:text-sm text-gray-600">Total Books</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-amber-600">3,000+</div>
              <div className="text-xs sm:text-sm text-gray-600">Journals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-500">1,500+</div>
              <div className="text-xs sm:text-sm text-gray-600">Seating Capacity</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-indigo-100 mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center">
            {/* Search */}
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search libraries by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base sm:text-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Faculty Filter */}
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
                className="h-12 px-4 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 bg-white w-full lg:w-auto min-w-[200px]"
              >
                {faculties.map((faculty) => (
                  <option key={faculty} value={faculty}>
                    {faculty === "All" ? "All Faculties" : `Faculty of ${faculty}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
            <p className="text-gray-600 text-center text-sm sm:text-base">
              Showing <span className="font-semibold text-indigo-600">{filteredLibraries.length}</span> libraries
              {selectedFaculty !== "All" && (
                <span>
                  {" "}
                  in <span className="font-semibold">{selectedFaculty}</span>
                </span>
              )}
              {searchTerm && (
                <span>
                  {" "}
                  matching "<span className="font-semibold">{searchTerm}</span>"
                </span>
              )}
            </p>
          </div>
        </motion.div>

        {/* Libraries Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {filteredLibraries.map((library, index) => (
            <LibraryCard key={library.id} library={library} index={index} />
          ))}
        </motion.div>

        {/* No Results */}
        {filteredLibraries.length === 0 && (
          <motion.div
            className="text-center py-12 sm:py-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No libraries found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search terms or faculty filter</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedFaculty("All")
              }}
              className="bg-indigo-600 hover:bg-green-700"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>

      {/* Footer and ScrollToTop */}
      <div className="mt-16">
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  )
}

function LibraryCard({ library, index }: { library: any; index: number }) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      {/* Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={library.image || "/placeholder.svg"}
          alt={library.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-lg sm:text-xl font-bold mb-1">{library.name}</h3>
          <p className="text-sm opacity-90 flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {library.location}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 line-clamp-3">{library.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="text-center p-2 sm:p-3 bg-indigo-50 rounded-lg">
            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 mx-auto mb-1" />
            <div className="text-sm sm:text-base font-bold text-gray-900">{library.books}</div>
            <div className="text-xs text-gray-500">Books</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg">
            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mx-auto mb-1" />
            <div className="text-sm sm:text-base font-bold text-gray-900">{library.seatingCapacity}</div>
            <div className="text-xs text-gray-500">Seats</div>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="flex items-center gap-2 mb-4 sm:mb-6 text-sm text-gray-600">
          <Clock className="h-4 w-4 text-orange-600" />
          <span>{library.openingHours}</span>
        </div>

        {/* Learn More Button */}
        <Link href={`/library/${library.slug}`}>
          <Button className="w-full  bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-yellow-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group/btn cursor-pointer">
            <span>Learn More</span>
            <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </div>

      {/* Hover Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indigo-200 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  )
}
