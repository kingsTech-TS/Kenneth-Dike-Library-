"use client"

import { useRef } from "react"
import { motion, useScroll, useSpring, useInView } from "framer-motion"
import { ArrowLeft, Calendar, User, Award, BookOpen, Clock, ChevronUp, Database, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from "@/components/header"
import Moving from "@/components/moving"
import ScrollToTop from "@/components/scroll-to-top"

const librarians = [
  {
    name: "DR. MERCY ARIOMEREBI IROAGANACHI",
    title: "University Librarian",
    section: "",
    image: "/librarians/Liba.jpg",
  },
   {
    name: "DR. HELEN O. KOMOLAFE-OPADEJI",
    title: "Former University Librarian",
    section: "",
    image: "/librarians/DPT9.PNG",
  },
  {
    name: "MR. C. O. OLA",
    title: "Deputy University Librarian",
    section: "",
    image: "/librarians/DPT1.png",
  },
  {
    name: "DR. BEATRICE A. FABUNMI",
    title: "Deputy University Librarian",
    section: "Readers Section",
    image: "/librarians/DPT6.png",
  },
  {
    name: "DR. ADETOUN A. OYELUDE",
    title: "Deputy University Librarian",
    section: "Technical Services",
    image: "/librarians/DPT7.png",
  },
  {
    name: "DR. REUBEN A. OJO",
    title: "Deputy mUniversity Librarian",
    section: "ICT & Systems",
    image: "/librarians/DPT8.png",
  },
  {
    name: "MRS. BOLARINWA M. ADEYEMI",
    title: "Deputy University Librarian",
    section: "Special Collections",
    image: "/librarians/DPT4.png",
  },
  {
    name: "DR. GRACE A. AJUWON",
    title: "Deputy University Librarian",
    section: "Medical Library",
    image: "/librarians/DPT5.PNG",
  },
];

const milestones = [
  { year: "1948", event: "Kenneth Dike Library established with University of Ibadan", icon: BookOpen },
  { year: "1948", event: "24 staff members including University Librarian and Chief Cataloguer", icon: User },
  { year: "1970s", event: "Considerable numerical growth in staff strength", icon: Award },
  { year: "1980s", event: "Continued expansion and collection development", icon: Calendar },
  { year: "1990s", event: "Early automation and modernization efforts", icon: Database },
  { year: "2000s", event: "Introduction of electronic databases and digital resources", icon: Globe },
  { year: "2014", event: "Launch of University of Ibadan Institutional Repository (UIIR)", icon: Award },
  { year: "Present", event: "Over 2 million printed volumes and 10+ million electronic resources", icon: BookOpen },
]

const eras = [
  {
    title: "The Foundation Era",
    period: "1948-1968",
    description:
      "The Kenneth Dike Library was established in 1948 alongside the University of Ibadan itself, making the library as old as the university. The Pioneer Librarian, John Harris, a New Zealander, responded to Professor Kenneth Mellanby's vision: 'Whatever else we do I am determined that we have at least a good library'. Harris described the situation he found on arrival as 'a librarian's nightmare and a scene of book chaos'. Starting with 24 staff members including the University Librarian, Chief Cataloguer, six library assistants, four messengers, one porter, and five student assistants, Harris transformed the chaotic situation into a functional academic library that would serve as the foundation for decades of growth.",
    image: "img1.jpg",
    quote: "Whatever else we do I am determined that we have at least a good library.",
    quoteAuthor: "Professor Kenneth Mellanby, First Principal of University College, Ibadan",
    stats: [
      { value: "1948", label: "Year Established" },
      { value: "24", label: "Initial Staff" },
      { value: "20", label: "Years of Leadership" },
    ],
  },
  {
    title: "The Growth Era",
    period: "1968-1987",
    description:
      "Under the successive leadership of Mr. Khalil Mahmud and Mrs. T.O. Oderinde, the library experienced its most significant period of expansion. The 1970s and 1980s witnessed considerable numerical growth in staff strength and collection development. This era established the library as a central and conspicuous entity on the University of Ibadan campus, following the global pattern of academic libraries occupying crucial positions in university systems. The library's collections grew substantially during this period, laying the groundwork for what would eventually become over two million volumes of printed materials including books, journals, dissertations, technical reports, and monographs.",
    image: "img2.jpg",
    quote:
      "Libraries are crucial and important entities in University systems because they occupy central and conspicuous locations on campuses.",
    quoteAuthor: "Kenneth Dike Library Historical Records",
    stats: [
      { value: "19", label: "Years of Expansion" },
      { value: "2", label: "Dynamic Leaders" },
      { value: "1000s", label: "Books Added" },
    ],
  },
  {
    title: "The Modernisation Era",
    period: "1988-2003",
    description:
      "The leadership of Mrs. Grace Olufunmilayo Tamuno and Mr. J.E. Ikem marked the beginning of the library's modernization journey. This period saw the early stages of automation and the introduction of modern library management practices. The library began to adapt to changing technological landscapes while maintaining its core mission of supporting teaching, learning, and research mandates of the University. Economic challenges led to some reduction in staff strength due to adherence to National University Commission (NUC) norms, but the library's commitment to excellence remained unwavering. This era set the stage for the digital transformation that would follow.",
    image: "img3.jpg",
    quote:
      "The library provides information resources aimed at supporting and enhancing teaching, learning, and research mandates.",
    quoteAuthor: "Kenneth Dike Library Mission Statement",
    stats: [
      { value: "15", label: "Years of Progress" },
      { value: "2", label: "Visionary Leaders" },
      { value: "100%", label: "Commitment to TLR" },
    ],
  },
  {
    title: "The Digital Revolution",
    period: "2004-Present",
    description:
      "The modern era of Kenneth Dike Library has been characterized by unprecedented digital transformation. Under the leadership of Dr. B.A. Oladele, Dr. Helen Komolafe-Opadeji, and current University Librarian DR. Mercy Ariomerebi Iroaganachi, the library has embraced the global shift from printed to electronic formats. The library now provides access to over 10 million electronic volumes through databases like JSTOR, RESEARCH4LIFE, and PROQUEST/Ebrary. The implementation of the University of Ibadan Integrated Library Software (UI-ILS) has enabled web-based access and inter-operability. The launch of the University of Ibadan Institutional Repository (UIIR) in 2014 has provided wider visibility to the university's intellectual outputs, raising its profile in global web metric rankings.",
    image: "img4.jpg",
    quote:
      "Digitisation serves two major purposes: Preservation for posterity and delivery of virtual library services.",
    quoteAuthor: "Kenneth Dike Library Digital Initiative",
    stats: [
      { value: "10M+", label: "Electronic Volumes" },
      { value: "2M+", label: "Printed Materials" },
      { value: "24/7", label: "Digital Access" },
    ],
  },
]

export default function HistoryPage() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-serif">
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
      <Header />
      </motion.header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight leading-tight">
            The <span className="text-green-600">Chronicle</span> of Kenneth Dike Library
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light italic px-4">
            Seven and a half decades of academic excellence at the University of Ibadan
          </p>
        </motion.div>

        {/* Newspaper-style Masthead */}
        <div className="border-y-2 sm:border-y-4 border-gray-900 py-3 sm:py-4 mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-center text-center gap-2 sm:gap-0">
            <div className="text-xs sm:text-sm uppercase tracking-widest">Vol. 76, No. 1</div>
            <div className="text-xs sm:text-sm uppercase tracking-widest">Est. 1948</div>
            <div className="text-xs sm:text-sm uppercase tracking-widest hidden sm:block">
              University of Ibadan Historical Society
            </div>
            <div className="text-xs sm:text-sm uppercase tracking-widest sm:hidden">UI Historical Society</div>
          </div>
        </div>

        {/* Lead Story */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="lg:col-span-2 order-2 lg:order-1">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 leading-tight">
              From "Librarian's Nightmare" to Digital Excellence: The Remarkable Journey of Kenneth Dike Library
            </h2>
            <div className="text-sm sm:text-base lg:text-lg leading-relaxed space-y-3 sm:space-y-4">
              <p className="first-letter:text-3xl sm:first-letter:text-4xl lg:first-letter:text-5xl first-letter:font-bold first-letter:text-green-600 first-letter:mr-1 sm:first-letter:mr-2 first-letter:float-left">
                When John Harris, a New Zealander, arrived at the University of Ibadan in 1948 to serve as the Pioneer
                Librarian, he described what he found as "a librarian's nightmare and a scene of book chaos."
              </p>
              <p>
                Yet from this chaotic beginning, the Kenneth Dike Library has grown into one of Africa's premier
                academic libraries, with over 2 million printed volumes and more than 10 million digital resources.
              </p>
              <p>
                The story of Kenneth Dike Library is one of transformation, resilience, and commitment to the academic
                mission of the University of Ibadan.
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <motion.div
              className="relative h-48 sm:h-64 lg:h-full min-h-[300px]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img
                src="img2.jpg"
                alt="Kenneth Dike Library Building 1948"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 sm:p-3 text-xs sm:text-sm rounded-b-lg">
                The Kenneth Dike Library as it appeared in its early years at University of Ibadan
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Era Articles */}
        {eras.map((era, index) => (
          <EraArticle key={index} era={era} index={index} />
        ))}

        {/* Timeline Section */}
        <motion.section
          className="mb-16 sm:mb-20 py-12 sm:py-16 bg-gray-100 rounded-xl sm:rounded-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
              Key Milestones
            </h2>

            <div className="max-w-4xl mx-auto">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={`${milestone.year}-${index}`}
                  className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8 last:mb-0 gap-3 sm:gap-4"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Year Label */}
                  <div className="w-full sm:w-20 lg:w-24 text-left sm:text-right sm:mr-4 lg:mr-6">
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">{milestone.year}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-full flex items-center justify-center sm:mr-4 lg:mr-6 flex-shrink-0">
                    <milestone.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>

                  {/* Description Box */}
                  <div className="flex-1 bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 shadow-md">
                    <p className="text-gray-800 font-medium text-sm sm:text-base">{milestone.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Librarians Gallery with Auto-Scroll */}
        <motion.section
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
         <Moving />
        </motion.section>

        {/* Current Services Section */}
        <motion.section
          className="mb-16 sm:mb-20 py-12 sm:py-16 bg-gradient-to-br from-green-50 to-orange-50 rounded-xl sm:rounded-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
              Modern Services & Collections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              <motion.div
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link href="/e-resources" className="block">
                  <Database className="h-10 w-10 sm:h-12 sm:w-12 text-green-600 mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Electronic Databases</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Access to JSTOR, RESEARCH4LIFE, PROQUEST/Ebrary and over 10 million electronic volumes
                  </p>
                </Link>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <a href="http://41.184.122.87:8080/" target="_blank" rel="noopener noreferrer" className="block">
                  <Globe className="h-10 w-10 sm:h-12 sm:w-12 text-orange-600 mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">UI-ILS System</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    University of Ibadan Integrated Library Software with web interface and OPAC access
                  </p>
                </a>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 md:col-span-2 lg:col-span-1"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <a href="https://repository.ui.edu.ng/home" target="_blank" rel="noopener noreferrer" className="block">
                  <Award className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Institutional Repository</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    UIIR launched in 2014 to showcase University of Ibadan's intellectual outputs globally
                  </p>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Final Quote */}
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16 sm:mb-20 py-12 sm:py-16 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-4xl sm:text-5xl lg:text-6xl text-green-600 mb-4 sm:mb-6">"</div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl italic text-gray-700 mb-4 sm:mb-6 leading-relaxed">
            The Kenneth Dike Library stands as a testament to our enduring commitment to providing timely, current and
            accurate information in support of the teaching, learning, and research mandate of the University of Ibadan.
          </p>
          <p className="text-sm sm:text-base font-semibold text-gray-900">— Kenneth Dike Library Legacy Statement</p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 py-6 sm:py-8 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 text-xs sm:text-sm">
            © {new Date().getFullYear()} Kenneth Dike Library Historical Archives. University of Ibadan. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

