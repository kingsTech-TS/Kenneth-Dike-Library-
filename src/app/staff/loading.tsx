import { Card } from "@/components/ui/card"

export default function StaffLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-indigo-50">
      {/* Hero Section Skeleton */}
      <div className="relative bg-gradient-to-br from-indigo-50 via-amber-50 to-blue-50 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-16 bg-white/20 rounded-lg mb-6 animate-pulse"></div>
          <div className="h-8 bg-white/20 rounded-lg max-w-3xl mx-auto mb-8 animate-pulse"></div>
          <div className="flex justify-center space-x-8">
            <div className="h-6 w-32 bg-white/20 rounded animate-pulse"></div>
            <div className="h-6 w-32 bg-white/20 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Staff Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 28 }).map((_, index) => (
            <Card key={index} className="h-80 overflow-hidden bg-white shadow-lg border-0">
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-6 space-y-3">
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Department Summary Skeleton */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded mx-auto w-64 mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded mx-auto max-w-2xl animate-pulse"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
