"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import toast from "react-hot-toast"
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore"
import { db } from "../../../../lib/firebase"

export interface GalleryItem {
  id?: string
  src: string
  title: string
  description: string
  date: string
  photographer: string
  counter?: number
}

interface GalleryFormProps {
  initialData?: GalleryItem | null
  onSave: (data: GalleryItem) => void
  onCancel: () => void
}

export default function GalleryForm({
  initialData,
  onSave,
  onCancel,
}: GalleryFormProps) {
  const [formData, setFormData] = useState<GalleryItem>({
    id: undefined,
    src: "",
    title: "",
    description: "",
    date: "",
    photographer: "",
    counter: undefined,
  })

  const [preview, setPreview] = useState<string>("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
      setPreview(initialData.src)
    }
  }, [initialData])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const uploadData = new FormData()
      uploadData.append("file", file)
      uploadData.append("upload_preset", "gallery_unsigned") // ✅ your unsigned preset

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/${cloudName}/image/upload",
        {
          method: "POST",
          body: uploadData,
        }
      )

      const data = await res.json()

      if (res.ok) {
        console.log("✅ Cloudinary upload success:", data)

        toast.success("Upload successful!")

        // save the uploaded image URL to state
        setFormData((prev) => ({ ...prev, src: data.secure_url }))
        setPreview(data.secure_url)
      } else {
        const errorMsg =
          data?.error?.message || data?.message || "Unknown upload error"

        console.error("❌ Cloudinary upload failed →", {
          raw: data,
          message: errorMsg,
        })

        toast.error(`Upload failed: ${errorMsg}`)
      }
    } catch (err: any) {
      console.error("Unexpected error:", err)
      toast.error(`Unexpected error: ${err.message}`)
    }
  }

  const getNextCounter = async (): Promise<number> => {
    const snapshot = await getDocs(collection(db, "galleryImages"))
    return snapshot.size + 1 // next sequential number
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (initialData?.id) {
        // update Firestore doc
        const docRef = doc(db, "galleryImages", initialData.id)
        await updateDoc(docRef, {
          title: formData.title,
          description: formData.description,
          date: formData.date,
          photographer: formData.photographer,
          imageUrl: formData.src || initialData.src, // ✅ fallback to old image
        })
        toast.success("Gallery item updated ✅")
      } else {
        const counter = await getNextCounter()

        await addDoc(collection(db, "galleryImages"), {
          title: formData.title,
          description: formData.description,
          date: formData.date,
          photographer: formData.photographer,
          imageUrl: formData.src, // always required on new item
          uploadedBy: "admin",
          counter,
          timestamp: serverTimestamp(),
        })
        toast.success(`New gallery item #${counter} added 🎉`)
      }

      onSave(formData)
    } catch (err) {
      console.error(err)
      toast.error("Failed to save gallery item ❌")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-xl shadow-md"
    >
      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium mb-1">Upload Image</label>
        <Input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-2 w-full h-40 object-cover rounded-lg border"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Event Title"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Photographer</label>
        <Input
          name="photographer"
          value={formData.photographer}
          onChange={handleChange}
          placeholder="Photographer Name"
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : initialData ? "Update" : "Add"} Item
        </Button>
      </div>
    </form>
  )
}
