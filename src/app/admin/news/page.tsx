// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import toast, { Toaster } from "react-hot-toast";
// import NewsForm from "./NewsForm";
// import { Heart, Eye, Calendar } from "lucide-react";

// // ✅ News type
// export interface News {
//   id?: string;
//   title: string;
//   description: string;
//   author: string;
//   category?: string;
//   status?: "Draft" | "Published" | "Archived";
//   createdAt?: string;
//   updatedAt?: string;
//   imageUrl?: string;
//   likes: string[];
//   tags: string[];
//   views: number;
// }

// export default function NewsManager() {
//   const [newsList, setNewsList] = useState<News[]>([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingItem, setEditingItem] = useState<News | null>(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Convert Firestore timestamps
//   const normalizeNews = (doc: any): News => ({
//     ...doc,
//     createdAt: doc.createdAt?._seconds
//       ? new Date(doc.createdAt._seconds * 1000).toISOString()
//       : doc.createdAt,
//     updatedAt: doc.updatedAt?._seconds
//       ? new Date(doc.updatedAt._seconds * 1000).toISOString()
//       : doc.updatedAt,
//   });

//   // ✅ Reusable function to fetch news
//   const fetchNews = async () => {
//     try {
//       const res = await fetch("/api/news");
//       if (!res.ok) throw new Error("Failed to fetch");
//       const data = await res.json();
//       setNewsList(data.map(normalizeNews));
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch news");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNews();
//   }, []);

//   // ✅ Save (Add or Update)
//   const handleSave = async (data: Partial<News>) => {
//     try {
//       let res;
//       if (editingItem?.id) {
//         // 🔄 Update existing
//         res = await fetch(`/api/news/${editingItem.id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(data),
//         });
//       } else {
//         // ➕ Add new
//         res = await fetch("/api/news", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(data),
//         });
//       }

//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err.error || "Request failed");
//       }

//       toast.success(
//         editingItem ? "✅ News updated successfully!" : "🎉 News added successfully!"
//       );

//       await fetchNews();
//     } catch (error: any) {
//       console.error(error);
//       toast.error(error.message || "Error saving news");
//     }

//     setEditingItem(null);
//     setShowForm(false);
//   };

//   // ✅ Cancel form
//   const handleCancel = () => {
//     setEditingItem(null);
//     setShowForm(false);
//     toast("Action cancelled ❌", { icon: "🚫" });
//   };

//   // ✅ Delete
//   const handleDelete = (item: News) => {
//     toast((t) => (
//       <div className="flex flex-col gap-2">
//         <span className="font-medium">Delete “{item.title}”?</span>
//         <div className="flex gap-2 justify-end">
//           <Button
//             size="sm"
//             className="bg-gray-200 text-black hover:bg-gray-300"
//             onClick={() => toast.dismiss(t.id)}
//           >
//             Cancel
//           </Button>
//           <Button
//             size="sm"
//             className="bg-red-600 hover:bg-red-700 text-white"
//             onClick={async () => {
//               try {
//                 const res = await fetch(`/api/news/${item.id}`, {
//                   method: "DELETE",
//                 });

//                 if (!res.ok) {
//                   const err = await res.json();
//                   throw new Error(err.error || "Delete failed");
//                 }

//                 toast.success(`🗑️ “${item.title}” deleted`);
//                 await fetchNews();
//               } catch (err: any) {
//                 console.error(err);
//                 toast.error(err.message || "Failed to delete");
//               } finally {
//                 toast.dismiss(t.id);
//               }
//             }}
//           >
//             Delete
//           </Button>
//         </div>
//       </div>
//     ));
//   };

//   return (
//     <div className="p-6">
//       <Toaster position="top-right" />

//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">News Management</h2>
//         <Button
//           onClick={() => {
//             setEditingItem(null);
//             setShowForm(true);
//           }}
//           className="bg-blue-600 hover:bg-blue-700 text-white"
//         >
//           + Add News
//         </Button>
//       </div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : newsList.length === 0 ? (
//         <p className="italic text-gray-500">No news yet. Click “Add News”.</p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {newsList.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white rounded-xl shadow overflow-hidden flex flex-col"
//             >
//               <div className="h-48 bg-gray-200 flex items-center justify-center">
//                 {item.imageUrl ? (
//                   <img
//                     src={item.imageUrl}
//                     alt={item.title}
//                     className="h-full w-full object-cover"
//                   />
//                 ) : (
//                   <div className="text-gray-400 text-sm">No Image</div>
//                 )}
//               </div>

//               <div className="p-4 flex flex-col flex-grow">
//                 <h3 className="text-lg font-semibold">{item.title}</h3>
//                 <p className="text-sm text-gray-600 mt-2 line-clamp-3">
//                   {item.description}
//                 </p>

//                 <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
//                   <span>{item.author}</span>
//                   <span className="flex items-center gap-1">
//                     <Calendar size={14} />
//                     {item.createdAt
//                       ? new Date(item.createdAt).toLocaleDateString()
//                       : "—"}
//                   </span>
//                 </div>

//                 <div className="flex flex-wrap gap-2 mt-3">
//                   {item.tags?.map((tag, i) => (
//                     <span
//                       key={i}
//                       className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>

//                 <div className="flex justify-between items-center text-xs text-gray-600 mt-4">
//                   <div className="flex items-center gap-1">
//                     <Heart className="text-red-500" size={16} />
//                     {item.likes?.length || 0}
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Eye size={16} className="text-blue-500" />
//                     {item.views || 0}
//                   </div>
//                 </div>

//                 <div className="mt-4 flex justify-end gap-2">
//                   <Button
//                     onClick={() => {
//                       setEditingItem(item);
//                       setShowForm(true);
//                     }}
//                     className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3"
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     onClick={() => handleDelete(item)}
//                     className="bg-red-600 hover:bg-red-700 text-white text-sm px-3"
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {showForm && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <NewsForm
//             initialData={editingItem || undefined}
//             onSave={handleSave}
//             onCancel={handleCancel}
//           />
//         </div>
//       )}
//     </div>
//   );
// }


import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page