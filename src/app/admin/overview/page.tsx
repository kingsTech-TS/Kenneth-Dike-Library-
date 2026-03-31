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
  Plus,
  ArrowUpRight,
  Clock,
  Zap,
  UserStar,
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
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

  const [totalCount, setTotalCount] = useState(0);

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
            name:
              (d.data() as any).name ||
              (d.data() as any).title ||
              (d.data() as any).fullName ||
              (d.data() as any).caption ||
              "Item",
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

  useEffect(() => {
    const total = Object.values(data).reduce((acc, curr) => acc + curr.count, 0);
    setTotalCount(total);
  }, [data]);

  const quickActions = [
    { name: "Add Staff", route: "/admin/staff", icon: <Plus className="w-4 h-4" /> },
    { name: "Upload Gallery", route: "/admin/gallery", icon: <Image className="w-4 h-4" /> },
    { name: "New E-Resource", route: "/admin/e-resources", icon: <BookOpen className="w-4 h-4" /> },
    { name: "Add Librarian", route: "/admin/librarians", icon: <UserStar className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
      >
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Welcome back, Admin. Here's a snapshot of your system today.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
          <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl text-white shadow-xl shadow-blue-200"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full uppercase tracking-wider">
              Live
            </span>
          </div>
          <p className="text-blue-100 text-sm font-medium">Total System Assets</p>
          <h3 className="text-4xl font-bold mt-1">{totalCount}</h3>
          <div className="mt-4 flex items-center gap-2 text-blue-100 text-xs">
            <ArrowUpRight className="w-4 h-4" />
            <span>+12% from last month</span>
          </div>
        </motion.div>

        {sections.slice(0, 3).map((s, i) => (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${s.gradient} text-white shadow-lg shadow-gray-100`}>
                {s.icon}
              </div>
            </div>
            <p className="text-gray-500 text-sm font-medium">{s.title}</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">{data[s.key].count}</h3>
            <div className="mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${s.gradient}`} 
                style={{ width: `${Math.min(100, (data[s.key].count / totalCount) * 100)}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Resource Growth</h2>
                <p className="text-gray-500 text-sm">Overview of digital and physical asset growth</p>
              </div>
              <select className="bg-gray-50 border-none text-sm font-semibold text-gray-600 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 transition-all">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.eResource.trend}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis hide />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorCount)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickActions.map((action, i) => (
              <motion.button
                key={action.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => router.push(action.route)}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 group transition-all"
              >
                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 text-gray-600 group-hover:text-blue-600 transition-colors mb-2">
                  {action.icon}
                </div>
                <span className="text-xs font-bold text-gray-700 group-hover:text-blue-700">{action.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Recent Activity */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Updates</h2>
              <button className="text-blue-600 text-sm font-bold hover:underline">View all</button>
            </div>
            <div className="space-y-6">
              {sections.map((s) => (
                <div key={s.key} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg bg-gradient-to-br ${s.gradient} text-white`}>
                      {s.icon}
                    </div>
                    <span className="text-sm font-bold text-gray-800">{s.title}</span>
                  </div>
                  <div className="pl-9 space-y-2">
                    {data[s.key].recent.length > 0 ? (
                      data[s.key].recent.slice(0, 2).map((item) => (
                        <div key={item.id} className="flex items-center justify-between group cursor-pointer">
                          <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors truncate max-w-[150px]">
                            {item.name}
                          </span>
                          <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded uppercase">New</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400 italic">No recent activity</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
