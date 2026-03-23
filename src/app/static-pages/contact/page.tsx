import type { Metadata } from "next";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Pakistan Electronics Store."
};

export default function ContactPage() {
  return (
    <Container className="py-16">
      <div className="max-w-3xl space-y-5">
        <h1 className="font-heading text-4xl font-bold text-primary">Contact</h1>
        <p className="leading-8 text-slate-600">Need help with products or an order? Reach out using the details below.</p>
        <div className="rounded-[28px] border border-primary/10 bg-white p-6 shadow-soft">
          <p className="text-primary">Phone: +92 300 1234567</p>
          <p className="mt-2 text-primary">Email: support@pakistanelectronics.pk</p>
          <p className="mt-2 text-primary">Hours: Monday to Saturday, 10:00 AM to 7:00 PM</p>
        </div>
      </div>
    </Container>
  );
}
