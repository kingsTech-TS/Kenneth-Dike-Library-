import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner" // ✅ Import Toaster from sonner

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kenneth Dike Library - Discover Knowledge Beyond Limits",
  description:
    "Step into a world where tradition meets innovation. Our library is more than books—it's your gateway to endless possibilities.",
  keywords: ["library", "university", "books", "research", "education", "digital resources"],
  authors: [{ name: "UI Library" }],
  openGraph: {
    title: "Kenneth Dike Library - Discover Knowledge Beyond Limits",
    description:
      "Step into a world where tradition meets innovation. Our library is more than books—it's your gateway to endless possibilities.",
    type: "website",
    locale: "en_US",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <Toaster richColors position="top-right" /> {/* ✅ Toaster injected globally */}
      </body>
    </html>
  )
}
