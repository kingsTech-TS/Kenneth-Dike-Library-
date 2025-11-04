export default function NetworkSection() {
    const libraries = {
        college: [
            'Latunde Odeku Medical Library – College of Medicine, 8 km from Main Campus',
        'School of Business Library – Ajibode Extension, postgraduate focus',
        ],

        faculty: [
            'Agriculture/Renewable Natural Resources Library',
            'Faculty of Arts Library',
            'Faculty of Clinical Sciences Library',
            'Faculty of Education Library',
            'Faculty of Law Library',
            'Faculty of Pharmacy Library',
            'Faculty of Public Health Library',
            'Faculty of Science Library',
            'Faculty of Technology Library',
            'Faculty of the Social Sciences Library',
            'Faculty of Veterinary Medicine Library',
        ],
        institutes: [
            'Africa Regional Centre for Information Science (ARCIS) Library',
            'Institute of African Studies Library',
            'Institute of Education Library',
            'Institute of Peace and Strategic Studies (IPSS) Library',
            'WORDOC Library',
        ],
    }

    return (
        <section className="py-20 px-4 md:px-8 md:ml-64 bg-gradient-to-br from-[#f8f9fa] to-white">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-[#002E5D] mb-12">Library Network</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* College Libraries */}
                    <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#d4af37]">
                        <h3 className="text-2xl font-bold text-[#002E5D] mb-6">College Libraries</h3>
                        <ul className="space-y-3">
                            {libraries.college.map((lib, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <span className="text-[#d4af37] mt-1">▪</span>
                                    <span className="text-gray-700">{lib}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Faculty Libraries */}
                    <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#1a5fa0]">
                        <h3 className="text-2xl font-bold text-[#002E5D] mb-6">Faculty Libraries</h3>
                        <ul className="space-y-3">
                            {libraries.faculty.map((lib, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <span className="text-[#1a5fa0] mt-1">▪</span>
                                    <span className="text-gray-700">{lib}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Institute Libraries */}
                    <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#004080]">
                        <h3 className="text-2xl font-bold text-[#002E5D] mb-6">Institute & Centre Libraries</h3>
                        <ul className="space-y-3">
                            {libraries.institutes.map((lib, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <span className="text-[#004080] mt-1">▪</span>
                                    <span className="text-gray-700">{lib}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
