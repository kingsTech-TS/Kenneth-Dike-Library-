"use client";

import { useState, useEffect } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import LibrariansForm, { LibrariansItem } from "./LibrariansForm";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// LibrarianCard Component
function LibrarianCard({
  item,
  onEdit,
  onDelete,
}: {
  item: LibrariansItem;
  onEdit: (i: LibrariansItem) => void;
  onDelete: (id: string, name: string) => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      {item.imageURL ? (
        <img
          src={item.imageURL}
          alt={item.fullName || "Librarian"}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm italic">
          No Image Available
        </div>
      )}

      <div className="p-4">
        <h2 className="text-lg font-semibold">{item.fullName}</h2>
        <p className="text-sm text-gray-600">{item.designation}</p>
        <p className="text-xs text-gray-500">{item.department}</p>
        <p className="text-xs text-gray-500 italic">{item.period}</p>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            size="sm"
            variant="outline"
            className="bg-blue-600 hover:bg-blue-500 text-white"
            onClick={() => onEdit(item)}
          >
            <Edit className="h-4 w-4 mr-1" /> Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="bg-red-600 hover:bg-red-500 text-white"
            onClick={() => onDelete(item.id!, item.fullName)}
          >
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

// SkeletonCard Component for shimmer loading
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
        <div className="h-3 bg-gray-300 rounded w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer" />
        </div>
        <div className="h-3 bg-gray-300 rounded w-1/3 relative overflow-hidden mt-1">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer" />
        </div>
        <div className="h-3 bg-gray-300 rounded w-1/4 relative overflow-hidden mt-1">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer" />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <div className="h-7 bg-gray-300 rounded w-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer" />
          </div>
          <div className="h-7 bg-gray-300 rounded w-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}

// EmptyState Component
function EmptyState() {
  return (
    <div className="col-span-full text-center py-20 text-gray-400 italic">
      No librarians found.
    </div>
  );
}

// Main LibrariansPage Component
export default function LibrariansPage() {
  const [items, setItems] = useState<LibrariansItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<LibrariansItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Real-time Firestore subscription
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "librarians"),
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as LibrariansItem),
        }));
        setItems(docs);
        setLoading(false);
      },
      (error) => {
        console.error("Realtime fetch error:", error);
        toast.error("Failed to fetch librarians ❌");
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleSave = () => {
    setShowForm(false);
    setSelectedItem(null);
    toast.success("Librarian saved successfully 🎉");
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedItem(null);
  };

  const handleDelete = async (id: string, name: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="text-sm">
            Delete librarian <b>{name}</b>?
          </p>
          <div className="flex gap-2 justify-end">
            <Button
              size="sm"
              variant="destructive"
              onClick={async () => {
                try {
                  await deleteDoc(doc(db, "librarians", id));
                  setItems((prev) => prev.filter((i) => i.id !== id));
                  toast.success(`"${name}" deleted ✅`);
                } catch (err) {
                  console.error("Delete error:", err);
                  toast.error("Failed to delete ❌");
                }
                toast.dismiss(t.id);
              }}
            >
              Yes, Delete
            </Button>
            <Button size="sm" variant="outline" onClick={() => toast.dismiss(t.id)}>
              Cancel
            </Button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  return (
    <div className="p-6">
      <Toaster position="top-right" reverseOrder={false} />

      <h1 className="text-xl font-bold mb-4">Librarians Manager</h1>

      {showForm ? (
        <LibrariansForm
          initialData={selectedItem}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-500"
            onClick={() => setShowForm(true)}
          >
            + Add Librarian
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : items.length === 0
              ? <EmptyState />
              : items.map((item) => (
                  <LibrarianCard
                    key={item.id}
                    item={item}
                    onEdit={(i) => {
                      setSelectedItem(i);
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
