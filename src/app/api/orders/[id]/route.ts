import { NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { getAdminSession } from "@/lib/auth";

const statusSchema = z.object({
  status: z.enum(["Pending", "Confirmed", "Packed", "Delivered", "Cancelled"])
});

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const payload = statusSchema.parse(await request.json());

  await connectDB();
  const order = await Order.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  if (!order) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(order);
}
