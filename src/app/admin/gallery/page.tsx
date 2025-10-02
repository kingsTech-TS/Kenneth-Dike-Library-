"use client"

import { useState, useEffect } from "react"
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore"
import { db } from "../../../../lib/firebase"
import { Button } from "@/components/ui/button"
import { Calendar, Edit, Trash2 } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"
import GalleryForm, { GalleryItem } from "./GalleryForm"

// GalleryCard Component
function GalleryCard({
  item,
  onEdit,
  onDelete,
}: {
  item: GalleryItem
  onEdit: (i: GalleryItem) => void
  onDelete: (id: string, title: string) => void
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.title || "Gallery Image"}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      <div className="p-4">
        <h2 className="text-lg font-semibold">{item.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>

        <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
          <Calendar size={14} /> <span>{item.date}</span>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            size="sm"
            variant="outline"
            className="bg-blue-600 hover:bg-blue-500 text-white"
            onClick={() => onEdit(item)}
            aria-label={`Edit ${item.title}`}
          >
            <Edit className="h-4 w-4 mr-1" /> Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="bg-red-600 hover:bg-red-500 text-white"
            onClick={() => onDelete(item.id!, item.title)}
            aria-label={`Delete ${item.title}`}
          >
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

// SkeletonCard for shimmer loading
function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
      </div>

      <div className="p-4 space-y-2">
        <div className="h-5 bg-gray-300 rounded w-3/4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer" />
        </div>
        <div className="h-3 bg-gray-300 rounded w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer" />
        </div>
        <div className="flex items-center gap-2 mt-3">
          <div className="h-3 bg-gray-300 rounded w-1/4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer" />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <div className="h-7 bg-gray-300 rounded w-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer" />
          </div>
          <div className="h-7 bg-gray-300 rounded w-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Main GalleryPage Component
export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  // Real-time Firestore subscription
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "galleryImages"),
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as GalleryItem),
        }))
        setItems(docs)
        setLoading(false)
      },
      (error) => {
        console.error("Realtime fetch error:", error)
        toast.error("Failed to fetch gallery items ❌")
        setLoading(false)
      }
    )
    return () => unsubscribe()
  }, [])

  const handleSave = () => {
    setShowForm(false)
    setSelectedItem(null)
    toast.success("Gallery item saved successfully 🎉")
  }

  const handleCancel = () => {
    setShowForm(false)
    setSelectedItem(null)
  }

  const handleDelete = async (id: string, title: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="text-sm">
            Are you sure you want to delete <b>{title}</b>?
          </p>
          <div className="flex gap-2 justify-end">
            <Button
              size="sm"
              variant="destructive"
              onClick={async () => {
                try {
                  await deleteDoc(doc(db, "galleryImages", id))
                  setItems((prev) => prev.filter((i) => i.id !== id))
                  toast.success(`"${title}" deleted ✅`)
                } catch (err) {
                  console.error("Delete error:", err)
                  toast.error("Failed to delete item ❌")
                }
                toast.dismiss(t.id)
              }}
            >
              Yes, Delete
            </Button>
            <Button size="sm" variant="outline" onClick={() => toast.dismiss(t.id)}>
              Cancel
            </Button>
          </div>
        </div>
      ),
      { duration: 5000 }
    )
  }

  return (
    <div className="p-6">
      <Toaster position="top-right" reverseOrder={false} />

      <h1 className="text-xl font-bold mb-4">Gallery Manager</h1>

      {showForm ? (
        <GalleryForm
          initialData={selectedItem}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-400"
            onClick={() => setShowForm(true)}
          >
            + Add Gallery Item
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : items.map((item) => (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    onEdit={(i) => {
                      setSelectedItem(i)
                      setShowForm(true)
                    }}
                    onDelete={handleDelete}
                  />
                ))}
          </div>
        </>
      )}
    </div>
  )
}
