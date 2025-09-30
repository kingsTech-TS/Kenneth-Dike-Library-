"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import StaffForm, { StaffItem } from "./StaffForm";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function StaffPage() {
  const [items, setItems] = useState<StaffItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<StaffItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch staff members
  const fetchItems = async () => {
    try {
      const snapshot = await getDocs(collection(db, "staff"));
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as StaffItem),
      }));
      setItems(docs);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to fetch staff ❌");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = () => {
    fetchItems();
    setShowForm(false);
    setSelectedItem(null);
    toast.success("Staff saved successfully 🎉");
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
            Delete staff member <b>{name}</b>?
          </p>
          <div className="flex gap-2 justify-end">
            <Button
              size="sm"
              variant="destructive"
              onClick={async () => {
                try {
                  await deleteDoc(doc(db, "staff", id));
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
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.dismiss(t.id)}
            >
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

      <h1 className="text-xl font-bold mb-4">Staff Manager</h1>

      {showForm ? (
        <StaffForm
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
            + Add Staff
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {/* Staff Image */}
                {item.imageURL ? (
                  <img
                    src={item.imageURL}
                    alt={item.first || "Staff"}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm italic">
                    No Image Available
                  </div>
                )}

                {/* Content */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold">
                    {item.first} {item.otherNames} {item.surname}
                  </h2>
                  <p className="text-sm text-gray-600">{item.designation}</p>
                  <p className="text-xs text-gray-500">{item.department}</p>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-blue-600 hover:bg-blue-500 text-white"
                      onClick={() => {
                        setSelectedItem(item);
                        setShowForm(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-500 text-white"
                      onClick={() =>
                        handleDelete(item.id!, `${item.first} ${item.surname}`)
                      }
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
