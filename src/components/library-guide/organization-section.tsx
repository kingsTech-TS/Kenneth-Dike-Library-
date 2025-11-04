export default function OrganizationSection() {
  const classification = [
    { code: 'A', name: 'General Works', examples: 'Encyclopedias, General knowledge' },
    { code: 'B', name: 'Philosophy & Religion', examples: 'Philosophy, Psychology, Religion' },
    { code: 'C', name: 'Auxiliary Sciences', examples: 'Archaeology, Geography' },
    { code: 'D', name: 'History & Geography', examples: 'World history, Biography' },
    { code: 'E-F', name: 'Americas History', examples: 'American and Canadian history' },
    { code: 'G', name: 'Geography & Maps', examples: 'Maps, Travel, Anthropology' },
    { code: 'H', name: 'Social Sciences', examples: 'Economics, Sociology, Education' },
    { code: 'J', name: 'Political Science', examples: 'Government, Politics' },
    { code: 'K', name: 'Law', examples: 'Legal studies, Constitutional law' },
    { code: 'L', name: 'Education', examples: 'Teaching, Academic subjects' },
    { code: 'M', name: 'Music', examples: 'Musical composition, Performance' },
    { code: 'N', name: 'Fine Arts', examples: 'Painting, Sculpture, Architecture' },
    { code: 'P', name: 'Language & Literature', examples: 'Languages, Literature, Drama' },
    { code: 'Q', name: 'Science', examples: 'Mathematics, Physics, Chemistry' },
    { code: 'R', name: 'Medicine', examples: 'Medicine, Public health' },
    { code: 'S', name: 'Agriculture', examples: 'Agriculture, Animal husbandry' },
    { code: 'T', name: 'Technology', examples: 'Engineering, Applied sciences' },
    { code: 'U', name: 'Military Science', examples: 'Military strategy, Warfare' },
    { code: 'V', name: 'Naval Science', examples: 'Naval engineering, Maritime' },
    { code: 'Z', name: 'Bibliography & Info', examples: 'Library science, Bibliography' },
  ]

  return (
    <section className="py-20 px-4 md:px-8 md:ml-64 bg-gradient-to-br from-[#f8f9fa] to-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#002E5D] mb-12">Organization of Materials</h2>

        <p className="text-lg text-gray-700 mb-8">
          Our library uses the Library of Congress (LC) Classification System to organize materials. This system divides knowledge into 21 broad categories, each represented by a letter of the alphabet.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#002E5D] text-white">
                <th className="px-6 py-4 text-left font-bold">Class Code</th>
                <th className="px-6 py-4 text-left font-bold">Category</th>
                <th className="px-6 py-4 text-left font-bold">Examples</th>
              </tr>
            </thead>
            <tbody>
              {classification.map((item, idx) => (
                <tr
                  key={idx}
                  className={`border-b transition-colors ${idx % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-white'}`}
                >
                  <td className="px-6 py-4">
                    <span className="font-bold text-[#d4af37] text-lg">{item.code}</span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-[#002E5D]">{item.name}</td>
                  <td className="px-6 py-4 text-gray-700">{item.examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
