"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../../../lib/firebase";

export interface GalleryItem {
  id?: string;
  imageUrl: string; // 🔹 unified field
  title: string;
  description: string;
  date: string;
  photographer: string;
  counter?: number;
}

interface GalleryFormProps {
  initialData?: GalleryItem | null;
  onSave: (data: GalleryItem) => void;
  onCancel: () => void;
}

export default function GalleryForm({
  initialData,
  onSave,
  onCancel,
}: GalleryFormProps) {
  const [formData, setFormData] = useState<GalleryItem>({
    id: undefined,
    imageUrl: "",
    title: "",
    description: "",
    date: "",
    photographer: "",
    counter: undefined,
  });

  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setPreview(initialData.imageUrl);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    setUploading(true);
    const uploadData = new FormData();
    uploadData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: uploadData,
    });

    const data = await res.json();
    console.log("Upload response:", data);

    if (!res.ok || data.error) {
      toast.error(`Upload failed: ${data.error?.message || "Unknown error"}`);
      return;
    }

    const imageUrl = data.secure_url;
    if (!imageUrl) {
      toast.error("Upload succeeded but no image URL returned ❌");
      return;
    }

    toast.success("Upload successful!");
    setFormData((prev) => ({ ...prev, imageUrl }));
    setPreview(imageUrl);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    toast.error(message);
  } finally {
    setUploading(false);
  }
};


  // 🔹 Get next counter safely (highest + 1 instead of size + 1)
  const getNextCounter = async (): Promise<number> => {
    const q = query(collection(db, "galleryImages"), orderBy("counter", "desc"), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return 1;
    const maxCounter = snapshot.docs[0].data().counter || 0;
    return maxCounter + 1;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (initialData?.id) {
        const docRef = doc(db, "galleryImages", initialData.id);
        await updateDoc(docRef, {
          title: formData.title,
          description: formData.description,
          date: formData.date,
          photographer: formData.photographer,
          imageUrl: formData.imageUrl || initialData.imageUrl,
        });
        toast.success("Gallery item updated ✅");
      } else {
        const counter = await getNextCounter();
        await addDoc(collection(db, "galleryImages"), {
          title: formData.title,
          description: formData.description,
          date: formData.date,
          photographer: formData.photographer,
          imageUrl: formData.imageUrl,
          uploadedBy: "admin",
          counter,
          timestamp: serverTimestamp(),
        });
        toast.success(`New gallery item #${counter} added 🎉`);
      }
      onSave(formData);
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Failed to save gallery item ❌";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-xl shadow-md"
    >
      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium mb-1">Upload Image</label>
        <Input type="file" accept="image/*" onChange={handleFileChange} />
        {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
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
        <Button type="button" className="bg-red-600 text-white hover:bg-red-400" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-400" disabled={loading || uploading || !formData.imageUrl}>
          {loading ? "Saving..." : initialData ? "Update" : "Add"} Item
        </Button>
      </div>
    </form>
  );
}