function EraArticle({ era, index }: { era: any; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <motion.article
      ref={ref}
      className={`mb-16 sm:mb-20 lg:mb-24 pb-8 sm:pb-12 border-b border-gray-200 ${
        index % 2 === 0 ? "" : "lg:flex-row-reverse"
      }`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
        <div className={`space-y-4 sm:space-y-6 ${index % 2 === 1 ? "lg:pl-8 xl:pl-12" : "lg:pr-8 xl:pr-12"}`}>
          <div>
            <motion.div
              className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs sm:text-sm font-medium rounded-full mb-3 sm:mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {era.period}
            </motion.div>
            <motion.h2
              className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {era.title}
            </motion.h2>
          </div>

          <motion.div
            className="text-sm sm:text-base lg:text-lg leading-relaxed space-y-3 sm:space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {era.description.split(". ").map((sentence: string, i: number) => (
              <p key={i}>{sentence + (i < era.description.split(". ").length - 1 ? "." : "")}</p>
            ))}
          </motion.div>

          <motion.div
            className="bg-gray-100 p-4 sm:p-6 rounded-xl italic text-gray-700 border-l-4 border-green-600 my-6 sm:my-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="mb-2 text-sm sm:text-base">"{era.quote}"</p>
            <p className="text-xs sm:text-sm font-medium text-gray-600">— {era.quoteAuthor}</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-2 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {era.stats.map((stat: any, i: number) => (
              <div key={i} className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">{stat.value}</div>
                <div className="text-xs text-gray-600 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="relative order-first lg:order-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative">
            <motion.img
              src={era.image}
              alt={era.title}
              className="w-full h-48 sm:h-64 lg:h-auto object-cover rounded-lg sm:rounded-xl shadow-xl"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 sm:p-3 lg:p-4 text-xs sm:text-sm rounded-b-lg sm:rounded-b-xl">
              <p>
                {era.title} - {era.period}
              </p>
            </div>
          </div>

          <motion.div
            className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg"
            animate={{
              rotate: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Clock className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
          </motion.div>
        </motion.div>
      </div>
    </motion.article>
  )
}

function LibrarianCard({ librarian, index }: { librarian: any; index: number }) {
  return (
    <>
      <motion.div
        className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 w-64 sm:w-72 lg:w-80 flex-shrink-0 group"
        whileHover={{
          y: -10,
          scale: 1.05,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
        onHoverStart={() => {
          const scrollContainer = document.querySelector("[data-scroll-container]") as HTMLElement
          if (scrollContainer) {
            scrollContainer.style.animationPlayState = "paused"
          }
        }}
        onHoverEnd={() => {
          const scrollContainer = document.querySelector("[data-scroll-container]") as HTMLElement
          if (scrollContainer) {
            scrollContainer.style.animationPlayState = "running"
          }
        }}
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden mb-3 sm:mb-4 border-4 border-green-100 group-hover:border-green-400 transition-colors duration-300"
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, 0],
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
          >
            <img
              src={librarian.image || "/placeholder.svg"}
              alt={librarian.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-300 leading-tight">
            {librarian.name}
          </h3>
          <p className="text-green-600 font-semibold mb-1 text-xs sm:text-sm">{librarian.title}</p>
          {librarian.section && <p className="text-xs text-gray-500 mb-2">{librarian.section}</p>}
          <p className="text-xs text-gray-500 mb-2 font-medium">{librarian.period}</p>
          <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">{librarian.achievement}</p>

          {/* Floating badge */}
          <motion.div
            className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            Leader
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll to top added here — ideally not inside each card */}
      <ScrollToTop />
    </>
  );
}