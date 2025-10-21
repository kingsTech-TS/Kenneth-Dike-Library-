"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import {
  MapPin,
  BookOpen,
  Users,
  Clock,
  ExternalLink,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "@/components/header";
import ScrollToTop from "@/components/scroll-to-top";
import Footer from "@/components/footer";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function LibrariesPage() {
  const [libraries, setLibraries] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("All");
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // ✅ Firestore real-time fetch
  useEffect(() => {
    const q = query(collection(db, "libraries"), orderBy("name"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const libs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLibraries(libs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const faculties = ["All", ...Array.from(new Set(libraries.map((lib) => lib.faculty)))];

  const filteredLibraries = libraries.filter((library) => {
    const matchesSearch =
      library.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      library.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFaculty =
      selectedFaculty === "All" || library.faculty === selectedFaculty;
    return matchesSearch && matchesFaculty;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
        <p className="text-gray-500 text-lg">Loading libraries...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      {/* Header */}
      <Header />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Floating Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
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
      </div>

      {/* Main Content */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-12 py-16">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
            Faculty{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
              Libraries
            </span>
          </motion.h1>
          <motion.p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover specialized library resources across all faculties at the
            University of Ibadan, each tailored to support academic and research needs.
          </motion.p>

          {/* Stats */}
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-8 sm:mt-12 max-w-4xl mx-auto">
            <Stat value={libraries.length} label="Faculty Libraries" color="text-indigo-600" />
            <Stat value="500K+" label="Total Books" color="text-blue-600" />
            <Stat value="3,000+" label="Journals" color="text-amber-600" />
            <Stat value="1,500+" label="Seating Capacity" color="text-indigo-500" />
          </motion.div>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search libraries by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Faculty Filter */}
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
                className="h-12 px-4 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 bg-white min-w-[200px]"
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
          <div className="mt-4 pt-4 border-t border-gray-100 text-center text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold text-indigo-600">
              {filteredLibraries.length}
            </span>{" "}
            libraries
            {selectedFaculty !== "All" && (
              <>
                {" "}
                in <span className="font-semibold">{selectedFaculty}</span>
              </>
            )}
            {searchTerm && (
              <>
                {" "}
                matching "<span className="font-semibold">{searchTerm}</span>"
              </>
            )}
          </div>
        </motion.div>

        {/* Libraries Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {filteredLibraries.map((library, index) => (
            <LibraryCard key={library.id} library={library} index={index} />
          ))}
        </motion.div>

        {/* No Results */}
        {filteredLibraries.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No libraries found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or faculty filter</p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedFaculty("All");
              }}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

// ✅ Library Card Component
function LibraryCard({ library, index }: { library: any; index: number }) {
  return (
    <motion.div
      className="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      {/* Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={library.libraryImageURL || library.image || "/placeholder.svg"}
          alt={library.name}
          onError={(e) => ((e.currentTarget.src = "/placeholder.svg"))}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-lg font-bold mb-1">{library.name}</h3>
          <p className="text-sm opacity-90 flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {library.location}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {library.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatBox icon={BookOpen} color="text-indigo-600" bg="bg-indigo-50" label="Books" value={library.books} />
          <StatBox icon={Users} color="text-blue-600" bg="bg-blue-50" label="Seats" value={library.seatingCapacity} />
        </div>

        <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
          <Clock className="h-4 w-4 text-orange-600" />
          <span>{library.openingHours || "Hours not available"}</span>
        </div>

        <Link href={`/libraries/${library.slug}`}>
          <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-yellow-600 hover:to-amber-600 text-white shadow-lg">
            <span>Learn More</span>
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </Link>

        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indigo-200 transition-colors duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
}

// ✅ Helper Components
function Stat({ value, label, color }: { value: any; label: string; color: string }) {
  return (
    <div className="text-center">
      <div className={`text-2xl sm:text-3xl font-bold ${color}`}>{value}</div>
      <div className="text-xs sm:text-sm text-gray-600">{label}</div>
    </div>
  );
}

function StatBox({
  icon: Icon,
  value,
  label,
  color,
  bg,
}: {
  icon: any;
  value: any;
  label: string;
  color: string;
  bg: string;
}) {
  return (
    <div className={`text-center p-3 ${bg} rounded-lg`}>
      <Icon className={`h-5 w-5 ${color} mx-auto mb-1`} />
      <div className="text-sm font-bold text-gray-900">{value || "—"}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}
