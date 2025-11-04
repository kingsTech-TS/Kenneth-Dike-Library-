"use client";

import React, { useEffect, useState } from "react";
import { BookRecommendation, fetchBookRecommendations } from "./bookManager";
import { db } from "../../../../lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";

const SkeletonLoader: React.FC = () => {
  return (
    <ul className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <li
          key={i}
          className="border border-gray-200 p-5 rounded-xl shadow-sm animate-pulse bg-white"
        >
          <div className="h-6 bg-gray-300 rounded w-2/3 mb-3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4 mt-4"></div>
        </li>
      ))}
    </ul>
  );
};

const Page: React.FC = () => {
  const [books, setBooks] = useState<BookRecommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBookRecommendations();
      setBooks(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load recommendations. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this recommendation?"))
      return;

    try {
      await deleteDoc(doc(db, "bookRecommendations", id));
      setBooks((prev) => prev.filter((book) => book.id !== id));
      toast.success("Book recommendation deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete recommendation.");
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          📚 Book Recommendations
        </h1>
        <button
          onClick={getBooks}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 active:scale-95 transition"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <SkeletonLoader />
      ) : books.length === 0 ? (
        <p className="text-gray-500 italic text-center py-10">
          No recommendations found.
        </p>
      ) : (
        <ul className="space-y-4">
          {books.map((book) => (
            <li
              key={book.id}
              className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {book.bookTitle}
                  </h2>
                  <div className="text-gray-700 space-y-1">
                    <p>
                      <strong>Author:</strong> {book.author}
                    </p>
                    <p>
                      <strong>Category:</strong> {book.category}
                    </p>
                    <p>
                      <strong>Recommended by:</strong> {book.name}
                    </p>
                    <p>
                      <strong>Reason:</strong> {book.reason}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    Added on:{" "}
                    {book.createdAt && !isNaN(new Date(book.createdAt).getTime())
                      ? new Intl.DateTimeFormat("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(new Date(book.createdAt))
                      : "Unknown date"}
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(book.id)}
                  className="ml-4 bg-red-600 text-white px-3 py-2 rounded-lg shadow hover:bg-red-700 active:scale-95 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;
