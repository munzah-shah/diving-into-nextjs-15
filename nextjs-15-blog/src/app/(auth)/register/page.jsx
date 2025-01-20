import Link from "next/link";

export default function Register() {
  return (
    <div className="container w-1/2">
      <h1 className="title">Register</h1>
      <form action="" className="space-y-4">
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>

        <div>
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input type="password" id="confirmPassword" />
        </div>

        <div className="flex items-end gap-4">
          <button type="submit" className="btn-primary">
            Register
          </button>
          <Link href="/" className="text-link">
            or login here
          </Link>
        </div>
      </form>
    </div>
  );
}
