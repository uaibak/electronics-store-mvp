import { NextResponse } from "next/server";
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

export async function GET() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const payload = productSchema.parse(body);

  await connectDB();
  const product = await Product.create(payload);
  return NextResponse.json(product, { status: 201 });
}
