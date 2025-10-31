"use client";

import { useState, useEffect } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import LibraryForm from "./LibraryForm";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// LibraryCard Component
function LibraryCard({
  library,
  onEdit,
  onDelete,
}: {
  library: any;
  onEdit: (lib: any) => void;
  onDelete: (id: string, name: string) => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      {library.libraryImageURL ? (
        <img
          src={library.libraryImageURL}
          alt={library.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}

      <div className="p-4">
        <h2 className="text-lg font-semibold">{library.name}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{library.description}</p>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            size="sm"
            variant="outline"
            className="bg-blue-600 hover:bg-blue-500 text-white"
            onClick={() => onEdit(library)}
          >
            <Edit className="h-4 w-4 mr-1" /> Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="bg-red-600 hover:bg-red-500 text-white"
            onClick={() => onDelete(library.id!, library.name)}
          >
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

// SkeletonCard for shimmer-loading
function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
      </div>
      <div className="p-4 space-y-2">
        <div className="h-5 bg-gray-300 rounded w-3/4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer" />
        </div>
        <div className="h-3 bg-gray-300 rounded w-1/2 relative overflow-hidden" />
        <div className="flex justify-end gap-2 mt-4">
          <div className="h-7 bg-gray-300 rounded w-16 relative overflow-hidden" />
          <div className="h-7 bg-gray-300 rounded w-16 relative overflow-hidden" />
        </div>
      </div>
    </div>
  );
}

// EmptyState Component
function EmptyState() {
  return (
    <div className="col-span-full text-center py-20 text-gray-400 italic">
      No libraries found.
    </div>
  );
}

// Main LibraryPage Component
export default function LibraryPage() {
  const [libraries, setLibraries] = useState<any[]>([]);
  const [selectedLibrary, setSelectedLibrary] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Real-time Firestore subscription
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "libraries"),
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as any),
        }));
        setLibraries(docs);
        setLoading(false);
      },
      (error) => {
        console.error("Realtime fetch error:", error);
        toast.error("Failed to fetch libraries ❌");
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleSave = () => {
    setShowForm(false);
    setSelectedLibrary(null);
    toast.success("Library saved successfully 🎉");
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedLibrary(null);
  };

  const handleDelete = (id: string, name: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <span>
            Delete <b>{name}</b>?
          </span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-500"
              onClick={async () => {
                try {
                  await deleteDoc(doc(db, "libraries", id));
                  setLibraries((prev) => prev.filter((i) => i.id !== id));
                  toast.dismiss(t.id);
                  toast.success(`"${name}" deleted ✅`);
                } catch (err) {
                  console.error("Delete error:", err);
                  toast.dismiss(t.id);
                  toast.error("Failed to delete ❌");
                }
              }}
            >
              Yes
            </button>
            <button
              className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  return (
    <div className="p-6">
      <Toaster position="top-right" reverseOrder={false} />

      <h1 className="text-xl font-bold mb-4">Library Manager</h1>

      {showForm ? (
        <LibraryForm
          initialData={selectedLibrary || undefined}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-500"
            onClick={() => setShowForm(true)}
          >
            + Add Library
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : libraries.length === 0
              ? <EmptyState />
              : libraries.map((lib) => (
                  <LibraryCard
                    key={lib.id}
                    library={lib}
                    onEdit={(l) => {
                      setSelectedLibrary(l);
                      setShowForm(true);
                    }}
                    onDelete={handleDelete}
                  />
                ))}
          </div>
        </>
      )}
    </div>
  );
}
