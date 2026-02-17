"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../lib/firebase";

export default function AdminLoginPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;

    if (user && pathname !== "/admin") {
      router.replace("/admin");
    } else if (!user && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [user, loading, router, pathname]);

  return (
    <div className="min-h-screen bg-[url('/admin-bg.jpg')] bg-cover bg-center flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-blue-900/80 to-indigo-900/90 backdrop-blur-sm" />

      <motion.div
        className="relative w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "out" }}
      >
        <Card className="p-8 shadow-2xl border border-white/10 bg-white/10 backdrop-blur-md text-center">
          <motion.div
            className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30"
            initial={{ rotate: -180, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <Shield className="h-12 w-12 text-white" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
            Admin Portal
          </h1>

          <div className="h-1 w-20 bg-blue-500 rounded-full mx-auto mb-6" />

          <p className="text-blue-100 text-lg font-medium">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                Verifying access...
              </span>
            ) : user ? (
              <span className="text-green-400">
                Access Granted. Redirecting...
              </span>
            ) : (
              "Redirecting to Login..."
            )}
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
