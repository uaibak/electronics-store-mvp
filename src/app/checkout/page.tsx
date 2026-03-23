import type { Metadata } from "next";
import CheckoutClientPage from "@/components/pages/checkout-client-page";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Enter delivery details and place a cash on delivery order."
};

export default function CheckoutPage() {
  return <CheckoutClientPage />;
}
