"use client";

import { useActionState } from "react";
import Link from "next/link";
import { register } from "../../../actions/auth";

export default function Register() {
  const [state, action, isPending] = useActionState(register, undefined);

  return (
    <div className="container w-1/2">
      <h1 className="title">Register</h1>
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
            <div className="error">
              <p>password must:</p>
              <ul className="list-disc list-inside ml-4">
                {state.errors.password.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" />
          {state?.errors?.confirmPassword && (
            <p className="error">{state?.errors?.confirmPassword}</p>
          )}
        </div>

        <div className="flex items-end gap-4">
          <button type="submit" className="btn-primary" disabled={isPending}>
            {isPending ? "Loading..." : "Regsiter"}
          </button>
          <Link href="/login" className="text-link">
            or login here
          </Link>
        </div>
      </form>
    </div>
  );
}
