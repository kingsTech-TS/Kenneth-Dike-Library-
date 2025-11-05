'use client'

import ChatBotTemplate from '@/components/ChatBotTemplate'
import Header from '@/components/header'
import AboutSection from '@/components/library-guide/about-section'
import GeneralInfoSection from '@/components/library-guide/general-info-section'
import HeroSection from '@/components/library-guide/hero-section'
import NetworkSection from '@/components/library-guide/network-section'
import OrganizationSection from '@/components/library-guide/organization-section'
import ResourcesSection from '@/components/library-guide/resources-section'
import ServicesSection from '@/components/library-guide/services-section'
import SidebarNavigation from '@/components/library-guide/sidebar-navigation'
import TourSection from '@/components/library-guide/tour-section'
import UsingLibrarySection from '@/components/library-guide/using-library-section'
import ScrollToTop from '@/components/scroll-to-top'
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from 'react'


const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'general-info', label: 'General Info' },
    { id: 'tour', label: 'Tour' },
    { id: 'network', label: 'Network' },
    { id: 'resources', label: 'Resources' },
    { id: 'services', label: 'Services' },
    { id: 'using-library', label: 'Using Library' },
    { id: 'organization', label: 'Organization' },
]

export default function LibraryGuidePage() {
    const [activeSection, setActiveSection] = useState('home')

    useEffect(() => {
        const handleScroll = () => {
            const sectionElements = sections.map(s => document.getElementById(s.id)).filter(Boolean)

            for (let section of sectionElements) {
                if (!section) continue
                const rect = section.getBoundingClientRect()
                if (rect.top <= 100 && rect.bottom > 100) {
                    setActiveSection(section.id)
                    break
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-white to-[#f0f2f5]">

            <SidebarNavigation sections={sections} activeSection={activeSection} />

            <main className="w-full">
                <section id="home">
                    <HeroSection />
                </section>

                <section id="about">
                    <AboutSection />
                </section>

                <section id="general-info">
                    <GeneralInfoSection />
                </section>

                <section id="tour">
                    <TourSection />
                </section>

                <section id="network">
                    <NetworkSection />
                </section>

                <section id="resources">
                    <ResourcesSection />
                </section>

                <section id="services">
                    <ServicesSection />
                </section>

                <section id="using-library">
                    <UsingLibrarySection />
                </section>

                <section id="organization">
                    <OrganizationSection />
                </section>

                {/* <section id="gallery">
          <GallerySection />
        </section>
        
        <section id="contact">
          <ContactSection />
        </section> */}
            </main>

            <ChatBotTemplate />
            <ScrollToTop />
        </div>
    )
}
