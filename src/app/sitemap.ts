import type { MetadataRoute } from "next";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const staticRoutes = [
    "",
    "/cart",
    "/checkout",
    "/static-pages/about",
    "/static-pages/contact",
    "/static-pages/policies",
    "/category/fans",
    "/category/irons",
    "/category/air-coolers",
    "/category/washing-machines"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));

  if (!process.env.MONGO_URI) {
    return staticRoutes;
  }

  await connectDB();
  const products: any[] = await Product.find({}, { slug: 1, updatedAt: 1 }).lean();

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: product.updatedAt || new Date()
  }));

  return [...staticRoutes, ...productRoutes];
}
