import Link from "next/link";
import { Container } from "@/components/Container";

export default function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-primary text-white">
      <Container className="grid gap-8 py-12 md:grid-cols-3">
        <div>
          <h3 className="font-heading text-xl font-semibold">Pakistan Electronics</h3>
          <p className="mt-3 text-sm text-slate-300">
            Reliable household electronics with cash on delivery and responsive support across Pakistan.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-lg font-semibold">Quick Links</h4>
          <div className="mt-3 space-y-2 text-sm text-slate-300">
            <Link href="/static-pages/about" className="block hover:text-white">
              About
            </Link>
            <Link href="/static-pages/contact" className="block hover:text-white">
              Contact
            </Link>
            <Link href="/static-pages/policies" className="block hover:text-white">
              Policies
            </Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading text-lg font-semibold">Support</h4>
          <p className="mt-3 text-sm text-slate-300">Phone: +92 300 1234567</p>
          <p className="text-sm text-slate-300">Email: support@pakistanelectronics.pk</p>
          <p className="mt-2 text-sm text-slate-300">Manual order confirmation for every COD purchase.</p>
        </div>
      </Container>
    </footer>
  );
}
