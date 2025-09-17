"use client"

import { useState } from "react"
import LibraryForm from "./LibraryForm"
import { Library } from "../../../../data/libraryData"
import { Button } from "@/components/ui/button"


export default function LibraryManagement() {
  const [libraries, setLibraries] = useState<Library[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Library | null>(null)

  const handleSave = (data: Library) => {
    if (editing) {
      setLibraries(libraries.map(lib => lib.name === editing.name ? data : lib))
    } else {
      setLibraries([...libraries, data])
    }
    setEditing(null)
    setShowForm(false)
  }

  return (
    <div className="p-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">Total Libraries: {libraries.length}</div>
        <div className="p-4 bg-white rounded shadow">Total Books: {libraries.reduce((a, b) => a + (Number(b.books) || 0), 0)}</div>
        <div className="p-4 bg-white rounded shadow">Total Journals: {libraries.reduce((a, b) => a + (Number(b.journals) || 0), 0)}</div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Library Archive Management</h2>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          + Add Library
        </Button>
      </div>

    {/* List in advanced card format */}
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {libraries.map((lib, i) => (
    <div
      key={i}
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="h-40 w-full bg-gray-200">
        {/* Replace with next/image if you have actual images */}
        <img
          src={lib.image || "/placeholder-library.jpg"}
          alt={lib.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title & location */}
        <h3 className="font-semibold text-lg text-gray-800">
          {lib.name}
        </h3>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          🏛 {lib.faculty || "Unknown Faculty"}
        </p>

        {/* Description */}
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
            onClick={() => {
              setLibraries(libraries.filter((l) => l.name !== lib.name))
            }}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1"
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            <button
              onClick={() => { setShowForm(false); setEditing(null) }}
              className="absolute top-2 right-2 text-gray-600"
            >
              ✕
            </button>
            <LibraryForm initialData={editing || undefined} onSave={handleSave} />
          </div>
        </div>
      )}
    </div>
  )
}
