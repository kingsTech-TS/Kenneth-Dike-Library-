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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
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
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/libraries">
            <Button variant="ghost" size="lg" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Back to Libraries</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
          <span className="text-sm text-gray-500 italic">Library Details</span>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="relative">
        <motion.img
          src={library.libraryImageURL || "/placeholder.svg"}
          alt={library.name}
          className="w-full h-[45vh] sm:h-[55vh] object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <motion.h1
            className="text-white text-3xl sm:text-5xl font-bold text-center px-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {library.name}
          </motion.h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid xl:grid-cols-3 gap-10">
        {/* Left Column */}
        <motion.div
          className="xl:col-span-2 space-y-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {/* Description */}
          <motion.section
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <h2 className="text-2xl font-semibold text-amber-700 mb-4">
              About the Library
            </h2>
            <p className="text-gray-700 leading-relaxed">{library.description}</p>
          </motion.section>

          {/* Quick Stats */}
          <motion.section
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            {[
              { icon: BookOpen, label: "Books", value: library.books },
              { icon: Database, label: "Journals", value: library.journals },
              { icon: Globe, label: "Articles", value: library.articles },
              { icon: Users, label: "Seats", value: library.seatingCapacity },
              { icon: Clock, label: "Hours", value: library.openingHours },
              { icon: MapPin, label: "Location", value: library.location },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center text-center hover:shadow-md transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <item.icon className="h-8 w-8 text-amber-700 mb-2" />
                <div className="text-gray-800 font-medium">{item.label}</div>
                <div className="text-lg font-bold text-gray-900">
                  {item.value || "—"}
                </div>
              </motion.div>
            ))}
          </motion.section>

          {/* Services */}
          <motion.section
            className="bg-white p-8 rounded-2xl shadow-md"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-amber-700">
              Services Offered
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3 text-gray-700">
              {library.services?.length ? (
                library.services.map((service, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg"
                  >
                    <span className="h-2 w-2 bg-amber-600 rounded-full" />
                    {service}
                  </li>
                ))
              ) : (
                <p className="text-gray-500 italic">No services listed.</p>
              )}
            </ul>
          </motion.section>

          {/* Facilities */}
          <motion.section
            className="bg-white p-8 rounded-2xl shadow-md"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-amber-700">
              Facilities Available
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3 text-gray-700">
              {library.facilities?.length ? (
                library.facilities.map((facility, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 bg-indigo-50 px-3 py-2 rounded-lg"
                  >
                    <span className="h-2 w-2 bg-indigo-600 rounded-full" />
                    {facility}
                  </li>
                ))
              ) : (
                <p className="text-gray-500 italic">No facilities listed.</p>
              )}
            </ul>
          </motion.section>
        </motion.div>

        {/* Right Sidebar */}
        <motion.div
          className="space-y-8"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          {/* Librarian Info */}
          <div className="bg-white p-8 rounded-2xl shadow-md text-center">
            <img
              src={library.librarianImageURL || "/placeholder.svg"}
              alt={library.librarian || "Librarian"}
              className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-amber-100"
            />
            <h3 className="text-lg font-semibold text-gray-900">
              {library.librarian || "Unknown Librarian"}
            </h3>
            <p className="text-gray-500 mb-4">Chief Librarian</p>
            <div className="flex flex-col gap-2 text-gray-700 text-sm">
              <div className="flex items-center justify-center gap-2">
                <Phone className="h-4 w-4 text-amber-600" />
                {library.phoneNumber || "N/A"}
              </div>
              <div className="flex items-center justify-center gap-2">
                <Mail className="h-4 w-4 text-amber-600" />
                {library.email || "N/A"}
              </div>
            </div>
          </div>

          {/* Departments */}
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-amber-700">Departments</h2>
            <ul className="space-y-2 text-gray-700">
              {library.departments?.length ? (
                library.departments.map((dept, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg"
                  >
                    <span className="h-2 w-2 bg-amber-600 rounded-full" />
                    {dept}
                  </li>
                ))
              ) : (
                <p className="text-gray-500 italic">No departments listed.</p>
              )}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
