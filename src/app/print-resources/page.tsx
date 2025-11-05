"use client"


import { useEffect, useState, useRef } from "react"
import { Building2, BookOpen, MapPin, Users, Clock, Info, ChevronDown, ArrowUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import Footer from "@/components/footer"
import ChatBotTemplate from "@/components/ChatBotTemplate"





type OpeningHours = {
  session: {
    weekdays: string
    saturday: string
    sunday: string
  }
  vacation: {
    weekdays: string
    saturday: string
  }
}

type Subject = { code: string; area: string }

type Wing = {
  wing: string
  title?: string
  description?: string
  capacity?: string
  facilities?: string[]
  collections?: string[]
  subjects?: Subject[]
}

type Floor = {
  floor: string
  wings: Wing[]
  color?: string
  bgColor?: string
}

export default function PrintResourcesPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeFloor, setActiveFloor] = useState<number>(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const floorRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timeout)
  }, [])

  const scrollToFloor = (index: number) => {
    const el = document.getElementById(`floor-${index}`)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setShowScrollTop(scrollY > 300)

      const floorOffsets = floorData.map((_, index) => {
        const el = document.getElementById(`floor-${index}`)
        return el ? el.offsetTop : 0
      })

      for (let i = 0; i < floorOffsets.length; i++) {
        if (scrollY + 200 < floorOffsets[i]) {
          setActiveFloor(i === 0 ? 0 : i - 1)
          break
        } else if (i === floorOffsets.length - 1) {
          setActiveFloor(i)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const floorData: Floor[] = [
    {
      floor: "Ground Floor",
      bgColor: "bg-purple-600",
      color: "from-purple-700 to-pink-600",
      wings: [
        {
          wing: "West Wing",
          facilities: [
            "Circulation Desk",
            "Online Public Access Catalogue (OPAC) stand",
            "Exhibition Gallery",
            "Reprographic Unit",
            "Research Library",
            "Electronic Classroom",
            "Cataloguing Section",
            "Digitisation Chamber",
          ],
        },
        {
          wing: "East Wing",
          collections: [
            "24 hours Library",
            "Potters Desk",
            "Cloak Room",
          ],
        },
      ],
    },
    {
      floor: "1st Floor",
      color: "from-indigo-700 to-sky-600",
      bgColor: "bg-indigo-600",
      wings: [
        {
          wing: "West Wing",
          facilities: [
            "ICT and Systems Division",
            "Space for Internet Users",
            "Server Room",
            "Staff Offices",
          ],
        },
        {
          wing: "East Wing",
          title: "Electronic Library",
          description:
            "Electronic Library with one hundred (100) Internet ready computers for the students to access electronic resources and surfing the Internet.",
          facilities: ["Chat Room"],
        },
      ],
    },
    {
      floor: "2nd Floor",
      color: "from-blue-700 to-cyan-600",
      bgColor: "bg-blue-600",
      wings: [
        {
          wing: "West Wing",
          facilities: [
            "Collection Development Section",
            "Acquisition Section",
            "Reading Room / Book Shelves",
            "Collection Development Technical Staff Office",
            "Collection Development Work Room",
          ],
          subjects: [
            { code: "R", area: "Medicine" },
            { code: "RA", area: "Public Health" },
            { code: "RC", area: "Internal Medicine" },
          ],
        },
        {
          wing: "East Wing",
          facilities: ["Reading Room / Book Shelves",  
            "Office of the Deputy Librarian"],
          subjects: [
            { code: "A", area: "General Works" },
            { code: "B", area: "Philosophy" },
            { code: "BR", area: "Christianity" },
          ],
        },
      ],
    },
    {
      floor: "3rd Floor",
      color: "from-fuchsia-700 to-rose-600",
      bgColor: "bg-fuchsia-600",
      wings: [
        {
          wing: "West Wing",
          facilities: [
            "Office of the University Librarian",
            "Administrative Office",
        ],
        },
        {
          wing: "East Wing",
          facilities: ["Reading Room/Book Shelves"],
          subjects: [
            { code: "Q", area: "Science" },
            { code: "T", area: "Technology" },
            { code: "TX", area: "Home Economics" },
          ],
        },
      ],
    },
    {
      floor: "4th Floor",
      color: "from-amber-700 to-orange-600",
      bgColor: "bg-amber-600",
      wings: [
        {
          wing: "West Wing",
          facilities: ["Arabic Collection Section", 
            "Maps Section", 
            "Manuscripts Section",
          "Office of former University Librarian"],
        },
        {
          wing: "East Wing",
          title: "Closed Access Collection (CAC)",
          description: "Covered all Subject Areas",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 ">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Navigation */}
      <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="glass rounded-2xl p-4 space-y-2">
          {floorData.map((floor, index) => (
            <button
              key={index}
              onClick={() => scrollToFloor(index)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                activeFloor === index
                  ? "bg-white text-purple-600 shadow-lg scale-110"
                  : "text-white hover:bg-white/20 hover:scale-105"
              }`}
            >
              {index === 0 ? "G" : index}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 animate-bounce-slow cursor-pointer"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}


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
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div
          className={`text-center transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="relative">
              <BookOpen className="h-20 w-20 text-white animate-float" />
              <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            </div>
            <div className="relative">
              <Building2 className="h-20 w-20 text-white animate-float animation-delay-1000" />
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-30 animate-pulse animation-delay-1000"></div>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text animate-gradient-shift">Print Resources</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Navigate through Kenneth Dike Library's comprehensive collection with our interactive floor guide
          </p>

          <button
            onClick={() => scrollToFloor(0)}
            className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
          >
            Explore Floors
            <ChevronDown className="inline-block ml-2 h-5 w-5 group-hover:animate-bounce" />
          </button>
        </div>
      </div>

      {/* Opening Hours Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
       
    

        {/* Floor Sections */}
        <div className="space-y-32">
          {floorData.map((floor, floorIndex) => (
            <div key={floorIndex} id={`floor-${floorIndex}`} className="scroll-mt-20">
              <div
                className={`glass rounded-3xl overflow-hidden transform hover:scale-[1.02] transition-all duration-700 ${floor.bgColor}/5`}
              >
                {/* Floor Header */}
                <div className={`bg-gradient-to-r ${floor.color} p-8 md:p-12 text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-slide-in-left">{floor.floor}</h2>
                        <div className="flex items-center gap-3">
                          <MapPin className="h-6 w-6" />
                          <span className="text-xl opacity-90">Interactive Floor Guide</span>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                          <Building2 className="h-12 w-12" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                </div>

                {/* Wings Content */}
                <div className="p-0">
                  <div className="grid lg:grid-cols-2">
                    {floor.wings.map((wing, wingIndex) => (
                      <div
                        key={wingIndex}
                        className={`p-8 md:p-12 ${wingIndex === 1 ? "lg:border-l border-white/20" : ""} hover:bg-white/5 transition-all duration-500`}
                      >
                        <div className="mb-8">
                          <div className="flex items-center gap-4 mb-6">
                            <div
                              className={`w-12 h-12 bg-gradient-to-r ${floor.color} rounded-xl flex items-center justify-center`}
                            >
                              <Building2 className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white">{wing.wing}</h3>
                          </div>

                          {wing.title && (
                            <div className="mb-8">
                              <h4 className="text-xl font-semibold text-purple-300 mb-4">{wing.title}</h4>
                              {wing.description && (
                                <p className="text-gray-300 text-lg leading-relaxed mb-4">{wing.description}</p>
                              )}
                              {wing.capacity && (
                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full">
                                  <Users className="h-4 w-4" />
                                  <span className="font-medium">{wing.capacity}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {wing.facilities && (
                          <div className="mb-8">
                            <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                              Facilities
                            </h4>
                            <div className="grid gap-3">
                              {wing.facilities.map((facility, facilityIndex) => (
                                <div
                                  key={facilityIndex}
                                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-105"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                                    <span className="text-gray-200 group-hover:text-white transition-colors duration-300">
                                      {facility}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {wing.collections && (
                          <div className="mb-8">
                            <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                              Collections
                            </h4>
                            <div className="grid gap-3">
                              {wing.collections.map((collection, collectionIndex) => (
                                <div
                                  key={collectionIndex}
                                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300 hover:scale-105"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                                    <span className="text-gray-200 group-hover:text-white transition-colors duration-300">
                                      {collection}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {wing.subjects && (
                          <div>
                            <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              Subject Areas
                            </h4>
                            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                              {wing.subjects.map((subject, subjectIndex) => (
                                <div
                                  key={subjectIndex}
                                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 hover:scale-105"
                                >
                                  <div className="flex gap-4 items-start">
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-lg font-mono text-sm font-bold flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                      {subject.code}
                                    </div>
                                    <span className="text-gray-200 group-hover:text-white transition-colors duration-300 text-sm leading-relaxed">
                                      {subject.area}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-32">
          <div className="glass rounded-3xl p-8 md:p-12 text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full mb-8">
              <Info className="h-6 w-6" />
              <span className="font-semibold">Additional Information</span>
            </div>

            <div className="max-w-4xl mx-auto space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                The Kenneth Dike Library operates a comprehensive classification system covering all major academic
                disciplines. Each floor is strategically organized to provide easy access to related subject areas and
                specialized collections.
              </p>
              <p>
                The library's Closed Access Collection (CAC) on the 4th floor ensures that at least one copy of every
                title acquired is preserved and available for consultation at all times, supporting both academic and
                professional accreditation programs.
              </p>
              <p>
                Special collections including Arabic materials, maps, and manuscripts are housed on the 4th floor,
                providing researchers with access to unique and historical resources.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer and ScrollToTop */}
      <Footer />
      <ChatBotTemplate />
    </div>
  )
}
