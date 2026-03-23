import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { getAllCategories, getFeaturedProducts } from "@/lib/data";

export default async function HomePage() {
  const [categories, featuredProducts] = await Promise.all([getAllCategories(), getFeaturedProducts()]);

  return (
    <div className="pb-20">
      <section className="overflow-hidden py-16 lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Built for homes across Pakistan
            </span>
            <h1 className="mt-6 max-w-3xl font-heading text-4xl font-bold leading-tight text-primary sm:text-5xl lg:text-6xl">
              Trusted electronics for daily comfort, efficient living, and cleaner routines.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Discover energy-conscious fans, dependable irons, powerful air coolers, and durable washing machines with
              mobile-first shopping and cash on delivery checkout.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/category/fans">Shop Categories</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/static-pages/about">Our Story</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur">
            <div className="grid gap-4 sm:grid-cols-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                  className="rounded-[24px] border border-primary/10 bg-slate-50 p-5 transition hover:border-accent/30 hover:bg-white"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Featured Category</p>
                  <h2 className="mt-3 font-heading text-2xl font-semibold text-primary">{category}</h2>
                  <p className="mt-2 text-sm text-slate-600">Browse curated models, specs, and COD ordering.</p>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-6">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">Featured Products</p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-primary">Best picks for this season</h2>
            </div>
          </div>

          {featuredProducts.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featuredProducts.map((product: any) => (
                <ProductCard key={product._id.toString()} product={{ ...product, _id: product._id.toString() }} />
              ))}
            </div>
          ) : (
            <div className="rounded-[32px] border border-dashed border-primary/20 bg-white/70 p-10 text-center text-slate-600">
              No products found yet. Use the admin panel or sample API route to add inventory.
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
