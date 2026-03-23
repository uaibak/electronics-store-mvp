import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import ProductActions from "@/components/product-actions";
import { getProductBySlug } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product: any = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.name} | Electronics Store`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Electronics Store`,
      description: product.description,
      images: [{ url: product.image, alt: product.name }]
    }
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product: any = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const serializedProduct = { ...product, _id: product._id.toString() };

  return (
    <Container className="py-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="relative min-h-[420px] overflow-hidden rounded-[32px] border border-primary/10 bg-white shadow-soft">
          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">{product.category}</p>
            <h1 className="mt-3 font-heading text-4xl font-bold text-primary">{product.name}</h1>
          </div>
          <p className="text-lg leading-8 text-slate-600">{product.description}</p>
          <div className="rounded-[28px] border border-primary/10 bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">Price</p>
                <p className="mt-1 text-3xl font-bold text-primary">{formatPrice(product.price)}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Stock</p>
                <p className="mt-1 text-lg font-semibold text-primary">{product.stock} available</p>
              </div>
            </div>
            <ProductActions product={serializedProduct} />
          </div>
        </div>
      </div>
    </Container>
  );
}
