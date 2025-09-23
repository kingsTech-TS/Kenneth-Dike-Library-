import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File | undefined;

    if (!file) {
      return NextResponse.json(
        { success: false, error: { message: "No file uploaded" } },
        { status: 400 }
      );
    }

    const cloudName = "dskj6z1lj"; // 🔹 Your Cloudinary cloud name
    const uploadPreset = "KDLUIAPP"; // 🔹 Unsigned preset in Cloudinary

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      }
    );

    const result = await res.json();

    if (!res.ok || result.error) {
      return NextResponse.json(
        {
          success: false,
          error: { message: result.error?.message || "Upload failed" },
        },
        { status: res.status }
      );
    }

    // ✅ Simplified success response
    return NextResponse.json({
      success: true,
      secure_url: result.secure_url,
      public_id: result.public_id,
      folder: result.folder,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: { message: err.message || "Unexpected server error" },
      },
      { status: 500 }
    );
  }
}
