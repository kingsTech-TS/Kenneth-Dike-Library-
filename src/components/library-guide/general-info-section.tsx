'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function GeneralInfoSection() {
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null)

  const infoSections = [
    {
      title: 'Registration',
      content: (
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>All students and staff are required to fill the library registration form and produce two passport photographs. This will lead to the issuance of a library identification card valid for the duration of a programme.</li>
          <li>Non-university members who wish to use the library regularly must apply to the librarian for special permission. This is granted only in exceptional cases, with preference given to scholarship and research needs.</li>
          <li>Each reader is registered with borrowing privileges.</li>
          <li>Books must be returned immediately when recalled.</li>
          <li>Books may not be taken away from Ibadan without prior permission of the University Librarian.</li>
          <li>All books borrowed should be returned before a reader goes on leave or leaves Ibadan.</li>
          <li>Reader’s identification cards are not transferable, and all borrowing/renewals must be done in person.</li>
          <li>All users must present their library identification card upon request.</li>
          <li>Readers must submit their bags, books, or materials for checking when leaving the library.</li>
          <li>Silence is required in and around the library. Cell phones must be switched off as readers enter the library.</li>
          <li>Edibles of all kinds are prohibited in the library (except in the coffee room).</li>
        </ul>
      ),
    },
    {
      title: 'Borrowing',
      content: (
        <div className="space-y-4 text-gray-700">
          <p>Readers can identify books from the shelves after consulting the card catalogues or OPAC.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Online borrowing of a book can be done from any location. The borrowed book must be physically collected at the Circulation Desk.</li>
            <li>For manual borrowing:
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Identify the book from the shelves after consulting the catalogues.</li>
                <li>Ensure the book is in good condition before taking it to the Circulation Desk.</li>
                <li>Show your library identification card to the assistant.</li>
                <li>Fill the loan cards and ensure the date-due slip is correctly stamped.</li>
                <li>Ensure the loan is properly recorded in your account on the computer system.</li>
              </ul>
            </li>
            <li>Do not allow others to use your library identification card.</li>
          </ul>
          <p className="font-semibold mt-2">NOTE: The book is now in your keeping. Ensure the “date-due” slip does not drop out of the book.</p>
          <p><strong>Number of Loans Permitted:</strong> 4 books for undergraduates, 6 for postgraduate/research students, and 10 for academic/faculty staff.</p>
          <p><strong>Duration of Loans:</strong> 2 weeks for undergraduates, 1 month for postgraduate/research/academic staff. Renewals are allowed once if not requested by others.</p>
        </div>
      ),
    },
    {
      title: 'Returning of Books',
      content: (
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Books must be returned before or on the due date to the Lending Desk where they were borrowed.</li>
          <li>Readers must ensure the library assistant physically receives the book.</li>
          <li>Books must be returned in good condition.</li>
        </ul>
      ),
    },
    {
      title: 'Overdue Notices and Fines',
      content: (
        <div className="space-y-3 text-gray-700">
          <p>The date imprinted in the transaction slip serves as the only notice of due date.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>A first overdue notice is sent one week after the due date.</li>
            <li>A second (final) notice assumes the book is lost and demands replacement.</li>
            <li>A fine of ₦50 per book per day applies for overdue materials.</li>
            <li>Lost or damaged books should be reported immediately and paid for at the Circulation Desk.</li>
            <li>Stealing, mutilation, or defacing of books is regarded as a serious offence.</li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Holiday Loans',
      content: (
        <p className="text-gray-700">
          Readers resident in Ibadan can apply to the University Librarian through the Circulation Librarian for book loans during holidays, under the usual loan periods.
        </p>
      ),
    },
    {
      title: 'Inter-Library Loans',
      content: (
        <p className="text-gray-700">
          Required items not held by the library can be obtained from another library through the Reference Librarian, who will coordinate with a sister library. Once received, the material is treated as a normal loan.
        </p>
      ),
    },
    {
      title: 'Carrels',
      content: (
        <p className="text-gray-700">
          A limited number of carrels are available, primarily for graduate students. Applications should be made to the University Librarian through the Reference Librarian for an assigned period.
        </p>
      ),
    },
    {
      title: 'Lost and Found Items',
      content: (
        <p className="text-gray-700">
          Lost and found items are kept at the Circulation Desk. Identifiable items are returned to owners, while unclaimed items are forwarded to the Information Desk.
        </p>
      ),
    },
    {
      title: 'Library Rules and Regulations',
      content: (
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>No eating or drinking in the library.</li>
          <li>Perfect silence is required.</li>
          <li>Mobile phones can be used only in silence mode.</li>
          <li>No reservation of seats.</li>
          <li>No group discussions except in the chat room.</li>
          <li>Users must comply with rules governing computer usage.</li>
          <li>Stealing is a serious offence.</li>
          <li>Library identification cards must be shown at check points.</li>
          <li>Library identification cards are not transferable.</li>
          <li>Users should collect bag tags at the check point.</li>
          <li>Do not leave valuables in your bag when checking in.</li>
          <li>Bags should be kept in the cloak room.</li>
          <li>All materials must be properly borrowed before taking them out.</li>
          <li>Smoking is strictly prohibited.</li>
        </ul>
      ),
    },
    {
      title: 'Theft or Mutilation',
      content: (
        <p className="text-gray-700">
          Attempted theft or mutilation of any library materials is a serious offence. It attracts heavy penalties from the management of the library and the university authority.
        </p>
      ),
    },
  ]

  const hours = [
    { session: 'Regular Session', time: 'Monday - Friday: 7:00 AM - 10:00 PM' },
    { session: 'Regular Session', time: 'Saturday: 9:00 AM - 6:00 PM' },
    { session: 'Vacation', time: 'Monday - Friday: 8:00 AM - 5:00 PM' },
    { session: 'Vacation', time: 'Closed on Sundays and Public Holidays' },
  ]

  return (
    <section className="py-20 px-4 md:px-8 md:ml-64 bg-gradient-to-br from-[#f8f9fa] to-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#002E5D] mb-12">General Information</h2>

        {/* Opening Hours */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-[#002E5D] mb-6">Opening Hours</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {hours.map((hour, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border-l-4 border-[#d4af37] shadow-md">
                <p className="font-semibold text-[#002E5D] mb-2">{hour.session}</p>
                <p className="text-gray-700">{hour.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rules and Regulations */}
        <div>
          <h3 className="text-3xl font-bold text-[#002E5D] mb-6">Rules and Guidelines</h3>
          <div className="space-y-3">
            {infoSections.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200">
                <button
                  onClick={() =>
                    setExpandedAccordion(expandedAccordion === item.title ? null : item.title)
                  }
                  className="w-full flex items-center justify-between text-left hover:shadow-lg transition-all"
                >
                  <h4 className="font-bold text-[#002E5D]">{item.title}</h4>
                  <ChevronDown
                    className={`text-[#d4af37] transition-transform duration-300 ${
                      expandedAccordion === item.title ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedAccordion === item.title ? 'max-h-[2000px] mt-4 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
