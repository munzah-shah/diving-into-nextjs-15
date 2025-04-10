import { NextResponse } from "next/server";
import getAuthUser from "./lib/getAuthUser";

// define protected and public routes
const protectedRoutes = ["/dashboard", "/posts/create"];
const publicRoutes = ["/login", "/register"];

export default async function middleware(req) {
  // Get the current pathname user is trying to access/visit from the request
  const path = req.nextUrl.pathname;

  // Check if the current path is protected or public
  const isProtected =
    protectedRoutes.includes(path) || path.startsWith("/posts/edit");
  const isPublic = publicRoutes.includes(path);

  // Check if the user is authenticated
  // If the user is authenticated, get the userId from the auth cookie
  const user = await getAuthUser();
  const userId = user?.userId;

  // If the user is not authenticated and he is trying to access a protected route, redirect the user to login page
  if (isProtected && !userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  // If the user is authenticated and he is trying to access a public route, redirect the user to dashboard page
  if (isPublic && userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  // If none of the above conditions are met, continue to the next requested page
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
