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
} from "firebase/firestore";
import { db } from "../../../../lib/firebase";

export interface LibrariansItem {
  id?: string;
  fullName: string;
  designation: string;
  department: string;
  office: string;
  period: string;
  yearsOfExperience: number;
  education: string;
  researchInterests: string;
  bio: string;
  email: string;
  phone: string;
  imageURL: string;
  createdAt?: Date;
  updatedAt?: Date;
  slug: string;
  position?: number; // ✅ new field
}

interface LibrariansFormProps {
  initialData?: LibrariansItem | null;
  onSave: (data: LibrariansItem) => void;
  onCancel: () => void;
}

export default function LibrariansForm({
  initialData,
  onSave,
  onCancel,
}: LibrariansFormProps) {
  const [formData, setFormData] = useState<LibrariansItem>({
    id: undefined,
    fullName: "",
    designation: "",
    department: "",
    office: "",
    period: "",
    yearsOfExperience: 0,
    education: "",
    researchInterests: "",
    bio: "",
    email: "",
    phone: "",
    imageURL: "",
    slug: "",
    position: undefined,
  });

  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // ✅ Merge initialData safely
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        fullName: initialData.fullName || "",
        designation: initialData.designation || "",
        department: initialData.department || "",
        office: initialData.office || "",
        period: initialData.period || "",
        yearsOfExperience: initialData.yearsOfExperience ?? 0,
        education: initialData.education || "",
        researchInterests: initialData.researchInterests || "",
        bio: initialData.bio || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        imageURL: initialData.imageURL || "",
        slug: initialData.slug || "",
        position: initialData.position,
      }));
      setPreview(initialData.imageURL || "");
    }
  }, [initialData]);

  // ✅ Auto-generate slug whenever fullName changes
  useEffect(() => {
    if (formData.fullName.trim().length > 0) {
      const generatedSlug = formData.fullName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    } else {
      setFormData((prev) => ({ ...prev, slug: "" }));
    }
  }, [formData.fullName]);

  // ✅ Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "yearsOfExperience" ? Number(value) : value,
    }));
  };

  // ✅ Handle file upload
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
      if (!res.ok || data.error) {
        toast.error(`Upload failed: ${data.error?.message || "Unknown error"}`);
        return;
      }

      const imageURL = data.secure_url || data.url;
      if (!imageURL) {
        toast.error("Upload succeeded but no image URL returned ❌");
        return;
      }

      toast.success("Upload successful!");
      setFormData((prev) => ({ ...prev, imageURL }));
      setPreview(imageURL);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { id, ...dataToSave } = formData;

      if (initialData?.id) {
        // 🟩 Update existing librarian
        const docRef = doc(db, "librarians", initialData.id);
        await updateDoc(docRef, {
          ...dataToSave,
          updatedAt: serverTimestamp(),
        });
        toast.success("Librarian updated ✅");
      } else {
        // 🟦 Add new librarian → find next position value
        const q = query(collection(db, "librarians"), orderBy("position", "asc"));
        const snapshot = await getDocs(q);
        const lastPosition =
          snapshot.docs.length > 0
            ? (snapshot.docs[snapshot.docs.length - 1].data().position ?? 0)
            : 0;
        const nextPosition = lastPosition + 1;

        await addDoc(collection(db, "librarians"), {
          ...dataToSave,
          position: nextPosition, // ✅ Assign next available position
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        toast.success("New librarian added 🎉");
      }

      onSave(formData);
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "Failed to save librarian ❌";
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
        <label className="block text-sm font-medium mb-1">Profile Image</label>
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

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <Input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter full name"
        />
      </div>

      {/* Auto-generated Slug */}
      <div>
        <label className="block text-sm font-medium mb-1">Slug</label>
        <Input
          name="slug"
          value={formData.slug}
          readOnly
          className="bg-gray-100 cursor-not-allowed"
          placeholder="auto-generated from name"
        />
      </div>

      {/* Designation */}
      <div>
        <label className="block text-sm font-medium mb-1">Designation</label>
        <Input
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          placeholder="University Librarian"
        />
      </div>

      {/* Department */}
      <div>
        <label className="block text-sm font-medium mb-1">Department</label>
        <Input
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Administration"
        />
      </div>

      {/* Office */}
      <div>
        <label className="block text-sm font-medium mb-1">Office</label>
        <Input
          name="office"
          value={formData.office}
          onChange={handleChange}
          placeholder="Office location"
        />
      </div>

      {/* Period */}
      <div>
        <label className="block text-sm font-medium mb-1">Period</label>
        <Input
          name="period"
          value={formData.period}
          onChange={handleChange}
          placeholder="2022 - present"
        />
      </div>

      {/* Years of Experience */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Years of Experience
        </label>
        <Input
          type="number"
          name="yearsOfExperience"
          value={formData.yearsOfExperience}
          onChange={handleChange}
          placeholder="22"
        />
      </div>

      {/* Education */}
      <div>
        <label className="block text-sm font-medium mb-1">Education</label>
        <Textarea
          name="education"
          value={formData.education}
          onChange={handleChange}
          placeholder="Enter education details"
        />
      </div>

      {/* Research Interests */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Research Interests
        </label>
        <Textarea
          name="researchInterests"
          value={formData.researchInterests}
          onChange={handleChange}
          placeholder="Enter research interests"
        />
      </div>

      {/* Biography */}
      <div>
        <label className="block text-sm font-medium mb-1">Biography</label>
        <Textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Enter biography"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <Input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={(e) => {
            const digitsOnly = e.target.value.replace(/\D/g, "");
            setFormData((prev) => ({ ...prev, phone: digitsOnly }));
          }}
          placeholder="Enter phone number"
        />
      </div>

      {/* Timestamps */}
      {initialData?.createdAt && (
        <p className="text-xs text-gray-500">
          Created: {new Date(initialData.createdAt).toLocaleString()}
        </p>
      )}
      {initialData?.updatedAt && (
        <p className="text-xs text-gray-500">
          Updated: {new Date(initialData.updatedAt).toLocaleString()}
        </p>
      )}

      {/* Buttons */}
      <div className="flex gap-2 justify-end">
        <Button
          type="button"
          className="bg-red-600 text-white hover:bg-red-400"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-400"
          disabled={loading || uploading || !formData.imageURL}
        >
          {loading ? "Saving..." : initialData ? "Update" : "Add"} Librarian
        </Button>
      </div>
    </form>
  );
}
