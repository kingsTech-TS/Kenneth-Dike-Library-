"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import {
  Search,
  Filter,
  Database,
  Globe,
  Users,
  Zap,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

// Firebase
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { db } from "../../../lib/firebase"
import { DatabaseCard } from "@/components/database-card"

// Components



const categories = [
  "All",
  "Multidisciplinary",
  "Medical & Life Sciences",
  "Engineering & Technology",
  "Science & Technology",
  "Social Sciences & Humanities",
  "Social Sciences",
  "Academic Publishing",
  "History & Journalism",
  "Geopolitics & Statistics",
  "Economics & Business",
  "Theses & Dissertations",
  "Astronomy & Astrophysics",
  "Life Sciences",
]

export default function EResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [databases, setDatabases] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // 🔥 Fetch live data from Firestore
  useEffect(() => {
    const q = query(collection(db, "eResource"), orderBy("counter", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setDatabases(items)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const filteredDatabases = databases.filter((db) => {
    const matchesCategory =
      selectedCategory === "All" || db.category === selectedCategory
    const search = searchTerm.toLowerCase()
    const matchesSearch =
      db.name?.toLowerCase().includes(search) ||
      db.description?.toLowerCase().includes(search) ||
      (db.subjects || []).some((s: string) =>
        s.toLowerCase().includes(search)
      )

    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 via-indigo-50">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 origin-left z-50"
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg border border-indigo-100 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search databases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-12 px-4 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 bg-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-gray-600 text-center">
              Showing{" "}
              <span className="font-semibold text-indigo-600">
                {filteredDatabases.length}
              </span>{" "}
              databases
            </p>
          </div>
        </motion.div>

        {/* Databases Grid */}
        {loading ? (
          <p className="text-center text-gray-500">Loading resources...</p>
        ) : filteredDatabases.length === 0 ? (
          <div className="text-center py-16">
            <Database className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No databases found
            </h3>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
              }}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {filteredDatabases.map((database, index) => (
              <DatabaseCard
                key={database.id}
                database={database}
                index={index}
              />
            ))}
          </motion.div>
        )}

        {/* Access Information */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <Globe className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Access Information</h2>
            <p className="text-xl mb-6 opacity-90">
              Most databases require University of Ibadan network access.
              Some like JSTOR allow off-campus login.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <Users className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">On-Campus Access</h3>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <Zap className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Off-Campus Access</h3>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <Award className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Support Available</h3>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
