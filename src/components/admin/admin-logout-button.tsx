"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/Button";

export default function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    toast.success("Signed out", {
      description: "You have been logged out of the admin dashboard."
    });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <Button variant="outline" type="button" onClick={handleLogout}>
      Logout
    </Button>
  );
}
