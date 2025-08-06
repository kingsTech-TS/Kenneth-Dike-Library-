"use client"

import { usePathname } from "next/navigation"
import AdminLayout from "@/app/admin/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Don’t wrap /admin/login in AdminLayout
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return <AdminLayout>{children}</AdminLayout>
}
