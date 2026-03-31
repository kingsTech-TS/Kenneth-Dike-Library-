"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import ChatBotTemplate from "@/components/ChatBotTemplate"
import { motion } from "framer-motion"
import { Mail, Trash2, AlertTriangle, CheckCircle2, Info, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function DeleteAccountClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-blue-50">
      <Header />
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          >
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 px-8 py-10 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
                <Trash2 className="h-8 w-8 text-blue-200" />
                Delete Your Account – KDLUI
              </h1>
              <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">
                <span className="font-semibold text-white">KDLUI (Kenneth Dike Library, University of Ibadan)</span> respects your privacy and your right to control your personal data.
              </p>
            </div>

            <div className="p-8 md:p-10 space-y-10">
              {/* Request Deletion */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-2">
                  <Mail className="h-6 w-6 text-indigo-600" />
                  How to Request Account Deletion
                </h2>
                <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-lg">
                  <p className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" />
                    Email Request
                  </p>
                  <ul className="space-y-3 text-gray-700 ml-6">
                    <li className="flex items-start gap-2">
                      <span className="font-semibold min-w-[120px]">Send email to:</span>
                      <a href="mailto:uilibraryapp@gmail.com" className="text-indigo-600 hover:underline font-bold">uilibraryapp@gmail.com</a>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold min-w-[120px]">Subject:</span>
                      <span className="italic">Account Deletion Request – KDLUI</span>
                    </li>
                    <li className="flex flex-col gap-2">
                      <span className="font-semibold">Include:</span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-4 mt-1">
                        <li className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500" /> Your full name
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500" /> Registered email address
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500" /> Library ID (if applicable)
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500" /> Clear request to delete account
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Data Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Trash2 className="h-5 w-5 text-red-500" />
                    What Data Will Be Deleted
                  </h2>
                  <ul className="space-y-2 text-gray-600">
                    {["User profile (name, email, contact details)", "Account credentials", "Borrowing history and preferences", "User-submitted data"].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-400" /> {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-500" />
                    What Data May Be Retained
                  </h2>
                  <ul className="space-y-2 text-gray-600">
                    {["Legal and regulatory records", "Security and fraud prevention data", "Anonymous analytics data"].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-400" /> {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Retention & Warning */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Retention Period</h2>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2 text-sm leading-relaxed">
                      <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                      Requests processed within 7–30 days
                    </li>
                    <li className="flex items-start gap-2 text-sm leading-relaxed">
                      <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                      Backup data retained up to 90 days
                    </li>
                    <li className="flex items-start gap-2 text-sm leading-relaxed">
                      <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                      Some records retained longer if required by law
                    </li>
                  </ul>
                </section>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg flex items-start gap-4 self-center">
                  <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-amber-900 block mb-1 text-lg">Important Notice</strong>
                    <p className="text-amber-800 text-sm leading-relaxed">
                      Account deletion is permanent and cannot be undone. All access to library digital resources linked to this account will be revoked.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Us */}
              <section className="bg-blue-50 p-8 rounded-xl border border-blue-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-blue-900 mb-2">Contact Us</h2>
                  <p className="text-blue-800 font-medium">Email: librarykdl@mail.ui.edu.ng</p>
                  <p className="text-blue-700 text-sm mt-1 italic">Kenneth Dike Library, University of Ibadan, Nigeria</p>
                </div>
                <div className="flex-shrink-0">
                  <div className="p-4 bg-white rounded-full shadow-md">
                    <Image src="/logo/Kdl_logo.png" alt="KDL Logo" width={48} height={48} className="object-contain" />
                  </div>
                </div>
              </section>
            </div>

            {/* Footer Tagline */}
            <div className="bg-gray-50 border-t border-gray-100 py-6 text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} KDLUI – Kenneth Dike Library, University of Ibadan
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <ChatBotTemplate />
      <ScrollToTop />
    </div>
  )
}
