import { db } from "./firebase"
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from "firebase/firestore"

const newsCollection = collection(db, "news")

// ✅ Add a new news item
export const addNews = async (newsData: any) => {
  const docRef = await addDoc(newsCollection, {
    ...newsData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

// ✅ Fetch all news
export const fetchNews = async () => {
  const snapshot = await getDocs(newsCollection)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))
}

// ✅ Fetch single news by ID
export const fetchNewsById = async (id: string) => {
  const docRef = doc(db, "news", id)
  const snapshot = await getDoc(docRef)
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() }
  }
  return null
}

// ✅ Update a news item
export const updateNews = async (id: string, data: any) => {
  const docRef = doc(db, "news", id)
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

// ✅ Delete a news item
export const deleteNews = async (id: string) => {
  const docRef = doc(db, "news", id)
  await deleteDoc(docRef)
}
