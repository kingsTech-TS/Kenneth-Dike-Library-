"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Calendar, Camera } from "lucide-react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import { db } from "../../../lib/firebase";

interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  date: string;
  photographer: string;
  counter?: number;
}

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // 🔹 Fetch gallery images from Firestore
  useEffect(() => {
    const q = query(collection(db, "galleryImages"), orderBy("counter", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as GalleryItem[];
      setGalleryImages(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const nextImage = () => {
    if (selectedImage && galleryImages.length) {
      const currentIndex = galleryImages.findIndex(
        (img) => img.id === selectedImage.id
      );
      const nextIndex = (currentIndex + 1) % galleryImages.length;
      setSelectedImage(galleryImages[nextIndex]);
    }
  };

  const prevImage = () => {
    if (selectedImage && galleryImages.length) {
      const currentIndex = galleryImages.findIndex(
        (img) => img.id === selectedImage.id
      );
      const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      setSelectedImage(galleryImages[prevIndex]);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "Escape") setSelectedImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedImage, galleryImages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Background Animation */}
      <AnimatedBackground />

      {/* Header */}
      <motion.header
        className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
      </motion.header>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <HeroSection totalPhotos={galleryImages.length} />

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading gallery...</div>
        ) : galleryImages.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No gallery items found.
          </div>
        ) : (
          <motion.div
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {galleryImages.map((image, index) => (
              <GalleryCard
                key={image.id}
                image={image}
                index={index}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      <GalleryLightbox
        selectedImage={selectedImage}
        onClose={() => setSelectedImage(null)}
        onNext={nextImage}
        onPrev={prevImage}
      />

      <Footer />
      <ScrollToTop />
    </div>
  );
}

// 🟣 Reusable Components (UI unchanged)
function HeroSection({ totalPhotos }: { totalPhotos: number }) {
  return (
    <motion.div
      className="text-center mb-12 sm:mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Camera className="w-4 h-4 mr-2" />
        Visual Journey
      </motion.div>

      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Library{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600">
          Gallery
        </span>
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Explore the beauty, innovation, and vibrant life of Kenneth Dike Library through our curated collection of
        stunning photographs.
      </motion.p>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <Stat label="Photos" value={totalPhotos} color="purple" />
        <Stat label="Years" value="75" color="pink" />
        <Stat label="Latest" value="2024" color="orange" />
      </motion.div>
    </motion.div>
  );
}

function Stat({ label, value, color }: { label: string; value: string | number; color: string }) {
  const colorMap: any = {
    purple: "text-purple-600",
    pink: "text-pink-600",
    orange: "text-orange-600",
  };
  return (
    <motion.div
      className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className={`text-3xl font-bold ${colorMap[color]}`}>{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </motion.div>
  );
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-4 h-4 rounded-full ${
            ["bg-purple-300/20", "bg-pink-300/20", "bg-orange-300/20", "bg-blue-300/20"][i % 4]
          }`}
          initial={{
            x: Math.random() * 1920,
            y: Math.random() * 1080,
          }}
          animate={{
            x: Math.random() * 1920,
            y: Math.random() * 1080,
          }}
          transition={{
            duration: Math.random() * 25 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function GalleryCard({
  image,
  index,
  onClick,
}: {
  image: GalleryItem;
  index: number;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      className="group cursor-pointer break-inside-avoid"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500">
        <motion.img
          src={image.imageUrl}
          alt={image.title}
          className="w-full h-auto object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
            {image.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {image.description}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {image.date}
            </div>
            <div className="flex items-center gap-1">
              <Camera className="h-3 w-3" />
              {image.photographer}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function GalleryLightbox({
  selectedImage,
  onClose,
  onNext,
  onPrev,
}: {
  selectedImage: GalleryItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  if (!selectedImage) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="hidden lg:flex w-full h-full items-center justify-center p-6 xl:p-8">
          <button
            className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>

          <button
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <button
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          <motion.div
            className="w-full max-w-7xl flex gap-8 items-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1 flex items-center justify-center">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
            </div>

            <div className="w-96 xl:w-[28rem] flex-shrink-0">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 xl:p-8 shadow-2xl max-h-[80vh] overflow-y-auto">
                <h3 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-700 text-base xl:text-lg leading-relaxed mb-6">
                  {selectedImage.description}
                </p>
                <div className="flex flex-col gap-3 text-sm xl:text-base text-gray-500 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>{selectedImage.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    <span>{selectedImage.photographer}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
