import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Container } from "@/components/Container";
import AdminLogoutButton from "@/components/admin/admin-logout-button";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <Container className="py-16">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">Admin Dashboard</p>
          <h1 className="mt-2 font-heading text-4xl font-bold text-primary">Store Operations</h1>
        </div>
        <AdminLogoutButton />
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Link href="/admin/products" className="rounded-[28px] border border-primary/10 bg-white p-8 shadow-soft">
          <h2 className="font-heading text-2xl font-semibold text-primary">Manage Products</h2>
          <p className="mt-3 text-slate-600">Create, update, and remove product listings.</p>
        </Link>
        <Link href="/admin/orders" className="rounded-[28px] border border-primary/10 bg-white p-8 shadow-soft">
          <h2 className="font-heading text-2xl font-semibold text-primary">Manage Orders</h2>
          <p className="mt-3 text-slate-600">Track incoming COD orders and update status.</p>
        </Link>
      </div>
    </Container>
  );
}
