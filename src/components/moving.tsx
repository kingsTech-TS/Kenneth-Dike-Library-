"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";

type Librarian = {
  id?: string;
  fullName: string;
  designation: string;
  department: string;
  imageURL: string;
  position?: number;
  slug?: string;
};

const generateSlug = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");

const Moving = () => {
  const [librarians, setLibrarians] = useState<Librarian[]>([]);

  // ✅ Real-time Firestore listener (ordered by position)
  useEffect(() => {
    const q = query(collection(db, "librarians"), orderBy("position", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as Librarian,
      );
      setLibrarians(data);
    });

    return () => unsubscribe();
  }, []);

  const shouldAnimate = librarians.length > 1;

  return (
    <motion.section
      className="mb-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
        Library Management Team
      </h2>

      <div className="overflow-hidden relative">
        <motion.div
          className="flex gap-8 w-max"
          animate={shouldAnimate ? { x: ["0%", "-50%"] } : {}}
          transition={
            shouldAnimate
              ? { repeat: Infinity, duration: 100, ease: "linear" }
              : {}
          }
        >
          {librarians.map((librarian, index) => {
            const slug = librarian.slug || generateSlug(librarian.fullName);
            return (
              <Link key={librarian.id || index} href={`/history/${slug}`}>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 flex-shrink-0 w-72 cursor-pointer hover:shadow-xl transition">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-100">
                      <img
                        src={librarian.imageURL || "/placeholder.svg"}
                        alt={librarian.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {librarian.fullName}
                    </h3>
                    <p className="text-blue-600 font-semibold mb-2">
                      {librarian.designation}
                    </p>
                    <p className="text-xs text-gray-500 italic">
                      {librarian.department}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </motion.div>

        {/* Button to the other Library staff */}
        <div className="w-full flex justify-center mt-6">
          <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-yellow-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <Link href="/staff">See other library staff</Link>
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

export default Moving;
