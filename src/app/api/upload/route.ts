import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: { message: "No file uploaded" } },
        { status: 400 }
      );
    }

    const cloudName = "dskj6z1lj"; // ✅ your Cloudinary cloud name
    const uploadPreset = "KDLUIAPP"; // ✅ unsigned preset in Cloudinary

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();

      if (!res.ok || result.error) {
        return NextResponse.json(
          { error: { message: result.error?.message || "Upload failed" } },
          { status: res.status }
        );
      }

      // ✅ success
      return NextResponse.json({
        secure_url: result.secure_url,
        public_id: result.public_id,
        folder: result.folder,
      });
    } catch (err: any) {
      return NextResponse.json(
        { error: { message: err.message || "Cloudinary upload error" } },
        { status: 500 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: { message: err.message || "Unexpected server error" } },
      { status: 500 }
    );
  }
}
