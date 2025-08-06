import { Building2, BookOpen } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="relative">
            <BookOpen className="h-16 w-16 text-white animate-spin" />
            <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
          </div>
          <div className="relative">
            <Building2 className="h-16 w-16 text-white animate-bounce" />
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-30 animate-pulse animation-delay-1000"></div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">Loading Print Resources</h2>
        <p className="text-gray-300">Preparing your library floor guide...</p>

        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce animation-delay-200"></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce animation-delay-400"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
