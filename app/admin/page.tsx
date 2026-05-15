import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/session";

export default async function AdminIndexPage() {
  const session = await getAdminSession();

  if (session.isLoggedIn) {
    redirect("/admin/blog");
  }

  redirect("/admin/login");
}
