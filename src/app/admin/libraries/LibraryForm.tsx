"use client"

import { useState } from "react"
import { Library } from "../../../../data/libraryData"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface LibraryFormProps {
  initialData?: Library
  onSave: (data: Library) => void
  onCancel?: () => void
}

export default function LibraryForm({ initialData, onSave, onCancel }: LibraryFormProps) {
  const [form, setForm] = useState<Library>(
    initialData || {
      name: "",
      faculty: "",
      image: "",
      description: "",
      location: "",
      coordinates: "",
      books: "",
      journals: "",
      articles: "",
      seatingCapacity: 0,
      studyRooms: 0,
      computerStations: 0,
      openingHours: "",
      contact: {
        phone: "",
        email: "",
        librarian: "",
        librarianImage: "",
      },
      services: [],
      facilities: [],
      departments: [],
    },
  )

  const handleChange = (field: keyof Library, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleContactChange = (field: keyof Library["contact"], value: any) => {
    setForm((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }))
  }

  const handleArrayChange = (field: "services" | "facilities" | "departments", value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value.split(",").map((item) => item.trim()),
    }))
  }

  const handleFileChange = (field: keyof Library, file: File | null) => {
    if (file) {
      const fileUrl = URL.createObjectURL(file)
      setForm((prev) => ({ ...prev, [field]: fileUrl }))
    }
  }

  const handleContactFileChange = (field: keyof Library["contact"], file: File | null) => {
    if (file) {
      const fileUrl = URL.createObjectURL(file)
      setForm((prev) => ({
        ...prev,
        contact: { ...prev.contact, [field]: fileUrl },
      }))
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg mt-12">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {initialData ? "Edit Library" : "Add New Library"}
          </h2>
          <Button
            type="button"
            onClick={() => onCancel?.()}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </Button>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSave(form)
          }}
          className="p-6 space-y-4 max-h-[75vh] overflow-y-auto"
        >
          {/* Name + Faculty */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Library Name</label>
              <Input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Faculty</label>
              <Input
                type="text"
                value={form.faculty}
                onChange={(e) => handleChange("faculty", e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium">Library Image</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange("image", e.target.files?.[0] || null)}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <Textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Location + Coordinates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Location</label>
              <Input
                type="text"
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Coordinates</label>
              <Input
                type="text"
                value={form.coordinates}
                onChange={(e) => handleChange("coordinates", e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">Books</label>
              <Input
                type="text"
                value={form.books}
                onChange={(e) => handleChange("books", e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Journals</label>
              <Input
                type="text"
                value={form.journals}
                onChange={(e) => handleChange("journals", e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Articles</label>
              <Input
                type="text"
                value={form.articles}
                onChange={(e) => handleChange("articles", e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          {/* Facilities */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">Seating Capacity</label>
              <Input
                type="number"
                value={form.seatingCapacity}
                onChange={(e) => handleChange("seatingCapacity", Number(e.target.value))}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Study Rooms</label>
              <Input
                type="number"
                value={form.studyRooms}
                onChange={(e) => handleChange("studyRooms", Number(e.target.value))}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Computer Stations</label>
              <Input
                type="number"
                value={form.computerStations}
                onChange={(e) => handleChange("computerStations", Number(e.target.value))}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <label className="block text-sm font-medium">Opening Hours</label>
            <Input
              type="text"
              value={form.openingHours}
              onChange={(e) => handleChange("openingHours", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Contact Info */}
          <fieldset className="p-4 rounded mt-2">
            <legend className="text-sm font-medium">Contact Info</legend>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <Input
                  type="text"
                  value={form.contact.phone}
                  onChange={(e) => handleContactChange("phone", e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={form.contact.email}
                  onChange={(e) => handleContactChange("email", e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Librarian</label>
                <Input
                  type="text"
                  value={form.contact.librarian}
                  onChange={(e) => handleContactChange("librarian", e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Librarian Image</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleContactFileChange("librarianImage", e.target.files?.[0] || null)}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>
          </fieldset>

          {/* Arrays */}
          <div>
            <label className="block text-sm font-medium">Services (comma separated)</label>
            <Input
              type="text"
              value={form.services.join(", ")}
              onChange={(e) => handleArrayChange("services", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Facilities (comma separated)</label>
            <Input
              type="text"
              value={form.facilities.join(", ")}
              onChange={(e) => handleArrayChange("facilities", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Departments (comma separated)</label>
            <Input
              type="text"
              value={form.departments.join(", ")}
              onChange={(e) => handleArrayChange("departments", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              onClick={() => onCancel?.()}
              className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600"
            >
              Save Library
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
