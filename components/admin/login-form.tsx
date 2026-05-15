"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAdmin, type LoginFormState } from "@/lib/blog-admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: LoginFormState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" disabled={pending} type="submit">
      {pending ? "Memproses..." : "Masuk ke Admin Blog"}
    </Button>
  );
}

export function LoginForm() {
  const [state, action] = useActionState<LoginFormState, FormData>(loginAdmin, initialState);

  return (
    <form action={action} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700" htmlFor="email">
          Email Admin
        </label>
        <Input autoComplete="email" id="email" name="email" placeholder="admin@tukangdilombok.com" required type="email" />
        {state?.errors?.email?.map((error) => (
          <p className="text-sm text-red-600" key={error}>
            {error}
          </p>
        ))}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700" htmlFor="password">
          Password
        </label>
        <Input autoComplete="current-password" id="password" name="password" placeholder="Masukkan password admin" required type="password" />
        {state?.errors?.password?.map((error) => (
          <p className="text-sm text-red-600" key={error}>
            {error}
          </p>
        ))}
      </div>

      {state?.message ? <p className="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-700">{state.message}</p> : null}

      <SubmitButton />
    </form>
  );
}
