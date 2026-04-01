import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
  return NextResponse.json({ message: "Use POST to insert a sample product." });
}

export async function POST() {
  await connectDB();
  const product = await Product.create({
    name: "Smart Breeze Ceiling Fan",
    price: 18999,
    category: "Fans",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    description: "Energy-efficient ceiling fan with quiet motor performance and durable blades for everyday use.",
    stock: 25
  });

  return NextResponse.json(product, { status: 201 });
}
