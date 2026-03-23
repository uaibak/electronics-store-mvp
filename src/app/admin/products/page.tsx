import { redirect } from "next/navigation";
import { Container } from "@/components/Container";
import AdminProductsManager from "@/components/admin/admin-products-manager";
import { getAdminSession } from "@/lib/auth";
import { getAdminProducts } from "@/lib/data";

export default async function AdminProductsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const products: any[] = await getAdminProducts();

  return (
    <Container className="py-16">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">Admin</p>
        <h1 className="mt-2 font-heading text-4xl font-bold text-primary">Products</h1>
      </div>
      <AdminProductsManager products={products.map((product) => ({ ...product, _id: product._id.toString() }))} />
    </Container>
  );
}
