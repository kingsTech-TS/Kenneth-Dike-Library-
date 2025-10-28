"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

export interface StaffItem {
  id?: string;
  first: string;
  otherNames?: string;
  surname: string;
  department: string;
  designation: string;
  position?: number;
  email?: string;
  phoneNumber?: string;
  imageURL?: string;
  createdAt?: any;
  updatedAt?: any;
}

interface StaffFormProps {
  initialData?: StaffItem | null;
  onSave: (data: StaffItem) => Promise<void> | void;
  onCancel: () => void;
}

export default function StaffForm({ initialData, onSave, onCancel }: StaffFormProps) {
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
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  // Populate form on edit
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (initialData.imageURL) setPreview(initialData.imageURL);
    }
  }, [initialData]);

  // Handle input updates
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    const formatName = (val: string) =>
      val
        .trim()
        .toLowerCase()
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

    let newValue = value;
    if (["first", "surname", "otherNames", "designation", "department"].includes(name)) {
      newValue = formatName(value);
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  // Upload image
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formDataUpload });
      const data = await res.json();

      if (!res.ok || !data.secure_url) throw new Error("Upload failed");

      setFormData((prev) => ({ ...prev, imageURL: data.secure_url }));
      setPreview(data.secure_url);
      toast.success("Image uploaded successfully ✅");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Image upload failed ❌");
    } finally {
      setUploading(false);
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.first || !formData.surname || !formData.designation || !formData.department) {
      toast.error("Please fill in all required fields ❌");
      return;
    }

    try {
      setLoading(true);
      await onSave(formData);
      toast.success(initialData ? "Staff updated ✅" : "Staff added ✅");
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Failed to save staff ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-xl shadow-md">
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

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
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

      {/* Contact Info */}
      <Input
        name="email"
        type="email"
        value={formData.email || ""}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <Input
        name="phoneNumber"
        type="tel"
        value={formData.phoneNumber || ""}
        onChange={handleChange}
        placeholder="Phone Number"
        required
      />

      {/* Work Info */}
      <Input
        name="designation"
        value={formData.designation}
        onChange={handleChange}
        placeholder="Designation"
        required
      />
      <Textarea
        name="department"
        value={formData.department}
        onChange={handleChange}
        placeholder="Department"
        required
      />

      {/* Buttons */}
      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          className="bg-red-600 hover:bg-red-500 text-white"
          onClick={onCancel}
          disabled={loading || uploading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white"
          disabled={loading || uploading}
        >
          {loading ? "Saving..." : initialData ? "Update Staff" : "Add Staff"}
        </Button>
      </div>
    </form>
  );
}
