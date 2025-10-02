"use client";

import { useState, useEffect, KeyboardEvent } from "react";
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
  name?: string;
  category?: string;
  categories?: string;
  color?: string;
  description?: string;
  features?: string[];
  linkURL?: string;
  logoURL?: string;
  subjects?: string[];
  stats?: Record<string, string>;
  createdAt?: any;
  updatedAt?: any;
  counter?: number;
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
    id: "",
    name: "",
    category: "",
    categories: "",
    color: "",
    description: "",
    features: [],
    subjects: [],
    linkURL: "",
    logoURL: "",
    stats: {},
    counter: 0,
    createdAt: null,
    updatedAt: null,
  });

  const [preview, setPreview] = useState<string>(formData.logoURL || "");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [featureInput, setFeatureInput] = useState("");
  const [subjectInput, setSubjectInput] = useState("");

  // Normalize initialData
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        stats: { ...initialData.stats },
        features: Array.isArray(initialData.features)
          ? initialData.features
          : initialData.features
            ? String(initialData.features).split(",").map((v) => v.trim())
            : [],

        subjects: Array.isArray(initialData.subjects)
          ? initialData.subjects
          : initialData.subjects
            ? String(initialData.subjects).split(",").map((v) => v.trim())
            : [],
      });
      setPreview(initialData.logoURL || "");
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (formData.stats && name in formData.stats) {
      setFormData((prev) => ({
        ...prev,
        stats: { ...prev.stats, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: uploadData });
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
    const q = query(collection(db, "eResource"), orderBy("counter", "desc"), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return 1;
    const maxCounter = snapshot.docs[0].data().counter || 0;
    return maxCounter + 1;
  };

 const handlePasteData = () => {
  const pasted = prompt(
    "Paste your data block (JSON or JS object like your ERIC example)."
  );
  if (!pasted) return;

  try {
    // Parse JS object string safely
    const parsed: any = Function(`"use strict"; return (${pasted})`)();

    // Map keys to your form structure
    const mappedData: EResourceItem = {
      name: parsed.name || "",
      category: parsed.category || "",
      description: parsed.description || "",
      features: Array.isArray(parsed.features) ? parsed.features : [],
      subjects: Array.isArray(parsed.subjects) ? parsed.subjects : [],
      logoURL: parsed.logo || "",
      linkURL: parsed.url || "",
      color: parsed.color || "",
      stats: parsed.stats || {},
    };

    setFormData((prev) => ({
      ...prev,
      ...mappedData,
    }));

    setPreview(mappedData.logoURL || "");
    toast.success("Data pasted successfully!");
  } catch (err) {
    toast.error("Failed to parse data. Make sure the format is correct!");
    console.error(err);
  }
};



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSave = { ...formData };
      delete dataToSave.id;

      if (initialData?.id) {
        const docRef = doc(db, "eResource", initialData.id);
        await updateDoc(docRef, {
          ...dataToSave,
          updatedAt: serverTimestamp(),
        });
        toast.success("E-Resource updated ✅");
        onSave({ ...dataToSave, id: initialData.id });
      } else {
        const counter = await getNextCounter();
        const docRef = await addDoc(collection(db, "eResource"), {
          ...dataToSave,
          counter,
          uploadedBy: "admin",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        toast.success(`New E-Resource #${counter} added 🎉`);
        onSave({ ...dataToSave, id: docRef.id, counter });
      }
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "Failed to save E-Resource ❌";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const addTag = (type: "features" | "subjects", value: string) => {
    if (!value.trim()) return;

    setFormData((prev) => ({
      ...prev,
      [type]: Array.isArray(prev[type]) ? [...prev[type]!, value.trim()] : [value.trim()],
    }));

    if (type === "features") setFeatureInput("");
    else setSubjectInput("");
  };

  const removeTag = (type: "features" | "subjects", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [type]: Array.isArray(prev[type])
        ? prev[type]!.filter((_, i) => i !== index)
        : [],
    }));
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>, type: "features" | "subjects") => {
    const inputValue = type === "features" ? featureInput : subjectInput;

    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(type, inputValue);
    } else if (e.key === "Backspace" && !inputValue) {
      // Remove last tag if input is empty
      const tags = formData[type] || [];
      removeTag(type, tags.length - 1);
    }
  };

  const inputFields = [
    "name", "category", "categories", "color", "linkURL",
    "downloads", "papers", "authors", "books", "journals", "articles", "cases", "citations", "countries", "databases",
    "disciplines", "ebooks", "formats", "grants", "indicators", "institutions", "languages", "laws",
    "pages", "partners", "preprints", "programs", "publicDomain", "publishers", "records", "reports",
    "states", "subPerMonth", "updates", "variables", "years", "courts", "newspapers", "agencies"
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl h-[90vh] overflow-y-auto p-6">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit E-Resource" : "Add New E-Resource"}
        </h2>

           <Button
            type="button"
            className="bg-green-600 text-white hover:bg-green-500 mb-4"
            onClick={handlePasteData}
          >
            Paste Data
          </Button>

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
                  alt={formData.name || "Logo Preview"}
                  className="w-full h-40 object-contain rounded-md"
                />
              </div>
            )}
          </div>

          {/* Dynamic Inputs */}
          {inputFields.map((field) => (
            <div key={field} className="space-y-2">
              <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
              <Input
                type={field === "linkURL" ? "url" : "text"}
                name={field}
                value={
                  formData.stats && field in formData.stats
                    ? formData.stats[field as keyof typeof formData.stats] || ""
                    : formData[field as keyof EResourceItem] || ""
                }
                onChange={handleChange}
                placeholder={field}
              />
            </div>
          ))}

          {/* Features Tag Input */}
          <div className="space-y-2">
            <Label>Features</Label>
            <div className="flex flex-wrap gap-2 border rounded p-2 min-h-[44px] items-center">
              {formData.features?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag("features", index)}
                    className="font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
              <Input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => handleTagKeyDown(e, "features")}
                placeholder="Type and press Enter"
                className="flex-1 min-w-[120px] border-none focus:ring-0"
              />
            </div>
          </div>

          {/* Subjects Tag Input */}
          <div className="space-y-2">
            <Label>Subjects</Label>
            <div className="flex flex-wrap gap-2 border rounded p-2 min-h-[44px] items-center">
              {formData.subjects?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 px-2 py-1 rounded flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag("subjects", index)}
                    className="font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
              <Input
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                onKeyDown={(e) => handleTagKeyDown(e, "subjects")}
                placeholder="Type and press Enter"
                className="flex-1 min-w-[120px] border-none focus:ring-0"
              />
            </div>
          </div>

          {/* Description */}
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
