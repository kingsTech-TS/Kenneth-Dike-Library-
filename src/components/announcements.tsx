"use client"

import { motion } from "framer-motion"
import { Calendar, Users, BookOpen, Award, ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const announcements = [
  {
    id: 1,
    type: "Event",
    title: "Digital Literacy Workshop",
    description: "Join us for an intensive workshop on navigating digital databases and research tools.",
    date: "2024-02-15",
    time: "10:00 AM - 2:00 PM",
    location: "Main Library, Conference Room A",
    icon: BookOpen,
    color: "from-indigo-500 to-blue-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    textColor: "text-indigo-700",
  },
  {
    id: 2,
    type: "News",
    title: "New E-Resource Database Added",
    description: "We've added access to SpringerLink, expanding our digital collection by 2 million articles.",
    date: "2024-02-10",
    location: "Available 24/7 online",
    icon: Award,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
  },
  {
    id: 3,
    type: "Update",
    title: "Extended Study Hours",
    description: "During exam period, the library will be open 24/7 from March 1st to March 31st.",
    date: "2024-02-08",
    location: "All library locations",
    icon: Clock,
    color: "from-amber-500 to-yellow-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
  },
  {
    id: 4,
    type: "Event",
    title: "Research Excellence Awards",
    description: "Celebrating outstanding research achievements by our faculty and graduate students.",
    date: "2024-02-20",
    time: "6:00 PM - 8:00 PM",
    location: "Library Auditorium",
    icon: Users,
    color: "from-indigo-600 to-blue-500",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    textColor: "text-indigo-700",
  },
]

export default function Announcements() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-indigo-50 to-blue-50">
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
            <Calendar className="w-4 h-4 mr-2" />
            Latest Updates
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            News &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
              Announcements
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest events, news, and important information from Kenneth Dike Library
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {announcements.map((announcement, index) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card
                className={`p-6 h-full ${announcement.bgColor} ${announcement.borderColor} border-2 hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${announcement.color} rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <announcement.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 ${announcement.bgColor} ${announcement.textColor} text-xs font-semibold rounded-full border ${announcement.borderColor}`}
                    >
                      {announcement.type}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                  {announcement.title}
                </h3>

                <p className="text-gray-700 leading-relaxed mb-4">{announcement.description}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
                    <span>
                      {new Date(announcement.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {announcement.time && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      <span>{announcement.time}</span>
                    </div>
                  )}

                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-amber-500" />
                    <span>{announcement.location}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className={`w-full group-hover:bg-gradient-to-r group-hover:${announcement.color} group-hover:text-white group-hover:border-transparent transition-all duration-300`}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
