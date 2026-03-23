import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { Container } from "@/components/Container";
import { getProductsByCategory } from "@/lib/data";

function normalizeCategory(category: string) {
  return category
    .split("-")
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const readable = normalizeCategory(category);

  return {
    title: `${readable} in Pakistan`,
    description: `Browse ${readable.toLowerCase()} for homes across Pakistan with competitive pricing and COD checkout.`
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const readableCategory = normalizeCategory(category);
  const products = await getProductsByCategory(readableCategory);

  return (
    <Container className="py-16">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">Category</p>
        <h1 className="mt-3 font-heading text-4xl font-bold text-primary">{readableCategory}</h1>
        <p className="mt-4 text-slate-600">
          Explore dependable {readableCategory.toLowerCase()} selected for performance, longevity, and practical use in
          Pakistani households.
        </p>
      </div>

      {products.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product: any) => (
            <ProductCard key={product._id.toString()} product={{ ...product, _id: product._id.toString() }} />
          ))}
        </div>
      ) : (
        <div className="rounded-[28px] border border-dashed border-primary/20 bg-white/70 p-10 text-center text-slate-600">
          No products available in this category yet.
        </div>
      )}
    </Container>
  );
}
