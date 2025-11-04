export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#002E5D] via-[#004080] to-[#1a5fa0] flex items-center justify-center overflow-hidden md:ml-64">
      {/* Back to Home Button */}
      <div className="absolute top-6 right-6 z-20">
        <a
          href="/"
          className="bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white hover:text-[#002E5D] font-semibold py-2 px-4 rounded-lg transition-all duration-300"
        >
          Back to Home
        </a>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#d4af37] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 text-center px-4 md:px-8">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Kenneth Dike Library
        </h1>
        <p className="text-xl md:text-2xl text-[#d4af37] mb-4 font-semibold">
          University of Ibadan
        </p>
        <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-8">
          Discover knowledge, explore resources, and advance your research at Nigeria's premier university library.
        </p>

        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-[#d4af37] hover:bg-[#e6c547] text-[#002E5D] font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
        >
          Explore More
        </button>
      </div>
    </section>
  )
}
