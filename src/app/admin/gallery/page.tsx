"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "../../../../lib/firebase"
import GalleryForm, { GalleryItem } from "./GalleryForm"
import { Button } from "@/components/ui/button"
import { Calendar, Edit, Trash2 } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [showForm, setShowForm] = useState(false)

  const fetchItems = async () => {
    try {
      const snapshot = await getDocs(collection(db, "galleryImages"))
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as GalleryItem),
      }))
      setItems(docs)
    } catch (err) {
      console.error("Fetch error:", err)
      toast.error("Failed to fetch gallery items ❌")
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleSave = () => {
    fetchItems()
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
                  setItems((prev) => prev.filter((i) => i.id !== id)) // ✅ Optimistic update
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
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ),
      {
        duration: 5000, // auto close if ignored
      }
    )
  }

  return (
    <div className="p-6">
      {/* Toast container */}
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
          <Button className="bg-blue-600 text-white hover:bg-blue-400" onClick={() => setShowForm(true)}>+ Add Gallery Item</Button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {/* Image */}
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title || "Gallery Image"}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}


                {/* Content */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
                    <Calendar size={14} />
                    <span>{item.date}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-blue-600 hover:bg-blue-500 text-white"
                      onClick={() => {
                        setSelectedItem(item)
                        setShowForm(true)
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-500 text-white"
                      onClick={() => handleDelete(item.id!, item.title)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
