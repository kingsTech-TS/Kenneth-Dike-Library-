"use client"

import { useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { ArrowLeft, Search, Filter, ExternalLink, BookOpen, Users, Globe, Database, Zap, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

const databases = [
    {
        id: 1,
        name: "JSTOR",
        category: "Multidisciplinary",
        description:
            "Digital library with thousands of academic journals, books, and primary sources across multiple disciplines including arts, sciences, and humanities.",
        features: [
            "Full-text articles",
            "Historical archives",
            "Primary sources",
            "Citation tools",
        ],
        subjects: [
            "Arts & Humanities",
            "Social Sciences",
            "Science & Mathematics",
            "Business & Economics",
        ],
        logo: "JSTOR.png",
        url: "/restricted",
        color: "from-amber-500 to-yellow-500",
        stats: { articles: "12M+", journals: "3,000+", books: "75,000+" },
    },
    {
        id: 2,
        name: "Science.gov",
        category: "Multidisciplinary",
        description:
            "A US government gateway offering one-stop access to 60+ scientific databases and over 2,200 portals across 13 federal science agencies, covering 200 million+ pages of research and technical information.",
        features: [
            "Federated real-time search",
            "Clustered results by topic/date",
            "Alerts & email notifications",
            "Advanced/Basic search filters",
            "Full-text & citation results",
        ],
        subjects: [
            "Science",
            "Technology",
            "Engineering",
            "Medicine",
            "Agriculture",
            "Environmental Sciences",
            "Energy",
            "Mathematics",
        ],
        logo: "sci_gov.png",
        url: "https://www.science.gov",
        color: "from-blue-500 to-indigo-600",
        stats: { databases: "60+", pages: "200M+", agencies: "13+" },
    },
    {
        id: 3,
        name: "ERIC",
        category: "Education",
        description:
            "Topics in education, from early childhood education to higher education and special education, and includes both scholarly and grey literature.",
        features: [
            "Peer-reviewed articles",
            "Grey literature",
            "Full-text PDFs",
            "Advanced search tools",
        ],
        subjects: [
            "Early Childhood Education",
            "K-12 Education",
            "Higher Education",
            "Special Education",
            "Educational Policy",
        ],
        logo: "ERIC.png",
        url: "https://eric.ed.gov/",
        color: "from-indigo-600 to-blue-500",
        stats: { articles: "1.6M+", journals: "500+", reports: "300k+" },
    },
    {
        id: 4,
        name: "HathiTrust Digital Library",
        category: "Humanities & Social Sciences",
        description:
            "A partnership of academic and research institutions, HathiTrust offers a collection of millions of titles digitized from libraries around the world, covering disciplines like history, literature, law, education, and more.",
        features: [
            "Full-text search",
            "Digitized books and journals",
            "Public domain access",
            "Scholarly content",
        ],
        subjects: [
            "History",
            "Literature",
            "Law",
            "Arts",
            "Education",
            "Religion",
            "Social Sciences",
        ],
        logo: "hatii.png",
        url: "https://www.hathitrust.org/",
        color: "from-amber-500 to-yellow-500",
        stats: { books: "18M+", publicDomain: "7.5M+", partners: "80+" },
    },
    {
        id: 5,
        name: "arXiv",
        category: "STEM (Science, Technology, Engineering, Mathematics)",
        description:
            "An open-access archive for scholarly articles in physics, mathematics, computer science, quantitative biology, finance, and related fields, providing preprints freely available to the public before formal peer review.",
        features: [
            "Preprints",
            "Full-text access",
            "Daily updates",
            "Advanced search",
            "Open-access",
        ],
        subjects: [
            "Physics",
            "Mathematics",
            "Computer Science",
            "Quantitative Biology",
            "Quantitative Finance",
            "Statistics",
            "Electrical Engineering",
        ],
        logo: "arX.png",
        url: "https://arxiv.org",
        color: "from-blue-500 to-indigo-600",
        stats: { articles: "2.3M+", categories: "8+", subPerMonth: "15,000+" },
    },
    {
        id: 6,
        name: "UNdata",
        category: "Global Statistics",
        description:
            "A centralized gateway to statistical databases compiled by the United Nations and its agencies, covering demographics, economics, health, education, environment, and sustainable development worldwide.",
        features: [
            "International datasets",
            "Country profiles",
            "Time series data",
            "Visualizations",
            "Free access",
        ],
        subjects: [
            "Demographics",
            "Economics",
            "Health",
            "Education",
            "Environment",
            "Development",
        ],
        logo: "UNdata.png",
        url: "https://data.un.org",
        color: "from-indigo-600 to-blue-500",
        stats: { datasets: "60+", countries: "200+", indicators: "1,000+" },
    },
    {
        id: 7,
        name: "LawPavilion",
        category: "Law & Legal Studies",
        description:
            "Nigeria's premier digital and offline legal research platform, offering access to a vast repository of case law, legislation, and legal analytics — trusted by courts, law firms, and institutions.",
        features: ["Offline access", "Judicial precedents", "Legal analytics", "Case citation tools"],
        subjects: ["Law", "Jurisprudence", "Constitutional Law", "Commercial Law", "Legal Practice"],
        logo: "lawP.png",
        url: "/restricted",
        color: "from-indigo-700 to-indigo-800",
        stats: { cases: "100k+", laws: "1,000+", courts: "Nigerian courts" },
    },

    {
        id: 8,
        name: "SSRN",
        category: "Social Sciences",
        description:
            "Repository of working papers and forthcoming articles in a wide range of disciplines including economics, law, and health sciences.",
        features: ["Preprints", "Early research", "Downloadable papers", "Author profiles"],
        subjects: ["Social Sciences", "Economics", "Law", "Business", "Political Science", "Humanities", "Health Sciences"],
        logo: "SSR.png",
        url: "https://www.ssrn.com/index.cfm/en/",
        color: "from-gray-600 to-gray-800",
        stats: { papers: "1M+", authors: "600K+", downloads: "150M+" },
    },
    {
        id: 9,
        name: "OAIster",
        category: "Multidisciplinary",
        description:
            "Union catalog of millions of records representing open access resources worldwide, maintained by OCLC.",
        features: ["Open access", "Theses & dissertations", "Archival documents", "Multilingual records"],
        subjects: ["Arts", "Humanities", "Sciences", "Engineering", "Social Sciences"],
        logo: "OCLC.png",
        url: "https://www.oclc.org/en/oaister.html",
        color: "from-blue-600 to-blue-800",
        stats: { records: "50M+", institutions: "1,500+", countries: "100+" },
    },
    {
        id: 10,
        name: "Europe PMC",
        category: "Life Sciences",
        description:
            "European-based repository for life sciences articles, books, patents, and clinical guidelines.",
        features: ["Full-text access", "PubMed linkage", "Grant info", "Preprints"],
        subjects: ["Life Sciences", "Biomedical Sciences", "Medicine"],
        logo: "PMC.png",
        url: "https://europepmc.org",
        color: "from-green-500 to-green-700",
        stats: { articles: "42M+", grants: "800k+", preprints: "500k+" },
    },
    {
        id: 11,
        name: "EconBiz",
        category: "Economics & Business",
        description:
            "Academic search portal for economics and business studies, offering access to articles, working papers, and journals.",
        features: ["Research articles", "Open access", "Working papers", "Conference papers"],
        subjects: ["Economics", "Business Studies", "Management", "Marketing", "Finance"],
        logo: "Econ.png",
        url: "https://www.econbiz.de",
        color: "from-yellow-500 to-orange-600",
        stats: { records: "1.1M+", institutions: "200+", countries: "50+" }
    },
    {
        id: 12,
        name: "CIA World Factbook",
        category: "Geopolitics & Statistics",
        description:
            "Comprehensive source of country data including geography, demographics, government, economy, and military.",
        features: ["Country profiles", "Statistical data", "Comparative rankings", "Interactive maps"],
        subjects: ["Geography", "Demographics", "Economy", "Military", "Government", "Infrastructure"],
        logo: "fact.png",
        url: "https://www.cia.gov/the-world-factbook",
        color: "from-gray-700 to-blue-900",
        stats: { countries: "260+", variables: "100+", updates: "Weekly" }
    },
    {
        id: 13,
        name: "OATD",
        category: "Theses & Dissertations",
        description:
            "Index of graduate-level theses and dissertations freely available in full-text online from around the world.",
        features: ["Open access", "Graduate research", "Multilingual", "Global institutions"],
        subjects: ["Humanities", "Sciences", "Engineering", "Education", "Social Sciences"],
        logo: "Theses.png",
        url: "https://oatd.org",
        color: "from-teal-500 to-teal-700",
        stats: { records: "4.5M+", institutions: "1,100+", countries: "100+" }
    },
    {
        id: 14,
        name: "NASA ADS",
        category: "Astronomy & Astrophysics",
        description:
            "Digital library for research in astronomy, astrophysics, and related fields, maintained by NASA.",
        features: ["Full-text PDFs", "Citation indexing", "Bibliographic tools", "Preprints"],
        subjects: ["Astronomy", "Astrophysics", "Space Science"],
        logo: "astro.png",
        url: "https://ui.adsabs.harvard.edu",
        color: "from-blue-900 to-indigo-900",
        stats: { articles: "15M+", citations: "200M+", journals: "1,000+" }
    },
    {
        id: 15,
        name: "ScienceOpen",
        category: "Science & Research",
        description:
            "Research and publishing platform providing open access content and peer review across all areas of science.",
        features: ["Open access", "Peer review", "Research metrics", "Networking"],
        subjects: ["Astronomy", "Astrophysics", "Space Science", "Physics", "Geophysics"],
        logo: "sci_Open.png",
        url: "https://www.scienceopen.com",
        color: "from-pink-600 to-purple-700",
        stats: { articles: "90M+", authors: "25M+", journals: "30,000+" }
    },
    {
        id: 16,
        name: "Project Gutenberg",
        category: "Literature & Humanities",
        description:
            "Digital library of over 60,000 free eBooks, primarily consisting of classic literature, historical texts, and philosophy.",
        features: ["Free eBooks", "Classic literature", "Downloadable formats", "Public domain works"],
        subjects: ["Literature", "History", "Philosophy", "Religion", "Classic Texts"],
        logo: "project.png",
        url: "https://www.gutenberg.org",
        color: "from-yellow-700 to-orange-700",
        stats: { books: "60,000+", languages: "60+", formats: "Kindle, Plain Text" }
    },
    {
        id: 17,
        name: "Chronicling America",
        category: "History & Journalism",
        description:
            "Historic American newspapers archive from the Library of Congress, offering access to digitized newspapers from 1789–1963.",
        features: ["Historic newspapers", "Searchable pages", "Archival materials", "Free access"],
        subjects: ["History", "Journalism", "American Studies", "Social Issues"],
        logo: "Chronic.png",
        url: "https://chroniclingamerica.loc.gov",
        color: "from-blue-900 to-indigo-800",
        stats: { newspapers: "20M+ pages", years: "1789–1963", states: "40+" }
    },
    {
        id: 18,
        name: "BioRxiv",
        category: "Biological Sciences",
        description:
            "Preprint server for biology, offering early access to research papers before peer review.",
        features: ["Preprints", "Early access", "Downloadable PDFs", "DOIs"],
        subjects: ["Biology", "Genetics", "Neuroscience", "Ecology", "Bioinformatics"],
        logo: "Bio.png",
        url: "https://www.biorxiv.org",
        color: "from-green-600 to-green-800",
        stats: { preprints: "100,000+", subjects: "30+", downloads: "10M+" }
    },
    {
        id: 19,
        name: "MedRxiv",
        category: "Health & Medical Sciences",
        description:
            "Preprint server for health sciences, providing early access to clinical and medical research papers.",
        features: ["Medical preprints", "Open access", "DOIs", "Updated versions"],
        subjects: ["Medicine", "Genetics", "Neuroscience", "Ecology", "Bioinformatics"],
        logo: "medR.png",
        url: "https://www.medrxiv.org",
        color: "from-red-600 to-red-800",
        stats: { preprints: "40,000+", categories: "20+", updates: "Daily" }
    },
    {
        id: 20,
        name: "OAPEN",
        category: "Humanities & Social Sciences",
        description:
            "Online library and publication platform for open access books, mainly in the fields of humanities and social sciences.",
        features: ["Open access books", "Peer-reviewed", "Searchable catalog", "Multilingual content"],
        subjects: ["Humanities", "Social Sciences", "Arts", "Cultural Studies", "History"],
        logo: "open_Acc.png",
        url: "https://oapen.org/",
        color: "from-purple-600 to-purple-800",
        stats: { books: "25,000+", publishers: "300+", languages: "15+" }
    },
    {
        id: 21,
        name: "Research4Life",
        category: "Health, Agriculture, Environment, Law",
        description:
            "Provides access to five research programs (HINARI, AGORA, OARE, ARDI, and GOALI) supporting research in health, agriculture, environmental science, development, innovation, and law in developing countries.",
        features: ["Access to peer-reviewed journals", "Global research collaboration", "Thematic portals", "Free/low-cost access for eligible institutions"],
        subjects: ["Health", "Agriculture", "Environment", "Innovation", "Law"],
        logo: "research.png",
        url: "/restricted",
        color: "from-green-600 to-green-700",
        stats: { programs: 5, institutions: "10,000+", countries: "120+" }
    },
    {
        id: 22,
        name: "Ajol",
        category: "African Journals",
        description:
            "African Journals Online (AJOL) hosts peer-reviewed academic journals from Africa, focused on African research across a wide range of disciplines.",
        features: ["Open access journals", "African-focused content", "Health and social sciences", "Search and browse tools"],
        subjects: ["Health", "Agriculture", "Social Sciences", "African Studies"],
        logo: "AJOL.png",
        url: "/restricted",
        color: "from-yellow-600 to-yellow-700",
        stats: { journals: "500+", countries: "30+", disciplines: "10+" }
    },
    {
        id: 23,
        name: "EBSCO",
        category: "Multidisciplinary",
        description:
            "A comprehensive research platform offering access to academic journals, magazines, books, and other resources across disciplines like biology, chemistry, engineering, physics, psychology, and religion.",
        features: ["Full-text journals", "Searchable databases", "Academic ebooks", "Research alerts"],
        subjects: ["Biology", "Chemistry", "Engineering", "Physics", "Psychology", "Religion"],
        logo: "EBSCO.png",
        url: "/restricted",
        color: "from-blue-500 to-blue-600",
        stats: { articles: "15M+", journals: "2,000+", ebooks: "300k+" }
    },
    {
        id: 24,
        name: "DOAB",
        category: "Open Access Books",
        description:
            "The Directory of Open Access Books (DOAB) is a discovery service for open access, peer-reviewed books across a wide range of academic subjects.",
        features: ["Free access", "Peer-reviewed books", "Multidisciplinary", "Search and browse tools"],
        subjects: ["Humanities", "Social Sciences", "Science", "Technology", "Medicine"],
        logo: "doab.png",
        url: "http://www.doabooks.org",
        color: "from-orange-500 to-orange-600",
        stats: { books: "60,000+", publishers: "600+", subjects: "30+" }
    },
    {
        id: 25,
        name: "DOAJ",
        category: "Open Access Journals",
        description:
            "The Directory of Open Access Journals (DOAJ) is an online index that provides access to high-quality, peer-reviewed open access journals from around the world.",
        features: ["Free access", "Peer-reviewed journals", "Multidisciplinary", "Advanced search tools"],
        subjects: ["Science", "Technology", "Medicine", "Social Sciences", "Humanities"],
        logo: "DOAJ.png",
        url: "http://www.doaj.org",
        color: "from-teal-500 to-teal-600",
        stats: { journals: "20,000+", countries: "130+", disciplines: "15+" }
    }

]

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

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const filteredDatabases = databases.filter((db) => {
    const matchesCategory = selectedCategory === "All" || db.category === selectedCategory
    const matchesSearch =
      db.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      db.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      db.subjects.some((subject) => subject.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
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
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Database className="w-4 h-4 mr-2" />
            Digital Resources Portal
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            Electronic{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
              Resources
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Access over 10 million electronic volumes through our comprehensive collection of academic databases,
            journals, and digital libraries supporting research across all disciplines
          </p>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">10M+</div>
              <div className="text-sm text-gray-600">Electronic Volumes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">15,000+</div>
              <div className="text-sm text-gray-600">Academic Journals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">500+</div>
              <div className="text-sm text-gray-600">Databases</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-500">24/7</div>
              <div className="text-sm text-gray-600">Access Available</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Search and Filter Section */}
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
                placeholder="Search databases, subjects, or keywords..."
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
              Showing <span className="font-semibold text-indigo-600">{filteredDatabases.length}</span> databases
              {selectedCategory !== "All" && (
                <span>
                  {" "}
                  in <span className="font-semibold">{selectedCategory}</span>
                </span>
              )}
              {searchTerm && (
                <span>
                  {" "}
                  matching "<span className="font-semibold">{searchTerm}</span>"
                </span>
              )}
            </p>
          </div>
        </motion.div>

        {/* Databases Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {filteredDatabases.map((database, index) => (
            <DatabaseCard key={database.id} database={database} index={index} />
          ))}
        </motion.div>

        {/* No Results */}
        {filteredDatabases.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Database className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No databases found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search terms or category filter</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
              }}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Clear Filters
            </Button>
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
              Most databases require University of Ibadan network access. Some resources like JSTOR allow off-campus
              access with institutional login.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <Users className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">On-Campus Access</h3>
                <p className="text-sm opacity-90">Direct access through UI network</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <Zap className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Off-Campus Access</h3>
                <p className="text-sm opacity-90">VPN or institutional login required</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <Award className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Support Available</h3>
                <p className="text-sm opacity-90">Contact ICT & Systems Division</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    {/* Footer and ScrollToTop */}
      <Footer />
      <ScrollToTop />
    </div>
    
  )
}

function DatabaseCard({ database, index }: { database: any; index: number }) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg border border-indigo-100 overflow-hidden group hover:shadow-2xl transition-all duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      {/* Header with Logo and Category */}
      <div className={`bg-gradient-to-r ${database.color} p-6 text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <img src={database.logo || "/placeholder.svg"} alt={`${database.name} logo`} className="h-12 w-auto" />
            </div>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              {database.category}
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-2">{database.name}</h3>
          <p className="text-white/90 leading-relaxed">{database.description}</p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/5 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {Object.entries(database.stats).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-2xl font-bold text-gray-900">{value as string}</div>
              <div className="text-xs text-gray-500 capitalize">{key}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Zap className="h-4 w-4 mr-2 text-indigo-600" />
            Key Features
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {database.features.map((feature: string, i: number) => (
              <motion.div
                key={i}
                className="flex items-center text-sm text-gray-600"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>
                {feature}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Subjects */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
            Subject Areas
          </h4>
          <div className="flex flex-wrap gap-2">
            {database.subjects.map((subject: string, i: number) => (
              <motion.span
                key={i}
                className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-100 transition-colors duration-200"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                {subject}
              </motion.span>
            ))}
          </div>
          
        </div>

        {/* Access Button */}
        <motion.a
          href={database.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button className={`w-full bg-gradient-to-r ${database.color} hover:opacity-90 text-white shadow-lg group`}>
            <span>Access Database</span>
            <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </motion.a>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indigo-200 transition-colors duration-300 pointer-events-none"></div>
    </motion.div>
    
  )
}
