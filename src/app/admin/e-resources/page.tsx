"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import toast, { Toaster } from "react-hot-toast"
import EResourcesForm, { EResourceItem } from "./EresourcesForm"
import { Edit, Trash2, BookOpen } from "lucide-react"
import { db } from "../../../../lib/firebase"
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore"

// ================= ResourceCard =================
function ResourceCard({
  resource,
  onEdit,
  onDelete,
  deleting,
}: {
  resource: EResourceItem
  onEdit: (res: EResourceItem) => void
  onDelete: (id?: string, name?: string) => void
  deleting?: boolean
}) {
  // Pick up to 3 non-empty stats from resource.stats
  const statsEntries = resource.stats
    ? Object.entries(resource.stats).filter(
      ([_, value]) => value !== "" && value !== null && value !== undefined
    )
    : []
  const displayedStats = statsEntries.slice(0, 3)

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

        {displayedStats.length > 0 && (
          <div className="flex justify-between gap-4 text-xs text-gray-500 mt-3">
            {displayedStats.map(([key, value]) => (
              <div key={key} className="flex items-center gap-1">
                <BookOpen size={14} /> {value}{" "}
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </div>
            ))}
          </div>
        )}

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
            disabled={deleting}
            aria-label={`Delete ${resource.name}`}
          >
            <Trash2 className="h-4 w-4 mr-1" /> {deleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  )
}

// ================= SkeletonCard =================
function SkeletonCard() {
  const shimmer =
    "absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer"
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative w-full h-40 bg-gray-200 overflow-hidden">
        <div className={shimmer} />
      </div>
      <div className="p-4 space-y-2">
        <div className="h-5 bg-gray-300 rounded w-3/4 relative overflow-hidden">
          <div className={shimmer} />
        </div>
        <div className="h-3 bg-gray-300 rounded w-1/2 relative overflow-hidden">
          <div className={shimmer} />
        </div>
        <div className="h-12 bg-gray-300 rounded mt-2 relative overflow-hidden">
          <div className={shimmer} />
        </div>
        <div className="flex justify-between mt-3 gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-3 bg-gray-300 rounded w-1/4 relative overflow-hidden">
              <div className={shimmer} />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <div className="h-7 bg-gray-300 rounded w-16 relative overflow-hidden">
            <div className={shimmer} />
          </div>
          <div className="h-7 bg-gray-300 rounded w-16 relative overflow-hidden">
            <div className={shimmer} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ================= Main Manager =================
export default function EresourcesManager() {
  const [resources, setResources] = useState<EResourceItem[]>([])
  const [selected, setSelected] = useState<EResourceItem | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<{ [key: string]: boolean }>({})

  // Real-time subscription
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "eResource"),
      (snapshot) => {
        const docs = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as EResourceItem) }))
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

  // Save handler (add/update)
  const handleSave = async (data: EResourceItem) => {
    setActionLoading({ ...actionLoading, saving: true })
    try {
      const { id, ...dataToSave } = data
      if (id) {
        await updateDoc(doc(db, "eResource", id), dataToSave)
        toast.success(`Resource "${data.name}" updated ✅`)
      } else {
        await addDoc(collection(db, "eResource"), dataToSave)
        toast.success(`Resource "${data.name}" added 🎉`)
      }
    } catch (err) {
      console.error("Save error:", err)
      toast.error("Failed to save resource ❌")
    } finally {
      setSelected(null)
      setShowForm(false)
      setActionLoading({ ...actionLoading, saving: false })
    }
  }

  const handleCancel = () => {
    setSelected(null)
    setShowForm(false)
    toast("Action cancelled ❌", { icon: "🚫" })
  }

  // Delete handler
  const handleDelete = (id?: string, name?: string) => {
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
                setActionLoading({ ...actionLoading, [id]: true })
                try {
                  await deleteDoc(doc(db, "eResource", id))
                  toast.success(`"${name}" deleted 🗑️`)
                } catch (err) {
                  console.error("Delete error:", err)
                  toast.error("Failed to delete ❌")
                } finally {
                  setActionLoading({ ...actionLoading, [id]: false })
                  toast.dismiss(t.id)
                }
              }}
              disabled={actionLoading[id]}
            >
              {actionLoading[id] ? "Deleting..." : "Yes, Delete"}
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
            className="bg-blue-600 text-white hover:bg-blue-500"
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
                  deleting={!!(res.id && actionLoading[res.id])}
                />
              ))}
          </div>
        </>
      )}
    </div>
  )
}
