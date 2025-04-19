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
  console.log("path hitting middleware", path);
  const isProtectedRoute = matchRoute(protectedRoutes, path);
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  const session = await decrypt(sessionCookie);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // if (isProtectedRoute && !session?.userId) {
  //   return NextResponse.redirect(new URL("/login", baseUrl));
  // }
  // fetch onboarding completion status if session exists
  if (session?.userId) {
    console.log("path inside check 1", path);
    const res = await fetch(`${baseUrl}/api/onboarding/completionStatus`, {
      headers: {
        cookie: sessionCookie || "",
      },
    });
    console.log("A1");
    if (res.status === 401 || res.status === 404) {
      console.log("A2");
      return NextResponse.redirect(new URL("/login", baseUrl));
    }

    const { isOnboardingCompleted } = await res.json();

    // If accessing /login or /signup while logged in, redirect to home
    if (path === "/login" || path === "/signup") {
      console.log("A3");
      return NextResponse.redirect(new URL("/", baseUrl));
    }

    // If accessing /onboarding but already completed onboarding, redirect to home
    if (path === "/onboarding" && isOnboardingCompleted) {
      console.log("A4");
      return NextResponse.redirect(new URL("/", baseUrl));
    }
    console.log("A4.5");
    console.log("path", path);
    console.log("isOnboardingCompleted", isOnboardingCompleted);
    // If accessing any other page (not onboarding/api) but not yet onboarded -> redirect to onboarding
    if (
      !isOnboardingCompleted &&
      path !== "/onboarding" &&
      !path.startsWith("/api") &&
      !path.startsWith("/authcomplete")
    ) {
      console.log("A5");
      const redirectUrl = new URL(
        `/onboarding?redirect=${encodeURIComponent(path)}`,
        baseUrl
      );
      console.log("I am redirecting to onboarding");
      return NextResponse.redirect(redirectUrl);
    }
  }
  console.log("A6", path);
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
