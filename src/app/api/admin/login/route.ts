import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { signAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = await signAdminToken({ email, role: "admin" });
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12
  });

  return NextResponse.json({ success: true });
}
