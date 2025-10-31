// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import toast from "react-hot-toast";
// import { News } from "../../../../data/newsData";

// interface NewsFormProps {
//   initialData?: News & { id?: string };
//   onSave?: (data: Partial<News>) => void;
//   onCancel?: () => void;
// }

// export default function NewsForm({ initialData, onSave, onCancel }: NewsFormProps) {
//   const defaultForm: Partial<News> = {
//     title: "",
//     category: "",
//     description: "",
//     imageUrl: "",
//     author: "",
//     status: "Draft",
//     tags: [],
//   };

//   const [form, setForm] = useState<Partial<News>>(initialData || defaultForm);
//   const [loading, setLoading] = useState(false);

//   // 👉 Handle text input
//   const handleChange = (field: keyof News, value: any) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//   };

//   // 👉 Handle file input (preview only for now)
//   const handleFileChange = (file: File | null) => {
//     if (file) {
//       const fileUrl = URL.createObjectURL(file);
//       setForm((prev) => ({ ...prev, imageUrl: fileUrl }));
//     }
//   };

//   // 👉 Handle tags
//   const handleTagsChange = (value: string) => {
//     setForm((prev) => ({ ...prev, tags: value.split(",").map((t) => t.trim()).filter(Boolean) }));
//   };

//   // 👉 Cancel
//   const handleCancel = () => {
//     setForm(initialData || defaultForm);
//     onCancel?.();
//   };

//   // 👉 Save via API
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // 🔹 Keep only editable fields
//       const { title, category, description, author, status, tags, imageUrl } = form;
//       const payload = { title, category, description, author, status, tags, imageUrl };

//       let res;
//       if (initialData?.id) {
//         // ✅ Update existing
//         res = await fetch(`/api/news/${initialData.id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         });
//       } else {
//         // ✅ Create new
//         res = await fetch("/api/news", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         });
//       }

//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err.error || "Failed to save news");
//       }

//       const data = await res.json();
//       toast.success("✅ News saved successfully!");
//       onSave?.(data);
//       setForm(defaultForm);
//     } catch (err: any) {
//       console.error("Error saving news:", err);
//       toast.error(err.message || "❌ Failed to save news");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-semibold text-gray-800">
//           {initialData ? "Edit News" : "Add News"}
//         </h2>
//         <Button
//           type="button"
//           onClick={handleCancel}
//           className="text-gray-500 hover:text-gray-700"
//         >
//           ✕
//         </Button>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
//         {/* Title */}
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium">Title</label>
//           <Input
//             id="title"
//             type="text"
//             value={form.title || ""}
//             onChange={(e) => handleChange("title", e.target.value)}
//             required
//           />
//         </div>

//         {/* Category */}
//         <div>
//           <label htmlFor="category" className="block text-sm font-medium">Category</label>
//           <Input
//             id="category"
//             type="text"
//             value={form.category || ""}
//             onChange={(e) => handleChange("category", e.target.value)}
//             required
//           />
//         </div>

//         {/* Author */}
//         <div>
//           <label htmlFor="author" className="block text-sm font-medium">Author</label>
//           <Input
//             id="author"
//             type="text"
//             value={form.author || ""}
//             onChange={(e) => handleChange("author", e.target.value)}
//             required
//           />
//         </div>

//         {/* Image */}
//         <div>
//           <label htmlFor="imageUrl" className="block text-sm font-medium">Image</label>
//           <Input
//             id="imageUrl"
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
//           />
//           {form.imageUrl && (
//             <img
//               src={form.imageUrl}
//               alt="Preview"
//               className="mt-2 w-32 h-32 object-cover rounded"
//             />
//           )}
//         </div>

//         {/* Description */}
//         <div>
//           <label htmlFor="description" className="block text-sm font-medium">Description</label>
//           <Textarea
//             id="description"
//             value={form.description || ""}
//             onChange={(e) => handleChange("description", e.target.value)}
//             rows={5}
//             required
//           />
//         </div>

//         {/* Status */}
//         <div>
//           <label htmlFor="status" className="block text-sm font-medium">Status</label>
//           <select
//             id="status"
//             value={form.status || "Draft"}
//             onChange={(e) => handleChange("status", e.target.value)}
//             className="border rounded px-2 py-1 w-full"
//           >
//             <option value="Draft">Draft</option>
//             <option value="Published">Published</option>
//             <option value="Scheduled">Scheduled</option>
//           </select>
//         </div>

//         {/* Tags */}
//         <div>
//           <label htmlFor="tags" className="block text-sm font-medium">Tags (comma separated)</label>
//           <Input
//             id="tags"
//             type="text"
//             value={form.tags?.join(", ") || ""}
//             onChange={(e) => handleTagsChange(e.target.value)}
//           />
//           <small className="text-gray-500">Separate tags with commas</small>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end gap-3 pt-4">
//           <Button
//             type="button"
//             onClick={handleCancel}
//             className="px-4 py-2 rounded border bg-red-600 text-white hover:bg-red-500"
//           >
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             disabled={loading}
//             className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500"
//           >
//             {loading ? "Saving..." : "Save"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }
