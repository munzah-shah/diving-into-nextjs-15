"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "../../../actions/auth";

export default function Login() {
  const [state, action, isPending] = useActionState(login, undefined);

  return (
    <div className="container w-1/2">
      <h1 className="title">Login</h1>
      <form action={action} className="space-y-4">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={state?.email}
          />
          {state?.errors?.email && (
            <p className="error">{state?.errors?.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          {state?.errors?.password && (
            <p className="error">{state?.errors?.password}</p>
          )}
        </div>

        <div className="flex items-end gap-4">
          <button type="submit" className="btn-primary" disabled={isPending}>
            {isPending ? "Loading..." : "Login"}
          </button>
          <Link href="/register" className="text-link">
            or register here
          </Link>
        </div>
      </form>
    </div>
  );
}
