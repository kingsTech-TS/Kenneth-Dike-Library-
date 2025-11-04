import { Zap, Users, BookMarked, Wifi, MessageSquare, Lock, Clock, User, Globe } from 'lucide-react'

export default function ServicesSection() {
  const services = [
    { icon: Lock, title: 'Inter-Library Loans', description: 'Borrow materials from partner institutions' },
    { icon: BookMarked, title: 'Bindery', description: 'Professional binding and preservation services' },
    { icon: Zap, title: 'Document Delivery', description: 'Fast digital delivery of research materials' },
    { icon: Users, title: 'E-Classroom', description: 'Digital learning and collaboration spaces' },
    { icon: Globe, title: 'E-Library', description: 'Access digital collections remotely' },
    { icon: MessageSquare, title: 'Chat Room', description: 'Virtual collaboration and discussion space' },
    { icon: Clock, title: '24-Hour Service', description: 'Round-the-clock access to library facilities' },
    { icon: Wifi, title: 'WiFi Access', description: 'Free high-speed internet connectivity' },
  ]

  return (
    <section className="py-20 px-4 md:px-8 md:ml-64 bg-gradient-to-br from-[#f8f9fa] to-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#002E5D] mb-12">Services & Facilities</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border-t-4 border-[#d4af37]"
              >
                <div className="mb-4 text-[#d4af37]">
                  <Icon size={32} />
                </div>
                <h3 className="text-lg font-bold text-[#002E5D] mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
