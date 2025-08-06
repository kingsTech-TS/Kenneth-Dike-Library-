"use client"
import Header from "@/components/header"
import Hero from "@/components/hero"
import HistorySection from "@/components/history-section"
import Announcements from "@/components/announcements"
import LibraryHours from "@/components/library-hours"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <HistorySection />
        <Announcements />
        <LibraryHours />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
