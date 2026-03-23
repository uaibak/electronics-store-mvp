"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/Button";
import { FormField } from "@/components/Form";

export default function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password")
      })
    });

    setLoading(false);

    if (!response.ok) {
      setError("Invalid credentials.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      <FormField label="Email" id="email" name="email" type="email" required placeholder="admin@example.com" />
      <FormField label="Password" id="password" name="password" type="password" required placeholder="��������" />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button className="w-full" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</Button>
    </form>
  );
}
