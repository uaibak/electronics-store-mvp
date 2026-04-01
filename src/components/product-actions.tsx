"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/Button";
import { useCart } from "@/components/providers/cart-provider";

export default function ProductActions({ product }: { product: any }) {
  const router = useRouter();
  const { addItem } = useCart();

  function handleAddToCart() {
    const alreadyInCart = addItem(product);
    toast.success(alreadyInCart ? "Cart updated" : "Added to cart", {
      description: alreadyInCart
        ? `${product.name} quantity increased in your cart.`
        : `${product.name} is ready in your cart.`
    });
  }

  function handleOrderNow() {
    const alreadyInCart = addItem(product);
    toast.success("Ready for checkout", {
      description: alreadyInCart
        ? `${product.name} is already in your cart. Taking you to checkout.`
        : `${product.name} has been added. Taking you to checkout.`
    });
    router.push("/checkout");
  }

  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      <Button variant="secondary" onClick={handleAddToCart}>
        Add to Cart
      </Button>
      <Button onClick={handleOrderNow}>Order Now</Button>
    </div>
  );
}
