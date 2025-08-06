"use client"

import { useParams } from "next/navigation"
import { motion, useScroll, useSpring } from "framer-motion"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Users,
  Globe,
  Twitter,
  Linkedin,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type SocialLinks = {
  email: string
  linkedin?: string
  twitter?: string
  orcid?: string
}

type LibrarianData = {
  name: string
  title: string
  section: string
  period: string
  image: string
  email: string
  phone: string
  office: string
  education: string[]
  experience: string[]
  achievements: string[]
  research: string[]
  publications: string[]
  socials: SocialLinks
  bio: string
}

const librariansData: Record<string, LibrarianData> = {
 "dr-mercy-ariomerebi-iroaganachi": {
    name: "DR. MERCY ARIOMEREBI IROAGANACHI",
    title: "University Librarian",
    section: "Administration",
    period: "2022-Present",
    image: "/librarians/Liba.jpg",
    email: "mercy.iroaganachi@ui.edu.ng",
    phone: "+234 (0) 2 810 1100",
    office: "University Librarian's Office, Kenneth Dike Library",
    education: [
      "Ph.D. in Library and Information Science, University of Ibadan (2018)",
      "M.L.I.S., University of Ibadan (2008)",
      "B.A. English Language, University of Benin (2003)",
      "Postgraduate Diploma in Education, University of Benin (2004)",
    ],
    experience: [
      "University Librarian, University of Ibadan (2022-Present)",
      "Deputy University Librarian, University of Ibadan (2019-2022)",
      "Principal Librarian, University of Ibadan (2015-2019)",
      "Senior Librarian, University of Ibadan (2010-2015)",
    ],
    achievements: [
      "Led the digital transformation initiative of Kenneth Dike Library",
      "Implemented modern library management systems across all faculty libraries",
      "Established partnerships with international library consortiums",
      "Increased electronic resource access by 300% during tenure",
      "Pioneered the Library Innovation Hub for student entrepreneurs",
    ],
    research: [
      "Digital Library Services in Nigerian Universities",
      "Information Literacy in the Digital Age",
      "Library Leadership and Management in Africa",
      "Open Access Publishing in Developing Countries",
    ],
    publications: [
      "Iroaganachi, M.A. (2023). 'Digital Transformation in Academic Libraries: The Nigerian Experience.' Journal of Academic Librarianship, 49(2), 102-115.",
      "Iroaganachi, M.A. & Oyelude, A.A. (2022). 'Information Literacy Skills Among Undergraduate Students in Nigeria.' Library Review, 71(4), 234-248.",
      "Iroaganachi, M.A. (2021). 'Leadership Challenges in Modern Academic Libraries.' International Journal of Library Science, 15(3), 45-58.",
    ],
    socials: {
      email: "mercy.iroaganachi@ui.edu.ng",
      linkedin: "https://linkedin.com/in/mercy-iroaganachi",
      twitter: "https://twitter.com/mercyiroaganachi",
      orcid: "https://orcid.org/0000-0002-1234-5678",
    },
    bio: "Dr. Mercy Ariomerebi Iroaganachi is a distinguished library professional with over two decades of experience in academic librarianship. As the current University Librarian of the University of Ibadan, she has been instrumental in modernizing library services and leading digital transformation initiatives across the institution. Her leadership has resulted in significant improvements in electronic resource access, user services, and library infrastructure. Dr. Iroaganachi is passionate about information literacy, digital libraries, and capacity building for library professionals in Africa.",
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
    education: [
      "Ph.D. in Library and Information Science, University of Ibadan (2012)",
      "M.L.S., University of Ibadan (1995)",
      "B.A. History, University of Ibadan (1988)",
      "Certificate in Information Management, University of London (2000)",
    ],
    experience: [
      "University Librarian, University of Ibadan (2016-2022)",
      "Deputy University Librarian, University of Ibadan (2012-2016)",
      "Principal Librarian, University of Ibadan (2008-2012)",
      "Senior Librarian, University of Ibadan (2000-2008)",
    ],
    achievements: [
      "Expanded electronic database subscriptions to over 10 million volumes",
      "Established the University of Ibadan Institutional Repository (UIIR)",
      "Led the library through successful NUC accreditation processes",
      "Implemented 24/7 library services for students",
      "Developed strategic partnerships with international libraries",
    ],
    research: [
      "Academic Library Management",
      "Information Resources Development",
      "Library Automation Systems",
      "Scholarly Communication",
    ],
    publications: [
      "Komolafe-Opadeji, H.O. (2021). 'Building Digital Collections in Nigerian Universities.' African Journal of Library Science, 28(1), 15-28.",
      "Komolafe-Opadeji, H.O. (2020). 'The Role of Academic Libraries in Research Excellence.' Library Management, 41(6), 401-415.",
      "Komolafe-Opadeji, H.O. (2019). 'Institutional Repositories: A Tool for Scholarly Communication.' Journal of Librarianship, 45(3), 178-192.",
    ],
    socials: {
      email: "helen.komolafe@ui.edu.ng",
      linkedin: "https://linkedin.com/in/helen-komolafe-opadeji",
      orcid: "https://orcid.org/0000-0003-2345-6789",
    },
    bio: "Dr. Helen O. Komolafe-Opadeji served as University Librarian from 2016 to 2022, during which she transformed the Kenneth Dike Library into a modern, digitally-enabled learning environment. Her tenure was marked by significant expansion of electronic resources, implementation of cutting-edge library technologies, and establishment of the institutional repository. She is recognized as a pioneer in digital library services in Nigeria and continues to contribute to library development through research and consultancy.",
  },
  // Add more librarians with similar detailed structure...
  "mr-c-o-ola": {
    name: "MR. C. O. OLA",
    title: "Deputy University Librarian",
    section: "Administration",
    period: "2022-Present",
    image: "/librarians/DPT1.png",
    email: "c.ola@ui.edu.ng",
    phone: "+234 (0) 2 810 1102",
    office: "Deputy Librarian's Office, Kenneth Dike Library",
    education: [
      "M.L.I.S., University of Ibadan (2005)",
      "B.A. English Language, University of Lagos (1998)",
      "Postgraduate Diploma in Library Science, University of Ibadan (2002)",
    ],
    experience: [
      "Deputy University Librarian, University of Ibadan (2022-Present)",
      "Principal Librarian, University of Ibadan (2018-2022)",
      "Senior Librarian, University of Ibadan (2012-2018)",
      "Librarian II, University of Ibadan (2006-2012)",
    ],
    achievements: [
      "Streamlined library administrative processes",
      "Implemented staff development programs",
      "Coordinated inter-library cooperation initiatives",
      "Enhanced user service delivery systems",
    ],
    research: [
      "Library Administration and Management",
      "Staff Development in Academic Libraries",
      "User Services Optimization",
    ],
    publications: [
      "Ola, C.O. (2022). 'Effective Library Administration in Nigerian Universities.' Library Administration Quarterly, 18(2), 45-58.",
      "Ola, C.O. (2021). 'Staff Development Strategies for Academic Libraries.' Professional Librarian, 12(4), 23-35.",
    ],
    socials: {
      email: "c.ola@ui.edu.ng",
      linkedin: "https://linkedin.com/in/c-ola",
    },
    bio: "Mr. C. O. Ola is an experienced library administrator who currently serves as Deputy University Librarian at the University of Ibadan. With over two decades of experience in academic librarianship, he has been instrumental in improving administrative efficiency and staff development within the library system. His expertise in library management and user services has contributed significantly to the overall effectiveness of library operations.",
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
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-orange-600 origin-left z-50"
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

      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-4xl">
        {/* Hero Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative h-48 sm:h-64 bg-gradient-to-r from-green-600 to-orange-600">
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
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Profile Image */}
              <motion.div
                className="flex-shrink-0 mx-auto lg:mx-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <img
                  src={librarian.image || "/placeholder.svg"}
                  alt={librarian.name}
                  className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full object-cover border-4 border-green-100 shadow-lg"
                />
              </motion.div>

              {/* Contact Info */}
              <div className="flex-1 space-y-4">
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a href={`mailto:${librarian.email}`} className="text-blue-600 hover:underline">
                        {librarian.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900">{librarian.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">Office</p>
                      <p className="text-gray-900">{librarian.office}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">Tenure</p>
                      <p className="text-gray-900">{librarian.period}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  className="flex gap-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  {librarian.socials.linkedin && (
                    <a
                      href={librarian.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {librarian.socials.twitter && (
                    <a
                      href={librarian.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {librarian.socials.orcid && (
                    <a
                      href={librarian.socials.orcid}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Biography */}
        <motion.section
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Users className="h-6 w-6 text-green-600" />
            Biography
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">{librarian.bio}</p>
        </motion.section>

        {/* Education */}
        <motion.section
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-green-600" />
            Education
          </h2>
          <ul className="space-y-3">
            {librarian.education.map((edu, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <Award className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{edu}</span>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* Experience */}
        <motion.section
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Calendar className="h-6 w-6 text-green-600" />
            Professional Experience
          </h2>
          <div className="space-y-4">
            {librarian.experience.map((exp, index) => (
              <motion.div
                key={index}
                className="border-l-4 border-green-600 pl-4 py-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <p className="text-gray-900 font-medium">{exp}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Achievements */}
        <motion.section
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Award className="h-6 w-6 text-green-600" />
            Key Achievements
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {librarian.achievements.map((achievement, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-3 p-4 bg-green-50 rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              >
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{achievement}</span>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* Research Interests */}
        <motion.section
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Globe className="h-6 w-6 text-green-600" />
            Research Interests
          </h2>
          <div className="flex flex-wrap gap-3">
            {librarian.research.map((interest, index) => (
              <motion.span
                key={index}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* Publications */}
        <motion.section
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-green-600" />
            Selected Publications
          </h2>
          <div className="space-y-4">
            {librarian.publications.map((publication, index) => (
              <motion.div
                key={index}
                className="p-4 bg-gray-50 rounded-lg border-l-4 border-orange-600"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              >
                <p className="text-gray-700 italic">{publication}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </article>
    </div>
  )
}
