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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../../../lib/firebase"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function Sidebar({ children }: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false) // collapse sidebar desktop
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
        router.push("/admin/login")
      }
    })

    const handleBeforeUnload = async () => {
      try {
        await signOut(auth)
      } catch (err) {
        console.error("Auto sign-out failed:", err)
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    window.addEventListener("pagehide", handleBeforeUnload)

    return () => {
      unsubscribe()
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("pagehide", handleBeforeUnload)
    }
  }, [router])

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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  const navigation = [
    { name: "Overview", href: "/admin", icon: BarChart3 },
    { name: "Librarians", href: "/admin/librarians", icon: Users },
    { name: "Libraries", href: "/admin/libraries", icon: Building2 },
    { name: "Gallery", href: "/admin/gallery", icon: Camera },
    { name: "E-Resources", href: "/admin/resources", icon: Database },
  ]

  const currentNavItem = navigation.find((item) => item.href === pathname)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50 w-full">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Settings className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 text-sm">Kenneth Dike Library Management</p>
            </div>
          </div>

          {/* Topbar: Active Page Icon */}
          {currentNavItem && (
            <div className="hidden lg:flex items-center gap-2 text-sm text-gray-600">
              <currentNavItem.icon className="w-5 h-5 text-blue-500" />
              <span className="font-medium">{currentNavItem.name}</span>
            </div>
          )}

          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700 transition"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <nav
          className={`fixed top-0 right-0 h-full lg:left-0 lg:right-auto bg-white shadow-md z-40 transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
            ${collapsed ? "lg:w-20" : "lg:w-64"} w-64`}
        >
          <div className="pt-24 lg:pt-6 p-4 space-y-2">
            {/* Collapse Toggle */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex items-center justify-center w-full py-2 px-3 rounded-md text-sm bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              {collapsed ? "→ Expand" : "← Collapse"}
            </button>

            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center ${
                    collapsed ? "justify-center" : "justify-start gap-3"
                  } px-4 py-3 rounded-lg transition-colors ${
                    isActive
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
