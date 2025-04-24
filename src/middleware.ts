import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";
import { prisma } from "./lib/prisma";

const protectedRoutes = [""];

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
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  const session = await decrypt(sessionCookie);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  //commented out for now because protectedRoutes is empty anyway
  // if (isProtectedRoute && !session?.userId) {
  //   return NextResponse.redirect(new URL("/login", baseUrl));
  // }
  if (!session?.userId) {
    // Prevent unauthenticated users from accessing /admin
    if (path === "/admin") {
      return NextResponse.redirect(new URL("/login", baseUrl));
    }
    return NextResponse.next();
  }
  
  // fetch onboarding completion status if session exists
  if (session?.userId) {
    const res = await fetch(`${baseUrl}/api/onboarding/completionStatus`, {
      headers: {
        cookie: sessionCookie || "",
      },
    });
    if (res.status === 401 || res.status === 404) {
      return NextResponse.redirect(new URL("/login", baseUrl));
    }

    const { isOnboardingCompleted, isAdmin } = await res.json();

    // If accessing /login or /signup while logged in, redirect to home
    if (path === "/login" || path === "/signup") {
      return NextResponse.redirect(new URL("/", baseUrl));
    }

    // If accessing /onboarding but already completed onboarding, redirect to home
    if (path === "/onboarding" && isOnboardingCompleted) {
      return NextResponse.redirect(new URL("/", baseUrl));
    }
    
    if (path === "/admin" && !isAdmin) {
      return NextResponse.redirect(new URL("/", baseUrl));
    }
    // If accessing any other page (not /onboarding or /api /authcomplete) but not yet onboarded -> redirect to onboarding
    if (
      !isOnboardingCompleted &&
      path !== "/onboarding" &&
      !path.startsWith("/api") &&
      !path.startsWith("/authcomplete")
    ) {
      const redirectUrl = new URL(`/onboarding`, baseUrl);
      return NextResponse.redirect(redirectUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
