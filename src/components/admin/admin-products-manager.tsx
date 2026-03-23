"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { FormField, TextAreaField } from "@/components/Form";
import { formatPrice } from "@/lib/utils";

const initialForm = {
  name: "",
  price: "",
  category: "Fans",
  image: "",
  description: "",
  stock: ""
};

export default function AdminProductsManager({ products }: { products: any[] }) {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const categories = useMemo(() => ["Fans", "Irons", "Air Coolers", "Washing Machines"], []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const response = await fetch(editingId ? `/api/products/${editingId}` : "/api/products", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      })
    });

    setLoading(false);

    if (!response.ok) {
      return;
    }

    setForm(initialForm);
    setEditingId(null);
    router.refresh();
  }

  function startEdit(product: any) {
    setEditingId(product._id);
    setForm({
      name: product.name,
      price: String(product.price),
      category: product.category,
      image: product.image,
      description: product.description,
      stock: String(product.stock)
    });
  }

  async function removeProduct(id: string) {
    const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (response.ok) {
      router.refresh();
    }
  }

  function updateInput(event: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [event.target.id]: event.target.value });
  }

  function updateDescription(event: ChangeEvent<HTMLTextAreaElement>) {
    setForm({ ...form, description: event.target.value });
  }

  function updateCategory(event: ChangeEvent<HTMLSelectElement>) {
    setForm({ ...form, category: event.target.value });
  }

  return (
    <div className="space-y-10">
      <form className="grid gap-4 rounded-[28px] border border-primary/10 bg-white p-6 shadow-soft md:grid-cols-2" onSubmit={handleSubmit}>
        <FormField label="Product Name" id="name" value={form.name} onChange={updateInput} required />
        <FormField label="Price (PKR)" id="price" type="number" value={form.price} onChange={updateInput} required />
        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium text-primary">Category</label>
          <select id="category" value={form.category} onChange={updateCategory} className="h-11 w-full rounded-2xl border border-border bg-white px-4 text-sm">
            {categories.map((category) => <option key={category}>{category}</option>)}
          </select>
        </div>
        <FormField label="Stock" id="stock" type="number" value={form.stock} onChange={updateInput} required />
        <FormField label="Image URL" id="image" className="md:col-span-2" value={form.image} onChange={updateInput} required />
        <TextAreaField label="Description" id="description" className="md:col-span-2" value={form.description} onChange={updateDescription} required />
        <div className="flex gap-3 md:col-span-2">
          <Button disabled={loading}>{loading ? "Saving..." : editingId ? "Update Product" : "Add Product"}</Button>
          {editingId ? (
            <Button type="button" variant="outline" onClick={() => { setEditingId(null); setForm(initialForm); }}>
              Cancel
            </Button>
          ) : null}
        </div>
      </form>

      <div className="overflow-x-auto rounded-[28px] border border-primary/10 bg-white shadow-soft">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-primary">
            <tr>
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Price</th>
              <th className="px-5 py-4">Stock</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t border-border">
                <td className="px-5 py-4 font-medium text-primary">{product.name}</td>
                <td className="px-5 py-4">{product.category}</td>
                <td className="px-5 py-4">{formatPrice(product.price)}</td>
                <td className="px-5 py-4">{product.stock}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={() => startEdit(product)}>Edit</Button>
                    <Button type="button" onClick={() => removeProduct(product._id)}>Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
