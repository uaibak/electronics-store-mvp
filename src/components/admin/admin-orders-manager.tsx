"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";

const statuses = ["Pending", "Confirmed", "Packed", "Delivered", "Cancelled"];

export default function AdminOrdersManager({ orders }: { orders: any[] }) {
  const router = useRouter();

  async function updateStatus(id: string, status: string) {
    const response = await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    if (response.ok) {
      toast.success("Order updated", {
        description: `The order status is now ${status}.`
      });
      router.refresh();
      return;
    }

    toast.error("Update failed", {
      description: "We could not update the order status. Please try again."
    });
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-primary/10 bg-white shadow-soft">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-primary">
          <tr>
            <th className="px-5 py-4">Customer</th>
            <th className="px-5 py-4">City</th>
            <th className="px-5 py-4">Total</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-t border-border align-top">
              <td className="px-5 py-4">
                <p className="font-medium text-primary">{order.customerName}</p>
                <p className="text-slate-500">{order.phone}</p>
                <p className="text-slate-500">{order.address}</p>
              </td>
              <td className="px-5 py-4">{order.city}</td>
              <td className="px-5 py-4 font-semibold text-primary">{formatPrice(order.totalPrice)}</td>
              <td className="px-5 py-4">
                <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)} className="h-10 rounded-xl border border-border px-3">
                  {statuses.map((status) => <option key={status}>{status}</option>)}
                </select>
              </td>
              <td className="px-5 py-4">
                <div className="space-y-2">
                  {order.products.map((item: any, index: number) => (
                    <div key={`${order._id}-${index}`} className="rounded-2xl bg-slate-50 p-3">
                      <p className="font-medium text-primary">{item.productId?.name || "Removed product"}</p>
                      <p className="text-slate-500">Qty: {item.quantity}</p>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
