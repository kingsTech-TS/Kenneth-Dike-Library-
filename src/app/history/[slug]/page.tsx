"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Clock,
  Search,
  PencilLine,
  LibraryBig,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { db } from "../../../../lib/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"

type Research = {
  title: string
  description: string
  status: string
  startDate: string
}

type Librarian = {
  id?: string
  fullName: string
  designation: string
  department: string
  office: string
  period: string
  imageURL: string
  email: string
  phone: string
  yearsOfExperience: number
  education: string
  bio?: string
  researchInterests?: string
  currentResearch?: Research[]
  slug: string
}

export default function LibrarianPage() {
  const params = useParams()
  const slug = params.slug as string

  const [librarian, setLibrarian] = useState<Librarian | null>(null)
  const [loading, setLoading] = useState(true)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // ✅ Fetch librarian by slug from Firestore
  useEffect(() => {
    const fetchLibrarian = async () => {
      try {
        const q = query(collection(db, "librarians"), where("slug", "==", slug))
        const snapshot = await getDocs(q)

        if (!snapshot.empty) {
          const docData = snapshot.docs[0].data() as Librarian
          setLibrarian({ id: snapshot.docs[0].id, ...docData })
        } else {
          setLibrarian(null)
        }
      } catch (error) {
        console.error("Error fetching librarian:", error)
        setLibrarian(null)
      } finally {
        setLoading(false)
      }
    }

    if (slug) fetchLibrarian()
  }, [slug])

  // ✅ Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-amber-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading librarian profile...</p>
        </div>
      </div>
    )
  }

  // ✅ Not found
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

  // ✅ Parse multi-line fields (from Firestore textareas)
  const educationList = librarian.education
    ? librarian.education.split("\n").filter((e) => e.trim() !== "")
    : []

  const researchInterestsList = librarian.researchInterests
    ? librarian.researchInterests.split("\n").filter((r) => r.trim() !== "")
    : []

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

      {/* Main Content */}
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
            style={{ backgroundImage: "url('/slug-bg/bg-bboks1.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <motion.h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {librarian.fullName}
              </motion.h1>
              <motion.p
                className="text-lg sm:text-xl opacity-90"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {librarian.designation}
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
                  src={librarian.imageURL || "/placeholder.svg"}
                  alt={librarian.fullName}
                  className="w-40 h-40 lg:w-48 lg:h-48 rounded-full object-cover border-4 border-amber-200 shadow-lg mb-4"
                />
                <div className="flex items-center gap-2 text-amber-600 mb-2">
                  <Clock className="h-5 w-5" />
                  <span className="font-semibold">{librarian.yearsOfExperience} Years Experience</span>
                </div>
                <p className="text-gray-600">{librarian.department}</p>
                <p className="text-sm text-gray-500">{librarian.period}</p>
              </motion.div>

              {/* Contact Info */}
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

        {/* Biography */}
        {librarian.bio && (
          <motion.section
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mt-8 mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <PencilLine className="h-6 w-6 text-blue-600" />
              Biography
            </h2>
            <p className="text-gray-700 leading-relaxed">{librarian.bio}</p>
          </motion.section>
        )}

        <div className={`grid grid-cols-1 ${researchInterestsList.length > 0 ? "lg:grid-cols-2" : ""} gap-8`}>
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
              {educationList.map((edu, i) => (
                <div key={i} className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-600">
                  <p className="text-gray-700 font-medium">{edu}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Research Interests */}
          {researchInterestsList.length > 0 && (
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
                {researchInterestsList.map((r, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </article>
    </div>
  )
}
