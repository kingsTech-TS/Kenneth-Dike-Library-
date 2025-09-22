"use client"

import { motion } from "framer-motion"
import { Bell, Calendar, Clock, ArrowRight, BookOpen, Users, Wifi } from "lucide-react"
import Link from "next/link"

const announcements = [
  {
    id: 1,
    title: "Extended Hours During Exam Period",
    description: "The library will be open 24/7 from December 1-15 to support students during final examinations.",
    date: "2024-11-25",
    type: "hours",
    icon: Clock,
    urgent: true,
  },
  {
    id: 2,
    title: "New Digital Database Access",
    description: "We've added access to JSTOR and Project MUSE databases. Login with your student credentials.",
    date: "2024-11-20",
    type: "resources",
    icon: BookOpen,
    urgent: false,
  },
  {
    id: 3,
    title: "Library Orientation for New Students",
    description: "Join us for a comprehensive library tour and research skills workshop every Friday at 2 PM.",
    date: "2024-11-18",
    type: "event",
    icon: Users,
    urgent: false,
  },
  {
    id: 4,
    title: "WiFi Network Upgrade Complete",
    description: "Enjoy faster internet speeds throughout the library with our newly upgraded network infrastructure.",
    date: "2024-11-15",
    type: "technology",
    icon: Wifi,
    urgent: false,
  },
]

const typeColors = {
  hours: "from-red-500 to-red-600",
  resources: "from-blue-500 to-blue-600",
  event: "from-green-500 to-green-600",
  technology: "from-purple-500 to-purple-600",
}

export default function Announcements() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-4">
            <Bell className="h-8 w-8 text-orange-600 mr-3" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Latest Announcements</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news, events, and important information from Kenneth Dike Library
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {announcements.map((announcement, index) => (
            <motion.div
              key={announcement.id}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 ${
                announcement.urgent ? "border-red-500" : "border-gray-200"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${typeColors[announcement.type as keyof typeof typeColors]} rounded-lg flex items-center justify-center mr-4`}
                    >
                      <announcement.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {announcement.title}
                        {announcement.urgent && (
                          <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Urgent</span>
                        )}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(announcement.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">{announcement.description}</p>

                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      announcement.type === "hours"
                        ? "bg-red-100 text-red-800"
                        : announcement.type === "resources"
                          ? "bg-blue-100 text-blue-800"
                          : announcement.type === "event"
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {announcement.type}
                  </span>

                  <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            href="/news"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Announcements
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
