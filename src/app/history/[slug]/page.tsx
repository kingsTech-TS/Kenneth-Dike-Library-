"use client"

import { useParams } from "next/navigation"
import { motion, useScroll, useSpring } from "framer-motion"
import { ArrowLeft, Mail, Phone, MapPin, BookOpen, Clock, Search, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Librarian data with simplified structure
const librariansData = {
  "dr-mercy-ariomerebi-iroaganachi": {
    name: "DR. MERCY ARIOMEREBI IROAGANACHI",
    title: "University Librarian",
    section: "",
    period: "2022-Present",
    image: "/librarians/Liba.jpg",
    email: "mercyari2001@gmail.com",
    phone: "+234 7031 668 993",
    office: "University Librarian's Office, Kenneth Dike Library",
    yearsOfExperience: 22,
    education: [
      "Ph.D. in Information Resources Management",
      "M.L.I.S., University of Ibadan",
      "B.A. in Communication and Language Arts and a Master of Library and Information Science",
    ],
    researchInterests: [
      "Digital Library Services",
      "Information Literacy",
      "Library Leadership and Management",
      "Open Access Publishing",
      "Academic Library Innovation",
      "Digital Transformation in Libraries",
    ],
    currentResearch: [
      {
        title: "AI Integration in Academic Library Services",
        description:
          "Exploring the implementation of artificial intelligence tools to enhance user experience and library operations in Nigerian universities.",
        status: "Ongoing",
        startDate: "2024",
      },
      {
        title: "Digital Literacy Assessment Framework",
        description:
          "Developing a comprehensive framework for assessing digital literacy skills among undergraduate students in West African universities.",
        status: "Data Collection Phase",
        startDate: "2023",
      },
      {
        title: "Sustainable Library Practices in Developing Countries",
        description:
          "Investigating environmentally sustainable practices and their implementation in academic libraries across sub-Saharan Africa.",
        status: "Analysis Phase",
        startDate: "2023",
      },
    ],
    bio: "Dr. Mercy Ariomerebi Iroaganachi is the 7th substantive University Librarian of the University of Ibadan, Nigeria, and former University Librarian of Covenant University, Ota. A Certified Librarian of Nigeria, she holds a Ph.D. in Information Resources Management from Babcock University, alongside B.A. and MLIS degrees from the University of Ibadan. She has published widely in high-impact, SCOPUS-indexed journals and has delivered over 22 plenary and keynote lectures worldwide. Notably, she was Keynote Speaker at the 2022 CALIM National Librarians’ Conference (Enugu) and the 2023 Stephen Ellis Annual Lecture at Leiden University, Netherlands. Her professional affiliations include the Association of University Librarians of Nigerian Universities (AULNU), Nigerian Library Association (NLA), Association of Academic Librarians (AAL), and OWSD. Her research interests cover ICT in libraries, gender studies, community development, library administration, and STEM education. Dr. Iroaganachi is a devoted wife, mother, and grandmother, admired for her leadership, mentorship, and passion for advancing 21st-century librarianship",
  },
  "dr-helen-o-komolafe-opadeji": {
    name: "DR. HELEN O. KOMOLAFE-OPADEJI",
    title: "Former University Librarian",
    section: "Administration",
    period: "2016-2022",
    image: "/librarians/DPT9.PNG",
    email: "helen.komolafe@ui.edu.ng",
    phone: "+234 (0) 2 810 1101",
    office: "Emeritus Office, Kenneth Dike Library",
    yearsOfExperience: 28,
    education: [
      "Ph.D. in Library and Information Science, University of Ibadan (2012)",
      "M.L.S., University of Ibadan (1995)",
      "B.A. History, University of Ibadan (1988)",
      "Certificate in Information Management, University of London (2000)",
    ],
    researchInterests: [
      "Academic Library Management",
      "Information Resources Development",
      "Library Automation Systems",
      "Scholarly Communication",
      "Institutional Repositories",
      "Collection Development",
    ],
    currentResearch: [
      {
        title: "Post-Retirement Library Consultancy Models",
        description:
          "Developing frameworks for retired library professionals to continue contributing to library development through consultancy services.",
        status: "Publication Phase",
        startDate: "2022",
      },
      {
        title: "Historical Analysis of Nigerian Academic Libraries",
        description:
          "Comprehensive study documenting the evolution and development of academic libraries in Nigeria from 1960 to present.",
        status: "Writing Phase",
        startDate: "2022",
      },
    ],
  },
  "mr-c-o-ola": {
    name: "MR. C. O. OLA",
    title: "Deputy University Librarian",
    section: "Administration",
    period: "2022-Present",
    image: "/librarians/DPT1.png",
    email: "c.ola@ui.edu.ng",
    phone: "+234 (0) 2 810 1102",
    office: "Deputy Librarian's Office, Kenneth Dike Library",
    yearsOfExperience: 18,
    education: [
      "M.L.I.S., University of Ibadan (2005)",
      "B.A. English Language, University of Lagos (1998)",
      "Postgraduate Diploma in Library Science, University of Ibadan (2002)",
    ],
    researchInterests: [
      "Library Administration",
      "Staff Development",
      "User Services Optimization",
      "Library Technology Integration",
      "Performance Management",
      "Quality Assurance in Libraries",
    ],
    currentResearch: [
      {
        title: "Staff Motivation and Productivity in Academic Libraries",
        description:
          "Investigating the relationship between staff motivation strategies and productivity levels in Nigerian university libraries.",
        status: "Data Collection Phase",
        startDate: "2024",
      },
      {
        title: "Digital Skills Training for Library Staff",
        description:
          "Developing and implementing comprehensive digital skills training programs for library personnel in the digital age.",
        status: "Implementation Phase",
        startDate: "2023",
      },
    ],
  },
}



export default function LibrarianPage() {
  const params = useParams()
  const slug = params.slug as string
  const librarian = librariansData[slug as keyof typeof librariansData]

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  if (!librarian) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Librarian Not Found</h1>
          <Link href="/history">
            <Button>Back to History</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 to-indigo-600 origin-left z-50"
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
          <Link href="/history">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to History</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
          <div className="text-xs sm:text-sm text-gray-500 italic">Kenneth Dike Library Profile</div>
        </div>
      </motion.header>

      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl">
        {/* Hero Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="relative h-48 sm:h-64 bg-cover bg-center"
            style={{ backgroundImage: `url('/slug-bg/bg-bboks1.jpg')` }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <motion.h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {librarian.name}
              </motion.h1>
              <motion.p
                className="text-lg sm:text-xl opacity-90"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {librarian.title}
              </motion.p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Image */}
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <img
                  src={librarian.image || "/placeholder.svg"}
                  alt={librarian.name}
                  className="w-40 h-40 lg:w-48 lg:h-48 rounded-full object-cover border-4 border-amber-200 shadow-lg mb-4"
                />
                <div className="flex items-center gap-2 text-amber-600 mb-2">
                  <Clock className="h-5 w-5" />
                  <span className="font-semibold">{librarian.yearsOfExperience} Years Experience</span>
                </div>
                <p className="text-gray-600">{librarian.section}</p>
                <p className="text-sm text-gray-500">{librarian.period}</p>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                className="lg:col-span-2 space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                      <a href={`mailto:${librarian.email}`} className="text-blue-600 hover:underline">
                        {librarian.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Phone</p>
                      <p className="text-gray-900">{librarian.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:col-span-2">
                    <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Office</p>
                      <p className="text-gray-900">{librarian.office}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

          {"bio" in librarian && librarian.bio && (
          <motion.section
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mt-8 mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Biography</h2>
            <p className="text-gray-700 leading-relaxed">{librarian.bio}</p>
          </motion.section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education */}
          <motion.section
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-amber-600" />
              Education
            </h2>
            <div className="space-y-4">
              {librarian.education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-600"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <p className="text-gray-700 font-medium">{edu}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Research Interests */}
          <motion.section
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Search className="h-6 w-6 text-indigo-600" />
              Research Interests
            </h2>
            <div className="flex flex-wrap gap-3">
              {librarian.researchInterests.map((interest, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Current Research Work */}
        <motion.section
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FileText className="h-6 w-6 text-blue-600" />
            Current Research Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {librarian.currentResearch.map((research, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight">{research.title}</h3>
                  <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{research.startDate}</span>
                </div>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">{research.description}</p>
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${research.status === "Ongoing"
                        ? "bg-amber-100 text-amber-800"
                        : research.status === "Data Collection Phase"
                          ? "bg-blue-100 text-blue-800"
                          : research.status === "Analysis Phase"
                            ? "bg-indigo-100 text-indigo-800"
                            : research.status === "Publication Phase"
                              ? "bg-green-100 text-green-800"
                              : research.status === "Writing Phase"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {research.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

      

      </article>
    </div>
  )
}
