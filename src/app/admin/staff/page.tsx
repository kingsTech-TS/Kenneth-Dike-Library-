"use client";

import { useState, useEffect } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  getDocs,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import StaffForm, { StaffItem } from "./StaffForm";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, GripVertical } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

// ================== UI Components ==================
function StaffCard({
  item,
  onEdit,
  onDelete,
}: {
  item: StaffItem;
  onEdit: (i: StaffItem) => void;
  onDelete: (id: string, name: string) => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
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

      <div className="p-4">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-lg font-semibold">
            {item.first} {item.otherNames} {item.surname}
          </h2>
          <GripVertical className="cursor-grab text-gray-400" />
        </div>
        <p className="text-sm text-gray-600">{item.designation}</p>
        <p className="text-xs text-gray-500">{item.department}</p>

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
            onClick={() => onDelete(item.id!, `${item.first} ${item.surname}`)}
          >
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-5 bg-gray-300 rounded w-3/4" />
        <div className="h-3 bg-gray-300 rounded w-1/2" />
        <div className="h-3 bg-gray-300 rounded w-1/3" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full text-center py-20 text-gray-400 italic">
      No staff members found.
    </div>
  );
}

// ================== MAIN PAGE ==================
export default function StaffPage() {
  const [items, setItems] = useState<StaffItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<StaffItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch staff (safe, works even if 'position' missing)
  useEffect(() => {
    console.log("📡 Listening for staff...");

    const q = query(collection(db, "staff"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const staffList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as StaffItem),
        }));

        // Sort by position (fallback to 0)
        const sorted = staffList.sort(
          (a, b) => (a.position ?? 0) - (b.position ?? 0)
        );

        console.log("✅ Fetched staff:", sorted);
        setItems(sorted);
        setLoading(false);
      },
      (error) => {
        console.error("❌ Realtime fetch error:", error);
        toast.error("Failed to fetch staff ❌");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // 🔹 Add or update staff
  const handleSaveStaff = async (data: StaffItem) => {
    try {
      if (data.id) {
        // Update existing
        await updateDoc(doc(db, "staff", data.id), {
          ...data,
          updatedAt: new Date(),
        });
        toast.success("Staff updated successfully ✅");
      } else {
        // Add new
        const snap = await getDocs(collection(db, "staff"));
        const newPosition = (snap.size || 0) + 1;

        await addDoc(collection(db, "staff"), {
          ...data,
          position: newPosition,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        toast.success("New staff added 🎉");
      }

      setShowForm(false);
      setSelectedItem(null);
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Failed to save staff ❌");
    }
  };

  // 🔹 Delete staff member
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
                  toast.success(`"${name}" deleted ✅`);
                } catch {
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

  // 🔹 Handle drag reorder
  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination || result.source.index === result.destination.index)
      return;

    const reordered = Array.from(items);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setItems(reordered);

    toast.promise(
      Promise.all(
        reordered.map((item, index) =>
          updateDoc(doc(db, "staff", item.id!), { position: index + 1 })
        )
      ),
      {
        loading: "Saving new order...",
        success: "Order updated ✅",
        error: "Failed to update order ❌",
      }
    );
  };

  return (
    <div className="p-6">
      <Toaster position="top-right" />
      <h1 className="text-xl font-bold mb-4">Staff Manager</h1>

      {showForm ? (
        <StaffForm
          initialData={selectedItem}
          onSave={handleSaveStaff}
          onCancel={() => {
            setShowForm(false);
            setSelectedItem(null);
          }}
        />
      ) : (
        <>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-500"
            onClick={() => {
              setSelectedItem(null);
              setShowForm(true);
            }}
          >
            + Add Staff
          </Button>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : items.length === 0 ? (
            <EmptyState />
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="staff" direction="vertical">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
                  >
                    {items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id!} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              transform: snapshot.isDragging
                                ? `${provided.draggableProps.style?.transform ?? ""} scale(1.02)`
                                : provided.draggableProps.style?.transform,
                              transition: "transform 0.2s ease",
                            }}
                            className={snapshot.isDragging ? "z-50" : ""}
                          >
                            <StaffCard
                              item={item}
                              onEdit={(i) => {
                                setSelectedItem(i);
                                setShowForm(true);
                              }}
                              onDelete={handleDelete}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </>
      )}
    </div>
  );
}
