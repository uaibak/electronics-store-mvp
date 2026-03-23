import { redirect } from "next/navigation";
import { Container } from "@/components/Container";
import AdminOrdersManager from "@/components/admin/admin-orders-manager";
import { getAdminSession } from "@/lib/auth";
import { getAdminOrders } from "@/lib/data";

export default async function AdminOrdersPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const orders: any[] = await getAdminOrders();

  return (
    <Container className="py-16">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">Admin</p>
        <h1 className="mt-2 font-heading text-4xl font-bold text-primary">Orders</h1>
      </div>
      <AdminOrdersManager orders={orders.map((order) => ({ ...order, _id: order._id.toString() }))} />
    </Container>
  );
}
