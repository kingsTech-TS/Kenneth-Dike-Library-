"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../../lib/firebase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [signInWithEmailAndPassword, user, loading, firebaseError] =
    useSignInWithEmailAndPassword(auth);

  // Friendlier error messages
  const errorMessages: Record<string, string> = {
    "auth/user-not-found": "No admin found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/invalid-email": "Please enter a valid email address.",
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res) {
        setEmail("");
        setPassword("");
        router.push("/admin/overview");
      }
    } catch (err: any) {
      setError("Login failed. Please try again.");
    }
  };

  // Map Firebase errors to friendly ones
  useEffect(() => {
    if (firebaseError) {
      setError(errorMessages[firebaseError.code] || "Login failed.");
    }
  }, [firebaseError]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.replace("/admin/overview");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8 shadow-2xl border-0 text-center space-y-6 bg-white">
          <motion.div
            className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto"
            initial={{ rotate: -180 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Shield className="h-10 w-10 text-white" />
          </motion.div>

          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="Enter admin email"
                required
                disabled={loading}
              />
            </div>

            {/* Password Field with Toggle */}
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter password"
                  required
                  disabled={loading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                  tabIndex={-1} // prevent accidental focus
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-600 text-sm">{error}</p>}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white"
              disabled={loading || !email || !password}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
