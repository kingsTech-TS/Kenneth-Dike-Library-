"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, User, Briefcase } from "lucide-react"
import { Card } from "@/components/ui/card"
import Header from "@/components/header"
import ScrollToTop from "@/components/scroll-to-top"
import Footer from "@/components/footer"

interface StaffMember {
  id: number
  name: string
  position: string
  email: string
  phone: string
  image: string
  department: string
}

const staffMembers: StaffMember[] = [
  {
    id: 1,
    name: " Agwu Patrick Uzodinma",
    position: "Head, Technical, Infrastructure and Internet Services",
    email: "pu.agwu@ui.edu.ng",
    phone: "+234 803 456 7890",
    image: "/libraryStaff/pat.jpg",
    department: "ICT $ Systems Division",
  },
  {
    id: 2,
    name: "Josephine Ngozi Otunla",
    position: "Electronic Resources Librarian",
    email: "otunlajosephine8@gmail.com",
    phone: "+234 805 123 4567",
    image: "/libraryStaff/pic1.jpg",
    department: "ICT& systems division",
  },
  {
    id: 3,
    name: "Chinedu Okafor",
    position: "Cataloguing Officer",
    email: "c.okafor@university.edu.ng",
    phone: "+234 807 890 1234",
    image: "/libraryStaff/pic2.jpg",
    department: "Technical Services",
  },
  {
    id: 4,
    name: "Aisha Abdullahi",
    position: "Reference Librarian",
    email: "a.abdullahi@university.edu.ng",
    phone: "+234 809 345 6789",
    image: "/libraryStaff/pic3.jpg",
    department: "Reference Services",
  },
  {
    id: 5,
    name: "Emeka Nwankwo",
    position: "Systems Administrator",
    email: "e.nwankwo@university.edu.ng",
    phone: "+234 811 567 8901",
    image: "/libraryStaff/pic4.jpg",
    department: "IT Services",
  },
  {
    id: 6,
    name: "Kemi Adeyemi",
    position: "Acquisition Librarian",
    email: "k.adeyemi@university.edu.ng",
    phone: "+234 813 789 0123",
    image: "/libraryStaff/pic5.jpg",
    department: "Collection Development",
  },
  {
    id: 7,
    name: "Ibrahim Musa",
    position: "Circulation Supervisor",
    email: "i.musa@university.edu.ng",
    phone: "+234 815 012 3456",
    image: "/libraryStaff/pic6.jpg",
    department: "Circulation Services",
  },
  {
    id: 8,
    name: "Blessing Okoro",
    position: "Library Assistant",
    email: "b.okoro@university.edu.ng",
    phone: "+234 817 234 5678",
    image: "/libraryStaff/pic7.jpg",
    department: "General Services",
  },
  {
    id: 9,
    name: "Yusuf Garba",
    position: "Serials Librarian",
    email: "y.garba@university.edu.ng",
    phone: "+234 819 456 7890",
    image: "/libraryStaff/pic8.jpg",
    department: "Serials Department",
  },
  {
    id: 10,
    name: "Ngozi Eze",
    position: "Children's Librarian",
    email: "n.eze@university.edu.ng",
    phone: "+234 821 678 9012",
    image: "/placeholder.svg?height=300&width=300",
    department: "Special Collections",
  },
  {
    id: 11,
    name: "Tunde Bakare",
    position: "Preservation Officer",
    email: "t.bakare@university.edu.ng",
    phone: "+234 823 890 1234",
    image: "/placeholder.svg?height=300&width=300",
    department: "Preservation Services",
  },
  {
    id: 12,
    name: "Hauwa Aliyu",
    position: "Interlibrary Loan Coordinator",
    email: "h.aliyu@university.edu.ng",
    phone: "+234 825 012 3456",
    image: "/placeholder.svg?height=300&width=300",
    department: "Resource Sharing",
  },
  {
    id: 13,
    name: "Oluwaseun Adebisi",
    position: "Metadata Librarian",
    email: "o.adebisi@university.edu.ng",
    phone: "+234 827 234 5678",
    image: "/placeholder.svg?height=300&width=300",
    department: "Technical Services",
  },
  {
    id: 14,
    name: "Zainab Mohammed",
    position: "Subject Librarian - Sciences",
    email: "z.mohammed@university.edu.ng",
    phone: "+234 829 456 7890",
    image: "/placeholder.svg?height=300&width=300",
    department: "Subject Services",
  },
  {
    id: 15,
    name: "Godwin Okonkwo",
    position: "Library Security Officer",
    email: "g.okonkwo@university.edu.ng",
    phone: "+234 831 678 9012",
    image: "/placeholder.svg?height=300&width=300",
    department: "Security Services",
  },
  {
    id: 16,
    name: "Folake Adebayo",
    position: "Information Literacy Coordinator",
    email: "f.adebayo@university.edu.ng",
    phone: "+234 833 890 1234",
    image: "/placeholder.svg?height=300&width=300",
    department: "Instruction Services",
  },
  {
    id: 17,
    name: "Sani Yakubu",
    position: "Bindery Supervisor",
    email: "s.yakubu@university.edu.ng",
    phone: "+234 835 012 3456",
    image: "/placeholder.svg?height=300&width=300",
    department: "Preservation Services",
  },
  {
    id: 18,
    name: "Chioma Nwosu",
    position: "Electronic Resources Librarian",
    email: "c.nwosu@university.edu.ng",
    phone: "+234 837 234 5678",
    image: "/placeholder.svg?height=300&width=300",
    department: "Digital Services",
  },
  {
    id: 19,
    name: "Murtala Suleiman",
    position: "Archives Assistant",
    email: "m.suleiman@university.edu.ng",
    phone: "+234 839 456 7890",
    image: "/placeholder.svg?height=300&width=300",
    department: "Special Collections",
  },
  {
    id: 20,
    name: "Funmi Ogundimu",
    position: "Public Services Coordinator",
    email: "f.ogundimu@university.edu.ng",
    phone: "+234 841 678 9012",
    image: "/placeholder.svg?height=300&width=300",
    department: "Public Services",
  },
  {
    id: 21,
    name: "Aliyu Bello",
    position: "Library Technician",
    email: "a.bello@university.edu.ng",
    phone: "+234 843 890 1234",
    image: "/placeholder.svg?height=300&width=300",
    department: "Technical Services",
  },
  {
    id: 22,
    name: "Patience Okwu",
    position: "Periodicals Assistant",
    email: "p.okwu@university.edu.ng",
    phone: "+234 845 012 3456",
    image: "/placeholder.svg?height=300&width=300",
    department: "Serials Department",
  },
  {
    id: 23,
    name: "Kabir Lawal",
    position: "Facilities Coordinator",
    email: "k.lawal@university.edu.ng",
    phone: "+234 847 234 5678",
    image: "/placeholder.svg?height=300&width=300",
    department: "Facilities Management",
  },
  {
    id: 24,
    name: "Adunni Oladele",
    position: "Special Collections Librarian",
    email: "a.oladele@university.edu.ng",
    phone: "+234 849 456 7890",
    image: "/placeholder.svg?height=300&width=300",
    department: "Special Collections",
  },
  {
    id: 25,
    name: "Bashir Usman",
    position: "Library Assistant II",
    email: "b.usman@university.edu.ng",
    phone: "+234 851 678 9012",
    image: "/placeholder.svg?height=300&width=300",
    department: "General Services",
  },
  {
    id: 26,
    name: "Omolara Fashola",
    position: "Research Support Librarian",
    email: "o.fashola@university.edu.ng",
    phone: "+234 853 890 1234",
    image: "/placeholder.svg?height=300&width=300",
    department: "Research Services",
  },
  {
    id: 27,
    name: "Danjuma Aliyu",
    position: "Maintenance Officer",
    email: "d.aliyu@university.edu.ng",
    phone: "+234 855 012 3456",
    image: "/placeholder.svg?height=300&width=300",
    department: "Facilities Management",
  },
  {
    id: 28,
    name: "Ronke Adeyinka",
    position: "User Services Librarian",
    email: "r.adeyinka@university.edu.ng",
    phone: "+234 857 234 5678",
    image: "/placeholder.svg?height=300&width=300",
    department: "User Services",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function StaffPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleCardInteraction = (id: number) => {
    if (isMobile) {
      setHoveredCard(hoveredCard === id ? null : id) // toggle on click
    }
  }

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
      <div className="relative bg-gradient-to-br from-indigo-50 to-blue-50 via-indigo-50 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Library Staff
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl max-w-3xl mx-auto text-md"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Meet the dedicated professionals who make our library services exceptional
          </motion.p>
          <motion.div
            className="mt-8 flex justify-center space-x-8 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center space-x-2">
              <User className="h-6 w-6" />
              <span>{staffMembers.length} Staff Members</span>
            </div>
            <div className="flex items-center space-x-2">
              <Briefcase className="h-6 w-6" />
              <span>8 Departments</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {staffMembers.map((staff) => (
            <motion.div
              key={staff.id}
              className="relative group cursor-pointer"
              onHoverStart={!isMobile ? () => setHoveredCard(staff.id) : undefined}
              onHoverEnd={!isMobile ? () => setHoveredCard(null) : undefined}
              onClick={isMobile ? () => handleCardInteraction(staff.id) : undefined}
            >
              <Card className="relative h-80 overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border-0">
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
                    <div className="h-48 overflow-hidden">
                      <motion.img
                        src={staff.image}
                        alt={staff.name}
                        className="w-full h-full object-top object-cover"
                        whileHover={{ scale: 1.1 }}
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
                        {staff.name}
                      </motion.h3>
                      <motion.p
                        className="text-amber-200 font-medium"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {staff.position}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>

                {/* Back Side */}
                <motion.div
                  className="absolute inset-0 backface-hidden bg-gradient-to-br from-indigo-50 to-blue-50 via-indigo-50 text-black p-6 flex flex-col justify-center"
                  animate={{
                    rotateY: hoveredCard === staff.id ? 0 : -180,
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(-180deg)",
                  }}
                >
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-indigo-300">
                      <img
                        src={staff.image || "/placeholder.svg"}
                        alt={staff.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-indigo-600 mb-1">{staff.name}</h3>
                    <p className="text-indigo-500 font-medium mb-4">{staff.position}</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-center space-x-2 text-sm">
                        <Mail className="h-4 w-4 text-indigo-500" />
                        <span className="truncate">{staff.email}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm">
                        <Phone className="h-4 w-4 text-indigo-500" />
                        <span>{staff.phone}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm">
                        <Briefcase className="h-4 w-4 text-indigo-500" />
                        <span className="text-center">{staff.department}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Department Summary */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Departments</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our staff work across various specialized departments to provide comprehensive library services
            </p>
          </motion.div>
        </div>
      </div>

      {/* Footer and ScrollToTop */}
      <Footer />
      <ScrollToTop />
    </div>
  )
}
