import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="py-24">
      <div className="mx-auto max-w-2xl rounded-[32px] border border-primary/10 bg-white p-10 text-center shadow-soft">
        <h1 className="font-heading text-4xl font-bold text-primary">Page not found</h1>
        <p className="mt-4 text-slate-600">The page you requested does not exist.</p>
        <Button asChild className="mt-6">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </Container>
  );
}
