"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

export default function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <Button variant="outline" type="button" onClick={handleLogout}>
      Logout
    </Button>
  );
}
