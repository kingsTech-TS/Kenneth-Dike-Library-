// import { NextResponse } from "next/server"
// import { db } from "../../../../../lib/firebaseAdmin"
// import admin from "firebase-admin"
// import { newsSchema } from "../../../../../lib/validation/newsSchema"

// // ✅ GET a single news item
// export async function GET(req: Request, context: { params: { id: string } }) {
//   const { id } = context.params

//   try {
//     const doc = await db.collection("news").doc(id).get()

//     if (!doc.exists) {
//       return NextResponse.json({ error: "News not found" }, { status: 404 })
//     }

//     return NextResponse.json({ id: doc.id, ...doc.data() }, { status: 200 })
//   } catch (error) {
//     console.error("🔥 Error fetching news:", error)
//     return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
//   }
// }

// // ✅ PATCH: update a news item
// export async function PATCH(req: Request, context: { params: { id: string } }) {
//   const { id } = context.params

//   try {
//     const body = await req.json()

//     const cleaned = Object.fromEntries(
//       Object.entries(body).filter(([_, v]) => v !== null)
//     )

//     const parsed = newsSchema.partial().safeParse(cleaned)
//     if (!parsed.success) {
//       return NextResponse.json({ error: parsed.error.format() }, { status: 400 })
//     }

//     await db.collection("news").doc(id).update({
//       ...parsed.data,
//       updatedAt: admin.firestore.FieldValue.serverTimestamp(),
//     })

//     return NextResponse.json({ message: "News updated successfully" }, { status: 200 })
//   } catch (error) {
//     console.error("🔥 Error updating news:", error)
//     return NextResponse.json({ error: "Failed to update news" }, { status: 500 })
//   }
// }

// // ✅ DELETE: remove a news item
// export async function DELETE(req: Request, context: { params: { id: string } }) {
//   const { id } = context.params

//   try {
//     const docRef = db.collection("news").doc(id)
//     const doc = await docRef.get()

//     if (!doc.exists) {
//       return NextResponse.json({ error: "News not found" }, { status: 404 })
//     }

//     await docRef.delete()
//     return NextResponse.json({ message: "News deleted successfully" }, { status: 200 })
//   } catch (error) {
//     console.error("🔥 Error deleting news:", error)
//     return NextResponse.json({ error: "Failed to delete news" }, { status: 500 })
//   }
// }
