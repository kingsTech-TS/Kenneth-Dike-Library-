"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../../lib/firebase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Make sure auth is defined before using it
  const [signInWithEmailAndPassword, user, loading, firebaseError] =
    useSignInWithEmailAndPassword(auth!); // `auth!` is safe here because this is a client component

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
      setError(err?.message || "Login failed.");
    }
  };

  useEffect(() => {
    if (firebaseError) {
      setError(firebaseError.message);
    }
  }, [firebaseError]);

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
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
