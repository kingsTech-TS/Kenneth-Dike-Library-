// lib/firebase.ts
import { initializeApp, getApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCWu9cLZr0urYcDMGOZlYaQ4Oay4XINRTE",
  authDomain: "kdlui-d9d03.firebaseapp.com",
  projectId: "kdlui-d9d03",
  storageBucket: "kdlui-d9d03.appspot.com",
  messagingSenderId: "75333895030",
  appId: "1:75333895030:web:8f0667498d89a9c90db057"
}

// Initialize app only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// Services
const auth = getAuth(app)
const db = getFirestore(app) // ✅ Firestore instance

export { app, auth, db }
