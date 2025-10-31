"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Calendar,
  Clock,
  User,
  Tag,
  Search,
  Bell,
  BookOpen,
  Users,
  Settings,
  Award,
  Sparkles,
  TrendingUp,
  Heart,
  Share2,
  Bookmark,
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

interface NewsItem {
  id: string
  title: string
  excerpt: string
  content: string
  category: "announcement" | "event" | "maintenance" | "acquisition" | "policy" | "achievement"
  priority: "high" | "medium" | "low"
  author: string
  publishDate: string
  readTime: string
  tags: string[]
  image?: string
  likes: number
  views: number
}

const newsData: NewsItem[] = [
  {
    id: "1",
    title: "🚀 New Digital Archive System Launch",
    excerpt:
      "We are excited to announce the launch of our new digital archive system with enhanced search capabilities and improved user interface.",
    content:
      "The University of Ibadan Library is proud to introduce our state-of-the-art digital archive system. This new platform offers advanced search functionality, better document preservation, and seamless access to our historical collections.",
    category: "announcement",
    priority: "high",
    author: "Dr. Adebayo Ogundimu",
    publishDate: "2024-01-15",
    readTime: "3 min read",
    tags: ["Digital Archives", "Technology", "Research"],
    image: "/placeholder.svg?height=300&width=500&text=Digital+Archive+System",
    likes: 124,
    views: 1250,
  },
  {
    id: "2",
    title: "⏰ Extended Library Hours During Exam Period",
    excerpt:
      "Starting February 1st, the library will extend operating hours to support students during the examination period.",
    content:
      "To better serve our students during the upcoming examination period, the Kenneth Dike Library will extend its operating hours from 6:00 AM to 12:00 AM, Monday through Sunday.",
    category: "announcement",
    priority: "high",
    author: "Mrs. Folake Adeyemi",
    publishDate: "2024-01-12",
    readTime: "2 min read",
    tags: ["Library Hours", "Exams", "Student Services"],
    likes: 89,
    views: 890,
  },
  {
    id: "3",
    title: "🎓 Research Workshop: Advanced Database Searching",
    excerpt:
      "Join us for an intensive workshop on advanced database searching techniques for graduate students and researchers.",
    content:
      "This comprehensive workshop will cover advanced search strategies, Boolean operators, citation management, and effective use of academic databases.",
    category: "event",
    priority: "medium",
    author: "Dr. Helen Oyeronke",
    publishDate: "2024-01-10",
    readTime: "4 min read",
    tags: ["Workshop", "Research", "Database", "Training"],
    image: "/placeholder.svg?height=300&width=500&text=Research+Workshop",
    likes: 67,
    views: 456,
  },
  {
    id: "4",
    title: "🔧 System Maintenance: January 20-21",
    excerpt: "Scheduled maintenance of our online catalog and digital resources will occur this weekend.",
    content:
      "Our IT team will perform essential system updates and maintenance. Some digital services may be temporarily unavailable during this period.",
    category: "maintenance",
    priority: "medium",
    author: "Mr. Kunle Adebisi",
    publishDate: "2024-01-08",
    readTime: "1 min read",
    tags: ["Maintenance", "System Update", "Digital Services"],
    likes: 23,
    views: 234,
  },
  {
    id: "5",
    title: "📚 New Book Acquisitions: African Literature Collection",
    excerpt:
      "We have added over 500 new titles to our African Literature collection, featuring contemporary and classic works.",
    content:
      "Our latest acquisition includes works by renowned African authors, critical essays, and rare manuscripts that will enhance research in African studies.",
    category: "acquisition",
    priority: "medium",
    author: "Ms. Adunni Olatunji",
    publishDate: "2024-01-05",
    readTime: "3 min read",
    tags: ["New Books", "African Literature", "Collection Development"],
    image: "/placeholder.svg?height=300&width=500&text=African+Literature+Books",
    likes: 156,
    views: 1100,
  },
  {
    id: "6",
    title: "📋 Updated Library Borrowing Policy",
    excerpt: "Important changes to our borrowing policy take effect February 1st. Please review the new guidelines.",
    content:
      "We have updated our borrowing policy to better serve our community. Key changes include extended loan periods for faculty and new renewal options.",
    category: "policy",
    priority: "high",
    author: "Dr. Mercy Ajibola",
    publishDate: "2024-01-03",
    readTime: "5 min read",
    tags: ["Policy Update", "Borrowing", "Guidelines"],
    likes: 78,
    views: 567,
  },
  {
    id: "7",
    title: "🏆 UI Library Wins National Excellence Award",
    excerpt:
      "The University of Ibadan Library System has been recognized with the National Academic Library Excellence Award 2024.",
    content:
      "This prestigious award recognizes our commitment to academic excellence, innovative services, and outstanding contribution to higher education in Nigeria.",
    category: "achievement",
    priority: "high",
    author: "Prof. Biodun Ogundimu",
    publishDate: "2024-01-01",
    readTime: "4 min read",
    tags: ["Award", "Recognition", "Excellence"],
    image: "/placeholder.svg?height=300&width=500&text=Excellence+Award+2024",
    likes: 234,
    views: 2100,
  },
  {
    id: "8",
    title: "📖 Information Literacy Week 2024",
    excerpt:
      "Join us for a week-long celebration of information literacy with workshops, seminars, and interactive sessions.",
    content:
      "Information Literacy Week features daily workshops on research skills, digital literacy, and academic writing for students and faculty.",
    category: "event",
    priority: "medium",
    author: "Dr. Kunle Adebisi",
    publishDate: "2023-12-28",
    readTime: "3 min read",
    tags: ["Information Literacy", "Workshop", "Education"],
    image: "/placeholder.svg?height=300&width=500&text=Information+Literacy+Week",
    likes: 92,
    views: 678,
  },
]

