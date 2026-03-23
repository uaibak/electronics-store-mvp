import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminLoginForm from "@/components/admin/admin-login-form";
import { Container } from "@/components/Container";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) {
    redirect("/admin");
  }

  return (
    <Container className="py-20">
      <div className="mx-auto max-w-md rounded-[32px] border border-primary/10 bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">Admin Access</p>
        <h1 className="mt-3 font-heading text-3xl font-bold text-primary">Sign in</h1>
        <p className="mt-2 text-sm text-slate-600">Use your environment-based admin credentials.</p>
        <AdminLoginForm />
      </div>
    </Container>
  );
}
