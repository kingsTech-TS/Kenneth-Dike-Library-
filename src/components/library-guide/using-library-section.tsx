import { Search, Wifi, BookOpen, Globe } from 'lucide-react'

export default function UsingLibrarySection() {
  const steps = [
    {
      icon: Search,
      title: 'Accessing OPAC',
      description: 'Use our online catalog to search for books and materials in our collection. Visit the public terminals or access online.',
    },
    {
      icon: Wifi,
      title: 'Connecting to WiFi',
      description: 'Connect to "UI-Library" network and authenticate using your university credentials for free high-speed internet.',
    },
    {
      icon: BookOpen,
      title: 'Borrowing & Returning',
      description: 'Register your library account at the circulation desk. Borrow books according to your user category and return before the due date.',
    },
    {
      icon: Globe,
      title: 'Off-Campus Access',
      description: 'Access electronic resources from off-campus using your VPN login. Contact the IT desk for assistance.',
    },
  ]

  return (
    <section className="py-20 px-4 md:px-8 md:ml-64 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#002E5D] mb-12">Using the Library</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div key={idx} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-gradient-to-br from-[#002E5D] to-[#004080] text-[#d4af37]">
                    <Icon size={28} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#002E5D] mb-2">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* OPAC Search Mockup */}
        <div className="bg-gradient-to-br from-[#002E5D] to-[#004080] p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-white mb-6">Online Public Access Catalog (OPAC)</h3>
          <div className="bg-white p-6 rounded-lg">
            <input
              type="text"
              placeholder="Search by title, author, or keyword..."
              className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
