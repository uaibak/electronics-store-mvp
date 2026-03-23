import type { Metadata } from "next";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Pakistan Electronics Store and our customer-first approach."
};

export default function AboutPage() {
  return (
    <Container className="py-16">
      <div className="max-w-3xl space-y-5">
        <h1 className="font-heading text-4xl font-bold text-primary">About Us</h1>
        <p className="text-lg leading-8 text-slate-600">
          Pakistan Electronics Store is built for households that need practical, durable appliances with a clean and
          transparent ordering process.
        </p>
        <p className="leading-8 text-slate-600">
          We focus on core home electronics categories and combine strong product presentation, clear pricing, and manual
          order verification to keep fulfillment reliable.
        </p>
      </div>
    </Container>
  );
}
