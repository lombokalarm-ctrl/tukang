import "server-only";

import { getIronSession, type IronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type AdminSessionData = {
  isLoggedIn: boolean;
  email?: string;
};

const fallbackSecret = "replace-this-in-production-with-a-long-random-secret";

export const adminSessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET ?? fallbackSecret,
  cookieName: "tukang_admin_session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  },
};

export async function getAdminSession(): Promise<IronSession<AdminSessionData>> {
  const cookieStore = await cookies();
  return getIronSession<AdminSessionData>(cookieStore, adminSessionOptions);
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session.isLoggedIn) {
    redirect("/admin/login");
  }

  return session;
}

export function isAdminAuthConfigured() {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD_HASH && process.env.SESSION_SECRET);
}

export function isBlogAdminConfigured() {
  return Boolean(process.env.DATABASE_URL) && isAdminAuthConfigured();
}
