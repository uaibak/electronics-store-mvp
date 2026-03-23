import { NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getAdminSession } from "@/lib/auth";

const orderSchema = z.object({
  customerName: z.string().min(3),
  phone: z.string().min(6),
  address: z.string().min(10),
  city: z.string().min(2),
  products: z.array(z.object({ productId: z.string(), quantity: z.coerce.number().min(1) })).min(1)
});

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const orders = await Order.find().populate("products.productId").sort({ createdAt: -1 });
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const payload = orderSchema.parse(await request.json());

  await connectDB();
  const ids = payload.products.map((item) => item.productId);
  const products = await Product.find({ _id: { $in: ids } });

  const totalPrice = payload.products.reduce((sum, item) => {
    const product = products.find((entry) => entry._id.toString() === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const order = await Order.create({
    ...payload,
    totalPrice,
    status: "Pending"
  });

  return NextResponse.json(order, { status: 201 });
}
