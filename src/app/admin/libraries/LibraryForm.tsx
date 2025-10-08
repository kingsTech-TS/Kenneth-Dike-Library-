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
import { X } from "lucide-react";

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
  services: string[];
  facilities: string[];
  departments: string[];
  libraryImageURL: string;
  librarianImageURL: string;
}

interface LibraryFormProps {
  initialData?: Library | null;
  onSave: (data: Library) => void;
  onCancel: () => void;
}

const normalizeToArray = (v: unknown): string[] => {
  if (!v) return [];
  if (Array.isArray(v)) return v as string[];
  if (typeof v === "string") {
    return v
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
};

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
    services: [],
    facilities: [],
    departments: [],
    libraryImageURL: "",
    librarianImageURL: "",
  });

  const [tagInputs, setTagInputs] = useState({
    services: "",
    facilities: "",
    departments: "",
  });

  const [previews, setPreviews] = useState({
    libraryImageURL: "",
    librarianImageURL: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        ...initialData,
        services: normalizeToArray(initialData.services),
        facilities: normalizeToArray(initialData.facilities),
        departments: normalizeToArray(initialData.departments),
      });
      setPreviews({
        libraryImageURL: initialData.libraryImageURL ?? "",
        librarianImageURL: initialData.librarianImageURL ?? "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  // ✅ Add and remove tags
  const addTag = (
    type: "services" | "facilities" | "departments",
    value: string
  ) => {
    if (!value.trim()) return;
    setFormData((prev) => ({
      ...prev,
      [type]: [...(prev[type] || []), value.trim()],
    }));
    setTagInputs((prev) => ({ ...prev, [type]: "" }));
  };

  const removeTag = (
    type: "services" | "facilities" | "departments",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [type]: (prev[type] || []).filter((_, i) => i !== index),
    }));
  };

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

      const res = await fetch("/api/upload", { method: "POST", body: uploadData });
      const data = await res.json();

      if (!res.ok || data.error) {
        toast.error(`Upload failed: ${data.error?.message || "Unknown error"}`);
        return;
      }

      const imageUrl = data.secure_url;
      toast.success("Upload successful!");
      setFormData((prev) => ({ ...prev, [field]: imageUrl }));
      setPreviews((prev) => ({ ...prev, [field]: imageUrl }));
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setUploading((prev) => ({ ...prev, [field]: false }));
    }
  };

  // ✅ Paste JSON or JS object directly into form
  const handlePasteJSON = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text) {
        toast.error("Clipboard is empty!");
        return;
      }

      // Try parsing JSON or JS object format
      let parsed: any;
      try {
        parsed = JSON.parse(text);
      } catch {
        // Try to evaluate JS object-like input
        const cleaned = text
          .trim()
          .replace(/^[^{]+/, "") // remove leading "const x =" etc.
          .replace(/;$/, "");
        parsed = eval("(" + cleaned + ")");
      }

      if (!parsed || typeof parsed !== "object") {
        toast.error("Invalid JSON or object format ❌");
        return;
      }

      const mappedData: Partial<Library> = {
        name: parsed.name || "",
        faculty: parsed.faculty || "",
        description: parsed.description || "",
        location: parsed.location || "",
        coordinates: parsed.coordinates || "",
        books: String(parsed.books || ""),
        journals: String(parsed.journals || ""),
        articles: String(parsed.articles || ""),
        seatingCapacity: String(parsed.seatingCapacity || ""),
        openingHours: parsed.openingHours || "",
        phoneNumber: parsed.contact?.phone || "",
        email: parsed.contact?.email || "",
        librarian: parsed.contact?.librarian || "",
        services: normalizeToArray(parsed.services),
        facilities: normalizeToArray(parsed.facilities),
        departments: normalizeToArray(parsed.departments),
        libraryImageURL: parsed.image || "",
        librarianImageURL: parsed.contact?.librarianImage || "",
      };

      setFormData((prev) => ({ ...prev, ...mappedData }));
      setPreviews({
        libraryImageURL: mappedData.libraryImageURL ?? "",
        librarianImageURL: mappedData.librarianImageURL ?? "",
      });

      toast.success("Data pasted successfully ✅");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to parse clipboard data ❌");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
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
      toast.error(err instanceof Error ? err.message : "Failed to save ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    try {
      await deleteDoc(doc(db, "libraries", initialData.id));
      toast.success("Library deleted 🗑️");
      onCancel();
    } catch {
      toast.error("Failed to delete ❌");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-xl shadow-md max-h-[80vh] overflow-y-auto"
    >
      {/* Paste JSON Button */}
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={handlePasteJSON}
          className="bg-green-600 text-white hover:bg-green-500"
        >
          📋 Paste JSON Data
        </Button>
      </div>

      {/* Image Uploads */}
      {/* Library Image Upload */}
      <div>
        <label className="block text-sm font-medium mb-1">Library Image</label>
        <div className="flex items-center gap-2">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "libraryImageURL")}
            disabled={uploading.libraryImageURL}
          />
          {uploading.libraryImageURL && (
            <span className="text-sm text-gray-500 animate-pulse">Uploading...</span>
          )}
        </div>
        {previews.libraryImageURL && !uploading.libraryImageURL && (
          <img
            src={previews.libraryImageURL}
            alt="Library Preview"
            className="mt-2 w-40 h-40 object-cover rounded-lg border"
          />
        )}
      </div>

      {/* Librarian Image Upload */}
      <div>
        <label className="block text-sm font-medium mb-1">Librarian Image</label>
        <div className="flex items-center gap-2">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "librarianImageURL")}
            disabled={uploading.librarianImageURL}
          />
          {uploading.librarianImageURL && (
            <span className="text-sm text-gray-500 animate-pulse">Uploading...</span>
          )}
        </div>
        {previews.librarianImageURL && !uploading.librarianImageURL && (
          <img
            src={previews.librarianImageURL}
            alt="Librarian Preview"
            className="mt-2 w-32 h-32 object-cover rounded-lg border"
          />
        )}
      </div>

      {/* Regular Fields */}
      {[
        "name",
        "faculty",
        "description",
        "location",
        "coordinates",
        "books",
        "journals",
        "articles",
        "seatingCapacity",
        "openingHours",
        "phoneNumber",
        "email",
        "librarian",
      ].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium mb-1 capitalize">
            {field.replace(/([A-Z])/g, " $1")}
          </label>
          {field === "description" ? (
            <Textarea
              name={field}
              value={String((formData as any)[field] ?? "")}
              onChange={handleChange}
            />
          ) : (
            <Input
              name={field}
              value={String((formData as any)[field] ?? "")}
              onChange={handleChange}
            />
          )}
        </div>
      ))}

      {/* Tag Inputs */}
      {["services", "facilities", "departments"].map((type) => {
        const tags = formData[type as keyof Library];
        const tagList = Array.isArray(tags) ? tags : [];

        return (
          <div key={type}>
            <label className="block text-sm font-medium mb-1 capitalize">
              {type}
            </label>

            <div className="flex flex-wrap gap-2 mb-2">
              {tagList.map((tag, i) => (
                <div
                  key={i}
                  className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() =>
                      removeTag(
                        type as "services" | "facilities" | "departments",
                        i
                      )
                    }
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder={`Add ${type.slice(0, -1)}...`}
                value={tagInputs[type as keyof typeof tagInputs] || ""}
                onChange={(e) =>
                  setTagInputs((prev) => ({
                    ...prev,
                    [type]: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag(
                      type as "services" | "facilities" | "departments",
                      tagInputs[type as keyof typeof tagInputs]
                    );
                  }
                }}
              />
              <Button
                type="button"
                onClick={() =>
                  addTag(
                    type as "services" | "facilities" | "departments",
                    tagInputs[type as keyof typeof tagInputs]
                  )
                }
              >
                Add
              </Button>
            </div>
          </div>
        );
      })}

      {/* Footer Buttons */}
      <div className="flex gap-2 justify-end pt-4">
        <Button
          type="button"
          className="bg-gray-300 text-black hover:bg-gray-400"
          onClick={onCancel}
        >
          Cancel
        </Button>

        {initialData?.id && (
          <Button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white hover:bg-red-500"
          >
            Delete
          </Button>
        )}

        <Button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-400"
          disabled={loading}
        >
          {loading ? "Saving..." : initialData ? "Update" : "Add"} Library
        </Button>
      </div>
    </form>
  );
}
