"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { useCart } from "@/components/providers/cart-provider";
import { formatPrice } from "@/lib/utils";

export default function CartClientPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <Container className="py-16">
      <h1 className="font-heading text-4xl font-bold text-primary">Shopping Cart</h1>
      <p className="mt-3 text-slate-600">Update item quantities before proceeding to secure COD checkout.</p>

      {items.length ? (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item._id} className="flex flex-col gap-4 rounded-[28px] border border-primary/10 bg-white p-4 shadow-soft sm:flex-row">
                <div className="relative h-28 w-full overflow-hidden rounded-2xl bg-slate-100 sm:w-36">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="144px" />
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <Link href={`/product/${item.slug}`} className="font-heading text-xl font-semibold text-primary">
                      {item.name}
                    </Link>
                    <p className="mt-1 text-sm text-slate-500">{item.category}</p>
                    <p className="mt-2 font-semibold text-primary">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(event) => updateQuantity(item._id, Number(event.target.value))}
                      className="h-11 w-20 rounded-2xl border border-border px-3"
                    />
                    <Button variant="outline" onClick={() => removeItem(item._id)} className="px-3">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-[28px] border border-primary/10 bg-white p-6 shadow-soft">
            <h2 className="font-heading text-2xl font-semibold text-primary">Order Summary</h2>
            <div className="mt-6 flex items-center justify-between border-b border-border pb-4">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-semibold text-primary">{formatPrice(totalPrice)}</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-slate-500">Delivery</span>
              <span className="font-semibold text-primary">Confirmed manually</span>
            </div>
            <Button asChild className="mt-8 w-full">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-10 rounded-[28px] border border-dashed border-primary/20 bg-white/70 p-10 text-center">
          <p className="text-slate-600">Your cart is empty.</p>
          <Button asChild className="mt-6">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      )}
    </Container>
  );
}
