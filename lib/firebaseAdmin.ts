import admin from "firebase-admin";

function formatPrivateKey(key?: string) {
  if (!key) return undefined;

  // If the key already has line breaks, use as-is
  if (key.includes("BEGIN PRIVATE KEY") && key.includes("\n")) {
    return key;
  }

  // If the key has literal \n, replace them with real newlines
  return key.replace(/\\n/g, "\n");
}

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY);
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("🔥 Missing Firebase Admin environment variables");
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
    storageBucket,
  });

  console.log("✅ Firebase Admin initialized");
}

export const db = admin.firestore();
export const bucket = admin.storage().bucket();