const categoryIcons = {
  announcement: Bell,
  event: Calendar,
  maintenance: Settings,
  acquisition: BookOpen,
  policy: Users,
  achievement: Award,
}

const categoryColors = {
  announcement: "from-blue-400 to-blue-600",
  event: "from-green-400 to-green-600",
  maintenance: "from-orange-400 to-orange-600",
  acquisition: "from-purple-400 to-purple-600",
  policy: "from-red-400 to-red-600",
  achievement: "from-amber-400 to-amber-600",
}

const priorityColors = {
  high: "bg-gradient-to-r from-red-400 to-pink-500",
  medium: "bg-gradient-to-r from-yellow-400 to-orange-500",
  low: "bg-gradient-to-r from-green-400 to-emerald-500",
}

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [likedItems, setLikedItems] = useState<string[]>([])
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>([])

  const handleLike = (id: string) => {
    setLikedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleBookmark = (id: string) => {
    setBookmarkedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredNews = newsData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 via-blue-50 to-cyan-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Animated Hero Section */}
        <div className="text-center mb-16 relative overflow-hidden">
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-20 animate-bounce delay-1000"></div>
            <div className="absolute bottom-20 right-1/3 w-14 h-14 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full opacity-20 animate-pulse delay-500"></div>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 px-6 py-3 rounded-full mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Sparkles className="h-6 w-6 text-pink-500 animate-spin" />
              <span className="text-lg font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Stay Updated & Inspired
              </span>
              <Bell className="h-6 w-6 text-purple-500 animate-bounce" />
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent animate-pulse">
                News &
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Announcements
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover the latest updates, exciting events, and amazing developments at the
              <span className="font-bold text-purple-600"> University of Ibadan Library System</span> ✨
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  {newsData.length}
                </div>
                <div className="text-sm text-gray-500">Latest Updates</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  {newsData.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">Total Views</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  {newsData.reduce((sum, item) => sum + item.likes, 0)}
                </div>
                <div className="text-sm text-gray-500">Community Likes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Fun Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-12 border border-white/20 hover:shadow-3xl transition-all duration-500">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 h-6 w-6 group-hover:text-purple-600 transition-colors" />
              <Input
                placeholder="🔍 Search for amazing news and updates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 placeholder:text-purple-400"
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedCategory("all")}
                className={`rounded-2xl px-6 transition-all duration-300 hover:scale-105 ${
                  selectedCategory === "all"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    : "border-purple-200 hover:border-purple-500 hover:text-purple-600 bg-white/50"
                }`}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                All News
              </Button>
              <Button
                variant={selectedCategory === "announcement" ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedCategory("announcement")}
                className={`rounded-2xl px-6 transition-all duration-300 hover:scale-105 ${
                  selectedCategory === "announcement"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                    : "border-blue-200 hover:border-blue-500 hover:text-blue-600 bg-white/50"
                }`}
              >
                <Bell className="h-5 w-5 mr-2" />
                Announcements
              </Button>
              <Button
                variant={selectedCategory === "event" ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedCategory("event")}
                className={`rounded-2xl px-6 transition-all duration-300 hover:scale-105 ${
                  selectedCategory === "event"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    : "border-green-200 hover:border-green-500 hover:text-green-600 bg-white/50"
                }`}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Events
              </Button>
            </div>
          </div>
        </div>

        {/* Featured News with Fun Animations */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-2 h-8 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
            <h2 className="text-4xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
             Featured Stories
            </h2>
            <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full animate-pulse delay-500"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {filteredNews.slice(0, 2).map((item, index) => {
              const Icon = categoryIcons[item.category]
              const isLiked = likedItems.includes(item.id)
              const isBookmarked = bookmarkedItems.includes(item.id)

              return (
                <Card
                  key={item.id}
                  className={`overflow-hidden hover:shadow-2xl transition-all duration-500 group border-0 bg-gradient-to-br from-white to-gray-50 hover:scale-105 ${
                    index === 0 ? "lg:rotate-1 hover:rotate-0" : "lg:-rotate-1 hover:rotate-0"
                  }`}
                >
                  {item.image && (
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <div
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold text-sm bg-gradient-to-r ${categoryColors[item.category]} shadow-lg`}
                        >
                          <Icon className="h-4 w-4" />
                          {item.category.toUpperCase()}
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div
                          className={`w-4 h-4 rounded-full ${priorityColors[item.priority]} shadow-lg animate-pulse`}
                        ></div>
                      </div>
                      <div className="absolute bottom-4 right-4 flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleLike(item.id)}
                          className={`rounded-full p-2 backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                            isLiked ? "bg-red-500 text-white" : "bg-white/80 text-gray-700"
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleBookmark(item.id)}
                          className={`rounded-full p-2 backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                            isBookmarked ? "bg-yellow-500 text-white" : "bg-white/80 text-gray-700"
                          }`}
                        >
                          <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <Calendar className="h-4 w-4 text-purple-500" />
                        {new Date(item.publishDate).toLocaleDateString()}
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          {item.views.toLocaleString()} views
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4 text-blue-500" />
                        {item.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-purple-600 transition-colors leading-tight">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-lg leading-relaxed">{item.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="h-4 w-4 text-indigo-500" />
                        <span className="font-medium">{item.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Heart className="h-4 w-4 text-red-500" />
                          {item.likes}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:text-white group-hover:border-transparent transition-all duration-300 rounded-full bg-transparent"
                        >
                          Read More 
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 hover:from-purple-200 hover:to-pink-200 transition-all duration-300 hover:scale-105 rounded-full"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* All News with Masonry Layout */}
        <div>
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
            <h2 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
             Latest Updates
            </h2>
            <div className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-teal-500 rounded-full animate-pulse delay-500"></div>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {filteredNews.slice(2).map((item) => {
              const Icon = categoryIcons[item.category]
              const isLiked = likedItems.includes(item.id)
              const isBookmarked = bookmarkedItems.includes(item.id)

              return (
                <Card
                  key={item.id}
                  className="break-inside-avoid hover:shadow-2xl transition-all duration-500 group border-0 bg-gradient-to-br from-white to-gray-50 hover:scale-105 mb-8"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white font-bold text-sm bg-gradient-to-r ${categoryColors[item.category]} shadow-lg`}
                      >
                        <Icon className="h-4 w-4" />
                        {item.category.toUpperCase()}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleLike(item.id)}
                          className={`rounded-full p-2 transition-all duration-300 hover:scale-110 ${
                            isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleBookmark(item.id)}
                          className={`rounded-full p-2 transition-all duration-300 hover:scale-110 ${
                            isBookmarked ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"
                          }`}
                        >
                          <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="rounded-full p-2 text-gray-400 hover:text-blue-500 transition-all duration-300 hover:scale-110"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {item.image && (
                      <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{item.excerpt}</p>

                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4 text-indigo-500" />
                          {item.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-purple-500" />
                          {new Date(item.publishDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Heart className="h-4 w-4 text-red-500" />
                          {item.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          {item.views}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 hover:from-blue-200 hover:to-cyan-200 transition-all duration-300 hover:scale-105 rounded-full"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-cyan-500 group-hover:text-white group-hover:border-transparent transition-all duration-300 rounded-full bg-transparent"
                    >
                      Read Full Story ✨
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Fun Load More Section */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <Sparkles className="h-5 w-5 animate-spin" />
              <span>Want to see more amazing content?</span>
              <Sparkles className="h-5 w-5 animate-spin" />
            </div>
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white px-12 py-4 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110"
            >
              Load More Exciting News
              <Sparkles className="h-6 w-6 ml-2 animate-pulse" />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
