import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

const protectedRoutes = ["/document/*"];
const publicRoutes = ["/login"];

function matchRoute(patterns: string[], pathname: string) {
  return patterns.some((pattern) => {
    if (!pattern.includes("*")) return pathname === pattern;
    const regex = new RegExp("^" + pattern.replace("*", ".*") + "$");
    return regex.test(pathname);
  });
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = matchRoute(protectedRoutes, path);
  const isPublicRoute = matchRoute(publicRoutes, path);

  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}