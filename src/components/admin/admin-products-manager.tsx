"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/Button";
import { FormField, TextAreaField } from "@/components/Form";
import { formatPrice, isUploadedProductImagePath, resolveProductImage } from "@/lib/utils";

type ImageMode = "url" | "upload";

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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageMode, setImageMode] = useState<ImageMode>("url");

  const categories = useMemo(() => ["Fans", "Irons", "Air Coolers", "Washing Machines"], []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.image) {
      toast.warning("Image required", {
        description: imageMode === "url" ? "Add an image URL first." : "Upload an image first."
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(editingId ? `/api/products/${editingId}` : "/api/products", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock)
        })
      });

      if (!response.ok) {
        throw new Error("Save failed");
      }

      toast.success(editingId ? "Product updated" : "Product added", {
        description: editingId
          ? `${form.name} has been updated successfully.`
          : `${form.name} has been added to the catalog.`
      });

      setForm(initialForm);
      setEditingId(null);
      setImageMode("url");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      router.refresh();
    } catch {
      toast.error("Save failed", {
        description: "We could not save the product. Please review the fields and try again."
      });
    } finally {
      setLoading(false);
    }
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
    setImageMode(isUploadedProductImagePath(product.image) ? "upload" : "url");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info("Editing product", {
      description: `${product.name} is ready to update.`
    });
  }

  async function removeProduct(id: string, name: string) {
    const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (response.ok) {
      toast.warning("Product deleted", {
        description: `${name} was removed from the catalog.`
      });
      router.refresh();
      return;
    }

    toast.error("Delete failed", {
      description: "We could not remove the product. Please try again."
    });
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

  function switchImageMode(mode: ImageMode) {
    setImageMode(mode);
    setForm((current) => ({ ...current, image: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setUploading(true);

    try {
      const payload = new FormData();
      payload.append("file", file);

      const response = await fetch("/api/uploads/products", {
        method: "POST",
        body: payload
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setForm((current) => ({ ...current, image: data.imageUrl }));
      toast.success("Image uploaded", {
        description: "The product image is ready to use."
      });
    } catch (error) {
      toast.error("Upload failed", {
        description: error instanceof Error ? error.message : "We could not upload the image."
      });
      event.target.value = "";
    } finally {
      setUploading(false);
    }
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

        <div className="space-y-3 md:col-span-2">
          <label className="text-sm font-medium text-primary">Product Image</label>
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant={imageMode === "url" ? "secondary" : "outline"} onClick={() => switchImageMode("url")}>
              Use Image URL
            </Button>
            <Button type="button" variant={imageMode === "upload" ? "secondary" : "outline"} onClick={() => switchImageMode("upload")}>
              Upload Image
            </Button>
          </div>
          <p className="text-sm text-slate-500">Choose one source only. Switching mode clears the other image value.</p>

          {imageMode === "url" ? (
            <FormField
              label="Image URL"
              id="image"
              value={isUploadedProductImagePath(form.image) ? "" : form.image}
              onChange={updateInput}
              placeholder="https://example.com/product-image.jpg"
              required
            />
          ) : (
            <div className="space-y-3 rounded-2xl border border-border bg-slate-50 p-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileUpload}
                className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
              />
              <p className="text-sm text-slate-500">Accepted formats: JPG, PNG, WEBP. Maximum size: 5MB.</p>
              {uploading ? <p className="text-sm font-medium text-accent">Uploading image...</p> : null}
              {form.image && isUploadedProductImagePath(form.image) ? (
                <p className="text-sm font-medium text-emerald-600">Uploaded image ready: {form.image}</p>
              ) : null}
            </div>
          )}
        </div>

        {form.image ? (
          <div className="md:col-span-2">
            <p className="mb-3 text-sm font-medium text-primary">Image Preview</p>
            <div className="relative h-56 w-full overflow-hidden rounded-[24px] border border-primary/10 bg-slate-100 md:w-80">
              <Image src={resolveProductImage(form.image)} alt={form.name || "Product preview"} fill className="object-cover" sizes="320px" />
            </div>
          </div>
        ) : null}

        <TextAreaField label="Description" id="description" className="md:col-span-2" value={form.description} onChange={updateDescription} required />
        <div className="flex gap-3 md:col-span-2">
          <Button disabled={loading || uploading}>{loading ? "Saving..." : editingId ? "Update Product" : "Add Product"}</Button>
          {editingId ? (
            <Button type="button" variant="outline" onClick={() => { setEditingId(null); setForm(initialForm); setImageMode("url"); if (fileInputRef.current) { fileInputRef.current.value = ""; } }}>
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
                    <Button type="button" onClick={() => removeProduct(product._id, product.name)}>Delete</Button>
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
