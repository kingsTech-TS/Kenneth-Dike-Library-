"use client";

import { JSX, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Image,
  Users,
  Home,
  User,
  Building2,
  UserStar,
} from "lucide-react";
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

type SectionKey =
  | "eResource"
  | "galleryImages"
  | "librarians"
  | "libraries"
  | "staff";

export default function AdminDashboard() {
  const router = useRouter();

  const sections: {
    key: SectionKey;
    title: string;
    icon: JSX.Element;
    route: string;
    gradient: string;
  }[] = [
    {
      key: "eResource",
      title: "E-Resources",
      icon: <BookOpen className="w-5 h-5" />,
      route: "/admin/e-resources",
      gradient: "from-blue-400 to-blue-600",
    },
    {
      key: "galleryImages",
      title: "Gallery",
      icon: <Image className="w-5 h-5" />,
      route: "/admin/gallery",
      gradient: "from-pink-400 to-pink-600",
    },
    {
      key: "librarians",
      title: "Librarians",
      icon: <UserStar className="w-5 h-5" />,
      route: "/admin/librarians",
      gradient: "from-green-400 to-green-600",
    },
    {
      key: "libraries",
      title: "Libraries",
      icon: <Building2 className="w-5 h-5" />,
      route: "/admin/libraries",
      gradient: "from-yellow-400 to-yellow-500",
    },
    {
      key: "staff",
      title: "Staff",
      icon: <Users className="w-5 h-5" />,
      route: "/admin/staff",
      gradient: "from-purple-400 to-purple-600",
    },
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
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back, Admin. Here's what's happening today.
          </p>
        </div>
        <div className="flex gap-2">
          {/* Place for potential date filter or quick actions */}
          <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 shadow-sm">
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {sections.map((s, i) => (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
            onClick={() => router.push(s.route)}
          >
            {/* Background Gradient Hover Effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
            />

            <div className="flex justify-between items-start mb-6">
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${s.gradient} text-white shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform duration-300`}
              >
                {s.icon}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={data[s.key].count}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-right"
                >
                  <p className="text-3xl font-bold text-gray-900">
                    {data[s.key].count}
                  </p>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    Items
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <h2 className="text-lg font-semibold text-gray-800 mb-4 group-hover:text-blue-700 transition-colors">
              {s.title}
            </h2>

            {/* Mini Chart */}
            <div className="h-16 w-full opacity-60 group-hover:opacity-100 transition-opacity">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data[s.key].trend}>
                  <defs>
                    <linearGradient
                      id={`gradient-${s.key}`}
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#cbd5e1" stopOpacity={0.2} />
                      <stop
                        offset="100%"
                        stopColor="#64748b"
                        stopOpacity={0.8}
                      />
                    </linearGradient>
                  </defs>
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: "#475569" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    itemStyle={{ fontSize: "12px", color: "#475569" }}
                    cursor={{ stroke: "#e2e8f0", strokeWidth: 1 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Items Footer */}
            <div className="mt-4 pt-4 border-t border-gray-50">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="font-medium">Recent Activity</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  View all &rarr;
                </span>
              </div>
              <div className="mt-2 space-y-1">
                {data[s.key].recent.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    className="truncate text-xs text-gray-600 pl-2 border-l-2 border-gray-200 hover:border-blue-400 transition-colors"
                  >
                    {item.name}
                  </div>
                ))}
                {data[s.key].recent.length === 0 && (
                  <div className="text-xs text-gray-300 italic">
                    No activity
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
