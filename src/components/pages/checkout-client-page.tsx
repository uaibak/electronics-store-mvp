"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { FormField, TextAreaField } from "@/components/Form";
import { useCart } from "@/components/providers/cart-provider";
import { formatPrice } from "@/lib/utils";

export default function CheckoutClientPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!items.length) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    setLoading(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.get("customerName"),
          phone: formData.get("phone"),
          address: formData.get("address"),
          city: formData.get("city"),
          products: items.map((item) => ({ productId: item._id, quantity: item.quantity }))
        })
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const order = await response.json();
      clearCart();
      router.push(`/order-confirmation?orderId=${order._id}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="py-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <h1 className="font-heading text-4xl font-bold text-primary">Checkout</h1>
          <p className="mt-3 text-slate-600">Cash on delivery only. Every order is confirmed manually before dispatch.</p>

          <form className="mt-8 space-y-5 rounded-[28px] border border-primary/10 bg-white p-6 shadow-soft" onSubmit={handleSubmit}>
            <FormField label="Full Name" id="customerName" name="customerName" required placeholder="Muhammad Ali" />
            <FormField label="Phone" id="phone" name="phone" required placeholder="+92 300 1234567" />
            <TextAreaField label="Address" id="address" name="address" required placeholder="House, street, area" />
            <FormField label="City" id="city" name="city" required placeholder="Lahore" />
            <Button className="w-full" disabled={loading || !items.length}>
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
          </form>
        </div>

        <div className="rounded-[28px] border border-primary/10 bg-white p-6 shadow-soft">
          <h2 className="font-heading text-2xl font-semibold text-primary">Order Summary</h2>
          <div className="mt-5 space-y-3">
            {items.map((item) => (
              <div key={item._id} className="flex items-center justify-between gap-4 border-b border-border pb-3">
                <div>
                  <p className="font-medium text-primary">{item.name}</p>
                  <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-primary">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between">
            <span className="text-slate-500">Total</span>
            <span className="text-2xl font-bold text-primary">{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>
    </Container>
  );
}
