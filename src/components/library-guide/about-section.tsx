'use client'

import { motion } from "framer-motion"

export default function AboutSection() {
  return (
    <section className="py-20 px-4 md:px-8 md:ml-64 bg-white transition-all duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-[#002E5D] mb-8"
        >
          About Kenneth Dike Library
        </motion.h2>

        {/* Library Overview */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6 text-gray-700 text-lg leading-relaxed mb-12"
        >
          <p>
            The University of Ibadan Library reserves the responsibility to acquire, organise, and provide accessible,
            high-quality educational resources — including books, journals, reports, monographs, and electronic-based
            materials — alongside effective services that support the teaching, learning, and research mandates of the institution.
          </p>

          <p>
            Pursuant to the actualization of this responsibility, the University maintains a three-tier library system
            with the <span className="font-semibold text-[#002E5D]">Kenneth Dike Library (KDL)</span> as the main library
            and central hub of the system. Other libraries in the system include the
            <span className="font-semibold text-[#002E5D]"> Latunde Odeku Medical Library</span>, located about eight (8)
            kilometers away at the College of Medicine, and twenty-six (26) Faculty, Departmental, and Institute libraries.
          </p>

          <p>
            Over the years, the physical collections of these libraries have grown significantly, and the current
            aggregate holding of learning resources in the system is estimated at well over two million volumes. These
            consist of books, journals, dissertations, technical reports, and monographs, including materials of
            historical value such as the Africana collections.
          </p>

          <p>
            The University Library deploys modern technologies alongside analogue resources to provide hybrid library
            services that meet the exceptional needs and aspirations of its diverse and sophisticated clientele.
            In addition to the physical collections, the Library subscribes to several electronic databases and curates
            many other relevant sources to meet specific academic needs of the University, including{" "}
            <span className="font-semibold text-[#002E5D]">ProQuest, Research4Life,</span> and{" "}
            <span className="font-semibold text-[#002E5D]">Emerald</span>.
          </p>

          <p>
            Access to some of these databases is Internet Protocol (IP) address controlled, meaning they can be accessed
            by logging into the University network while on campus. Outside the campus, users can access them through
            login credentials provided and moderated by the Library.
          </p>

          <p>
            Furthermore, routine activities and sections of the Library are automated. Bibliographic records of the
            physical collections are maintained in digital formats, ensuring easy retrieval and access to Library
            resources anytime and anywhere. The{" "}
            <span className="font-semibold text-[#002E5D]">
              University of Ibadan Integrated Library System (UIILS)
            </span>{" "}
            is the library management software deployed to manage Library operations effectively.
          </p>

          <p>
            The Library catalogue can be accessed conveniently from offices, classrooms, and homes at any time,
            provided there is internet connectivity. Additionally, the digitization of collections — particularly rare
            materials — is ongoing to ensure long-term preservation and accessibility.
          </p>
        </motion.div>

        {/* University Librarian Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#002E5D] to-[#004080] text-white p-8 rounded-2xl mb-12 shadow-lg"
        >
          <p className="text-xl italic mb-4 leading-relaxed">
            "It is my earnest desire that you take full advantage of the robust Library System in the University and
            maximize the use of its resources for your academic endeavours."
          </p>
          <p className="font-semibold text-right mb-2">— Dr. Mercy Ariomerebi Iroaganachi</p>
          <p className="text-right text-sm italic">University Librarian</p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-[#f8f9fa] p-8 rounded-2xl border border-gray-100 shadow-sm"
        >
          <h3 className="text-2xl font-bold text-[#002E5D] mb-4">Our Mission</h3>
          <p className="text-gray-700 leading-relaxed">
            To provide comprehensive information resources and services that support teaching, learning, research, and
            community engagement at the University of Ibadan, while promoting intellectual freedom and lifelong learning.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
