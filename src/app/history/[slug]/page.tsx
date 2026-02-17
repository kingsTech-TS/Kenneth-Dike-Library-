"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "../../../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

type Research = {
  title: string;
  description: string;
  status: string;
  startDate: string;
};

type Librarian = {
  id?: string;
  fullName: string;
  designation: string;
  department: string;
  office: string;
  period: string;
  imageURL: string;
  email: string;
  phone: string;
  yearsOfExperience: number;
  education: string;
  bio?: string;
  researchInterests?: string;
  currentResearch?: Research[];
  slug: string;
};

export default function LibrarianPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [librarian, setLibrarian] = useState<Librarian | null>(null);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // ✅ Fetch librarian by slug from Firestore
  useEffect(() => {
    const fetchLibrarian = async () => {
      try {
        const q = query(
          collection(db, "librarians"),
          where("slug", "==", slug),
        );
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const docData = snapshot.docs[0].data() as Librarian;
          setLibrarian({ id: snapshot.docs[0].id, ...docData });
        } else {
          setLibrarian(null);
        }
      } catch (error) {
        console.error("Error fetching librarian:", error);
        setLibrarian(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchLibrarian();
  }, [slug]);

  // ✅ Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-amber-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading librarian profile...</p>
        </div>
      </div>
    );
  }

  // ✅ Not found
  if (!librarian) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Librarian Not Found
          </h1>
          <Link href="/history">
            <Button>Back to History</Button>
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Parse multi-line fields (from Firestore textareas)
  const educationList = Array.isArray(librarian.education)
    ? librarian.education
    : librarian.education
      ? librarian.education.split("\n").filter((e) => e.trim() !== "")
      : [];

  const researchInterestsList = Array.isArray(librarian.researchInterests)
    ? librarian.researchInterests
    : librarian.researchInterests
      ? librarian.researchInterests.split("\n").filter((r) => r.trim() !== "")
      : [];

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Header */}
      <motion.header
        className="fixed top-0 inset-x-0 z-40 transition-all duration-300 border-b border-gray-200/50"
        style={{
          backgroundColor: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <Link href="/history">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Back to Team</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
          <span className="text-xs font-bold text-indigo-600 tracking-widest uppercase border border-indigo-100 px-3 py-1 rounded-full bg-indigo-50">
            Professional Profile
          </span>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="pt-20 pb-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Profile Card */}
        <motion.div
          className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 overflow-hidden mb-8 border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Cover Image */}
          <div className="h-48 sm:h-64 bg-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          <div className="px-8 pb-10">
            <div className="flex flex-col lg:flex-row gap-6 items-start -mt-20">
              {/* Avatar */}
              <div className="relative">
                <div className="w-40 h-40 rounded-[2rem] p-1.5 bg-white shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-300">
                  <img
                    src={librarian.imageURL || "/placeholder.svg"}
                    alt={librarian.fullName}
                    className="w-full h-full object-cover rounded-[1.6rem] bg-gray-100"
                  />
                </div>
                {/* Experience Badge */}
                <div className="absolute -bottom-3 -right-3 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-200" />
                  {librarian.yearsOfExperience}+ Years
                </div>
              </div>

              {/* Header Info */}
              <div className="flex-1 pt-24 lg:pt-20 lg:pl-4 space-y-3">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                    {librarian.fullName}
                  </h1>
                  <p className="text-lg text-indigo-600 font-medium">
                    {librarian.designation}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                    <LibraryBig className="w-4 h-4 text-gray-400" />
                    <span>{librarian.department}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{librarian.office}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 lg:pt-24 flex gap-3 w-full lg:w-auto">
                <Button className="flex-1 lg:flex-none bg-gray-900 hover:bg-gray-800 text-white rounded-xl shadow-lg shadow-gray-900/20">
                  <Link
                    href={`mailto:${librarian.email}`}
                    className="flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Contact
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 lg:flex-none rounded-xl border-gray-200 hover:bg-gray-50"
                >
                  <Link
                    href={`tel:${librarian.phone}`}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Biography */}
            {librarian.bio && (
              <motion.section
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <PencilLine className="w-5 h-5" />
                  </div>
                  Biography
                </h3>
                <div className="prose prose-indigo text-gray-600 leading-relaxed max-w-none">
                  <p>{librarian.bio}</p>
                </div>
              </motion.section>
            )}

            {/* Research */}
            {researchInterestsList.length > 0 && (
              <motion.section
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    <Search className="w-5 h-5" />
                  </div>
                  Research Focus
                </h3>
                <div className="flex flex-wrap gap-2">
                  {researchInterestsList.map((interest, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-700 text-sm font-medium hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-100 transition-colors cursor-default"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Current Research Projects (Expandable) */}
            {librarian.currentResearch &&
              librarian.currentResearch.length > 0 && (
                <motion.section
                  className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    Current Projects
                  </h3>
                  <div className="space-y-4">
                    {librarian.currentResearch.map((res, i) => (
                      <div
                        key={i}
                        className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-white transition-colors"
                      >
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {res.title}
                        </h4>
                        <p className="text-sm text-gray-500 mb-2">
                          {res.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs font-medium text-gray-400 uppercase tracking-wide">
                          <span>{res.status}</span>
                          <span>•</span>
                          <span>Started: {res.startDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Education Card */}
            {educationList.length > 0 && (
              <motion.section
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                    <LibraryBig className="w-5 h-5" />
                  </div>
                  Education
                </h3>

                <div className="relative border-l-2 border-gray-100 ml-3 space-y-8 py-2">
                  {educationList.map((edu, i) => (
                    <div key={i} className="relative pl-6">
                      <div className="absolute -left-[7px] top-1.5 w-4 h-4 rounded-full border-4 border-white bg-amber-400 shadow-sm" />
                      <p className="text-gray-700 font-medium leading-snug">
                        {edu}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Contact Mini Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white text-center shadow-lg shadow-indigo-200">
              <h4 className="font-bold text-lg mb-2">Get in Touch</h4>
              <p className="text-indigo-100 text-sm mb-6 opacity-90">
                Have questions or need assistance? Reach out via email.
              </p>
              <Button
                variant="secondary"
                className="w-full bg-white text-indigo-600 hover:bg-indigo-50 border-0"
              >
                <a href={`mailto:${librarian.email}`}>Send Email</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
