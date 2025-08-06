'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

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
    image: "/librarians/DPT6.PNG",
  },
  {
    name: "DR. ADETOUN A. OYELUDE",
    title: "Deputy University Librarian",
    section: "Technical Services",
    image: "/librarians/DPT7.PNG",
  },
  {
    name: "DR. REUBEN A. OJO",
    title: "Deputy mUniversity Librarian",
    section: "ICT & Systems",
    image: "/librarians/DPT8.PNG",
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
    image: "/librarians/DPT5.png",
  },
]

// Utility to generate slug
const generateSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')

const Moving = () => {
  return (
    <motion.section
      className="mb-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
        Distinguished Librarians
      </h2>

      <div className="overflow-hidden relative">
        <motion.div
          className="flex gap-8 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            duration: 100,
            ease: "linear",
          }}
        >
          {[...librarians, ...librarians].map((librarian, index) => {
            const slug = generateSlug(librarian.name)
            return (
              <Link key={index} href={`/history/${slug}`}>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 flex-shrink-0 w-72 cursor-pointer hover:shadow-xl transition">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-100">
                      <img
                        src={librarian.image || "/placeholder.svg"}
                        alt={librarian.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{librarian.name}</h3>
                    <p className="text-blue-600 font-semibold mb-2">{librarian.title}</p>
                    <p className="text-xs text-gray-500 italic">{librarian.section}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Moving
