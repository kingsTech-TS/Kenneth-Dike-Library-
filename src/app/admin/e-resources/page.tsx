"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import toast, { Toaster } from "react-hot-toast"
import EResourcesForm, { EResourceItem } from "./EresourcesForm"
import { Edit, Trash2, BookOpen, Users, Download } from "lucide-react"
import { db } from "../../../../lib/firebase"
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore"

export default function EresourcesManager() {
  const [resources, setResources] = useState<EResourceItem[]>([])
  const [selected, setSelected] = useState<EResourceItem | null>(null)
  const [showForm, setShowForm] = useState(false)

  // Fetch from Firestore
  const fetchResources = async () => {
    try {
      const snapshot = await getDocs(collection(db, "eResource"))
      const docs = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as EResourceItem),
      }))
      setResources(docs)
    } catch (err) {
      console.error("Fetch error:", err)
      toast.error("Failed to fetch resources ❌")
    }
  }

  useEffect(() => {
    fetchResources()
  }, [])

  const handleSave = async (data: EResourceItem) => {
  try {
    const dataToSave = { ...data }
    delete dataToSave.id

    if (selected) {
      // Update existing resource
      const ref = doc(db, "eResource", selected.id!)
      await updateDoc(ref, dataToSave)

      setResources((prev) =>
        prev.map((r) =>
          r.id === selected.id ? { ...r, ...dataToSave } : r
        )
      )
      toast.success("Resource updated ✅")
    } else {
      // Add new resource
      const docRef = await addDoc(collection(db, "eResource"), dataToSave)

      // Ensure React sees a new array/object
      setResources((prev) => [
        ...prev,
        { id: docRef.id, ...dataToSave },
      ])
      toast.success("Resource added 🎉")
    }
  } catch (err) {
    console.error("Save error:", err)
    toast.error("Failed to save resource ❌")
  } finally {
    setSelected(null)
    setShowForm(false)
  }
}


  // Cancel
  const handleCancel = () => {
    setSelected(null)
    setShowForm(false)
    toast("Action cancelled ❌", { icon: "🚫" })
  }

  // Delete
  const handleDelete = async (id?: string, name?: string) => {
    if (!id) return
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="text-sm">
            Are you sure you want to delete <b>{name}</b>?
          </p>
          <div className="flex gap-2 justify-end">
            <Button
              size="sm"
              variant="destructive"
              onClick={async () => {
                try {
                  await deleteDoc(doc(db, "eResource", id))

                  // Remove from state locally
                  setResources((prev) => prev.filter((r) => r.id !== id))

                  toast.success(`“${name}” deleted 🗑️`)
                } catch (err) {
                  console.error("Delete error:", err)
                  toast.error("Failed to delete ❌")
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
      <Toaster position="top-right" />

      <h1 className="text-xl font-bold mb-4">E-Resources Manager</h1>

      {showForm ? (
        <EResourcesForm
          initialData={selected ?? undefined}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-400"
            onClick={() => {
              setSelected(null)
              setShowForm(true)
            }}
          >
            + Add Resource
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {resources.map((res) => (
              <div
                key={res.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {/* Logo */}
                {res.logoURL ? (
                  <img
                    src={res.logoURL}
                    alt={res.name}
                    className="w-full h-40 object-contain bg-gray-100"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Logo
                  </div>
                )}

                {/* Content */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{res.name}</h2>
                  <p className="text-sm text-gray-600">{res.category}</p>

                  <p className="text-sm text-gray-600 line-clamp-3 mt-2">
                    {res.description || "No description provided"}
                  </p>

                  {/* Stats */}
                  <div className="flex justify-between gap-4 text-xs text-gray-500 mt-3">
                    <div className="flex items-center gap-1">
                      <BookOpen size={14} /> {res.papers || 0} Papers
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} /> {res.authors || 0} Authors
                    </div>
                    <div className="flex items-center gap-1">
                      <Download size={14} /> {res.downloads || 0}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-blue-600 hover:bg-blue-500 text-white"
                      onClick={() => {
                        setSelected(res)
                        setShowForm(true)
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-500 text-white"
                      onClick={() => handleDelete(res.id, res.name)}
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
