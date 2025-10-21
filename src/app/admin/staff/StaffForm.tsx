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
} from "firebase/firestore";
import { db } from "../../../../lib/firebase";

export interface StaffItem {
  id?: string;
  first: string;
  otherNames?: string;
  surname: string;
  department: string;
  designation: string;
  email?: string;
  phoneNumber?: string;
  imageURL?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface StaffFormProps {
  initialData?: StaffItem | null;
  onSave: (data: StaffItem) => void;
  onCancel: () => void;
}

export default function StaffForm({
  initialData,
  onSave,
  onCancel,
}: StaffFormProps) {
  const [formData, setFormData] = useState<StaffItem>({
    first: "",
    surname: "",
    otherNames: "",
    email: "",
    phoneNumber: "",
    designation: "",
    department: "",
    imageURL: "",
  });

  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (initialData.imageURL) {
        setPreview(initialData.imageURL);
      }
    }
  }, [initialData]);

// Handle text input
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;
  let formattedValue = value;


  // Rule 2: Capitalize the first letter of every word (for title/department)
   if (["designation", "department", "surname", "first", "otherNames"].includes(name)) {
    formattedValue = value
      .toLowerCase()
      .split(" ")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");
  }

  setFormData((prev) => ({ ...prev, [name]: formattedValue }));
};




  // Handle file upload
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
      console.log("Upload API response:", data);

      if (!res.ok || data.error) {
        toast.error(`Upload failed: ${data.error?.message || "Unknown error"}`);
        return;
      }

      if (!data.secure_url) {
        toast.error("No image URL returned from server ❌");
        return;
      }

      toast.success("Upload successful!");
      setFormData((prev) => ({ ...prev, imageURL: data.secure_url }));
      setPreview(data.secure_url);
    } catch (err: any) {
      toast.error(err.message || "Unexpected error");
    } finally {
      setUploading(false);
    }
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (initialData?.id) {
        const docRef = doc(db, "staff", initialData.id);
        await updateDoc(docRef, {
          ...formData,
          updatedAt: serverTimestamp(),
        });
        toast.success("Staff member updated ✅");
      } else {
        await addDoc(collection(db, "staff"), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        toast.success("New staff member added 🎉");
      }
      onSave(formData);
    } catch (err: any) {
      toast.error(err.message || "Failed to save staff ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-xl shadow-md"
    >
      {/* Upload Image */}
      <div>
        <label className="block text-sm font-medium mb-1">Upload Image</label>
        <Input type="file" accept="image/*" onChange={handleFileChange} />
        {uploading && <p className="text-xs text-gray-500">Uploading...</p>}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-2 w-full h-40 object-cover rounded-lg border"
          />
        )}
      </div>

      {/* Names */}
      <div className="grid grid-cols-3 gap-2">
        <Input
          name="first"
          value={formData.first}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <Input
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          placeholder="Surname"
          required
        />
        <Input
          name="otherNames"
          value={formData.otherNames || ""}
          onChange={handleChange}
          placeholder="Other Names"
        />
      </div>

      {/* Email */}
      <Input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />

      {/* Phone */}
      <Input
        name="phoneNumber"
        type="tel"
        value={formData.phoneNumber || ""}
        onChange={handleChange}
        placeholder="Phone Number"
        required
      />

      {/* Designation */}
      <Input
        name="designation"
        value={formData.designation}
        onChange={handleChange}
        placeholder="Designation"
        required
      />

      {/* Department */}
      <Textarea
        name="department"
        value={formData.department}
        onChange={handleChange}
        placeholder="Department"
        required
      />

      {/* Actions */}
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
          disabled={loading || uploading}
        >
          {loading ? "Saving..." : initialData ? "Update" : "Add"} Staff
        </Button>
      </div>
    </form>
  );
}
