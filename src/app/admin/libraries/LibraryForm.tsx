"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../../lib/firebase";

export interface Library {
  id?: string;
  name: string;
  faculty: string;
  description: string;
  location: string;
  coordinates: string;
  books: string;
  journals: string;
  articles: string;
  seatingCapacity: string;
  openingHours: string;
  phoneNumber: string;
  email: string;
  librarian: string;
  services: string;
  facilities: string;
  departments: string;
  libraryImageURL: string;
  librarianImageURL: string;
}

interface LibraryFormProps {
  initialData?: Library | null;
  onSave: (data: Library) => void;
  onCancel: () => void;
}

export default function LibraryForm({
  initialData,
  onSave,
  onCancel,
}: LibraryFormProps) {
  const [formData, setFormData] = useState<Library>({
    id: undefined,
    name: "",
    faculty: "",
    description: "",
    location: "",
    coordinates: "",
    books: "",
    journals: "",
    articles: "",
    seatingCapacity: "",
    openingHours: "",
    phoneNumber: "",
    email: "",
    librarian: "",
    services: "",
    facilities: "",
    departments: "",
    libraryImageURL: "",
    librarianImageURL: "",
  });

  const [previews, setPreviews] = useState({
    libraryImageURL: "",
    librarianImageURL: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setPreviews({
        libraryImageURL: initialData.libraryImageURL,
        librarianImageURL: initialData.librarianImageURL,
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "libraryImageURL" | "librarianImageURL"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading((prev) => ({ ...prev, [field]: true }));

      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
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
      setFormData((prev) => ({ ...prev, [field]: imageUrl }));
      setPreviews((prev) => ({ ...prev, [field]: imageUrl }));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      toast.error(message);
    } finally {
      setUploading((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    // remove id before saving
    const { id, ...dataToSave } = formData;

    if (initialData?.id) {
      await setDoc(doc(db, "libraries", initialData.id), {
        ...dataToSave,
        updatedAt: serverTimestamp(),
      });
      toast.success("Library updated ✅");
    } else {
      await addDoc(collection(db, "libraries"), {
        ...dataToSave,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      toast.success("New library added 🎉");
    }
    onSave(formData);
  } catch (err: unknown) {
    console.error(err);
    const message =
      err instanceof Error ? err.message : "Failed to save library ❌";
    toast.error(message);
  } finally {
    setLoading(false);
  }
};


  const handleDelete = async () => {
    if (!initialData?.id) return;

    toast(
      (t) => (
        <div className="flex items-center gap-3">
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      ),
      { duration: 5000 }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-xl shadow-md max-h-[80vh] overflow-y-auto"
    >
      {/* Images */}
      <div>
        <label className="block text-sm font-medium mb-1">Library Image</label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "libraryImageURL")}
        />
        {uploading.libraryImageURL && (
          <p className="text-xs text-gray-500 mt-1">Uploading...</p>
        )}
        {previews.libraryImageURL && (
          <img
            src={previews.libraryImageURL}
            alt="Library Preview"
            className="mt-2 w-40 h-40 object-cover rounded-lg border"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Librarian Image</label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "librarianImageURL")}
        />
        {uploading.librarianImageURL && (
          <p className="text-xs text-gray-500 mt-1">Uploading...</p>
        )}
        {previews.librarianImageURL && (
          <img
            src={previews.librarianImageURL}
            alt="Librarian Preview"
            className="mt-2 w-32 h-32 object-cover rounded-lg border"
          />
        )}
      </div>

      {/* General Info */}
      <div>
        <label className="block text-sm font-medium mb-1">Library Name</label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Faculty</label>
        <Input
          name="faculty"
          value={formData.faculty}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <Input
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Coordinates</label>
        <Input
          name="coordinates"
          value={formData.coordinates}
          onChange={handleChange}
        />
      </div>

      {/* Resources */}
      <div>
        <label className="block text-sm font-medium mb-1">Books</label>
        <Input
          name="books"
          value={formData.books}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Journals</label>
        <Input
          name="journals"
          value={formData.journals}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Articles</label>
        <Input
          name="articles"
          value={formData.articles}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Seating Capacity</label>
        <Input
          name="seatingCapacity"
          value={formData.seatingCapacity}
          onChange={handleChange}
        />
      </div>

      {/* Hours */}
      <div>
        <label className="block text-sm font-medium mb-1">Opening Hours</label>
        <Input
          name="openingHours"
          value={formData.openingHours}
          onChange={handleChange}
        />
      </div>

      {/* Contact */}
      <div>
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <Input
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Librarian</label>
        <Input
          name="librarian"
          value={formData.librarian}
          onChange={handleChange}
        />
      </div>

      {/* Services & Facilities */}
      <div>
        <label className="block text-sm font-medium mb-1">Services</label>
        <Textarea
          name="services"
          value={formData.services}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Facilities</label>
        <Textarea
          name="facilities"
          value={formData.facilities}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Departments</label>
        <Textarea
          name="departments"
          value={formData.departments}
          onChange={handleChange}
        />
      </div>

      {/* Footer buttons */}
      <div className="flex gap-2 justify-end">
        <Button
          type="button"
          className="bg-gray-300 text-black hover:bg-gray-400"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-400"
          disabled={
            loading ||
            uploading.libraryImageURL ||
            uploading.librarianImageURL
          }
        >
          {loading ? "Saving..." : initialData ? "Update" : "Add"} Library
        </Button>
      </div>
    </form>
  );
}
