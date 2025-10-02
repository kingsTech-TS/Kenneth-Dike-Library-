"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

export interface EResourceItem {
  id?: string;
  color?: string;
  papers?: string;
  authors?: string;
  category?: string;
  description?: string;
  downloads?: string;
  features?: string;
  linkURL?: string;
  logoURL?: string;
  name?: string;
  subjects?: string;
  counter?: number;
  createdAt?: any;
  updatedAt?: any;
}

interface EResourcesFormProps {
  initialData?: EResourceItem | null;
  onSave: (data: EResourceItem) => void;
  onCancel: () => void;
}

export default function EResourcesForm({
  initialData,
  onSave,
  onCancel,
}: EResourcesFormProps) {
  const [formData, setFormData] = useState<EResourceItem>({
    id: undefined,
    color: "",
    papers: "",
    authors: "",
    category: "",
    description: "",
    downloads: "",
    features: "",
    linkURL: "",
    logoURL:
      "https://res.cloudinary.com/dskj6z1lj/image/upload/v1743679356/nk6w9kiiwkz3xjrnnw1c.webp",
    name: "",
    subjects: "",
    counter: undefined,
  });

  const [preview, setPreview] = useState<string>(formData.logoURL || "");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setPreview(initialData.logoURL || "");
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

      if (!res.ok || data.error) {
        toast.error(`Upload failed: ${data.error?.message || "Unknown error"}`);
        return;
      }

      const logoURL = data.secure_url;
      if (!logoURL) {
        toast.error("Upload succeeded but no logo URL returned ❌");
        return;
      }

      toast.success("Upload successful!");
      setFormData((prev) => ({ ...prev, logoURL }));
      setPreview(logoURL);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  const getNextCounter = async (): Promise<number> => {
    const q = query(
      collection(db, "eResource"),
      orderBy("counter", "desc"),
      limit(1)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return 1;
    const maxCounter = snapshot.docs[0].data().counter || 0;
    return maxCounter + 1;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSave = { ...formData };
      delete dataToSave.id; // remove id before saving

      if (initialData?.id) {
        const docRef = doc(db, "eResource", initialData.id);
        await updateDoc(docRef, {
          ...dataToSave,
          updatedAt: serverTimestamp(),
        });
        toast.success("E-Resource updated ✅");
      } else {
        const counter = await getNextCounter();
        await addDoc(collection(db, "eResource"), {
          ...dataToSave,
          counter,
          uploadedBy: "admin",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        toast.success(`New E-Resource #${counter} added 🎉`);
      }

      onSave(formData);
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "Failed to save E-Resource ❌";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl h-[90vh] overflow-y-auto p-6">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit E-Resource" : "Add New E-Resource"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Logo Upload */}
          <div className="space-y-2">
            <Label>Upload Logo</Label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {uploading && <p className="text-xs text-gray-500">Uploading...</p>}
            {preview && (
              <div className="mt-2 rounded-lg border p-2 bg-gray-50">
                <img
                  src={preview}
                  alt="Logo Preview"
                  className="w-full h-40 object-contain rounded-md"
                />
              </div>
            )}
          </div>

          {/* Controlled Inputs */}
          {[
            { label: "Name", name: "name", required: true, type: "text" },
            { label: "Category", name: "category", required: true, type: "text" },
            { label: "Color", name: "color", required: false, type: "text" },
            { label: "Papers", name: "papers", required: false, type: "text" },
            { label: "Authors", name: "authors", required: false, type: "text" },
            { label: "Downloads", name: "downloads", required: false, type: "text" },
            { label: "Subjects", name: "subjects", required: false, type: "text" },
            { label: "Resource Link", name: "linkURL", required: true, type: "url" },
          ].map((field) => (
            <div key={field.name} className="space-y-2">
              <Label>{field.label}</Label>
              <Input
                type={field.type}
                name={field.name}
                value={formData[field.name as keyof EResourceItem] || ""}
                onChange={handleChange}
                placeholder={field.label}
                required={field.required}
              />
            </div>
          ))}

          {/* Textareas */}
          <div className="space-y-2">
            <Label>Features</Label>
            <Textarea
              name="features"
              value={formData.features || ""}
              onChange={handleChange}
              placeholder="Key features or highlights"
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Enter a detailed description..."
              required
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 sticky bottom-0 bg-white pb-2">
            <Button
              type="button"
              className="bg-red-600 text-white hover:bg-red-500"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-500"
              disabled={loading || uploading || !formData.logoURL}
            >
              {loading ? "Saving..." : initialData ? "Update" : "Add"} Resource
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
