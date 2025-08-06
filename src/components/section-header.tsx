"use client"

import { motion } from "framer-motion"
import React from "react"

interface SectionHeaderProps {
  title: string
  description?: string
  align?: "left" | "center"
}

export function SectionHeader({ title, description, align = "center" }: SectionHeaderProps) {
  return (
    <motion.div
      className={`mb-8 ${align === "center" ? "text-center" : "text-left"}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{title}</h2>
      {description && (
        <p className="mt-2 text-gray-500 text-base md:text-lg max-w-xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  )
}
