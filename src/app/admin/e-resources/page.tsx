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
  onSnapshot,
} from "firebase/firestore"

// ResourceCard Component
function ResourceCard({
  resource,
  onEdit,
  onDelete,
}: {
  resource: EResourceItem
  onEdit: (res: EResourceItem) => void
  onDelete: (id?: string, name?: string) => void
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      {resource.logoURL ? (
        <img
          src={resource.logoURL}
          alt={resource.name}
          className="w-full h-40 object-contain bg-gray-100"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400">
          <BookOpen size={40} />
        </div>
      )}

      <div className="p-4">
        <h2 className="text-lg font-semibold">{resource.name}</h2>
        <p className="text-sm text-gray-600">{resource.category}</p>

        <p className="text-sm text-gray-600 line-clamp-3 mt-2">
          {resource.description || "No description provided"}
        </p>

        <div className="flex justify-between gap-4 text-xs text-gray-500 mt-3">
          <div className="flex items-center gap-1">
            <BookOpen size={14} /> {resource.papers || 0} Papers
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} /> {resource.authors || 0} Authors
          </div>
          <div className="flex items-center gap-1">
            <Download size={14} /> {resource.downloads || 0}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            size="sm"
            variant="outline"
            className="bg-blue-600 hover:bg-blue-500 text-white"
            onClick={() => onEdit(resource)}
            aria-label={`Edit ${resource.name}`}
          >
            <Edit className="h-4 w-4 mr-1" /> Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="bg-red-600 hover:bg-red-500 text-white"
            onClick={() => onDelete(resource.id, resource.name)}
            aria-label={`Delete ${resource.name}`}
          >
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

// SkeletonCard Component with shimmer
function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative w-full h-40 bg-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
      </div>

      <div className="p-4 space-y-2">
        <div className="h-5 bg-gray-300 rounded w-3/4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer" />
        </div>
        <div className="h-3 bg-gray-300 rounded w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer" />
        </div>
        <div className="h-12 bg-gray-300 rounded mt-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer" />
        </div>

        <div className="flex justify-between mt-3 gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-3 bg-gray-300 rounded w-1/4 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer" />
            </div>
          ))}
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

// Main Component
export default function EresourcesManager() {
  const [resources, setResources] = useState<EResourceItem[]>([])
  const [selected, setSelected] = useState<EResourceItem | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  // Real-time Firestore subscription
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "eResource"),
      (snapshot) => {
        const docs = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as EResourceItem),
        }))
        setResources(docs)
        setLoading(false)
      },
      (error) => {
        console.error("Realtime fetch error:", error)
        toast.error("Failed to fetch resources ❌")
        setLoading(false)
      }
    )
    return () => unsubscribe()
  }, [])

  // Save (Add/Update)
  const handleSave = async (data: EResourceItem) => {
    try {
      const { id, ...dataToSave } = data

      if (selected && selected.id) {
        await updateDoc(doc(db, "eResource", selected.id), dataToSave)
        toast.success("Resource updated ✅")
      } else {
        await addDoc(collection(db, "eResource"), dataToSave)
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

  const handleCancel = () => {
    setSelected(null)
    setShowForm(false)
    toast("Action cancelled ❌", { icon: "🚫" })
  }

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
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : resources.map((res) => (
                  <ResourceCard
                    key={res.id}
                    resource={res}
                    onEdit={(r) => {
                      setSelected(r)
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
