import { NextResponse } from "next/server"
import { db } from "../../../../lib/firebaseAdmin"
import admin from "firebase-admin"
import { newsSchema } from "../../../../lib/validation/newsSchema"

// 🟢 GET: fetch all news
export async function GET() {
  try {
    const snapshot = await db.collection("news").orderBy("createdAt", "desc").get()
    const news = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json(news, { status: 200 })
  } catch (error) {
    console.error("🔥 Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}

// 🟢 POST: create new news
export async function POST(req: Request) {
  try {
    const body = await req.json()

    // 🔹 Clean input
    const cleaned = Object.fromEntries(
      Object.entries(body).filter(([_, v]) => v !== null)
    )

    // 🔹 Validate
    const parsed = newsSchema.safeParse(cleaned)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.format() },
        { status: 400 }
      )
    }

    const docRef = await db.collection("news").add({
      ...parsed.data,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      likes: [],
      views: 0,
    })

    return NextResponse.json({ id: docRef.id, ...parsed.data }, { status: 201 })
  } catch (error) {
    console.error("🔥 Error creating news:", error)
    return NextResponse.json({ error: "Failed to create news" }, { status: 500 })
  }
}
