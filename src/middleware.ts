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

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // if user is logged in, get user to complete onboarding if not done
  if (
    session?.userId &&
    path !== "/onboarding" &&
    !path.startsWith("/api/onboarding")
  ) {
    const res = await fetch(
      `${req.nextUrl.origin}/api/onboarding/completionStatus`,
      {
        headers: {
          cookie: sessionCookie || "",
        },
      }
    );

    if (res.status === 401 || res.status === 404) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    const { isOnboardingCompleted } = await res.json();

    if (!isOnboardingCompleted) {
      return NextResponse.redirect(new URL("/onboarding", req.nextUrl));
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
