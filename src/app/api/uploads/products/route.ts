import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const extensionMap: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp"
};

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Image file is required." }, { status: 400 });
  }

  if (!allowedTypes.has(file.type)) {
    return NextResponse.json({ message: "Only JPG, PNG, or WEBP images are allowed." }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ message: "Image must be 5MB or smaller." }, { status: 400 });
  }

  const extension = extensionMap[file.type];
  const fileName = `${randomUUID()}.${extension}`;
  const uploadsDir = path.join(process.cwd(), "public", "uploads", "products");
  const filePath = path.join(uploadsDir, fileName);

  await mkdir(uploadsDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  return NextResponse.json({ imageUrl: `/uploads/products/${fileName}` }, { status: 201 });
}
