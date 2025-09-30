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
  const defaultForm: Library = {
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
  }

  const [form, setForm] = useState<Library>(initialData || defaultForm)

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

  const handleCancel = () => {
    setForm(initialData || defaultForm) // reset state
    onCancel?.()
  }

  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg mt-12">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">
            {initialData ? "Edit Library" : "Add New Library"}
          </h2>
          <Button
            type="button"
            onClick={handleCancel}
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
              <label htmlFor="name" className="block text-sm font-medium">Library Name</label>
              <Input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="faculty" className="block text-sm font-medium">Faculty</label>
              <Input
                id="faculty"
                type="text"
                value={form.faculty}
                onChange={(e) => handleChange("faculty", e.target.value)}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium">Library Image</label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange("image", e.target.files?.[0] || null)}
            />
            {form.image && (
              <img
                src={form.image}
                alt="Library preview"
                className="mt-2 w-32 h-32 object-cover rounded"
              />
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium">Description</label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* Location + Coordinates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium">Location</label>
              <Input
                id="location"
                type="text"
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="coordinates" className="block text-sm font-medium">Coordinates</label>
              <Input
                id="coordinates"
                type="text"
                value={form.coordinates}
                onChange={(e) => handleChange("coordinates", e.target.value)}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="books" className="block text-sm font-medium">Books</label>
              <Input
                id="books"
                type="text"
                value={form.books}
                onChange={(e) => handleChange("books", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="journals" className="block text-sm font-medium">Journals</label>
              <Input
                id="journals"
                type="text"
                value={form.journals}
                onChange={(e) => handleChange("journals", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="articles" className="block text-sm font-medium">Articles</label>
              <Input
                id="articles"
                type="text"
                value={form.articles}
                onChange={(e) => handleChange("articles", e.target.value)}
              />
            </div>
          </div>

          {/* Facilities */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="seatingCapacity" className="block text-sm font-medium">Seating Capacity</label>
              <Input
                id="seatingCapacity"
                type="number"
                value={form.seatingCapacity}
                onChange={(e) => handleChange("seatingCapacity", Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="studyRooms" className="block text-sm font-medium">Study Rooms</label>
              <Input
                id="studyRooms"
                type="number"
                value={form.studyRooms}
                onChange={(e) => handleChange("studyRooms", Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="computerStations" className="block text-sm font-medium">Computer Stations</label>
              <Input
                id="computerStations"
                type="number"
                value={form.computerStations}
                onChange={(e) => handleChange("computerStations", Number(e.target.value))}
              />
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <label htmlFor="openingHours" className="block text-sm font-medium">Opening Hours</label>
            <Input
              id="openingHours"
              type="text"
              value={form.openingHours}
              onChange={(e) => handleChange("openingHours", e.target.value)}
            />
          </div>

          {/* Contact Info */}
          <fieldset className="p-4 rounded mt-2 border">
            <legend className="text-sm font-medium">Contact Info</legend>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
                <Input
                  id="phone"
                  type="text"
                  value={form.contact.phone}
                  onChange={(e) => handleContactChange("phone", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={form.contact.email}
                  onChange={(e) => handleContactChange("email", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="librarian" className="block text-sm font-medium">Librarian</label>
                <Input
                  id="librarian"
                  type="text"
                  value={form.contact.librarian}
                  onChange={(e) => handleContactChange("librarian", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="librarianImage" className="block text-sm font-medium">Librarian Image</label>
                <Input
                  id="librarianImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleContactFileChange("librarianImage", e.target.files?.[0] || null)}
                />
                {form.contact.librarianImage && (
                  <img
                    src={form.contact.librarianImage}
                    alt="Librarian preview"
                    className="mt-2 w-24 h-24 object-cover rounded"
                  />
                )}
              </div>
            </div>
          </fieldset>

          {/* Arrays */}
          <div>
            <label htmlFor="services" className="block text-sm font-medium">Services (comma separated)</label>
            <Input
              id="services"
              type="text"
              value={form.services.join(", ")}
              onChange={(e) => handleArrayChange("services", e.target.value)}
            />
            <small className="text-gray-500">Separate items with commas</small>
          </div>
          <div>
            <label htmlFor="facilities" className="block text-sm font-medium">Facilities (comma separated)</label>
            <Input
              id="facilities"
              type="text"
              value={form.facilities.join(", ")}
              onChange={(e) => handleArrayChange("facilities", e.target.value)}
            />
            <small className="text-gray-500">Separate items with commas</small>
          </div>
          <div>
            <label htmlFor="departments" className="block text-sm font-medium">Departments (comma separated)</label>
            <Input
              id="departments"
              type="text"
              value={form.departments.join(", ")}
              onChange={(e) => handleArrayChange("departments", e.target.value)}
            />
            <small className="text-gray-500">Separate items with commas</small>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded border text-white bg-red-600 hover:bg-red-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-300"
            >
              Save Library
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
