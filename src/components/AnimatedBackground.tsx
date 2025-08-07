"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const AnimatedBackground = () => {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      handleResize()
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-4 h-4 rounded-full ${
            i % 4 === 0
              ? "bg-purple-300/20"
              : i % 4 === 1
              ? "bg-pink-300/20"
              : i % 4 === 2
              ? "bg-orange-300/20"
              : "bg-blue-300/20"
          }`}
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          transition={{
            duration: Math.random() * 25 + 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}

      {/* Large floating shapes */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-200/30 to-purple-200/30 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

export default AnimatedBackground
