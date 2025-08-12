"use client"

import { useParams } from "next/navigation"
import { motion, useScroll, useSpring } from "framer-motion"
import { ArrowLeft, MapPin, BookOpen, Users, Clock, Database, Globe, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Detailed library data
const libraryData = {
  social: {
    name: "Faculty of the Social Science Library",
    faculty: "Social Science",
    image: "/Libraries/Social-science/social.jpg",
    description:
      "The faculty of the social science Library was established in the year 1972. It caters for the reading, teaching and research interest of students, faculty members and researchers generally. It houses four departments, namely, Department of Geography, Political science, Psychology  and Sociology. It occupied a floor space of 256,412 square meters. The library is a conducive environment for reading as well as carrying out research activities  due to its ambiences and comfortable sitting arrangement.",
    location: "Arts Building, Ground Floor, University of Ibadan",
    coordinates: "7.3775° N, 3.9470° E",
    books: "8,918",
    journals: "850",
    articles: "850",
    seatingCapacity: 112,
    studyRooms: 8,
    computerStations: 25,
    openingHours: "Monday - Friday: 8:00 AM - 4:00 PM",
    contact: {
      phone: "+234 8054 063 921",
      email: "olalekanadekunjo@gmail.com",
      librarian: "Dr. Adebayo Ogundimu",
      librarianImage: "/facultylibrarians/Social-science/social.jpeg",
    },
    services: [
      "E- Library services",
      "Consultation of books and other resources",
      "Reference services",
      "Referral services",
    ],
    facilities: [
      "Computers",
      "Air conditioners",
      "Printer",
      "Fan Steel shelves",
      "Wooden tables and chairs",
    ],
    departments: [
      "Geography",
      "Political science",
      "Psychology",
      "Sociilogy",
    ],
  },


  multidisciplinary: {
    name: "Wilson Olabode Aiyepeku Library",
    faculty: "Multidisciplinary Studies",
    image: "/libraries/Multidisciplinary/mult.jpg",
    description:
      "The department of Data and information Science (DDIS) Library was formerly an African Regional Center for Information Science (ARCIS) Library is now known as Wilson Olabode Aiyepeku (WOA) Library. It is located at the ground floor of the DDIS building. Library Resources: Currently Acquires and disseminates information resources relevant to the courses undertaking in the department.",
    location: "Ground floor of the DDIS building",
    coordinates: "7.3780° N, 3.9465° E",
    books: "926",
    journals: "57",
    articles: "NA",
    seatingCapacity: 20,
    studyRooms: 6,
    computerStations: 30,
    openingHours: "Monday - Friday: 8:00 AM - 4:00 PM",
    contact: {
      phone: "+234 8038 604 108",
      email: " ddiswoalibrarian@gmail.com",
      librarian: "Dr. Folake Adeyemi",
      librarianImage: "/facultylibrarians/Multidisciplinary/multi.jpg",
    },
    services: [
      "Library & Information services",
      "Research consultations ",
    ],
    facilities: [
      "Normal",
    ],
    departments: [
      "All the departments in the Faculty of Multidisciplinary Studies",
    ],
  },


  medicine: {
    name: "Faculty of Medicine Library",
    faculty: "Medicine",
    image: "/placeholder.svg?height=500&width=800&text=Medicine+Library+Interior",
    description:
      "The Faculty of Medicine Library is a specialized medical library providing comprehensive resources for medical education, clinical practice, and biomedical research. It operates 24/7 to support the demanding schedules of medical students and healthcare professionals.",
    location: "College of Medicine Building, University of Ibadan",
    coordinates: "7.3785° N, 3.9460° E",
    books: "32,180",
    journals: "324",
    articles: "18,500+",
    seatingCapacity: 100,
    studyRooms: 10,
    computerStations: 20,
    openingHours: "24/7 Access Available",
    contact: {
      phone: "+234 (0) 2 810 1152",
      email: "medlibrary@ui.edu.ng",
      librarian: "Dr. Grace A. Ajuwon",
      librarianImage: "/placeholder.svg?height=200&width=200&text=Dr.+Grace+A.+Ajuwon",
    },
    services: [
      "Clinical Literature Search",
      "Evidence-Based Medicine Support",
      "Medical Database Training",
      "Systematic Review Assistance",
      "Clinical Decision Support",
      "Medical Writing Support",
      "Research Ethics Information",
      "Continuing Medical Education Resources",
    ],
    facilities: [
      "24/7 Study Areas",
      "Medical Simulation Lab",
      "Anatomy Study Room",
      "Clinical Skills Practice Area",
      "Medical Imaging Workstations",
      "Telemedicine Equipment",
      "Medical Software Access",
      "Quiet Zones for Exam Preparation",
    ],
    departments: [
      "Medicine",
      "Surgery",
      "Pediatrics",
      "Obstetrics and Gynecology",
      "Psychiatry",
      "Radiology",
      "Pathology",
      "Anesthesia",
    ],
  },


  veterinanry: {
    name: "Faculty Library of Veterinanry Medicine",
    faculty: "Veterinanry Medicine",
    image: "/libraries/Veterinanry/vet.jpg",
    description:
      "The Faculty Library of Veterinary Medicine is established to bring library and information services closer to the students and faculty members. Like other faculty libraries at the University of Ibadan, it houses a selective yet balanced collection of academic materials designed to support curricular offerings and foster an appreciation of the role of subject disciplines in students socio-cultural and intellectual development. This collection also aims to prepare students to apply knowledge productively in their future careers, in line with the faculty mission, goals, and objectives. Resources include veterinary textbooks, dictionaries, encyclopedias, biographies, journals, and other periodicals in various formats, both print and electronic. Beyond the scope and content of the collection, other factors such as usability and currency also determine material acquisition priorities.",
    location: "Faculty of Veterinary Medicine Building, University of Ibadan",
    coordinates: "7.3770° N, 3.9475° E",
    books: "620",
    journals: "20",
    articles: "200+",
    seatingCapacity: 85,
    studyRooms: 5,
    computerStations: 15,
    openingHours: "Monday - Friday: 8:00 AM - 8:00 PM",
    contact: {
      phone: "+234 '8020 637 589",
      email: "osagiezion@gmail.com",
      librarian: "Dr. Osagie Oseghale",
      librarianImage: "/facultylibrarians/Veterinanry/vet.jpg",
    },
    services: [
      "Provision of reading spaces",
      "Organisation of information materials",
      "Guidance in the use of electronic materials",
      "Literature search",
      "Information literacy",
      "Students and staff clearance",
    ],
    facilities: [
      "Inverter (3.5 KVA)  supported by four solar batteries and eight solar panels.",
      "Two laserjet printers",
      "Sharp photocopy machine",
      "Four ceiling fans",
      "One window air conditioner",
      "Four split air conditioners",
      "Eleven carrel-style tables",
      "Sixty six steel chairs",
      "Three laptops computer",
      "One Samsung fridge",
    ],
    departments: ["Veterinary Medicine", "Veterinary Anatomy", "Veterinary Microbiology and Virology", "Veterinary Physiology and Biochemistry", "Veterinary Pharmacology and Toxicology", "Veterinary Pathology", "Veterinary Public Health and Preventive Medicine", "Veterinary Surgery and Production", "Veterinary Theriogenology", "Veterinary of Parasitology and Entomology"],
  },

    art: {
    name: "Faculty of Arts Library ",
    faculty: "Art",
    image: "/libraries/Art/art.jpeg",
    description:
      "Faculty of Arts Library is a 2009 ETF Special Intervention project meant to centralise and harmonise the resources in the various departmental libraries in a centralized location. On completion and handling over of the structure, the Faculty of Arts Management allocated the facility to the newest department - Department of Music for temporary use. Faculty of Arts Library stands as a gate-way between users and information resources. In the year 2023, the University library management took over the structure as music department were relocated elsewhere. Abomoge Solomon Oluwatise (a pioneer librarian) was posted to the faculty of Arts Library on the 23rd of July, 2023 towards the tail ends tenure of professor Oyesiji (the then Dean of Faculty of Arts). Faculty of Arts Library play a vital role in the University system since its establishment, users has been using the library continuously. Efforts are still on-going to organize the facility to facilitate effective usage.",
    location: "At the entrance of Faculty of Arts ",
    coordinates: "7.3785° N, 3.9460° E",
    books: "499",
    journals: "35",
    articles: "525",
    seatingCapacity: 60,
    studyRooms: 10,
    computerStations: 20,
    openingHours: " Monday-Friday 8:00am - 4:00pm",
    contact: {
      phone: "+234 7012 007 197",
      email: "oluwatisesolomon@gmail.com",
      librarian: "Mr S. O. Abomoge ",
      librarianImage: "/facultylibrarians/Art/art.jpeg",
    },
    services: [
      "Dissemination of information",
      "Answers to users queries",
      "Reference services",
    ],
    facilities: [
      "Chairs",
      "Tables",
      "Shelves",
      "Fans and malfunctioning internet facilities",
    ],
    departments: [
      "English and literary studies",
      "History",
      "Communication and Language Arts",
      "Classics",
      "Linguistic and African Studies",
      "Philosophy",
      "Religious Studies",
      "Arabic and Islamic Studies",
      "Theatre Arts",
      "European Studies",
      "Archaeology and Anthropology",
      "Music",
    ],
  },

   law: {
    name: "Adéọlá Odùtọ́lá Law Library",
    faculty: "Law",
    image: "/Libraries/Law/law.jpg",
    description:
      "Adéọlá Odùtọ́lá Law Library is the knowledge hub of the Faculty of Law, University of Ibadan. It was established to provide adequate information Services in support of teaching, learning and research in the Faculty of Law. The Library which is a branch of the Kenneth Dike Library was moved from the main library to it's present location in 1994 to ensure prompt, effective and efficient library and information are made available to students, lecturers, researchers and external users. The movement of the library was very much facilitated by late Chief Adéọlá Odùtọ́lá , the philanthropist who donated the physical structure of the library. Hence it was named after him.",
    location: "Niger Road, along Vice Chancellor's Lodge, University of Ibadan. ",
    coordinates: "7.3785° N, 3.9460° E",
    books: "8,923",
    journals: "4,688",
    articles: "17,511",
    seatingCapacity: 153,
    studyRooms: 10,
    computerStations: 20,
    openingHours: " Monday-Friday 8:00am - 4:00pm",
    contact: {
      phone: "+234 8033 825 558",
      email: "susanyinka@yahoo.com",
      librarian: "Tomomowo-Ayodele, Susanah Oluyinka ",
      librarianImage: "/facultylibrarians/Law/law.jpg",
    },
    services: [
      "Circulation Services",
      "Reference Services information",
      "Database Access such as providing access to online databases",
      "Computer and Internet Access",
      "Wi-Fi",
    ],
    facilities: [
      "Circulation desk",
      "Reading rooms",
      "Private Study area",
      "electronic resources section",
      "Furniture such as study tables, chairs, book shelves, trolley.",
      "Ceiling and standing fan",
      "Air conditioner",
      "Fridge",
      "Computers and Printer",
      "Photocopier",
    ],
    departments: [
      "Commercial and Industrial Law",
      "Jurisprudence and International Law",
      "Private and Property Law",
      "Public Law",
    ],
  },

  agriculture: {
    name: "Faculty of Agriculture and Renewable Natural Resources Library",
    faculty: "Agriculture",
    image: "/Libraries/Agriculture/agric.jpg",
    description:
      "The Faculty of Agriculture library is a modern, well-equipped facility offering students and researchers a conducive study environment. Key features include: Internet access for seamless research and academic pursuits 24-hour electricity supply, ensuring uninterrupted study sessions. A comfortable seating capacity of 68 users, providing ample space for focused learning and collaboration. This library serves as a vital resource hub for the Faculty of Agriculture, supporting academic excellence and innovative research in agriculture and related fields.",
    location: "Faculty of Agriculturen. ",
    coordinates: "7.3785° N, 3.9460° E",
    books: "8,748",
    journals: "856",
    articles: "856",
    seatingCapacity: 68,
    studyRooms: 10,
    computerStations: 20,
    openingHours: " Monday-Friday 8:00am - 4:00pm",
    contact: {
      phone: "+234 8033 981 513",
      email: "kutujacob82@gmail.com",
      librarian: "Dr J. O. Kutu ",
      librarianImage: "/facultylibrarians/Agricultre/agric.jpg",
    },
    services: [
      "Internet access",
      "Reference assistance",
      "Document delivery",
      "Borrowing services",
      "Research support",
      "Study spaces",
    ],
    facilities: [
      "Solar Equipment",
      "Air conditioners",
      "Ceiling fan",
      "Standing fan",
      "Furniture such as study tables, chairs, book shelves, cloakroom shelf.",
    ],
    departments: [
      "Commercial and Industrial Law",
      "Jurisprudence and International Law",
      "Private and Property Law",
      "Public Law",
    ],
  },
}

export default function LibraryDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const library = libraryData[slug as keyof typeof libraryData]

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  if (!library) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Library Not Found</h1>
          <Link href="/libraries">
            <Button>Back to Libraries</Button>
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
          <Link href="/libraries">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Libraries</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
          <div className="text-xs sm:text-sm text-gray-500 italic">Library Details</div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl">
        {/* Hero Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative h-64 sm:h-80 lg:h-96">
            <img src={library.image || "/placeholder.svg"} alt={library.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <motion.h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {library.name}
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg lg:text-xl opacity-90 flex items-center gap-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <MapPin className="h-5 w-5" />
                {library.location}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg text-center">
            <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 text-amber-600 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{library.books}</div>
            <div className="text-xs sm:text-sm text-gray-600">Books</div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg text-center">
            <Database className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{library.journals}</div>
            <div className="text-xs sm:text-sm text-gray-600">Journals</div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg text-center">
            <Users className="h-8 w-8 sm:h-10 sm:w-10 text-indigo-600 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{library.seatingCapacity}</div>
            <div className="text-xs sm:text-sm text-gray-600">Seats</div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg text-center">
            <Globe className="h-8 w-8 sm:h-10 sm:w-10 text-amber-600 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{library.articles}</div>
            <div className="text-xs sm:text-sm text-gray-600">Articles</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <motion.section
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Library</h2>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">{library.description}</p>
            </motion.section>

            {/* Services */}
            <motion.section
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {library.services.map((service, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.05 }}
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{service}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Facilities */}
            <motion.section
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Facilities & Equipment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {library.facilities.map((facility, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1 + index * 0.05 }}
                  >
                    <div className="w-2 h-2 bg-indigo-600 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{facility}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Head Librarian */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Head Librarian</h3>
              <div className="text-center">
                <img
                  src={library.contact.librarianImage || "/placeholder.svg"}
                  alt={library.contact.librarian}
                  className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-4 border-amber-200"
                />
                <h4 className="font-semibold text-gray-900 mb-1">{library.contact.librarian}</h4>
                <p className="text-sm text-gray-600">Head Librarian</p>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900">{library.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href={`mailto:${library.contact.email}`} className="text-blue-600 hover:underline">
                      {library.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Opening Hours */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-600" />
                Opening Hours
              </h3>
              <p className="text-gray-700 leading-relaxed">{library.openingHours}</p>
            </motion.div>

            {/* Departments Served */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Departments Served</h3>
              <div className="space-y-2">
                {library.departments.map((dept, index) => (
                  <motion.div
                    key={index}
                    className="px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-700"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 + index * 0.05 }}
                  >
                    {dept}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
