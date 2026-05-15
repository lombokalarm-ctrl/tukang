import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { getAdminSession, isAdminAuthConfigured } from "@/lib/auth/session";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Login Admin Blog | TukangDiLombok.com",
  description: "Halaman login admin internal untuk mengelola blog TukangDiLombok.com.",
  path: "/admin/login",
});

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session.isLoggedIn) {
    redirect("/admin/blog");
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-lg rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="text-sm font-black uppercase tracking-[0.24em] text-orange-600">Admin Blog</div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">Masuk ke dashboard konten</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          Fondasi admin blog sudah disiapkan agar nantinya pengelolaan artikel bisa dilakukan lewat form internal, tanpa mengedit file artikel manual.
        </p>

        {!isAdminAuthConfigured() ? (
          <div className="mt-6 rounded-[1.5rem] border border-orange-200 bg-orange-50 p-5 text-sm leading-7 text-orange-700">
            Login belum aktif karena variabel `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, atau `SESSION_SECRET` belum diisi di environment.
          </div>
        ) : null}

        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
