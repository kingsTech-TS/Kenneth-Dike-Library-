"use client"

import { motion } from "framer-motion"
import { Clock, Calendar, MapPin, Phone, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

const libraryHours = [
  {
    day: "Monday - Thursday",
    hours: "8:00 AM - 10:00 PM",
    status: "open",
  },
  {
    day: "Friday",
    hours: "8:00 AM - 8:00 PM",
    status: "open",
  },
  {
    day: "Saturday",
    hours: "9:00 AM - 6:00 PM",
    status: "open",
  },
  {
    day: "Sunday",
    hours: "2:00 PM - 8:00 PM",
    status: "open",
  },
]



export default function LibraryHours() {
  const currentTime = new Date()
  const currentDay = currentTime.getDay()
  const currentHour = currentTime.getHours()

  const isLibraryOpen = () => {
    // Simple logic for demonstration
    if (currentDay === 0) {
      // Sunday
      return currentHour >= 14 && currentHour < 20
    } else if (currentDay === 6) {
      // Saturday
      return currentHour >= 9 && currentHour < 18
    } else if (currentDay === 5) {
      // Friday
      return currentHour >= 8 && currentHour < 20
    } else {
      // Monday-Thursday
      return currentHour >= 8 && currentHour < 22
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Clock className="w-4 h-4 mr-2" />
            Visit Us
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6z">
            Library{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Hours</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Plan your visit with our current operating hours and special schedules
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Current Status */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 h-full bg-gradient-to-br from-indigo-900 to-blue-900 text-white shadow-xl">
              <div className="text-center">
                <motion.div
                  className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Clock className="h-10 w-10 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold mb-4">Current Status</h3>

                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
                    isLibraryOpen()
                      ? "bg-green-500/20 text-green-100 border border-green-400/30"
                      : "bg-red-500/20 text-red-100 border border-red-400/30"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full mr-2 ${isLibraryOpen() ? "bg-green-400" : "bg-red-400"}`}></div>
                  {isLibraryOpen() ? "Currently Open" : "Currently Closed"}
                </div>

                <p className="text-indigo-100 mb-6">
                  {currentTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-center text-indigo-100">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="text-sm">+234 (0) 2 810 1100</span>
                  </div>
                  <div className="flex items-center justify-center text-indigo-100">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">Kenneth Dike Library University of Ibadan.</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Regular Hours */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 h-full bg-white border-indigo-100 border-2 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-6 w-6 mr-3 text-indigo-600" />
                Regular Hours
              </h3>

              <div className="space-y-4">
                {libraryHours.map((schedule, index) => (
                  <motion.div
                    key={schedule.day}
                    className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(99, 102, 241, 0.1)" }}
                  >
                    <span className="font-semibold text-gray-900">{schedule.day}</span>
                    <span className="text-indigo-600 font-medium">{schedule.hours}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-amber-800 mb-1">Important Note</p>
                    <p className="text-sm text-amber-700">
                      Hours may vary during holidays, exam periods, and special events. Please check our website or call
                      ahead for the most current information.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

      

       
      </div>
    </section>
  )
}
