"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { useCart } from "@/components/providers/cart-provider";

export default function ProductActions({ product }: { product: any }) {
  const router = useRouter();
  const { addItem } = useCart();

  function handleOrderNow() {
    addItem(product);
    router.push("/checkout");
  }

  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      <Button variant="secondary" onClick={() => addItem(product)}>
        Add to Cart
      </Button>
      <Button onClick={handleOrderNow}>Order Now</Button>
    </div>
  );
}
