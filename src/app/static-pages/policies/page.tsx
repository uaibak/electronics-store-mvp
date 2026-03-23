import type { Metadata } from "next";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Policies",
  description: "Review shipping, confirmation, and return policies."
};

export default function PoliciesPage() {
  return (
    <Container className="py-16">
      <div className="max-w-3xl space-y-5">
        <h1 className="font-heading text-4xl font-bold text-primary">Policies</h1>
        <div className="space-y-4 rounded-[28px] border border-primary/10 bg-white p-6 shadow-soft">
          <p className="leading-8 text-slate-600">
            All orders are placed with cash on delivery. Our support team manually confirms every order before dispatch.
          </p>
          <p className="leading-8 text-slate-600">
            Delivery windows depend on city and product availability. Returns and exchanges are reviewed case by case for
            damaged or defective products.
          </p>
          <p className="leading-8 text-slate-600">
            Customer information is used only for order processing, delivery coordination, and support follow-up.
          </p>
        </div>
      </div>
    </Container>
  );
}
