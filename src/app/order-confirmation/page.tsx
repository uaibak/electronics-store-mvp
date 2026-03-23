import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Order Confirmation",
  description: "Your order has been placed and will be confirmed manually."
};

export default async function OrderConfirmationPage({ searchParams }: { searchParams: Promise<{ orderId?: string }> }) {
  const { orderId } = await searchParams;

  return (
    <Container className="py-20">
      <div className="mx-auto max-w-2xl rounded-[32px] border border-primary/10 bg-white p-10 text-center shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Order Received</p>
        <h1 className="mt-4 font-heading text-4xl font-bold text-primary">Thank you for your purchase.</h1>
        <p className="mt-4 text-slate-600">
          Your order has been placed successfully. Our team will contact you shortly to confirm delivery details.
        </p>
        {orderId ? <p className="mt-4 text-sm text-slate-500">Reference: {orderId}</p> : null}
        <Button asChild className="mt-8">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </Container>
  );
}
