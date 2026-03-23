import type { Metadata } from "next";
import CartClientPage from "@/components/pages/cart-client-page";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review selected electronics, update quantity, and continue to checkout."
};

export default function CartPage() {
  return <CartClientPage />;
}
