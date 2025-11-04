import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../lib/firebase";


export interface BookRecommendation {
  id: string;
  author: string;
  bookTitle: string;
  category: string;
  createdAt: string;
  email: string;
  name: string;
  reason: string;
}

export const fetchBookRecommendations = async (): Promise<BookRecommendation[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "bookRecomendation"));
    const books: BookRecommendation[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as BookRecommendation[];
    return books;
  } catch (error) {
    console.error("Error fetching book recommendations:", error);
    throw error;
  }
};
