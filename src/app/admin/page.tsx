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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Mobile Warning */}
      <div className="flex md:hidden text-center text-white text-lg">
        This admin page is only accessible on desktop devices.
      </div>

      {/* Desktop Only */}
      <motion.div
        className="hidden md:block w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8 shadow-2xl border-0 text-center">
          <motion.div
            className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ rotate: -180 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Shield className="h-10 w-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Redirecting...</h1>
          <p className="text-gray-600">
            {loading
              ? "Checking authentication..."
              : user
              ? "Taking you to the Admin Dashboard"
              : "You are not logged in. Redirecting to Login..."}
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
