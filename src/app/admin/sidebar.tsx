"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
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
  BookText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { motion } from "framer-motion";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Overview", href: "/admin/overview", icon: BarChart3 },
  { name: "Management", href: "/admin/librarians", icon: UserStar },
  { name: "Staffs", href: "/admin/staff", icon: Users },
  { name: "Libraries", href: "/admin/libraries", icon: Building2 },
  { name: "Gallery", href: "/admin/gallery", icon: Camera },
  // { name: "New & Annoucement", href: "/admin/news", icon: Newspaper },
  { name: "E-Resources", href: "/admin/e-resources", icon: Database },
  { name: "Book Recomendation", href: "/admin/recomend", icon: BookText },
];

export default function Sidebar({ children }: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        if (pathname !== "/admin/login") {
          router.push("/admin/login");
        }
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

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
    );
  }

  if (!isAuthenticated) return null; // prevent flash on redirect

  // Find the deepest matching nav item (handles nested routes)
  const currentNavItem = navigation
    .filter((item) => pathname?.startsWith(item.href))
    .sort((a, b) => b.href.length - a.href.length)[0];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50 w-full transition-all duration-300">
        <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Left Section - Logo + Title */}
          <div className="flex items-center gap-3">
            {/* Sidebar Toggle (mobile only) */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>

            {/* Logo + Title */}
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-1.5 rounded-lg shadow-md shadow-blue-500/20">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  Admin Dashboard
                </h1>
                <p className="text-gray-500 text-xs font-medium tracking-wide">
                  Kenneth Dike Library
                </p>
              </div>
            </div>
          </div>

          {/* Middle Section - Active Page */}
          {currentNavItem && (
            <div
              className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full 
                      bg-blue-50/80 border border-blue-100 shadow-sm backdrop-blur-sm"
            >
              <currentNavItem.icon className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-blue-700 text-sm tracking-wide">
                {currentNavItem.name}
              </span>
            </div>
          )}

          {/* Right Section - Logout */}
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="flex items-center gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all rounded-lg font-medium"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 pt-20 h-full bg-white shadow-xl lg:shadow-md z-40 transform transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            ${collapsed ? "lg:w-20" : "lg:w-64"} w-64 border-r border-gray-100`}
        >
          <div className="h-full flex flex-col p-4">
            {/* Collapse Toggle */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex items-center justify-center w-full py-2 mb-4 rounded-lg
                       text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              aria-label="Toggle collapse"
            >
              {collapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>

            <nav className="flex-1 space-y-1 overflow-y-auto px-1 scrollbar-hide">
              {navigation.map((item) => {
                const isActive = pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center ${
                      collapsed ? "justify-center" : "justify-start gap-3"
                    } px-3 py-2.5 rounded-xl transition-all duration-200 relative overflow-hidden ${
                      isActive
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-blue-100/50 rounded-xl"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                    <item.icon
                      className={`h-5 w-5 relative z-10 ${isActive ? "text-blue-600" : "group-hover:text-gray-900"}`}
                    />
                    {!collapsed && (
                      <span
                        className={`text-sm font-medium relative z-10 ${isActive ? "font-semibold" : ""}`}
                      >
                        {item.name}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main
          className={`flex-1 min-w-0 transition-all duration-300 ${collapsed ? "lg:ml-20" : "lg:ml-64"}`}
        >
          <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
