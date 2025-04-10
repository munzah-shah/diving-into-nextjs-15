import { cookies } from "next/headers";
import { decrypt } from "./sessions";

export default async function getAuthUser() {
  // read the value of session in the cookie
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  // decrypt the session token string
  if (session) {
    const user = await decrypt(session);
    return user;
  }
}
