"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  BookOpen,
  Users,
  Clock,
  Database,
  Globe,
  Phone,
  Mail,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../lib/firebase";

interface LibraryData {
  name: string;
  faculty: string;
  description: string;
  location: string;
  coordinates: string;
  books: string;
  journals: string;
  articles: string;
  seatingCapacity: string;
  openingHours: string;
  phoneNumber: string;
  email: string;
  librarian: string;
  services: string[];
  facilities: string[];
  departments: string[];
  libraryImageURL?: string;
  librarianImageURL?: string;
  slug: string;
}

export default function LibraryDetailPage() {
  const { slug } = useParams();
  const [library, setLibrary] = useState<LibraryData | null>(null);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // ✅ Fetch library by slug
  useEffect(() => {
    async function fetchLibrary() {
      try {
        const q = query(collection(db, "libraries"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setLibrary(querySnapshot.docs[0].data() as LibraryData);
        } else {
          setLibrary(null);
        }
      } catch (error) {
        console.error("Error fetching library:", error);
        setLibrary(null);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchLibrary();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-700 text-lg">Loading library details...</p>
        </div>
      </div>
    );
  }

  if (!library) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 text-center px-4">
        <h1 className="text-3xl xl:text-4xl font-bold text-gray-900 mb-4">
          Library Not Found
        </h1>
        <p className="text-gray-600 mb-6 max-w-md">
          It looks like this library doesn’t exist or may have been removed.
        </p>
        <Link href="/libraries">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Back to Libraries
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 origin-left z-50 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
        style={{ scaleX }}
      />

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/libraries">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 hover:bg-amber-50 hover:text-amber-700 transition-colors rounded-full px-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium">All Libraries</span>
            </Button>
          </Link>
          <span className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
            Kenneth Dike Library System
          </span>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative h-[60vh] lg:h-[70vh] w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src={library.libraryImageURL || "/placeholder.svg"}
            alt={library.name}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        </motion.div>

        <div className="absolute inset-0 flex items-end justify-center pb-20 lg:pb-32 px-6">
          <motion.div
            className="text-center max-w-4xl mx-auto space-y-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/30 text-amber-300 text-sm font-medium mb-4">
              {library.faculty || "University Library"}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-2xl">
              {library.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-200 mt-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-amber-400" />
                <span>{library.location}</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-500 rounded-full" />
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-400" />
                <span>{library.openingHours}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (Main Info) */}
          <motion.div
            className="lg:col-span-8 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Quick Stats Bar */}
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 flex flex-wrap justify-around gap-6 border border-gray-100">
              {[
                { icon: BookOpen, label: "Volumes", value: library.books },
                { icon: Database, label: "Journals", value: library.journals },
                {
                  icon: Users,
                  label: "Capacity",
                  value: library.seatingCapacity,
                },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="p-3 bg-amber-50 rounded-full mb-2 text-amber-600">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {stat.value || "—"}
                  </span>
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-amber-500 rounded-full" />
                About the Library
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed text-justify">
                {library.description}
              </p>
            </div>

            {/* Services & Facilities Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Services */}
              <div className="bg-gradient-to-br from-white to-amber-50/30 rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Database className="h-5 w-5 text-amber-600" />
                  Key Services
                </h3>
                <ul className="space-y-3">
                  {library.services?.length ? (
                    library.services.map((service, i) => (
                      <li key={i} className="flex items-start gap-3 group">
                        <div className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-amber-400 group-hover:bg-amber-600 transition-colors" />
                        <span className="text-gray-700 font-medium">
                          {service}
                        </span>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-400 italic">
                      Information unavailable
                    </p>
                  )}
                </ul>
              </div>

              {/* Facilities */}
              <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-600" />
                  Facilities
                </h3>
                <ul className="space-y-3">
                  {library.facilities?.length ? (
                    library.facilities.map((fitness, i) => (
                      <li key={i} className="flex items-start gap-3 group">
                        <div className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-indigo-400 group-hover:bg-indigo-600 transition-colors" />
                        <span className="text-gray-700 font-medium">
                          {fitness}
                        </span>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-400 italic">
                      Information unavailable
                    </p>
                  )}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Right Column (Sidebar) */}
          <motion.div
            className="lg:col-span-4 space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Librarian Card */}
            <Link href="/history" className="block cursor-pointer group/card">
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-indigo-100/50 border border-gray-100 sticky top-24 transition-transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-200/50">
                <div className="bg-gradient-to-br from-indigo-600 to-blue-700 h-24 relative p-6">
                  <h3 className="text-white font-bold text-lg relative z-10 flex items-center gap-2">
                    Head Librarian
                    <span className="text-indigo-200 text-xs font-normal px-2 py-0.5 bg-white/10 rounded-full border border-white/20">
                      View Profile
                    </span>
                  </h3>
                  <div className="absolute right-0 bottom-0 opacity-10">
                    <User className="h-32 w-32 -mb-8 -mr-8 text-white" />
                  </div>
                </div>
                <div className="px-8 pb-8 -mt-10 relative z-10">
                  <div className="w-24 h-24 rounded-2xl bg-white p-1.5 shadow-md mb-4 group-hover/card:scale-105 transition-transform duration-300">
                    <img
                      src={library.librarianImageURL || "/placeholder.svg"}
                      alt={library.librarian || "Librarian"}
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  </div>

                  <h4 className="text-xl font-bold text-gray-900 group-hover/card:text-indigo-700 transition-colors">
                    {library.librarian || "N/A"}
                  </h4>
                  <p className="text-indigo-600 font-medium text-sm mb-6">
                    Chief Librarian
                  </p>

                  <div className="space-y-4">
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `tel:${library.phoneNumber}`;
                      }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-indigo-50 transition-colors group cursor-pointer"
                    >
                      <div className="p-2 bg-white rounded-lg shadow-sm text-gray-500 group-hover:text-indigo-600 transition-colors">
                        <Phone className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {library.phoneNumber || "N/A"}
                      </span>
                    </div>

                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `mailto:${library.email}`;
                      }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-indigo-50 transition-colors group cursor-pointer"
                    >
                      <div className="p-2 bg-white rounded-lg shadow-sm text-gray-500 group-hover:text-indigo-600 transition-colors">
                        <Mail className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 truncate">
                        {library.email || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Departments / Extra Info */}
            {library.departments && library.departments.length > 0 && (
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">
                  Departments Served
                </h3>
                <div className="flex flex-wrap gap-2">
                  {library.departments.map((dept, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 px-3 py-1.5 rounded-lg text-xs font-medium"
                    >
                      {dept}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
