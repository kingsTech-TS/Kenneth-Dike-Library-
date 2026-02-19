"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, User, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";
import Header from "@/components/header";
import ScrollToTop from "@/components/scroll-to-top";
import Footer from "@/components/footer";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../../../lib/firebase";
import ChatBotTemplate from "../../components/ChatBotTemplate";

interface StaffMember {
  id: string;
  first: string;
  surname: string;
  otherNames?: string;
  email: string;
  phoneNumber: string;
  imageURL: string;
  designation: string;
  department: string;
  position?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function StaffPage() {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch staff data in saved order (by "position")
  useEffect(() => {
    try {
      const q = query(collection(db, "staff"), orderBy("position", "asc"));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const staffList: StaffMember[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as StaffMember[];
          setStaffMembers(staffList);
          setLoading(false);
        },
        (error) => {
          console.error("Snapshot error:", error);
          toast.error("Failed to load staff data ❌");
          setLoading(false);
        },
      );

      return () => unsubscribe();
    } catch (err: any) {
      console.error("Fetch error:", err);
      toast.error("Error fetching staff data ❌");
      setLoading(false);
    }
  }, []);

  // ✅ Detect mobile for flip interaction
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCardInteraction = (id: string) => {
    if (isMobile) {
      setHoveredCard(hoveredCard === id ? null : id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-amber-50 to-blue-50">
      {/* Header */}
      <motion.header
        className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
      </motion.header>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-50 to-blue-50 via-indigo-50 text-white py-12 sm:py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Library Staff
          </motion.h1>
          <motion.p
            className="text-base sm:text-xl md:text-2xl max-w-3xl mx-auto px-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Meet the dedicated professionals who make our library services
            exceptional
          </motion.p>
          <motion.div
            className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-4 sm:gap-8 text-base sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 sm:h-6 sm:w-6" />
              <span>
                {loading
                  ? "Loading..."
                  : `${staffMembers.length} Staff Members`}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5 sm:h-6 sm:w-6" />
              <span>Various Departments</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-600 text-lg animate-pulse">
            Loading staff...
          </p>
        </div>
      )}

      {/* Mobile tap hint */}
      {!loading && isMobile && (
        <p className="text-center text-sm text-gray-500 px-4 pt-6 pb-2">
          Tap a card to view staff details
        </p>
      )}

      {/* Staff Grid */}
      {!loading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {staffMembers.map((staff) => (
              <motion.div
                key={staff.id}
                className="relative group cursor-pointer"
                onHoverStart={
                  !isMobile ? () => setHoveredCard(staff.id) : undefined
                }
                onHoverEnd={!isMobile ? () => setHoveredCard(null) : undefined}
                onClick={
                  isMobile ? () => handleCardInteraction(staff.id) : undefined
                }
              >
                <Card className="relative h-72 sm:h-80 overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border-0">
                  {/* Front Side */}
                  <motion.div
                    className="absolute inset-0 backface-hidden"
                    animate={{
                      rotateY: hoveredCard === staff.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="relative h-full">
                      <div className="h-60 overflow-hidden flex items-center justify-center bg-gray-100">
                        <motion.img
                          src={staff.imageURL || "/placeholder.svg"}
                          alt={`${staff.first} ${staff.surname} ${staff.otherNames || ""}`}
                          className="w-full h-full object-contain"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <motion.h3
                          className="text-xl font-bold mb-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {staff.first} {staff.surname} {staff.otherNames}
                        </motion.h3>
                        <motion.p
                          className="text-white font-medium"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {staff.designation}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Back Side */}
                  <motion.div
                    className="absolute inset-0 backface-hidden bg-gradient-to-br from-indigo-50 to-blue-50 via-indigo-50 text-black p-4 sm:p-6 flex flex-col justify-center overflow-y-auto"
                    animate={{
                      rotateY: hoveredCard === staff.id ? 0 : -180,
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(-180deg)",
                    }}
                  >
                    <div className="text-center space-y-2 sm:space-y-4">
                      <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-indigo-300">
                        <img
                          src={staff.imageURL || "/placeholder.svg"}
                          alt={`${staff.first} ${staff.surname}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-indigo-600 mb-1">
                        {staff.first} {staff.surname} {staff.otherNames}
                      </h3>
                      <p className="text-indigo-500 font-medium mb-4">
                        {staff.designation}
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-center space-x-2 text-sm">
                          <Mail className="h-4 w-4 text-indigo-500" />
                          <span className="truncate">{staff.email}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-sm">
                          <Phone className="h-4 w-4 text-indigo-500" />
                          <span>{staff.phoneNumber}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-sm">
                          <Briefcase className="h-4 w-4 text-indigo-500" />
                          <span className="text-center">
                            {staff.department}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <Footer />
      <ChatBotTemplate />
      <ScrollToTop />
    </div>
  );
}
