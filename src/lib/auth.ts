import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME } from "@/lib/constants";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "development-secret");

export { ADMIN_COOKIE_NAME };

export async function signAdminToken(payload: Record<string, string>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secret);
}

export async function verifyAdminToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    return await verifyAdminToken(token);
  } catch {
    return null;
  }
}
