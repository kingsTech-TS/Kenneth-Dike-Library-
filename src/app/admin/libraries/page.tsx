"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "../../../../lib/firebase"
import LibraryForm from "./LibraryForm"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"

export default function LibraryPage() {
  const [libraries, setLibraries] = useState<any[]>([])
  const [selectedLibrary, setSelectedLibrary] = useState<any | null>(null)
  const [showForm, setShowForm] = useState(false)

  const fetchLibraries = async () => {
    try {
      const snapshot = await getDocs(collection(db, "libraries"))
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }))
      setLibraries(docs)
    } catch (err) {
      console.error("Fetch error:", err)
      toast.error("Failed to fetch libraries ❌")
    }
  }

  useEffect(() => {
    fetchLibraries()
  }, [])

  const handleSave = () => {
    fetchLibraries()
    setShowForm(false)
    setSelectedLibrary(null)
    toast.success("Library saved successfully 🎉")
  }

  const handleCancel = () => {
    setShowForm(false)
    setSelectedLibrary(null)
  }

  const handleDelete = (id: string, name: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <span>
            Delete <b>{name}</b>?
          </span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-500"
              onClick={async () => {
                try {
                  await deleteDoc(doc(db, "libraries", id))
                  setLibraries((prev) => prev.filter((i) => i.id !== id))
                  toast.dismiss(t.id)
                  toast.success(`"${name}" deleted ✅`)
                } catch (err) {
                  console.error("Delete error:", err)
                  toast.dismiss(t.id)
                  toast.error("Failed to delete ❌")
                }
              }}
            >
              Yes
            </button>
            <button
              className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    )
  }

  return (
    <div className="p-6">
      <Toaster position="top-right" reverseOrder={false} />

      <h1 className="text-xl font-bold mb-4">Library Manager</h1>

      {showForm ? (
        <LibraryForm
          initialData={selectedLibrary || undefined}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-400"
            onClick={() => setShowForm(true)}
          >
            + Add Library
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {libraries.map((lib) => (
              <div
                key={lib.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {lib.libraryImageURL ? (
                  <img
                    src={lib.libraryImageURL}
                    alt={lib.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                <div className="p-4">
                  <h2 className="text-lg font-semibold">{lib.name}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {lib.description}
                  </p>

                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-blue-600 hover:bg-blue-500 text-white"
                      onClick={() => {
                        setSelectedLibrary(lib)
                        setShowForm(true)
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-500 text-white"
                      onClick={() => handleDelete(lib.id!, lib.name)}
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
