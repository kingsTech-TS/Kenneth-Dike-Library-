// lib/firebase.ts
import { initializeApp, getApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"

// Direct Firebase config (⚠️ visible to anyone in client bundle)
const firebaseConfig = {
  apiKey: "AIzaSyCLoNJDBk1MXF5Jk2KCfzPJtF5HLh9ifyo",
  authDomain: "kdl-auth.firebaseapp.com",
  projectId: "kdl-auth",
  storageBucket: "kdl-auth.appspot.com", // fixed from .firebasestorage.app
  messagingSenderId: "793457189937",
  appId: "1:793457189937:web:928001282ea111db6c6110",
}

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// Auth
const auth = getAuth(app)

export { app, auth }
