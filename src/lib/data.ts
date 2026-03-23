import connectDB from "@/lib/db";
import Product from "@/models/Product";
import Order from "@/models/Order";

function hasDatabase() {
  return Boolean(process.env.MONGO_URI);
}

export async function getFeaturedProducts() {
  if (!hasDatabase()) {
    return [];
  }

  await connectDB();
  return Product.find().sort({ createdAt: -1 }).limit(8).lean();
}

export async function getProductsByCategory(category?: string) {
  if (!hasDatabase()) {
    return [];
  }

  await connectDB();
  const filter = category ? { category } : {};
  return Product.find(filter).sort({ createdAt: -1 }).lean();
}

export async function getProductBySlug(slug: string) {
  if (!hasDatabase()) {
    return null;
  }

  await connectDB();
  return Product.findOne({ slug }).lean();
}

export async function getAllCategories() {
  return ["Fans", "Irons", "Air Coolers", "Washing Machines"];
}

export async function getAdminOrders() {
  if (!hasDatabase()) {
    return [];
  }

  await connectDB();
  return Order.find().populate("products.productId").sort({ createdAt: -1 }).lean();
}

export async function getAdminProducts() {
  if (!hasDatabase()) {
    return [];
  }

  await connectDB();
  return Product.find().sort({ createdAt: -1 }).lean();
}
