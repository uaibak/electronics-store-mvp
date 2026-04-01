import connectDB from "@/lib/db";
import Product from "@/models/Product";
import Order from "@/models/Order";

function hasDatabase() {
  return Boolean(process.env.MONGO_URI);
}

function serializeValue(value: any): any {
  if (value == null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(serializeValue);
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "object") {
    if (typeof value.toString === "function" && value.constructor?.name === "ObjectId") {
      return value.toString();
    }

    const plainObject: Record<string, any> = {};
    for (const [key, nestedValue] of Object.entries(value)) {
      plainObject[key] = serializeValue(nestedValue);
    }
    return plainObject;
  }

  return value;
}

function serializeDocument<T>(document: T): T {
  return serializeValue(document);
}

export async function getFeaturedProducts() {
  if (!hasDatabase()) {
    return [];
  }

  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 }).limit(8).lean();
  return serializeDocument(products);
}

export async function getProductsByCategory(category?: string) {
  if (!hasDatabase()) {
    return [];
  }

  await connectDB();
  const filter = category ? { category } : {};
  const products = await Product.find(filter).sort({ createdAt: -1 }).lean();
  return serializeDocument(products);
}

export async function getProductBySlug(slug: string) {
  if (!hasDatabase()) {
    return null;
  }

  await connectDB();
  const product = await Product.findOne({ slug }).lean();
  return serializeDocument(product);
}

export async function getAllCategories() {
  return ["Fans", "Irons", "Air Coolers", "Washing Machines"];
}

export async function getAdminOrders() {
  if (!hasDatabase()) {
    return [];
  }

  await connectDB();
  const orders = await Order.find().populate("products.productId").sort({ createdAt: -1 }).lean();
  return serializeDocument(orders);
}

export async function getAdminProducts() {
  if (!hasDatabase()) {
    return [];
  }

  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  return serializeDocument(products);
}
