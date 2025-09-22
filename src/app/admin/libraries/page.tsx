"use client"

import { useState } from "react"
import LibraryForm from "./LibraryForm"
import { Library } from "../../../../data/libraryData"
import { Button } from "@/components/ui/button"
import toast, { Toaster } from "react-hot-toast"

export default function LibraryManager() {
  const [libraries, setLibraries] = useState<Library[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Library | null>(null)

  const handleSave = (data: Library) => {
    if (editing) {
      // update existing
      setLibraries(libraries.map((lib) => (lib.name === editing.name ? data : lib)))
      toast.success("Library updated successfully ✅")
    } else {
      // add new
      setLibraries([...libraries, data])
      toast.success("Library added successfully 🎉")
    }
    setEditing(null)
    setShowForm(false)
  }

  const handleCancel = () => {
    setEditing(null)
    setShowForm(false)
    toast("Action cancelled ❌", { icon: "🚫" })
  }

  const handleDelete = (name: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <span className="font-medium">Delete “{name}”?</span>
          <div className="flex gap-2 justify-end">
            <Button
              size="sm"
              className="bg-gray-300 text-black hover:bg-gray-400"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                setLibraries(libraries.filter((l) => l.name !== name))
                toast.dismiss(t.id)
                toast.success(`“${name}” deleted 🗑️`)
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      ),
      { duration: 4000 }
    )
  }

  return (
    <div className="p-6">
      <Toaster position="top-right" />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          Total Libraries: {libraries.length}
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Library Archive Management</h2>
        <Button
          onClick={() => {
            setEditing(null)
            setShowForm(true)
          }}
          className="bg-blue-600 hover:bg-blue-300 text-white"
        >
          Add Library
        </Button>
      </div>

      {/* Empty State */}
      {libraries.length === 0 && (
        <p className="text-gray-500 italic mb-6">
          No libraries yet. Click “Add Library” to get started.
        </p>
      )}

      {/* List in advanced card format */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {libraries.map((lib, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
          >
            {/* Image */}
            <div className="h-40 w-full bg-gray-200">
              <img
                src={lib.image || "/placeholder-library.jpg"}
                alt={lib.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-semibold text-lg text-gray-800">{lib.name}</h3>
              <p className="text-sm text-gray-500">
                🏛 {lib.faculty || "Unknown Faculty"}
              </p>

              <p className="text-sm text-gray-600 mt-3 flex-grow line-clamp-3">
                {lib.description ||
                  "This library provides resources for study, research, and learning..."}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-xl font-bold">{lib.books || 0}</p>
                  <p className="text-xs text-gray-500">Books</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">{lib.journals || 0}</p>
                  <p className="text-xs text-gray-500">Journals</p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 flex justify-end gap-2">
                <Button
                  onClick={() => {
                    setEditing(lib)
                    setShowForm(true)
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(lib.name)}
                  className="bg-red-600 hover:bg-red-300 text-white text-sm px-3 py-1"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <LibraryForm
            initialData={editing || undefined}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      )}
    </div>
  )
}
