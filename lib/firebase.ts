// lib/firebase.ts
import { initializeApp, getApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"

// Direct Firebase config (⚠️ visible to anyone in client bundle)
const firebaseConfig = {
  apiKey: "AIzaSyCWu9cLZr0urYcDMGOZlYaQ4Oay4XINRTE",
  authDomain: "kdlui-d9d03.firebaseapp.com",
  projectId: "kdlui-d9d03",
  storageBucket: "kdlui-d9d03.appspot.com", // ✅ fixed
  messagingSenderId: "75333895030",
  appId: "1:75333895030:web:8f0667498d89a9c90db057"
}

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// Auth
const auth = getAuth(app)

export { app, auth }
