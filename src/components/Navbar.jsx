"use client";

import Link from "next/link";
import { ShoppingCart, Shield } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/category/fans", label: "Fans" },
  { href: "/category/irons", label: "Irons" },
  { href: "/category/air-coolers", label: "Air Coolers" },
  { href: "/category/washing-machines", label: "Washing Machines" },
  { href: "/static-pages/about", label: "About" },
  { href: "/static-pages/contact", label: "Contact" }
];

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-primary/10 bg-background/95 backdrop-blur">
      <Container className="py-4">
        <div className="flex min-h-12 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary px-3 py-2 text-sm font-bold uppercase tracking-[0.25em] text-white">
              PK
            </div>
            <div>
              <p className="font-heading text-lg font-semibold text-primary">Pakistan Electronics</p>
              <p className="text-xs text-muted">Custom appliances for modern homes</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-primary transition hover:text-accent">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link href="/admin/login">
                <Shield className="mr-2 h-4 w-4" />
                Admin
              </Link>
            </Button>
            <Button asChild variant="secondary" className="px-4">
              <Link href="/cart">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Cart ({itemCount})
              </Link>
            </Button>
          </div>
        </div>

        <nav className="mt-4 flex gap-3 overflow-x-auto pb-1 lg:hidden">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="whitespace-nowrap rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-medium text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
