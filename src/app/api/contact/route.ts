import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Log the data to the server console
    console.log("New contact message received:", data)

    // Return a success response
    return NextResponse.json({ success: true, message: "Message received." }, { status: 200 })
  } catch (error) {
    console.error("Error processing contact message:", error)
    return NextResponse.json({ error: "Failed to process message." }, { status: 500 })
  }
}
