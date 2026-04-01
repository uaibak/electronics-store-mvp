import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { z } from "zod";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { getAdminSession } from "@/lib/auth";
import { isValidProductImage } from "@/lib/utils";

const productSchema = z.object({
  name: z.string().min(3),
  price: z.coerce.number().min(1),
  category: z.enum(["Fans", "Irons", "Air Coolers", "Washing Machines"]),
  image: z.string().refine((value) => isValidProductImage(value), "Provide a valid image URL or uploaded image path."),
  description: z.string().min(10),
  stock: z.coerce.number().min(0)
});

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid product id" }, { status: 400 });
  }

  await connectDB();
  const product = await Product.findById(id);
  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const payload = productSchema.parse(await request.json());

  await connectDB();
  const product = await Product.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await connectDB();
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
