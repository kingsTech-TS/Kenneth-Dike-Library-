"use client"

import { motion } from "framer-motion"
import { Zap, BookOpen, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Database {
  id: string
  name: string
  description?: string
  category?: string
  logoURL?: string
  color?: string
  linkURL?: string
  stats?: Record<string, string | number>
  features?: string[]
  subjects?: string[]
}

export function DatabaseCard({
  database,
  index,
}: {
  database: Database
  index: number
}) {
  // Determine background style
  const isGradient =
    database.color?.includes("from-") || database.color?.includes("to-")

  const headerClasses = `p-6 text-white relative ${
    isGradient ? `bg-gradient-to-r ${database.color}` : ""
  }`

  const headerStyle =
    !database.color
      ? { backgroundColor: "#4f46e5" } // default indigo-600
      : isGradient
      ? {}
      : { backgroundColor: database.color }

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg border border-indigo-100 overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      {/* Header with Logo + Category */}
      <div className={headerClasses} style={headerStyle}>
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <Image
              src={database.logoURL || "/placeholder.svg"}
              alt={`${database.name} logo`}
              width={120}
              height={48}
              className="h-12 w-auto object-contain"
              unoptimized={!!database.logoURL?.startsWith("http")}
            />
          </div>
          {database.category && (
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              {database.category}
            </span>
          )}
        </div>
        <h2 className="text-2xl font-bold mb-2">{database.name}</h2>
        {database.description && (
          <p className="text-white/90 leading-relaxed">
            {database.description}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Stats */}
          {database.stats && Object.keys(database.stats).length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              {Object.entries(database.stats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {typeof value === "number"
                      ? value.toLocaleString()
                      : String(value)}
                  </div>
                  <div className="text-xs text-gray-500 capitalize">{key}</div>
                </div>
              ))}
            </div>
          )}

          {/* Features */}
          {database.features?.length ? (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Zap className="h-4 w-4 mr-2 text-indigo-600" aria-hidden="true" />
                Key Features
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {database.features.map((feature, i) => (
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
          ) : null}

          {/* Subjects */}
          {database.subjects?.length ? (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-blue-600" aria-hidden="true" />
                Subject Areas
              </h4>
              <div className="flex flex-wrap gap-2">
                {database.subjects.map((subject, i) => (
                  <motion.span
                    key={i}
                    className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium"
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    viewport={{ once: true }}
                  >
                    {subject}
                  </motion.span>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Access Button */}
        <div className="mt-auto">
          {database.linkURL ? (
            <Button
              asChild
              className="w-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center"
            >
              <a
                href={database.linkURL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Access ${database.name}`}
                className="text-white"
              >
                <ExternalLink className="h-4 w-4 mr-2 text-white" aria-hidden="true" />
                Access Database
              </a>
            </Button>
          ) : (
            <Button
              className="w-full bg-gray-400 cursor-not-allowed"
              disabled
              aria-disabled="true"
            >
              Link Not Available
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
