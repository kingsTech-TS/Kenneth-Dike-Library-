"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
  Users,
  Building2,
  Camera,
  Database,
  Settings,
  BarChart3,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  User2,
  UserStar,
  Users2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../../../lib/firebase"
import { motion } from "framer-motion"

interface AdminLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Overview", href: "/admin/overview", icon: BarChart3 },
  { name: "Management", href: "/admin/librarians", icon: UserStar },
  { name: "Staffs", href: "/admin/staff", icon: Users },
  { name: "Libraries", href: "/admin/libraries", icon: Building2 },
  { name: "Gallery", href: "/admin/gallery", icon: Camera },
  // { name: "New & Annoucement", href: "/admin/news", icon: Newspaper },
  { name: "E-Resources", href: "/admin/e-resources", icon: Database },
]

export default function Sidebar({ children }: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!auth) return

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
        if (pathname !== "/admin/login") {
          router.push("/admin/login")
        }
      }
    })

    return () => unsubscribe()
  }, [router, pathname])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/admin/login")
    } catch (err) {
      console.error("Logout failed:", err)
    }
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) return null // prevent flash on redirect

  // Find the deepest matching nav item (handles nested routes)
  const currentNavItem = navigation
    .filter((item) => pathname?.startsWith(item.href))
    .sort((a, b) => b.href.length - a.href.length)[0]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50 w-full">
        <div className="px-6 py-3 flex items-center justify-between">
          {/* Left Section - Logo + Title */}
          <div className="flex items-center gap-3">
            {/* Sidebar Toggle (mobile only) */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Logo + Title */}
            <div className="flex items-center gap-2">
              <Settings className="h-7 w-7 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-tight">
                  Admin Dashboard
                </h1>
                <p className="text-gray-500 text-sm">
                  Kenneth Dike Library Management
                </p>
              </div>
            </div>
          </div>

          {/* Middle Section - Active Page */}
          {currentNavItem && (
            <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full 
                      bg-blue-50 border border-blue-100 shadow-sm">
              <currentNavItem.icon className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-700 tracking-wide">
                {currentNavItem.name}
              </span>
            </div>
          )}

          {/* Right Section - Logout */}
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2 text-red-600 border-red-600 
                 hover:bg-red-50 hover:text-red-700 transition rounded-lg"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>


      <div className="flex flex-1">
        {/* Sidebar */}
        <nav
          className={`fixed top-16 left-0 h-[calc(100%-4rem)] bg-white shadow-md z-40 transform transition-transform duration-300 ease-in-out
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    ${collapsed ? "lg:w-20" : "lg:w-64"} w-64`}
        >
          <div className="pt-6 p-4 space-y-2">
            {/* Collapse Toggle */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex items-center justify-center w-full py-2 px-3 rounded-md mb-3 text-sm bg-blue-600 hover:bg-gray-200 hover:text-blue-600 text-white cursor-pointer"
              aria-label="Toggle collapse"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </button>

            {navigation.map((item) => {
              const isActive = pathname?.startsWith(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center ${collapsed ? "justify-center" : "justify-start gap-3"
                    } px-4 py-3 rounded-lg transition-colors ${isActive
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                >
                  <item.icon className="h-5 w-5" />
                  {!collapsed && item.name}
                </Link>
              )
            })}
          </div>
        </nav>


        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className={`flex-1 p-6 transition-all duration-300 ${collapsed ? "lg:ml-20" : "lg:ml-64"}`}>
          {children}
        </main>
      </div>
    </div>
  )
}
