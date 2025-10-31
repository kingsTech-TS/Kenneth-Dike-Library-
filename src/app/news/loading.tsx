import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function NewsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-indigo-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-32 mx-auto mb-4 rounded-full" />
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-[600px] mx-auto" />
        </div>

        {/* Search and Filter Skeleton */}
        <Card className="mb-8 border-gray-100">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <Skeleton className="h-12 flex-1" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-28" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Overview Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="border-gray-200">
              <CardContent className="p-4 text-center">
                <Skeleton className="w-12 h-12 rounded-full mx-auto mb-3" />
                <Skeleton className="h-4 w-16 mx-auto mb-1" />
                <Skeleton className="h-3 w-12 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured News Skeleton */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="w-1 h-6 rounded-full" />
            <Skeleton className="h-8 w-40" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <Card key={i} className="overflow-hidden border-gray-200">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                  <div className="flex gap-1">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-18" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Updates Skeleton */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="w-1 h-6 rounded-full" />
            <Skeleton className="h-8 w-40" />
          </div>
          <div className="grid gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="border-gray-200">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="w-2 h-2 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <Skeleton className="h-6 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-3/4 mb-4" />
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex gap-4">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                        <Skeleton className="h-8 w-20" />
                      </div>
                      <div className="flex gap-1">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 w-14" />
                      </div>
                    </div>
                    <Skeleton className="md:w-48 h-32 rounded-lg" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Load More Skeleton */}
        <div className="text-center mt-12">
          <Skeleton className="h-12 w-40 mx-auto" />
        </div>
      </main>

      <Footer />
    </div>
  )
}
