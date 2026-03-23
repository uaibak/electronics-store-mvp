"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/components/providers/cart-provider";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <article className="group overflow-hidden rounded-[28px] border border-primary/10 bg-white shadow-soft transition hover:-translate-y-1">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </Link>
      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{product.category}</p>
          <Link href={`/product/${product.slug}`} className="mt-2 block font-heading text-xl font-semibold text-primary">
            {product.name}
          </Link>
          <p className="mt-2 text-sm text-slate-600">{product.description.slice(0, 88)}...</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
          <Button onClick={() => addItem(product)}>Add to Cart</Button>
        </div>
      </div>
    </article>
  );
}
