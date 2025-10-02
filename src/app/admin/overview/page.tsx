"use client";

import { JSX, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { BookOpen, Image, Users, Home, User, Building2, UserStar } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, Tooltip } from "recharts";
import { db } from "../../../../lib/firebase";
import { motion, AnimatePresence } from "framer-motion";

interface SectionItem {
  id: string;
  name: string;
}

interface SectionData {
  count: number;
  recent: SectionItem[];
  trend: { count: number }[];
}

type SectionKey = "eResource" | "galleryImages" | "librarians" | "libraries" | "staff";

export default function AdminDashboard() {
  const router = useRouter();

  const sections: { key: SectionKey; title: string; icon: JSX.Element; route: string; gradient: string }[] = [
    { key: "eResource", title: "E-Resources", icon: <BookOpen className="w-5 h-5" />, route: "/admin/e-resources", gradient: "from-blue-400 to-blue-600" },
    { key: "galleryImages", title: "Gallery", icon: <Image className="w-5 h-5" />, route: "/admin/gallery", gradient: "from-pink-400 to-pink-600" },
    { key: "librarians", title: "Librarians", icon: <UserStar className="w-5 h-5" />, route: "/admin/librarians", gradient: "from-green-400 to-green-600" },
    { key: "libraries", title: "Libraries", icon: <Building2 className="w-5 h-5" />, route: "/admin/libraries", gradient: "from-yellow-400 to-yellow-500" },
    { key: "staff", title: "Staff", icon: <Users className="w-5 h-5" />, route: "/admin/staff", gradient: "from-purple-400 to-purple-600" },
  ];

  const [data, setData] = useState<Record<SectionKey, SectionData>>({
    eResource: { count: 0, recent: [], trend: [] },
    galleryImages: { count: 0, recent: [], trend: [] },
    librarians: { count: 0, recent: [], trend: [] },
    libraries: { count: 0, recent: [], trend: [] },
    staff: { count: 0, recent: [], trend: [] },
  });

  useEffect(() => {
    const unsubscribes: (() => void)[] = [];

    sections.forEach((section) => {
      const colRef = collection(db, section.key);

      const unsub = onSnapshot(colRef, (snapshot) => {
        const count = snapshot.size;

        const recent = snapshot.docs
          .sort((a, b) => {
            const aTime = (a.data() as any).createdAt?.toMillis?.() || 0;
            const bTime = (b.data() as any).createdAt?.toMillis?.() || 0;
            return bTime - aTime;
          })
          .slice(0, 3)
          .map((d) => ({
            id: d.id,
            name: (d.data() as any).name || (d.data() as any).title || "Item",
          }));

        setData((prev) => {
          const prevTrend = prev[section.key].trend || [];
          const newTrend = [...prevTrend.slice(-6), { count }];
          return { ...prev, [section.key]: { count, recent, trend: newTrend } };
        });
      });

      unsubscribes.push(unsub);
    });

    return () => unsubscribes.forEach((unsub) => unsub());
  }, []);

  return (
    <div className="p-8 space-y-10 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map((s) => (
          <motion.div
            key={s.key}
            className="backdrop-blur-md bg-white/60 border border-gray-200 rounded-3xl p-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            onClick={() => router.push(s.route)}
            whileHover={{ scale: 1.02 }}
          >
            {/* Top: Icon + Title + Count */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-full bg-gradient-to-r ${s.gradient} shadow-lg text-white flex items-center justify-center`}
                >
                  {s.icon}
                </div>
                <h2 className="text-lg font-semibold text-gray-700">{s.title}</h2>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={data[s.key].count}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-extrabold text-gray-900"
                >
                  {data[s.key].count}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Trend Chart */}
            {data[s.key].trend.length > 1 && (
              <div className="mt-5 h-20">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data[s.key].trend}>
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="url(#gradientStroke)"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                    <Tooltip
                      contentStyle={{ background: "white", borderRadius: 8, border: "none", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
                      itemStyle={{ color: "#6366f1", fontWeight: 600 }}
                    />
                    <defs>
                      <linearGradient id="gradientStroke" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                        <stop offset="100%" stopColor="#a78bfa" stopOpacity={1} />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Recent */}
            <div className="mt-6 text-sm">
              <h3 className="font-medium text-gray-600 mb-2">Recent</h3>
              <ul className="space-y-1 text-gray-700">
                {data[s.key].recent.length > 0 ? (
                  data[s.key].recent.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-2 group hover:text-indigo-600 transition-colors"
                    >
                      <span className="text-indigo-500 font-bold group-hover:text-indigo-700 transition-colors">•</span>
                      {item.name}
                    </li>
                  ))
                ) : (
                  <li className="italic text-gray-400">No recent items</li>
                )}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
